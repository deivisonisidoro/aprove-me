# Avaliação Técnica - Backend

Aqui você encontrará a implementação do backend utilizando NestJS, uma estrutura de aplicativo Node.js altamente modular, e Prisma ORM para interação com o banco de dados SQLite.
A arquitetura do projeto segue os princípios da arquitetura limpa, também conhecida como Clean Architecture. Essa abordagem permite a separação clara de responsabilidades e a manutenção de uma base de código modular e escalável. O código é organizado em camadas, com uma ênfase na separação de conceitos de negócios, infraestrutura e apresentação.
Para mais detalhes sobre a implementação e decisões de design, consulte o arquivo [annotations.md](./annotations.md).


## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Testes](#testes)


## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
- [pnpm](https://pnpm.io/)

## Instalação

1. Instale as dependências:

```bash
pnpm install
```
## Configuração

1. Crie um arquivo .env na raiz do projeto com base no arquivo .env.example. Configure as variáveis de ambiente conforme necessário.
  ```bash
  cp .env.example .env
  ```
Edite o arquivo .env conforme necessário:
  ```env
  DATABASE_URL= file:./dev.db
  SECRET_KEY=api_nest
  ACCESS_TOKEN_EXPIRES_IN = 1h
  REFRESH_TOKEN_EXPIRES_IN = 2
  ```
2. Configure o Prisma executando as migrações para criar as tabelas no banco de dados:
 ```bash
 pnpm prisma migrate dev
 ```
## Execução

Para iniciar o servidor de desenvolvimento, utilize:
```bash
pnpm run start:dev
```
A API estará disponível em http://localhost:3000.

## Testes

### Testes Unitários
Para executar os testes unitários, utilize:
```bash
pnpm run test
```
### Testes de Ponta a Ponta (E2E)
Para executar os testes E2E, utilize:
```bash
pnpm run test:e2e
```
