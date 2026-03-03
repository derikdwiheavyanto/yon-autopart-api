import fp from 'fastify-plugin'
import { IInputUpload } from '../middleware/upload.middleware'



export default fp(async function (server) {
    server.decorateRequest('startTime', 0)
    server.decorateRequest('isError', false)
    
    // decorator request for image upload middleware
    server.decorateRequest<IInputUpload | null>('inputUploads', null)
})

