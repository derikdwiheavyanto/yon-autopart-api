import UserRepository from "./user.repository";

async function findUserById(id:number) {
    return UserRepository.findById(id)
}

const UserService = {findUserById}
export default UserService