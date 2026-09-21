import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch7.json' with { type: 'json' }
import { SPECIAL_KANJIVG_BATCH7_PINS, loadSpecialKanjiVGBatch7Strokes } from './hanja-stroke-dictionary-special-kanjivg-batch7.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = new URL('../content/hanja/characters/', import.meta.url)
const catalog: HanjaCharacter[] = readdirSync(dir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

test('飫의 검토된 13획과 국내 필순 순열을 재현한다', () => {
  const reproduced = JSON.parse(execFileSync(process.execPath,
    [fileURLToPath(new URL('../docs/hanja-goal-special-kanjivg-batch7-2026-09-22/build.mjs', import.meta.url))], { encoding: 'utf8' }))
  assert.deepEqual(reviewed, reproduced)
  const normalized = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch7-2026-09-22/normalized.json', import.meta.url), 'utf8'))
  assert.deepEqual(reviewed.map(({ glyph, sourceStrokeIndices, paths }) => ({ glyph, sourceStrokeIndices, paths })), normalized.entries.filter((entry: { glyph: string }) => entry.glyph === '飫'))
  assert.equal(reviewed.reduce((sum, e) => sum + e.paths.length, 0), 13)
  const findings = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch7-2026-09-22/findings.json', import.meta.url), 'utf8'))
  for (const pin of SPECIAL_KANJIVG_BATCH7_PINS) {
    const character = catalog.find(c => c.glyph === pin.glyph)!
    const data = hanjaStrokeData(character)!
    assert.equal(character.strokes, pin.strokes)
    assert.equal(data.verificationSource, 'ehanja-crosschecked')
    assert.equal(sha(JSON.stringify(data.paths)), pin.pathsSha256)
    assert.deepEqual(data.sourceStrokeIndices, pin.sourceStrokeIndices)
    assert.equal(HANJA_STROKES.filter(e => e.glyph === pin.glyph).length, 1)
    assert.equal(findings.entries.find((e: { glyph: string }) => e.glyph === pin.glyph).decision, 'approved')
  }
  assert.equal(reviewed[0].strokeWidth, 5)
  assert.equal('strokeWidth' in hanjaStrokeData(catalog.find(c => c.glyph === '餒')!)!, false)
  assert.equal(reviewed[0].geometrySource, '7f92e9d58061e6df90f65a5cead94b2f054fb6e5c58d7c28a3694a7449ec25db')
})

test('순서 변경과 다른 변형·근거·라이선스 교체를 거부한다', () => {
  const order = structuredClone(reviewed)
  order[0].sourceStrokeIndices = [2, 1, ...order[0].sourceStrokeIndices.slice(2)]
  assert.throws(() => loadSpecialKanjiVGBatch7Strokes(order))
  const variant = structuredClone(reviewed)
  variant[0].geometrySource = '1020e71858a48a5ac428bef5a2b95b34072085e663b2fa5dd8a94384defe8ff2'
  assert.throws(() => loadSpecialKanjiVGBatch7Strokes(variant))
  const source = structuredClone(reviewed)
  source[0].sourceReference.dictionarySvgUrl = 'https://example.org/unreviewed'
  assert.throws(() => loadSpecialKanjiVGBatch7Strokes(source))
  const license = structuredClone(reviewed)
  license[0].geometryLicense.spdx = 'unknown'
  assert.throws(() => loadSpecialKanjiVGBatch7Strokes(license))
  assert.throws(() => loadSpecialKanjiVGBatch7Strokes([...reviewed, reviewed[0]]))
})


test('검토하지 않은 굵기와 누락된 굵기를 거부한다', () => {
  for (const strokeWidth of [0, -1, 3, Number.NaN, Number.POSITIVE_INFINITY, undefined]) {
    const changed = { ...reviewed[0], strokeWidth }
    assert.throws(() => loadSpecialKanjiVGBatch7Strokes([changed as typeof reviewed[number]]))
  }
  const data = hanjaStrokeData(catalog.find(c => c.glyph === '飫')!)!
  assert.equal(data.verificationSource, 'ehanja-crosschecked')
  assert.equal('strokeWidth' in data && data.strokeWidth, 5)
})



test('飫은 食 순서를 보정하고 麑·麌의 연결 차이는 보류한다', () => {
  assert.deepEqual(reviewed[0].sourceStrokeIndices, [1, 2, 3, 5, 6, 7, 4, 8, 9, 10, 11, 12, 13])
  const source = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch7-2026-09-22/candidates.json', import.meta.url), 'utf8'))
  const entries = source.entries as { glyph: string; candidate: { id: string }; paths: string[] }[]
  for (const [id, variants] of [['09e91', ['09e91-Kaisho', '09e91-KaishoHzLst']], ['09e8c', ['09e8c-Kaisho']]] as const) {
    const primary = entries.find(e => e.candidate.id === id)!
    for (const variant of variants) {
      const alternate = entries.find(e => e.candidate.id === variant)!
      for (const index of [3, 4, 5, 6, 7]) assert.equal(primary.paths[index - 1], alternate.paths[index - 1])
    }
  }
  for (const glyph of ['麑', '麌']) {
    assert.equal(reviewed.some(e => e.glyph === glyph), false)
    assert.equal(hanjaStrokeData(catalog.find(e => e.glyph === glyph)!), null)
  }
})
