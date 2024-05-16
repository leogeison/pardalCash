import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Players', table => {
    table.increments('player_id').primary();
    table.string('name', 255);
    table.timestamp('birth_date').notNullable();
    table.string('cpf', 11).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Players');
}
