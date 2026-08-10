import { db } from "@/db";
import { patients } from "@/db/schema";
import { currentSession } from "@/lib/auth";
import { and, desc, eq, ilike, or } from "drizzle-orm";

const allowedRoles = ["ADMIN", "DOCTOR", "RECEPTIONIST"];

function authorized(request: Request) {
  const session = currentSession(request);
  return session && allowedRoles.includes(session.role) ? session : null;
}

export async function GET(request: Request) {
  if (!authorized(request)) return Response.json({ message: "You are not authorized to view patients." }, { status: 403 });
  const search = new URL(request.url).searchParams.get("search")?.trim();
  const where = search ? or(ilike(patients.fullName, `%${search}%`), ilike(patients.patientCode, `%${search}%`), ilike(patients.email, `%${search}%`)) : undefined;
  const result = await db.select().from(patients).where(where).orderBy(desc(patients.createdAt)).limit(100);
  return Response.json({ data: result });
}

export async function POST(request: Request) {
  if (!authorized(request)) return Response.json({ message: "You are not authorized to create patients." }, { status: 403 });
  const body = (await request.json().catch(() => null)) as Record<string, string> | null;
  if (!body?.fullName || !body.dateOfBirth || !body.gender || !body.phone) return Response.json({ message: "Full name, date of birth, gender, and phone are required." }, { status: 400 });
  if (body.email && !/^\S+@\S+\.\S+$/.test(body.email)) return Response.json({ message: "Enter a valid patient email." }, { status: 400 });
  const code = `PAT-${Date.now().toString().slice(-6)}`;
  const [patient] = await db.insert(patients).values({ patientCode: code, fullName: body.fullName, dateOfBirth: body.dateOfBirth, gender: body.gender, bloodGroup: body.bloodGroup || null, phone: body.phone, email: body.email || null, address: body.address || null, emergencyContact: body.emergencyContact || null, insuranceInfo: body.insuranceInfo || null }).returning();
  return Response.json({ data: patient }, { status: 201 });
}
