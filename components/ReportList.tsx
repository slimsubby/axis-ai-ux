"use client";

import { useEffect, useRef, useState } from "react";
import type { AuditResult } from "@/lib/scoring";
import { buildTextReport } from "@/lib/scoring";

type Props = {
  result: AuditResult;
};

/**
 * The prioritised fix list: every recommendation from a No or Partly
 * answer, hard fails first, plus a copy-to-clipboard plain-text report.
 */
export default function ReportList({ result }: Props) {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const failing = result.perHeuristic
    .filter((r) => r.recommendations.length > 0)
    .sort((a, b) => (a.status === "fail" ? 0 : 1) - (b.status === "fail" ? 0 : 1));

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(buildTextReport(result));
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (permissions, insecure context);
      // fall back to a prompt the user can copy from manually.
      window.prompt("Copy the report below:", buildTextReport(result));
    }
  }

  return (
    <section aria-labelledby="report-heading" className="rounded-lg border border-line p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="report-heading" className="text-lg font-semibold tracking-tight">
          Recommended fixes
        </h2>
        <button
          type="button"
          onClick={copyReport}
          disabled={result.answeredCount === 0}
          className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink-muted hover:border-ink-faint hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {/* aria-live announces the confirmation to screen readers. */}
          <span aria-live="polite">{copied ? "Copied" : "Copy report"}</span>
        </button>
      </div>

      {failing.length === 0 ? (
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          {result.answeredCount === 0
            ? "Fixes will appear here for every question answered “No” or “Partly”."
            : "No fixes needed so far. Everything answered passes."}
        </p>
      ) : (
        <ol className="mt-4 space-y-4">
          {failing.map((r) =>
            r.recommendations.map((rec, i) => (
              <li key={`${r.heuristic.id}-${i}`} className="flex gap-3 text-sm">
                <span
                  className={
                    "mt-0.5 shrink-0 rounded px-2 py-0.5 text-xs font-medium " +
                    (rec.answer === "no"
                      ? "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300"
                      : "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {rec.answer === "no" ? "Fail" : "Partial"}
                </span>
                <span className="leading-relaxed">
                  <strong className="font-medium">{r.heuristic.name}:</strong>{" "}
                  <span className="text-ink-muted">{rec.text}</span>
                </span>
              </li>
            ))
          )}
        </ol>
      )}
    </section>
  );
}
