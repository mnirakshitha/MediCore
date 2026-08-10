-- MediCore presentation seed. Run after database/schema.sql or `npx drizzle-kit push`.
-- Password hashes are deliberately non-plaintext. The browser demo login is handled by the API's demo account contract.

INSERT INTO departments (code, name, description) VALUES
('CARD','Cardiology','Heart and vascular care'), ('NEUR','Neurology','Neurological medicine'),
('ORTH','Orthopedics','Musculoskeletal care'), ('PEDS','Pediatrics','Child health'),
('DERM','Dermatology','Skin health'), ('GENM','General Medicine','Primary adult care'),
('ENT','ENT','Ear, nose and throat care'), ('GYN','Gynecology','Women''s health');

INSERT INTO users (name, email, password_hash, role) VALUES
('Dr. Maya Patel','admin@medicore.com','$2b$12$demoHashOnlyNeverPlaintextCredentials000000000000000000000000000','ADMIN'),
('Dr. Amelia Roberts','doctor@medicore.com','$2b$12$demoHashOnlyNeverPlaintextCredentials000000000000000000000000000','DOCTOR'),
('Sophia Davis','reception@medicore.com','$2b$12$demoHashOnlyNeverPlaintextCredentials000000000000000000000000000','RECEPTIONIST'),
('Ethan Lee','pharmacy@medicore.com','$2b$12$demoHashOnlyNeverPlaintextCredentials000000000000000000000000000','PHARMACIST'),
('Noah Wilson','accounts@medicore.com','$2b$12$demoHashOnlyNeverPlaintextCredentials000000000000000000000000000','ACCOUNTANT'),
('Olivia Bennett','patient@medicore.com','$2b$12$demoHashOnlyNeverPlaintextCredentials000000000000000000000000000','PATIENT');

-- The application includes 20 patient profiles, 10 providers, 30 appointments, 15 medicines,
-- 15 prescriptions, and 15 invoices in src/lib/medicore-data.ts for its complete interactive demo.
