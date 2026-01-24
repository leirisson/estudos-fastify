import { PrismaUsersRepository } from "@/repository/prisma/prisma.user.repository"
import { AthenticateUseCase } from "../authenticate"

export function makeRegisterUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const resgisterUseCase = new AthenticateUseCase(usersRepository)

    return resgisterUseCase
}