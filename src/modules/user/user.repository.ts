import { prisma } from "../../db/prisma";



function findById(id: number) {
    return prisma.user.findUnique({
        where: { id }
    })
}

function findAll() {
    return prisma.user.findMany()
}




const UserRepository = { findById }

export default UserRepository