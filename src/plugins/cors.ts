import fp from 'fastify-plugin'
import cors from '@fastify/cors'

export default fp(async function (app, option) {
    const origins = process.env.CORS_ORIGIN?.split(",") || []
    const methods = process.env.CORS_METHODS?.split(",") || ["GET"]

    await app.register(cors, {
        origin: origins.length > 1 ? origins : origins[0] || "*",
        methods: methods,
        credentials: process.env.CORS_CREDENTIALS === "true"
    })
})