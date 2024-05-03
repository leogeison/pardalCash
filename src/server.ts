import fastify from 'fastify';

const app = fastify();

app.get('/hello', () => {
  return 'teste app';
});

app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log('HTTP Server Running!');
  });
