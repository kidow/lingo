import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch11.json' with { type: 'json' }
import { SPECIAL_KANJIVG_BATCH11_PINS, loadSpecialKanjiVGBatch11Strokes } from './hanja-stroke-dictionary-special-kanjivg-batch11.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = new URL('../content/hanja/characters/', import.meta.url)
const catalog: HanjaCharacter[] = readdirSync(dir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

test('餔의 검토된 16획과 국내 필순을 재현한다', () => {
  const reproduced = JSON.parse(execFileSync(process.execPath,
    [fileURLToPath(new URL('../docs/hanja-goal-special-kanjivg-batch11-2026-09-22/build.mjs', import.meta.url))], { encoding: 'utf8' }))
  assert.deepEqual(reviewed, reproduced)
  const normalized = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch11-2026-09-22/normalized.json', import.meta.url), 'utf8'))
  assert.deepEqual(reviewed.map(({ glyph, sourceStrokeIndices, paths }) => ({ glyph, sourceStrokeIndices, paths })), normalized.entries.filter((entry: { glyph: string }) => entry.glyph === '餔').map(({ glyph, sourceStrokeIndices, paths }: { glyph: string; sourceStrokeIndices: number[]; paths: string[] }) => ({ glyph, sourceStrokeIndices, paths })))
  assert.equal(reviewed.reduce((sum, e) => sum + e.paths.length, 0), 16)
  const findings = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch11-2026-09-22/findings.json', import.meta.url), 'utf8'))
  for (const pin of SPECIAL_KANJIVG_BATCH11_PINS) {
    const character = catalog.find(c => c.glyph === pin.glyph)!
    const data = hanjaStrokeData(character)!
    assert.equal(character.strokes, pin.strokes)
    assert.equal(data.verificationSource, 'ehanja-crosschecked')
    assert.equal(sha(JSON.stringify(data.paths)), pin.pathsSha256)
    assert.deepEqual(data.sourceStrokeIndices, pin.sourceStrokeIndices)
    assert.equal(HANJA_STROKES.filter(e => e.glyph === pin.glyph).length, 1)
    assert.equal(findings.entries.find((e: { glyph: string }) => e.glyph === pin.glyph).decision, 'approved')
  }
  assert.equal(reviewed[0].strokeWidth, 4.6)
  assert.equal('strokeWidth' in hanjaStrokeData(catalog.find(c => c.glyph === '餒')!)!, false)
  assert.equal(reviewed[0].geometrySource, 'd3ee84f52456dd10ebf07fc9bacea98733b6f309eae7038cbbe3ba19d221d1ca')
})

test('순서 변경과 다른 변형·근거·라이선스 교체를 거부한다', () => {
  const order = structuredClone(reviewed)
  order[0].sourceStrokeIndices = [2, 1, ...order[0].sourceStrokeIndices.slice(2)]
  assert.throws(() => loadSpecialKanjiVGBatch11Strokes(order))
  const variant = structuredClone(reviewed)
  variant[0].geometrySource = '1020e71858a48a5ac428bef5a2b95b34072085e663b2fa5dd8a94384defe8ff2'
  assert.throws(() => loadSpecialKanjiVGBatch11Strokes(variant))
  const source = structuredClone(reviewed)
  source[0].sourceReference.dictionarySvgUrl = 'https://example.org/unreviewed'
  assert.throws(() => loadSpecialKanjiVGBatch11Strokes(source))
  const license = structuredClone(reviewed)
  license[0].geometryLicense.spdx = 'unknown'
  assert.throws(() => loadSpecialKanjiVGBatch11Strokes(license))
  assert.throws(() => loadSpecialKanjiVGBatch11Strokes([...reviewed, reviewed[0]]))
})


test('검토하지 않은 굵기와 누락된 굵기를 거부한다', () => {
  for (const strokeWidth of [0, -1, 3, Number.NaN, Number.POSITIVE_INFINITY, undefined]) {
    const changed = { ...reviewed[0], strokeWidth }
    assert.throws(() => loadSpecialKanjiVGBatch11Strokes([changed as typeof reviewed[number]]))
  }
  const data = hanjaStrokeData(catalog.find(c => c.glyph === '餔')!)!
  assert.equal(data.verificationSource, 'ehanja-crosschecked')
  assert.equal('strokeWidth' in data && data.strokeWidth, 4.6)
})

test('鐶의 접합 차이와 敝의 분할 획을 보류한다', () => {
  const source = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch11-2026-09-22/candidates.json', import.meta.url), 'utf8'))
  const entries = source.entries as { glyph: string; dictionaryStrokes: number; candidate: { id: string }; paths: string[] }[]
  const split = entries.find(e => e.candidate.id === '0655d')!
  assert.equal(split.paths.length, 12)
  assert.equal(split.dictionaryStrokes, 11)
  assert.equal(catalog.find(c => c.glyph === '敝')!.strokes, 12)
  const base = entries.find(e => e.candidate.id === '09914')!
  const alt = entries.find(e => e.candidate.id === '09914-Kaisho')!
  assert.deepEqual(base.paths.flatMap((p, i) => p === alt.paths[i] ? [] : [i + 1]), [6, 13, 14])
  assert.deepEqual(reviewed[0].sourceStrokeIndices, [1, 2, 3, 5, 6, 7, 4, 8, 9, 10, 11, 12, 13, 14, 15, 16])
  for (const glyph of ['鐶', '敝']) {
    assert.equal(reviewed.some(e => e.glyph === glyph), false)
    assert.equal(hanjaStrokeData(catalog.find(c => c.glyph === glyph)!), null)
  }
})
