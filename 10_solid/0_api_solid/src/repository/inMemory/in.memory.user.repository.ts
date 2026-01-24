import { Prisma, User } from "generated/prisma"
import { UserRepository } from "../user.repository"

export class InmemoryUsersRepository implements UserRepository {
    public users: Prisma.UserCreateInput[] = []

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email)

        if (!user) {
            return null
        }

        return user as User
    }

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id)

        if (!user) {
            return null
        }

        return user as User
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 'id-1',
            name: data.name,
            email: data.email,
            hashPassword: data.hashPassword,
            createdAt: new Date()
        }
        this.users.push(user)

        return user

    }


}