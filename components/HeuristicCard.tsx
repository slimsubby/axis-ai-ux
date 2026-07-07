import type { Heuristic } from "@/data/heuristics";

type Props = {
  heuristic: Heuristic;
  /** 1-based position, rendered as an editorial "01"-style index. */
  index: number;
};

/** Small uppercase section label used inside the card. */
function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
      {children}
    </p>
  );
}

export default function HeuristicCard({ heuristic, index }: Props) {
  return (
    <article
      id={heuristic.id}
      aria-labelledby={`${heuristic.id}-name`}
      className="flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-ink-faint sm:p-7"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tabular-nums text-accent-dark">
          {String(index).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
      <h3
        id={`${heuristic.id}-name`}
        className="mt-4 text-xl font-semibold tracking-tight"
      >
        {heuristic.name}
      </h3>
      <p className="mt-2 font-medium leading-relaxed">{heuristic.principle}</p>
      <CardLabel>Why it matters</CardLabel>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
        {heuristic.why}
      </p>
      <CardLabel>What good looks like</CardLabel>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
        {heuristic.goodLooksLike}
      </p>
      {/* mt-auto pins grounding to the bottom so grid rows align. */}
      <div className="mt-auto">
        <CardLabel>Grounding</CardLabel>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          {heuristic.grounding}
        </p>
      </div>
    </article>
  );
}
