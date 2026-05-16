"use client";

import { questions } from "@/content/recruiter-criteria";
import { computeMatch, type Answers } from "@/lib/match";
import { useEffect, useMemo, useRef, useState } from "react";
import { MatchResult } from "./MatchResult";
import { RecruiterLeadForm } from "./RecruiterLeadForm";
import { WizardStep } from "./WizardStep";

type Phase = "wizard" | "result" | "lead";

const AUTO_ADVANCE_MS = 3000;

// A remote role makes the work-arrangement question redundant, so skip it.
function isStepSkipped(index: number, answers: Answers): boolean {
  return questions[index]?.id === "workMode" && answers.location === "remote";
}

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

                <WizardStep
                  question={currentQuestion}
                  value={currentAnswer}
                  onChange={setAnswer}
                  otherValue={otherIndustry}
                  onOtherChange={setOtherIndustry}
                />

                {advancing && (
                  <div className="rm-autoadvance" role="status">
                    <span>Locked in — auto-advancing in a moment…</span>
                    <div className="rm-autoadvance-bar">
                      <div
                        key={String(currentAnswer)}
                        className="rm-autoadvance-fill"
                      />
                    </div>
                  </div>
                )}

                <div className="rm-nav">
                  <button
                    type="button"
                    className="btn"
                    onClick={back}
                    disabled={currentPos === 0}
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
