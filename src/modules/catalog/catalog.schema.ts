import { z } from "zod"

// Base Catalog Schema
const coreCatalogSchema = {
    title: z.string()
        .min(1, { error: "Judul katalog harus diisi" }),
    price: z.number({ error: (iss) => iss.input != undefined ? "Harga harus berupa angka" : "Harga harus diisi" }),
    image: z.url({ error: "Image URL tidak valid" }),
    description: z.string("Deskripsi harus diisi")
        .min(10, { error: "deskripsi minimal 10 karakter" })
}

// Request Schema
export const createCatalogSchema = z.object({
    ...coreCatalogSchema
}).meta({
    example: {
        title: "Seker",
        price: 20000,
        image: "https://example.com/velg.jpg",
        description: "Barang berkualitas gampang rusak"
    }
})


export const UpdateCatalogSchema = createCatalogSchema.partial().meta({
    example: {
        title: "Seker",
        description: "Barang berkualitas gampanng rusak",
        price: 2000,
        image: "https://example.com/velg.jpg"
    }
})


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
        image: "https://example.com/velg.jpg"
    }
})

export type UpdateCatalogInput = z.infer<typeof UpdateCatalogSchema>
export type CreateCatalogInput = z.infer<typeof createCatalogSchema>