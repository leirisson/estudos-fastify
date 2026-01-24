import { FastifyInstance } from "fastify"
import { PrismaUsersRepository } from '@/repository/prisma/prisma.user.repository'
import { AthenticateUseCase } from "@/use-cases/authenticate"
import { AthenticateController } from "../controller/authenticate.controller"



// usando inverção de dependencias

const usersRepository = new PrismaUsersRepository()
const resgisterUseCase = new AthenticateUseCase(usersRepository)
const authenticateController = new AthenticateController(resgisterUseCase)


export async function authenticateRoutes(app: FastifyInstance) {
    app.post('/sessions', (request, reply) => authenticateController.register(request, reply))
}