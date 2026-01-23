


export class ErrorPriceIncorrect extends Error {
    constructor(){
        super('Erro no preço do produto, não pode ser negativo.')
    }
}