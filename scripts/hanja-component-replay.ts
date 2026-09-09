/** Reproduce the completed phase2 experiment from immutable inputs, not today's runtime. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES } from '../lib/hanja-strokes.ts'
import { runPhase2 } from './hanja-component-phase2.ts'

type Args = Parameters<typeof runPhase2>
type Archive = {
  payload: { input: Args[0]; approved: Args[1]; characters: Args[2]; split: Args[3]; reviewedParts: Args[4] }
  payloadSha256: string
  baseline: {
    approvedCount: number; catalogCount: number; expectedApprovedSnapshotSha256: string
    inputCanonicalSha256: string; recipeHash: string; phase2ResultPath: string
    resultFileSha256: string; resultCanonicalSha256: string
  }
  implementationFreeze: { files: Record<string, string> }
}
const archiveFile = 'docs/hanja-component-phase2-2026-09-09/replay-input.json'
const archiveSha256 = '3b0ad533655bc596704bf529d2accf9a001f203db8381e89d0a4a792f422b70a'
const hash = (value: Uint8Array | string) => createHash('sha256').update(value).digest('hex')
const jsonHash = (value: unknown) => hash(JSON.stringify(value))

export async function replayPhase2(root = resolve(dirname(fileURLToPath(import.meta.url)), '..')) {
  const bytes = await readFile(resolve(root, archiveFile))
  assert.equal(hash(bytes), archiveSha256, 'Frozen replay archive changed')
  const archive = JSON.parse(bytes.toString()) as Archive
  const p = archive.payload, b = archive.baseline
  assert.equal(jsonHash(p), archive.payloadSha256, 'Frozen replay payload changed')
  assert.equal(p.approved.length, b.approvedCount)
  assert.equal(p.characters.length, b.catalogCount)
  // Sort a copy for the historic fingerprint; generation needs the original order.
  assert.equal(jsonHash([...p.approved].sort((a, z) => a.glyph.codePointAt(0)! - z.glyph.codePointAt(0)!)), b.expectedApprovedSnapshotSha256)
  assert.equal(jsonHash(p.input), b.inputCanonicalSha256)
  assert.equal(jsonHash(p.reviewedParts), b.recipeHash)
  await Promise.all(Object.entries(archive.implementationFreeze.files).map(async ([file, expected]) => {
    assert.equal(hash(await readFile(resolve(root, file))), expected, 'Frozen implementation changed: ' + file)
  }))
  const expectedBytes = await readFile(resolve(root, b.phase2ResultPath))
  assert.equal(hash(expectedBytes), b.resultFileSha256, 'Historic result changed')
  const result = runPhase2(p.input, p.approved, p.characters, p.split, p.reviewedParts, { mode: 'validation' })
  assert.deepEqual(result, JSON.parse(expectedBytes.toString()), 'Frozen phase2 result differs')
  assert.equal(jsonHash(result), b.resultCanonicalSha256)
  assert.equal(jsonHash(p), archive.payloadSha256, 'Replay mutated its inputs')
  return { matches: true, archivedApproved: b.approvedCount, currentRuntimeApproved: HANJA_STROKES.length,
    resultSha256: b.resultCanonicalSha256 }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  if (args.length > 1 || (args.length === 1 && args[0] !== '--check')) {
    console.error('Usage: node scripts/hanja-component-replay.ts [--check]')
    process.exitCode = 1
  } else {
    replayPhase2().then((result) => console.log(JSON.stringify(result, null, 2))).catch((error: unknown) => {
      console.error(error instanceof Error ? error.message : String(error))
      process.exitCode = 1
    })
  }
}
