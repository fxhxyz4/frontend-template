import { readdir, readFile, stat, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { brotliCompress, constants, gzip } from "node:zlib"
import { promisify } from "node:util"

import type { Plugin, ResolvedConfig } from "vite"

const gz = promisify(gzip)
const br = promisify(brotliCompress)
const COMPRESSIBLE = /\.(js|mjs|css|html|svg|json|xml|txt|webmanifest)$/

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

export function precompress(minSize = 1024): Plugin {
  let config: ResolvedConfig
  return {
    name: "app:precompress",
    apply: "build",
    configResolved(c) {
      config = c
    },
    async writeBundle() {
      const outDir = join(config.root, config.build.outDir)
      for await (const file of walk(outDir)) {
        if (!COMPRESSIBLE.test(file) || (await stat(file)).size < minSize) continue
        const data = await readFile(file)
        await Promise.all([
          writeFile(`${file}.gz`, await gz(data, { level: 9 })),
          writeFile(
            `${file}.br`,
            await br(data, { params: { [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY } })
          ),
        ])
      }
    },
  }
}
