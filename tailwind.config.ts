import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Single accent colour, used sparingly. Everything else is ink/paper.
        accent: {
          DEFAULT: "#2C46E0",
          // Darkened variant that still passes AA on white for small text.
          dark: "#2338B8",
          // Very light tint for backgrounds behind accent-coloured text.
          wash: "#EEF1FD",
        },
        ink: {
          DEFAULT: "#16181D", // near-black body text
          muted: "#5A6070",   // secondary text — ≈6.3:1 on white, passes AA
          faint: "#8A8F9C",   // ≈3.2:1 on white — borders/decoration only, never text
        },
        paper: "#FFFFFF",
        line: "#E5E7EB",
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
