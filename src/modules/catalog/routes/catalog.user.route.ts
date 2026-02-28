import { FastifyInstance } from "fastify";
import { catalogController } from "../catalog.controller";


async function catalogRouteUser(server: FastifyInstance) {
    server.get('/', catalogController.getAllCatalog)
}

export default catalogRouteUser