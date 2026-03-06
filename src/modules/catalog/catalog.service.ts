import { IInputUpload } from "../../middleware/upload.middleware";
import * as catalogRepository from "./catalog.repository";
import { UpdateCatalogInput } from "./catalog.schema";


async function isIdAvailable(id: number) {
    if (!await catalogRepository.getCatalogById(id)) {
        return false
    }
    return true
}

async function getAllCatalog() {
    return catalogRepository.findAll()
}

async function getCatalogById(id: number) {
    return catalogRepository.getCatalogById(id)
}

async function createCatalog(input: IInputUpload) {

    return catalogRepository.createCatalog(input)
}

async function updateCatalog({ id, input }: { id: number, input: IInputUpload }) {
    if (!await isIdAvailable(id)) {
        return null
    }
    return catalogRepository.updateCatalog(id, input)
}

async function deleteCatalog(id: number) {
    if (!await isIdAvailable(id)) {
        return null
    }
    return catalogRepository.deleteCatalog(id)
}


const catalogService = { getAllCatalog, createCatalog, updateCatalog, deleteCatalog, getCatalogById }
export default catalogService