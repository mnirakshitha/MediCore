export type Role = "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "PHARMACIST" | "ACCOUNTANT" | "PATIENT";
export type Status = "Active" | "Inactive";

export type Patient = {
  id: string;
  name: string;
  dob: string;
  age: number;
  gender: string;
  blood: string;
  phone: string;
  email: string;
  insurance: string;
  registered: string;
  status: Status;
  lastVisit: string;
};

export type Doctor = {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  department: string;
  qualification: string;
  experience: string;
  phone: string;
  email: string;
  fee: number;
  available: boolean;
  status: Status;
  color: string;
};

export type Appointment = {
  id: string;
  patient: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  reason: string;
  status: "Scheduled" | "Confirmed" | "Completed" | "Cancelled" | "No Show";
};

export const demoAccounts: { role: Role; name: string; email: string; password: string }[] = [
  { role: "ADMIN", name: "Dr. Maya Patel", email: "admin@medicore.com", password: "Demo@123" },
  { role: "DOCTOR", name: "Dr. Amelia Roberts", email: "doctor@medicore.com", password: "Demo@123" },
  { role: "RECEPTIONIST", name: "Sophia Davis", email: "reception@medicore.com", password: "Demo@123" },
  { role: "PHARMACIST", name: "Ethan Lee", email: "pharmacy@medicore.com", password: "Demo@123" },
  { role: "ACCOUNTANT", name: "Noah Wilson", email: "accounts@medicore.com", password: "Demo@123" },
  { role: "PATIENT", name: "Olivia Bennett", email: "patient@medicore.com", password: "Demo@123" },
];

export const departments = [
  { id: "DPT-01", name: "Cardiology", lead: "Dr. James Wilson", doctors: 14, patients: 1840, accent: "#0f766e" },
  { id: "DPT-02", name: "Neurology", lead: "Dr. Priya Nair", doctors: 9, patients: 920, accent: "#2563eb" },
  { id: "DPT-03", name: "Orthopedics", lead: "Dr. Marcus Chen", doctors: 12, patients: 1550, accent: "#ea580c" },
  { id: "DPT-04", name: "Pediatrics", lead: "Dr. Elena Rossi", doctors: 11, patients: 2100, accent: "#7c3aed" },
  { id: "DPT-05", name: "Dermatology", lead: "Dr. Ava Mitchell", doctors: 7, patients: 760, accent: "#db2777" },
  { id: "DPT-06", name: "General Medicine", lead: "Dr. Daniel Brooks", doctors: 18, patients: 2860, accent: "#059669" },
  { id: "DPT-07", name: "ENT", lead: "Dr. Nikhil Shah", doctors: 6, patients: 680, accent: "#0284c7" },
  { id: "DPT-08", name: "Gynecology", lead: "Dr. Sarah Kim", doctors: 10, patients: 1260, accent: "#be123c" },
];

export const doctors: Doctor[] = [
  { id: "DOC-2041", name: "Dr. Amelia Roberts", initials: "AR", specialty: "Interventional Cardiology", department: "Cardiology", qualification: "MD, FACC", experience: "14 years", phone: "+1 202 555 0142", email: "amelia.roberts@medicore.com", fee: 220, available: true, status: "Active", color: "bg-teal-100 text-teal-700" },
  { id: "DOC-2042", name: "Dr. Marcus Chen", initials: "MC", specialty: "Sports Orthopedics", department: "Orthopedics", qualification: "MS Ortho", experience: "12 years", phone: "+1 202 555 0191", email: "marcus.chen@medicore.com", fee: 180, available: true, status: "Active", color: "bg-orange-100 text-orange-700" },
  { id: "DOC-2043", name: "Dr. Elena Rossi", initials: "ER", specialty: "Pediatric Medicine", department: "Pediatrics", qualification: "MD, FAAP", experience: "10 years", phone: "+1 202 555 0127", email: "elena.rossi@medicore.com", fee: 160, available: false, status: "Active", color: "bg-violet-100 text-violet-700" },
  { id: "DOC-2044", name: "Dr. James Wilson", initials: "JW", specialty: "Cardiac Surgery", department: "Cardiology", qualification: "MBBS, MS, MCh", experience: "19 years", phone: "+1 202 555 0168", email: "james.wilson@medicore.com", fee: 280, available: true, status: "Active", color: "bg-blue-100 text-blue-700" },
  { id: "DOC-2045", name: "Dr. Priya Nair", initials: "PN", specialty: "Clinical Neurology", department: "Neurology", qualification: "DM Neurology", experience: "13 years", phone: "+1 202 555 0172", email: "priya.nair@medicore.com", fee: 210, available: true, status: "Active", color: "bg-indigo-100 text-indigo-700" },
  { id: "DOC-2046", name: "Dr. Ava Mitchell", initials: "AM", specialty: "Clinical Dermatology", department: "Dermatology", qualification: "MD Dermatology", experience: "8 years", phone: "+1 202 555 0151", email: "ava.mitchell@medicore.com", fee: 145, available: true, status: "Active", color: "bg-pink-100 text-pink-700" },
  { id: "DOC-2047", name: "Dr. Daniel Brooks", initials: "DB", specialty: "Internal Medicine", department: "General Medicine", qualification: "MD Internal Medicine", experience: "16 years", phone: "+1 202 555 0112", email: "daniel.brooks@medicore.com", fee: 150, available: true, status: "Active", color: "bg-emerald-100 text-emerald-700" },
  { id: "DOC-2048", name: "Dr. Nikhil Shah", initials: "NS", specialty: "Otolaryngology", department: "ENT", qualification: "MS ENT", experience: "11 years", phone: "+1 202 555 0184", email: "nikhil.shah@medicore.com", fee: 175, available: false, status: "Active", color: "bg-sky-100 text-sky-700" },
  { id: "DOC-2049", name: "Dr. Sarah Kim", initials: "SK", specialty: "Obstetrics & Gynecology", department: "Gynecology", qualification: "MD, FACOG", experience: "15 years", phone: "+1 202 555 0176", email: "sarah.kim@medicore.com", fee: 190, available: true, status: "Active", color: "bg-rose-100 text-rose-700" },
  { id: "DOC-2050", name: "Dr. Lucas Martin", initials: "LM", specialty: "Family Medicine", department: "General Medicine", qualification: "DO", experience: "7 years", phone: "+1 202 555 0139", email: "lucas.martin@medicore.com", fee: 130, available: true, status: "Active", color: "bg-cyan-100 text-cyan-700" },
];

const patientNames = [
  ["PAT-1001", "Olivia Bennett", 34, "Female", "O+"], ["PAT-1002", "Henry Cooper", 58, "Male", "A+"], ["PAT-1003", "Aisha Rahman", 29, "Female", "B+"], ["PAT-1004", "Ethan Parker", 42, "Male", "O-"], ["PAT-1005", "Mia Thompson", 8, "Female", "A-"], ["PAT-1006", "Benjamin Lewis", 65, "Male", "AB+"], ["PAT-1007", "Isabella Morgan", 37, "Female", "B-"], ["PAT-1008", "Noah Garcia", 51, "Male", "O+"], ["PAT-1009", "Charlotte Nguyen", 46, "Female", "A+"], ["PAT-1010", "William Scott", 71, "Male", "O+"], ["PAT-1011", "Zara Ahmed", 23, "Female", "AB-"], ["PAT-1012", "Leo Martinez", 16, "Male", "B+"], ["PAT-1013", "Grace Walker", 49, "Female", "A+"], ["PAT-1014", "Owen Clark", 55, "Male", "O-"], ["PAT-1015", "Hannah Moore", 31, "Female", "B+"], ["PAT-1016", "Samuel Price", 62, "Male", "A-"], ["PAT-1017", "Ella Johnson", 27, "Female", "O+"], ["PAT-1018", "Jack Turner", 39, "Male", "AB+"], ["PAT-1019", "Lily Evans", 44, "Female", "A+"], ["PAT-1020", "Theo Baker", 52, "Male", "B-"],
] as const;

export const patients: Patient[] = patientNames.map(([id, name, age, gender, blood], index) => ({
  id, name, age, gender, blood, dob: `${2026 - age}-0${(index % 8) + 1}-${String((index % 24) + 1).padStart(2, "0")}`,
  phone: `+1 202 555 ${String(2101 + index).padStart(4, "0")}`,
  email: `${name.toLowerCase().replace(/ /g, ".")}@mail.com`,
  insurance: index % 3 === 0 ? "BlueCross Premium" : index % 3 === 1 ? "MedSure Gold" : "Self-pay",
  registered: `Mar ${String((index % 18) + 1).padStart(2, "0")}, 2026`,
  status: index === 17 ? "Inactive" : "Active",
  lastVisit: index % 4 === 0 ? "Today" : `Mar ${String(22 - (index % 12)).padStart(2, "0")}, 2026`,
}));

const appointmentEntries = [
  ["APT-3491", "Olivia Bennett", "Dr. Amelia Roberts", "Cardiology", "Mar 25, 2026", "09:00 AM", "Post-procedure review", "Confirmed"],
  ["APT-3492", "Henry Cooper", "Dr. Marcus Chen", "Orthopedics", "Mar 25, 2026", "09:30 AM", "Knee pain consultation", "Scheduled"],
  ["APT-3493", "Mia Thompson", "Dr. Elena Rossi", "Pediatrics", "Mar 25, 2026", "10:00 AM", "Seasonal fever", "Confirmed"],
  ["APT-3494", "Aisha Rahman", "Dr. Priya Nair", "Neurology", "Mar 25, 2026", "10:30 AM", "Migraine follow-up", "Completed"],
  ["APT-3495", "Benjamin Lewis", "Dr. James Wilson", "Cardiology", "Mar 25, 2026", "11:15 AM", "Cardiac assessment", "Scheduled"],
  ["APT-3496", "Isabella Morgan", "Dr. Ava Mitchell", "Dermatology", "Mar 25, 2026", "12:00 PM", "Skin allergy", "Cancelled"],
  ["APT-3497", "Noah Garcia", "Dr. Daniel Brooks", "General Medicine", "Mar 25, 2026", "01:00 PM", "Annual wellness check", "Confirmed"],
  ["APT-3498", "Charlotte Nguyen", "Dr. Sarah Kim", "Gynecology", "Mar 25, 2026", "02:15 PM", "Routine consultation", "Scheduled"],
  ["APT-3499", "William Scott", "Dr. Nikhil Shah", "ENT", "Mar 25, 2026", "03:00 PM", "Hearing review", "No Show"],
  ["APT-3500", "Zara Ahmed", "Dr. Lucas Martin", "General Medicine", "Mar 25, 2026", "03:30 PM", "General consultation", "Scheduled"],
] as const;
export const appointments: Appointment[] = Array.from({ length: 30 }, (_, index) => {
  const item = appointmentEntries[index % appointmentEntries.length];
  const day = 25 + Math.floor(index / 10);
  return { id: item[0].replace(/\d+$/, String(3491 + index)), patient: item[1], doctor: item[2], department: item[3], date: `Mar ${day}, 2026`, time: item[5], reason: item[6], status: item[7] } as Appointment;
});

export type Medicine = { id: string; name: string; category: string; manufacturer: string; batch: string; expiry: string; quantity: number; price: number; reorder: number };
export const medicines: Medicine[] = ([
  ["MED-501", "Amoxicillin 500mg", "Antibiotic", "GSK Healthcare", "AMX-84921", "Dec 08, 2027", 340, 0.68, 80],
  ["MED-502", "Metformin 500mg", "Diabetes care", "Merck", "MET-12044", "Sep 15, 2027", 61, 0.42, 100],
  ["MED-503", "Atorvastatin 20mg", "Cardiovascular", "Pfizer", "ATO-55091", "Apr 06, 2026", 22, 0.95, 50],
  ["MED-504", "Paracetamol 650mg", "Analgesic", "Cipla", "PAR-77289", "Nov 21, 2027", 680, 0.16, 150],
  ["MED-505", "Losartan 50mg", "Cardiovascular", "Novartis", "LOS-89120", "May 30, 2026", 47, 0.72, 75],
  ["MED-506", "Cetirizine 10mg", "Antihistamine", "Sanofi", "CET-90844", "Oct 12, 2027", 240, 0.31, 60],
  ["MED-507", "Omeprazole 20mg", "Gastrointestinal", "AstraZeneca", "OME-44218", "Jan 17, 2027", 31, 0.55, 60],
  ["MED-508", "Azithromycin 250mg", "Antibiotic", "Pfizer", "AZI-14591", "May 02, 2026", 18, 1.1, 45],
  ["MED-509", "Insulin Glargine", "Diabetes care", "Sanofi", "INS-11209", "Aug 24, 2026", 87, 18.5, 25],
  ["MED-510", "Amlodipine 5mg", "Cardiovascular", "Lupin", "AML-73340", "Feb 10, 2027", 128, 0.38, 60],
  ["MED-511", "Fluconazole 150mg", "Antifungal", "Pfizer", "FLU-84420", "Apr 17, 2026", 19, 1.25, 35],
  ["MED-512", "Levothyroxine 50mcg", "Endocrine", "Abbott", "LEV-55480", "Nov 18, 2027", 152, 0.29, 60],
  ["MED-513", "Salbutamol Inhaler", "Respiratory", "GSK Healthcare", "SAL-90711", "Jun 30, 2026", 42, 9.8, 45],
  ["MED-514", "Diclofenac Gel", "Analgesic", "Novartis", "DIC-22187", "Oct 04, 2027", 90, 3.2, 30],
  ["MED-515", "Vitamin D3 60K", "Supplement", "Sun Pharma", "VIT-66003", "Jul 16, 2027", 170, 0.45, 50],
] as [string, string, string, string, string, string, number, number, number][]).map(([id, name, category, manufacturer, batch, expiry, quantity, price, reorder]) => ({ id, name, category, manufacturer, batch, expiry, quantity, price, reorder }));

export const prescriptions = [
  ["RX-7801", "Olivia Bennett", "Dr. Amelia Roberts", "Hypertension management", "Mar 24, 2026", "Losartan 50mg · 1 tablet · Once daily"],
  ["RX-7802", "Henry Cooper", "Dr. Marcus Chen", "Knee osteoarthritis", "Mar 24, 2026", "Diclofenac Gel · Apply · Twice daily"],
  ["RX-7803", "Aisha Rahman", "Dr. Priya Nair", "Chronic migraine", "Mar 23, 2026", "Sumatriptan 50mg · 1 tablet · As needed"],
  ["RX-7804", "Mia Thompson", "Dr. Elena Rossi", "Upper respiratory infection", "Mar 23, 2026", "Amoxicillin 500mg · 1 capsule · Three times daily"],
  ["RX-7805", "Benjamin Lewis", "Dr. James Wilson", "Post-operative care", "Mar 22, 2026", "Atorvastatin 20mg · 1 tablet · Once daily"],
  ["RX-7806", "Noah Garcia", "Dr. Daniel Brooks", "Type 2 diabetes", "Mar 22, 2026", "Metformin 500mg · 1 tablet · Twice daily"],
  ["RX-7807", "Charlotte Nguyen", "Dr. Sarah Kim", "Routine consultation", "Mar 21, 2026", "Vitamin D3 60K · 1 capsule · Weekly"],
  ["RX-7808", "William Scott", "Dr. Nikhil Shah", "Seasonal allergy", "Mar 21, 2026", "Cetirizine 10mg · 1 tablet · At night"],
  ["RX-7809", "Zara Ahmed", "Dr. Lucas Martin", "Acid reflux", "Mar 20, 2026", "Omeprazole 20mg · 1 capsule · Before breakfast"],
  ["RX-7810", "Grace Walker", "Dr. Ava Mitchell", "Fungal dermatitis", "Mar 20, 2026", "Fluconazole 150mg · 1 tablet · Weekly"],
  ["RX-7811", "Owen Clark", "Dr. Amelia Roberts", "Hyperlipidemia", "Mar 19, 2026", "Atorvastatin 20mg · 1 tablet · Once daily"],
  ["RX-7812", "Hannah Moore", "Dr. Sarah Kim", "Iron deficiency", "Mar 19, 2026", "Vitamin D3 60K · 1 capsule · Weekly"],
  ["RX-7813", "Samuel Price", "Dr. Daniel Brooks", "Thyroid follow-up", "Mar 18, 2026", "Levothyroxine 50mcg · 1 tablet · Before breakfast"],
  ["RX-7814", "Ella Johnson", "Dr. Ava Mitchell", "Atopic dermatitis", "Mar 18, 2026", "Cetirizine 10mg · 1 tablet · At night"],
  ["RX-7815", "Theo Baker", "Dr. Marcus Chen", "Muscular pain", "Mar 17, 2026", "Diclofenac Gel · Apply · Twice daily"],
].map(([id, patient, doctor, diagnosis, date, medicine]) => ({ id, patient, doctor, diagnosis, date, medicine }));

const billRows: [string, string, string, string, number, string][] = [
  ["INV-26091", "Olivia Bennett", "Cardiology", "Mar 24, 2026", 620, "Paid"],
  ["INV-26092", "Henry Cooper", "Orthopedics", "Mar 24, 2026", 380, "Pending"],
  ["INV-26093", "Aisha Rahman", "Neurology", "Mar 23, 2026", 510, "Paid"],
  ["INV-26094", "Mia Thompson", "Pediatrics", "Mar 23, 2026", 245, "Paid"],
  ["INV-26095", "Benjamin Lewis", "Cardiology", "Mar 22, 2026", 940, "Partial"],
  ["INV-26096", "Noah Garcia", "General Medicine", "Mar 22, 2026", 190, "Paid"],
  ["INV-26097", "Charlotte Nguyen", "Gynecology", "Mar 21, 2026", 360, "Pending"],
  ["INV-26098", "William Scott", "ENT", "Mar 21, 2026", 275, "Cancelled"],
  ["INV-26099", "Zara Ahmed", "General Medicine", "Mar 20, 2026", 175, "Paid"],
  ["INV-26100", "Grace Walker", "Dermatology", "Mar 20, 2026", 210, "Paid"],
  ["INV-26101", "Owen Clark", "Cardiology", "Mar 19, 2026", 720, "Partial"],
  ["INV-26102", "Hannah Moore", "Gynecology", "Mar 19, 2026", 410, "Paid"],
  ["INV-26103", "Samuel Price", "General Medicine", "Mar 18, 2026", 285, "Paid"],
  ["INV-26104", "Ella Johnson", "Dermatology", "Mar 18, 2026", 155, "Pending"],
  ["INV-26105", "Theo Baker", "Orthopedics", "Mar 17, 2026", 340, "Paid"],
];
export type Bill = { id: string; patient: string; department: string; date: string; total: number; paymentStatus: string };
export const bills: Bill[] = billRows.map(([id, patient, department, date, total, paymentStatus]) => ({ id, patient, department, date, total, paymentStatus }));

export const monthlyTrend = [
  { month: "Oct", patients: 122, appointments: 682, revenue: 45200 },
  { month: "Nov", patients: 146, appointments: 745, revenue: 48900 },
  { month: "Dec", patients: 135, appointments: 702, revenue: 47100 },
  { month: "Jan", patients: 168, appointments: 811, revenue: 53600 },
  { month: "Feb", patients: 181, appointments: 846, revenue: 58200 },
  { month: "Mar", patients: 204, appointments: 932, revenue: 64820 },
];

export const activities = [
  { icon: "patient", title: "New patient registered", detail: "Olivia Bennett was added by Sophia Davis", time: "12 min ago" },
  { icon: "calendar", title: "Appointment confirmed", detail: "Dr. Amelia Roberts · 09:00 AM today", time: "28 min ago" },
  { icon: "prescription", title: "Prescription issued", detail: "RX-7801 created for Olivia Bennett", time: "1 hr ago" },
  { icon: "payment", title: "Payment received", detail: "INV-26091 settled by card · $620.00", time: "2 hrs ago" },
  { icon: "medicine", title: "Low stock alert", detail: "Azithromycin 250mg has 18 units remaining", time: "3 hrs ago" },
];
