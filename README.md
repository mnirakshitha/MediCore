# MediCore — Hospital Management System

A polished, full-stack hospital operations platform designed as a portfolio-grade healthcare SaaS application. MediCore brings patient intake, provider coordination, appointment scheduling, protected clinical documentation, prescriptions, pharmacy inventory, billing, staff administration, and analytics into a single role-aware workspace.

> **Runtime note:** This repository is implemented with the platform-supported **Next.js App Router + TypeScript + Tailwind + Drizzle ORM + PostgreSQL** stack. The original Spring Boot/MySQL outline has been adapted to the runnable full-stack environment without compromising the domain model or REST architecture.

## Standalone HTML & CSS Version

A no-build static version is available in [`static-html-css/`](./static-html-css/). Open [`static-html-css/index.html`](./static-html-css/index.html) with the VS Code **Live Server** extension, or open that file directly in your browser. It includes the landing page, login, dashboard, patients, doctors, departments, appointments, records, prescriptions, pharmacy, billing, staff, and reports as responsive HTML/CSS pages.

## Highlights

- Premium responsive healthcare UI with public landing experience and dark mode
- JWT-style signed demo session endpoint with role-aware navigation and protected workspace states
- Roles: `ADMIN`, `DOCTOR`, `RECEPTIONIST`, `PHARMACIST`, `ACCOUNTANT`, `PATIENT`
- Admin command center with patient, appointment, revenue, and department analytics (Recharts)
- Patient directory with search, sort, pagination, registration form validation, soft deactivation, and patient details tabs
- Provider directory, department management, appointment calendar views, booking safeguards, clinical records, prescriptions, pharmacy controls, invoices, staff, and reports
- Pharmacy low-stock / expiry indicators and safe dispensing validation
- Accessible dialogs, toast messages, tooltips, empty states, confirmation flow, mobile drawer, keyboard search (`⌘/Ctrl + K`), and error pages
- Drizzle relational schema for users, departments, patients, doctors, appointments, records, prescriptions, inventory, billing, payments, staff, and notifications

## Screenshots

Run the app locally and capture the following portfolio views:

1. Public landing page
2. Admin operations dashboard
3. Patient directory and patient detail profile
4. Appointment scheduling calendar
5. Pharmacy inventory and billing workspace
6. Role-aware sidebar in light and dark modes

## Tech Stack

| Layer | Technology |
| --- | --- |
| Web application | Next.js 16 App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4, responsive CSS utilities |
| Charts | Recharts |
| Icons | Lucide React |
| API | Next.js route handlers, RESTful JSON responses |
| Database | PostgreSQL + Drizzle ORM |
| Auth model | HMAC-signed JWT-style session token, role authorization |

## Project Structure

```text
src/
  app/                  # App Router pages, API routes, error states
  components/           # Landing, auth, dashboard, shell, module UI
  db/                   # Drizzle connection and normalized schema
  lib/                  # Auth helper and realistic interactive demo data
database/
  schema.sql            # PostgreSQL relational model mirror
  seed.sql              # Starter data guidance
```

## Quick Start (VS Code)

1. Open the project folder in VS Code.
2. Copy `.env.example` to `.env` and configure `DATABASE_URL` and `AUTH_SECRET`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Apply the Drizzle schema to PostgreSQL:
   ```bash
   npx drizzle-kit push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Visit `http://localhost:3000`.

### Production Verification

```bash
npx next typegen
npm exec tsc -- --noEmit --pretty false
npm run build
npm run start
```

## Demo Credentials

All demo accounts use the password: **`Demo@123`**

| Role | Email |
| --- | --- |
| Admin | `admin@medicore.com` |
| Doctor | `doctor@medicore.com` |
| Receptionist | `reception@medicore.com` |
| Pharmacist | `pharmacy@medicore.com` |
| Accountant | `accounts@medicore.com` |
| Patient | `patient@medicore.com` |

The login page includes one-click account selectors. Production systems should replace this presentation account contract with database-backed password hashes, refresh token rotation, MFA, and secure HttpOnly cookies.

## API Contracts

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Validates demo credentials and returns a signed role session |
| `POST` | `/api/auth/logout` | Session logout acknowledgement |
| `GET` | `/api/patients?search=` | Lists permitted patient records through Drizzle |
| `POST` | `/api/patients` | Creates a validated patient record |
| `GET` | `/api/patients/:id` | Returns a patient record |
| `PUT` | `/api/patients/:id` | Updates patient contact/profile details |
| `DELETE` | `/api/patients/:id` | Soft-deactivates a patient record |
| `POST` | `/api/appointments` | Books an appointment after availability/conflict validation |
| `GET` | `/api/search?q=` | Role-authenticated global search contract |
| `GET` | `/api/health` | Database health probe |

All sensitive operational endpoints expect a bearer token from `/api/auth/login`. The database schema is ready for the remaining resource endpoints using the same service/validation pattern.

## Domain Model

The normalized model uses foreign keys and domain enums for:

- `users` / role status
- `departments`, `doctors`, `patients`
- `appointments` with provider-time index for conflict validation
- `medical_records`
- `prescriptions` and `prescription_items`
- `medicines` with quantity and reorder constraints
- `bills` and `payments`
- `staff` and `notifications`

Medical, prescription, bill, and membership records use inactive/soft-deactivation status rather than destructive deletion.

## Security Notes

- Password fields are modeled as `password_hash`; plain-text password persistence is not used.
- Role filtering occurs in the UI and REST handlers.
- Clinical edits are limited to applicable roles; the patient records view is read-only.
- Appointment booking blocks unavailable providers and collisions.
- Pharmacy dispensing blocks insufficient stock amounts.
- Replace the development `AUTH_SECRET` and demo credential contract before deploying.

## Future Improvements

- Database-backed registration, secure password reset, HttpOnly cookies, and MFA
- Full CRUD route handlers for every module with audit log persistence
- File uploads for document scans and profile images
- Real PDF invoice generation, email/SMS reminders, and external calendar integration
- Fine-grained row-level policy enforcement and FHIR/HL7 interoperability

## License

Portfolio / educational project. Do not use with real patient data without a full security, compliance, and legal review.
