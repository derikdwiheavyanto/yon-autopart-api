import {z} from "zod";


const BaseAuthSchema = {
    email: z.email({ error: (iss) => iss.input != null ? "Harus berupa huruf" : "Email Harus diisi" }),
    password: z.string()
}

export const LoginInputSchema = z.object({
    ...BaseAuthSchema
})

const RegisterInputSchema = z.object({
    name: z.string(),
    ...BaseAuthSchema,
    age: z.number().optional(),
    address: z.string().optional(),
})


export type LoginInput = z.infer<typeof LoginInputSchema>


