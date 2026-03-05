import { FastifyInstance } from "fastify";
import AuthController from "../auth.controller";
import { LoginInputSchema, LoginResponseSchema, RegisterInputSchema, RegisterResponseSchema } from "../auth.schema";
import { buildSchema } from "../../../../utils/build_scema";
import { responseErrorSchema, responseSchema } from "../../../../utils/response";



async function AuthRoutes(server: FastifyInstance) {
    const tags = "Auth"

    // Login
    server.post('/login', {
        schema: buildSchema({
            tags: [tags],
            summary: "Login User",
            security: false,
            body: LoginInputSchema,
            response: {
                200: responseSchema(200, "success", LoginResponseSchema,),
                401: responseErrorSchema(401, "Unauthorized", "Email atau password salah")
            }
        })
    }, AuthController.login)

    // Register
    server.post('/register', {
        schema: buildSchema({
            tags: [tags],
            summary: "Register User",
            security: false,
            body: RegisterInputSchema,
            response: { 201: responseSchema(201, "success", RegisterResponseSchema) }
        })
    }, AuthController.register)
}

export default AuthRoutes