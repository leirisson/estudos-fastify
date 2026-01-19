import { FastifyInstance } from 'fastify'
import { apiRouteTest } from './test-routes'
import { userRoutes } from './user-routes'
import { mealRoutes } from './meal-routes'

export function routes(app: FastifyInstance) {

    app.register(apiRouteTest, { prefix: "/test" })
    app.register(userRoutes, { prefix: '/users' })
    app.register(mealRoutes, { prefix: '/meal' })
}