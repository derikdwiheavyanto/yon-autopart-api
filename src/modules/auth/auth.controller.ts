import { FastifyReply, FastifyRequest } from "fastify";
import { LoginInput, RegisterInput } from "./auth.schema";
import AuthService from "./auth.service";
import { responseFormater } from "../../../utils/response";



async function login(request: FastifyRequest<{Body:LoginInput}>, reply: FastifyReply) {
    const user = await AuthService.login(request.body)

    const payload = { id: user.id }
    const token = await reply.jwtSign(payload, {
        sign: {
            expiresIn: '1D'
        }
    })

    return reply.code(200).send(
        responseFormater(
            200,
            "success",
            {
                ...user,
                token: token
            })
    )
}

async function register(request: FastifyRequest<{Body: RegisterInput}>, reply: FastifyReply) {
    const user = await AuthService.register(request.body)

    return reply.code(200).send(responseFormater(200, "success", user))

}

const AuthController = { login, register }

export default AuthController