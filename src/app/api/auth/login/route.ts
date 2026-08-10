import { createToken } from "@/lib/auth";
import { demoAccounts } from "@/lib/medicore-data";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password;
  if (!email || !password) return Response.json({ message: "Email and password are required." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(email)) return Response.json({ message: "Enter a valid email address." }, { status: 400 });
  const account = demoAccounts.find((item) => item.email === email && item.password === password);
  if (!account) return Response.json({ message: "Invalid email or password. Use a demo account to explore MediCore." }, { status: 401 });
  const token = createToken({ sub: account.email, email: account.email, role: account.role, name: account.name });
  return Response.json({ token, user: { name: account.name, email: account.email, role: account.role } });
}
