import fs from "fastify-plugin";


export default fs(async function (server) {
    server.register(import('@fastify/multipart'), { attachFieldsToBody: true})
})