import { FastifyInstance } from 'fastify'
import { rootRouter } from './root-route'

export function routes(app: FastifyInstance) {
  app.register(rootRouter, { prefix: 'root' })
}
