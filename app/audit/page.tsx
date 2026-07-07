import type { Metadata } from "next";
import TrustAuditor from "@/components/TrustAuditor";

export const metadata: Metadata = {
  title: "Trust Auditor",
  description:
    "Score your AI feature against the AXIS heuristics and get a prioritised list of fixes.",
};

export default function AuditPage() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Trust Auditor</h1>
      <p className="mt-4 max-w-measure leading-relaxed text-ink-muted">
        Pick one AI feature (a summariser, an agent, an autocomplete) and
        answer each question about it honestly. Answers save automatically in
        your browser; nothing leaves your device.
      </p>
      <div className="mt-12">
        <TrustAuditor />
      </div>
    </div>
  );
}
