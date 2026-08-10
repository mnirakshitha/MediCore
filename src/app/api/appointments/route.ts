import { db } from "@/db";
import { appointments, doctors } from "@/db/schema";
import { currentSession } from "@/lib/auth";
import { and, eq, ne } from "drizzle-orm";

const allowedRoles = ["ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT"];

export async function POST(request: Request) {
  const session = currentSession(request);
  if (!session || !allowedRoles.includes(session.role)) return Response.json({ message: "You are not authorized to book appointments." }, { status: 403 });
  const body = (await request.json().catch(() => null)) as { patientId?: number; doctorId?: number; departmentId?: number; appointmentAt?: string; reason?: string } | null;
  if (!body?.patientId || !body.doctorId || !body.departmentId || !body.appointmentAt || !body.reason) return Response.json({ message: "Patient, doctor, department, date/time, and reason are required." }, { status: 400 });
  const at = new Date(body.appointmentAt);
  if (Number.isNaN(at.getTime()) || at < new Date()) return Response.json({ message: "Choose a valid future appointment time." }, { status: 400 });
  const [doctor] = await db.select({ availability: doctors.availability }).from(doctors).where(eq(doctors.id, body.doctorId)).limit(1);
  if (!doctor?.availability) return Response.json({ message: "This doctor is unavailable. Please choose another provider." }, { status: 409 });
  const [conflict] = await db.select({ id: appointments.id }).from(appointments).where(and(eq(appointments.doctorId, body.doctorId), eq(appointments.appointmentAt, at), ne(appointments.status, "CANCELLED"))).limit(1);
  if (conflict) return Response.json({ message: "This time is already reserved for the selected doctor." }, { status: 409 });
  const [appointment] = await db.insert(appointments).values({ appointmentCode: `APT-${Date.now().toString().slice(-6)}`, patientId: body.patientId, doctorId: body.doctorId, departmentId: body.departmentId, appointmentAt: at, reason: body.reason }).returning();
  return Response.json({ data: appointment }, { status: 201 });
}
