import { ProductRepository } from "@/domain/ProductRepository";
import { Prisma, Product } from "generated/prisma/client"
import prisma from '../../lib/prisma'


export class PrismaProductRepository implements ProductRepository {

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        const product = await prisma.product.create({ data })
        return product
    }

    async getAllProducts(): Promise<Product[]> {
        return await prisma.product.findMany({
            where: {
                active: true
            }
        })
    }

    async getProductById(id: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({ where: { id } })
        return product
    }

    async update(id: string, product: any): Promise<Product | null> {

        const productUpdated = await prisma.product.update({
            where: { id },
            data: product
        })

        return productUpdated
    }
}