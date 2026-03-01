import fp from 'fastify-plugin'
import { AppInstance } from '../app'



export default fp(async function(server) {
    server.decorateRequest('startTime', 0)
    server.decorateRequest('isError', false)
})

