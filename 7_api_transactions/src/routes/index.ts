import {FastifyInstance} from 'fastify'
import { routeHello } from './route-hello'
import { transactionsRoutes } from './route-transactions'


export async function routes(app:FastifyInstance){
    app.register(routeHello, {prefix: 'hello'})
    app.register(transactionsRoutes, {prefix: 'transactions'})
}

