import { prisma } from "@/lib/prisma"
import { PrismausersRepository } from "@/repository/prisma.user.repository"
import { hash } from "bcryptjs"

interface registerUseCaseRequest {
    name: string,
    email: string
    password: string
}
export async function registerUseCase({
    name,
    email,
    password
}: registerUseCaseRequest) {

    // transformando a senha em hash
    const hashPassword = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
        where: { email }
    })

    if (userWithSameEmail) {
        throw new Error('E-mail alredy exists.')
    }

   const prismaUserRepository = new PrismausersRepository()

   await prismaUserRepository.create({name, email, hashPassword})
}