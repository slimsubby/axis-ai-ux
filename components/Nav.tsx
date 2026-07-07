"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Framework" },
  { href: "/audit", label: "Audit" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-baseline justify-between gap-6 px-5 py-5 sm:px-8"
      >
        <Link href="/" className="text-sm font-semibold tracking-tight">
          AXIS
          <span className="sr-only"> — AI eXperience Integrity Standards</span>
        </Link>
        <ul className="flex items-baseline gap-5 sm:gap-8">
          {links.map(({ href, label }) => {
            // trailingSlash is on, so normalise before comparing.
            const current =
              pathname?.replace(/\/+$/, "") === href.replace(/\/+$/, "") ||
              (href === "/" && pathname === "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  className={
                    current
                      ? "text-sm font-medium text-accent-dark"
                      : "text-sm text-ink-muted hover:text-ink"
                  }
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
