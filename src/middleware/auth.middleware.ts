import { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../errors/UnautorizedError";


export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
        try {
                await request.jwtVerify()
        } catch (error: any) {
                request.log.error(`Error: ${error.name}`)
                request.log.error(`Message: ${error.message}`)
                throw new UnauthorizedError(error.message)
        }
}