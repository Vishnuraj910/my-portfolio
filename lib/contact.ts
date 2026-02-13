export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  altchaPayload: string;
  locale?: string;
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
  if (data.name.length < 2 || data.name.length > 100) errors.push("Invalid name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Invalid email");
  if (data.subject.length < 3 || data.subject.length > 140) errors.push("Invalid subject");
  if (data.message.length < 10 || data.message.length > 2000) errors.push("Invalid message");
  if (!data.altchaPayload) errors.push("Missing captcha token");

  return errors.length ? { errors } : { data };
}
