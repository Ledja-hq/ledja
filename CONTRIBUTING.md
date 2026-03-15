# Contributing to Ledja

Thank you for your interest in contributing to Ledja. Every contribution — bug fixes, new features, tests, and documentation — helps build a better tool for Nigerian SMEs.

---

## Ways to contribute

- **Backend** — NestJS modules, services, entities, API endpoints (`apps/api`)
- **Frontend** — Next.js pages, dashboard components, forms (`apps/web`)
- **Integrations** — Paystack webhooks, Stellar SDK, Twilio, Meta WhatsApp Cloud API
- **Tests** — unit tests, e2e tests, coverage improvements
- **Documentation** — API docs, inline comments, setup guides
- **Bug fixes** — anything labelled `bug`

---

## Getting started

### 1. Fork and clone

```bash
git clone https://github.com/YOUR_USERNAME/ledja.git
cd ledja
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up local environment

```bash
docker-compose -f apps/api/docker-compose.yml up -d
cp apps/api/.env.example apps/api/.env
# Fill in your values
```

### 4. Run in development

```bash
pnpm dev
```

---

## Claiming an issue

1. Browse [open issues](https://github.com/ledja-hq/ledja/issues)
2. Comment on the issue: "I'd like to work on this"
3. Wait for a maintainer to assign it — this avoids duplicate work
4. Once assigned, create your branch and start building

Issues with no activity for 7 days after assignment may be unassigned and reopened.

---

## Branch naming

```
feat/short-description       # new feature
fix/short-description        # bug fix
chore/short-description      # tooling, config, dependencies
docs/short-description       # documentation only
test/short-description       # tests only
```

---

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(invoices): add PDF generation with Puppeteer
fix(auth): handle expired refresh token edge case
feat(payments): add Stellar USDC QR code generation
chore(deps): update NestJS to 10.3.0
test(customers): add unit tests for balance calculation
```

---

## Pull request checklist

- [ ] Code follows the existing module structure
- [ ] New API modules follow the feature-based pattern in `apps/api/src/modules/`
- [ ] DTOs use `class-validator` decorators
- [ ] All service methods accept `tenantId` and scope queries accordingly
- [ ] New endpoints have `@ApiTags` and `@ApiBearerAuth` decorators for Swagger
- [ ] Tests written for new service methods
- [ ] `pnpm lint` passes
- [ ] `pnpm build` completes without errors
- [ ] PR description explains what was built and why

---

## Code conventions

- No `any` unless absolutely unavoidable
- Every database entity extends `BaseEntity` from `src/common/entities/base.entity.ts`
- Every list endpoint uses `PaginationDto` from `src/common/dto/pagination.dto.ts`
- Use `@Public()` only on routes that genuinely need no auth (e.g. Paystack and Stellar webhooks)
- Stellar-related code lives in `apps/api/src/modules/payments/stellar.service.ts`

---

## Issue labels

| Label | Meaning |
|---|---|
| `good first issue` | Scoped task, ideal for first-time contributors |
| `api` | Backend / NestJS work |
| `web` | Frontend / Next.js work |
| `stellar` | Stellar SDK or Horizon integration |
| `bug` | Something is broken |
| `documentation` | Docs only |

---

## Getting help

- Open a [GitHub Discussion](https://github.com/ledja-hq/ledja/discussions) for questions
- Comment on the issue you are working on
- Tag `@BigBen-7` in your PR if you need a review
