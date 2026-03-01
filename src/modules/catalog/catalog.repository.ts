import { prisma } from "../../db/prisma"
import { CreateCatalogInput, UpdateCatalogInput } from "./catalog.schema"


export async function findAll() {
    return await prisma.catalog.findMany({ include: { images: true } })

}

export async function getCatalogById(id: number) {
    return await prisma.catalog.findUnique({
        where: { id },
    })

}

export async function createCatalog(input: any) {
    return await prisma.catalog.create({
        data: {
            title: input.title,
            price: input.price,
            description: input.description,
            images: {
                create: input.images.map((url: string) => ({
                    url
                }))
            }
        },
        include: {
            images: true
        }
    })
}

export async function updateCatalog(id: number, input: any) {

    return await prisma.catalog.update({
        where: { id: id },
        data: input
    })


}

export async function deleteCatalog(id: number) {

    return await prisma.catalog.delete({
        where: {
            id: id
        }
    })


}


