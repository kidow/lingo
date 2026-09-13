import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_STROKES } from './hanja-stroke-dictionary.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { dictionaryGeometry, validateDictionaryProofs, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import originals from '../docs/hanja-g3ii-rabbit-2026-09-13/originals.json' with { type: 'json' }
import form from '../docs/hanja-g3ii-rabbit-2026-09-13/form-resolution.json' with { type: 'json' }
import sources from '../docs/hanja-g3ii-rabbit-2026-09-13/sources.json' with { type: 'json' }
import observations from '../docs/hanja-g3ii-rabbit-2026-09-13/observations.json' with { type: 'json' }
import review from '../docs/hanja-g3ii-rabbit-2026-09-13/review.json' with { type: 'json' }

const entry = HANJA_DICTIONARY_STROKES.find(e => e.glyph === '兔')!
const points = (path: string) => [...path.matchAll(/[ML]([-.\d]+) ([-.\d]+)/g)].map(m => [+m[1], +m[2]])
function distanceToPath(point: number[], path: string) {
  const p = points(path)
  return Math.min(...p.slice(1).map((b, i) => {
    const a = p[i], dx = b[0] - a[0], dy = b[1] - a[1]
    const t = Math.max(0, Math.min(1, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / (dx * dx + dy * dy)))
    return Math.hypot(point[0] - a[0] - t * dx, point[1] - a[1] - t * dy)
  }))
}

test('兔 uses a specifically observed compatible form, not blanket variant approval', () => {
  assert.equal(form.status, 'resolved-for-this-source')
  assert.equal(form.glyph, '兔')
  assert.equal(form.sourceGlyph, '兔')
  assert.equal(form.sourceGlyph.normalize('NFC'), form.glyph)
  assert.equal(sources.unicode.record.split(';')[5], '5154')
  assert.deepEqual(sources.formRulings.map(r => new URL(r.url).searchParams.get('id')), ['9815', '6041', '9388'])
  assert.equal(sources.animation.sourceGlyph, form.sourceGlyph)
  assert.equal(entry.sourceReference?.dictionarySvgUrl, sources.animation.sourceUrl)
  assert.equal(sources.animation.dictionaryStrokes, 8)
  assert.deepEqual(hanjaStrokeData({ glyph: '兔', strokes: 8 }), entry)
  assert.equal(hanjaStrokeData({ glyph: '兔', strokes: 8 }), null)
  assert.equal(hanjaStrokeData({ glyph: '兔', strokes: 9 }), null)
  assert.throws(() => dictionaryGeometry('兎', originals.entries[0].medians), /original|Unreviewed/)
})

test('all eight 兔 strokes are observed; only the three local corrections replace MM paths', () => {
  assert.equal(review.runtimeApproved, true)
  assert.deepEqual(review.localCenterlines, [1, 2, 7])
  assert.deepEqual(entry.sourceStrokeIndices, [null, null, 3, 4, 5, 6, null, 8])
  assert.deepEqual(observations.visualReview.activeStrokesViewed, [1, 2, 3, 4, 5, 6, 7, 8])
  assert.deepEqual(observations.rows.map(r => r[1]), [1, 2, 3, 4, 5, 6, 7, 8])
  for (const row of observations.rows) {
    assert.ok(Number(row[2]) > 0 && Number(row[2]) < Number(row[3]))
    assert.equal(Number(row[4]), Number(row[1]) - 1)
    assert.equal(row[5], true)
  }
  const original = normalizeMedians(originals.entries[0].medians)
  for (const n of [3, 4, 5, 6, 8]) assert.equal(entry.paths[n - 1], original[n - 1])
  for (const n of [1, 2, 7]) assert.notEqual(entry.paths[n - 1], original[n - 1])
  assert.deepEqual(dictionaryGeometry('兔', originals.entries[0].medians).paths, entry.paths)
})

test('兔 keeps the knife hook, connected lower leg and separate final dot at width five', () => {
  const first = points(entry.paths[0]), second = points(entry.paths[1]), hook = points(entry.paths[6])
  assert.ok(first[1][0] > first[0][0] && first[1][1] === first[0][1])
  assert.ok(first.at(-1)![0] < first.at(-2)![0] && first.at(-1)![1] < first.at(-2)![1])
  assert.ok(second.at(-1)![0] < second[0][0] && second.at(-1)![1] > second[0][1])
  assert.ok(distanceToPath(second[0], entry.paths[0]) < 1)
  assert.ok(distanceToPath(hook[0], entry.paths[4]) < 1)
  assert.ok(hook.at(-1)![1] < hook.at(-2)![1])
  for (const p of points(entry.paths[7])) {
    assert.ok(distanceToPath(p, entry.paths[5]) > 6)
    assert.ok(distanceToPath(p, entry.paths[6]) > 6)
  }
})

test('兔 approval cannot survive a changed form proof, source or path direction', () => {
  const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
  for (const name of ['form-resolution.json', 'sources.json', 'observations.json', 'review.json', 'corrections.json']) {
    const target = 'docs/hanja-g3ii-rabbit-2026-09-13/' + name
    assert.throws(() => validateDictionaryProofs(p => read(p) + (p === target ? ' ' : '')), /proof mismatch/)
  }
  const copy = structuredClone(entry)
  copy.sourceReference = { ...copy.sourceReference!, dictionarySvgUrl: 'http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/5154.svg' }
  assert.throws(() => validateDictionaryReview(copy, 8), /mismatch/)
  const reversed = structuredClone(originals.entries[0].medians)
  reversed[5].reverse()
  assert.throws(() => dictionaryGeometry('兔', reversed), /original/)
})
