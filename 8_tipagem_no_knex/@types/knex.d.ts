declare module 'knex/types/tables' {
  export interface Tables {
    porducts: {
      id: string
      name: string
      description: string
      price: number
      stock: number
      atvio: boolean
      created_at: Date
    }
  }
}
