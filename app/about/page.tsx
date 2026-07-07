import type { Metadata } from "next";
import { references } from "@/data/references";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why AXIS exists, the published research it is grounded in, and who maintains it.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight">About AXIS</h1>
      <div className="mt-6 max-w-measure space-y-4 leading-relaxed text-ink-muted">
        <p>
          AXIS exists because AI features are shipping faster than the design
          discipline around them. Teams have Nielsen's heuristics for
          usability and WCAG for accessibility, but nothing shared to answer
          the question users are actually asking of AI products:{" "}
          <em className="not-italic font-medium text-ink">
            can I trust what this thing just gave me?
          </em>{" "}
          AXIS is a first attempt at that shared standard: eight heuristics
          and an auditor, open source, meant to be argued with and improved.
        </p>
      </div>

      <section id="grounding" aria-labelledby="grounding-heading" className="mt-14">
        <h2 id="grounding-heading" className="text-lg font-semibold tracking-tight">
          Grounding
        </h2>
        <div className="mt-3 max-w-measure space-y-4 leading-relaxed text-ink-muted">
          <p>
            AXIS doesn&apos;t start from zero. Each heuristic synthesizes
            published human-AI interaction research and platform guidance (the
            sources below) into a form small enough to audit against.
            Every heuristic card cites the specific prior art it draws on;
            where a heuristic goes beyond the literature (the silently-dropped
            input failure mode in{" "}
            <em className="not-italic font-medium text-ink">
              Preserved context
            </em>
            ), that is stated rather than hidden.
          </p>
          <p>
            <strong className="font-medium text-ink">Scope:</strong> AXIS
            covers the interaction layer: what a person sees and controls
            when using an AI feature. Fairness, privacy, and security are
            essential to trustworthy AI but are system-level concerns with
            their own frameworks (NIST AI RMF, ISO/IEC 42001); AXIS
            deliberately does not restate them.
          </p>
        </div>
        <ul className="mt-6 max-w-measure space-y-4">
          {references.map((ref) => (
            <li key={ref.url} className="text-sm leading-relaxed">
              <a
                href={ref.url}
                className="font-medium text-accent-dark underline decoration-line underline-offset-4 hover:decoration-accent"
              >
                {ref.title}
              </a>
              <span className="text-ink-muted">
                {" "}({ref.publisher}, {ref.year}). {ref.note}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="author-heading" className="mt-12">
        <h2 id="author-heading" className="text-lg font-semibold tracking-tight">
          Author
        </h2>
        <p className="mt-3 max-w-measure leading-relaxed text-ink-muted">
          Created and maintained by{" "}
          <span className="font-medium text-ink">Bello Teslim Olasubomi</span>,
          a product designer working on AI interfaces.
        </p>
        <ul className="mt-4 flex flex-wrap gap-6 text-sm">
          <li>
            <a
              href="https://slimsubbydesigns.webflow.io/"
              className="font-medium text-accent-dark underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/teslim-bello-olasubomi/"
              className="font-medium text-accent-dark underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
