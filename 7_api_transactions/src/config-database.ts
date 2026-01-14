import { knex as setupKnex, Knex } from 'knex'
import { _env } from './env'


export const config: Knex.Config = {
    client: _env.CLIENT,
    connection: {
        filename: _env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: _env.DIRECTORY
    }
}


export const knex = setupKnex(config)