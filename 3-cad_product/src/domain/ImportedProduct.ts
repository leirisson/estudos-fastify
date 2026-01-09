import { Product } from './Product'



export class ImportedProduct extends Product {
    finalPrice(): number {
        return this.price * 1.2
    }
}