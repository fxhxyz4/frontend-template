const scopes = [
  "app",
  "pages",
  "home",
  "dashboard",
  "analytics",
  "shared",
  "ui",
  "api",
  "styles",
  "seo",
  "tests",
  "deps",
  "docker",
  "ci",
  "config",
  "release",
]

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "perf",
        "refactor",
        "style",
        "test",
        "docs",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "scope-enum": [
      1,
      "always",
      scopes,
    ],
    "subject-case": [0],
    "subject-max-length": [
      2,
      "always",
      72,
    ],
    "header-max-length": [
      2,
      "always",
      100,
    ],
    "body-max-line-length": [
      1,
      "always",
      100,
    ],
  },
  ignores: [message => /^(Merge|Revert) /.test(message)],
}
