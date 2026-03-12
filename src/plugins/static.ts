import fp from 'fastify-plugin'
import fastifyStatic from '@fastify/static'
import path from 'path'

export default fp(async function (app, option) {
    await app.register(fastifyStatic, {
        root: path.join(process.cwd(), 'uploads'),
        prefix: '/uploads/', // URL prefix
    })
})