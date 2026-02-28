import { email } from "zod"
import UserRepository from "../user/user.repository"
import AuthRepository from "./auth.repository"
import { LoginInput } from "./auth.schema"
import bcrypt from "bcrypt"
import { UnauthorizedError } from "../../errors/UnautorizedError"


async function login(input: LoginInput) {
    const user = await AuthRepository.findByEmail(input.email)
    if (!user) {
        throw new UnauthorizedError()
    }

    const verifyPassword = await bcrypt.compare(input.password, user.password)
    if (!verifyPassword) {
        throw new UnauthorizedError()
    }


    return {
        name: user.name,
        email: user.email,
        age: user.age,
        address: user.address
    }
}


const AuthService = { login }
export default AuthService