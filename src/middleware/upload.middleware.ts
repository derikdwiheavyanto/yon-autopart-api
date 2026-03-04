import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCatalogInput, UpdateCatalogInput } from "../modules/catalog/catalog.schema";
import fs from "node:fs"
import path from "node:path";

export interface IInputUpload {
    title?: string;
    price?: number;
    description?: string;
    images?: string[]
}

export async function uploadMiddleware(request: FastifyRequest<{ Params: { id: string }, Body: CreateCatalogInput | UpdateCatalogInput }>, reply: FastifyReply) {
    const { images, ...data } = request.body

    const uploadDir = path.join(process.cwd(), "uploads")
    const savedPath: string[] = []

    if (images != undefined) {
        for await (const image of images) {
            try {
                const filename = `${Date.now()}-${image.filename}`
                const filepath = path.join(uploadDir, filename)
                const bufer = await image.toBuffer()

                await fs.promises.writeFile(filepath, bufer)

                savedPath.push(`/uploads/${filename}`)
            } catch (error) {
                throw error
            }
        }
    }

    const inputUpload: IInputUpload = {
        ...data,
        ...(images && { images: savedPath })
    }
    request.setDecorator('inputUploads', inputUpload)

}