import { knex as setupKnex } from 'knex'


export const knex = setupKnex({
    client: "sqlite3",
    connection: {
        filename: "./src/data/dev.db"
    },
     useNullAsDefault: true,
})

