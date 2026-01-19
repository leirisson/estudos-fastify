declare module 'knex/types/tables' {
    export interface Tables {
        user: {
            id: string,
            name: string,
            session_id: string,
            email: string,
            created_at: string
        }
    }
}


declare module 'knex/types/tables' {
    export interface Tables {
        meal: {
            id: string,
            user_id: string,
            name: string,
            description: string,
            created_at: string,
            is_diet: boolean
        }
    }
}