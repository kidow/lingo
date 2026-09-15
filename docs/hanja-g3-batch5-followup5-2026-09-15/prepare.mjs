/** Read-only reconstruction of the whole-glyph authored review. */
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { textbookAuthoredSha256 } from '../../scripts/hanja-stroke-textbook-authored.ts'
import { buildTextbookBundle } from '../../scripts/hanja-stroke-textbook-build.ts'
const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export function prepare() {
  const scope = json('./sources.json'), observation = json('./observations.json')
  const queue = json('../hanja-g3-batch5-2026-09-15/queue.json')
  const item = scope.entries[0]
  assert.deepEqual(scope.glyphs, ['玆'])
  assert.equal(observation.glyph, item.glyph)
  assert.equal(observation.decision, 'matched')
  assert.deepEqual(observation.sourceVideo, item.sourceVideo)
  const paths = json('./proposals.json')[item.glyph].map(points => 'M' + points.map(p => p.join(' ')).join(' L'))
  const authored = {
    id: 'vivasam-g3-batch5-followup5-7386-authored-v1', glyph: item.glyph,
    sourceVideoSha256: item.sourceVideo.sha256,
    paths, pathsSha256: hash(paths),
    authoredPathIndices: paths.map((_, i) => i + 1), borrowedParts: [],
    notes: observation.notes,
  }
  const record = {
    glyph: item.glyph, sourceGlyph: item.glyph, manifestRow: item.manifest.manifestRow,
    videoFilename: item.manifest.videoFilename, expectedStrokes: item.strokes,
    candidateStrokes: paths.length, geometrySource: textbookAuthoredSha256(authored),
    geometryAuthored: authored.id, status: 'matched', reviewedAt: observation.reviewedAt,
    reviewer: observation.reviewer, reviewMethod: observation.reviewMethod,
    sourceVideo: item.sourceVideo, durationSeconds: observation.durationSeconds,
    strokeEndsSeconds: observation.ends, checks: observation.checks,
    notes: observation.notes.join(' ') + ' Evidence: docs/hanja-g3-batch5-followup5-2026-09-15/.',
    pathsSha256: authored.pathsSha256,
  }
  const ledger = { sourceId: queue.publisher.id, manifestSha256: queue.publisher.manifestSha256,
    geometrySha256: queue.geometry.Ko.sha256, records: [record] }
  const manifest = { source: { id: queue.publisher.id, sha256: queue.publisher.manifestSha256,
    url: queue.publisher.manifestUrl }, entries: [item.manifest] }
  const character = json('../../content/hanja/characters/g3.json').characters.find(e => e.glyph === item.glyph)
  const bundle = buildTextbookBundle(manifest, [character], [], ledger, [], [], { entries: [authored], donors: [] })
  return { records: [record], entries: [authored], characters: bundle.characters, geometrySources: bundle.geometrySources }
}
