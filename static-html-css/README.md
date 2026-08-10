# MediCore — HTML & CSS Edition

This folder is a standalone, static version of MediCore built with **only HTML and CSS**.

## Open it in VS Code

1. Open the `static-html-css` folder in VS Code.
2. Install the **Live Server** extension if you do not already have it.
3. Right-click `index.html` and select **Open with Live Server**.
4. Or simply double-click `index.html` to open it in a browser.

No `npm install`, server, React, JavaScript, or database is required for this static edition.

## Entry File

```text
static-html-css/index.html
```

## Pages

- `index.html` — public landing page
- `login.html` — demo sign-in page
- `dashboard.html` — admin dashboard
- `patients.html` — patient management and registration form layout
- `doctors.html` — doctor directory and provider form layout
- `departments.html` — department cards and setup form
- `appointments.html` — calendar and appointment booking layout
- `records.html` — medical records layout
- `prescriptions.html` — prescription management layout
- `pharmacy.html` — inventory alerts and dispensing form layout
- `billing.html` — invoices and payments layout
- `staff.html` — staff management layout
- `reports.html` — analytics and reporting dashboard

## Important Static-Website Limitation

Because this version uses HTML and CSS only, it provides the complete visual experience, responsive layout, page navigation, and browser-native form validation. It does **not** persist data, authenticate users, calculate charts, or run real CRUD operations. The full Next.js/Drizzle version in the project root provides those application capabilities.
