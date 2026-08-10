import {
  boolean,
  date,
  decimal,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["ADMIN", "DOCTOR", "RECEPTIONIST", "PHARMACIST", "ACCOUNTANT", "PATIENT"]);
export const status = pgEnum("record_status", ["ACTIVE", "INACTIVE"]);
export const appointmentStatus = pgEnum("appointment_status", ["SCHEDULED", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"]);
export const paymentStatus = pgEnum("payment_status", ["PAID", "PENDING", "PARTIAL", "CANCELLED"]);

const audit = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: userRole("role").notNull().default("PATIENT"),
  avatar: varchar("avatar", { length: 500 }),
  status: status("status").notNull().default("ACTIVE"),
  ...audit,
});

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 16 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  description: text("description"),
  headDoctorId: integer("head_doctor_id"),
  status: status("status").notNull().default("ACTIVE"),
  ...audit,
});

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  patientCode: varchar("patient_code", { length: 24 }).notNull().unique(),
  userId: integer("user_id").references(() => users.id),
  fullName: varchar("full_name", { length: 140 }).notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: varchar("gender", { length: 20 }).notNull(),
  bloodGroup: varchar("blood_group", { length: 8 }),
  phone: varchar("phone", { length: 32 }).notNull(),
  email: varchar("email", { length: 180 }),
  address: text("address"),
  emergencyContact: varchar("emergency_contact", { length: 140 }),
  insuranceInfo: varchar("insurance_info", { length: 200 }),
  status: status("status").notNull().default("ACTIVE"),
  ...audit,
}, (table) => [uniqueIndex("patient_email_unique").on(table.email)]);

export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  doctorCode: varchar("doctor_code", { length: 24 }).notNull().unique(),
  userId: integer("user_id").references(() => users.id),
  fullName: varchar("full_name", { length: 140 }).notNull(),
  specialization: varchar("specialization", { length: 140 }).notNull(),
  departmentId: integer("department_id").references(() => departments.id),
  qualification: varchar("qualification", { length: 180 }),
  experienceYears: integer("experience_years").notNull().default(0),
  phone: varchar("phone", { length: 32 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  consultationFee: decimal("consultation_fee", { precision: 10, scale: 2 }).notNull().default("0"),
  availability: boolean("availability").notNull().default(true),
  status: status("status").notNull().default("ACTIVE"),
  ...audit,
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  appointmentCode: varchar("appointment_code", { length: 24 }).notNull().unique(),
  patientId: integer("patient_id").notNull().references(() => patients.id),
  doctorId: integer("doctor_id").notNull().references(() => doctors.id),
  departmentId: integer("department_id").notNull().references(() => departments.id),
  appointmentAt: timestamp("appointment_at", { withTimezone: true }).notNull(),
  reason: text("reason").notNull(),
  notes: text("notes"),
  status: appointmentStatus("status").notNull().default("SCHEDULED"),
  ...audit,
});

export const medicalRecords = pgTable("medical_records", {
  id: serial("id").primaryKey(),
  recordCode: varchar("record_code", { length: 24 }).notNull().unique(),
  patientId: integer("patient_id").notNull().references(() => patients.id),
  doctorId: integer("doctor_id").notNull().references(() => doctors.id),
  visitDate: date("visit_date").notNull(),
  symptoms: text("symptoms").notNull(),
  diagnosis: text("diagnosis").notNull(),
  treatment: text("treatment"),
  notes: text("notes"),
  allergies: text("allergies"),
  bloodPressure: varchar("blood_pressure", { length: 24 }),
  temperature: varchar("temperature", { length: 12 }),
  weight: varchar("weight", { length: 16 }),
  followUpDate: date("follow_up_date"),
  status: status("status").notNull().default("ACTIVE"),
  ...audit,
});

export const medicines = pgTable("medicines", {
  id: serial("id").primaryKey(),
  medicineCode: varchar("medicine_code", { length: 24 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  manufacturer: varchar("manufacturer", { length: 120 }),
  batchNumber: varchar("batch_number", { length: 80 }).notNull(),
  expiryDate: date("expiry_date").notNull(),
  quantity: integer("quantity").notNull().default(0),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull().default("0"),
  reorderLevel: integer("reorder_level").notNull().default(10),
  status: status("status").notNull().default("ACTIVE"),
  ...audit,
});

export const prescriptions = pgTable("prescriptions", {
  id: serial("id").primaryKey(),
  prescriptionCode: varchar("prescription_code", { length: 24 }).notNull().unique(),
  patientId: integer("patient_id").notNull().references(() => patients.id),
  doctorId: integer("doctor_id").notNull().references(() => doctors.id),
  diagnosis: text("diagnosis").notNull(),
  instructions: text("instructions"),
  prescriptionDate: date("prescription_date").notNull(),
  status: status("status").notNull().default("ACTIVE"),
  ...audit,
});

export const prescriptionItems = pgTable("prescription_items", {
  id: serial("id").primaryKey(),
  prescriptionId: integer("prescription_id").notNull().references(() => prescriptions.id, { onDelete: "cascade" }),
  medicineId: integer("medicine_id").references(() => medicines.id),
  medicineName: varchar("medicine_name", { length: 160 }).notNull(),
  dosage: varchar("dosage", { length: 80 }).notNull(),
  frequency: varchar("frequency", { length: 80 }).notNull(),
  duration: varchar("duration", { length: 80 }).notNull(),
});

export const bills = pgTable("bills", {
  id: serial("id").primaryKey(),
  invoiceCode: varchar("invoice_code", { length: 24 }).notNull().unique(),
  patientId: integer("patient_id").notNull().references(() => patients.id),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  doctorFee: decimal("doctor_fee", { precision: 10, scale: 2 }).notNull().default("0"),
  medicineCharges: decimal("medicine_charges", { precision: 10, scale: 2 }).notNull().default("0"),
  labCharges: decimal("lab_charges", { precision: 10, scale: 2 }).notNull().default("0"),
  otherCharges: decimal("other_charges", { precision: 10, scale: 2 }).notNull().default("0"),
  discount: decimal("discount", { precision: 10, scale: 2 }).notNull().default("0"),
  tax: decimal("tax", { precision: 10, scale: 2 }).notNull().default("0"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: paymentStatus("payment_status").notNull().default("PENDING"),
  paymentMethod: varchar("payment_method", { length: 50 }),
  invoiceDate: date("invoice_date").notNull(),
  status: status("status").notNull().default("ACTIVE"),
  ...audit,
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  billId: integer("bill_id").notNull().references(() => bills.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
  reference: varchar("reference", { length: 100 }),
  paidAt: timestamp("paid_at", { withTimezone: true }).defaultNow().notNull(),
  ...audit,
});

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  staffCode: varchar("staff_code", { length: 24 }).notNull().unique(),
  userId: integer("user_id").references(() => users.id),
  fullName: varchar("full_name", { length: 140 }).notNull(),
  role: userRole("role").notNull(),
  departmentId: integer("department_id").references(() => departments.id),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  joiningDate: date("joining_date").notNull(),
  shift: varchar("shift", { length: 50 }),
  status: status("status").notNull().default("ACTIVE"),
  ...audit,
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: varchar("title", { length: 160 }).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 40 }).notNull().default("INFO"),
  isRead: boolean("is_read").notNull().default(false),
  metadata: jsonb("metadata"),
  ...audit,
});
