import { FastifyInstance } from "fastify";
import cors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt";
import requestDecorator from "./request_decorator";
import { AppInstance } from "../app";


export default async function registerPlugins(server: AppInstance) {
    await requestDecorator(server)

    await server.register(cors, {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    })
    await server.register(fastifyJwt, { secret: "supersecret" })
}