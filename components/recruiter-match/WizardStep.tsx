"use client";

import type { Question } from "@/content/recruiter-criteria";
import { IndustryAutocomplete } from "./IndustryAutocomplete";

type WizardStepProps = {
  question: Question;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  otherValue: string;
  onOtherChange: (value: string) => void;
};

export function WizardStep({
  question,
  value,
  onChange,
  otherValue,
  onOtherChange,
}: WizardStepProps) {
  const selected: string[] = Array.isArray(value) ? value : value ? [value] : [];

  const toggleMulti = (optionValue: string) => {
    const next = selected.includes(optionValue)
      ? selected.filter((v) => v !== optionValue)
      : [...selected, optionValue];
    onChange(next);
  };

  const showOtherInput =
    !question.multiSelect &&
    question.otherInput !== undefined &&
    selected[0] === question.otherInput.triggerValue;

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
              <span className="rm-option-text">
                <span className="rm-option-label">{option.label}</span>
                {option.sublabel && <span className="rm-option-sub">{option.sublabel}</span>}
              </span>
              {isActive && <span className="rm-option-check">✓</span>}
            </button>
          );
        })}
      </div>
      {showOtherInput && question.otherInput && (
        <IndustryAutocomplete
          value={otherValue}
          onChange={onOtherChange}
          label={question.otherInput.label}
          placeholder={question.otherInput.placeholder}
          suggestions={question.otherInput.suggestions}
        />
      )}
    </div>
  );
}
