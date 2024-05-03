import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Variacoes_Aposta', table => {
    table.uuid('variacao_aposta_id').primary();
    table.uuid('jogo_id').references('jogo_id').inTable('Jogos');
    table.integer('dezena1').unsigned().notNullable();
    table.integer('dezena2').unsigned().notNullable();
    table.integer('dezena3').unsigned().notNullable();
    table.integer('dezena4').unsigned().notNullable();
    table.integer('dezena5').unsigned().notNullable();
    table
      .integer('bilhete_id')
      .unsigned()
      .references('bilhete_id')
      .inTable('Bilhetes');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Variacoes_Aposta');
}
