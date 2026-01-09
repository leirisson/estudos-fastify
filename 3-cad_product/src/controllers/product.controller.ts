import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateProductuseCase } from '../use-cases/create-product.usecase'
import { DomainError } from '../exceptions/DomainError'
import { CommonProduct } from '../domain/CommonProduct'
import { ImportedProduct } from '../domain/ImportedProduct'
import { PerishableProduct } from '../domain/PerishableProduct'


export class ProductController {
    constructor(private createProductUseCase: CreateProductuseCase) { }

    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            console.log(request.body)
            const {
                name,
                price,
                stock,
                type,
                nearExpiration
            } = request.body as { name: string, price: number, stock: number, type: string, nearExpiration: boolean }

            let product: ImportedProduct | PerishableProduct | CommonProduct

            if (type === 'imported') {
                product = new ImportedProduct(name, price, stock)
            }
            else if (type === 'perishable') {
                product = new PerishableProduct(name, price, stock, nearExpiration)
            }
            else {
                product = new CommonProduct(name, price, stock)
            }

            const productCreated = this.createProductUseCase.execute(product)
            
            return reply.status(201).send(productCreated)
        } catch (error) {
            if(error instanceof DomainError){
                return reply.status(400).send({
                    error: error.message
                })
            }

            

            console.log(error)

            return reply.status(500).send({error: "Erro desconhecido"})
        }
    }
}