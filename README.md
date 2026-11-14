<p align="center">
  <img src="public/PACo.png" alt="Patel & Co. Planner" width="600" />
</p>

<h1 align="center">Patel & Co. Planner</h1>

<p align="center">
  <strong>The intelligent, real-time event discovery, planning, and ticketing platform.</strong><br>
  Powered by Next.js 16, Convex Realtime Database, Clerk Authentication, and Google Gemini AI.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Convex-Realtime%20Backend-FF5A5F?style=for-the-badge&logo=convex&logoColor=white" alt="Convex" />
  <img src="https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
  <img src="https://img.shields.io/badge/Google%20Gemini-AI%20Assistant-8E75FF?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
</p>

---

## 📱 App Preview

<p align="center">
  <img src="public/app.png" alt="Patel & Co. Planner Mobile Mockup" width="480" />
</p>
<p align="center"><em>Responsive, sleek, mobile-first event discovery and planning experience.</em></p>

---

## ✨ Features

- **🤖 Google Gemini AI Event Generation**: Generate full event titles, descriptions, categories, tags, and capacity estimates from a single natural-language prompt using `gemini-1.5-flash`.
- **📍 Smart Location-Based Discovery**: Auto-detects user location to surface nearby local gatherings, plus granular filtering across Indian cities, states, and global locations.
- **🎪 4-Step Event Creation Wizard**: A structured, intuitive multi-step form covering:
  1. **Basics**: Title, description, category, tags, and AI auto-generation.
  2. **Location**: Physical venue details, Google Maps integration, or virtual links.
  3. **Capacity & Ticketing**: Free vs. paid admission, seat capacities, and price settings.
  4. **Review & Publish**: Live preview before publishing to the community.
- **🔐 Seamless Clerk + Convex Authentication**: JWT-synchronized identity management ensuring secure, authenticated mutations and automated user profile sync.
- **⚡ 100% Real-Time Backend**: Built on Convex with reactive queries and live subscriptions—updates reflect instantaneously across all devices with zero polling.
- **🌓 Dark & Light Mode Support**: Beautiful aesthetic designed with Tailwind CSS v4, Radix UI primitives, Lucide icons, and Embla carousels.
- **🎟️ Ticketing & Attendee Management**: Track registration counts, enforce capacity limits, and organize attendee check-ins.

---

## 🖼️ Platform Showcase

<p align="center">
  <img src="public/P&C.P.png" alt="Patel & Co. Planner Branding" width="700" />
</p>

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Framework & Client** | [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Styling & Components** | [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Base UI](https://base-ui.com/), [Lucide Icons](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/) |
| **Realtime Backend** | [Convex](https://convex.dev/) (Reactive Database, Serverless Functions, Cron Actions) |
| **Authentication** | [Clerk](https://clerk.com/) (`@clerk/nextjs`, `@clerk/themes`, JWT token sync) |
| **AI Integration** | [Google Generative AI](https://ai.google.dev/) (`@google/generative-ai`, `gemini-1.5-flash`) |
| **Carousels & UI Polish** | [Embla Carousel](https://www.embla-carousel.com/), `react-day-picker`, `date-fns` |
| **Location Services** | `country-state-city`, Browser Geolocation API |

---

## 📂 Project Structure

```text
Patel-And-Co.Planer/
├── app/
│   ├── (auth)/                  # Clerk Sign-In & Sign-Up routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (main)/                  # Protected organizer routes
│   │   └── create-event/        # 4-step event creation wizard
│   ├── (public)/                # Public discovery & explore routes
│   │   └── explore/             # Event search, location filters, categories
│   ├── ConvexClientProvider.jsx # Clerk + Convex combined provider
│   ├── globals.css              # Tailwind CSS v4 design tokens
│   ├── layout.js                # Root layout with Header, Toaster, & Themes
│   └── page.js                  # Hero landing page with 3D showcase
├── components/
│   ├── ui/                      # Reusable UI primitives (Buttons, Dialogs, Cards)
│   ├── event-card.jsx           # Interactive event cards
│   ├── event-idea-generator.jsx # AI event inspiration assistant
│   ├── header.jsx               # Navigation bar with auth & theme switcher
│   └── theme-provider.jsx       # Light / dark theme management
├── convex/
│   ├── schema.js                # Database schema (users, events, registrations)
│   ├── events.js                # Event CRUD queries and mutations
│   ├── explore.js               # Event discovery and category filtering
│   ├── ai.js                    # Google Gemini prompt-to-event action
│   ├── users.js                 # User profile & Clerk token sync
│   ├── auth.config.js           # Clerk JWT provider configuration
│   └── seed.js                  # Database seeder with sample events & categories
├── hooks/
│   ├── use-convex-query.jsx     # Convex reactive query helper
│   ├── use-nearby-location.js   # Geolocation hook
│   └── use-store-user.js        # Syncs Clerk auth session with Convex
├── lib/
│   ├── data.js                  # Static categories and event templates
│   ├── location-utils.js        # City and state normalization
│   └── utils.js                 # Class name merger (clsx + tailwind-merge)
└── public/
    ├── app.png                  # Mobile application 3D mockup
    ├── PACo.png                 # Patel & Co. brand header banner
    └── P&C.P.png                # Platform showcase banner
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.18 or later)
- [npm](https://www.npmjs.com/) or `pnpm` / `bun`
- A free [Convex Account](https://convex.dev/)
- A free [Clerk Account](https://clerk.com/)
- A [Google Gemini API Key](https://aistudio.google.com/)

---

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AryanPatel-AI/Patel-And-Co.Planner.git
   cd Patel-And-Co.Planer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   CLERK_JWT_ISSUER_DOMAIN=https://your-domain.clerk.accounts.dev

   # Convex Realtime Backend
   NEXT_PUBLIC_CONVEX_URL=https://your-instance.convex.cloud
   CONVEX_DEPLOYMENT=dev:your-deployment

   # Google Gemini AI
   GEMINI_API_KEY=AIzaSy...
   ```

4. **Initialize and start Convex backend:**
   In a separate terminal tab:
   ```bash
   npx convex dev
   ```

5. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

6. **(Optional) Seed Database with Sample Events:**
   You can populate dummy events and organizers directly:
   ```bash
   npx convex run seed:run
   ```

---

## 🔑 Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | **Yes** | Clerk client-side publishable key |
| `CLERK_SECRET_KEY` | **Yes** | Clerk server-side secret key |
| `CLERK_JWT_ISSUER_DOMAIN` | **Yes** | Clerk JWT Issuer URL for Convex auth validation |
| `NEXT_PUBLIC_CONVEX_URL` | **Yes** | Deployment URL for Convex client connection |
| `CONVEX_DEPLOYMENT` | **Yes** | Convex deployment identifier |
| `GEMINI_API_KEY` | **Yes** | Google Gemini API key used in `convex/ai.js` |

---

## 🎨 Design Inspirations & Prototypes

The user experience and interfaces are inspired by curated high-conversion patterns:

- 📱 [Onboarding Flow Reference](https://mobbin.com/screens/59f50ced-5736-4086-8986-bbc712a8a2e8?utm_source=copy_link&utm_medium=link&utm_campaign=screen_sharing)
- 🔍 [Search & Discovery Experience](https://mobbin.com/screens/f6573e16-66e5-4dae-bf93-9861f7ea04bb?utm_source=copy_link&utm_medium=link&utm_campaign=screen_sharing)
- 📝 [Event Creation Workflow](https://mobbin.com/screens/5883ba8b-9c30-4173-9e0d-2ab5db72da93?utm_source=copy_link&utm_medium=link&utm_campaign=screen_sharing)
- 🎟️ [QR Scanner & Attendee Check-In](https://mobbin.com/screens/b0badc87-7915-456c-bb32-d635cc48f2d4?utm_source=copy_link&utm_medium=link&utm_campaign=screen_sharing)

---

## 🗺️ Roadmap

- [x] Next.js 16 App Router & Tailwind CSS v4 layout
- [x] Clerk authentication with Convex backend token sync
- [x] Real-time event creation with 4-step wizard
- [x] Google Gemini AI event details and description generator
- [x] Location-based event discovery and category filters
- [ ] QR Code scanner for live ticket check-ins
- [ ] Real-time attendee chat & organizer announcements
- [ ] Automated email confirmations & calendar invite downloads (.ics)
- [ ] Stripe / Razorpay online payment integration for paid tickets
