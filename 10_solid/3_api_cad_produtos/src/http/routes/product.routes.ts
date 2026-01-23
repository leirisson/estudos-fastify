import { FastifyInstance } from "fastify"
import { ProductController } from '@/http/controllers/product.controller'
import { PrismaProductRepository } from '@/repository/prisma/product.prisma.repository'
import { ProductCreateUseCase } from '@/use-case/CreateProductUseCase.ts'
import { ListProductsUseCase } from "@/use-case/ListProductsUseCase"

const repository = new PrismaProductRepository()
const createProductUsecase = new ProductCreateUseCase(repository)
const listProductUseCase = new ListProductsUseCase(repository)
const controller = new ProductController(createProductUsecase, listProductUseCase)


export async function productRoutes(app: FastifyInstance) {
    app.get('/', (request, reply) => { controller.getAll(request, reply) })
    app.post("/create", (request, reply) => { controller.create(request, reply) })
}