import { FastifyInstance } from "fastify"
import { registerRoutes } from "./register.routes"


export async function appRoutes(app: FastifyInstance){
    app.register(registerRoutes, {prefix: '/users'})
}