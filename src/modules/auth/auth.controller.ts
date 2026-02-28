import { FastifyReply, FastifyRequest } from "fastify";
import { LoginInputSchema, RegisterInputSchema } from "./auth.schema";
import AuthService from "./auth.service";
import { responseFormater } from "../../../utils/response";



async function login(request: FastifyRequest, reply: FastifyReply) {
    const body = LoginInputSchema.parse(request.body)
    const user = await AuthService.login(body)

    const payload = { id: user.id }
    const token = await reply.jwtSign(payload, {
        sign: {
            expiresIn: '10m'
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

async function register(request: FastifyRequest, reply: FastifyReply) {
    const body = RegisterInputSchema.parse(request.body)
    const user = await AuthService.register(body)

    return reply.code(200).send(responseFormater(200, "success", user))

}

const AuthController = { login, register }

export default AuthController