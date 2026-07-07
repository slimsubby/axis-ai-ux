# AXIS — AI eXperience Integrity Standards

**A heuristic framework for trustworthy AI product interfaces, plus an interactive Trust Auditor.**

We have a shared standard for usability (Nielsen's heuristics) and a shared standard for accessibility (WCAG). There is no equivalent for whether an AI interface is *trustworthy* — whether it shows its uncertainty, lets people review and correct output, and keeps humans in control of consequential actions. AXIS is a first attempt at that standard: eight concise, opinionated heuristics, and an auditor you can run against any AI feature in a few minutes.

## The eight heuristics

1. **Visible confidence** — signal how sure the system is, and mark the parts it is least sure about.
2. **Reviewable output** — let people see and inspect what the AI produced before it is used or sent.
3. **Cheap correction** — allow editing or overriding output in place; never force a full restart to fix one thing.
4. **Graceful recovery** — provide a clear way back when the AI is wrong: undo, retry, or escalate.
5. **Human control on consequential actions** — require explicit confirmation before anything irreversible or high-impact.
6. **Honest expectations** — don't imply certainty or ability the system lacks; label AI-generated content.
7. **Preserved context** — don't silently drop what the user provided; keep their inputs visible and honoured.
8. **Shown provenance** — make output verifiable: show sources, inputs used, or how it was produced.

The full framework — each heuristic's rationale, what good looks like, and its audit question — lives in [`data/heuristics.ts`](data/heuristics.ts) and is rendered on the home page.

## Using the Trust Auditor

Open **/audit**, pick one AI feature (a summariser, an agent, an autocomplete — one feature per audit), and answer each heuristic's question: **Yes / Partly / No / N/A**.

- Scoring: Yes = 1, Partly = 0.5, No = 0; N/A questions are excluded entirely.
- You get an overall percentage, a per-heuristic pass/partial/fail status, and a prioritised fix list built from every No or Partly answer (hard fails first).
- **Copy report** puts a plain-text summary on your clipboard for sharing in a doc, an issue, or Slack.
- Answers persist in `localStorage`, so a refresh doesn't lose progress. Nothing leaves your browser — there is no backend.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

The site is a fully static export (Next.js `output: "export"`) — no server, database, or API keys required.

## Deploying

**Vercel:** import the repo and deploy; zero configuration needed.

**GitHub Pages:** run `npm run build` and publish the `out/` directory. If the site is served from a subpath (e.g. `username.github.io/axis`), set `basePath: "/axis"` in `next.config.mjs` first.

## Contributing

AXIS is a living standard, and v1 is meant to be argued with. Issues and pull requests are welcome:

- **Challenge a heuristic** — if one is wrong, redundant, or missing, open an issue with your reasoning and, ideally, a real product example.
- **Improve the auditor** — better questions and sharper recommendations matter as much as code.
- **v2 ideas** — an AI-assisted audit mode (paste a feature description, get suggested answers to review) is stubbed in [`components/TrustAuditor.tsx`](components/TrustAuditor.tsx).

## Licence

[MIT](LICENSE).

## Author

**Bello Teslim Olasubomi** — [Portfolio](https://slimsubbydesigns.webflow.io/) · [LinkedIn](https://www.linkedin.com/in/teslim-bello-olasubomi/)
