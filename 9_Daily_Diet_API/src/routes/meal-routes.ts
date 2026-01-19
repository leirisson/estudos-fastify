import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { knex } from '../config-database'
import z, { date } from 'zod'
import { randomUUID } from 'node:crypto'

export async function mealRoutes(app: FastifyInstance) {
    app.post('/create', async (request: FastifyRequest, reply: FastifyReply) => {
        const createBodySchemaMeal = z.object({
            name: z.string(),
            user_id: z.string(),
            description: z.string(),
            data: z.string(),
            time: z.string(),
            is_diet: z.boolean().default(true)
        })

        const { name, user_id,  description, time, data, is_diet } = createBodySchemaMeal.parse(request.body)

        const data_completed = new Date(`${data} ${time}`) 

        await knex('meal').insert({
            id: randomUUID(),
            name,
            user_id,
            description,
            is_diet,
            created_at: data_completed
        })

        return reply.status(201).send()

    })


}