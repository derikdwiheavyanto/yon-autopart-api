import fastify from "fastify"
import { log } from "./config/log"
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import errorHandler from "./errors/error_handler"
import { config } from "./config"


export function buildApp() {

    const server = fastify({
        loggerInstance: log,
        disableRequestLogging: config.isProduction ? false : true,
    }).withTypeProvider<ZodTypeProvider>()

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    //errorHanlder
    server.setErrorHandler(errorHandler)

    return server
}

export type AppInstance = ReturnType<typeof buildApp>