import { FastifyInstance, FastifyRequest } from "fastify"
import { ProductController } from '../controllers/product.controller'
import { ProductinMemoryrepository } from '../repositories/product.repository'
import { CreateProductuseCase } from '../use-cases/create-product.usecase'

export async function productRoute(app: FastifyInstance){
    const repository = new ProductinMemoryrepository()
    const creproductUseCase = new CreateProductuseCase(repository)
    const productController = new ProductController(creproductUseCase)

    app.post('/product', productController.create.bind(ProductController))
}