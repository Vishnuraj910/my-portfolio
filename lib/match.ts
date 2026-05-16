import { questions, type QuestionId, type Verdict } from "@/content/recruiter-criteria";

export type { Verdict };

export type Answers = Partial<Record<QuestionId, string | string[]>>;

export type MatchResult = {
  verdict: Verdict;
  score: number;
  dealBreaker: boolean;
  strengths: string[];
  gaps: string[];
};

const VERDICT_ORDER: Verdict[] = ["nofit", "maybe", "fit"];

function verdictFromScore(score: number): Verdict {
  if (score >= 81) return "fit";
  if (score >= 61) return "maybe";
  return "nofit";
}

function capVerdict(current: Verdict, cap: Verdict): Verdict {
  return VERDICT_ORDER.indexOf(current) > VERDICT_ORDER.indexOf(cap) ? cap : current;
}

export function computeMatch(answers: Answers): MatchResult {
  let score = 0;
  let dealBreaker = false;
  let cap: Verdict | null = null;
  const strengths: string[] = [];
  const gaps: string[] = [];

  for (const question of questions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;

    if (question.multiSelect) {
      const selected = Array.isArray(answer) ? answer : [answer];
      const ratio = question.options.length ? selected.length / question.options.length : 0;
      score += Math.round(question.maxScore * ratio);
      if (ratio >= 0.5) {
        if (question.strengthLabel) strengths.push(question.strengthLabel);
      } else if (question.gapLabel) {
        gaps.push(question.gapLabel);
      }
      continue;
    }

    const value = Array.isArray(answer) ? answer[0] : answer;
    const option = question.options.find((o) => o.value === value);
    if (!option) continue;

    if (option.dealBreaker) {
      dealBreaker = true;
      if (option.gapReason) gaps.push(option.gapReason);
      continue;
    }

    score += option.score;
    if (option.capVerdict) cap = option.capVerdict;
    if (option.strengthReason) strengths.push(option.strengthReason);
    if (option.gapReason) gaps.push(option.gapReason);
  }

  let verdict: Verdict = dealBreaker ? "nofit" : verdictFromScore(score);
  if (cap && !dealBreaker) verdict = capVerdict(verdict, cap);

  return { verdict, score: Math.min(score, 100), dealBreaker, strengths, gaps };
}
