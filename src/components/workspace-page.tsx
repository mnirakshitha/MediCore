"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardContent } from "@/components/dashboard-content";
import { ModuleContent } from "@/components/module-content";
import { useSession } from "@/components/session-context";
import type { Role } from "@/lib/medicore-data";

type Page = "dashboard" | "patients" | "doctors" | "departments" | "appointments" | "records" | "prescriptions" | "pharmacy" | "billing" | "staff" | "reports";
const rules: Record<Page, Role[]> = { dashboard: ["ADMIN", "DOCTOR", "RECEPTIONIST", "PHARMACIST", "ACCOUNTANT", "PATIENT"], patients: ["ADMIN", "DOCTOR", "RECEPTIONIST"], doctors: ["ADMIN", "RECEPTIONIST"], departments: ["ADMIN"], appointments: ["ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT"], records: ["ADMIN", "DOCTOR", "PATIENT"], prescriptions: ["ADMIN", "DOCTOR", "PHARMACIST", "PATIENT"], pharmacy: ["ADMIN", "PHARMACIST"], billing: ["ADMIN", "RECEPTIONIST", "ACCOUNTANT", "PATIENT"], staff: ["ADMIN"], reports: ["ADMIN", "ACCOUNTANT"] };
export function WorkspacePage({ page }: { page: Page }) { const { user } = useSession(); const allowed = rules[page].includes(user.role); return <AppShell>{allowed ? page === "dashboard" ? <DashboardContent /> : <ModuleContent page={page} /> : <section className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center text-center"><span className="grid size-14 place-items-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-500/15"><LockKeyhole size={25} /></span><p className="mt-6 text-xs font-extrabold uppercase tracking-[.15em] text-rose-600">403 · Access restricted</p><h1 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">This workspace is not available for your role.</h1><p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Your {user.role} account does not have permission to view this area. Use the workspace navigation to continue.</p><Link href="/dashboard" className="button-primary mt-6">Return to overview</Link></section>}</AppShell>; }
