import { prisma } from "../../db/prisma"
import { CreateCatalogInput, UpdateCatalogInput } from "./catalog.schema"


export async function findAll() {
    return await prisma.catalog.findMany()

}

export async function getCatalogById(id: number) {
    return await prisma.catalog.findUnique({
        where: { id },
    })

}

export async function createCatalog(input: CreateCatalogInput) {
    return await prisma.catalog.create({
        data: input
    })
}

export async function updateCatalog(id: number, input: UpdateCatalogInput) {

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


