import { prisma } from "../../db/prisma";
import { Prisma, PrismaClient, StatusOrder } from "../../generated/prisma/client";
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

function getOrder() {
    return prisma.order.findMany()
}

function updateStatusOrder(id: number, status_order: StatusOrder) {
    return prisma.order.update({
        where: { id },
        data: { status_order: status_order }
    })
}

function getOrderById(id: number) {
    return prisma.order.findUnique({
        where: { id },
        select: {
            id: true,
            customer_name: true,
            customer_address: true,
            customer_phone: true,
            customer_note: true,
            status_order: true,
            total_price: true,
            orderItems: {
                select: {
                    catalogId: true,
                    price: true,
                    qty: true,
                    total_price: true,
                    catalog: {
                        omit: { price: true, updated_at: true, created_at: true, id: true }
                    }
                }
            }
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

const orderRepository = {
    createOrder,
    sumOrderPrice,
    updateOrderTotalPrice,
    createOrderItems,
    findCatalogPrice,
    getOrder,
    updateStatusOrder,
    getOrderById
}
export default orderRepository
