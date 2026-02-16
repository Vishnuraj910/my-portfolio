export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  altchaPayload: string;
  locale?: string;
  browserData?: {
    userAgent?: string;
    screenResolution?: string;
    browserLanguage?: string;
    timezone?: string;
    viewport?: string;
    platform?: string;
    connectionType?: string;
  };
};

function sanitize(value: string) {
  return value.replace(/[<>]/g, "").trim();
}

export function validateContactPayload(input: unknown): { data?: ContactPayload; errors?: string[] } {
  if (!input || typeof input !== "object") return { errors: ["Invalid payload"] };

  const payload = input as Record<string, unknown>;
  const data: ContactPayload = {
    name: sanitize(String(payload.name ?? "")),
    email: sanitize(String(payload.email ?? "")).toLowerCase(),
    subject: sanitize(String(payload.subject ?? "")),
    message: sanitize(String(payload.message ?? "")),
    altchaPayload: String(payload.altchaPayload ?? ""),
    locale: sanitize(String(payload.locale ?? "en"))
  };

  const errors: string[] = [];
  if (data.name.length < 2 || data.name.length > 100) errors.push("Your name should be between 2 and 100 characters. Just enough to know who I’m talking to 😊");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("That doesn’t look like a valid email address. Mind double-checking it?");
  if (data.subject.length < 2 || data.subject.length > 140) errors.push("That subject needs 2–140 characters — concise, but not mysterious 😉");
  if (data.message.length < 5 || data.message.length > 2000) errors.push("I’ll need at least a few words (5–2000 characters). Don’t be shy!");
  if (!data.altchaPayload) errors.push("Missing captcha token");

  return errors.length ? { errors } : { data };
}
