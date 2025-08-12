# OOP TypeScript Study

API REST em Node.js construída sem framework (usando o módulo nativo http).
O objetivo é entender o funcionamento de baixo nível de uma API: ciclo de vida da requisição/resposta, roteamento manual, middlewares, tratamento centralizado de erros e autenticação com JWT + Refresh Token via cookie HttpOnly.
A documentação é feita com OpenAPI 3 e renderizada no Scalar em /docs.

## Stack

- Node.js 18+, TypeScript
- HTTP nativo (http)
- Prisma + PostgreSQL
- Jest
- ESLint + Prettier + Husky
- Github Actions
- Docker Compose (Postgres)
- OpenAPI 3.0 + Scalar (UI em /docs)
- Observabilidade com Prometheus (em `/metrics`)

## Estrutura

```
src/
  application/        # use cases (regras de orquestração)
  domains/            # entidades, erros e portas (repos)
  infra/
    database/         # prismaClient e repositórios
    http/
      core/           # Router, Route, server, registerRoutes
      controllers/    # controllers (auth, users, docs)
      middlewares/    # logger, ensureAuthenticated, withAuth
      openapi/        # base.ts, spec.ts (merge), merge.ts
      routes/         # rotas + openapi.ts por módulo
      utils/          # reply, parseBody, parseCookie, etc.
  shared/
    errors/           # AppError
    utils/            # env, paginação, datas
main.ts
```

## Scripts
-`dev` – desenvolvimento (watch)

-`build` – compila para dist/

-`start` – roda a build

-`unit:test` – testes unitários

-`lint` – ESLint

-`format` – Prettier

## Documentação (OpenAPI + Scalar)
- UI: `GET /docs`
- Spec: `GET /openapi.json`

Cada módulo exporta seu PathsObject (ex.: infra/http/routes/user/openapi.ts) e o spec.ts faz o merge.

## Observabilidade (Métricas Prometheus)

A API expõe métricas em formato Prometheus em `GET /metrics`.

- `http_requests_total{method,route,status}` — total de requisições por método/rota/status (base para taxa de erro).
- `http_request_duration_seconds_*{method,route,status}` — histograma de latência (serve para p50/p95/p99).
- `api_*` — métricas automáticas do processo Node (CPU, memória, GC, event loop), via `collectDefaultMetrics`.

## Como rodar

### Com Docker
```bash
docker-compose up -d
npm ci
npx prisma migrate dev
npm run dev
```

### Sem Docker
```bash
# configure DATABASE_URL no .env
npm ci
npx prisma migrate dev
npm run dev
```

### Variaveis de ambiente
.env (exemplo):

``` ini
NODE_ENV=development
PORT=3333
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app?schema=public
SECRET_JWT=...
REFRESH_SECRET_JWT=...
ACCESS_TOKEN_EXPIRATION=15m
REFRESH_TOKEN_EXPIRATION=7d
```