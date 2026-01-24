import { PrismaUsersRepository } from "@/repository/prisma/prisma.user.repository"
import { RegisterUseCase } from "../register"


export function makeAuthenticateUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const resgisterUseCase = new RegisterUseCase(usersRepository)

    return resgisterUseCase

}