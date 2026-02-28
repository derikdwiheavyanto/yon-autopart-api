import { z } from "@/lib/zod"

/**==================
 * Base Schema
 * ==================*/
const BaseAuthSchema = {
    email: z.email({ error: (iss) => iss.input != null ? "Harus berupa huruf" : "Email Harus diisi" })
        .openapi({ example: "derik@gmail.com" }),
    password: z.string().openapi({ example: "derik" })
}

/**==================
 * Request Schema
 * ==================*/
export const LoginInputSchema = z.object({
    ...BaseAuthSchema
})

export const RegisterInputSchema = z.object({
    name: z.string(),
    ...BaseAuthSchema,
    age: z.number(),
    address: z.string().optional(),
})


/**==================
 * Response Schema
 * ==================*/
export const LoginResponseSchema = z.object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: "derik" }),
    email: z.string().openapi({ example: "derik@gmail.com" }),
    age: z.number().openapi({ example: 22 }),
    address: z.string().openapi({ example: "Besuki Tulungagung" }),
    token: z.string().openapi({ example: 1 })
})

export const RegisterResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
})


export type LoginInput = z.infer<typeof LoginInputSchema>
export type RegisterInput = z.infer<typeof RegisterInputSchema>


