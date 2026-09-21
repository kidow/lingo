import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-variant-kanjivg-batch13.json' with { type: 'json' }
import { loadVariantKanjiVGBatch13Strokes } from './hanja-stroke-dictionary-variant-kanjivg-batch13.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { hanjaPlaybackVariant } from './hanja-stroke-variants.ts'
import type { HanjaCharacter } from './hanja.ts'
const dir = new URL('../content/hanja/characters/', import.meta.url)
const catalog: HanjaCharacter[] = readdirSync(dir).filter(f => f.endsWith('.json')).flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const sha = (s: string) => createHash('sha256').update(s).digest('hex')
const read = (f: string) => JSON.parse(readFileSync(new URL('../docs/hanja-goal-variant-kanjivg-batch13-2026-09-22/' + f, import.meta.url), 'utf8'))

test('禦는 배정표 16획을 보존하고 검증된 17획 변형을 재생한다', () => {
  const character = catalog.find(c => c.glyph === '禦')!
  const data = hanjaStrokeData(character)!
  assert.equal(character.strokes, 16)
  assert.equal(data.paths.length, 17)
  assert.deepEqual(hanjaPlaybackVariant(character)?.variant, { catalogStrokes: 16, playbackStrokes: 17, form: '사전' })
  assert.equal(hanjaPlaybackVariant({ glyph: '禦', strokes: 17 }), null)
  assert.equal(hanjaStrokeData({ glyph: '禦', strokes: 17 }), null)
  assert.equal(HANJA_STROKES.filter(e => e.glyph === '禦').length, 1)
  assert.equal(sha(JSON.stringify(data.paths)), reviewed[0].pathsSha256)
  assert.equal('strokeWidth' in data && data.strokeWidth, 400 / 109)
})

test('출처 해시·순서·정규화 누적 경로를 빌드에서 재현한다', () => {
  const reproduced = JSON.parse(execFileSync(process.execPath, [fileURLToPath(new URL('../docs/hanja-goal-variant-kanjivg-batch13-2026-09-22/build.mjs', import.meta.url))], { encoding: 'utf8' }))
  assert.deepEqual(reviewed, reproduced)
  const normalized = read('normalized.json').entries.find((e: { glyph: string }) => e.glyph === '禦')
  assert.deepEqual(reviewed[0].paths, normalized.paths)
  assert.deepEqual(reviewed[0].sourceStrokeIndices, Array.from({ length: 17 }, (_, i) => i + 1))
  assert.equal(normalized.strokeWidth, reviewed[0].strokeWidth)
  const findings = read('findings.json')
  assert.equal(findings.entries.find((e: { glyph: string }) => e.glyph === '禦').normalizedCumulativeStates, 17)
  assert.equal(findings.entries.find((e: { glyph: string }) => e.glyph === '禦').decision, 'approved')
})

test('미검증 변형·굵기·순서·출처·라이선스 교체를 거부한다', () => {
  const variant = structuredClone(reviewed)
  variant[0].variant.catalogStrokes = 17
  assert.throws(() => loadVariantKanjiVGBatch13Strokes(variant))
  const order = structuredClone(reviewed)
  order[0].sourceStrokeIndices = [2, 1, ...order[0].sourceStrokeIndices.slice(2)]
  assert.throws(() => loadVariantKanjiVGBatch13Strokes(order))
  const source = structuredClone(reviewed)
  source[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadVariantKanjiVGBatch13Strokes(source))
  const license = structuredClone(reviewed)
  license[0].geometryLicense.spdx = 'unknown'
  assert.throws(() => loadVariantKanjiVGBatch13Strokes(license))
  for (const strokeWidth of [5, 4.6, 300 / 109, 0, Number.NaN, undefined]) {
    const changed = { ...reviewed[0], strokeWidth }
    assert.throws(() => loadVariantKanjiVGBatch13Strokes([changed as typeof reviewed[number]]))
  }
  assert.throws(() => loadVariantKanjiVGBatch13Strokes([...reviewed, reviewed[0]]))
})

test('褐·菱의 경로 차이는 획수 일치만으로 승인하지 않는다', () => {
  for (const glyph of ['褐', '菱']) {
    const character = catalog.find(c => c.glyph === glyph)!
    assert.equal(hanjaStrokeData(character), null)
    assert.equal(read('findings.json').entries.find((e: { glyph: string }) => e.glyph === glyph).decision, 'held')
  }
  assert.equal(read('findings.json').entries.find((e: { glyph: string }) => e.glyph === '褐').alternativeReview.reviewedStrokes.length, 13)
})
