# Copilot instructions for Saraha

## Build, test, and lint commands

Use `pnpm` in the workspace root.

| Task | Command |
| --- | --- |
| Install deps | `pnpm install` |
| Apply Prisma schema | `pnpm exec prisma db push` |
| Seed database | `pnpm exec prisma db seed` |
| Run backend (dev) | `pnpm nx serve backend` |
| Run frontend (dev) | `pnpm nx serve frontend` |
| Run both apps (dev) | `pnpm dev` |
| Build backend | `pnpm nx build backend` |
| Build frontend | `pnpm nx build frontend` |
| Build all projects | `pnpm build` |
| Lint all projects | `pnpm lint` |
| Lint backend only | `pnpm nx lint backend` |
| Test all projects | `pnpm test` |
| Test backend unit/integration | `pnpm nx test backend` |
| Run a single backend spec | `pnpm nx run backend:test apps/backend/src/app/modules/auth/auth.controller.api.spec.ts` |
| Run backend e2e (Jest) | `pnpm nx run backend-e2e:e2e` |
| Run frontend e2e (Playwright) | `pnpm nx run frontend-e2e:e2e` |

## High-level architecture

- Nx monorepo with two apps (`apps/backend`, `apps/frontend`) and shared libraries (`libs/dto`, `libs/data-access`, `libs/utils`), wired through TS path aliases (`@saraha/*`).
- Backend is NestJS + Prisma. `AppModule` composes feature modules (`auth`, `user`, `message`, `contact`) and imports `DataAccessModule`, which exposes a global `PrismaService`.
- Backend request lifecycle is standardized in `main.ts`: global `/api` prefix, `ValidationPipe` (`whitelist`, `transform`, `forbidNonWhitelisted`), `TransformInterceptor` for success envelopes, and `AllExceptionsFilter` for error envelopes.
- Frontend is React + React Router. Auth pages call backend auth endpoints, persist JWT access/refresh tokens in `localStorage`, and API calls go through `app/utils/api.ts`, which retries once after `POST /auth/refresh` on 401.
- Database models are in root `prisma/schema.prisma` with mapped table names (`Route_Users`, `Route_Messages`) and a `User` → `Message` relation (`receivedMessages`/`receiver`).

## Key conventions in this repository

- API response shape is consistent and expected by frontend code:
  - success: `{ success: true, data, error: null, meta: null }`
  - error: `{ success: false, data: null, error, meta: { timestamp, path, statusCode } }`
- Keep request DTO field names exactly as defined in `libs/dto` (including snake_case fields like `email_or_username`, `old_password`, `new_password`, and refresh body `refresh_token`), because validation and frontend payloads rely on them.
- Protect private endpoints with `JwtAuthGuard` and read the authenticated user via `@GetUser('sub')` in controllers.
- Prefer shared package imports (`@saraha/dto`, `@saraha/data-access`, `@saraha/utils`) over deep relative cross-project imports.
- Backend tests are colocated with modules and commonly use `*.api.spec.ts` naming.
