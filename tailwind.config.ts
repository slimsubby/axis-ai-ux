import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  // Dark mode is toggled by adding .dark to <html> (see ThemeToggle and the
  // inline script in app/layout.tsx). Colours are CSS variables defined in
  // app/globals.css, so both themes share these class names.
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Single accent colour, used sparingly. Everything else is ink/paper.
        accent: {
          DEFAULT: "#2C46E0", // button fill — white text passes AA in both themes
          // Accent-coloured text: darkened on white, lightened on dark paper.
          dark: "var(--color-accent-text)",
          // Subtle tint for backgrounds behind accent-coloured text.
          wash: "var(--color-accent-wash)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",       // body text
          muted: "var(--color-ink-muted)",   // secondary text — AA in both themes
          faint: "var(--color-ink-faint)",   // borders/decoration only, never text
        },
        paper: "var(--color-paper)",
        line: "var(--color-line)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        measure: "42rem", // comfortable reading measure for prose
      },
    },
  },
  plugins: [],
};

export default config;
