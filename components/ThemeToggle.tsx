"use client";

import { useEffect, useState } from "react";

/**
 * Light/dark toggle. The effective theme is the .dark class on <html>,
 * applied before paint by the inline script in app/layout.tsx (system
 * preference unless the user has chosen). Choices persist in localStorage.
 */
export default function ThemeToggle() {
  // null until mounted - the server can't know the theme, so we render a
  // neutral placeholder first to avoid a hydration mismatch.
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem("axis-theme", next ? "dark" : "light");
    } catch {
      // Storage blocked - the toggle still works for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      // Announce the action, not the icon (WCAG 4.1.2).
      aria-label={
        isDark === null
          ? "Toggle dark mode"
          : isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
      }
      className="rounded-md border border-line p-2 text-ink-muted hover:border-ink-faint hover:text-ink"
    >
      {/* Sun in dark mode (what you'll switch to is light), moon in light. */}
      {isDark ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}
