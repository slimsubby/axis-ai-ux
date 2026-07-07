"use client";

import type { AuditResult, HeuristicStatus } from "@/lib/scoring";
import { statusLabel } from "@/lib/scoring";

// Status chip styles - colour is never the only signal; the text label
// always accompanies it (WCAG 1.4.1).
const STATUS_STYLES: Record<HeuristicStatus, string> = {
  pass: "bg-accent-wash text-accent-dark",
  partial: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  fail: "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300",
  na: "bg-gray-100 text-ink-muted dark:bg-gray-800",
  unanswered: "bg-gray-100 text-ink-muted dark:bg-gray-800",
};

type Props = {
  result: AuditResult;
};

export default function ScoreSummary({ result }: Props) {
  const { percent, answeredCount, questionCount, perHeuristic } = result;

  return (
    <section aria-labelledby="score-heading" className="rounded-xl border border-line bg-surface p-6 sm:p-7">
      <h2 id="score-heading" className="text-lg font-semibold tracking-tight">
        Score
      </h2>

      {/* aria-live so screen-reader users hear the score change as they answer. */}
      <p aria-live="polite" className="mt-4">
        {percent === null ? (
          <span className="text-ink-muted">
            Answer the questions to see your score.
          </span>
        ) : (
          <>
            <span className="text-5xl font-semibold tabular-nums tracking-tight text-accent-dark">
              {percent}%
            </span>
            <span className="ml-3 text-sm text-ink-muted">
              {answeredCount} of {questionCount} questions answered
            </span>
          </>
        )}
      </p>

      <ul className="mt-6 space-y-2">
        {perHeuristic.map((r) => (
          <li
            key={r.heuristic.id}
            className="flex items-baseline justify-between gap-4 text-sm"
          >
            <span className="text-ink-muted">{r.heuristic.name}</span>
            <span
              className={
                "shrink-0 rounded px-2 py-0.5 text-xs font-medium " +
                STATUS_STYLES[r.status]
              }
            >
              {statusLabel(r.status)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
