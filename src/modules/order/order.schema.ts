import z, { number } from "zod";
import { StatusOrder } from "../../generated/prisma/enums";

const baseOrderSchema = {
    customer_name: z.string().meta({ example: "derik" }),
    customer_address: z.string().meta({ example: "Besuki Tulungagung" }),
    customer_phone: z.string().meta({ example: "0822112344271" }),
    customer_note: z.string().optional().meta({ example: "di cat ungu sekalian mas" })
}

const order_item = z.object({
    id: z.number().meta({ example: 1 }),
    qty: z.number().meta({ example: 2 })
})

export const CreateOrderSchema = z.object({
    ...baseOrderSchema,
    catalog_order_items: z.array(order_item).meta({ example: [{ id: 1, qty: 1 }, { id: 2, qty: 2 }] })
})


export const UpdateStatusOrderSchema = z.object({
    status_order: z.enum(StatusOrder, `Status order tidak valid. Nilai yang diperbolehkan: ${Object.values(StatusOrder).join(", ")}`)
})

export interface CatalogOrderItems {
    catalogId: number
    qty: number
    price: number
    total_price: number
}


export type UpdateStatusOrderInput = z.infer<typeof UpdateStatusOrderSchema>
export type createOrderInput = z.infer<typeof CreateOrderSchema> 