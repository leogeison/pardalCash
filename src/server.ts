import fastify from 'fastify';
import { env } from './env';
import { jogosRoutes } from './routes/jogos';
import { variacoesApostasRoutes } from './routes/variacoesApostas';

const app = fastify();

app.register(jogosRoutes,{
  prefix: 'jogos',
});
app.register(variacoesApostasRoutes,{
  prefix: 'variacoesApostas',
});

app
  .listen({
    port: env.PORT
  })
  .then(() => {
    console.log('HTTP Server Running!');
  });
