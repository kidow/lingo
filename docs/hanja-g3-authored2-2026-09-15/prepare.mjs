/** Read-only reconstruction of the two whole-glyph authored reviews. */
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { textbookAuthoredSha256 } from '../../scripts/hanja-stroke-textbook-authored.ts'
import { buildTextbookBundle } from '../../scripts/hanja-stroke-textbook-build.ts'
const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
export function prepare() {
  const scope = json('./scope.json'), observations = json('./observations.json')
  const queue = json('./queue.json'), proposals = json('./proposals.json')
  assert.deepEqual(scope.glyphs, ['畓', '屛'])
  const entries = [], records = []
  for (const item of queue.entries) {
    const observation = observations.entries.find(e => e.glyph === item.glyph)
    assert.ok(observation)
    assert.equal(observation.decision, 'matched')
    assert.equal(item.manifest.glyph, item.glyph)
    assert.deepEqual(observation.sourceVideo, item.sourceVideo)
    const paths = proposals[item.glyph].map(points => 'M' + points.map(p => p.join(' ')).join(' L'))
    assert.equal(paths.length, item.strokes)
    const authored = {
      id: 'vivasam-g3-authored2-' + item.glyph.codePointAt(0).toString(16) + '-v1',
      glyph: item.glyph, sourceVideoSha256: item.sourceVideo.sha256,
      paths, pathsSha256: hash(paths),
      authoredPathIndices: paths.map((_, i) => i + 1), borrowedParts: [], notes: observation.notes,
    }
    entries.push(authored)
    records.push({
      glyph: item.glyph, sourceGlyph: item.glyph, manifestRow: item.manifest.manifestRow,
      videoFilename: item.manifest.videoFilename, expectedStrokes: item.strokes,
      candidateStrokes: paths.length, geometrySource: textbookAuthoredSha256(authored),
      geometryAuthored: authored.id, status: 'matched', reviewedAt: observation.reviewedAt,
      reviewer: observation.reviewer, reviewMethod: observation.reviewMethod,
      sourceVideo: item.sourceVideo, durationSeconds: observation.durationSeconds,
      strokeEndsSeconds: observation.ends, checks: observation.checks,
      notes: observation.notes.join(' ') + ' Evidence: docs/hanja-g3-authored2-2026-09-15/.',
      pathsSha256: authored.pathsSha256,
    })
  }
  const ledger = { sourceId: queue.publisher.id, manifestSha256: queue.publisher.manifestSha256,
    geometrySha256: queue.geometry.Ko.sha256, records }
  const manifest = { source: { id: queue.publisher.id, sha256: queue.publisher.manifestSha256,
    url: queue.publisher.manifestUrl }, entries: queue.entries.map(e => e.manifest) }
  const catalog = json('../../content/hanja/characters/g3.json').characters
  const characters = scope.glyphs.map(glyph => catalog.find(e => e.glyph === glyph))
  assert.ok(characters.every(Boolean))
  const bundle = buildTextbookBundle(manifest, characters, [], ledger, [], [], { entries, donors: [] })
  return { records, entries, characters: bundle.characters, geometrySources: bundle.geometrySources }
}
