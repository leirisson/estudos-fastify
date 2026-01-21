import { prisma } from '@/lib/prisma'
import { Prisma } from "generated/prisma"

export class PrismausersRepository {
    async create(data: Prisma.UserCreateInput) {
        await prisma.user.create({
            data
        })
    }

}