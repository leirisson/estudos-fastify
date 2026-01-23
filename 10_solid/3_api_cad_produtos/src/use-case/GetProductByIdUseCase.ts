import { Product } from 'generated/prisma/client';
import { PrismaProductRepository } from '../repository/prisma/product.prisma.repository'


export class GetProductByIdUseCase {
    constructor(private prismaProductRepository: PrismaProductRepository) { }

    async execute(id: string): Promise<Product | null> {
        const product = await this.prismaProductRepository.getProductById(id)
        return product
    }
}