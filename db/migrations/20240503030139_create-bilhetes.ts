import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Bilhetes', table => {
    table.uuid('bilhete_id').primary();
    table
      .integer('jogador_id')
      .unsigned()
      .references('jogador_id')
      .inTable('Jogadores');
    table.timestamp('data_hora_criacao').notNullable().defaultTo(knex.fn.now());
    table.decimal('valor_total', 10, 2);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Bilhetes');
}
