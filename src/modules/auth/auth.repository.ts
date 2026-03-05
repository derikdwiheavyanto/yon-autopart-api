import { prisma } from "../../db/prisma";
import { RegisterInput } from "./auth.schema";


const selectUserProperty = {
    id: true,
    name: true,
    email: true,
    age: true,
    address: true
}

function findByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email: email },
    })
}

function createUser(input: RegisterInput) {
    return prisma.user.create({
        data: { ...input },
        select: { ...selectUserProperty }
    })
}

const AuthRepository = { findByEmail, createUser }
export default AuthRepository