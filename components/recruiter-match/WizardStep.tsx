"use client";

import type { Question } from "@/content/recruiter-criteria";

type WizardStepProps = {
  question: Question;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
};

export function WizardStep({ question, value, onChange }: WizardStepProps) {
  const selected: string[] = Array.isArray(value) ? value : value ? [value] : [];

  const toggleMulti = (optionValue: string) => {
    const next = selected.includes(optionValue)
      ? selected.filter((v) => v !== optionValue)
      : [...selected, optionValue];
    onChange(next);
  };

  return (
    <div className="rm-step">
      <h4 className="rm-question">{question.prompt}</h4>
      {question.helper && <p className="rm-helper">{question.helper}</p>}
      <div className="rm-options">
        {question.options.map((option) => {
          const isActive = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              className={`rm-option ${isActive ? "rm-option-active" : ""}`}
              aria-pressed={isActive}
              onClick={() =>
                question.multiSelect ? toggleMulti(option.value) : onChange(option.value)
              }
            >
              <span className="rm-option-label">{option.label}</span>
              {isActive && <span className="rm-option-check">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
