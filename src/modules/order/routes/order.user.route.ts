import { FastifyInstance } from "fastify";
import OrderController from "../order.controller";
import { buildSchema } from "../../../../utils/build_scema";
import { CreateOrderSchema } from "../order.schema";



export async function orderRouter(server: FastifyInstance) {
    const tags = ["Public"]
    server.post('/', {
        schema: buildSchema({
            tags: tags,
            summary: "Order Few Catalog",
            security: false,
            body: CreateOrderSchema
        })
    }, OrderController.order)
}