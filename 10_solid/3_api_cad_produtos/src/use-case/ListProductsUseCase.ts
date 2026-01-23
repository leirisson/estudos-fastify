import { Product } from 'generated/prisma/client';
import { PrismaProductRepository } from '../repository/prisma/product.prisma.repository'

interface ListProductsUseCaseResponse {
    products: Product[]
}

export class ListProductsUseCase {
    constructor(private prismaProductRepository: PrismaProductRepository) { }

    async execute(): Promise<ListProductsUseCaseResponse> {
        const products = await this.prismaProductRepository.getAllProducts()
        return { products }
    }
}