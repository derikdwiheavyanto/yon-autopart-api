import { prisma } from "../../db/prisma";
import orderRepository from "./order.repository";
import { CatalogOrderItems, createOrderInput } from "./order.schema";



async function createOrder(orderInput: createOrderInput) {

    return prisma.$transaction(async (tx) => {
        const { catalog_order_items, ...items } = orderInput

        //get catalog price
        const catalogIds = catalog_order_items.map((item) => item.id)
        const catalog = await orderRepository.findCatalogPrice(catalogIds,tx)
        const catalogPriceMap = new Map(catalog.map((c) => [c.id, c.price]))

        //prepare for create order_items
        const orderItemsData: CatalogOrderItems[] = catalog_order_items.map((c) => {
            const price = catalogPriceMap.get(c.id) ?? 0
            return {
                catalogId: c.id,
                qty: c.qty,
                price: price,
                total_price: price * c.qty
            }
        })

        //create order 
        const created_order = await orderRepository.createOrder(orderInput, tx)

        //create order_items
        await orderRepository.createOrderItems(created_order.id, orderItemsData, tx)

        // Sum totalprice in orderitem
        const total = await orderRepository.sumOrderPrice(created_order.id,tx)
        const total_price = total._sum.total_price ?? 0

        // update totalprice in order
        return orderRepository.updateOrderTotalPrice(created_order.id, total_price,tx)

    })
}

const OrderService = {createOrder}
export default OrderService