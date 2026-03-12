import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const envSchema = z.object({

    PORT: z.coerce.number().default(3000),
    HOST: z.string().default("0.0.0.0"),
    API_URL: z.string().default("http://localhost:3333"),
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),

    JWT_SECRET: z.string(),

    CORS_ORIGIN: z
        .string()
        .optional()
        .transform((val) => {
            if (!val || val.trim() === "") return []
            return val
                .split(",")
                .map(v => v.trim())
                .filter(v => v.length > 0)
        }),

    CORS_METHODS: z
        .string()
        .default("GET,POST,PATCH,DELETE")
        .transform((val) => val.split(",")),

    CORS_CREDENTIALS: z
        .string()
        .default("true")
        .transform((val) => val === "true"),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
    console.error("❌ Invalid environment variables")
    console.error(parsed.error.format())
    process.exit(1)
}

export const config = {
    port: parsed.data.PORT,
    host: parsed.data.HOST,
    nodeEnv: parsed.data.NODE_ENV,
    jwtSecret: parsed.data.JWT_SECRET,
    apiUrl: parsed.data.API_URL,
    cors: {
        origin: parsed.data.CORS_ORIGIN,
        methods: parsed.data.CORS_METHODS,
        credentials: parsed.data.CORS_CREDENTIALS,
    },
    isProduction: parsed.data.NODE_ENV === "production",
}