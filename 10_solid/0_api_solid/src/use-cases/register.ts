import { PrismaUsersRepository } from "@/repository/prisma.user.repository"
import { hash } from "bcryptjs"

interface registerUseCaseRequest {
    name: string,
    email: string
    password: string
}

export class RegisterUseCase {
    constructor(private useRepository: PrismaUsersRepository) { }

    async execute({ name, email, password }: registerUseCaseRequest) {
        console.log('[DEBUG] passou aqui 2')
        // transformando a senha em hash
        const hashPassword = await hash(password, 6)

        const userWithSameEmail = await this.useRepository.userWithSameEmail(email)

        if (userWithSameEmail) {
            throw new Error('E-mail alredy exists.')
        }

        await this.useRepository.create({ name, email, hashPassword })
    }
}
