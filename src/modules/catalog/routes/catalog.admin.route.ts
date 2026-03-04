import { FastifyInstance } from "fastify";
import { catalogController } from "../catalog.controller";
import { buildSchema } from "../../../../utils/build_scema";
import { responseSchema } from "../../../../utils/response";
import { createCatalogSchema, ResponseCatalogSchema, UpdateCatalogSchema } from "../catalog.schema";
import z from "zod";
import { uploadMiddleware } from "../../../middleware/upload.middleware";


/**
 * Register all catalog admin routes to a Fastify server
 * @param {FastifyInstance} server - The Fastify server to register the routes to
 *
 */
async function catalogRouteAdmin(server: FastifyInstance) {
    const tags = "Admin"

    server.get('/', {
        schema: buildSchema({
            tags: [tags],
            summary: "Get All Catalog",
            response: {
                200: responseSchema(200, "success", z.array(ResponseCatalogSchema)),
            }
        })
        
    }, catalogController.getAllCatalog)

    server.get('/:id', {
        schema: buildSchema({
            tags: [tags],
            summary: "Get Catalog By Id",
            response: {
                200: responseSchema(200, "success", ResponseCatalogSchema),
            }
        })
    }, catalogController.getCatalogById)


    server.post('/', {
        preHandler: uploadMiddleware,
        schema: {
            consumes: ['multipart/form-data'],
            // deprecated: true,
            ...buildSchema({
                tags: [tags],
                summary: "Create Catalog",
                body: createCatalogSchema,
                response: {
                    200: responseSchema(200, "success", ResponseCatalogSchema),
                }
            }),
        }
    }, catalogController.createCatalog)

    server.patch('/:id', {
        preHandler: uploadMiddleware,
        schema: {
            consumes: ['multipart/form-data'],
            ...buildSchema({
                tags: [tags],
                summary: "Update Catalog",
                body: UpdateCatalogSchema,
                response: {
                    200: responseSchema(200, "success", ResponseCatalogSchema),
                }
            })
        }
    }, catalogController.updateCatalog)

    server.delete('/:id', {
        schema: buildSchema({
            tags: [tags],
            summary: "Delete Catalog",
            response: {
                200: responseSchema(200, "success", z.string().meta({ example: "Catalog berhasil dihapus" })),
            }
        })
    }, catalogController.deleteCatalog)
}

export default catalogRouteAdmin