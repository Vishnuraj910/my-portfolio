"use client";

import type { Answers } from "@/lib/match";
import { useEffect, useRef, useState } from "react";

type RecruiterLeadFormProps = {
  answers: Answers;
  otherIndustry: string;
  otherTechStack: string;
  onDone: () => void;
};

export function RecruiterLeadForm({
  answers,
  otherIndustry,
  otherTechStack,
  onDone,
}: RecruiterLeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [captchaReady, setCaptchaReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", note: "" });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    const check = () => {
      if (customElements.get("altcha-widget") !== undefined) {
        setCaptchaReady(true);
        if (timer) clearInterval(timer);
      }
    };
    check();
    timer = setInterval(check, 250);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setError("");
    try {
      const altchaPayload = String(formData.get("altcha") || "");
      if (!captchaReady || !altchaPayload) {
        throw new Error("Bot protection failed. Please refresh and retry.");
      }
      const browserData = {
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}×${screen.height}`,
        browserLanguage: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        viewport: `${window.innerWidth}×${window.innerHeight}`,
        platform: navigator.platform,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `Role Fit Check — ${form.company || "Recruiter enquiry"}`,
          message: `Role fit check submission from ${form.company || "a recruiter"}.`,
          altchaPayload,
          locale: "en",
          browserData,
          recruiterMatch: {
            answers,
            company: form.company,
            note: form.note,
            otherIndustry,
            otherTechStack,
          },
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to send right now.");
      setStatus("success");
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Unable to send right now.");
    }
  }

  if (status === "success") {
    return (
      <div className="rm-lead-success">
        <p className="success">Got it — thanks! I&apos;ll get back to you soon.</p>
        <button type="button" className="btn" onClick={onDone}>
          Check another role
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="rm-lead form-grid"
      action={(formData) => {
        void onSubmit(formData);
      }}
    >
      <p className="rm-helper">
        Send this role my way — I&apos;ll see your answers and the match result, and get back to
        you so we can take it from there.
      </p>
      <input
        required
        name="name"
        placeholder="Your name"
        className="input"
        maxLength={100}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Your email"
        className="input"
        maxLength={120}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        required
        name="company"
        placeholder="Company"
        className="input"
        maxLength={120}
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <textarea
        name="note"
        placeholder="Anything else about the role? (optional)"
        className="input min-h-32"
        maxLength={1000}
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />
      {/* @ts-expect-error Custom element provided by ALTCHA script */}
      {isClient && <altcha-widget challengeurl="/api/altcha/challenge" hidelogo hidefooter />}
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "..." : "Send it over"}
      </button>
      {status === "error" && <p className="error">{error}</p>}
    </form>
  );
}
