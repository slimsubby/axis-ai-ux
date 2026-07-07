import type { Heuristic } from "@/data/heuristics";

type Props = {
  heuristic: Heuristic;
  /** 1-based position, rendered as an editorial "01"-style index. */
  index: number;
};

export default function HeuristicCard({ heuristic, index }: Props) {
  return (
    <article
      id={heuristic.id}
      aria-labelledby={`${heuristic.id}-name`}
      className="flex flex-col gap-3 rounded-lg border border-line p-6 sm:p-8"
    >
      <p className="text-sm font-medium tabular-nums text-accent-dark">
        {String(index).padStart(2, "0")}
      </p>
      <h3 id={`${heuristic.id}-name`} className="text-xl font-semibold tracking-tight">
        {heuristic.name}
      </h3>
      <p className="font-medium leading-relaxed">{heuristic.principle}</p>
      <p className="leading-relaxed text-ink-muted">{heuristic.why}</p>
      <p className="leading-relaxed text-ink-muted">
        <strong className="font-medium text-ink">What good looks like: </strong>
        {heuristic.goodLooksLike}
      </p>
      <p className="mt-auto border-t border-line pt-3 text-sm leading-relaxed text-ink-muted">
        <strong className="font-medium text-ink">Grounding: </strong>
        {heuristic.grounding}
      </p>
    </article>
  );
}
