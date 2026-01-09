import { FastifyInstance } from 'fastify'
import { productRoute } from './route-product'

export async function routes(app: FastifyInstance) {
    app.register(productRoute)
}