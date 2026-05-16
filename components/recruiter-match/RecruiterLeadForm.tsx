"use client";

import { questions } from "@/content/recruiter-criteria";
import type { Answers, MatchResult } from "@/lib/match";
import { useEffect, useRef, useState } from "react";

type RecruiterLeadFormProps = {
  answers: Answers;
  result: MatchResult;
  onDone: () => void;
};

function labelFor(
  value: string | string[] | undefined,
  optionValues: { value: string; label: string }[],
) {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  const labels = values
    .map((v) => optionValues.find((o) => o.value === v)?.label)
    .filter((l): l is string => Boolean(l));
  return labels.length ? labels.join(", ") : "Not answered";
}

function buildMessage(answers: Answers, result: MatchResult, company: string, note: string) {
  const lines = questions.map((q) => `${q.prompt} ${labelFor(answers[q.id], q.options)}`);
  return [
    `Company: ${company}`,
    "",
    "Role details:",
    ...lines,
    "",
    `Match verdict: ${result.verdict} (${result.score}/100)`,
    "",
    `Recruiter note: ${note || "(none)"}`,
  ].join("\n");
}

export function RecruiterLeadForm({ answers, result, onDone }: RecruiterLeadFormProps) {
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
          message: buildMessage(answers, result, form.company, form.note),
          altchaPayload,
          locale: "en",
          browserData,
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
        <p className="success">Sent. Vishnuraj will get back to you soon.</p>
        <button type="button" className="btn" onClick={onDone}>
          Close
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
        Share this role with Vishnuraj. He&apos;ll see your answers and the match result.
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
        {status === "loading" ? "..." : "Send to Vishnuraj"}
      </button>
      {status === "error" && <p className="error">{error}</p>}
    </form>
  );
}
