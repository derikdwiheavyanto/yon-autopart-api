import AuthRepository from "./auth.repository"
import { LoginInput, RegisterInput } from "./auth.schema"
import bcrypt from "bcrypt"
import { UnauthorizedError } from "../../errors/UnautorizedError"
import { AlreadyUserError } from "../../errors/AlreadyUsersError"


async function login(input: LoginInput) {
    try {
        const user = await AuthRepository.findByEmail(input.email)
        if (!user) {
            throw new UnauthorizedError("Email atau password salah")
        }

        const verifyPassword = await bcrypt.compare(input.password, user.password)
        if (!verifyPassword) {
            throw new UnauthorizedError("Email atau password salah")
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.age,
            address: user.address
        }
    } catch (error) {
        throw new UnauthorizedError()
    }
}

async function register(input: RegisterInput) {
    if (await AuthRepository.findByEmail(input.email)) { throw new AlreadyUserError() }

    const saltRound = 10
    const password = input.password
    const hash = await bcrypt.hash(password, saltRound)

    return await AuthRepository.createUser({ ...input, password: hash })
}


const AuthService = { login, register }
export default AuthService