import Link from "next/link";
import HeuristicCard from "@/components/HeuristicCard";
import { heuristics } from "@/data/heuristics";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
      {/* Hero: left-aligned, wide text column. */}
      <section className="py-16 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-accent-dark">
          An open standard, v1
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Heuristics for trustworthy AI interfaces
        </h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
          <p>
            We have a shared standard for usability and a shared standard for
            accessibility. There is no equivalent for whether an AI interface
            is <em className="text-ink not-italic font-medium">trustworthy</em>:
            does it show its uncertainty, let people review and correct output,
            and keep humans in control of what matters?
          </p>
          <p>
            AXIS is a concise, opinionated set of eight heuristics for AI
            product interfaces, plus an auditor you can run against any AI
            feature in a few minutes.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/audit"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
          >
            Audit your AI feature
          </Link>
          <a
            href="#framework"
            className="text-sm font-medium text-accent-dark underline decoration-line underline-offset-4 hover:decoration-accent"
          >
            Read the heuristics
          </a>
        </div>
      </section>

      {/* Framework */}
      <section id="framework" aria-labelledby="framework-heading" className="pb-20 sm:pb-28">
        <h2
          id="framework-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          The eight heuristics
        </h2>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Each heuristic states a rule, why it matters, and what it looks like
          done well. Together they cover one question: can a person safely
          rely on what this interface gives them? None of it is asserted from
          nowhere; every heuristic cites the published research it
          synthesizes, from Microsoft&apos;s Guidelines for Human-AI
          Interaction to Google&apos;s People + AI Guidebook.{" "}
          <Link
            href="/about#grounding"
            className="font-medium text-accent-dark underline decoration-line underline-offset-4 hover:decoration-accent"
          >
            See the full grounding
          </Link>
          .
        </p>
        {/* 8 cards, two per row: wide cards read best and rows stay even. */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {heuristics.map((h, i) => (
            <HeuristicCard key={h.id} heuristic={h} index={i + 1} />
          ))}
        </div>
      </section>
    </div>
  );
}
