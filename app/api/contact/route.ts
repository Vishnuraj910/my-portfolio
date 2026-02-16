import { verifyAltchaPayload } from "@/lib/altcha";
import { validateContactPayload } from "@/lib/contact";
import { NextRequest, NextResponse } from "next/server";

type Entry = { count: number; ts: number };

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 6;
const ipMap = new Map<string, Entry>();

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
    body: JSON.stringify({ to, from, reply_to: replyTo, subject, html: text })
  });

  if (!response.ok) throw new Error("Email provider error");
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (hitRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please retry later." }, { status: 429 });
    }

    const rawBody = await request.json();
    console.log("[DEBUG] Raw request body:", rawBody);
    const parsed = validateContactPayload(rawBody);
    if (!parsed.data) {
      return NextResponse.json({ error: parsed.errors?.join(", ") || "Validation failed" }, { status: 400 });
    }

    if (!parsed.data.altchaPayload) {
      return NextResponse.json({ error: "Captcha verification failed. Please try again." }, { status: 400 });
    }

    console.log("[DEBUG] Received altchaPayload:", parsed.data.altchaPayload);
    const captchaValid = verifyAltchaPayload(parsed.data.altchaPayload);
    if (!captchaValid) {
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL || "vishnuraj910@gmail.com";
    const browserData = parsed.data.browserData || {};

    // Format browser data in a human-readable way
    const formattedBrowserData = `
<table style="border-collapse: collapse; border: 1px solid #d1d5db; width: 100%; font-size: 0.875rem; text-align: left; color: #374151;">
  <thead style="background-color: #f3f4f6;">
    <tr>
      <th style="border: 1px solid #d1d5db; padding: 0.5rem;">Property</th>
      <th style="border: 1px solid #d1d5db; padding: 0.5rem;">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">User Agent</td>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">${browserData.userAgent || "N/A"}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">Screen Resolution</td>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">${browserData.screenResolution || "N/A"}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">Browser Language</td>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">${browserData.browserLanguage || "N/A"}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">Timezone</td>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">${browserData.timezone || "N/A"}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">Viewport</td>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">${browserData.viewport || "N/A"}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">Platform</td>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">${browserData.platform || "N/A"}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">Connection Type</td>
      <td style="border: 1px solid #d1d5db; padding: 0.5rem;">${browserData.connectionType || "N/A"}</td>
    </tr>
  </tbody>
</table>
`;

    await sendViaResend({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to,
      replyTo: parsed.data.email,
      subject: `[Portfolio] ${parsed.data.subject}`,
      text: `Name: <h2>${parsed.data.name}</h2>
Email: <h2>${parsed.data.email}</h2>

Message: <h3>${parsed.data.message}</h3>

${formattedBrowserData}`
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to send message right now." }, { status: 500 });
  }
}
