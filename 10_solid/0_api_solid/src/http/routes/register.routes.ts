import { FastifyInstance } from "fastify"
import { register } from "../controller/register.controller"


export async function registerRoutes(app: FastifyInstance){
    app.post('/', register)
}