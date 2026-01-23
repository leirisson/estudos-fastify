

export class ProductDesativateError extends Error {
    constructor(){
        super('Produto desativado não pode ser editado.')
    }
}