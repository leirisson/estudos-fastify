import { Product } from './Product'

export class PerishableProduct extends Product {
    constructor(name: string, price: number, stock: number, private nearExpiration: boolean){
        super(name, price, stock)
    }
    
    finalPrice(): number {
        return this.nearExpiration ? this.price * 0.7 : this.price
    }
}