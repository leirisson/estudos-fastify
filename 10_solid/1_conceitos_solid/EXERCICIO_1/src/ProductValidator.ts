


export class ProductValidator {
    validator(price: number){
        if(price <= 0 ){
            throw new Error("Preço invalido")
        }
    }
}