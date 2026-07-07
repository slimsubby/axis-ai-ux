export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-ink-muted sm:flex-row sm:items-baseline sm:justify-between sm:px-8">
        <p>
          AXIS — AI eXperience Integrity Standards. Open source under the MIT
          licence.
        </p>
        <p>
          A living standard —{" "}
          <a
            href="https://github.com"
            className="underline decoration-line underline-offset-4 hover:text-ink"
          >
            contributions welcome
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
