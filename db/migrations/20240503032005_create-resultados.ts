import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Resultados', table => {
    table.increments('resultado_id').primary();
    table.integer('jogo_id').references('jogo_id').inTable('Jogos');
    table.timestamp('data_hora_sorteio').notNullable().defaultTo(knex.fn.now());
    table.integer('dezena1_resultado').unsigned();
    table.integer('dezena2_resultado').unsigned();
    table.integer('dezena3_resultado').unsigned();
    table.integer('dezena4_resultado').unsigned();
    table.integer('dezena5_resultado').unsigned();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Resultados');
}
