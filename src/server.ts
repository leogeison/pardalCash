import fastify from 'fastify';
import { env } from './env';
import { gamesRoutes } from './routes/games';
import { betVariationsRoutes } from './routes/betVariantions';

const app = fastify();

app.register(gamesRoutes,{
  prefix: 'games',
});
app.register(betVariationsRoutes,{
  prefix: 'betVariations',
});

app
  .listen({
    port: env.PORT
  })
  .then(() => {
    console.log('Servidor HTTP em execução!');
  });
