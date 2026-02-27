import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { errorFormater, zodErrorFormater } from "../../utils/response";
import dotenv from 'dotenv'
import { ZodError } from "zod";
import { onErrorLogging } from "../hook/logger";
dotenv.config()


function zodErrorHandler(error: FastifyError & ZodError, request: FastifyRequest, reply: FastifyReply) {
    const { statusCode, errorFormat } = zodErrorFormater(error)
    reply.code(statusCode).send(errorFormat)
    error.statusCode = 400
    onErrorLogging(request, reply, error)
}
async function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
    const isProduction = process.env.NODE_ENV === 'production'
    const statusCode = error.statusCode ?? 500
    const showsError = isProduction && statusCode >= 500 ? false : true

    const typeError = showsError ? error.name : "Internal Server Error"
    const message = showsError ? error.message : "Mohon maaf terjadi kesalahan "

    if (error instanceof ZodError) {
        zodErrorHandler(error, request, reply)
        onErrorLogging(request, reply, error)

        return
    }

    reply.code(statusCode).send(errorFormater(statusCode, typeError, message))
    onErrorLogging(request, reply, error)
}


export default errorHandler