import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { z } from 'zod';

export async function variacoesApostasRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createVariacaoApostaBodySchema = z.object({
      jogo_id: z.number().min(1), // ID do jogo ao qual a aposta pertence
      dezena1: z.number().min(0).max(99),
      dezena2: z.number().min(0).max(99),
      dezena3: z.number().min(0).max(99),
      dezena4: z.number().min(0).max(99),
      dezena5: z.number().min(0).max(99),
      bilhete_id: z.number().min(1) // ID do bilhete ao qual a aposta está associada
    });

    const { jogo_id, dezena1, dezena2, dezena3, dezena4, dezena5, bilhete_id } =
      createVariacaoApostaBodySchema.parse(request.body);

    // Validar se o jogo existe
    const jogo = await knex('Jogos').where('jogo_id', jogo_id).first();
    if (!jogo) {
      return reply.status(400).send({ message: 'Jogo não encontrado' });
    }

    // Validar se o bilhete existe
    const bilhete = await knex('Bilhetes')
      .where('bilhete_id', bilhete_id)
      .first();
    if (!bilhete) {
      return reply.status(400).send({ message: 'Bilhete não encontrado' });
    }

    // Validar se as dezenas são únicas e dentro do intervalo válido
    const dezenas = [dezena1, dezena2, dezena3, dezena4, dezena5];
    const uniqueDezenas = new Set(dezenas);
    if (uniqueDezenas.size !== dezenas.length) {
      return reply.status(400).send({ message: 'Dezenas repetidas' });
    }
    if (dezenas.some(dezena => dezena < 0 || dezena > 99)) {
      return reply.status(400).send({ message: 'Dezenas fora do intervalo' });
    }

    // Verificar se o bilhete já possui 22 variações de apostas
    const totalVariacoes = await knex('Variacoes_Aposta')
      .where('bilhete_id', bilhete_id)
      .count('variacao_aposta_id as total')
      .first(); // Obter o primeiro resultado
    if (!totalVariacoes) {
      return reply
        .status(400)
        .send({
          message: 'Não foi possível obter o total de variações de apostas'
        });
    }

    const total = parseInt(String(totalVariacoes.total));

    if (total >= 22) {
      return reply
        .status(400)
        .send({ message: 'Bilhete já possui 22 apostas' });
    }

    // Inserir a nova variação de aposta no banco de dados
    await knex('Variacoes_Aposta').insert({
      jogo_id,
      dezena1,
      dezena2,
      dezena3,
      dezena4,
      dezena5,
      bilhete_id
    });

    reply.status(201).send();
  });
}
