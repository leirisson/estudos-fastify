import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../config/database-config'

export function rootRouter(app: FastifyInstance) {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const table = await knex('sqlite_schema').select('*')
    return reply.send(table)
  })
}
