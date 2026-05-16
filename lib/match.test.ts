import { describe, expect, it } from "vitest";
import { computeMatch, type Answers } from "@/lib/match";

const best: Answers = {
  roleLevel: "either",
  domain: "fintech",
  location: "dubai",
  workMode: "remote",
  salary: "above60",
  employment: "permanent",
  visa: "family",
  insurance: "premium",
  orgType: "enterprise-ai",
  techStack: ["ai", "tsnode", "react", "python", "orm", "cloud"],
};

describe("computeMatch", () => {
  it("returns a strong verdict for an ideal role", () => {
    const result = computeMatch(best);
    expect(result.verdict).toBe("strong");
    expect(result.score).toBe(100);
    expect(result.dealBreaker).toBe(false);
  });

  it("flags outside-UAE location as a deal-breaker", () => {
    const result = computeMatch({ ...best, location: "outside" });
    expect(result.dealBreaker).toBe(true);
    expect(result.verdict).toBe("nofit");
  });

  it("flags contract employment as a deal-breaker", () => {
    const result = computeMatch({ ...best, employment: "contract" });
    expect(result.dealBreaker).toBe(true);
    expect(result.verdict).toBe("nofit");
  });

  it("flags below-35k salary as a deal-breaker", () => {
    const result = computeMatch({ ...best, salary: "below35" });
    expect(result.dealBreaker).toBe(true);
    expect(result.verdict).toBe("nofit");
  });

  it("accepts a 35-40k salary without a deal-breaker", () => {
    const result = computeMatch({ ...best, salary: "35to40" });
    expect(result.dealBreaker).toBe(false);
  });

  it("caps an otherwise-strong Abu Dhabi role at good", () => {
    const result = computeMatch({ ...best, location: "abudhabi" });
    expect(result.verdict).toBe("good");
    expect(result.dealBreaker).toBe(false);
  });

  it("scales tech-stack score with overlap", () => {
    const full = computeMatch(best).score;
    const half = computeMatch({ ...best, techStack: ["ai", "tsnode", "react"] }).score;
    expect(half).toBeLessThan(full);
  });

  it("produces a partial verdict for a mediocre role", () => {
    const result = computeMatch({
      roleLevel: "ic",
      domain: "other",
      location: "otheruae",
      workMode: "onsite",
      salary: "40to50",
      employment: "permanent",
      visa: "self",
      insurance: "basic",
      orgType: "enterprise-trad",
      techStack: ["ai"],
    });
    expect(result.verdict).toBe("partial");
  });

  it("collects strengths and gaps", () => {
    const result = computeMatch(best);
    expect(result.strengths.length).toBeGreaterThan(0);
    const gaps = computeMatch({ ...best, workMode: "onsite" }).gaps;
    expect(gaps.some((g) => g.includes("on-site"))).toBe(true);
  });
});
