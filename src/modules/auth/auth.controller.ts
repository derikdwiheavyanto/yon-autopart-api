import { FastifyReply, FastifyRequest } from "fastify";
import { LoginInputSchema } from "./auth.schema";
import AuthService from "./auth.service";
import { responseFormater } from "../../../utils/response";



async function login(request: FastifyRequest, reply: FastifyReply) {
    const body = LoginInputSchema.parse(request.body)
    const user = await AuthService.login(body)

    return reply.code(200).send(responseFormater(200, "success", user))
}

const AuthController = {login}

export default AuthController