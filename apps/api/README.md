# Ledja API

The NestJS REST API powering the Ledja platform.

---

## Stack

- **Framework:** NestJS 10 + TypeScript
- **Database:** PostgreSQL 15 + TypeORM
- **Auth:** JWT (access + refresh tokens) + Passport
- **Queue:** BullMQ + Redis
- **Payments (fiat):** Paystack
- **Payments (crypto):** Stellar SDK (`@stellar/stellar-sdk`) + Horizon API
- **Notifications:** Twilio SMS + Meta WhatsApp Cloud API
- **PDF generation:** Puppeteer + Handlebars templates
- **File storage:** Cloudinary
- **Docs:** Swagger / OpenAPI at `/api/docs` in development

---

## Project structure

```
apps/api/
├── src/
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   ├── redis.config.ts
│   │   ├── paystack.config.ts
│   │   └── stellar.config.ts        # Stellar network + wallet config
│   ├── common/
│   │   ├── decorators/              # @TenantId, @CurrentUser, @Roles, @Public
│   │   ├── dto/                     # PaginationDto and shared DTOs
│   │   ├── entities/                # BaseEntity (id, tenantId, timestamps)
│   │   ├── filters/                 # Global HTTP exception filter
│   │   ├── guards/                  # JwtAuthGuard, RolesGuard, TenantGuard
│   │   └── interceptors/            # Response transform interceptor
│   ├── database/
│   │   └── migrations/              # TypeORM migrations
│   └── modules/
│       ├── auth/                    # Registration, login, JWT strategy
│       ├── users/                   # User entity, roles, profile
│       ├── tenants/                 # Business onboarding, settings, plans
│       ├── customers/               # Customer CRM, balance tracking
│       ├── invoices/                # Invoice engine, PDF, payment links
│       ├── expenses/                # Expense logging, receipt OCR
│       ├── inventory/               # Stock management, low-stock alerts
│       ├── payroll/                 # Staff records, salary runs, PAYE
│       ├── payments/
│       │   ├── payments.module.ts
│       │   ├── payments.service.ts  # Paystack webhook + payment records
│       │   ├── payments.controller.ts
│       │   └── stellar.service.ts   # Stellar QR generation + Horizon listener
│       ├── notifications/           # SMS, WhatsApp, email delivery
│       └── reports/                 # P&L, revenue, FIRS tax summaries
├── app.module.ts
├── main.ts
├── .env.example
├── docker-compose.yml
└── package.json
```

---

## Stellar integration

The `payments` module handles both fiat and on-chain payment flows.

**How Stellar invoice payments work:**

1. When an invoice is created, `stellar.service.ts` generates a `web+stellar:pay` URI containing the business's Stellar wallet address, the USDC amount, and the invoice number as a transaction memo
2. This URI is encoded as a QR code and embedded in the invoice PDF and dashboard
3. `stellar.service.ts` opens an SSE stream via Stellar Horizon, listening for incoming payments to the business wallet
4. When a matching payment arrives (verified by memo = invoice number), the invoice is automatically marked as paid

This enables instant, low-fee settlement for cross-border and diaspora customers without a Nigerian bank account.

---

## Local setup

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker

### Steps

```bash
# From the monorepo root
pnpm install

# Copy environment file
cp apps/api/.env.example apps/api/.env
# Fill in your values

# Start Postgres and Redis
docker-compose -f apps/api/docker-compose.yml up -d

# Start the API in watch mode
pnpm --filter api dev
```

API: `http://localhost:3000/api/v1`  
Swagger: `http://localhost:3000/api/docs`

---

## Environment variables

| Variable | Description | Required |
|---|---|---|
| `DB_HOST` | Postgres host | Yes |
| `DB_PORT` | Postgres port | Yes |
| `DB_USERNAME` | Postgres username | Yes |
| `DB_PASSWORD` | Postgres password | Yes |
| `DB_NAME` | Database name | Yes |
| `DB_SYNC` | Auto-sync schema in dev | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRES_IN` | Access token expiry e.g. `7d` | Yes |
| `JWT_REFRESH_SECRET` | Refresh token secret | Yes |
| `REDIS_HOST` | Redis host | Yes |
| `REDIS_PORT` | Redis port | Yes |
| `PAYSTACK_SECRET_KEY` | Paystack secret key | Yes |
| `PAYSTACK_WEBHOOK_SECRET` | Paystack webhook verification secret | Yes |
| `STELLAR_NETWORK` | `testnet` or `mainnet` | Yes |
| `STELLAR_HORIZON_URL` | Horizon server URL | Yes |
| `STELLAR_PLATFORM_WALLET` | Platform's Stellar public key | Yes |
| `STELLAR_PLATFORM_SECRET` | Platform's Stellar secret key | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | For SMS |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | For SMS |
| `META_WA_ACCESS_TOKEN` | Meta WhatsApp Cloud API token | For WhatsApp |
| `CLOUDINARY_API_KEY` | Cloudinary API key | For uploads |
| `GOOGLE_VISION_API_KEY` | Google Vision key | For OCR |

See `.env.example` for the full list.

---

## API overview

All routes are prefixed `/api/v1/`. Authenticated routes require `Authorization: Bearer <token>`.

| Tag | Base path | Description |
|---|---|---|
| Auth | `/api/v1/auth` | Register, login, refresh, logout |
| Tenants | `/api/v1/tenants` | Business profile and settings |
| Users | `/api/v1/users` | User management and roles |
| Customers | `/api/v1/customers` | Customer CRM |
| Invoices | `/api/v1/invoices` | Invoice CRUD, PDF, payment links |
| Expenses | `/api/v1/expenses` | Expense logging and receipts |
| Inventory | `/api/v1/inventory` | Products and stock levels |
| Payroll | `/api/v1/payroll` | Staff and salary runs |
| Payments | `/api/v1/payments` | Paystack webhooks, Stellar listener, payment records |
| Reports | `/api/v1/reports` | P&L and tax summaries |
| Notifications | `/api/v1/notifications` | Delivery logs |

---

## Multi-tenancy

Every resource belongs to a tenant (a business):

1. `BaseEntity` includes `tenantId` on every table
2. JWT payload carries `tenantId` — set at login
3. `TenantGuard` injects `tenantId` into every request
4. Every service method scopes DB queries with `WHERE tenant_id = $tenantId`

---

## User roles

| Role | Access |
|---|---|
| `owner` | Full access to all modules |
| `manager` | All modules except billing and user management |
| `staff` | Invoices and customers only |
| `accountant` | Read-only access to expenses, payroll, and reports |

---

## Running tests

```bash
pnpm --filter api test
pnpm --filter api test:watch
pnpm --filter api test:cov
```

---

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for the full guide.  
Filter API issues: [`label:api`](https://github.com/ledja-hq/ledja/issues?q=label%3Aapi)  
Filter Stellar issues: [`label:stellar`](https://github.com/ledja-hq/ledja/issues?q=label%3Astellar)