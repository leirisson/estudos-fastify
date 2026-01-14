import fastify from 'fastify'
import { routesHello } from '../../6_implementando_plugins/src/routes/route-hello'

export const app = fastify()

app.register(routesHello)
