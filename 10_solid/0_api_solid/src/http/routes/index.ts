import { FastifyInstance } from "fastify"
import { registerRoutes } from "./register.routes"
import { authenticateRoutes } from "./authenticate.routes"


export async function appRoutes(app: FastifyInstance){
    app.register(registerRoutes, {prefix: '/users'})
    app.register(authenticateRoutes, {prefix: '/auth'})
}