# OOP TypeScript Study

Projeto de estudo de Programação Orientada a Objetos (OOP) com TypeScript, Node.js e boas práticas de arquitetura.

## Requisitos

- Node.js >= 18
- npm >= 9

## Instalação

```bash
npm install
```

## Scripts

- `npm run dev` — Executa o servidor em modo desenvolvimento (ts-node)
- `npm run build` — Compila o projeto para a pasta `dist`
- `npm start` — Executa o servidor a partir da build
- `npm run unit:test` — Executa os testes unitários
- `npm run lint` — Executa o linter (ESLint)
- `npm run format` — Formata o código com Prettier

## Estrutura

- `src/main` — Entrada principal e roteamento HTTP
- `src/domains` — Domínios e regras de negócio
- `src/infra` — Implementações de infraestrutura (ex: repositórios)
- `src/shared` — Utilitários e módulos compartilhados

## Exemplo de uso

Após rodar `npm run dev`, envie um POST para `/users`:

```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"123456"}'
```
