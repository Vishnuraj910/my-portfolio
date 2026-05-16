"use client";

import { useId, useState } from "react";

type IndustryAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  suggestions: string[];
};

export function IndustryAutocomplete({
  value,
  onChange,
  label,
  placeholder,
  suggestions,
}: IndustryAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  const query = value.trim().toLowerCase();
  const filtered = query
    ? suggestions.filter((s) => s.toLowerCase().includes(query))
    : suggestions;

  return (
    <div className="rm-other-input">
      <label className="rm-helper" htmlFor={listId}>
        {label}
      </label>
      <div className="rm-autocomplete">
        <input
          id={listId}
          type="text"
          className="input"
          placeholder={placeholder}
          value={value}
          maxLength={80}
          autoComplete="off"
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        />
        {open && filtered.length > 0 && (
          <ul className="rm-autocomplete-list">
            {filtered.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  className="rm-autocomplete-option"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(suggestion);
                    setOpen(false);
                  }}
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
