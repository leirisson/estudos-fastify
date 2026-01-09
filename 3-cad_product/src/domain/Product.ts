export abstract class Product {
    protected stock: number
    protected price: number
    public status: 'ATIVO' | 'INATIVO'

    constructor(
        public readonly name: string,
        price: number,
        stock: number
    ) {
        this.price = price
        this.stock = stock
        this.validate()
        this.updateStatus()
    }


     // 🔒 Encapsulamento
    protected validate(){
        if(this.stock < 0 ){
            throw new Error('Estoque não pode ser negativo')
        }
    }

    protected updateStatus(){
        this.status = this.stock > 0 ? 'ATIVO' : 'INATIVO'
    }

    addStock(quantity: number){
        this.stock += quantity
        this.updateStatus()
    }

    removeStock(quantity: number){
        if(quantity > this.stock){
            throw new Error('Estoque insuficiente')
        }

        this.stock -= quantity
    }

    // polimorfismo
    abstract finalPrice():number
}