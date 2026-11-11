/// <reference types="vitest/config" />
import { readFileSync } from "node:fs"
import { fileURLToPath, URL } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

import { precompress } from "./build/plugins/precompress.ts"
import { seo } from "./build/plugins/seo.ts"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_")
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const siteUrl = env.VITE_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:5173")
  process.env.VITE_SITE_URL = siteUrl
  const isVercel = Boolean(process.env.VERCEL)
  const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")) as {
    version: string
  }

  return {
    plugins: [
      react(),
      seo(siteUrl),
      !isVercel && precompress(),
    ],
    define: { __APP_VERSION__: JSON.stringify(version) },
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    server: {
      port: 5173,
      proxy: { "/api": { target: "http://localhost:8000", changeOrigin: true } },
    },
    preview: { port: 4173 },
    build: {
      target: "es2022",
      sourcemap: false,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 600,
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: "react",
                test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/,
                priority: 40,
              },
              {
                name: "mantine",
                test: /node_modules[\\/](@mantine[\\/](?!charts)|@floating-ui)/,
                priority: 30,
              },
              {
                name: "charts",
                test: /node_modules[\\/](recharts|d3-[^\\/]+|@mantine[\\/]charts|victory-vendor)[\\/]/,
                priority: 20,
              },
              { name: "vendor", test: /node_modules/, priority: 10 },
            ],
          },
        },
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
      env: { VITE_USE_MOCKS: "true", VITE_SITE_URL: "https://example.com" },
      css: false,
      include: ["src/**/*.test.{ts,tsx}", "build/**/*.test.ts"],
    },
  }
})
