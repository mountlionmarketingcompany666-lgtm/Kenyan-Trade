# Kenyan Trade™

**Everything Kenya, one platform.**
*Mountlion AI™ — Tell us your business. We build the tools to run it.*

An interactive, clickable prototype for Kenyan Trade™ — a marketplace, real estate, services, jobs, and business-management platform starting in Kenya and architected for global expansion.

> This is a frontend prototype only. All data is mock/local state (no backend). It is meant to demonstrate flows, IA, and UI — not production security, AI, or payments. See the **Feature status system** and **Roadmap** below for an honest breakdown of what's real vs. simulated.

## Ownership & sub-brands

- **Parent company:** Mountlion Marketing Company
- **Platform owner:** Oscarian Express
- **Public platform:** Kenyan Trade™
- **AI:** Mountlion AI™ (business insights, demo-only — see status system)
- **Business management:** Kenyan Trade Business™
- **Marketplace:** Kenyan Trade Market™
- **Communication:** Kenyan Trade Connect™ (chat UI only — no real-time backend)
- **Advertising:** Kenyan Trade Ads™
- **Payments:** Kenyan Trade Pay™ (checkout UI only — no real payment processing)
- **Verification:** Kenyan Trade Verify™
- **Private owner control system:** Mountlion Owner Center™

© 2026 Oscarian Express. Kenyan Trade™ is platform property. All rights reserved.

## Feature status system

Every major feature area is meant to be honestly labelled with one of these, rather than presented as if it's all equally real:

| | Status | Meaning |
|---|---|---|
| 🟢 | Live | Fully functional within the frontend/local-state scope of this prototype |
| 🟡 | Demo / simulated | UI and flow work, but there's no real backend behind it (AI insights, payments, chat, ads) |
| 🔵 | Ready for integration | Built with a clear seam for a real provider (payments, maps, auth) to be dropped in |
| ⚪ | Planned | Named in the spec, not yet built |

A `StatusTag` component and a legend in the footer make this visible in the UI itself (currently applied to AI Insights, Kenyan Trade Pay™, Kenyan Trade Connect™, Kenyan Trade Ads™, and the Jobs board — worth extending to more surfaces over time).

## What's included

- **Home** — hero, categories, featured products/services/real estate, map preview
- **Marketplace (Kenyan Trade Market™)** — browse, product detail, cart, checkout (Kenyan Trade Pay™ demo), order tracking
- **General Real Estate Management** — Browse (buy/rent filters), House Hunting (guided preference matching), Land & Commercial, Property Management (rent collection / maintenance / tenant screening request), Agents & Agencies directory, demo Valuation estimator
- **Services & Bookings** — provider detail, staff/date/time booking flow, demo payment
- **Jobs** — browse/search/filter listings, job detail, apply with CV upload + cover note, My Applications tracker, and a "Post a Job" flow for employers (with edit)
- **Seller & Agent Center** — landlords/agents/sellers/providers add, edit, activate/deactivate, and delete their own property/product/service/job listings, view inquiries, and submit for identity verification (Kenyan Trade Verify™)
- **Upload bars** — real file picking with live image previews and simulated progress, used for property photos, ownership/title documents, product photos, service photos/logo, CVs, company logos, and ID verification documents
- **Kenyan Trade Business™ OS** — dashboard (Mountlion AI™ insights), sales (POS-style), inventory, suppliers, expenses, employees, reports, multi-business/branch switcher
- **Mountlion Owner Center™** — private, PIN-gated demo area: platform revenue, payment destinations, user roles, audit logs
- **Education, Finance, Transport, Delivery, Kenyan Trade Ads™** — supporting directories and flows
- **Map** — Map/Satellite toggle, tappable destinations, route line with driving/walking/transit ETA (mock data)
- **Global location model** — continent → country → region (label adapts per country, e.g. County/State/Province) → city
- **Language** — EN/Kiswahili toggle (header on desktop, Profile menu on mobile). Fully translated: navigation, home hero, categories, bottom nav, footer, Jobs board. Other deeper screens (Marketplace, Business OS, Owner Center, etc.) remain English-only for now — the `STRINGS` dictionary and `t()` helper are built to extend to them incrementally.
- **Theme** — light/dark toggle. Scoped intentionally: it recolors page chrome (header, footer, bottom nav, backgrounds) rather than every individually inline-styled card, to avoid a half-finished look. Extending it to full dark mode everywhere is straightforward but not done yet.

## Tech stack

- React + Vite
- Tailwind CSS
- lucide-react icons
- Local component state only (no backend, no real payments, no real auth, no real AI)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Brand colors

| Token | Hex |
|---|---|
| Primary Emerald | `#0B6B4F` |
| Dark Forest | `#064E3B` |
| Premium Gold | `#D4A72C` |
| Light Gold | `#F4E3A1` |
| Soft Background | `#F8FAF9` |
| Dark Text | `#17221E` |
| Secondary Text | `#64748B` |

## Where to connect real infrastructure

This section maps the spec's "technical requirements" to concrete seams in the code:

- **Authentication** — no sign-up/sign-in UI exists yet. Add a real auth provider (e.g. Firebase Auth, Auth0) and gate `KenyanTradeApp` behind it; role-based UI already exists conceptually (Owner Center PIN gate, Manage Center) but isn't backed by real permission checks.
- **Database** — all state is `useState` in `App.jsx`. Replace the seed arrays (`PRODUCTS`, `HOUSES`, `JOBS_SEED`, etc.) and state setters with real reads/writes to Firestore or another database.
- **Mountlion AI™** — `AI_INSIGHTS` is a static array rendered as-is. A real integration would call an LLM/analytics service and render its output in the same UI slot, keeping the 🟡 Demo tag until it's genuinely live.
- **Payments (Kenyan Trade Pay™)** — checkout and POS payment steps are UI-only; wire to M-Pesa Daraja API, Airtel Money, and card/bank processors **server-side only**. Never handle real credentials in this frontend.
- **Maps** — the map preview is a schematic SVG/CSS mock. Swap in Google Maps or Mapbox for real satellite imagery, live traffic, and turn-by-turn directions.
- **Real-time chat/calls (Kenyan Trade Connect™)** — the Messages modal is static demo data. A real implementation needs a backend (e.g. WebSocket/Firestore listeners) plus a calling SDK (e.g. Twilio, Agora) for voice/video.
- **File storage** — `UploadBar` genuinely picks files and previews images client-side but doesn't upload anywhere. Wire it to Firebase Storage (or similar) with private, access-controlled URLs.

## Roadmap / not yet implemented

This prototype is intentionally frontend-only. Before treating this as production-ready:

- Real authentication, MFA, session management, and role-based access control enforced server-side — the frontend never enforces real security on its own
- Real database instead of local component state
- Real AI (Mountlion AI™ is currently static demo insights)
- Real file storage behind the upload bars
- Real payments processed server-side (Kenyan Trade Pay™)
- Real-time messaging and voice/video calling (Kenyan Trade Connect™)
- Real maps/geolocation provider
- Real identity verification (KYC) workflow with human or third-party review (Kenyan Trade Verify™)
- Anti-fraud safeguards: listing limits for unverified accounts, report/flag listing, moderation queue
- Sign-up/sign-in, onboarding, and the Mountlion AI™ business-setup wizard
- Document Vault, offline-first sync, CV builder, and full dark-mode coverage beyond the current scoped chrome theme

## License

Proprietary — © 2026 Oscarian Express. Kenyan Trade™ is platform property. All rights reserved. Not licensed for reuse without permission.
