import { prisma } from '@/lib/prisma'
import { Prisma, User } from "generated/prisma"
import { UserRepository } from '../user.repository'

export class PrismaUsersRepository implements UserRepository {

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        })

        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        return user
    }

    
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        })

        return user
    }
}