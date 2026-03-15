# Ledja Web

The Next.js 14 dashboard for the Ledja platform — built for Nigerian SME owners to manage their entire back-office from a browser.

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI components:** shadcn/ui
- **State management:** TanStack Query + Zustand
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **QR codes:** `qrcode.react` — renders Stellar payment URIs on invoice pages
- **Auth:** JWT via HTTP-only cookies
- **Deploy:** Vercel

---

## Project structure

```
apps/web/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── (dashboard)/
│   │       ├── overview/
│   │       ├── customers/
│   │       ├── invoices/
│   │       │   ├── page.tsx          # Invoice list
│   │       │   ├── new/              # Create invoice
│   │       │   └── [id]/             # Invoice detail + payment options
│   │       ├── expenses/
│   │       ├── inventory/
│   │       ├── payroll/
│   │       ├── reports/
│   │       └── settings/
│   ├── components/
│   │   ├── ui/                       # shadcn/ui base components
│   │   ├── dashboard/                # Sidebar, topbar, layout
│   │   ├── invoices/
│   │   │   ├── invoice-table.tsx
│   │   │   ├── invoice-form.tsx
│   │   │   ├── invoice-pdf-preview.tsx
│   │   │   └── stellar-payment-qr.tsx  # QR code for Stellar USDC payment
│   │   └── shared/                   # Tables, modals, empty states
│   ├── lib/
│   │   ├── api/                      # Typed API client
│   │   ├── hooks/                    # Custom React hooks
│   │   └── utils/                    # Currency formatters, date helpers
│   └── types/
├── public/
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Local setup

### Prerequisites

- Node.js 20+
- pnpm 9+
- Ledja API running locally (see `apps/api/README.md`)

### Steps

```bash
# From the monorepo root
pnpm install

cp apps/web/.env.example apps/web/.env.local
# Fill in your values

pnpm --filter web dev
```

Dashboard: `http://localhost:3001`

---

## Environment variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the Ledja API | Yes |
| `NEXTAUTH_SECRET` | Secret for session encryption | Yes |
| `NEXTAUTH_URL` | Base URL of this app | Yes |

---

## Dashboard pages

| Route | Description |
|---|---|
| `/login` | Business login |
| `/register` | Business onboarding |
| `/overview` | Revenue summary, recent invoices, outstanding balances |
| `/customers` | Customer list and profiles |
| `/invoices` | Invoice list and create |
| `/invoices/[id]` | Invoice detail — Paystack link + Stellar USDC QR code |
| `/expenses` | Expense log and receipt upload |
| `/inventory` | Product catalogue and stock levels |
| `/payroll` | Staff list and salary runs |
| `/reports` | P&L summary and FIRS tax export |
| `/settings` | Business profile and subscription plan |

---

## Stellar payment QR

The invoice detail page (`/invoices/[id]`) displays two payment options side by side:

- **Pay with Paystack** — standard Nigerian card/bank transfer
- **Pay with Stellar** — renders a `web+stellar:pay` URI as a QR code via `qrcode.react`

The QR encodes the business's Stellar wallet address, the invoice amount in USDC, and the invoice number as a memo so payments are matched automatically on the backend.

---

## Design principles

- **Dense data tables** — SME owners manage lists of customers, invoices, and products daily. Tables are the primary UI pattern.
- **Naira-first formatting** — all NGN values display as `₦1,000.00` by default.
- **Desktop-first** — optimised for laptop/desktop. Mobile is usable but not the primary target.
- **Fast on low bandwidth** — server components used wherever possible to reduce JS bundle size.

---

## Phase 1 scope

- [ ] Auth flow (login, register, onboarding)
- [ ] Dashboard layout (sidebar, topbar, breadcrumbs)
- [ ] Overview page (metrics, recent activity)
- [ ] Customer list and detail
- [ ] Invoice list, create, detail
- [ ] Invoice PDF preview
- [ ] Stellar USDC payment QR on invoice detail

---

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for the full guide.  
Filter web issues: [`label:web`](https://github.com/ledja-hq/ledja/issues?q=label%3Aweb)