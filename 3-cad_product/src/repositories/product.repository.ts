import { Product } from '../domain/Product'

export class ProductinMemoryrepository {
    private products: Product[] = []

    findByName(name: string): Product | undefined {
        return this.products.find(product => product.name === name)
    }

    save(product: Product){
        this.products.push(product)
    }

    list(){
        return this.products
    }
}