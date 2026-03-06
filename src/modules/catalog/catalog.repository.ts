import { prisma } from "../../db/prisma"
import { IInputUpload } from "../../middleware/upload.middleware"


export function findAll() {
    return prisma.catalog.findMany({ include: { images: true } })

}

export function getCatalogById(id: number) {
    return prisma.catalog.findUnique({
        where: { id },
        include: { images: true }
    })

}

export function findCatalogByIds(id: number[]) {
    return prisma.catalog.findMany({
        where: { id: { in: id } }
    })
}

export function createCatalog(input: IInputUpload) {

    return prisma.catalog.create({
        data: {
            title: input?.title ?? "",
            price: input?.price ?? 0,
            description: input?.description ?? "",
            images: {
                create: input.images?.map((url: string) => ({ url })) ?? []
            }
        },
        include: {
            images: true
        }
    })
}

export function updateCatalog(id: number, input: any) {
    const { images, ...otherField } = input
    const data: Record<string, any> = {}
    for (const key in otherField) {
        const value = input[key]

        if (value !== undefined) {
            data[key] = value
        }
    }

    if (images?.length) {
        data.images = {
            deleteMany: {}, // hapus semua image lama
            create: images.map((img: string) => ({
                url: img
            }))
        }
    }
    return prisma.catalog.update({
        where: { id: id },
        data: data,
        select: {
            id: true,
            title: true,
            description: true,
            price: true,
            images: { omit: { catalogId: true } }
        },

    })


}

export function deleteCatalog(id: number) {

    return prisma.catalog.delete({
        where: {
            id: id
        },
        include: { images: true },
    })


}


