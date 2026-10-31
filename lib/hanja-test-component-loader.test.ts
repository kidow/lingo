import assert from 'node:assert/strict'
import test from 'node:test'
import { createHash } from 'node:crypto'
import { gzipSync } from 'node:zlib'
import { decodeHanjaHistoricalSource, readHanjaHistoricalSource } from './hanja-test-component-loader.ts'

test('compressed evidence authenticates original bytes and rejects corruption', () => {
  const source = Buffer.from('historical source fixture\n')
  const digest = createHash('sha256').update(source).digest('hex')
  const encoded = gzipSync(source).toString('base64')
  assert.deepEqual(decodeHanjaHistoricalSource(encoded, digest), source)
  assert.deepEqual(decodeHanjaHistoricalSource(encoded + '\n', digest), source)
  assert.throws(() => decodeHanjaHistoricalSource(encoded, '0'.repeat(64)), /SHA mismatch/)
  assert.throws(() => decodeHanjaHistoricalSource(Buffer.from('damaged gzip').toString('base64'), digest))
  assert.throws(() => decodeHanjaHistoricalSource(encoded + '!', digest), /base64/)
  assert.throws(() => decodeHanjaHistoricalSource(encoded, '../invalid'), /SHA/)
  const oversized = gzipSync(Buffer.alloc(16 * 1024 * 1024 + 1)).toString('base64')
  assert.throws(() => decodeHanjaHistoricalSource(oversized, digest), /larger than|length|size|buffer/i)
})

test('historical reader rejects unapproved paths and missing authenticated evidence', () => {
  for (const path of ['../package.json', 'scripts/other.mjs', 'lib/../package.json', 'lib/source.ts/extra']) {
    assert.throws(() => readHanjaHistoricalSource(path, '0'.repeat(64)), /Exact historical source/)
  }
  assert.throws(() => readHanjaHistoricalSource('lib/hanja-stroke-outline.ts', '0'.repeat(64)))
  assert.throws(() => readHanjaHistoricalSource('lib/hanja-stroke-outline.ts', 'invalid'), /Exact historical source/)
})

test('test imports resolve existing library aliases and reject traversal or missing modules', async () => {
  // A variable keeps this assertion about Node resolution rather than TypeScript path mapping.
  const approved = '@/lib/hanja-stroke-outline'
  const module: unknown = await import(approved)
  assert(module && typeof module === 'object' && 'outlineStartClip' in module)
  assert.equal(typeof module.outlineStartClip, 'function')
  for (const path of ['@/lib/../package.json', '@/lib/no-such-hanja-module']) {
    await assert.rejects(import(path))
  }
})
