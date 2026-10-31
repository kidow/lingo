import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { registerHooks } from 'node:module'
import { fileURLToPath } from 'node:url'

// Node's test runner does not apply the app bundler's extensionless TS resolution.
// Keep the existing RAM-transpiled component tests; resolve only repository lib imports.
const libraryURL = new URL('./', import.meta.url)
/** Read archived evidence only; never substitute a mutable production file. */
export function readHanjaHistoricalSource(originalPath: string, expectedSHA256: unknown): Buffer {
  if (!/^(?:lib|components\/hanja)\/[a-z0-9-]+(?:\.test)?\.tsx?$/.test(originalPath)
    || typeof expectedSHA256 !== 'string' || !/^[a-f0-9]{64}$/.test(expectedSHA256)) throw new Error('Exact historical source path and SHA required')
  const docs = new URL('../docs/', import.meta.url)
  const filename = originalPath.replaceAll('/', '__') + '.source.txt'
  for (const folder of readdirSync(docs).filter(name => name.startsWith('hanja-component-evidence-'))) {
    const candidate = new URL(folder + '/' + filename, docs)
    if (!existsSync(candidate)) continue
    const bytes = readFileSync(candidate)
    if (createHash('sha256').update(bytes).digest('hex') === expectedSHA256) return bytes
  }
  throw new Error('Missing exact historical source snapshot: ' + originalPath)
}
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (/^@\/lib\/[A-Za-z0-9-]+(?:\.ts)?$/.test(specifier)) {
      const name = specifier.slice('@/lib/'.length)
      const candidate = new URL(name.endsWith('.ts') ? name : name + '.ts', libraryURL)
      if (existsSync(fileURLToPath(candidate))) return nextResolve(candidate.href, context)
    }
    if (specifier.startsWith('./') || specifier.startsWith('../')) {
      const parent = context.parentURL
      if (parent?.startsWith(libraryURL.href) && !/\.[a-z]+$/i.test(specifier)) {
        const candidate = new URL(specifier + '.ts', parent)
        if (candidate.href.startsWith(libraryURL.href) && existsSync(fileURLToPath(candidate))) {
          return nextResolve(candidate.href, context)
        }
      }
    }
    return nextResolve(specifier, context)
  },
})
