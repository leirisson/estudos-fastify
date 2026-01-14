import fastify from 'fastify'
import { routesHello } from './routes/route-hello'

export const app = fastify()

app.register(routesHello, {
  prefix: 'hello',
})
