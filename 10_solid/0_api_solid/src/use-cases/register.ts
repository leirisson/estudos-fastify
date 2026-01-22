import { PrismaUsersRepository } from "@/repository/prisma/prisma.user.repository"
import { UserRepository } from "@/repository/user.repository"
import { hash } from "bcryptjs"
import { UserAlredyExistsError } from "./errors/user.already.exists.error"

interface registerUseCaseRequest {
    name: string,
    email: string
    password: string
}

export class RegisterUseCase {
    constructor(private useRepository: UserRepository) { }

    async execute({ name, email, password }: registerUseCaseRequest) {

        // transformando a senha em hash
        const hashPassword = await hash(password, 6)

        const userWithSameEmail = await this.useRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlredyExistsError()
        } 

        await this.useRepository.create({ name, email, hashPassword })
    }
}
