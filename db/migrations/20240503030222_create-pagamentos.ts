import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Pagamentos', table => {
    table.uuid('pagamento_id').primary();
    table.uuid('bilhete_id').references('bilhete_id').inTable('Bilhetes');
    table.uuid('jogador_id').references('jogador_id').inTable('Jogadores');
    table.string('metodo_pagamento', 255);
    table.decimal('valor_pago', 10, 2);
    table
      .timestamp('data_hora_pagamento')
      .notNullable()
      .defaultTo(knex.fn.now());
    table.string('status_pagamento', 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Pagamentos');
}
