import { FastifyInstance } from "fastify";
import { catalogController } from "../catalog.controller";
import { buildSchema } from "../../../../utils/build_scema";
import {responseSchema } from "../../../../utils/response";
import { ResponseCatalogSchema } from "../catalog.schema";
import z from "zod";


async function catalogRouteUser(server: FastifyInstance) {
    const tags = "Public"
    server.get('/catalog', {
        schema: buildSchema({
            tags: [tags],
            summary: "Get ALl Catalog",
            security: false,
            response: {
                200: responseSchema(200, "success", z.array(ResponseCatalogSchema)),
            }
        })
    }, catalogController.getAllCatalog)
}

export default catalogRouteUser