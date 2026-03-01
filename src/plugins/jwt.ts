import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

export default fp(async function (server) {
    await server.register(fastifyJwt, { secret: "supersecret" })

})