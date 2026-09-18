/** Derive review queues from captured metadata; never enables runtime animations. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES, hanjaStrokeData } from '../../lib/hanja-strokes.ts'

const read = path => readFileSync(new URL(path, import.meta.url))
const json = path => JSON.parse(read(path))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const records = snapshot => snapshot.rows.map(row => Object.fromEntries(snapshot.fields.map((key, i) => [key, row[i]])))

export function plan() {
  const inventory = json('./inventory.json'), dictionary = json('./dictionary-inventory.json')
  assert.equal(inventory.catalog.sha256, dictionary.catalog.sha256)
  const candidates = records(inventory), sourceRows = records(dictionary)
  assert.deepEqual(candidates.map(c => c.glyph), sourceRows.map(c => c.glyph))
  const sourceByGlyph = new Map(sourceRows.map(row => [row.glyph, row]))
  const geometryStatus = new Map(Object.entries(inventory.geometryGroups).flatMap(([group, glyphs]) => glyphs.map(glyph => [glyph, group])))
  const sourceStatus = new Map(Object.entries(dictionary.groups).flatMap(([group, glyphs]) => glyphs.map(glyph => [glyph, group])))
  assert.deepEqual(Object.keys(inventory.geometryGroups).sort(), ['countMatch', 'countReview', 'missing'].sort())
  assert.deepEqual(Object.keys(dictionary.groups).sort(), ['countMatched', 'countReview', 'metadataReview', 'unavailable'].sort())
  for (const groups of [inventory.geometryGroups, dictionary.groups]) {
    const glyphs = Object.values(groups).flat()
    assert.equal(glyphs.length, candidates.length)
    assert.equal(new Set(glyphs).size, candidates.length)
    assert.deepEqual([...glyphs].sort(), candidates.map(c => c.glyph).sort())
  }

  const groups = { wholeStrokeReview: [], sourceCountReview: [], sourceMetadataReview: [], sourceUnavailable: [], geometryCountReview: [], geometryNeeded: [] }
  for (const row of candidates) {
    const source = sourceStatus.get(row.glyph), geometry = geometryStatus.get(row.glyph)
    assert.ok(['countMatched', 'countReview', 'metadataReview', 'unavailable'].includes(source))
    assert.ok(['countMatch', 'countReview', 'missing'].includes(geometry))
    const group = source === 'unavailable' ? 'sourceUnavailable'
      : source === 'metadataReview' ? 'sourceMetadataReview'
      : source === 'countReview' ? 'sourceCountReview'
      : geometry === 'missing' ? 'geometryNeeded'
      : geometry === 'countReview' ? 'geometryCountReview' : 'wholeStrokeReview'
    groups[group].push(row.glyph)
  }
  const size = glyphs => ({ characters: glyphs.length, strokes: candidates.filter(c => glyphs.includes(c.glyph)).reduce((n, c) => n + c.catalogStrokes, 0) })

  // 카탈로그 순서를 지키며 앞에서부터 50자. 같은 획수 후보가 여럿이면 기존 기준 Ko → MM → Ja 순이다
  const first = groups.wholeStrokeReview.slice(0, 50).map(glyph => {
    const candidate = candidates.find(c => c.glyph === glyph), source = sourceByGlyph.get(glyph)
    const selected = ['Ko', 'MM', 'Ja'].find(id => candidate[id + 'Strokes'] === candidate.catalogStrokes)
    assert.ok(selected)
    return { glyph, strokes: candidate.catalogStrokes, dictionaryUrl: source.svgUrl, dictionarySha256: source.svgSha256, candidate: selected,
      candidateSourceUrl: inventory.geometry[selected].url, candidateSourceSha256: inventory.geometry[selected].sha256,
      status: 'awaiting-complete-order-direction-boundary-and-form-review' }
  })

  const grades = readdirSync(new URL('../../content/hanja/characters/', import.meta.url)).filter(file => file.endsWith('.json')).sort().map(file => {
    const catalog = json('../../content/hanja/characters/' + file)
    const enabled = catalog.characters.filter(c => hanjaStrokeData(c))
    return { file, characters: catalog.characters.length, applied: enabled.length, remaining: catalog.characters.length - enabled.length }
  })
  const total = grades.reduce((n, g) => n + g.characters, 0)

  return {
    summary: {
      schemaVersion: 1, checkedAt: '2026-09-18', scope: '특급II 신규 배정 1,150자; metadata inventory, not stroke approval.',
      inputs: ['inventory.json', 'dictionary-inventory.json'].map(file => ({ file, sha256: hash(read('./' + file)) })),
      catalog: inventory.catalog,
      publisher: { listed: inventory.publisher.matches, listedGlyphs: inventory.publisher.matchedGlyphs,
        note: '교과서 1,800자 목록과 겹치는 글자만 영상 존재를 확인했다. 이 경로는 사전보다 앞선 출처이므로 해당 글자는 별도 검토로 남긴다.' },
      dictionary: Object.fromEntries(Object.entries(dictionary.groups).map(([key, glyphs]) => [key, size(glyphs)])),
      geometry: Object.fromEntries(Object.entries(inventory.geometryGroups).map(([key, glyphs]) => [key, size(glyphs)])),
      actionQueue: Object.fromEntries(Object.entries(groups).map(([key, glyphs]) => [key, { ...size(glyphs), glyphs }])),
      runtimeApprovalsAdded: 0, proprietaryAssetsSaved: 0,
    },
    nextBatch: {
      schemaVersion: 1, title: '특급II 첫 전체 획 검토 후보', basis: 'Exact dictionary title, consistent source metadata and at least one licensed candidate with matching catalog stroke count. These are intake conditions, not approval.',
      characters: first.length, strokes: first.reduce((n, row) => n + row.strokes, 0), entries: first,
      requiredReview: ['Observe every source stroke in delay order, including the initial stroke.', 'Compare direction, stroke boundaries, pen lifts and final glyph form against the selected licensed candidate.', 'Record character-specific differences; never auto-split or substitute glyphs from count or radicals alone.', 'Promote only completed records under their actual source provenance.'],
      runtimeApprovalsAdded: 0,
    },
    progress: { checkedAt: '2026-09-18', total, applied: HANJA_STROKES.length, remaining: total - HANJA_STROKES.length,
      appliedPercent: Math.round(HANJA_STROKES.length / total * 1000) / 10, addedThisTask: 0, grades },
  }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) console.log(JSON.stringify(plan()))
