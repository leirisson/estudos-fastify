import { prisma } from '@/lib/prisma'
import { Prisma } from "generated/prisma"

export class PrismaUsersRepository {
    async create(data: Prisma.UserCreateInput) {
        await prisma.user.create({
            data
        })
    }

    async userWithSameEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        })
    }
}