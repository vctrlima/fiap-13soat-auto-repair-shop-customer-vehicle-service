# ADR-001: Adoção de Clean Architecture

## Status

Aceito

## Contexto

O serviço de Clientes e Veículos é responsável pelo cadastro e gerenciamento de clientes e seus veículos. Precisa ser testável, manutenível e independente de frameworks e infraestrutura.

## Decisão

Adotamos **Clean Architecture** com as seguintes camadas:

- **Domain**: Entidades, enums e interfaces de casos de uso
- **Application**: Implementações dos casos de uso e protocolos (repositories, validators)
- **Infra**: Prisma ORM (PostgreSQL), observabilidade (OpenTelemetry)
- **Main**: Configuração do Fastify, rotas, factories e composição de dependências
- **Presentation**: Controllers e adaptadores HTTP

## Consequências

- **Positivo**: Alta testabilidade (mocks de repositórios), independência de ORM/framework, separação clara de responsabilidades
- **Negativo**: Maior número de arquivos e indireção para funcionalidades simples
