import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_SHENG_STROKES, loadG2ShengDictionaryBundle } from './hanja-stroke-dictionary-g2-sheng.ts'
import { buildG2ShengDictionaryBundle, G2_SHENG_DICTIONARY_PROOF_PINS, validateG2ShengDictionaryProofs, validateG2ShengDictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-sheng.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (p: string) => readFileSync(new URL('../' + p, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-sheng-2026-09-16/'
const original = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; medians: number[][][]; paths: string[] }[]
}).entries[0]
const entry = HANJA_DICTIONARY_G2_SHENG_STROKES[0]
const points = (p: string) => [...p.matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])

test('晟 plays eleven strokes with distinct ten-stage dictionary and official correction provenance', () => {
  validateG2ShengDictionaryBundle()
  assert.equal(entry.paths.length, 11)
  assert.equal(entry.verificationSource, 'ehanja-crosschecked')
  assert.equal(entry.sourceReference.orderUrl, 'https://www.hanja.re.kr/klea/counsel/hanjaDetail.do?id=10026')
  assert.equal(entry.sourceReference.dictionaryDirectionStrokes, '1,2,3,4,5,6,7,8,9,10')
  assert.equal(hanjaStrokeData({ glyph: '晟', strokes: 10 }), null)
  assert.deepEqual(hanjaStrokeData({ glyph: '晟', strokes: 11 }), entry)
  assert.equal(hanjaStrokeData({ glyph: '晟', strokes: 12 }), null)
  assert.deepEqual(dictionaryGeometry('晟', original.medians).paths, entry.paths)
  validateDictionaryReview(entry, 11)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
  const catalog = JSON.parse(read('content/hanja/characters/g2.json')).characters.find((c: { glyph: string }) => c.glyph === '晟')
  const candidate = [{ character: '晟', medians: original.medians, strokes: original.paths }]
  const audit = auditStrokes([catalog], [], [entry], [], candidate)
  assert.equal(audit.verificationSources.dictionary, 1)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes([catalog], [], [entry], candidate, []), /geometry mismatch/)
})

test('dictionary playback swaps licensed 5/6 and official boundary splits the inner hook without adding geometry', () => {
  assert.deepEqual(entry.sourceStrokeIndices, [1,2,null,4,6,5,null,null,8,9,10])
  assert.equal(entry.paths[4], original.paths[5])
  assert.equal(entry.paths[5], original.paths[4])
  const upper = points(entry.paths[6]), lower = points(entry.paths[7])
  assert.deepEqual(upper.at(-1), lower[0])
  assert.deepEqual([...upper, ...lower.slice(1)], points(original.paths[6]))
  assert.ok(upper.at(-1)![0] > upper[0][0])
  assert.ok(lower.at(-1)![0] < lower[0][0])
  assert.ok(Math.max(...lower.map(p => p[1])) > lower.at(-1)![1])
  assert.ok(points(entry.paths[2]).at(-1)![0] > points(original.paths[2]).at(-1)![0] + 5)
  for (const [target, source] of [[0,0],[1,1],[3,3],[4,5],[5,4],[8,7],[9,8],[10,9]])
    assert.equal(entry.paths[target], original.paths[source])
  const wrongOrder = { ...entry, paths: [...entry.paths] }
  ;[wrongOrder.paths[4], wrongOrder.paths[5]] = [wrongOrder.paths[5], wrongOrder.paths[4]]
  assert.throws(() => validateDictionaryReview(wrongOrder, 11), /published entry/)
  const joined = structuredClone(entry)
  joined.paths = original.paths
  assert.throws(() => validateDictionaryReview(joined, 11), /published entry/)
})

test('proof pins cover the non-identity SVG playback mapping and two distinct official evidence sources', () => {
  for (const file of Object.keys(G2_SHENG_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2ShengDictionaryProofs(p => read(p) + (p === file ? ' ' : '')), /proof mismatch/)
  const source = JSON.parse(read(dir + 'source-checks.json'))
  assert.equal(source.entries[0].svg.title, '晟')
  assert.equal(source.entries[0].svg.animated, 10)
  assert.deepEqual(source.entries[0].strokes.map((s: { xmlIndex: number }) => s.xmlIndex), [7,8,9,10,1,2,3,4,5,6])
  const basis = JSON.parse(read(dir + 'count-basis.json'))
  assert.equal(basis.wholeGlyphElevenStageSourceFound, false)
  assert.equal(basis.officialCount.id, '10026')
  assert.equal(basis.officialComponent.sourceRow, 19)
  assert.deepEqual(basis.dictionaryToRuntime, [1,2,3,4,5,6,7,7,8,9,10])
  const malformed = structuredClone(buildG2ShengDictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2ShengDictionaryBundle(malformed), /entry mismatch/)
  const falselyRelabeled = structuredClone(buildG2ShengDictionaryBundle())
  falselyRelabeled.characters[0].sourceReference.dictionaryDirectionStrokes += ',11'
  assert.throws(() => loadG2ShengDictionaryBundle(falselyRelabeled), /entry mismatch/)
  assert.throws(() => validateG2ShengDictionaryBundle([]), /published bundle/)
})
