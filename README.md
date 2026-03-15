# Ledja

> Open-source back-office automation for Nigerian SMEs — invoicing, expenses, inventory, and payroll in one platform.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Built with NestJS](https://img.shields.io/badge/API-NestJS-red)](https://nestjs.com/)
[![Built with Next.js](https://img.shields.io/badge/Web-Next.js-black)](https://nextjs.org/)
[![Stellar](https://img.shields.io/badge/Payments-Stellar-blue)](https://stellar.org/)

---

## What is Ledja?

Most Nigerian small businesses run on WhatsApp messages, paper receipts, and mental arithmetic. Ledja changes that.

It is a full back-office platform built specifically for the Nigerian SME — with Naira-first invoicing, Paystack payment collection, Stellar USDC invoice payments, automated payment reminders via SMS and WhatsApp, expense tracking, inventory management, and payroll with PAYE calculations baked in.

---

## Features

| Module | Status | Description |
|---|---|---|
| Auth & multi-tenancy | 🚧 In progress | JWT auth, per-business data isolation |
| Customer CRM | 🚧 In progress | Contact book, balance tracking |
| Invoicing | 🚧 In progress | Create, send, and track invoices |
| Paystack payments | 🚧 In progress | Collect payments via Paystack payment links |
| Stellar payments | 🚧 In progress | USDC invoice payments via Stellar QR codes |
| Expenses | 📋 Planned | Log expenses, upload receipts, OCR scanning |
| Inventory | 📋 Planned | Product catalogue, stock levels, low-stock alerts |
| Payroll | 📋 Planned | Staff records, salary runs, PAYE, payslip PDF |
| Reports | 📋 Planned | P&L summary, revenue charts, FIRS tax export |
| WhatsApp bot | 📋 Planned | Manage invoices and balances from WhatsApp |

---

## Stellar integration

Every Ledja invoice carries two payment options side by side:

- **Paystack** — for customers paying with a Nigerian debit card or bank transfer
- **Stellar USDC** — for customers paying with a Stellar wallet, settling instantly on-chain

When a business creates an invoice, Ledja generates a `web+stellar:pay` URI encoding the destination wallet, USDC amount, and invoice number as a memo. This renders as a QR code on the invoice. Once the customer pays, Ledja listens to the Stellar Horizon event stream, matches the incoming payment by memo, and marks the invoice as paid automatically.

This makes Ledja the first Nigerian SME back-office platform with native Stellar payment support — enabling instant, low-fee settlement for cross-border and diaspora customers without a bank.

---

## Monorepo structure

```
ledja/
├── apps/
│   ├── api/          # NestJS REST API
│   └── web/          # Next.js 14 dashboard (App Router)
├── packages/
│   ├── types/        # Shared TypeScript interfaces
│   └── config/       # Shared ESLint, tsconfig, Tailwind base
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Tech stack

| Layer | Technology |
|---|---|
| API | NestJS 10 + TypeScript |
| Database | PostgreSQL 15 + TypeORM |
| Auth | JWT + Passport |
| Queue | BullMQ + Redis |
| Payments (fiat) | Paystack |
| Payments (crypto) | Stellar SDK + Horizon API |
| Notifications | Twilio SMS + Meta WhatsApp Cloud API |
| PDF | Puppeteer + Handlebars |
| Web | Next.js 14 (App Router) + Tailwind CSS |
| UI components | shadcn/ui |
| Monorepo | Turborepo + pnpm workspaces |
| Deploy (API) | Railway |
| Deploy (Web) | Vercel |

---

## Getting started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (for local Postgres + Redis)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/ledja-hq/ledja.git
cd ledja

# 2. Install dependencies
pnpm install

# 3. Start Postgres and Redis
docker-compose -f apps/api/docker-compose.yml up -d

# 4. Configure environment variables
cp apps/api/.env.example apps/api/.env
# Fill in your values in apps/api/.env

# 5. Start all apps in development mode
pnpm dev
```

The API will be running at `http://localhost:3000/api/v1`  
Swagger docs at `http://localhost:3000/api/docs`  
The web dashboard at `http://localhost:3001`

---

## Contributing

We welcome contributions of all sizes — bug fixes, new features, tests, and documentation.

1. Browse [open issues](https://github.com/ledja-hq/ledja/issues)
2. Comment on an issue to claim it
3. Fork the repo and create a branch: `git checkout -b feat/your-feature`
4. Open a pull request against `main`

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

---

## Architecture

Ledja uses a **multi-tenant architecture** — every business on the platform has fully isolated data. The pattern:

- Every database table has a `tenant_id` column
- Every authenticated JWT carries the `tenantId`
- Every API query is scoped to the tenant — no business can ever read another's data

---

## Subscription plans

| Plan | Price | What's included |
|---|---|---|
| Free | ₦0/month | 5 invoices, 10 customers — get started |
| Growth | ₦5,000/month | Unlimited invoices, inventory, SMS reminders |
| Business | ₦15,000/month | Payroll, WhatsApp bot, multi-user, tax reports |

---

## License

MIT © [Ledja Contributors](https://github.com/ledja-hq/ledja/graphs/contributors)