import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Results', table => {
    table.increments('result_id').primary();
    table.integer('game_id').references('game_id').inTable('Games');
    table.timestamp('draw_datetime').notNullable().defaultTo(knex.fn.now());
    table.integer('result_number1').unsigned();
    table.integer('result_number2').unsigned();
    table.integer('result_number3').unsigned();
    table.integer('result_number4').unsigned();
    table.integer('result_number5').unsigned();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Results');
}
