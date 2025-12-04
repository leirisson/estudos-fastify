import { knex as setupKnex } from 'knex'

export const configKnex = {
    client: "sqlite3",
    connection: {
        filename: "./src/data/dev.db"
    },
    useNullAsDefault: true,

}

export const knex = setupKnex(configKnex)

