import { Product } from '../domain/Product'
import { ProductinMemoryrepository } from '../repositories/product.repository'
import { ProductAlreadyExistsError } from '../exceptions/ProductAlreadyExistsError'

export class CreateProductuseCase {
    constructor(private repository: ProductinMemoryrepository) { }

    execute(product: Product) {

        // antes de salvar, vai ser verificado se o produto já existe no banco
        if (this.repository.findByName(product.name)) {
            throw new ProductAlreadyExistsError('Produto já cadastrado')
        }

        this.repository.save(product)
        return product
    }
}