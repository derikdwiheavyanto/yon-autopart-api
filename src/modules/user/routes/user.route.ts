// import fastify, { FastifyInstance } from "fastify";
// import { catalogController } from "../catalog.controller";
// import { authMiddleware } from "../../../middleware/auth.middleware";


// /**
//  * Register all catalog admin routes to a Fastify server
//  * @param {FastifyInstance} server - The Fastify server to register the routes to
//  *
//  */
// async function catalogRouteAdmin(server: FastifyInstance) {
//     server.addHook('onRequest',authMiddleware)
//     server.get('/', catalogController.getAllCatalog)
//     server.get('/:id', catalogController.getCatalogById)
//     server.post('/', catalogController.createCatalog)
//     server.patch('/:id', catalogController.updateCatalog)
//     server.delete('/:id', catalogController.deleteCatalog)
// }

// export default catalogRouteAdmin