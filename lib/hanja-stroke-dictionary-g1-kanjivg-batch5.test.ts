import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-kanjivg-batch5.json' with { type: 'json' }
import { G1_KANJIVG_BATCH5_PINS, loadG1KanjiVGBatch5Strokes } from './hanja-stroke-dictionary-g1-kanjivg-batch5.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = new URL('../content/hanja/characters/', import.meta.url)
const catalog: HanjaCharacter[] = readdirSync(dir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

test('眈의 선택된 기본 변형 9획을 그대로 재현한다', () => {
  const reproduced = JSON.parse(execFileSync(process.execPath,
    [fileURLToPath(new URL('../docs/hanja-goal-g1-batch5-2026-09-21/build.mjs', import.meta.url))], { encoding: 'utf8' }))
  assert.deepEqual(reviewed, reproduced)
  const normalized = JSON.parse(readFileSync(new URL('../docs/hanja-goal-g1-batch5-2026-09-21/normalized.json', import.meta.url), 'utf8'))
  assert.deepEqual(reviewed.map(({ glyph, sourceStrokeIndices, paths }) => ({ glyph, sourceStrokeIndices, paths })), normalized.entries)
  assert.equal(reviewed.reduce((sum, e) => sum + e.paths.length, 0), 9)
  const findings = JSON.parse(readFileSync(new URL('../docs/hanja-goal-g1-batch5-2026-09-21/findings.json', import.meta.url), 'utf8'))
  for (const pin of G1_KANJIVG_BATCH5_PINS) {
    const character = catalog.find(c => c.glyph === pin.glyph)!
    const data = hanjaStrokeData(character)!
    assert.equal(character.strokes, pin.strokes)
    assert.equal(data.verificationSource, 'ehanja-crosschecked')
    assert.equal(sha(JSON.stringify(data.paths)), pin.pathsSha256)
    assert.deepEqual(data.sourceStrokeIndices, pin.sourceStrokeIndices)
    assert.equal(HANJA_STROKES.filter(e => e.glyph === pin.glyph).length, 1)
    assert.equal(findings.entries.find((e: { glyph: string }) => e.glyph === pin.glyph).decision, 'approved')
  }
  assert.equal(reviewed[0].geometrySource, 'd37cd9cf87ca196ffc18d3be86b9e60bb0a0794bc43ecae5626ae10666f4dc38')
})

test('순서 변경과 다른 변형·근거·라이선스 교체를 거부한다', () => {
  const order = structuredClone(reviewed)
  order[0].sourceStrokeIndices = [2, 1, 3, 4, 5, 6, 7, 8, 9]
  assert.throws(() => loadG1KanjiVGBatch5Strokes(order))
  const variant = structuredClone(reviewed)
  variant[0].geometrySource = 'a98c125d0f6b5e05b9c8d149ddcf5680d2c3cf42135f222d87d6d833bcacf81f'
  assert.throws(() => loadG1KanjiVGBatch5Strokes(variant))
  const source = structuredClone(reviewed)
  source[0].sourceReference.dictionarySvgUrl = 'https://example.org/unreviewed'
  assert.throws(() => loadG1KanjiVGBatch5Strokes(source))
  const license = structuredClone(reviewed)
  license[0].geometryLicense.spdx = 'unknown'
  assert.throws(() => loadG1KanjiVGBatch5Strokes(license))
  assert.throws(() => loadG1KanjiVGBatch5Strokes([...reviewed, reviewed[0]]))
})
