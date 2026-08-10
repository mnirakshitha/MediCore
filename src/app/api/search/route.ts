import { db } from "@/db";
import { appointments, doctors, medicines, patients, prescriptions } from "@/db/schema";
import { currentSession } from "@/lib/auth";
import { ilike, or } from "drizzle-orm";

export async function GET(request: Request) {
  if (!currentSession(request)) return Response.json({ message: "Sign in to search MediCore." }, { status: 401 });
  const query = new URL(request.url).searchParams.get("q")?.trim();
  if (!query || query.length < 2) return Response.json({ data: [] });
  const q = `%${query}%`;
  const [patientResults, doctorResults, medicineResults, appointmentResults, prescriptionResults] = await Promise.all([
    db.select({ id: patients.id, title: patients.fullName, subtitle: patients.patientCode }).from(patients).where(or(ilike(patients.fullName, q), ilike(patients.patientCode, q))).limit(5),
    db.select({ id: doctors.id, title: doctors.fullName, subtitle: doctors.specialization }).from(doctors).where(or(ilike(doctors.fullName, q), ilike(doctors.specialization, q))).limit(5),
    db.select({ id: medicines.id, title: medicines.name, subtitle: medicines.medicineCode }).from(medicines).where(or(ilike(medicines.name, q), ilike(medicines.medicineCode, q))).limit(5),
    db.select({ id: appointments.id, title: appointments.appointmentCode, subtitle: appointments.reason }).from(appointments).where(ilike(appointments.appointmentCode, q)).limit(5),
    db.select({ id: prescriptions.id, title: prescriptions.prescriptionCode, subtitle: prescriptions.diagnosis }).from(prescriptions).where(ilike(prescriptions.prescriptionCode, q)).limit(5),
  ]);
  return Response.json({ data: [...patientResults.map((x) => ({ ...x, type: "Patient" })), ...doctorResults.map((x) => ({ ...x, type: "Doctor" })), ...medicineResults.map((x) => ({ ...x, type: "Medicine" })), ...appointmentResults.map((x) => ({ ...x, type: "Appointment" })), ...prescriptionResults.map((x) => ({ ...x, type: "Prescription" }))] });
}
