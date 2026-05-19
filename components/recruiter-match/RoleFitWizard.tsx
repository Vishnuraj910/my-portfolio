"use client";

import { ESTIMATED_MINUTES, questions } from "@/content/recruiter-criteria";
import { computeMatch, type Answers } from "@/lib/match";
import { useEffect, useMemo, useRef, useState } from "react";
import { MatchResult } from "./MatchResult";
import { RecruiterLeadForm } from "./RecruiterLeadForm";
import { WizardStep } from "./WizardStep";

type Phase = "welcome" | "wizard" | "result" | "lead";

const AUTO_ADVANCE_MS = 3000;

// A remote role makes the work-arrangement question redundant, so skip it.
function isStepSkipped(index: number, answers: Answers): boolean {
  return questions[index]?.id === "workMode" && answers.location === "remote";
}

export function RoleFitWizard() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [otherIndustry, setOtherIndustry] = useState("");
  const [otherTechStack, setOtherTechStack] = useState("");
  const [advancing, setAdvancing] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answersRef = useRef(answers);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const result = useMemo(() => computeMatch(answers), [answers]);
  const liveScore = result.score;

  const clearAdvance = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    setAdvancing(false);
  };

  const reset = () => {
    clearAdvance();
    setPhase("wizard");
    setStepIndex(0);
    setAnswers({});
    setOtherIndustry("");
    setOtherTechStack("");
  };

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const currentQuestion = questions[stepIndex];
  const currentAnswer = answers[currentQuestion?.id];
  const isAnswered = currentQuestion?.multiSelect ? true : currentAnswer !== undefined;

  const visibleSteps = questions
    .map((_, i) => i)
    .filter((i) => !isStepSkipped(i, answers));
  const totalSteps = visibleSteps.length;
  const currentPos = visibleSteps.indexOf(stepIndex);
  const isLastStep = currentPos === totalSteps - 1;

  const next = () => {
    clearAdvance();
    const ans = answersRef.current;
    let i = stepIndex + 1;
    while (i < questions.length && isStepSkipped(i, ans)) i += 1;
    if (i >= questions.length) {
      setPhase("result");
    } else {
      setStepIndex(i);
    }
  };

  const back = () => {
    clearAdvance();
    const ans = answersRef.current;
    let i = stepIndex - 1;
    while (i > 0 && isStepSkipped(i, ans)) i -= 1;
    setStepIndex(Math.max(0, i));
  };

  const setAnswer = (value: string | string[]) => {
    setAnswers((prev) => {
      const updated: Answers = { ...prev, [currentQuestion.id]: value };
      if (currentQuestion.id === "location") {
        if (value === "remote") {
          updated.workMode = "remote";
        } else if (prev.location === "remote") {
          delete updated.workMode;
        }
      }
      return updated;
    });
    const revealsOtherInput =
      !currentQuestion.multiSelect &&
      currentQuestion.otherInput?.triggerValue === value;
    if (!currentQuestion.multiSelect && !revealsOtherInput) {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      setAdvancing(true);
      advanceTimer.current = setTimeout(() => {
        advanceTimer.current = null;
        setAdvancing(false);
        next();
      }, AUTO_ADVANCE_MS);
    } else {
      clearAdvance();
    }
  };

  if (phase === "welcome") {
    return (
      <div className="rm-phase rm-welcome" key="welcome">
        <p className="rm-welcome-eyebrow">Hiring? Let&apos;s talk</p>
        <h4 className="rm-welcome-title">Let&apos;s see if we&apos;re a match</h4>
        <p className="rm-welcome-copy">
          Tell me a bit about the role you&apos;re hiring for and I&apos;ll show you, honestly,
          how well it lines up with what I&apos;m looking for — no fluff, no vanity score. That
          way neither of us spends time on a role that isn&apos;t right. If it fits, send it
          over and let&apos;s talk.
        </p>
        <div className="rm-welcome-meta">
          <span className="rm-welcome-meta-icon" aria-hidden="true">
            ⏱
          </span>
          <span>
            Takes about <strong>{ESTIMATED_MINUTES} minutes</strong> · {questions.length} quick
            questions · no sign-up
          </span>
        </div>
        <ul className="rm-welcome-points">
          <li>An honest fit verdict with a live match score</li>
          <li>A clear read on what works for both of us</li>
          <li>Send the role straight to me in one click</li>
        </ul>
        <button
          type="button"
          className="btn btn-primary rm-welcome-cta"
          onClick={() => setPhase("wizard")}
        >
          Get started
        </button>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div className="rm-phase" key="result">
        <MatchResult result={result} onSendLead={() => setPhase("lead")} onClose={reset} />
      </div>
    );
  }

  if (phase === "lead") {
    return (
      <div className="rm-phase" key="lead">
        <RecruiterLeadForm
          answers={answers}
          otherIndustry={otherIndustry}
          otherTechStack={otherTechStack}
          onDone={reset}
        />
      </div>
    );
  }

  return (
    <div className="rm-phase rm-wizard" key="wizard">
      <div className="rm-progress">
        <div className="rm-progress-bar">
          <div
            className="rm-progress-fill"
            style={{ width: `${((currentPos + 1) / totalSteps) * 100}%` }}
          />
        </div>
        <div className="rm-progress-meta">
          <span>
            Step {currentPos + 1} / {totalSteps}
          </span>
          <span className="rm-live-score">Match so far: {liveScore}</span>
        </div>
      </div>

      <div className="rm-step-anim" key={stepIndex}>
        <WizardStep
          question={currentQuestion}
          value={currentAnswer}
          onChange={setAnswer}
          otherValue={otherIndustry}
          onOtherChange={setOtherIndustry}
          freeTextValue={otherTechStack}
          onFreeTextChange={setOtherTechStack}
        />
      </div>

      {advancing && (
        <div className="rm-autoadvance" role="status">
          <span>Locked in — auto-advancing in a moment…</span>
          <div className="rm-autoadvance-bar">
            <div key={String(currentAnswer)} className="rm-autoadvance-fill" />
          </div>
        </div>
      )}

      <div className="rm-nav">
        <button type="button" className="btn" onClick={back} disabled={currentPos === 0}>
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={next}
          disabled={!isAnswered}
        >
          {isLastStep ? "See result" : "Next"}
        </button>
      </div>
    </div>
  );
}
