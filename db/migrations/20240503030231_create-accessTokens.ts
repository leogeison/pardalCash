import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('AccessTokens', table => {
    table.increments('token_id').primary();
    table.integer('player_id').references('player_id').inTable('Players');
    table.string('token', 255);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('expiration_datetime').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('AccessTokens');
}
