import { FastifyInstance } from "fastify"
import { RegisterController } from "../controller/register.controller"
import { PrismaUsersRepository } from '@/repository/prisma/prisma.user.repository'
import { RegisterUseCase } from '@/use-cases/register'



// usando inverção de dependencias

const usersRepository = new PrismaUsersRepository()
const resgisterUseCase = new RegisterUseCase(usersRepository)
const registerController = new RegisterController(resgisterUseCase)


export async function registerRoutes(app: FastifyInstance) {
    app.post('/', (request, reply) => registerController.register(request, reply))
}