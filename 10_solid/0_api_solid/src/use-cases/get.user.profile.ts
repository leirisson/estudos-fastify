import { UserRepository } from "@/repository/user.repository";
import { User } from "generated/prisma";
import { ResouserNotExistsError } from "./errors/resoucer.not.found.erros";


interface GetUserPtrofileRequest {
    userId: string
}

interface GetUserPtrofileResPonse {
    user: User
}
export class GetUserPrifolileUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({ userId }: GetUserPtrofileRequest): Promise<GetUserPtrofileResPonse> {

        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new ResouserNotExistsError()
        }

        return { user }
    }
}