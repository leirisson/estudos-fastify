import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../config-database'

export async function routesHello(app: FastifyInstance) {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const tables = await knex('sqlite_schema').select('*')
    return reply.send(tables)
  })
}
