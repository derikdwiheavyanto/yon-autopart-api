import { prisma } from "../../db/prisma";



async function findIdUser(id: number) {
    return await prisma.user.findUnique({
        where: { id }
    })
}


const UserRepository = { findIdUser }

export default UserRepository