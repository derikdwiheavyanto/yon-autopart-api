import { prisma } from "../../db/prisma";
import { Prisma, PrismaClient } from "../../generated/prisma/client";
import { CatalogOrderItems, createOrderInput } from "./order.schema";


function createOrder(order: createOrderInput, tx?: Prisma.TransactionClient) {
    const client = tx ?? prisma

    const { catalog_order_items, ...otherFIeld } = order

    return client.order.create({
        data: {
            ...otherFIeld
        },
        select: { id: true }
    })
}

function findCatalogPrice(orderids: number[], tx?: Prisma.TransactionClient) {
    const client = tx ?? prisma
    return client.catalog.findMany({
        where: {
            id: { in: orderids },
        },
        select: {
            id: true,
            price: true
        }
    })
}

function createOrderItems(orderId: number, items: CatalogOrderItems[], tx?: Prisma.TransactionClient) {
    const client = tx ?? prisma

    return client.orderItems.createMany({
        data: items.map(item => ({ ...item, orderId })),
    })


}

function updateOrderTotalPrice(orderId: number, totalPrice: number, tx?: Prisma.TransactionClient) {
    const client = tx ?? prisma
    // const select = {
    //     orderItems: {
    //         select: {
    //             catalog:
    //         }
    //     }
    // }
    return client.order.update({
        where: { id: orderId },
        data: { total_price: totalPrice },
        include: { orderItems: { include: { catalog: true } } }
    })
}

function sumOrderPrice(orderId: number, tx?: Prisma.TransactionClient) {
    const client = tx ?? prisma
    return client.orderItems.aggregate({
        where: { orderId: orderId },
        _sum: { total_price: true },
    })
}

const orderRepository = { createOrder, sumOrderPrice, updateOrderTotalPrice, createOrderItems, findCatalogPrice }
export default orderRepository
