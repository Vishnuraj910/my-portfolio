import { questions, type Question } from "@/content/recruiter-criteria";
import { computeMatch, type Answers, type Verdict } from "@/lib/match";

export type RecruiterMatchSubmission = {
  answers: Answers;
  company: string;
  note: string;
  otherIndustry: string;
  otherTechStack: string;
};

const VERDICT_META: Record<
  Verdict,
  { title: string; blurb: string; band: string; soft: string; icon: string }
> = {
  fit: {
    title: "Fit",
    blurb: "This role lines up well with Vishnuraj's preferences. Worth a conversation.",
    band: "#22c55e",
    soft: "#e8f7ee",
    icon: "&#10003;",
  },
  maybe: {
    title: "Maybe",
    blurb: "Some alignment, with several points worth discussing.",
    band: "#ca9a06",
    soft: "#fbf3da",
    icon: "?",
  },
  nofit: {
    title: "Not a fit",
    blurb:
      "This role does not meet enough of Vishnuraj's preferences or conflicts with a non-negotiable.",
    band: "#ef4444",
    soft: "#fbe9e9",
    icon: "&#10007;",
  },
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function answerLabel(question: Question, answers: Answers): string {
  const raw = answers[question.id];
  const values = Array.isArray(raw) ? raw : raw !== undefined ? [raw] : [];
  const labels = values
    .map((v) => question.options.find((o) => o.value === v)?.label)
    .filter((l): l is string => Boolean(l))
    .map(esc);
  return labels.length ? labels.join(", ") : "Not answered";
}

function listSection(title: string, items: string[], color: string): string {
  if (items.length === 0) return "";
  const lis = items
    .map(
      (item) =>
        `<li style="margin-bottom:4px;color:#374151;font-size:13px;">${esc(item)}</li>`,
    )
    .join("");
  return `
    <p style="margin:18px 0 6px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${color};">${esc(title)}</p>
    <ul style="margin:0;padding-left:18px;">${lis}</ul>`;
}

export function buildRecruiterEmailHtml(
  recruiterName: string,
  recruiterEmail: string,
  sub: RecruiterMatchSubmission,
): string {
  const result = computeMatch(sub.answers);
  const meta = VERDICT_META[result.verdict];

  const rows = questions
    .map((question) => {
      let answer = answerLabel(question, sub.answers);
      if (
        question.id === "domain" &&
        sub.answers.domain === "other" &&
        sub.otherIndustry.trim()
      ) {
        answer += ` &mdash; ${esc(sub.otherIndustry.trim())}`;
      }
      if (question.id === "techStack" && sub.otherTechStack.trim()) {
        answer += ` &mdash; also: ${esc(sub.otherTechStack.trim())}`;
      }
      return `<tr>
        <td style="padding:8px 10px;border:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:52%;">${esc(question.prompt)}</td>
        <td style="padding:8px 10px;border:1px solid #e5e7eb;color:#111827;font-size:13px;font-weight:600;">${answer}</td>
      </tr>`;
    })
    .join("");

  return `
<div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#111827;">
  <p style="font-size:13px;color:#6b7280;margin:0 0 4px;">Recruiter</p>
  <p style="font-size:16px;font-weight:700;margin:0 0 2px;">${esc(recruiterName)}</p>
  <p style="font-size:13px;margin:0 0 4px;"><a href="mailto:${esc(recruiterEmail)}" style="color:#2563eb;">${esc(recruiterEmail)}</a></p>
  <p style="font-size:13px;margin:0 0 18px;color:#374151;"><strong>Company:</strong> ${esc(sub.company) || "Not provided"}</p>

  <div style="background:${meta.soft};border:1px solid ${meta.band};border-radius:14px;padding:22px;text-align:center;">
    <div style="width:46px;height:46px;line-height:46px;border-radius:50%;background:${meta.band};color:#ffffff;font-size:22px;font-weight:bold;margin:0 auto 8px;">${meta.icon}</div>
    <div style="font-size:36px;font-weight:800;color:#111827;line-height:1;">${result.score}</div>
    <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${meta.band};margin-top:6px;">${esc(meta.title)}</div>
  </div>

  <p style="font-size:14px;color:#374151;border-left:3px solid ${meta.band};padding-left:10px;margin:16px 0;">${esc(meta.blurb)}</p>

  ${listSection("What lines up", result.strengths, meta.band)}
  ${listSection("Worth discussing", result.gaps, meta.band)}

  <p style="margin:20px 0 6px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;">Role details</p>
  <table style="width:100%;border-collapse:collapse;">
    <tbody>${rows}</tbody>
  </table>

  <p style="margin:18px 0 6px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;">Recruiter note</p>
  <p style="font-size:13px;color:#374151;margin:0 0 8px;">${esc(sub.note.trim()) || "(none)"}</p>
</div>`;
}
