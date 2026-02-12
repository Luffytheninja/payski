# Payski Demo

Payski is a **Next.js 16** fintech product demo with a bold, cyber-inspired UI. The project showcases a modern consumer money app experience: landing page marketing, interactive onboarding, and an authenticated app shell with dashboards for activity, goals, insights, profile, and security.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion for UI transitions and interactions
- Lucide React icons

## Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Run the app locally

```bash
npm run dev
```

Open http://localhost:3000.

### 3) Production build

```bash
npm run build
npm run start
```

### 4) Linting

```bash
npm run lint
```

## Project Structure

- `app/` — App Router pages, layouts, and route groups
- `components/` — reusable UI and page-level components
- `lib/mock-data.ts` — demo data powering dashboard, goals, insights, timeline, and profile
- `lib/types.ts` — domain type definitions

## Route Map

| Route | Purpose | Status |
| --- | --- | --- |
| `/` | Marketing home with hero, value props, and transaction simulator | Implemented (UI + client-side simulator) |
| `/onboarding` | Multi-step onboarding flow (welcome → features → personal info → verify → success) | Implemented as demo flow |
| `/dashboard` | Account summary, total balance card, transaction list, transaction detail sheet | Implemented with mock data |
| `/goals` | Savings goal tracking with progress and contribution interactions | Implemented with mock data |
| `/timeline` | Past/current/future event timeline view | Implemented with mock data |
| `/insights` | Insight cards with action affordances and feedback controls | Implemented with mock data |
| `/profile` | User profile and preferences surface | Implemented with mock data |
| `/security` | Security posture, activity log, and quick security actions | Implemented with mock activity data |
| `app/error.tsx` | App-level error boundary UI | Implemented |
| `app/not-found.tsx` | 404 UI | Implemented |
| `app/loading.tsx` | Global loading state UI | Implemented |

> Note: routes inside `app/(authenticated)` are grouped for layout composition and are served at top-level paths (e.g., `app/(authenticated)/dashboard/page.tsx` resolves to `/dashboard`).

## Current Feature Status

### Working now

- Branded landing page with interactive transfer simulator component.
- Animated onboarding experience with step progression and inline validation-style UX.
- Authenticated app shell with bottom navigation and responsive card-based dashboards.
- Transaction detail drill-down UI from dashboard activity rows.
- Goals, insights, timeline, profile, and security screens with cohesive interactions and motion.

### Known placeholders and limitations

- Data is currently static/mock (`lib/mock-data.ts` and local arrays in pages); no backend persistence.
- Authentication is not enforced; authenticated routes are UI-only at this stage.
- Onboarding verification is simulated with timeouts, not an actual KYC or identity API.
- Dashboard quick actions (Send / Request / Scan) are presentational buttons without wired transactional logic.
- Security quick actions (Change PIN / Manage Devices / Lock Account) are currently UI placeholders.
- Share previews rely on metadata definitions; no custom social preview image asset is included yet.

## Demo vs Fully Implemented Flows

### Mock / demo flows

- Onboarding verification and completion routing behavior.
- All account balances, transactions, goals, insights, timeline events, and user profile values.
- Security activity feed and threat/blocked-event states.

### Fully implemented (within frontend scope)

- Route rendering and navigation structure.
- Component composition and responsive layouts.
- Client-side interactions: toggles, modal/sheet open-close behavior, animated transitions, and local UI state updates.

---

If you want to productionize Payski next, the highest-impact follow-ups are:
1. add auth/session handling,
2. connect real finance data APIs,
3. replace mock flows with server actions or API routes,
4. add observability and end-to-end tests.
