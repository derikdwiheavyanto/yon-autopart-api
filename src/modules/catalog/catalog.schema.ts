import { MultipartFile, MultipartValue } from "@fastify/multipart"
import { z } from "zod"

// Image Schema
const imageSchema = z.object({
    id: z.number(),
    url: z.string(),
    catalogId: z.number().optional()
})

// Base Catalog Schema
const coreCatalogSchema = {
    title: z.string()
        .min(1, { error: "Judul katalog harus diisi" }),
    price: z.coerce.number({ error: (iss) => iss.input != undefined ? "Harga harus berupa angka" : "Harga harus diisi" }),
    images: z.array(imageSchema),
    description: z.string("Deskripsi harus diisi")
        .min(10, { error: "deskripsi minimal 10 karakter" })
}

// Request Schema
const { images, ...corewithoutImage } = coreCatalogSchema

const imageValidation = z
    .custom<MultipartFile>()
    .refine((file) => !file || file.mimetype.startsWith('image'), {
        message: 'Only images are allowed to be sent.',
    }).refine((file) => file?.file, {
        message: 'The image is required.',
    }).refine((file) => !file || file.file?.bytesRead <= 5 * 1024 * 1024, {
        message: 'The image must be a maximum of 5MB.',
    })

export const createCatalogSchema = z.object({

    title: z.preprocess(
        (val) => (val as MultipartValue)?.value,
        corewithoutImage.title.meta({ example: "Karbulator" }) /* validation here */
    ),

    price: z.preprocess(
        (val) => (val as MultipartValue)?.value,
        corewithoutImage.price.meta({ example: 200000 }) /* validation here */

    ),

    description: z.preprocess(
        (val) => (val as MultipartValue)?.value,
        corewithoutImage.description.meta({ example: "Barang Berkualitas" }) /* validation here */
    ),
    images: z.preprocess(
        (val) => {
            if (!val) return []
            return Array.isArray(val) ? val : [val]
        },
        z.array(
            imageValidation.meta({
                type: "file",
                format: "binary"
            })
        ).min(1, "Minimal 1 gambar harus diupload")
    )
})


export const UpdateCatalogSchema = createCatalogSchema.partial()


// Reply Schema
export const ResponseCatalogSchema = z.object({
    id: z.number(),
    ...coreCatalogSchema
}).meta({
    example: {
        id: 1,
        title: "Seker",
        description: "Barang berkualitas gampanng rusak",
        price: 2000,
        image: []
    }
})

export type UpdateCatalogInput = z.infer<typeof UpdateCatalogSchema>
export type CreateCatalogInput = z.infer<typeof createCatalogSchema>