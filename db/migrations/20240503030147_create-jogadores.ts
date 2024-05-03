import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Jogadores', table => {
    table.uuid('jogador_id').primary();
    table.string('nome', 255);
    table.timestamp('data_nascimento').notNullable();
    table.string('cpf', 11).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Jogadores');
}
