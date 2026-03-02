import fp from 'fastify-plugin'



export default fp(async function(server) {
    server.decorateRequest('startTime', 0)
    server.decorateRequest('isError', false)
})

