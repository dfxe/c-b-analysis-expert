/** @type {import('next').NextConfig} */
const repo = "c-b-analysis-expert";
// eslint-disable-next-line no-undef
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  basePath: isPages ? `/${repo}` : "",
  assetPrefix: isPages ? `/${repo}/` : "",
  trailingSlash: true,
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
