import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', (table) => {
        table.uuid('id').primary()
        table.text('session_id')
        table.text('name').notNullable()
        table.text('email').unique().notNullable()
        table.dateTime('created_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("user")
}

