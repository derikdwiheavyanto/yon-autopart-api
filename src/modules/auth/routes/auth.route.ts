import { FastifyInstance } from "fastify";
import AuthController from "../auth.controller";



async function AuthRoutes(server:FastifyInstance) {
    server.post('/login', AuthController.login)
}

export default AuthRoutes