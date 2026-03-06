import { prisma } from "../../db/prisma";
import { NotFoundError } from "../../errors/NotFoundError";
import catalogService from "../catalog/catalog.service";
import orderRepository from "./order.repository";
import { CatalogOrderItems, createOrderInput } from "./order.schema";



async function createOrder(orderInput: createOrderInput) {

    return prisma.$transaction(async (tx) => {
        const { catalog_order_items, ...items } = orderInput

        //get catalog price
        const catalogIds = catalog_order_items.map((item) => item.id)
        const catalog = await orderRepository.findCatalogPrice(catalogIds, tx)
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
        const total = await orderRepository.sumOrderPrice(created_order.id, tx)
        const total_price = total._sum.total_price ?? 0

        // update totalprice in order
        return orderRepository.updateOrderTotalPrice(created_order.id, total_price, tx)

    })
}

async function createOrderandPrepareWA(body: createOrderInput) {
    const idsCatalog = body.catalog_order_items.map((c) => c.id)
    const isIdsAvailable = await catalogService.isIdsAvailable(idsCatalog)
    if (!isIdsAvailable) {
        throw new NotFoundError("Id tidak ditemukan")
    }

    const result = await createOrder(body)
    const phone = '6282131790614'

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

    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return { ...result, waLink }
}

const OrderService = { createOrder, createOrderandPrepareWA }
export default OrderService