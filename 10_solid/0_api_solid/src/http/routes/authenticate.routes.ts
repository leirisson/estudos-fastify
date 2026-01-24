import { FastifyInstance } from "fastify"
import { AthenticateController } from "../controller/authenticate.controller"
import { makeRegisterUseCase } from "@/use-cases/factories/make.register.use.case"

const useCase = makeRegisterUseCase()
const authenticateController = new AthenticateController(useCase)

export async function authenticateRoutes(app: FastifyInstance) {
    app.post('/sessions', (request, reply) => authenticateController.register(request, reply))
}