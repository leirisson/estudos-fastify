import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6)
    })

    const {
        name,
        email,
        password
    } = registerBodySchema.parse(request.body)

    const hashPassword = await hash(password, 8)

    await prisma.user.create({
        data: {
            name,
            email,
            hashPassword
        }
    })

    return reply.status(201).send
}