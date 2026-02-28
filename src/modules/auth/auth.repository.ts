import { prisma } from "../../db/prisma";


async function findByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email: email },
    })
}

const AuthRepository = { findByEmail }
export default AuthRepository