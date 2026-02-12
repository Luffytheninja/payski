# Payski

Payski is a Next.js 16 finance demo app with a marketing homepage, onboarding, authentication, and authenticated product surfaces (dashboard, timeline, insights, goals, profile, security).

## What is implemented

- Cookie-based auth session APIs (`/api/auth/*`) and middleware route protection.
- JSON-backed persistence in `data/app-data.json` through server helpers in `lib/server/store.ts`.
- API-backed data flows for accounts, transactions, goals, insights feedback, timeline, profile, and security.
- Onboarding flow that verifies and registers users.
- Login/logout flow and profile editing.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Demo credentials

- Email: `alex@example.com`
- Password: `demo-password`

## Environment variables

Copy `.env.example` to `.env.local`.

## Scripts

- `npm run dev` – start dev server
- `npm run lint` – run ESLint
- `npm run build` – production build

## Data model notes

The app currently uses a file-backed JSON store (`data/app-data.json`). This keeps the app runnable in a single repo without external infrastructure. For production, replace with PostgreSQL + migrations.

## Deployment

Deploy as a standard Next.js app (e.g. Vercel). Ensure writable storage strategy is replaced for multi-instance deployments.
