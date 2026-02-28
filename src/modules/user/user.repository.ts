import { prisma } from "../../db/prisma";



async function findById(id: number) {
    return await prisma.user.findUnique({
        where: { id }
    })
}

async function findAll() {
    return await prisma.user.findMany()
}




const UserRepository = { findById }

export default UserRepository