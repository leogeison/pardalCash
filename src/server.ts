import fastify from 'fastify';
import { env } from './env';
import { jogosRoutes } from './routes/jogos';

const app = fastify();

app.register(jogosRoutes,{
  prefix: 'jogos',
});

app
  .listen({
    port: env.PORT
  })
  .then(() => {
    console.log('HTTP Server Running!');
  });
