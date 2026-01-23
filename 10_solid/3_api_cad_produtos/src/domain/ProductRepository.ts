import { Prisma, Product } from "generated/prisma/client"

export interface ProductRepository {
    create(product: Prisma.ProductCreateInput): Promise<Product>
    getAllProducts(): Promise<Product[]>
    getProductById(id: String): Promise<Product | null>
    update(id: String, product: Prisma.ProductUpdateInput): Promise<Product | null>
}

