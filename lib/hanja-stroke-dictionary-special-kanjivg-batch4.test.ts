import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch4.json' with { type: 'json' }
import { SPECIAL_KANJIVG_BATCH4_PINS, loadSpecialKanjiVGBatch4Strokes } from './hanja-stroke-dictionary-special-kanjivg-batch4.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = new URL('../content/hanja/characters/', import.meta.url)
const catalog: HanjaCharacter[] = readdirSync(dir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

test('麕의 검토된 19획과 국내 필순 순열을 재현한다', () => {
  const reproduced = JSON.parse(execFileSync(process.execPath,
    [fileURLToPath(new URL('../docs/hanja-goal-special-kanjivg-batch4-2026-09-21/build.mjs', import.meta.url))], { encoding: 'utf8' }))
  assert.deepEqual(reviewed, reproduced)
  const normalized = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch4-2026-09-21/normalized.json', import.meta.url), 'utf8'))
  assert.deepEqual(reviewed.map(({ glyph, sourceStrokeIndices, paths }) => ({ glyph, sourceStrokeIndices, paths })), normalized.entries)
  assert.equal(reviewed.reduce((sum, e) => sum + e.paths.length, 0), 19)
  const findings = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch4-2026-09-21/findings.json', import.meta.url), 'utf8'))
  for (const pin of SPECIAL_KANJIVG_BATCH4_PINS) {
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
  assert.equal(reviewed[0].geometrySource, '928d17627811a45d7887db8c53c74d01c09a47ca7b177250109c755328a82012')
})

test('순서 변경과 다른 변형·근거·라이선스 교체를 거부한다', () => {
  const order = structuredClone(reviewed)
  order[0].sourceStrokeIndices = [2, 1, ...order[0].sourceStrokeIndices.slice(2)]
  assert.throws(() => loadSpecialKanjiVGBatch4Strokes(order))
  const variant = structuredClone(reviewed)
  variant[0].geometrySource = '1020e71858a48a5ac428bef5a2b95b34072085e663b2fa5dd8a94384defe8ff2'
  assert.throws(() => loadSpecialKanjiVGBatch4Strokes(variant))
  const source = structuredClone(reviewed)
  source[0].sourceReference.dictionarySvgUrl = 'https://example.org/unreviewed'
  assert.throws(() => loadSpecialKanjiVGBatch4Strokes(source))
  const license = structuredClone(reviewed)
  license[0].geometryLicense.spdx = 'unknown'
  assert.throws(() => loadSpecialKanjiVGBatch4Strokes(license))
  assert.throws(() => loadSpecialKanjiVGBatch4Strokes([...reviewed, reviewed[0]]))
})


test('검토하지 않은 굵기와 누락된 굵기를 거부한다', () => {
  for (const strokeWidth of [0, -1, 5, Number.NaN, Number.POSITIVE_INFINITY, undefined]) {
    const changed = { ...reviewed[0], strokeWidth }
    assert.throws(() => loadSpecialKanjiVGBatch4Strokes([changed as typeof reviewed[number]]))
  }
  const data = hanjaStrokeData(catalog.find(c => c.glyph === '麕')!)!
  assert.equal(data.verificationSource, 'ehanja-crosschecked')
  assert.equal('strokeWidth' in data && data.strokeWidth, 300 / 109)
})
