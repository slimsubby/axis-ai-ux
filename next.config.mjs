/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site is client-side, so it can be served from
  // any static host (Vercel, GitHub Pages, Netlify) with no server runtime.
  output: "export",
  // GitHub Pages serves directories, not rewrites - trailing slashes make
  // /audit resolve to /audit/index.html.
  trailingSlash: true,
  // `npm run dev` (see package.json) uses a separate cache directory so a
  // production build can never corrupt a running dev server's cache. The
  // dev server gets the custom directory; builds keep the default .next so
  // the static export lands in the standard out/ folder for deploys.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
