import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Payments', table => {
    table.increments('payment_id').primary();
    table.integer('ticket_id').references('ticket_id').inTable('Tickets');
    table.integer('player_id').references('player_id').inTable('Players');
    table.string('payment_method', 255);
    table.decimal('amount_paid', 10, 2);
    table.timestamp('payment_datetime').notNullable().defaultTo(knex.fn.now());
    table.string('payment_status', 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Payments');
}
