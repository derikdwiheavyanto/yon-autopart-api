import fastify from "fastify"
import { log } from "./config/log"
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import errorHandler from "./errors/error_handler"


export function buildApp() {

    const server = fastify({
        loggerInstance: log,
        disableRequestLogging: true,
        ajv: {
            plugins: [require("@fastify/multipart").ajvFilePlugin]
        }
    }).withTypeProvider<ZodTypeProvider>()

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    //errorHanlder
    server.setErrorHandler(errorHandler)

    return server
}

export type AppInstance = ReturnType<typeof buildApp>