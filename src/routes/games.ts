import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { z } from 'zod';

export async function gamesRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const games = await knex('Games').select();
    return { games };
  });

  app.get('/:id', async request => {
    const getGamesParamsSchema = z.object({
      id: z.string()
    });

    const { id } = getGamesParamsSchema.parse(request.params);
    const game = await knex('Games').where('game_id', id).first();

    return { game };
  });

  app.post('/', async (request, reply) => {
    const createGamesBodySchema = z.object({
      game_type: z.string()
    });

    const { game_type } = createGamesBodySchema.parse(request.body);

    await knex('Games').insert({
      game_type
    });
    return reply.status(201).send({
      message: 'Jogo criado com sucesso'
    });
  });
}
