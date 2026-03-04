import fp from 'fastify-plugin'
import cors from '@fastify/cors'
import { config } from '../config'

export default fp(async function (app, option) {

    await app.register(cors, {
        origin: config.cors.origin.length > 0
            ? config.cors.origin
            : true,
        methods: config.cors.methods || ["GET"],
        credentials: process.env.CORS_CREDENTIALS === "true"
    })
})