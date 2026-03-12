import { FastifyReply, FastifyRequest } from "fastify";
import { createOrderInput } from "./order.schema";
import OrderService from "./order.service";
import { responseFormater } from "../../../utils/response";


async function order(request: FastifyRequest<{ Body: createOrderInput }>, reply: FastifyReply) {
    const body = request.body

    const result = await OrderService.createOrderandPrepareWA(body)

    reply.code(200).send(responseFormater(200, 'success', result))
}

const OrderController = { order }
export default OrderController