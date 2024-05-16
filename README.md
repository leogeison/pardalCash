# Banco de dados - Criação de estrutura relacionais para sistemas de apostas

## Objetivos

Fazer planejamento de estruturas informacionais para comportar dados oriundos de um sistema de jogos de apostas

## Requisitos Funcionais

[x] 1. Armazenar todas as variações de jogos possíveis;

[x] 2. Armazenar informações a cerca do bilhete de apostas;

[x] 3. Armazenar dados do jogador

[x] 4. Armazenar dados dos resultados dos jogos premiados

[x] 5. Armazenar dados dos pagamentos

[x] 6. Armazenar tokens de autorização de acesso

## Regras de Negócio

[x] 1. Todo jogo deve ter 1 variação de aposta

[x] 2. Cada variação de aposta deve ser constituída por 5 dezenas

[x] 3. As dezenas são variações numéricas de 0 a 99

[x] 4. As combinações de jogos não podem ser repetidas

[x] 5. Todo bilhete deve estar vinculado a 22 jogos.

[x] 6. Cada o bilhete só pode estar vinculado a um jogador

[x] 7. Uma pessoa pode estar vinculada a N bilhetes

[x] 8. Todo bilhete deve ter vínculo com um pagamento

[x] 9. Todo jogador deve ser maior de 17 anos

------------------------------- // -----------------------------

## instalação

1.clone o projeto
git clone https://github.com/leogeison/pardalCash

2.Instale as dependências
npm install

3.Inicie o servidor
npm run dev

------------------------------- // -----------------------------

projeto em desenvolvimento
