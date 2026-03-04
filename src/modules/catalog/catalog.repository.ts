import { prisma } from "../../db/prisma"
import { IInputUpload } from "../../middleware/upload.middleware"


export async function findAll() {
    return await prisma.catalog.findMany({ include: { images: true } })

}

export async function getCatalogById(id: number) {
    return await prisma.catalog.findUnique({
        where: { id },
    })

}

export async function createCatalog(input: IInputUpload) {

    return await prisma.catalog.create({
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

export async function updateCatalog(id: number, input: any) {
    const { images, ...otherField } = input
    const data: Record<string, any> = {}
    for (const key in input) {
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
    return await prisma.catalog.update({
        where: { id: id },
        data: data,
        include: {
            images: true
        }
    })


}

export async function deleteCatalog(id: number) {

    return await prisma.catalog.delete({
        where: {
            id: id
        },
        include: { images: true },
    })


}


