"use client";

import { useEffect, useMemo, useState } from "react";
import AuditQuestion from "@/components/AuditQuestion";
import ScoreSummary from "@/components/ScoreSummary";
import ReportList from "@/components/ReportList";
import { heuristics } from "@/data/heuristics";
import {
  type Answer,
  type AnswerMap,
  questionKey,
  scoreAudit,
} from "@/lib/scoring";

// Versioned key so a future change to the answer format can't collide
// with stale saved data.
const STORAGE_KEY = "axis-audit-v1";

const VALID_ANSWERS = new Set<Answer>(["yes", "partly", "no", "na"]);

/** Parse saved answers defensively — localStorage contents are untrusted. */
function loadSavedAnswers(): AnswerMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    const clean: AnswerMap = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (VALID_ANSWERS.has(value as Answer)) clean[key] = value as Answer;
    }
    return clean;
  } catch {
    return {};
  }
}

// TODO v2: AI-assisted audit mode — a "paste your feature description"
// textarea that sends the description plus the heuristics to an LLM and
// pre-fills suggested answers for the user to review (never to auto-submit;
// see heuristic 2, Reviewable output). Deliberately out of scope for v1 to
// keep the site fully client-side with no API keys or backend.

export default function TrustAuditor() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  // Avoid a hydration mismatch: render empty first, then load saved state.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setAnswers(loadSavedAnswers());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // Storage full or blocked — the audit still works, it just won't persist.
    }
  }, [answers, hydrated]);

  const result = useMemo(() => scoreAudit(heuristics, answers), [answers]);

  function setAnswer(key: string, value: Answer) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setAnswers({});
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-start">
      {/* Questions */}
      <div>
        <ol className="space-y-10">
          {heuristics.map((h, hi) => (
            <li key={h.id}>
              <section aria-labelledby={`audit-${h.id}`}>
                <p className="text-sm font-medium tabular-nums text-accent-dark">
                  {String(hi + 1).padStart(2, "0")}
                </p>
                <h2
                  id={`audit-${h.id}`}
                  className="mt-1 text-lg font-semibold tracking-tight"
                >
                  {h.name}
                </h2>
                <p className="mt-1 max-w-measure text-sm leading-relaxed text-ink-muted">
                  {h.principle}
                </p>
                <div className="mt-4 space-y-6">
                  {h.questions.map((question, qi) => {
                    const key = questionKey(h.id, qi);
                    return (
                      <AuditQuestion
                        key={key}
                        name={key}
                        question={question.q}
                        value={answers[key]}
                        onChange={(value) => setAnswer(key, value)}
                      />
                    );
                  })}
                </div>
              </section>
            </li>
          ))}
        </ol>

        <div className="mt-10 border-t border-line pt-6">
          <button
            type="button"
            onClick={reset}
            disabled={result.answeredCount === 0}
            className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-muted hover:border-ink-faint hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear all answers
          </button>
        </div>
      </div>

      {/* Results — sticky on large screens so the score tracks your answers. */}
      <aside aria-label="Audit results" className="space-y-5 lg:sticky lg:top-8">
        <ScoreSummary result={result} />
        <ReportList result={result} />
      </aside>
    </div>
  );
}
