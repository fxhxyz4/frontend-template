#!/usr/bin/env node
import { execSync } from "node:child_process"

if (process.env.SKIP_BRANCH_CHECK) process.exit(0)

const PERMANENT = ["main", "develop"]
const TYPES = [
  "feat",
  "fix",
  "hotfix",
  "refactor",
  "perf",
  "docs",
  "test",
  "chore",
  "ci",
  "style",
  "release",
]
const pattern = new RegExp(`^(${TYPES.join("|")})/[a-z0-9][a-z0-9._-]*$`)

let branch
try {
  branch = execSync("git symbolic-ref --short HEAD", {
    stdio: [
      "ignore",
      "pipe",
      "ignore",
    ],
  })
    .toString()
    .trim()
} catch {
  process.exit(0) // detached HEAD (rebase, CI)
}

if (PERMANENT.includes(branch) || pattern.test(branch)) process.exit(0)

console.error(`
✖ "${branch}"
`)
process.exit(1)
