import { FastifyReply, FastifyRequest } from "fastify";


export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
        await request.jwtVerify()
}