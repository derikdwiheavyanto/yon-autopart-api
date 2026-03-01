import fp from 'fastify-plugin'
import cors from '@fastify/cors'

export default fp(async function (app,option) {
    await app.register(cors, {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    })
})