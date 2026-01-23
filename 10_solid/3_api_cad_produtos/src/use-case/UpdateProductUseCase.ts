import { PrismaProductRepository } from "@/repository/prisma/product.prisma.repository";
import { Product } from "generated/prisma/client";
import { ProductDesativateError } from "./errors/Product.desativate.Error";



interface ProducUpdateUseCaseRequest {
    name?: string | null
    description?: string | null
    price?: number | null
    stock?: number | null
    active?: boolean | null
    updatedAt?: string | Date
}

interface ProductUpdateResponse {
    productResponse: Product | null
}

export class UpdateProductUseCase {
    constructor(private productPrismaRepository: PrismaProductRepository) { }

    async execute(id: string, product: ProducUpdateUseCaseRequest): Promise<ProductUpdateResponse> {
        const searchProduct: any = await this.productPrismaRepository.getProductById(id)

        
        if (searchProduct.active === false) {
            throw new ProductDesativateError()
        }
        const productResponse = await this.productPrismaRepository.update(id, product)
        return { productResponse }
    }
}