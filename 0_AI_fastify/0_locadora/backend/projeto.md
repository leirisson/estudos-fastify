# Backend da Locadora — Projeto e Arquitetura

## Visão Geral
- Backend HTTP com Fastify, validação com Zod, persistência via Prisma em PostgreSQL.
- Arquitetura em camadas inspirada em DDD: Domain (regras/entidades), Application (casos de uso), Interface (controllers/rotas), Infrastructure (Prisma, env).
- Módulo implementado: Cars (CRUD completo com TDD, validação e mapeamento claro entre domínio e banco).

## Tecnologias e Configuração
- Linguagem: TypeScript (module: nodenext; alvo: esnext; modo estrito).
- Framework HTTP: Fastify.
- Validação: Zod.
- ORM/Client DB: Prisma (datasource PostgreSQL).
- Testes: Vitest (unit e integração).
- Build: tsup (CJS para build de execução; testes executam em TS com Vitest).
- Scripts (package.json):
  - `npm run start:dev`: desenvolvimento (tsx + watch).
  - `npm run build`: empacota o código para `build/` com tsup.
  - `npm start`: executa `build/server.js`.
  - `npx vitest run`: roda a suíte de testes.

## Estrutura de Pastas
```
backend/
├─ prisma/
│  ├─ migrations/                  # Histórico de migrações
│  └─ schema.prisma                # Modelo do banco (Prisma)
├─ src/
│  ├─ infra/                       # Infraestrutura (adaptadores)
│  │  ├─ env/
│  │  │  └─ index.ts               # Validação das variáveis de ambiente (Zod)
│  │  └─ prisma/
│  │     └─ index.ts               # Instância do PrismaClient (adapter PG)
│  ├─ modules/
│  │  └─ cars/
│  │     ├─ cars.schema.ts         # Schemas Zod (entrada/params) e tipos derivados
│  │     ├─ cars.repository.ts     # Contrato do repositório + implementação Prisma
│  │     ├─ cars.use.case.ts       # Casos de uso de domínio (Application)
│  │     ├─ cars.controller.ts     # Controlador HTTP (Interface)
│  │     ├─ cars.routes.ts         # Registro de rotas (injeta o controller)
│  │     ├─ cars.use.case.test.ts  # Testes unitários (casos de uso) com repo em memória
│  │     └─ cars.routes.test.ts    # Testes de integração de rotas via app.inject()
│  ├─ app.ts                       # Build do servidor Fastify, middlewares e rotas
│  └─ server.ts                    # Bootstrap do app (listen)
├─ vitest.config.ts                # Configuração do Vitest
├─ prisma.config.ts                # Config util do Prisma (CLI/migrations)
├─ tsconfig.json                   # Opções de compilação TypeScript
├─ docker-compose.yml              # Infra opcional (ex.: Postgres)
└─ package.json
```

## Fluxo de Requisição
- Requisição HTTP chega ao Fastify → rota de Cars encaminha para o controller.
- Controller valida entradas com Zod → invoca o caso de uso apropriado.
- Caso de uso orquestra o repositório → repositório Prisma executa a operação no banco.
- Controller retorna o resultado com o status code adequado.

## Módulo Cars
### Domínio e Contratos
- Entidade de domínio (tipo `Car`): 
  - `id: string`
  - `brand: string`
  - `model: string`
  - `version?: string`
  - `year: number`
  - `price: number`
  - `fuel: string`
  - `transmission: string`
  - `mileage?: number`
  - `imageUrl?: string`
- Repositório (`CarsRepository`):
  - `create(data: Omit<Car, "id">): Promise<Car>`
  - `findMany(): Promise<Car[]>`
  - `findById(id: string): Promise<Car | null>`
  - `update(data: Partial<Omit<Car, "id">> & { id: string }): Promise<Car | null>`
  - `delete(id: string): Promise<boolean>`

### Schemas Zod (entrada/validação)
- `createCarSchema`:
  - `brand, model, fuel, transmission: string (min 1)`
  - `version?: string`
  - `year: number (>= 1950)`
  - `price: number (>0)`
  - `mileage?: number (>0)`
  - `imageUrl?: string`
- `updateCarSchema`: versão parcial de `createCarSchema` (pelo menos um campo obrigatório no corpo).
- `carIdParamSchema`: `{ id: string (UUID) }` para rotas com path param.

### Casos de Uso (Application)
- `CreateCarUseCase`
- `ListCarsUseCase`
- `GetCarByIdUseCase`  → dispara `CarNotFoundError` se não existir.
- `UpdateCarUseCase`   → dispara `CarNotFoundError` se não existir.
- `DeleteCarUseCase`   → dispara `CarNotFoundError` se não existir.

### Controller e Rotas (Interface)
- Controller valida inputs com Zod, chama casos de uso e mapeia respostas:
  - 201 em criação, 200 em leitura/atualização, 204 em exclusão.
  - 400 para payload/params inválidos; 404 para recursos inexistentes.
- Rotas (Fastify) em `cars.routes.ts` aceitam DI de `CarsRepository` via opções. Em produção, usa `PrismaCarsRepository` por padrão.

### Endpoints
- `POST /cars`
  - Request body: `createCarSchema`
  - Response 201: `Car` criado
- `GET /cars`
  - Response 200: `Car[]`
- `GET /cars/:id`
  - Params: `{ id: UUID }`
  - Response 200: `Car`; 404 se não encontrado
- `PATCH /cars/:id`
  - Params: `{ id: UUID }`
  - Body: `updateCarSchema`
  - Response 200: `Car` atualizado; 404 se não encontrado
- `DELETE /cars/:id`
  - Params: `{ id: UUID }`
  - Response 204; 404 se não encontrado

## Persistência com Prisma (Infrastructure)
- Prisma Client inicializado em `src/infra/prisma/index.ts` com adapter PG e logs condicionais a `NODE_ENV`.
- Modelo `Car` no Prisma (schema.prisma) utiliza nomes/campos ligeiramente diferentes do domínio:
  - `year: String` no banco → mapeado para `year: number` no domínio.
  - `flue` no banco → `fuel` no domínio.
  - `imgUrl` no banco → `imageUrl` no domínio.
  - Campos opcionais no domínio são persistidos como strings/integers default no banco e retornados opcionalmente (ex.: `version` vazia não volta ao domínio; `mileage` 0 não volta).
- `PrismaCarsRepository` implementa o mapeamento entre o modelo Prisma e o tipo de domínio `Car`.
- Import dinâmico do Prisma é via caminho relativo com extensão `.js` para compatibilidade com `module: nodenext` durante a compilação.

## Erros e Status Codes
- `CarNotFoundError` → mapeado para HTTP 404.
- Erros de validação Zod → HTTP 400 com `{ message: string }`.
- Sucesso:
  - POST → 201 (+ payload)
  - GET → 200 (+ payload)
  - PATCH → 200 (+ payload)
  - DELETE → 204 (sem payload)

## Testes (TDD)
- Unitários (casos de uso):
  - Repositório em memória para isolar domínio e regras.
  - Cobrem criação, listagem, busca por ID, atualização, deleção e cenários de erro (404).
- Integração (rotas):
  - `Fastify.inject()` com DI do repositório em memória, validando status codes e payloads.
- Config do Vitest (`vitest.config.ts`):
  - Inclui apenas `src/**/*.test.ts`
  - Exclui `build/**` para evitar coleta de arquivos compilados.

## Variáveis de Ambiente
- Validadas em `src/infra/env/index.ts`:
  - `PORT` (number, default 3333)
  - `DATABASE_URL` (string)
  - `OPEN_AI_API_KEY` (string)
  - `OPEN_MODEL` (string)
  - `NODE_ENV` (`dev` | `test` | `production`, default `dev`)

## Execução e Build
- Desenvolvimento: `npm run start:dev` (watch/hot-reload).
- Testes: `npx vitest run`.
- Build: `npm run build` → gera `build/` em CJS para execução via `npm start`.

## Decisões Arquiteturais (Resumo)
- Camadas: separação de responsabilidades (Interface ↔ Application ↔ Infra). O domínio (casos de uso) depende apenas de contratos (repositórios), não de Prisma.
- DI de Repositório nas Rotas: permite trocar infraestrutura por in-memory nos testes de integração, mantendo rotas realistas.
- Zod na borda: garante inputs válidos e reduz lógica defensiva no domínio.
- Mapeamento Prisma ↔ Domínio: corrigido no repositório (year string↔number, flue↔fuel, imgUrl↔imageUrl). Mantém o domínio consistente e independente de detalhes do banco.
- `module: nodenext`: imports relativos com `.js` em alvos compilados; removemos aliases de path no TS para evitar incompatibilidades.

## Extensibilidade e Próximos Passos
- Paginação e filtros em `GET /cars` (por marca, ano, faixa de preço).
- Ordenação configurável na listagem.
- Autenticação e autorização (RBAC) como contexto isolado (futuro).
- Eventos de domínio (ex.: “CarCreated”) para integrações assíncronas.
- Ajuste do schema Prisma (opcional): renomear `flue`→`fuel`, `imgUrl`→`imageUrl`, `year`→`Int`. Exige migração/apoio.

## Glossário
- Car: veículo ofertado na locadora.
- Repositório: contrato de persistência do domínio (independente de ORM).
- Caso de uso: aplicação das regras de negócio com orquestração de dependências.
- Controller: camada de interface HTTP que valida entrada e traduz exceções para HTTP.

---

Para referências rápidas ao código:
- App: `src/app.ts`
- Servidor: `src/server.ts`
- Env: `src/infra/env/index.ts`
- Prisma: `src/infra/prisma/index.ts`
- Módulo Cars:
  - Schemas: `src/modules/cars/cars.schema.ts`
  - Repositório/Prisma: `src/modules/cars/cars.repository.ts`
  - Casos de uso: `src/modules/cars/cars.use.case.ts`
  - Controller: `src/modules/cars/cars.controller.ts`
  - Rotas: `src/modules/cars/cars.routes.ts`
  - Testes: `src/modules/cars/cars.use.case.test.ts`, `src/modules/cars/cars.routes.test.ts`

