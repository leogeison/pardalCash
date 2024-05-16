import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('BetVariations', table => {
    table.increments('bet_variation_id').primary();
    table.integer('game_id').references('game_id').inTable('Games');
    table.integer('number1').unsigned().notNullable();
    table.integer('number2').unsigned().notNullable();
    table.integer('number3').unsigned().notNullable();
    table.integer('number4').unsigned().notNullable();
    table.integer('number5').unsigned().notNullable();
    table
      .integer('ticket_id')
      .unsigned()
      .references('ticket_id')
      .inTable('Tickets');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('BetVariations');
}
