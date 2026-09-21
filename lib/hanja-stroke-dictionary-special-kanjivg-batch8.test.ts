import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special-kanjivg-batch8.json' with { type: 'json' }
import { SPECIAL_KANJIVG_BATCH8_PINS, loadSpecialKanjiVGBatch8Strokes } from './hanja-stroke-dictionary-special-kanjivg-batch8.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = new URL('../content/hanja/characters/', import.meta.url)
const catalog: HanjaCharacter[] = readdirSync(dir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

test('隰·阨의 검토된 24획과 국내 필순을 재현한다', () => {
  const reproduced = JSON.parse(execFileSync(process.execPath,
    [fileURLToPath(new URL('../docs/hanja-goal-special-kanjivg-batch8-2026-09-22/build.mjs', import.meta.url))], { encoding: 'utf8' }))
  assert.deepEqual(reviewed, reproduced)
  const normalized = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch8-2026-09-22/normalized.json', import.meta.url), 'utf8'))
  assert.deepEqual(reviewed.map(({ glyph, sourceStrokeIndices, paths }) => ({ glyph, sourceStrokeIndices, paths })), normalized.entries.filter((entry: { glyph: string }) => ['隰', '阨'].includes(entry.glyph)))
  assert.equal(reviewed.reduce((sum, e) => sum + e.paths.length, 0), 24)
  const findings = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch8-2026-09-22/findings.json', import.meta.url), 'utf8'))
  for (const pin of SPECIAL_KANJIVG_BATCH8_PINS) {
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
  assert.equal(reviewed[1].strokeWidth, 5)
  assert.equal('strokeWidth' in hanjaStrokeData(catalog.find(c => c.glyph === '餒')!)!, false)
  assert.equal(reviewed[0].geometrySource, '9ce16c32eb78a5bdef7aa5a63cd35d1f28e76225ecac39f0d5de38aabc0efca7')
})

test('순서 변경과 다른 변형·근거·라이선스 교체를 거부한다', () => {
  const order = structuredClone(reviewed)
  order[0].sourceStrokeIndices = [2, 1, ...order[0].sourceStrokeIndices.slice(2)]
  assert.throws(() => loadSpecialKanjiVGBatch8Strokes(order))
  const variant = structuredClone(reviewed)
  variant[0].geometrySource = '1020e71858a48a5ac428bef5a2b95b34072085e663b2fa5dd8a94384defe8ff2'
  assert.throws(() => loadSpecialKanjiVGBatch8Strokes(variant))
  const source = structuredClone(reviewed)
  source[0].sourceReference.dictionarySvgUrl = 'https://example.org/unreviewed'
  assert.throws(() => loadSpecialKanjiVGBatch8Strokes(source))
  const license = structuredClone(reviewed)
  license[0].geometryLicense.spdx = 'unknown'
  assert.throws(() => loadSpecialKanjiVGBatch8Strokes(license))
  assert.throws(() => loadSpecialKanjiVGBatch8Strokes([...reviewed, reviewed[0]]))
})

test('각 글자의 검토된 굵기만 허용한다', () => {
  for (let i = 0; i < reviewed.length; i++) {
    for (const strokeWidth of [0, -1, 3, Number.NaN, Number.POSITIVE_INFINITY, undefined]) {
      const changed = structuredClone(reviewed)
      changed[i] = { ...changed[i], strokeWidth } as typeof reviewed[number]
      assert.throws(() => loadSpecialKanjiVGBatch8Strokes(changed))
    }
    const data = hanjaStrokeData(catalog.find(c => c.glyph === reviewed[i].glyph)!)!
    assert.equal('strokeWidth' in data && data.strokeWidth, SPECIAL_KANJIVG_BATCH8_PINS[i].strokeWidth)
  }
})

test('饐의 KanjiVG 후보는 보류하고 별도로 검토한 Tomoe 경로를 사용한다', () => {
  const source = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special-kanjivg-batch8-2026-09-22/candidates.json', import.meta.url), 'utf8'))
  const entries = source.entries as { glyph: string; candidate: { id: string }; paths: string[] }[]
  for (const id of ['096b0', '09950']) {
    const primary = entries.find(e => e.candidate.id === id)!
    const alternate = entries.find(e => e.candidate.id === id + '-Kaisho')!
    assert.deepEqual(primary.paths.flatMap((path, i) => path === alternate.paths[i] ? [] : [i + 1]), [6])
  }
  assert.equal(reviewed.some(e => e.glyph === '饐'), false)
  assert.equal(hanjaStrokeData(catalog.find(e => e.glyph === '饐')!)?.geometrySource,
    '6f30a4f42f24dc611f1a3e4d7a220c5009bb0323f237f01f50e3be3dfefb11f8')
})
