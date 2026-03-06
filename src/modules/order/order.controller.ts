import { FastifyReply, FastifyRequest } from "fastify";
import { createOrderInput } from "./order.schema";
import OrderService from "./order.service";
import { responseFormater } from "../../../utils/response";
import UserService from "../user/user.service";


async function order(request: FastifyRequest<{ Body: createOrderInput }>, reply: FastifyReply) {
    const result = await OrderService.createOrder(request.body)
    const idUser = Number(request.id)
    const user = await UserService.findUserById(idUser)

    let message = `*Order Baru Masuk*\n\n`;
    message += `Nama: ${result.customer_name}\n`;
    message += `Alamat: ${result.customer_address}\n`;
    message += `No. HP: ${result.customer_phone}\n`;
    message += `Catatan: ${result.customer_note}\n\n`;
    message += `Detail Order:\n`;

    result.orderItems.forEach((item, i) => {
        message += `${i + 1}. ${item.catalog.title}\n`;
        message += `   Jumlah: ${item.qty}\n`;
        message += `   Harga: Rp.${item.price.toLocaleString()}\n`;
        message += `   Total: Rp.${item.total_price.toLocaleString()}\n`;
    });

    message += `\nTotal Bayar: Rp.${result.total_price.toLocaleString()}`;

    const waLink = `https://wa.me/6282233795350?text=${encodeURIComponent(message)}`;

    reply.code(200).send(responseFormater(200, 'success', { ...result, waLink: waLink }))
}

const OrderController = { order }
export default OrderController