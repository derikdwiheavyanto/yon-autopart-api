import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { config } from "../config";

export default fp(async function (server) {
    await server.register(fastifyJwt, { secret: config.jwtSecret ||"Secret" })
})