import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('meal', (table) => {
        table.uuid('id').primary()
        table.uuid('user_id') // relacioando com a tabela de usuarios
        .notNullable()
        .references('id')
        .inTable('user')
        table.text('name').notNullable()
        table.text('description').notNullable()
        table.text('created_at').notNullable()
        table.boolean('is_diet').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('meal')
}

