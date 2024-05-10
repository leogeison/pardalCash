import { knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    Jogos: {
      tipo_jogo: string;
    };
  }
}
