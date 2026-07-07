"use client";

import type { Answer } from "@/lib/scoring";

const OPTIONS: { value: Answer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "partly", label: "Partly" },
  { value: "no", label: "No" },
  { value: "na", label: "N/A" },
];

type Props = {
  /** Unique key for this question — doubles as the radio group name. */
  name: string;
  question: string;
  value: Answer | undefined;
  onChange: (value: Answer) => void;
};

/**
 * One audit question as a native radio group. Native inputs inside a
 * fieldset give us correct semantics and arrow-key navigation for free —
 * no ARIA re-implementation needed.
 */
export default function AuditQuestion({ name, question, value, onChange }: Props) {
  return (
    <fieldset>
      <legend className="max-w-measure font-medium leading-relaxed">
        {question}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2" role="presentation">
        {OPTIONS.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={
                "cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent " +
                (checked
                  ? "border-accent bg-accent-wash text-accent-dark"
                  : "border-line text-ink-muted hover:border-ink-faint hover:text-ink")
              }
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                // Visually hidden but still focusable/announced; the label
                // provides the visible, high-contrast hit target.
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
