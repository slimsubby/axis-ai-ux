/**
 * Downloadable audit report. Pure function: takes a scored audit and a
 * display date, returns a self-contained HTML document (inline styles, no
 * external assets) that opens in any browser and prints cleanly to PDF.
 * Generated entirely on the user's device; nothing is uploaded.
 */

import type { AuditResult } from "@/lib/scoring";
import { statusLabel } from "@/lib/scoring";

const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  Pass: { bg: "#eef1fd", fg: "#2338b8" },
  Partial: { bg: "#fef3c7", fg: "#92400e" },
  Fail: { bg: "#fee2e2", fg: "#991b1b" },
  "N/A": { bg: "#f3f4f6", fg: "#5a6070" },
  Unanswered: { bg: "#f3f4f6", fg: "#8a8f9c" },
};

export function buildHtmlReport(result: AuditResult, dateStr: string): string {
  const { percent, answeredCount, questionCount, perHeuristic } = result;

  const statusRows = perHeuristic
    .map((r) => {
      const label = statusLabel(r.status);
      const c = STATUS_COLORS[label] ?? STATUS_COLORS["N/A"];
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${r.heuristic.name}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;">
          <span style="background:${c.bg};color:${c.fg};padding:3px 10px;border-radius:99px;font-size:12px;font-weight:600;">${label}</span>
        </td>
      </tr>`;
    })
    .join("");

  const fixes = perHeuristic
    .filter((r) => r.recommendations.length > 0)
    .sort((a, b) => (a.status === "fail" ? 0 : 1) - (b.status === "fail" ? 0 : 1))
    .flatMap((r) =>
      r.recommendations.map((rec) => ({
        name: r.heuristic.name,
        severity: rec.answer === "no" ? "Fail" : "Partial",
        text: rec.text,
      }))
    );

  const fixItems = fixes
    .map((f, i) => {
      const c = STATUS_COLORS[f.severity];
      return `<li style="margin:0 0 14px;padding:16px;border:1px solid #e5e7eb;border-radius:10px;list-style:none;">
        <p style="margin:0;font-size:13px;">
          <span style="font-weight:600;color:#2338b8;">${String(i + 1).padStart(2, "0")}</span>
          <span style="background:${c.bg};color:${c.fg};padding:2px 9px;border-radius:99px;font-size:11px;font-weight:600;margin-left:8px;">${f.severity}</span>
          <span style="font-weight:600;margin-left:8px;">${f.name}</span>
        </p>
        <p style="margin:8px 0 0;color:#5a6070;line-height:1.6;">${f.text}</p>
      </li>`;
    })
    .join("");

  const scoreDisplay = percent === null ? "n/a" : `${percent}%`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AXIS Trust Audit Report</title>
</head>
<body style="margin:0;background:#ffffff;color:#16181d;font-family:Inter,system-ui,-apple-system,sans-serif;">
  <main style="max-width:720px;margin:0 auto;padding:48px 24px;">
    <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#2338b8;">AXIS Trust Audit</p>
    <h1 style="margin:8px 0 4px;font-size:28px;letter-spacing:-0.02em;">Trust audit report</h1>
    <p style="margin:0;color:#5a6070;font-size:14px;">Generated ${dateStr} with the AXIS Trust Auditor. Scored against the eight AXIS heuristics for trustworthy AI interfaces.</p>

    <div style="margin:28px 0;padding:24px;border:1px solid #e5e7eb;border-radius:12px;background:#f8f9fb;">
      <span style="font-size:44px;font-weight:600;letter-spacing:-0.02em;color:#2338b8;">${scoreDisplay}</span>
      <span style="margin-left:12px;color:#5a6070;font-size:14px;">overall score · ${answeredCount} of ${questionCount} questions answered · N/A excluded from scoring</span>
    </div>

    <h2 style="margin:32px 0 8px;font-size:18px;letter-spacing:-0.01em;">Result per heuristic</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${statusRows}</table>

    <h2 style="margin:36px 0 14px;font-size:18px;letter-spacing:-0.01em;">Prioritised fixes${fixes.length ? ` (${fixes.length})` : ""}</h2>
    ${
      fixes.length
        ? `<ol style="margin:0;padding:0;">${fixItems}</ol>`
        : `<p style="color:#5a6070;font-size:14px;">No fixes required. Every answered question passes.</p>`
    }

    <p style="margin:40px 0 0;padding-top:20px;border-top:1px solid #e5e7eb;color:#8a8f9c;font-size:12px;line-height:1.6;">
      AXIS: AI eXperience Integrity Standards · <a href="https://axis-two-eta.vercel.app" style="color:#2338b8;">axis-two-eta.vercel.app</a> · created by Bello Teslim Olasubomi.
      This report was generated locally in the browser; no audit data was uploaded anywhere.
    </p>
  </main>
</body>
</html>`;
}
