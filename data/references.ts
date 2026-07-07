/**
 * Prior art that AXIS synthesizes and builds on. Rendered on the About page
 * and cited per-heuristic via the `grounding` field in data/heuristics.ts.
 *
 * All URLs verified working as of July 2026.
 */

export type Reference = {
  title: string;
  publisher: string;
  year: string;
  url: string;
  /** What this source contributes, in one line. */
  note: string;
};

export const references: Reference[] = [
  {
    title: "Guidelines for Human-AI Interaction (HAX Toolkit)",
    publisher: "Microsoft Research — Amershi et al.",
    year: "CHI 2019",
    url: "https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/",
    note: "18 evidence-based guidelines for how AI systems should behave — before, during, and after things go wrong. AXIS cites these as G1–G18.",
  },
  {
    title: "People + AI Guidebook",
    publisher: "Google PAIR",
    year: "2019, updated for generative AI 2024",
    url: "https://pair.withgoogle.com/guidebook/",
    note: "Pattern-based guidance on mental models, explainability and trust, feedback and control, and graceful failure.",
  },
  {
    title: "Human Interface Guidelines: Generative AI",
    publisher: "Apple",
    year: "2025",
    url: "https://developer.apple.com/design/human-interface-guidelines/generative-ai",
    note: "Platform guidance: disclose where AI is used, be transparent about limits, and let people verify and override results.",
  },
  {
    title: "IBM Design for AI",
    publisher: "IBM",
    year: "2019–present",
    url: "https://www.ibm.com/design/ai/",
    note: "Ethics-grounded fundamentals for AI products; Carbon for AI gives AI-generated content a visually distinct identity.",
  },
  {
    title: "Design Principles for Generative AI Applications",
    publisher: "Weisz et al., IBM Research",
    year: "CHI 2024",
    url: "https://arxiv.org/pdf/2401.14484",
    note: "Six research-backed principles, including designing for imperfection and for appropriate trust.",
  },
  {
    title: "Sycophancy in Generative-AI Chatbots",
    publisher: "Nielsen Norman Group — Caleb Sponheim",
    year: "2024",
    url: "https://www.nngroup.com/articles/sycophancy-generative-ai-chatbots/",
    note: "Documents models agreeing with users to win approval — a core honest-expectations failure.",
  },
  {
    title: "AI Chatbots Discourage Error Checking",
    publisher: "Nielsen Norman Group — Pavel Samsonov",
    year: "2025",
    url: "https://www.nngroup.com/articles/ai-chatbots-discourage-error-checking/",
    note: "Shows that confident, polished output suppresses verification — why visible confidence and provenance matter.",
  },
  {
    title: "Human-Centered AI",
    publisher: "Ben Shneiderman — Oxford University Press",
    year: "2022",
    url: "https://hcil.umd.edu/human-centered-ai/",
    note: "Argues high automation and high human control can — and must — coexist.",
  },
  {
    title: "NIST AI Risk Management Framework (AI RMF 1.0)",
    publisher: "NIST",
    year: "2023",
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
    note: "Defines seven trustworthiness characteristics at the system level, including transparency and explainability.",
  },
  {
    title: "ISO/IEC 42001:2023 — AI management systems",
    publisher: "ISO/IEC JTC 1/SC 42",
    year: "2023",
    url: "https://www.iso.org/standard/81230.html",
    note: "The certifiable standard for organization-level AI governance, including human oversight requirements.",
  },
  {
    title: "ISO/IEC TR 24028:2020 — Overview of trustworthiness in AI",
    publisher: "ISO/IEC JTC 1/SC 42",
    year: "2020",
    url: "https://www.iso.org/standard/77608.html",
    note: "The international vocabulary for AI trustworthiness: transparency, explainability, controllability, reliability.",
  },
];
