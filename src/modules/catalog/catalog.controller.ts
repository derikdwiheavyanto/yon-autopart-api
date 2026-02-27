import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { CreateCatalogInput, createCatalogSchema, UpdateCatalogInput } from "./catalog.schema";
import catalogService from "./catalog.service";
import { responseFormater } from "../../../utils/response";


/**
 * Get all catalogs from the database.
 * @returns {Promise<FastifyReply>} a promise containing the response of the API
 * @example
 * const response = await getAllCatalog(request, reply)
 * const catalog = response.body
 * console.log(catalog)
 */
async function getAllCatalog(request: FastifyRequest, reply: FastifyReply) {

    const catalog = await catalogService.getAllCatalog()
    return reply.code(200).send(responseFormater(200, 'success', catalog))

}

/**
 * Get a catalog by its ID.
 * @param {FastifyRequest<{ Params: { id: string } >} request - The request object of Fastify.
 * @param {FastifyReply} reply - The response object of Fastify.
 * @returns {Promise<FastifyReply>} a promise containing the response of the API.
 * @example
 * const response = await getCatalogById(request, reply)
 * const catalog = response.body
 * console.log(catalog)
 */
async function getCatalogById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = Number(request.params.id)
    const catalog = await catalogService.getCatalogById(id)
    if (!catalog) {
        return reply.code(404).send(responseFormater(404, 'error', "Id tidak ditemukan"))
    }
    return reply.code(200).send(responseFormater(200, 'success', catalog))

}

/**
 * Create a new catalog in the database.
 * @param {FastifyRequest<{ Body: CreateCatalogInput }>} request - The request object of Fastify.
 * @param {FastifyReply} reply - The response object of Fastify.
 * @returns {Promise<FastifyReply>} a promise containing the response of the API.
 * @example
 * const response = await createCatalog(request, reply)
 * const catalog = response.body
 * console.log(catalog)
 */
async function createCatalog(request: FastifyRequest<{ Body: CreateCatalogInput }>, reply: FastifyReply) {

    const body = createCatalogSchema.parse(request.body)
    const catalog = await catalogService.createCatalog(body)

    return reply.code(201).send(catalog)

}

async function updateCatalog(request: FastifyRequest<{ Params: { id: string }, Body: UpdateCatalogInput }>, reply: FastifyReply,) {

    const id = Number(request.params.id)
    const body = request.body
    const catalog = await catalogService.updateCatalog({ id: id, input: body })

    return reply.code(200).send(responseFormater(200, "success", catalog))

}

async function deleteCatalog(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = Number(request.params.id)
    const result = await catalogService.deleteCatalog(id)

    if (!result) {
        return reply.code(404).send(responseFormater(404, "error", "Id tidak ditemukan"))
    }

    return reply.code(200).send(responseFormater(200, "success", "Catalog berhasil dihapus"))

}


export const catalogController = {
    createCatalog, getAllCatalog,getCatalogById, updateCatalog, deleteCatalog
}
