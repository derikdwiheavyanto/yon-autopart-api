import fastify from "fastify"
import { log } from "./config/log"
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import errorHandler from "./errors/error_handler"


export function buildApp() {
    const isProduction = process.env.NODE_ENV === 'production'

    const server = fastify({
        loggerInstance: isProduction ? undefined : log,
        disableRequestLogging: true,
    }).withTypeProvider<ZodTypeProvider>()

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    //errorHanlder
    server.setErrorHandler(errorHandler)

    return server
}

export type AppInstance = ReturnType<typeof buildApp>