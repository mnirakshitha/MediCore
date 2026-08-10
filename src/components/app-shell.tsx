"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type LucideIcon, Bell, Building2, CalendarDays, ChevronDown, CircleHelp, ClipboardList, CreditCard, FileBarChart, FileText, FlaskConical, LayoutDashboard, LogOut, Menu, Moon, Package, PanelLeftClose, Search, ShieldCheck, Stethoscope, Sun, Users, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSession } from "@/components/session-context";
import type { Role } from "@/lib/medicore-data";

type NavItem = { label: string; href: string; icon: LucideIcon; roles: Role[] };
const all: Role[] = ["ADMIN", "DOCTOR", "RECEPTIONIST", "PHARMACIST", "ACCOUNTANT", "PATIENT"];
const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, roles: all },
  { label: "Patients", href: "/patients", icon: Users, roles: ["ADMIN", "DOCTOR", "RECEPTIONIST"] },
  { label: "Doctors", href: "/doctors", icon: Stethoscope, roles: ["ADMIN", "RECEPTIONIST"] },
  { label: "Departments", href: "/departments", icon: Building2, roles: ["ADMIN"] },
  { label: "Appointments", href: "/appointments", icon: CalendarDays, roles: ["ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT"] },
  { label: "Medical records", href: "/records", icon: ClipboardList, roles: ["ADMIN", "DOCTOR", "PATIENT"] },
  { label: "Prescriptions", href: "/prescriptions", icon: FileText, roles: ["ADMIN", "DOCTOR", "PHARMACIST", "PATIENT"] },
  { label: "Pharmacy", href: "/pharmacy", icon: Package, roles: ["ADMIN", "PHARMACIST"] },
  { label: "Billing", href: "/billing", icon: CreditCard, roles: ["ADMIN", "RECEPTIONIST", "ACCOUNTANT", "PATIENT"] },
  { label: "Staff", href: "/staff", icon: ShieldCheck, roles: ["ADMIN"] },
  { label: "Reports", href: "/reports", icon: FileBarChart, roles: ["ADMIN", "ACCOUNTANT"] },
];

const labels: Record<string, string> = { dashboard: "Overview", patients: "Patients", doctors: "Doctors", departments: "Departments", appointments: "Appointments", records: "Medical records", prescriptions: "Prescriptions", pharmacy: "Pharmacy", billing: "Billing", staff: "Staff", reports: "Reports" };

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, dark, toggleDark } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const visibleNav = useMemo(() => navItems.filter((item) => item.roles.includes(user.role)), [user.role]);
  const segment = pathname.split("/")[1] || "dashboard";
  const title = labels[segment] ?? "MediCore";

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); }
      if (event.key === "Escape") { setSearchOpen(false); setNotificationsOpen(false); setDrawerOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleLogout = () => { logout(); router.push("/login"); };
  return <div className="min-h-screen bg-[#f7f9fb] text-slate-800 dark:bg-[#0b1220] dark:text-slate-100">
    {drawerOpen && <button aria-label="Close navigation" onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-30 bg-slate-950/35 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-slate-200 bg-white px-4 py-5 transition-transform dark:border-slate-800 dark:bg-[#101827] ${drawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      <div className="flex items-center gap-3 px-2"><span className="grid size-9 place-items-center rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-600/20"><FlaskConical size={20} strokeWidth={2.3} /></span><div><p className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">MediCore</p><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-teal-600">Hospital OS</p></div><button onClick={() => setDrawerOpen(false)} className="ml-auto rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"><X size={18} /></button></div>
      <div className="mt-8"><p className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Workspace</p><nav className="mt-3 space-y-1">{visibleNav.map((item) => { const Icon = item.icon; const active = pathname === item.href || (item.href === "/dashboard" && pathname === "/"); return <Link onClick={() => setDrawerOpen(false)} key={item.href} href={item.href} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-teal-600 text-white shadow-md shadow-teal-700/15" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"}`}><Icon size={18} strokeWidth={active ? 2.35 : 2} />{item.label}</Link>; })}</nav></div>
      <div className="mt-auto rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/70"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-teal-100 text-xs font-extrabold text-teal-700 dark:bg-teal-500/20 dark:text-teal-300">{user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span><div className="min-w-0"><p className="truncate text-xs font-bold text-slate-800 dark:text-white">{user.name}</p><p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{user.role}</p></div></div><button onClick={handleLogout} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2 text-xs font-bold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-rose-500/10"><LogOut size={14} />Sign out</button></div>
    </aside>
    <div className="min-h-screen lg:pl-[260px]"><header className="sticky top-0 z-20 flex h-[72px] items-center gap-3 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-7 dark:border-slate-800 dark:bg-[#101827]/90"><button onClick={() => setDrawerOpen(true)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800" aria-label="Open navigation"><Menu size={20} /></button><div className="hidden items-center gap-2 text-sm sm:flex"><span className="text-slate-400">MediCore</span><span className="text-slate-300 dark:text-slate-600">/</span><span className="font-bold text-slate-800 dark:text-white">{title}</span></div><div className="ml-auto flex items-center gap-1.5 sm:gap-2"><button onClick={() => setSearchOpen(true)} className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-400 transition hover:border-teal-300 hover:bg-white sm:w-52 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700" aria-label="Global search"><Search size={16} /><span className="hidden sm:inline">Search anything...</span><kbd className="ml-auto hidden rounded border border-slate-200 bg-white px-1 py-0.5 text-[9px] font-bold sm:inline dark:border-slate-600 dark:bg-slate-900">⌘K</kbd></button><button onClick={toggleDark} className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Toggle color theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button><div className="relative"><button onClick={() => setNotificationsOpen((value) => !value)} className="relative grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Open notifications"><Bell size={18} /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#101827]" /></button>{notificationsOpen && <NotificationPanel />}</div><button className="hidden items-center gap-1 rounded-lg p-1 text-slate-500 hover:bg-slate-100 sm:flex dark:hover:bg-slate-800"><span className="grid size-7 place-items-center rounded-md bg-teal-100 text-[10px] font-extrabold text-teal-700 dark:bg-teal-500/20 dark:text-teal-300">{user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span><ChevronDown size={14} /></button></div></header><main className="mx-auto max-w-[1600px] p-4 sm:p-7">{children}</main></div>
    {searchOpen && <GlobalSearch query={query} setQuery={setQuery} onClose={() => setSearchOpen(false)} />}
  </div>;
}

function NotificationPanel() { const items = ["Appointment reminder sent to Olivia Bennett", "Azithromycin 250mg is below reorder level", "Payment of $620.00 received for INV-26091", "New prescription RX-7801 is ready to dispense"]; return <div className="absolute right-0 top-11 z-50 w-[340px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"><div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700"><p className="text-sm font-bold text-slate-800 dark:text-white">Notifications</p><span className="text-xs font-bold text-teal-600">Mark all read</span></div>{items.map((item, i) => <div key={item} className="flex gap-3 border-b border-slate-50 px-4 py-3 last:border-0 dark:border-slate-700/70"><span className={`mt-1.5 size-2 rounded-full ${i === 1 ? "bg-amber-500" : "bg-teal-500"}`} /><div><p className="text-xs font-medium leading-5 text-slate-600 dark:text-slate-300">{item}</p><p className="mt-1 text-[10px] text-slate-400">{i + 1}h ago</p></div></div>)}</div>; }

function GlobalSearch({ query, setQuery, onClose }: { query: string; setQuery: (value: string) => void; onClose: () => void }) { const router = useRouter(); const resultItems = [{ type: "Patient", title: "Olivia Bennett", href: "/patients" }, { type: "Doctor", title: "Dr. Amelia Roberts", href: "/doctors" }, { type: "Appointment", title: "APT-3491 · Cardiology review", href: "/appointments" }, { type: "Medicine", title: "Amoxicillin 500mg", href: "/pharmacy" }].filter((item) => !query || item.title.toLowerCase().includes(query.toLowerCase())); return <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/35 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={onClose}><div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900" onMouseDown={(e) => e.stopPropagation()}><div className="flex items-center gap-3 border-b border-slate-100 px-4 dark:border-slate-800"><Search size={19} className="text-slate-400" /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search patients, doctors, appointments..." className="h-14 min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 dark:text-white" /><kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400 dark:border-slate-700">ESC</kbd></div><div className="p-2">{resultItems.length ? resultItems.map((item) => <button key={item.title} onClick={() => { router.push(item.href); onClose(); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800"><span className="grid size-8 place-items-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300"><Search size={15} /></span><span><span className="block text-sm font-semibold text-slate-700 dark:text-slate-200">{item.title}</span><span className="text-xs text-slate-400">{item.type}</span></span></button>) : <p className="p-6 text-center text-sm text-slate-500">No results found. Try a different keyword.</p>}</div><p className="border-t border-slate-100 px-4 py-2 text-[10px] text-slate-400 dark:border-slate-800">Search across your permitted hospital records</p></div></div>; }
