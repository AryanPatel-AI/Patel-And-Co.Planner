# Patel & Co. Planner - Antigravity Memory & State Ledger

> 🚨 **MANDATORY AGENT DIRECTIVES**:
> 1. **SESSION INITIALIZATION**: At the start of every new chat, **READ THIS FILE FIRST**. Never ask the user about stack, auth architecture, or what is built.
> 2. **POST-FEATURE AUTO-UPDATE**: Immediately upon completing any feature, endpoint, or schema update, update the "What Has Been Built" section and append to the Changelog.
> 3. **AUTH CONTINUITY**: Preserve Clerk and Convex authentication patterns across all changes.

---

## 1. 📌 Project Overview (Project Kya Hai)
- **Project Name:** Patel & Co. Planner (Event Organizer Platform)
- **Core Purpose:** Comprehensive modern event planning and discovery platform. Users can create, discover, manage physical and virtual events, register for tickets, and use Google Gemini AI assistance for smart event planning and generation.
- **Target Users:** Event organizers, attendees, and community hosts.
- **Current State:** Active Development / Feature Integration.

---

## 2. 🛠️ Decided Tech Stack & Architecture (Tech Stack)
- **Framework:** Next.js 16 (App Router), React 19
- **Backend / Realtime Database:** Convex (`convex/` directory)
- **Styling & UI:** Tailwind CSS v4, Radix UI Primitives, Base UI, Shadcn UI, Lucide Icons, Sonner (Toasts)
- **AI Integration:** Google Generative AI (`@google/generative-ai`, Gemini models) in `convex/ai.js`
- **State & Theme:** `next-themes` (Dark/Light mode support)
- **Carousels / Pickers:** `embla-carousel-react`, `react-day-picker`, `date-fns`

---

## 3. 🔐 Authentication & Security (Sab Auth Details)
- **Auth Provider:** Clerk (`@clerk/nextjs`, `@clerk/clerk-react`, `@clerk/themes`)
- **Backend Auth Sync:** Convex + Clerk integration via `convex/auth.config.js` (`CLERK_JWT_ISSUER_DOMAIN`).
- **Token Mechanism:** Clerk JWT token forwarded to Convex via `ConvexProviderWithClerk`.
- **User Record Sync:** Convex `users` table indexed by `tokenIdentifier` (`by_token`).
- **Route Architecture:**
  - `app/(auth)/`: Sign-in and sign-up pages using Clerk pre-built and custom components.
  - `app/(public)/`: Public discovery, landing page, explore events.
  - `app/(main)/`: Protected authenticated application routes (create event, dashboard, user settings).
- **Client Provider:** `app/ConvexClientProvider.jsx` wraps children in `ClerkProvider` and `ConvexProviderWithClerk`.
- **Required Environment Variables (Keys Only):**
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `CLERK_JWT_ISSUER_DOMAIN`
  - `NEXT_PUBLIC_CONVEX_URL`
  - `GEMINI_API_KEY`

---

## 4. ✅ What Has Been Built (Kya Ban Chuka Hai)
- [x] **Clerk + Convex Authentication**: Login, Sign up, session sync, and `tokenIdentifier` mapping in `convex/users.js`.
- [x] **Database Schema**: Full schema in `convex/schema.js` covering `users`, `events`, registrations, ticketing, and categories.
- [x] **Event Management Backend**:
  - `convex/events.js`: Queries and mutations for creating, updating, and fetching events.
  - `convex/explore.js`: Search, category filtering, and location-based discovery.
- [x] **AI Assistant Backend**: `convex/ai.js` powered by Google Gemini for event suggestions and descriptions.
- [x] **Database Seeding**: `convex/seed.js` for populating dummy events and categories.
- [x] **UI Layout & Themes**: Responsive layout with navbar, footer, theme switcher, and modern styling.
- [x] **Production Deployment**:
  - **Backend (Convex Prod)**: Deployed to `https://dapper-caterpillar-735.convex.cloud` with production Clerk JWT auth configured and 30 sample events seeded.
  - **Frontend (Vercel Prod)**: Deployed and live at `https://patel-and-co-planner.vercel.app` with production environment variables set.

---

## 5. ⏳ Pending / Next Steps (Kya Baki Hai)
- [ ] Refine AI-assisted event schedule generator in the UI.
- [ ] Offline / online ticket check-in QR scanner.
- [ ] Real-time attendee chat & notifications.
- [ ] Email confirmations for event registrations.

---

## 6. 🚀 Setup & Run Commands
- **Install Dependencies:** `npm install`
- **Convex Backend:** `npx convex dev`
- **Convex Prod Deploy:** `npx convex deploy --yes`
- **Next.js Dev Server:** `npm run dev` (Runs on `http://localhost:3000`)
- **Build:** `npm run build`
- **Vercel Prod Deploy:** `npx vercel --prod --yes`

---

## 7. 📝 Changelog & Feature History
| Date | Feature / Task Completed | Key Files | Auth / Notes |
|------|--------------------------|-----------|--------------|
| Initial | Next.js + Convex + Clerk Setup | `app/`, `convex/` | Clerk JWT synced with Convex |
| Initial | Event CRUD & AI Integration | `convex/events.js`, `convex/ai.js` | Gemini AI integration |
| 2026-11-06 | Antigravity Context Ledger initialized | `ANTIGRAVITY.md` | Full memory & auth persistence enabled |
| 2026-11-14 | Untracked AI skills & agent configs from git & ignored | `.gitignore` | Kept `.agents/skills`, `.claude/skills`, `AGENTS.md`, `CLAUDE.md` locally on Mac |
| 2026-11-14 | Comprehensive README revamp with mockups & badges | `README.md` | Added brand logo, 3D mobile mockup, platform banner, full architecture, & setup guide |
| 2026-11-14 | Deployed full frontend & backend to production | Convex Prod, Vercel | Live frontend: `patel-and-co-planner.vercel.app`, Convex: `dapper-caterpillar-735.convex.cloud` |
| 2026-11-14 | Removed license badge and section | `README.md` | Removed all open-source MIT license references |
