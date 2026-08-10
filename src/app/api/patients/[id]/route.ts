import { db } from "@/db";
import { patients } from "@/db/schema";
import { currentSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

const allowedRoles = ["ADMIN", "DOCTOR", "RECEPTIONIST"];
function canManage(request: Request) { const session = currentSession(request); return session && allowedRoles.includes(session.role); }

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!canManage(request)) return Response.json({ message: "You are not authorized to view this patient." }, { status: 403 });
  const { id } = await params;
  const [patient] = await db.select().from(patients).where(eq(patients.id, Number(id))).limit(1);
  return patient ? Response.json({ data: patient }) : Response.json({ message: "Patient not found." }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!canManage(request)) return Response.json({ message: "You are not authorized to update patients." }, { status: 403 });
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as Record<string, string> | null;
  if (!body?.fullName || !body.phone) return Response.json({ message: "Full name and phone are required." }, { status: 400 });
  const [updated] = await db.update(patients).set({ fullName: body.fullName, phone: body.phone, email: body.email || null, address: body.address || null, insuranceInfo: body.insuranceInfo || null, updatedAt: new Date() }).where(eq(patients.id, Number(id))).returning();
  return updated ? Response.json({ data: updated }) : Response.json({ message: "Patient not found." }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!canManage(request)) return Response.json({ message: "You are not authorized to deactivate patients." }, { status: 403 });
  const { id } = await params;
  const [updated] = await db.update(patients).set({ status: "INACTIVE", updatedAt: new Date() }).where(eq(patients.id, Number(id))).returning();
  return updated ? Response.json({ data: updated }) : Response.json({ message: "Patient not found." }, { status: 404 });
}
