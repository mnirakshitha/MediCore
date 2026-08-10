-- MediCore Hospital Management System (PostgreSQL)
-- The executable source of truth is src/db/schema.ts (Drizzle ORM).
-- This SQL mirror supports reviewing the relational model in database tools.

CREATE TYPE user_role AS ENUM ('ADMIN','DOCTOR','RECEPTIONIST','PHARMACIST','ACCOUNTANT','PATIENT');
CREATE TYPE record_status AS ENUM ('ACTIVE','INACTIVE');
CREATE TYPE appointment_status AS ENUM ('SCHEDULED','CONFIRMED','COMPLETED','CANCELLED','NO_SHOW');
CREATE TYPE payment_status AS ENUM ('PAID','PENDING','PARTIAL','CANCELLED');

CREATE TABLE users (
  id SERIAL PRIMARY KEY, name VARCHAR(120) NOT NULL, email VARCHAR(180) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL, role user_role NOT NULL DEFAULT 'PATIENT', avatar VARCHAR(500),
  status record_status NOT NULL DEFAULT 'ACTIVE', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE departments (
  id SERIAL PRIMARY KEY, code VARCHAR(16) NOT NULL UNIQUE, name VARCHAR(120) NOT NULL,
  description TEXT, head_doctor_id INTEGER, status record_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE patients (
  id SERIAL PRIMARY KEY, patient_code VARCHAR(24) NOT NULL UNIQUE, user_id INTEGER REFERENCES users(id),
  full_name VARCHAR(140) NOT NULL, date_of_birth DATE NOT NULL, gender VARCHAR(20) NOT NULL, blood_group VARCHAR(8),
  phone VARCHAR(32) NOT NULL, email VARCHAR(180) UNIQUE, address TEXT, emergency_contact VARCHAR(140), insurance_info VARCHAR(200),
  status record_status NOT NULL DEFAULT 'ACTIVE', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE doctors (
  id SERIAL PRIMARY KEY, doctor_code VARCHAR(24) NOT NULL UNIQUE, user_id INTEGER REFERENCES users(id),
  full_name VARCHAR(140) NOT NULL, specialization VARCHAR(140) NOT NULL, department_id INTEGER REFERENCES departments(id),
  qualification VARCHAR(180), experience_years INTEGER NOT NULL DEFAULT 0, phone VARCHAR(32) NOT NULL, email VARCHAR(180) NOT NULL,
  consultation_fee NUMERIC(10,2) NOT NULL DEFAULT 0, availability BOOLEAN NOT NULL DEFAULT TRUE,
  status record_status NOT NULL DEFAULT 'ACTIVE', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE departments ADD CONSTRAINT departments_head_doctor_fk FOREIGN KEY (head_doctor_id) REFERENCES doctors(id);
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY, appointment_code VARCHAR(24) NOT NULL UNIQUE, patient_id INTEGER NOT NULL REFERENCES patients(id),
  doctor_id INTEGER NOT NULL REFERENCES doctors(id), department_id INTEGER NOT NULL REFERENCES departments(id), appointment_at TIMESTAMPTZ NOT NULL,
  reason TEXT NOT NULL, notes TEXT, status appointment_status NOT NULL DEFAULT 'SCHEDULED',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX appointments_doctor_time_idx ON appointments(doctor_id, appointment_at);
CREATE TABLE medical_records (
  id SERIAL PRIMARY KEY, record_code VARCHAR(24) NOT NULL UNIQUE, patient_id INTEGER NOT NULL REFERENCES patients(id), doctor_id INTEGER NOT NULL REFERENCES doctors(id),
  visit_date DATE NOT NULL, symptoms TEXT NOT NULL, diagnosis TEXT NOT NULL, treatment TEXT, notes TEXT, allergies TEXT,
  blood_pressure VARCHAR(24), temperature VARCHAR(12), weight VARCHAR(16), follow_up_date DATE,
  status record_status NOT NULL DEFAULT 'ACTIVE', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE medicines (
  id SERIAL PRIMARY KEY, medicine_code VARCHAR(24) NOT NULL UNIQUE, name VARCHAR(160) NOT NULL, category VARCHAR(80) NOT NULL,
  manufacturer VARCHAR(120), batch_number VARCHAR(80) NOT NULL, expiry_date DATE NOT NULL, quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  unit_price NUMERIC(10,2) NOT NULL DEFAULT 0, reorder_level INTEGER NOT NULL DEFAULT 10 CHECK (reorder_level >= 0),
  status record_status NOT NULL DEFAULT 'ACTIVE', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE prescriptions (
  id SERIAL PRIMARY KEY, prescription_code VARCHAR(24) NOT NULL UNIQUE, patient_id INTEGER NOT NULL REFERENCES patients(id), doctor_id INTEGER NOT NULL REFERENCES doctors(id),
  diagnosis TEXT NOT NULL, instructions TEXT, prescription_date DATE NOT NULL, status record_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE prescription_items (
  id SERIAL PRIMARY KEY, prescription_id INTEGER NOT NULL REFERENCES prescriptions(id) ON DELETE CASCADE, medicine_id INTEGER REFERENCES medicines(id),
  medicine_name VARCHAR(160) NOT NULL, dosage VARCHAR(80) NOT NULL, frequency VARCHAR(80) NOT NULL, duration VARCHAR(80) NOT NULL
);
CREATE TABLE bills (
  id SERIAL PRIMARY KEY, invoice_code VARCHAR(24) NOT NULL UNIQUE, patient_id INTEGER NOT NULL REFERENCES patients(id), appointment_id INTEGER REFERENCES appointments(id),
  doctor_fee NUMERIC(10,2) NOT NULL DEFAULT 0, medicine_charges NUMERIC(10,2) NOT NULL DEFAULT 0, lab_charges NUMERIC(10,2) NOT NULL DEFAULT 0,
  other_charges NUMERIC(10,2) NOT NULL DEFAULT 0, discount NUMERIC(10,2) NOT NULL DEFAULT 0, tax NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(10,2) NOT NULL, payment_status payment_status NOT NULL DEFAULT 'PENDING', payment_method VARCHAR(50), invoice_date DATE NOT NULL,
  status record_status NOT NULL DEFAULT 'ACTIVE', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE payments (
  id SERIAL PRIMARY KEY, bill_id INTEGER NOT NULL REFERENCES bills(id), amount NUMERIC(10,2) NOT NULL CHECK (amount > 0), payment_method VARCHAR(50) NOT NULL,
  reference VARCHAR(100), paid_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE staff (
  id SERIAL PRIMARY KEY, staff_code VARCHAR(24) NOT NULL UNIQUE, user_id INTEGER REFERENCES users(id), full_name VARCHAR(140) NOT NULL,
  role user_role NOT NULL, department_id INTEGER REFERENCES departments(id), email VARCHAR(180) NOT NULL, phone VARCHAR(32) NOT NULL,
  joining_date DATE NOT NULL, shift VARCHAR(50), status record_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id), title VARCHAR(160) NOT NULL, message TEXT NOT NULL,
  type VARCHAR(40) NOT NULL DEFAULT 'INFO', is_read BOOLEAN NOT NULL DEFAULT FALSE, metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
