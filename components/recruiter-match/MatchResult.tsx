"use client";

import type { MatchResult as MatchResultData } from "@/lib/match";

const VERDICT_ICON: Record<MatchResultData["verdict"], string> = {
  fit: "✓",
  maybe: "?",
  nofit: "✕",
};

const VERDICT_COPY: Record<MatchResultData["verdict"], { title: string; blurb: string }> = {
  fit: {
    title: "Fit",
    blurb: "This role lines up well with Vishnuraj's preferences. Worth a conversation.",
  },
  maybe: {
    title: "Maybe",
    blurb: "Some alignment, with several points worth discussing. Reach out to explore.",
  },
  nofit: {
    title: "Not a fit",
    blurb: "This role does not meet enough of Vishnuraj's preferences or conflicts with a non-negotiable.",
  },
};

type MatchResultProps = {
  result: MatchResultData;
  onSendLead: () => void;
  onClose: () => void;
};

export function MatchResult({ result, onSendLead, onClose }: MatchResultProps) {
  const copy = VERDICT_COPY[result.verdict];

  return (
    <div className="rm-result">
      <div className={`rm-verdict rm-verdict-${result.verdict}`}>
        <span className="rm-verdict-icon" aria-hidden="true">
          {VERDICT_ICON[result.verdict]}
        </span>
        <span className="rm-verdict-score">{result.score}</span>
        <span className="rm-verdict-title">{copy.title}</span>
      </div>
      <p className="rm-result-blurb">{copy.blurb}</p>

      {result.strengths.length > 0 && (
        <div className="rm-result-list">
          <h5 className="rm-result-list-title">What lines up</h5>
          <ul>
            {result.strengths.map((item, i) => (
              <li key={`s-${i}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {result.gaps.length > 0 && (
        <div className="rm-result-list">
          <h5 className="rm-result-list-title">Worth discussing</h5>
          <ul>
            {result.gaps.map((item, i) => (
              <li key={`g-${i}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="rm-result-actions">
        <button type="button" className="btn btn-primary" onClick={onSendLead}>
          Send this role to Vishnuraj
        </button>
        <button type="button" className="btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
