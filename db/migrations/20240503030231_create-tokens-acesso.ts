import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Tokens_Acesso', table => {
    table.uuid('token_id').primary();
    table.uuid('jogador_id').references('jogador_id').inTable('Jogadores');
    table.string('token', 255);
    table.timestamp('data_hora_criacao').notNullable().defaultTo(knex.fn.now());
    table.timestamp('data_hora_expiracao').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Tokens_Acesso');
}
