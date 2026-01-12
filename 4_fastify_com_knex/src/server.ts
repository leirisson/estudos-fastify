import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from './app'
import {knex} from './database'

app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const tables = await knex('sqlite_schema').select('*')
  return tables
})

async function startServer() {
  try {
    app.listen({
      port: 3333,
    })
    console.log(`HTTP SERVER FUNCIONANDO EM: http://localhost:3333`)
  } catch (error) {
    console.error(error)
  }
}

startServer()
