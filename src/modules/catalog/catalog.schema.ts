import { z } from "zod"

const coreCatalogSchema = {
    title: z.string()
        .min(1, { error: "Judul katalog harus diisi" }),
    price: z.number({error:(iss)=>iss.input != undefined ?"Harga harus berupa angka":"Harga harus diisi"}),
    image: z.url({ error: "Image URL tidak valid" }),
    description: z.string("Deskripsi harus diisi")
        .min(10, { error: "deskripsi minimal 10 karakter" })
}

export const createCatalogSchema = z.object({
    ...coreCatalogSchema
})

export const UpdateCatalogSchema = createCatalogSchema.partial()
export const ResponseCatalogSchema = z.object({
    ...coreCatalogSchema
})

export type UpdateCatalogInput = z.infer<typeof UpdateCatalogSchema>
export type CreateCatalogInput = z.infer<typeof createCatalogSchema>