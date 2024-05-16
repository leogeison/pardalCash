import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { z } from 'zod';

export async function betVariationsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createBetVariationBodySchema = z.object({
      game_id: z.number().min(1), // ID do jogo ao qual a aposta pertence
      number1: z.number().min(0).max(99),
      number2: z.number().min(0).max(99),
      number3: z.number().min(0).max(99),
      number4: z.number().min(0).max(99),
      number5: z.number().min(0).max(99),
      ticket_id: z.number().min(1).optional() // ID do bilhete ao qual a aposta está associada (opcional)- deixei opcional só pra fazer o teste no insommia pois nao criei rota bilhete
    });

    const { game_id, number1, number2, number3, number4, number5, ticket_id } =
      createBetVariationBodySchema.parse(request.body);

    // Validar se o jogo existe
    const game = await knex('Games').where('game_id', game_id).first();
    if (!game) {
      return reply.status(400).send({ message: 'Jogo não encontrado' });
    }

    // Validar se as dezenas são únicas e dentro do intervalo válido
    const numbers = [number1, number2, number3, number4, number5];
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      return reply.status(400).send({ message: 'Dezenas repetidas' });
    }
    if (numbers.some(number => number <= 0 || number > 99)) {
      return reply.status(400).send({ message: 'Dezenas fora do intervalo' });
    }

    // Verificar se a combinação de dezenas já existe para o mesmo jogo
    const existingCombination = await knex('BetVariations')
      .where('game_id', game_id)
      .andWhere(builder =>
        builder
          .where('number1', number1)
          .andWhere('number2', number2)
          .andWhere('number3', number3)
          .andWhere('number4', number4)
          .andWhere('number5', number5)
      )
      .first();

    if (existingCombination) {
      return reply
        .status(400)
        .send({ message: 'Combinação de dezenas já existe para este jogo' });
    }

    if (ticket_id) {
      // Validar se o bilhete existe
      const ticket = await knex('Tickets')
        .where('ticket_id', ticket_id)
        .first();
      if (!ticket) {
        return reply.status(400).send({ message: 'Bilhete não encontrado' });
      }

      // Verificar se o bilhete já possui 22 variações de apostas
      const totalVariations = await knex('BetVariations')
        .where('ticket_id', ticket_id)
        .count('bet_variation_id as total')
        .first(); // Obter o primeiro resultado
      if (!totalVariations) {
        return reply.status(400).send({
          message: 'Não foi possível obter o total de variações de apostas'
        });
      }

      const total = parseInt(String(totalVariations.total));

      if (total >= 22) {
        return reply
          .status(400)
          .send({ message: 'Bilhete já possui 22 apostas' });
      }
    }

    // Inserir a nova variação de aposta no banco de dados
    await knex('BetVariations').insert({
      game_id,
      number1,
      number2,
      number3,
      number4,
      number5,
      ticket_id: ticket_id || null
    });

    reply.status(201).send();
  });
}
