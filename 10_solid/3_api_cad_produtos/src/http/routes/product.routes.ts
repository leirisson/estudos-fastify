import { FastifyInstance } from "fastify"
import { ProductController } from '@/http/controllers/product.controller'
import { PrismaProductRepository } from '@/repository/prisma/product.prisma.repository'
import { ProductCreateUseCase } from '@/use-case/CreateProductUseCase.ts'
import { ListProductsUseCase } from "@/use-case/ListProductsUseCase"
import { GetProductByIdUseCase } from "@/use-case/GetProductByIdUseCase"
import { UpdateProductUseCase } from "@/use-case/UpdateProductUseCase"

const repository = new PrismaProductRepository()
const createProductUsecase = new ProductCreateUseCase(repository)
const listProductUseCase = new ListProductsUseCase(repository)
const getProducBytId = new GetProductByIdUseCase(repository)
const updateProduct = new UpdateProductUseCase(repository)


const controller = new ProductController(
    createProductUsecase,
    listProductUseCase,
    getProducBytId,
    updateProduct
)


export async function productRoutes(app: FastifyInstance) {
    app.get('/', (request, reply) => { controller.getAll(request, reply) })
    app.post("/create", (request, reply) => { controller.create(request, reply) })
    app.get('/:id', (request, reply) => { controller.getProductById(request, reply) })
    app.put('/:id', (request, reply) => { controller.update(request, reply) }) 
}