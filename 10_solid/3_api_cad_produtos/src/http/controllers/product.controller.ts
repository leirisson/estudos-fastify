import { ProductCreateUseCase } from "@/use-case/CreateProductUseCase.ts";
import { ListProductsUseCase } from "@/use-case/ListProductsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";




export class ProductController {
    constructor(
        private productCreateUseCase: ProductCreateUseCase,
        private listproductUseCase: ListProductsUseCase
    ) { }

    async getAll(request: FastifyRequest, reply: FastifyReply){
        try {
            const products = await this.listproductUseCase.execute()
            return reply.send(products)
            
        } catch (error) {
            return error
        }
    }

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

            await this.productCreateUseCase.execute({
                name,
                price,
                description,
                stock,
                active
            })

            return reply.status(201).send()

        } catch (error) {
            return reply.send(error)
        }


    }
}