import { ProductCreateUseCase } from "@/use-case/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";




export class ProductController {
    constructor(private productCreateUseCase: ProductCreateUseCase) { }

    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const createProductBodySchema = z.object({
                name: z.string(),
                description: z.string(),
                price: z.coerce.number(),
                stock: z.coerce.number(),
                active: z.boolean()
            })

            const { name, price, description, stock, active } = createProductBodySchema.parse(request.body)

            const product = await this.productCreateUseCase.execute({
                name,
                price,
                description,
                stock,
                active
            })

            return reply.status(201).send({ product })

        } catch (error) {
            return error
        }


    }
}