import { AthenticateUseCase } from "@/use-cases/authenticate";
import { InvalideCredentialError } from "@/use-cases/errors/invalide.credentials.error";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";



export class AthenticateController {
    constructor(private authenticateUseCase: AthenticateUseCase) { }


    async register(request: FastifyRequest, reply: FastifyReply) {
        const registerBodySchema = z.object({
            email: z.email(),
            password: z.string().min(6)
        })

        const {
            email,
            password
        } = registerBodySchema.parse(request.body)

        try {
            await this.authenticateUseCase.execute({
                email,
                password
            })
        } catch (error) {

            if (error instanceof InvalideCredentialError) {
                return reply.status(400).send(error)
            }


            throw error

        }

        return reply.status(200).send()
    }
}