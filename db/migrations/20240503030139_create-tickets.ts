import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Tickets', table => {
    table.increments('ticket_id').primary();
    table
      .integer('player_id')
      .unsigned()
      .references('player_id')
      .inTable('Players');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.decimal('total_amount', 10, 2);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Tickets');
}
