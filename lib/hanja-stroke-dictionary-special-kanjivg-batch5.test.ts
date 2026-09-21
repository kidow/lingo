import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch5.json' with { type: 'json' }
import { SPECIAL_KANJIVG_BATCH5_PINS, loadSpecialKanjiVGBatch5Strokes } from './hanja-stroke-dictionary-special-kanjivg-batch5.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = new URL('../content/hanja/characters/', import.meta.url)
const catalog: HanjaCharacter[] = readdirSync(dir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

test('闍의 검토된 17획과 국내 필순 순열을 재현한다', () => {
  const reproduced = JSON.parse(execFileSync(process.execPath,
    [fileURLToPath(new URL('../docs/hanja-goal-special-kanjivg-batch5-2026-09-21/build.mjs', import.meta.url))], { encoding: 'utf8' }))
  assert.deepEqual(reviewed, reproduced)
  const normalized = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch5-2026-09-21/normalized.json', import.meta.url), 'utf8'))
  assert.deepEqual(reviewed.map(({ glyph, sourceStrokeIndices, paths }) => ({ glyph, sourceStrokeIndices, paths })), normalized.entries)
  assert.equal(reviewed.reduce((sum, e) => sum + e.paths.length, 0), 17)
  const findings = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch5-2026-09-21/findings.json', import.meta.url), 'utf8'))
  for (const pin of SPECIAL_KANJIVG_BATCH5_PINS) {
    const character = catalog.find(c => c.glyph === pin.glyph)!
    const data = hanjaStrokeData(character)!
    assert.equal(character.strokes, pin.strokes)
    assert.equal(data.verificationSource, 'ehanja-crosschecked')
    assert.equal(sha(JSON.stringify(data.paths)), pin.pathsSha256)
    assert.deepEqual(data.sourceStrokeIndices, pin.sourceStrokeIndices)
    assert.equal(HANJA_STROKES.filter(e => e.glyph === pin.glyph).length, 1)
    assert.equal(findings.entries.find((e: { glyph: string }) => e.glyph === pin.glyph).decision, 'approved')
  }
  assert.equal(reviewed[0].strokeWidth, 300 / 109)
  assert.equal('strokeWidth' in hanjaStrokeData(catalog.find(c => c.glyph === '餒')!)!, false)
  assert.equal(reviewed[0].geometrySource, '2c44b29732a40e58d4ca40de8f0e165def7baef169dc87af7d0a5d6d1fd7ef0a')
})

test('순서 변경과 다른 변형·근거·라이선스 교체를 거부한다', () => {
  const order = structuredClone(reviewed)
  order[0].sourceStrokeIndices = [2, 1, ...order[0].sourceStrokeIndices.slice(2)]
  assert.throws(() => loadSpecialKanjiVGBatch5Strokes(order))
  const variant = structuredClone(reviewed)
  variant[0].geometrySource = '1020e71858a48a5ac428bef5a2b95b34072085e663b2fa5dd8a94384defe8ff2'
  assert.throws(() => loadSpecialKanjiVGBatch5Strokes(variant))
  const source = structuredClone(reviewed)
  source[0].sourceReference.dictionarySvgUrl = 'https://example.org/unreviewed'
  assert.throws(() => loadSpecialKanjiVGBatch5Strokes(source))
  const license = structuredClone(reviewed)
  license[0].geometryLicense.spdx = 'unknown'
  assert.throws(() => loadSpecialKanjiVGBatch5Strokes(license))
  assert.throws(() => loadSpecialKanjiVGBatch5Strokes([...reviewed, reviewed[0]]))
})


test('검토하지 않은 굵기와 누락된 굵기를 거부한다', () => {
  for (const strokeWidth of [0, -1, 5, Number.NaN, Number.POSITIVE_INFINITY, undefined]) {
    const changed = { ...reviewed[0], strokeWidth }
    assert.throws(() => loadSpecialKanjiVGBatch5Strokes([changed as typeof reviewed[number]]))
  }
  const data = hanjaStrokeData(catalog.find(c => c.glyph === '闍')!)!
  assert.equal(data.verificationSource, 'ehanja-crosschecked')
  assert.equal('strokeWidth' in data && data.strokeWidth, 300 / 109)
})


test('보류 두 글자는 승인 번들에 없고 대체판도 문제 경로를 그대로 유지한다', () => {
  const source = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch5-2026-09-21/candidates.json', import.meta.url), 'utf8'))
  const entries = source.entries as { glyph: string; candidate: { id: string }; paths: string[] }[]
  for (const [glyph, indices] of [['闥', [20, 21]], ['餤', [10, 14]]] as const) {
    assert.equal(reviewed.some(e => e.glyph === glyph), false)
    const primary = entries.find(e => e.glyph === glyph && !e.candidate.id.endsWith('-Kaisho'))!
    const alt = entries.find(e => e.glyph === glyph && e.candidate.id.endsWith('-Kaisho'))!
    for (const index of indices) assert.equal(primary.paths[index - 1], alt.paths[index - 1])
  }
})
