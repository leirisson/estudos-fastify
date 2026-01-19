import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { knex } from '../config-database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'


export async function userRoutes(app: FastifyInstance) {
    app.get('/all', async (request: FastifyRequest, reply: FastifyReply) => {
        const { sessionId } = request.cookies
        const users = await knex('user')
            .where('session_id', sessionId)
            .select()
        return reply.send({ users })
    })

    app.post('/create', async (request: FastifyRequest, reply: FastifyReply) => {
        const userBodySchema = z.object({
            name: z.string(),
            email: z.email(),
        })

        const { name, email } = userBodySchema.parse(request.body)

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
            sessionId = randomUUID()
            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 2 // vai ser valido por 2 dias
            })
        }
        await knex('user').insert({
            id: randomUUID(),
            name,
            email,
            session_id: sessionId
        })

        return reply.status(201).send()
    })
}