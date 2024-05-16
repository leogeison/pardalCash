import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Games', table => {
    table.increments('game_id').primary();
    table.timestamp('game_datetime').notNullable().defaultTo(knex.fn.now());
    table.string('game_type', 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Games');
}
