import { Prisma, Product } from "generated/prisma/client"

export interface ProductRepository {
    create(product: Prisma.ProductCreateInput): Promise<Product>
}

