import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from './app'
import { knex } from './database'
import crypto from 'node:crypto'
import { env } from './env'

app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  const tables = await knex('transactions').select('*')
  return reply.send(tables)
})

app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
  const { title, amount } = request.body as any
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title,
      amount,
    })
    .returning('*')

  return reply.send(transaction)
})

async function startServer() {
  try {
    app.listen({
      port: env.PORT,
    })
    console.log(`HTTP SERVER FUNCIONANDO EM: http://localhost:3333`)
  } catch (error) {
    console.error(error)
  }
}

startServer()
