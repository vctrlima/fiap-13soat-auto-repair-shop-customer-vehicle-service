# Customer & Vehicle Service

Microserviço responsável pelo cadastro e gestão de clientes e veículos da oficina automotiva.

## Arquitetura

- **Clean Architecture**: domain → application → infra → presentation → main
- **Framework**: Fastify 5.2 + TypeScript 5.9
- **Banco de Dados**: PostgreSQL (Prisma ORM)
- **Porta**: 3001

## Endpoints

| Método | Rota                 | Descrição             |
| ------ | -------------------- | --------------------- |
| POST   | `/api/customers`     | Criar cliente         |
| GET    | `/api/customers`     | Listar clientes       |
| GET    | `/api/customers/:id` | Buscar cliente por ID |
| PUT    | `/api/customers/:id` | Atualizar cliente     |
| DELETE | `/api/customers/:id` | Remover cliente       |
| POST   | `/api/vehicles`      | Criar veículo         |
| GET    | `/api/vehicles`      | Listar veículos       |
| GET    | `/api/vehicles/:id`  | Buscar veículo por ID |
| PUT    | `/api/vehicles/:id`  | Atualizar veículo     |
| DELETE | `/api/vehicles/:id`  | Remover veículo       |

## Variáveis de Ambiente

| Variável                  | Descrição                 | Padrão |
| ------------------------- | ------------------------- | ------ |
| `SERVER_PORT`             | Porta do servidor         | 3001   |
| `DATABASE_URL`            | URL de conexão PostgreSQL | —      |
| `CORS_ORIGIN`             | Origem CORS permitida     | `*`    |
| `JWT_ACCESS_TOKEN_SECRET` | Chave JWT                 | —      |

## Execução Local

```bash
yarn install
yarn prisma generate
yarn prisma migrate dev
yarn start:dev
```

## Testes

```bash
yarn test          # Testes unitários com cobertura
yarn test:ci       # Testes em modo CI
```

- 22 suites, 84 testes
- Cobertura mínima: 80% (branches, functions, lines, statements)

## Docker

```bash
docker compose up -d
```

## CI/CD

Pipeline GitHub Actions: lint → test → build → push ECR → deploy EKS

## Observabilidade

- OpenTelemetry → OTLP → Prometheus → Grafana
- Endpoint `/health` para liveness/readiness probes
