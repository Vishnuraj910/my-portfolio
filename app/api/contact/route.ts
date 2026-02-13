import { NextRequest, NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/contact";

type Entry = { count: number; ts: number };

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 6;
const ipMap = new Map<string, Entry>();

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token })
  });

  if (!response.ok) return false;
  const data = (await response.json()) as { success?: boolean; score?: number };
  return Boolean(data.success && (typeof data.score !== "number" || data.score >= 0.5));
}

function hitRateLimit(ip: string) {
  const now = Date.now();
  const existing = ipMap.get(ip);
  if (!existing || now - existing.ts > RATE_LIMIT_WINDOW_MS) {
    ipMap.set(ip, { count: 1, ts: now });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX) return true;
  existing.count += 1;
  return false;
}

async function sendViaResend({ to, from, replyTo, subject, text }: { to: string; from: string; replyTo: string; subject: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Missing RESEND_API_KEY");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ to, from, reply_to: replyTo, subject, text })
  });

  if (!response.ok) throw new Error("Email provider error");
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (hitRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please retry later." }, { status: 429 });
    }

    const parsed = validateContactPayload(await request.json());
    if (!parsed.data) {
      return NextResponse.json({ error: parsed.errors?.join(", ") || "Validation failed" }, { status: 400 });
    }

    // Reject placeholder tokens that indicate recaptcha failed to initialize
    if (!parsed.data.recaptchaToken || parsed.data.recaptchaToken === "missing-recaptcha") {
      return NextResponse.json({ error: "reCAPTCHA verification failed. Please enable JavaScript and try again." }, { status: 400 });
    }

    const captchaValid = await verifyRecaptcha(parsed.data.recaptchaToken);
    if (!captchaValid) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL || "vishnuraj910@gmail.com";
    await sendViaResend({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to,
      replyTo: parsed.data.email,
      subject: `[Portfolio] ${parsed.data.subject}`,
      text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to send message right now." }, { status: 500 });
  }
}
