import { FastifyInstance } from "fastify"
import { RegisterController } from "../controller/register.controller"
import { PrismaUsersRepository } from '@/repository/prisma.user.repository'
import { RegisterUseCase } from '@/use-cases/register'


// usando inverção de dependencias
const userPrismaRepository = new PrismaUsersRepository()
const resgisterUseCase = new RegisterUseCase(userPrismaRepository)
const registerController = new RegisterController(resgisterUseCase)


export async function registerRoutes(app: FastifyInstance) {
    app.post('/', (request, reply) => registerController.register(request, reply))
}