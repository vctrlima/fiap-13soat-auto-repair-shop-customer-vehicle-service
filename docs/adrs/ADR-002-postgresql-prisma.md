# ADR-002: PostgreSQL com Prisma ORM

## Status

Aceito

## Contexto

Necessidade de persistência relacional para clientes e veículos com integridade referencial (FK entre Vehicle e Customer).

## Decisão

Adotamos **PostgreSQL** como banco de dados relacional com **Prisma ORM** para type-safe queries e migrações declarativas.

## Consequências

- **Positivo**: Schema tipado, migrações versionadas, suporte a índices e constraints
- **Negativo**: Dependência do Prisma Client, overhead de geração de client em CI/CD
