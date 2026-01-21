import { RegisterUseCase } from '@/use-cases/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'


export class RegisterController {
    constructor(private resgisterUseCase: RegisterUseCase) { }

    async register(request: FastifyRequest, reply: FastifyReply) {
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

        try {
            console.log('[DEBUG] passou aqui 1')
            console.log({
                name,
                email,
                password
            })
            await this.resgisterUseCase.execute({
                name,
                email,
                password
            })
        } catch (error) {
            return reply.status(409).send(error)
        }

        return reply.status(201).send()
    }
}
