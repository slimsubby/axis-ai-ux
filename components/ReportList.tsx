"use client";

import { useEffect, useRef, useState } from "react";
import type { AuditResult } from "@/lib/scoring";
import { buildTextReport } from "@/lib/scoring";
import { buildHtmlReport } from "@/lib/report";

type Props = {
  result: AuditResult;
};

/**
 * The prioritised fix list: every recommendation from a No or Partly
 * answer, hard fails first, as numbered fix cards. The report can be
 * copied as plain text or downloaded as a self-contained HTML document;
 * both are generated on the device, nothing is uploaded.
 */
export default function ReportList({ result }: Props) {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const fixes = result.perHeuristic
    .filter((r) => r.recommendations.length > 0)
    .sort((a, b) => (a.status === "fail" ? 0 : 1) - (b.status === "fail" ? 0 : 1))
    .flatMap((r) =>
      r.recommendations.map((rec) => ({
        id: r.heuristic.id,
        name: r.heuristic.name,
        severity: rec.answer,
        text: rec.text,
      }))
    );

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

  function downloadReport() {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const html = buildHtmlReport(result, dateStr);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `axis-trust-audit-${now.toISOString().slice(0, 10)}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasAnswers = result.answeredCount > 0;

  return (
    <section
      aria-labelledby="report-heading"
      className="rounded-xl border border-line bg-surface p-6 sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="report-heading" className="text-lg font-semibold tracking-tight">
          Recommended fixes
        </h2>
        {fixes.length > 0 && (
          <span className="rounded-full bg-accent-wash px-2.5 py-0.5 text-xs font-semibold text-accent-dark">
            {fixes.length} to fix
          </span>
        )}
      </div>

      {fixes.length === 0 ? (
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          {hasAnswers
            ? "No fixes needed so far. Everything answered passes."
            : "Fixes will appear here for every question answered “No” or “Partly”."}
        </p>
      ) : (
        <ol className="mt-5 space-y-3">
          {fixes.map((fix, i) => (
            <li
              key={`${fix.id}-${i}`}
              className="rounded-lg border border-line bg-paper p-4"
            >
              <p className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold tabular-nums text-accent-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={
                    "rounded-full px-2 py-0.5 text-[11px] font-semibold " +
                    (fix.severity === "no"
                      ? "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300"
                      : "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {fix.severity === "no" ? "Fail" : "Partial"}
                </span>
                <span className="font-semibold">{fix.name}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {fix.text}
              </p>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
        <button
          type="button"
          onClick={downloadReport}
          disabled={!hasAnswers}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Download report
        </button>
        <button
          type="button"
          onClick={copyReport}
          disabled={!hasAnswers}
          className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-muted hover:border-ink-faint hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span aria-live="polite">{copied ? "Copied" : "Copy report"}</span>
        </button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-muted">
        Reports are generated on your device. Nothing is uploaded.
      </p>
    </section>
  );
}
