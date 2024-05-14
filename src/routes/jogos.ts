import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { z } from 'zod';

export async function jogosRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const jogos = await knex('Jogos').select();
    return { jogos };
  });

  app.get('/:id', async request => {
    const getJogosParamsSchema = z.object({
      id: z.string()
    });

    const { id } = getJogosParamsSchema.parse(request.params);
    const jogos = await knex('Jogos').where('jogo_id', id).first();

    return { jogos };
  });

  app.post('/', async (request, reply) => {
    const createJogosBodySchema = z.object({
      tipo_jogo: z.string()
    });

    const { tipo_jogo } = createJogosBodySchema.parse(request.body);

    await knex('Jogos').insert({
      tipo_jogo
    });
    return reply.status(201).send({
      message: 'Jogo criado com sucesso'
    });
  });
}
