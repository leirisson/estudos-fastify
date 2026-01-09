import { Product } from './Product'


export class CommonProduct extends Product {
    finalPrice(): number {
        return this.price
    }
}
