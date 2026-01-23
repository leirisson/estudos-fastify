import { FastifyInstance } from "fastify"
import { productRoutes } from "./product.routes"

export async function appRoutes(app: FastifyInstance) {

    app.register(productRoutes, { prefix: '/products' })

}