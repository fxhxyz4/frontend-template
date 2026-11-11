import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

const publicApiOnly = {
  group: ["@/features/*/*"],
  message: "Імпортуй з '@/features/<name>' - публічний API модуля (index.ts).",
}
const forbid = (layers, why) => ({
  group: layers.map(l => `@/${l}`).flatMap(p => [p, `${p}/*`]),
  message: why,
})

export default defineConfig([
  globalIgnores([
    "dist",
    "coverage",
    "node_modules",
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: { globals: globals.browser },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "error",
      "no-restricted-imports": ["error", { patterns: [publicApiOnly] }],
    },
  },
  {
    files: ["src/pages/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [publicApiOnly, forbid(["app"], "pages не знають про app (роутер, лейаут).")] },
      ],
    },
  },
  {
    files: ["src/features/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            forbid(["app", "pages"], "features не імпортують app/pages."),
            {
              group: ["@/features/*", "@/features/*/*"],
              message: "Фіча не імпортує іншу фічу. Спільне - винеси в shared або збери на рівні page.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/shared/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            forbid(
              [
                "app",
                "pages",
                "features",
              ],
              "shared - найнижчий шар, ні від кого не залежить."
            ),
          ],
        },
      ],
    },
  },
  {
    files: ["src/**/*.test.{ts,tsx}", "src/test/**"],
    rules: { "react-refresh/only-export-components": "off", "no-restricted-imports": "off" },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
  prettier,
])
