import { prisma } from "../../db/prisma";
import { RegisterInput } from "./auth.schema";


const selectUserProperty = {
    id: true,
    name: true,
    email: true,
    age: true,
    address: true
}

async function findByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email: email },
    })
}

async function createUser(input: RegisterInput) {
    return await prisma.user.create({
        data: { ...input },
        select: { ...selectUserProperty }
    })
}

const AuthRepository = { findByEmail, createUser }
export default AuthRepository