import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Jogos', table => {
    table.increments('jogo_id').primary();
    table.timestamp('data_hora_jogo').notNullable().defaultTo(knex.fn.now());
    table.string('tipo_jogo', 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Jogos');
}
