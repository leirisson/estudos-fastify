import { Prisma } from "generated/prisma"

export class PrismausersRepository {
    public users: Prisma.UserCreateInput[] = []
    
    async create(data: Prisma.UserCreateInput) {
        this.users.push(data)
    }

}