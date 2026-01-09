import { FastifyInstance } from "fastify"
import { helloRoutes } from "./helloRoutes"

export async function routes(app: FastifyInstance){
    app.register(helloRoutes)
}