import { FastifyInstance } from "fastify"
import { RegisterController } from "../controller/register.controller"
import { makeAuthenticateUseCase } from "@/use-cases/factories/make.authenticate.use.case"

const useCase = makeAuthenticateUseCase()
const registerController = new RegisterController(useCase)

export async function registerRoutes(app: FastifyInstance) {
    app.post('/', (request, reply) => registerController.register(request, reply))
}