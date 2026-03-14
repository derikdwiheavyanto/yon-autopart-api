import { FastifyInstance } from "fastify";
import { buildSchema } from "../../../../utils/build_scema";
import OrderController from "../order.controller";
import { UpdateStatusOrderSchema } from "../order.schema";


export async function orderRouterAdmin(server: FastifyInstance) {
    const tags = 'Admin - Order'
    server.get('/', {
        schema: buildSchema({
            tags: [tags],
            summary: "Get All Order"
        })
    }, OrderController.getAllOrder)

    server.get('/:id', {
        schema: buildSchema({
            tags: [tags],
            summary: "Get Detail Order"
        })
    }, OrderController.getOrderById)

    server.patch('/:id', {
        schema: buildSchema({
            tags: [tags],
            summary: "Update Status Order",
            body: UpdateStatusOrderSchema
        })
    }, OrderController.updateStatusOrder)


}