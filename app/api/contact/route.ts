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
<table class="table-auto border-collapse border border-gray-300 w-full text-sm text-left text-gray-700">
  <thead class="bg-gray-100">
    <tr>
      <th class="border border-gray-300 px-4 py-2">Property</th>
      <th class="border border-gray-300 px-4 py-2">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 px-4 py-2">User Agent</td>
      <td class="border border-gray-300 px-4 py-2">${browserData.userAgent || 'N/A'}</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Screen Resolution</td>
      <td class="border border-gray-300 px-4 py-2">${browserData.screenResolution || 'N/A'}</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Browser Language</td>
      <td class="border border-gray-300 px-4 py-2">${browserData.browserLanguage || 'N/A'}</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Timezone</td>
      <td class="border border-gray-300 px-4 py-2">${browserData.timezone || 'N/A'}</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Viewport</td>
      <td class="border border-gray-300 px-4 py-2">${browserData.viewport || 'N/A'}</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Platform</td>
      <td class="border border-gray-300 px-4 py-2">${browserData.platform || 'N/A'}</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Connection Type</td>
      <td class="border border-gray-300 px-4 py-2">${browserData.connectionType || 'N/A'}</td>
    </tr>
  </tbody>
</table>
`;

    await sendViaResend({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to,
      replyTo: parsed.data.email,
      subject: `[Portfolio] ${parsed.data.subject}`,
      text: `Name: ${parsed.data.name}
Email: ${parsed.data.email}

${parsed.data.message}

${formattedBrowserData}`
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to send message right now." }, { status: 500 });
  }
}
