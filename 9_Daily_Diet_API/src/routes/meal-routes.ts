import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { knex } from '../config-database'
import z, { date, uuid } from 'zod'
import { randomUUID } from 'node:crypto'
import { formatDatePtBr } from '../utils/formatDatePtBr'

export async function mealRoutes(app: FastifyInstance) {

    app.get('/summary', async (request, reply) => {
        const quantity_meal = await knex('meal')
        .count()
        .first()

        const quantity_meal_indiet = 
         await knex('meal')
        .count()
        .where('is_diet', true)
        .first()

        return reply.send({quantity_meal, quantity_meal_indiet})
    })

    app.get('/all/user-id/:id', async (request, reply) => {
        const schemaIdParams = z.object({
            id: z.uuid()
        })

        const { id } = schemaIdParams.parse(request.params)

        const meal = await knex('meal')
            .where('user_id', id)
   
        return reply.send({ meal })
    })

    app.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const schemaIdParams = z.object({
            id: z.uuid()
        })

        const { id } = schemaIdParams.parse(request.params)

        const meal = await knex('meal')
            .where('id', id)
            .first()

        return reply.send({ meal })
    })

    app.post('/create', async (request: FastifyRequest, reply: FastifyReply) => {
        const createBodySchemaMeal = z.object({
            name: z.string(),
            user_id: z.string(),
            description: z.string(),
            data: z.string(),
            time: z.string(),
            is_diet: z.boolean().default(true)
        })

        const { name, user_id, description, time, data, is_diet } = createBodySchemaMeal.parse(request.body)

        const date_completed = formatDatePtBr(data, time)

        await knex('meal').insert({
            id: randomUUID(),
            name,
            user_id,
            description,
            is_diet,
            created_at: date_completed
        })

        return reply.status(201).send()

    })

    app.put("/update/:id", async (request, reply) => {
        const schemaIdParams = z.object({
            id: z.uuid()
        })

        const createBodySchemaMeal = z.object({
            name: z.string().optional(),
            user_id: z.string().optional(),
            description: z.string().optional(),
            data: z.string().optional(),
            time: z.string().optional(),
            is_diet: z.boolean().optional()
        })


        const { id } = schemaIdParams.parse(request.params)
        const { name, user_id, description, time, data, is_diet } = createBodySchemaMeal.parse(request.body)

        if (!time && !data) {
            await knex('meal')
                .where('id', id)
                .update({
                    name,
                    user_id,
                    description,
                    is_diet,
                })
        } else {

            const date_completed = formatDatePtBr(data as string, time as string)

            console.log(date_completed)

            await knex('meal')
                .where('id', id)
                .update({
                    name,
                    user_id,
                    description,
                    is_diet,
                    created_at: date_completed
                })

        }

        return reply.status(200).send()
    })

    app.delete("/delete/:id", async (request, reply) => {
        const schemaIdParams = z.object({
            id: z.uuid()
        })
        const { id } = schemaIdParams.parse(request.params)

        await knex('meal')
            .where('id', id)
            .delete()

        return reply.send()
    })

}