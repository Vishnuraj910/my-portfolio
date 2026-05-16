"use client";

import { questions } from "@/content/recruiter-criteria";
import { computeMatch, type Answers } from "@/lib/match";
import { useEffect, useMemo, useRef, useState } from "react";
import { MatchResult } from "./MatchResult";
import { RecruiterLeadForm } from "./RecruiterLeadForm";
import { WizardStep } from "./WizardStep";

type Phase = "wizard" | "result" | "lead";

const AUTO_ADVANCE_MS = 3000;

export function RecruiterMatch() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("wizard");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [otherIndustry, setOtherIndustry] = useState("");
  const [advancing, setAdvancing] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  };

  const close = () => {
    setOpen(false);
    reset();
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    modalRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const currentQuestion = questions[stepIndex];
  const currentAnswer = answers[currentQuestion?.id];
  const isAnswered = currentQuestion?.multiSelect ? true : currentAnswer !== undefined;
  const isLastStep = stepIndex === questions.length - 1;

  const next = () => {
    clearAdvance();
    if (isLastStep) {
      setPhase("result");
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const setAnswer = (value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
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

  const back = () => {
    clearAdvance();
    setStepIndex((i) => Math.max(0, i - 1));
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="btn btn-primary"
        onClick={() => setOpen(true)}
      >
        Hiring? Check role fit
      </button>

      {open && (
        <div className="rm-overlay" onClick={close}>
          <div
            ref={modalRef}
            className="rm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rm-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rm-modal-head">
              <h3 id="rm-title">Role fit check</h3>
              <button type="button" className="rm-close" aria-label="Close" onClick={close}>
                ✕
              </button>
            </div>

            {phase === "wizard" && currentQuestion && (
              <div className="rm-wizard">
                <div className="rm-progress">
                  <div className="rm-progress-bar">
                    <div
                      className="rm-progress-fill"
                      style={{ width: `${((stepIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                  <div className="rm-progress-meta">
                    <span>
                      Step {stepIndex + 1} / {questions.length}
                    </span>
                    <span className="rm-live-score">Match so far: {liveScore}</span>
                  </div>
                </div>

                <WizardStep
                  question={currentQuestion}
                  value={currentAnswer}
                  onChange={setAnswer}
                  otherValue={otherIndustry}
                  onOtherChange={setOtherIndustry}
                />

                {advancing ? (
                  <div className="rm-autoadvance" role="status">
                    <span>Locked in — moving to the next step…</span>
                    <div className="rm-autoadvance-bar">
                      <div
                        key={String(currentAnswer)}
                        className="rm-autoadvance-fill"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="rm-nav">
                    <button
                      type="button"
                      className="btn"
                      onClick={back}
                      disabled={stepIndex === 0}
                    >
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
                )}
              </div>
            )}

            {phase === "result" && (
              <MatchResult
                result={result}
                onSendLead={() => setPhase("lead")}
                onClose={close}
              />
            )}

            {phase === "lead" && (
              <RecruiterLeadForm
                answers={answers}
                result={result}
                otherIndustry={otherIndustry}
                onDone={close}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
