import { z } from "zod"

/**==================
 * Base Schema
 * ==================*/
const BaseAuthSchema = {
    email: z.email({ error: (iss) => iss.input != null ? "Harus berupa huruf" : "Email Harus diisi" }),
    password: z.string()
}

const BaseAuthResponseExample = {
    name: "derik",
    email: "derik@gmail.com",
    age: 22,
    address: "Besuki Tulungagung"
}

/**==================
 * Request Schema
 * ==================*/
export const LoginInputSchema = z.object({
    ...BaseAuthSchema
}).meta({
    example: {
        email: "derik@gmail.com",
        password: "derik"
    }
})

export const RegisterInputSchema = z.object({
    name: z.string(),
    ...BaseAuthSchema,
    age: z.number(),
    address: z.string().optional(),
}).meta({
    example: {
        ...BaseAuthResponseExample,
        password: "derik",

    }
})


/**==================
 * Response Schema
 * ==================*/
export const LoginResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    age: z.number(),
    address: z.string(),
    token: z.string()
}).meta({
    example: {
        ...BaseAuthResponseExample,
        token: "token"

    }
})

export const RegisterResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    age: z.number(),
    address: z.string(),
}).meta({
    example: {
        ...BaseAuthResponseExample,
    }
})


export type LoginInput = z.infer<typeof LoginInputSchema>
export type RegisterInput = z.infer<typeof RegisterInputSchema>


