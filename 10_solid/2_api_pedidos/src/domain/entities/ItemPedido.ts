

export class ItemPedido{
    constructor(
        readonly produtoId: string,
        readonly nomeProduto: string,
        readonly precoUnitario: number,
        readonly quantidade: number
    ){
        if(quantidade <= 0){
            throw new Error('Quantidade inválida')
        }
    }
    getSubtototal(): number{
        return this.precoUnitario * this.quantidade
    }
}