import { ProductCreateUseCase } from "@/use-case/CreateProductUseCase.ts";
import { ProductDesativateError } from "@/use-case/errors/Product.desativate.Error";
import { GetProductByIdUseCase } from "@/use-case/GetProductByIdUseCase";
import { ListProductsUseCase } from "@/use-case/ListProductsUseCase";
import { UpdateProductUseCase } from "@/use-case/UpdateProductUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { Product } from "generated/prisma/client";
import { z } from "zod";




export class ProductController {
    constructor(
        private productCreateUseCase: ProductCreateUseCase,
        private listproductUseCase: ListProductsUseCase,
        private getProductByIdUseCase: GetProductByIdUseCase,
        private updateProductUseCase: UpdateProductUseCase
    ) { }

    async getAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const products = await this.listproductUseCase.execute()
            return reply.send(products)

        } catch (error) {
            return error
        }
    }

    async getProductById(request: FastifyRequest, reply: FastifyReply) {
        try {
            const createSchemaParams = z.object({
                id: z.uuid()
            })

            const { id } = createSchemaParams.parse(request.params)

            const product = await this.getProductByIdUseCase.execute(id)

            return reply.status(200).send(product)

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

    async update(request: FastifyRequest, reply: FastifyReply) {
        try {
            const createSchemaParams = z.object({
                id: z.uuid()
            })

            const bodySchemaUpdateProduct = z.object({
                name: z.string().optional(),
                description: z.string().optional(),
                price: z.number().optional(),
                stock: z.number().optional(),
                active: z.boolean().optional()
            })

            const { id } = createSchemaParams.parse(request.params)
            const { name, description, price, stock, active } = bodySchemaUpdateProduct.parse(request.body)

            const product = await this.updateProductUseCase.execute(id, { name, price, description, stock, active } as Product)

            return reply.send(product)
        } catch (error) {

            if (error instanceof ProductDesativateError) {
                return reply.status(409).send(error)
            }
            throw error
        }
    }
}