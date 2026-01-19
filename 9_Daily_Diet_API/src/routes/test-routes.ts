import { FastifyInstance } from 'fastify'
import { knex } from '../config-database'

export async function apiRouteTest(app: FastifyInstance) {
    app.get('/', async (request, reply) => {
        const table = await knex('sqlite_schema').select('*')
        return reply.send(table)
    })
}