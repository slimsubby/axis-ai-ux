/**
 * AXIS — AI eXperience Integrity Standards, v1.
 *
 * Eight heuristics for trustworthy AI product interfaces. Each heuristic
 * carries the audit questions used by the Trust Auditor (/audit), so the
 * framework and the auditor can never drift apart.
 *
 * This is a living standard: propose changes via issues and pull requests.
 */

export type Question = {
  /** The yes/partly/no question the auditor asks. */
  q: string;
  /** The fix shown in the audit report when the answer is No or Partly. */
  recommendationIfFail: string;
};

export type Heuristic = {
  /** Stable slug — used for anchors, audit answer keys, and localStorage. */
  id: string;
  name: string;
  /** One-line statement of the rule. */
  principle: string;
  /** Why the rule exists — what goes wrong without it. */
  why: string;
  /** A concrete picture of the rule done well. */
  goodLooksLike: string;
  /**
   * Prior art this heuristic synthesizes — cited so the standard is
   * verifiable, not asserted. "HAX Gn" = Microsoft's Guidelines for
   * Human-AI Interaction, guideline n. Full sources: data/references.ts.
   */
  grounding: string;
  questions: Question[];
};

export const heuristics: Heuristic[] = [
  {
    id: "visible-confidence",
    name: "Visible confidence",
    principle:
      "Signal how sure the system is, and mark the parts it is least sure about.",
    why: "AI output arrives with uniform, flat confidence — a guess reads exactly like a fact. Surfacing uncertainty tells people where to slow down and check, instead of trusting every sentence equally. A system that admits what it doesn't know earns more trust than one that never hesitates.",
    goodLooksLike:
      "Low-confidence spans are visually distinguished, and the system has a genuine “I'm not sure” state instead of a confident wrong answer.",
    grounding:
      "Microsoft HAX G2 · Google PAIR (Explainability + Trust) · Apple HIG, Generative AI · NIST AI RMF (explainable & interpretable)",
    questions: [
      {
        q: "Does the interface communicate the system's confidence, or flag output it is uncertain about?",
        recommendationIfFail:
          "Add a confidence signal or highlight low-certainty parts of the output, rather than presenting everything with the same visual weight.",
      },
    ],
  },
  {
    id: "reviewable-output",
    name: "Reviewable output",
    principle:
      "Let people see and inspect what the AI produced before it is used or sent.",
    why: "If output is applied automatically or buried behind a summary, users have no moment in which to catch errors. Review has to be a designed step in the flow, not something users improvise after the fact.",
    goodLooksLike:
      "A clear review state that shows exactly what was generated — in full — before anything is done with it.",
    grounding:
      "Apple HIG, Generative AI · IBM design principles for generative AI (CHI 2024) · Shneiderman, Human-Centered AI",
    questions: [
      {
        q: "Can the user inspect the AI's output before it takes effect?",
        recommendationIfFail:
          "Add an explicit review step between generation and action, showing the full output before it is applied or sent.",
      },
    ],
  },
  {
    id: "cheap-correction",
    name: "Cheap correction",
    principle:
      "Allow editing or overriding output in place; never force a full restart to fix one thing.",
    why: "If fixing a small error means regenerating everything, correction becomes expensive — so people stop correcting. They either accept flawed output or abandon the tool. The cost of a fix should be proportional to the size of the mistake.",
    goodLooksLike:
      "Inline editing and per-item accept/reject controls, not a single all-or-nothing “regenerate” button.",
    grounding:
      "Microsoft HAX G9 · Google PAIR (Feedback + Control) · Nielsen's usability heuristic 3 (user control and freedom)",
    questions: [
      {
        q: "Can the user edit or override the output without starting over?",
        recommendationIfFail:
          "Add inline editing and granular accept/reject controls so small errors have small fixes.",
      },
    ],
  },
  {
    id: "graceful-recovery",
    name: "Graceful recovery",
    principle:
      "Provide a clear way back when the AI is wrong: undo, retry, or escalate.",
    why: "These systems fail — that is a design constraint, not an edge case. A product with no recovery path turns a model error into a user dead-end, and dead-ends are where trust goes to die.",
    goodLooksLike:
      "Obvious undo and retry actions, plus a route to a human or a manual mode when the AI can't get it right.",
    grounding:
      "Microsoft HAX G8–G9 · Google PAIR (Errors + Graceful Failure) · Nielsen's usability heuristic 9 (error recovery)",
    questions: [
      {
        q: "Is there a clear recovery path when the output is wrong?",
        recommendationIfFail:
          "Add undo/retry actions and an escape hatch to a manual or human-assisted route.",
      },
    ],
  },
  {
    id: "human-control",
    name: "Human control on consequential actions",
    principle:
      "Require explicit confirmation before anything irreversible or high-impact.",
    why: "Autonomy is fine for low-stakes steps and dangerous for high-stakes ones. The level of human control should be matched to the consequence of the action, not to how confident the model happens to be.",
    goodLooksLike:
      "A deliberate, explicit confirmation before actions that spend money, send messages, or can't be undone.",
    grounding:
      "Shneiderman, Human-Centered AI · Microsoft HAX G16–G17 · Apple HIG, Generative AI · ISO/IEC 42001 (human oversight)",
    questions: [
      {
        q: "Do consequential or irreversible actions require explicit human confirmation?",
        recommendationIfFail:
          "Gate high-impact actions behind a clear, explicit confirmation step — never let them fire as a side effect.",
      },
    ],
  },
  {
    id: "honest-expectations",
    name: "Honest expectations",
    principle:
      "Don't imply certainty or ability the system lacks; label AI-generated content.",
    why: "Overselling the AI sets users up to over-trust it — and the crash that follows is worse than modest expectations up front. Clear labelling and honest framing protect both the user and their long-term trust in the product.",
    goodLooksLike:
      "AI-generated content carries a visible label, and interface copy avoids promising accuracy the model can't guarantee.",
    grounding:
      "Microsoft HAX G1–G2 · IBM Carbon for AI (labelling AI content) · Google PAIR (Mental Models) · NN/g research on sycophancy and over-trust",
    questions: [
      {
        q: "Is AI-generated content labelled, and does the framing avoid implying false certainty?",
        recommendationIfFail:
          "Label AI output clearly and rewrite copy that overstates what the system can do or how sure it is.",
      },
    ],
  },
  {
    id: "preserved-context",
    name: "Preserved context",
    principle:
      "Don't silently drop what the user provided; keep their inputs visible and honoured.",
    why: "When a system quietly loses context the user gave it earlier, it produces confident output that ignores real constraints — and because nothing looks wrong, the failure is hard to spot. Users shouldn't have to re-check that their own inputs were used.",
    goodLooksLike:
      "The user's key inputs stay visible through the flow, and the output demonstrably reflects them.",
    grounding:
      "Microsoft HAX G12 (remember recent interactions) — the silent-loss failure mode itself is AXIS's own contribution",
    questions: [
      {
        q: "Does the system keep and honour the context the user provided, visibly?",
        recommendationIfFail:
          "Surface the captured context back to the user and confirm it before generating, so dropped constraints are caught early.",
      },
    ],
  },
  {
    id: "shown-provenance",
    name: "Shown provenance",
    principle:
      "Make output verifiable: show sources, inputs used, or how it was produced.",
    why: "Verifiability is the basis of trust in professional settings. If users can't check where something came from, they can't responsibly rely on it — no matter how good it looks.",
    goodLooksLike:
      "Citations, source references, or a visible trail showing what the output was based on.",
    grounding:
      "Microsoft HAX G11 · Google PAIR (Explainability + Trust) · NIST AI RMF (accountable & transparent) · NN/g guidance on verifying AI citations",
    questions: [
      {
        q: "Can the user see where the output came from, or what it was based on?",
        recommendationIfFail:
          "Add sources, citations, or a visible provenance trail linking output back to the inputs it was derived from.",
      },
    ],
  },
];
