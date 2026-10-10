## Main Scripts

```
pnpm run lint

pnpm run format

pnpm run prisma:precheck

pnpm run typecheck

pnpm run build

pnpm run start
```

## Libraries installed

- [Nest/Config](<>): pnpm i --save @nestjs/config
- [Joi](<>): pnpm add joi
- [Vitest](https://vitest.dev/guide/): pnpm add -D vitest
- [vite-tsconfig-paths](<>): pnpm add -D vite-tsconfig-paths
- [Nestjs-Class-Validator](https://www.npmjs.com/package/@nestjs/class-validator): pnpm add @nestjs/class-validator
- [Nestjs-Class-Transformer](https://www.npmjs.com/package/@nestjs/class-transformer): pnpm add @nestjs/class-transformer
- [Nestjs-Pino](https://www.npmjs.com/package/nestjs-pino): pnpm add nestjs-pino pino-http pino-pretty
- [Prisma](<>):
  - pnpm add -D prisma@7 @types/pg
  - pnpm add @prisma/client@7 @prisma/adapter-pg pg dotenv
  - pnpm approve-builds (select all, approve by yes)
  - checking version: pnpm exec prisma -v (must be 7)
  - pnpm prisma init --datasource-provider postgresql --output ../generated/prisma
  - pnpm prisma generate
  - pnpm prisma validate (checks prisma file)
  - pnpm prisma format (format schema files)
  - docker compose config (checks docker file)
  - pnpm prisma migrate dev --name init
  - After making relevant changes in schema:
    - pnpm prisma migrate dev --name replace_categories_with_events (postgres in docker must be running for this step)
    - pnpm prisma generate
    - pnpm prisma studio
