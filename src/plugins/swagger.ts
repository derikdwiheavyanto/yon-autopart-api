import fastifySwagger from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import fp from "fastify-plugin";
import { config } from "../config";


export default fp(async function (server) {
    await server.register(fastifySwagger, {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Yon Auto-Part API DOCS',
                description: 'Documentation API for Yon Auto-Part APP ',
                version: '0.1.0'
            },
            servers: [
                {
                    url: config.apiUrl,
                    description: 'Development server'
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            },
        },
        transform: jsonSchemaTransform
    })

    await server.register(import('@fastify/swagger-ui'), {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function (request, reply, next) { next() },
            preHandler: function (request, reply, next) { next() }
        },
        staticCSP: false,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
        transformSpecificationClone: true
    })

})