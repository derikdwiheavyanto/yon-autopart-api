import { FastifyReply, FastifyRequest } from "fastify";
import { createOrderInput, UpdateStatusOrderInput } from "./order.schema";
import OrderService from "./order.service";
import { responseFormater } from "../../../utils/response";


async function order(request: FastifyRequest<{ Body: createOrderInput }>, reply: FastifyReply) {
    const body = request.body

    const result = await OrderService.createOrderandPrepareWA(body)

    reply.code(201).send(responseFormater(201, 'success', result))
}

async function getAllOrder(request: FastifyRequest, reply: FastifyReply) {
    const result = await OrderService.getOrder()

    reply.code(200).send(responseFormater(200, 'success', result))
}

async function updateStatusOrder(request: FastifyRequest<{ Params: { id: string }, Body: UpdateStatusOrderInput }>, reply: FastifyReply) {
    const body = request.body
    const id = Number(request.params.id)
    const result = await OrderService.updateStatusOrder(id, body.status_order)

    reply.code(200).send(responseFormater(200, 'success', result))
}

async function getOrderById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = Number(request.params.id)
    const result = await OrderService.getOrderById(id)

    reply.code(200).send(responseFormater(200, 'success', result))
}




const OrderController = {
    order,
    getOrderById,
    getAllOrder,
    updateStatusOrder
}
export default OrderController