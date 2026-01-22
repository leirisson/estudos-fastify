import { PrismaProductRepository } from "@/repository/prisma/product.prisma.repository";
import { Product } from "generated/prisma/client";


interface RegisterProductUseCaseRequest {
    name: string,
    description: string,
    price: number,
    stock: number,
    active: boolean
}

interface RegisterProductUseCaseResponse {
    product: Product
}


export class ProductCreateUseCase {
    constructor(private productRepository: PrismaProductRepository) { }

    async execute({ name, price, description, stock, active }: RegisterProductUseCaseRequest): Promise<RegisterProductUseCaseResponse> {
        const product = await this.productRepository.create({
            name,
            price,
            description,
            stock,
            active
        })

        return { product }
    }
}