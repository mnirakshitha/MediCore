import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SessionProvider } from "@/components/session-context";

export const metadata: Metadata = {
  title: "MediCore — Hospital Management System",
  description: "A modern, role-aware operating system for hospital care delivery.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" suppressHydrationWarning><body className="antialiased"><SessionProvider>{children}</SessionProvider></body></html>;
}
