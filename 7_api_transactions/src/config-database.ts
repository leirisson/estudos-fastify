import { knex as setupKnex, Knex } from 'knex'
import { _env } from './env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: _env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
