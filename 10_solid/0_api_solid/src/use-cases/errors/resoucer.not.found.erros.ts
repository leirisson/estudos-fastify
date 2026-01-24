
export class ResouserNotExistsError extends Error {
    constructor(){
        super('Resoucer not found.')
    }
}