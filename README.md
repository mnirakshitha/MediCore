# MediCore — Hospital Management System

A polished, full-stack hospital operations platform designed as a portfolio-grade healthcare SaaS application. MediCore brings patient intake, provider coordination, appointment scheduling, protected clinical documentation, prescriptions, pharmacy inventory, billing, staff administration, and analytics into a single role-aware workspace.

## Standalone HTML & CSS Version

A no-build static version is available in `static-html-css/`. Open `static-html-css/index.html` with the VS Code Live Server extension, or open that file directly in your browser.

## Highlights

- Premium responsive healthcare UI with public landing experience and dark mode
- Role-aware navigation and protected workspace states
- Admin command center with analytics and operations views
- Patient directory, provider directory, appointments, records, prescriptions, pharmacy, billing, staff, and reports
- Drizzle relational schema for users, departments, patients, doctors, appointments, records, prescriptions, inventory, billing, payments, staff, and notifications

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Drizzle ORM
- PostgreSQL

## Quick Start

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and configure `DATABASE_URL` and `AUTH_SECRET`
3. Apply the schema: `npx drizzle-kit push`
4. Run the app: `npm run dev`
