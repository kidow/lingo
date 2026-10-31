import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { registerHooks } from 'node:module'
import { fileURLToPath } from 'node:url'
import { gunzipSync } from 'node:zlib'

// Node's test runner does not apply the app bundler's extensionless TS resolution.
// Keep the existing RAM-transpiled component tests; resolve only repository lib imports.
const libraryURL = new URL('./', import.meta.url)
/** Bound decompression and authenticate original bytes, independently of storage. */
export function decodeHanjaHistoricalSource(encoded: string, expectedSHA256: string): Buffer {
  if (!/^[a-f0-9]{64}$/.test(expectedSHA256) || encoded.length > 24 * 1024 * 1024) {
    throw new Error('Invalid historical source encoding or SHA')
  }
  const canonical = encoded.replace(/\s+/g, '')
  const compressed = Buffer.from(canonical, 'base64')
  if (compressed.toString('base64') !== canonical) throw new Error('Noncanonical historical source base64')
  const bytes = gunzipSync(compressed, { maxOutputLength: 16 * 1024 * 1024 })
  if (createHash('sha256').update(bytes).digest('hex') !== expectedSHA256) {
    throw new Error('Historical source SHA mismatch')
  }
  return bytes
}
/** Read archived evidence only; never substitute a mutable production file. */
export function readHanjaHistoricalSource(originalPath: string, expectedSHA256: unknown): Buffer {
  if ((!/^(?:lib|components\/hanja)\/[A-Za-z0-9-]+(?:\.test)?\.tsx?$/.test(originalPath)
    && !/^content\/hanja\/characters\/[a-z0-9-]+\.json$/.test(originalPath)
    && !/^public\/hanja-strokes\/dictionary-reviewed(?:-[a-z0-9]+)*\.json$/.test(originalPath)
    && originalPath !== 'scripts/hanja-actual-component-review.mjs')
    || typeof expectedSHA256 !== 'string' || !/^[a-f0-9]{64}$/.test(expectedSHA256)) throw new Error('Exact historical source path and SHA required')
  const docs = new URL('../docs/', import.meta.url)
  const filename = originalPath.replaceAll('/', '__') + '.source.txt'
  for (const folder of readdirSync(docs).filter(name => name.startsWith('hanja-component-evidence-'))) {
    const candidate = new URL(folder + '/' + filename, docs)
    if (!existsSync(candidate)) continue
    const bytes = readFileSync(candidate)
    if (createHash('sha256').update(bytes).digest('hex') === expectedSHA256) return bytes
  }
  const compressedDirectory = new URL('hanja-component-evidence-compressed-2026-10-31/', docs)
  const manifestPath = new URL('manifest.json', compressedDirectory)
  if (existsSync(manifestPath)) {
    const manifest: unknown = JSON.parse(readFileSync(manifestPath, 'utf8'))
    if (!manifest || typeof manifest !== 'object' || !('schema' in manifest) || manifest.schema !== 1
      || !('sources' in manifest) || !Array.isArray(manifest.sources)) throw new Error('Invalid historical source manifest')
    const bound = manifest.sources.some((entry: unknown) => entry && typeof entry === 'object'
      && 'originalPath' in entry && entry.originalPath === originalPath
      && 'sha256' in entry && entry.sha256 === expectedSHA256)
    if (bound) {
      const encoded = readFileSync(new URL(expectedSHA256 + '.source.txt.gz.b64', compressedDirectory), 'utf8')
      return decodeHanjaHistoricalSource(encoded, expectedSHA256)
    }
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
