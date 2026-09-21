import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-special2-kanjivg-batch1.json' with { type: 'json' }
import { SPECIAL2_KANJIVG_BATCH1_PINS, loadSpecial2KanjiVGBatch1Strokes } from './hanja-stroke-dictionary-special2-kanjivg-batch1.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = new URL('../content/hanja/characters/', import.meta.url)
const catalog: HanjaCharacter[] = readdirSync(dir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

test('鱇·廐·饋의 검토된 기본 변형 57획을 재현하고 순열을 유지한다', () => {
  const reproduced = JSON.parse(execFileSync(process.execPath,
    [fileURLToPath(new URL('../docs/hanja-goal-special2-kanjivg-batch1-2026-09-21/build.mjs', import.meta.url))], { encoding: 'utf8' }))
  assert.deepEqual(reviewed, reproduced)
  const normalized = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special2-kanjivg-batch1-2026-09-21/normalized.json', import.meta.url), 'utf8'))
  assert.deepEqual(reviewed.map(({ glyph, sourceStrokeIndices, paths }) => ({ glyph, sourceStrokeIndices, paths })), normalized.entries)
  assert.equal(reviewed.reduce((sum, e) => sum + e.paths.length, 0), 57)
  const findings = JSON.parse(readFileSync(new URL('../docs/hanja-goal-special2-kanjivg-batch1-2026-09-21/findings.json', import.meta.url), 'utf8'))
  for (const pin of SPECIAL2_KANJIVG_BATCH1_PINS) {
    const character = catalog.find(c => c.glyph === pin.glyph)!
    const data = hanjaStrokeData(character)!
    assert.equal(character.strokes, pin.strokes)
    assert.equal(data.verificationSource, 'ehanja-crosschecked')
    assert.equal(sha(JSON.stringify(data.paths)), pin.pathsSha256)
    assert.deepEqual(data.sourceStrokeIndices, pin.sourceStrokeIndices)
    assert.equal(HANJA_STROKES.filter(e => e.glyph === pin.glyph).length, 1)
    assert.equal(findings.entries.find((e: { glyph: string }) => e.glyph === pin.glyph).decision, 'approved')
  }
  assert.equal(reviewed.some(e => e.glyph === '菰'), false)
  assert.equal(reviewed[0].geometrySource, '82109d7689e25150701605bf6ec60ec1fd2a7443f95b160fbc29e1aa4d92fcd0')
})

test('순서 변경과 다른 변형·근거·라이선스 교체를 거부한다', () => {
  const order = structuredClone(reviewed)
  order[0].sourceStrokeIndices = [2, 1, ...order[0].sourceStrokeIndices.slice(2)]
  assert.throws(() => loadSpecial2KanjiVGBatch1Strokes(order))
  const variant = structuredClone(reviewed)
  variant[0].geometrySource = '315d4e9f03917a8aa57ac69feeca364250b8b44f5ac9c94bb6cabc35c374f83c'
  assert.throws(() => loadSpecial2KanjiVGBatch1Strokes(variant))
  const source = structuredClone(reviewed)
  source[0].sourceReference.dictionarySvgUrl = 'https://example.org/unreviewed'
  assert.throws(() => loadSpecial2KanjiVGBatch1Strokes(source))
  const license = structuredClone(reviewed)
  license[0].geometryLicense.spdx = 'unknown'
  assert.throws(() => loadSpecial2KanjiVGBatch1Strokes(license))
  assert.throws(() => loadSpecial2KanjiVGBatch1Strokes([...reviewed, reviewed[0]]))
})
