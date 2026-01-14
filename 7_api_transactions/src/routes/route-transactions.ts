import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../config-database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'



export async function transactionsRoutes(app: FastifyInstance) {
    app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        const transactions = await knex('transactions').select('*')
        console.log(transactions)
        return reply.send({transactions})
    })

    app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        // create schema for validade data type
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { amount, title, type } = createTransactionBodySchema.parse(request.body)

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1
        })

        return reply.status(201).send()
    })
}