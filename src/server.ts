import fastify from 'fastify';
import { knex } from './database';

const app = fastify();

app.get('/hello', async () => {
  const Jogos = await knex('Jogos')
    .insert({
  
      data_hora_jogo: knex.fn.now(),
      tipo_jogo: 'quina test'
    })
    .returning('*');

  return Jogos;
});

app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log('HTTP Server Running!');
  });
