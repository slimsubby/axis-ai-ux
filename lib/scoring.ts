/**
 * Pure scoring logic for the Trust Auditor. Kept free of React so it can be
 * unit-tested and reused (e.g. by a future CLI or CI check).
 *
 * Scoring model: Yes = 1, Partly = 0.5, No = 0. N/A answers are excluded
 * from both numerator and denominator.
 */

import type { Heuristic } from "@/data/heuristics";

export type Answer = "yes" | "partly" | "no" | "na";

/** Map of question key → answer. Unanswered questions are simply absent. */
export type AnswerMap = Record<string, Answer>;

export type HeuristicStatus =
  | "pass" // every applicable question answered Yes
  | "partial" // some credit, but not full marks
  | "fail" // every applicable question answered No
  | "na" // every question marked Not applicable
  | "unanswered"; // at least one applicable question not yet answered

export type HeuristicResult = {
  heuristic: Heuristic;
  status: HeuristicStatus;
  /** Points earned across applicable, answered questions. */
  points: number;
  /** Number of applicable (non-N/A) answered questions. */
  applicable: number;
  /** Recommendations for every question answered No or Partly, worst first. */
  recommendations: { text: string; answer: "no" | "partly" }[];
};

export type AuditResult = {
  perHeuristic: HeuristicResult[];
  /** 0-100, or null when nothing applicable has been answered yet. */
  percent: number | null;
  answeredCount: number;
  questionCount: number;
};

/** Stable key for one question's answer - used in state and localStorage. */
export function questionKey(heuristicId: string, questionIndex: number): string {
  return `${heuristicId}:${questionIndex}`;
}

function pointsFor(answer: Answer): number {
  if (answer === "yes") return 1;
  if (answer === "partly") return 0.5;
  return 0;
}

export function scoreHeuristic(
  heuristic: Heuristic,
  answers: AnswerMap
): HeuristicResult {
  let points = 0;
  let applicable = 0;
  let answered = 0;
  const recommendations: HeuristicResult["recommendations"] = [];

  heuristic.questions.forEach((question, i) => {
    const answer = answers[questionKey(heuristic.id, i)];
    if (answer === undefined) return;
    answered += 1;
    if (answer === "na") return;
    applicable += 1;
    points += pointsFor(answer);
    if (answer === "no" || answer === "partly") {
      recommendations.push({ text: question.recommendationIfFail, answer });
    }
  });

  // "No" failures are more urgent than "Partly" - surface them first.
  recommendations.sort((a, b) => pointsFor(a.answer) - pointsFor(b.answer));

  let status: HeuristicStatus;
  if (answered < heuristic.questions.length) {
    status = "unanswered";
  } else if (applicable === 0) {
    status = "na";
  } else if (points === applicable) {
    status = "pass";
  } else if (points === 0) {
    status = "fail";
  } else {
    status = "partial";
  }

  return { heuristic, status, points, applicable, recommendations };
}

export function scoreAudit(
  heuristics: Heuristic[],
  answers: AnswerMap
): AuditResult {
  const perHeuristic = heuristics.map((h) => scoreHeuristic(h, answers));

  const applicable = perHeuristic.reduce((sum, r) => sum + r.applicable, 0);
  const points = perHeuristic.reduce((sum, r) => sum + r.points, 0);
  const questionCount = heuristics.reduce((n, h) => n + h.questions.length, 0);
  const answeredCount = heuristics.reduce(
    (n, h) =>
      n +
      h.questions.filter(
        (_, i) => answers[questionKey(h.id, i)] !== undefined
      ).length,
    0
  );

  return {
    perHeuristic,
    percent: applicable > 0 ? Math.round((points / applicable) * 100) : null,
    answeredCount,
    questionCount,
  };
}

const STATUS_LABELS: Record<HeuristicStatus, string> = {
  pass: "Pass",
  partial: "Partial",
  fail: "Fail",
  na: "N/A",
  unanswered: "Unanswered",
};

export function statusLabel(status: HeuristicStatus): string {
  return STATUS_LABELS[status];
}

/**
 * Plain-text report for the "Copy report" button - readable when pasted
 * into a doc, an issue, or a Slack message.
 */
export function buildTextReport(result: AuditResult): string {
  const lines: string[] = [];
  lines.push("AXIS Trust Audit: AI eXperience Integrity Standards");
  lines.push(
    result.percent === null
      ? "Overall score: n/a (no applicable questions answered)"
      : `Overall score: ${result.percent}%`
  );
  lines.push(
    `Answered: ${result.answeredCount}/${result.questionCount} questions`
  );
  lines.push("");
  lines.push("Per heuristic:");
  for (const r of result.perHeuristic) {
    lines.push(`- ${r.heuristic.name}: ${statusLabel(r.status)}`);
  }

  const fixes = result.perHeuristic
    .filter((r) => r.recommendations.length > 0)
    // Fails before partials - same priority order as the on-screen report.
    .sort((a, b) => (a.status === "fail" ? 0 : 1) - (b.status === "fail" ? 0 : 1));

  if (fixes.length > 0) {
    lines.push("");
    lines.push("Prioritised fixes:");
    let n = 1;
    for (const r of fixes) {
      for (const rec of r.recommendations) {
        lines.push(`${n}. [${r.heuristic.name}] ${rec.text}`);
        n += 1;
      }
    }
  }

  return lines.join("\n");
}
