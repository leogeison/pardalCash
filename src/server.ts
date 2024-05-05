import fastify from 'fastify';
import { knex } from './database';
import { env } from './env';

const app = fastify();

app.get('/hello', async () => {
  const Jogos = await knex('Jogos').select('*').returning('*');

  return Jogos;
});

app
  .listen({
    port: env.PORT
  })
  .then(() => {
    console.log('HTTP Server Running!');
  });
