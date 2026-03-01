import { FastifyInstance } from 'fastify'
import { AppInstance } from '../app'

export default async function requestDecorator(app: AppInstance) {
    app.decorateRequest('startTime', 0)
    app.decorateRequest('isError', false)
}