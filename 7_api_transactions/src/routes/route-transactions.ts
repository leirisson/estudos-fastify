import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../config-database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionExists } from '../middlewares/check-session-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    // create schema for validade data type
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { amount, title, type } = createTransactionBodySchema.parse(
      request.body,
    )

    // criando o cookies
    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // vai durar 7 dias
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })

  app.get(
    '/',
    { preHandler: [checkSessionExists] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select('*')
      return reply.send({ transactions })
    },
  )

  app.get(
    '/:id',
    { preHandler: [checkSessionExists] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const getTransactionParamsSchema = z.object({
        id: z.uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)

      const transaction = await knex('transactions').where({ id }).first()

      return reply.send({ transaction })
    },
  )

  app.get(
    '/sumary',
    { preHandler: [checkSessionExists] },
    async (request: FastifyRequest) => {
      const { sessionId } = request.cookies
      const sumary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { sumary }
    },
  )
}
