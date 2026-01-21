import { prisma } from "@/lib/prisma"
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
    const hashPassword = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
        where: { email }
    })

    if (userWithSameEmail) {
        throw new Error('E-mail alredy exists.')
    }

    await prisma.user.create({
        data: {
            name,
            email,
            hashPassword
        }
    })
}