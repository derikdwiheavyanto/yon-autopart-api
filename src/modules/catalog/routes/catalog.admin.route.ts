import { FastifyInstance } from "fastify";
import { catalogController } from "../catalog.controller";
import { authMiddleware } from "../../../middleware/auth.middleware";


/**
 * Register all catalog admin routes to a Fastify server
 * @param {FastifyInstance} server - The Fastify server to register the routes to
 *
 */
async function catalogRouteAdmin(server: FastifyInstance) {
    server.addHook('onRequest', authMiddleware)
    server.get('/', {
        schema: {
            security: [{ bearerAuth: [] }]
        }
    }, catalogController.getAllCatalog)
    server.get('/:id', {
        schema: {
            security: [{ bearerAuth: [] }]
        }
    }, catalogController.getCatalogById)
    server.post('/', {
        schema: {
            security: [{ bearerAuth: [] }]
        }
    }, catalogController.createCatalog)
    server.patch('/:id', {
        schema: {
            security: [{ bearerAuth: [] }]
        }
    }, catalogController.updateCatalog)
    server.delete('/:id', {
        schema: {
            security: [{ bearerAuth: [] }]
        }
    }, catalogController.deleteCatalog)
}

export default catalogRouteAdmin