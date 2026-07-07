export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-5 py-8 text-sm text-ink-muted sm:flex-row sm:items-baseline sm:justify-between sm:px-8">
        <p>
          Created by{" "}
          <a
            href="https://slimsubbydesigns.webflow.io/"
            className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
          >
            Bello Teslim Olasubomi
          </a>
          {" · "}
          <a
            href="https://www.linkedin.com/in/teslim-bello-olasubomi/"
            className="underline decoration-line underline-offset-4 hover:text-ink"
          >
            LinkedIn
          </a>
        </p>
        <p>
          Open source under the MIT licence.{" "}
          <a
            href="https://github.com/slimsubby/axis-ai-ux"
            className="underline decoration-line underline-offset-4 hover:text-ink"
          >
            Contributions welcome
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
