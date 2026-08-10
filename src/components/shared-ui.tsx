"use client";

import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import type { ReactNode } from "react";

export function StatusBadge({ value }: { value: string }) {
  const styles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/15 dark:text-emerald-300",
    Inactive: "bg-slate-100 text-slate-600 ring-slate-500/15 dark:bg-slate-700 dark:text-slate-300",
    Available: "bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/15 dark:text-emerald-300",
    Unavailable: "bg-amber-50 text-amber-700 ring-amber-600/15 dark:bg-amber-500/15 dark:text-amber-300",
    Confirmed: "bg-blue-50 text-blue-700 ring-blue-600/15 dark:bg-blue-500/15 dark:text-blue-300",
    Scheduled: "bg-violet-50 text-violet-700 ring-violet-600/15 dark:bg-violet-500/15 dark:text-violet-300",
    Completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/15 dark:text-emerald-300",
    Cancelled: "bg-rose-50 text-rose-700 ring-rose-600/15 dark:bg-rose-500/15 dark:text-rose-300",
    "No Show": "bg-slate-100 text-slate-600 ring-slate-500/15 dark:bg-slate-700 dark:text-slate-300",
    Paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/15 dark:text-emerald-300",
    Pending: "bg-amber-50 text-amber-700 ring-amber-600/15 dark:bg-amber-500/15 dark:text-amber-300",
    Partial: "bg-blue-50 text-blue-700 ring-blue-600/15 dark:bg-blue-500/15 dark:text-blue-300",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${styles[value] ?? styles.Active}`}>{value}</span>;
}

export function StatCard({ title, value, delta, icon, tint = "teal" }: { title: string; value: string; delta: string; icon: ReactNode; tint?: "teal" | "blue" | "violet" | "amber" | "rose" | "sky" }) {
  const tintClass = { teal: "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300", blue: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300", violet: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300", amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300", rose: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300", sky: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300" }[tint];
  return <div className="surface p-5"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{title}</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p></div><span className={`grid size-10 place-items-center rounded-xl ${tintClass}`}>{icon}</span></div><p className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400"><span className="font-bold">↗ {delta}</span> <span className="text-slate-400">vs. last month</span></p></div>;
}

export function EmptyState({ title, detail, action }: { title: string; detail: string; action?: ReactNode }) {
  return <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center dark:border-slate-700 dark:bg-slate-800/50"><div className="grid size-12 place-items-center rounded-2xl bg-white text-teal-600 shadow-sm dark:bg-slate-800"><Info size={21} /></div><h3 className="mt-3 text-sm font-bold text-slate-800 dark:text-white">{title}</h3><p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{detail}</p>{action && <div className="mt-4">{action}</div>}</div>;
}

export function Toast({ tone = "success", title, onClose }: { tone?: "success" | "warning"; title: string; onClose: () => void }) {
  const Icon = tone === "success" ? CheckCircle2 : TriangleAlert;
  return <div role="status" className="fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"><Icon size={18} className={tone === "success" ? "text-emerald-500" : "text-amber-500"} /><span>{title}</span><button onClick={onClose} className="ml-2 text-slate-400 hover:text-slate-700 dark:hover:text-white" aria-label="Dismiss notification"><X size={16} /></button></div>;
}

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm" onMouseDown={onClose}><div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900" onMouseDown={(event) => event.stopPropagation()}><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2><button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800" aria-label="Close dialog"><X size={18} /></button></div>{children}</div></div>;
}
