import { createHmac, timingSafeEqual } from "crypto";
import type { Role } from "@/lib/medicore-data";

const secret = process.env.AUTH_SECRET || "development-only-medicore-secret-change-me";
export type SessionPayload = { sub: string; email: string; role: Role; name: string; exp: number };

function encode(value: object) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

export function createToken(payload: Omit<SessionPayload, "exp">) {
  const body: SessionPayload = { ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8 };
  const encoded = encode(body);
  const signature = createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifyToken(token?: string): SessionPayload | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = createHmac("sha256", secret).update(encoded).digest("base64url");
  const sameLength = signature.length === expected.length;
  if (!sameLength || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
    return payload.exp > Math.floor(Date.now() / 1000) ? payload : null;
  } catch {
    return null;
  }
}

export function currentSession(request: Request) {
  return verifyToken(request.headers.get("authorization")?.replace(/^Bearer\s+/i, ""));
}
