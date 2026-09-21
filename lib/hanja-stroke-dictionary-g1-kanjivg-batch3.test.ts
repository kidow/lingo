import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-kanjivg-batch3.json' with { type: 'json' }
import { G1_KANJIVG_BATCH3_PINS, loadG1KanjiVGBatch3Strokes } from './hanja-stroke-dictionary-g1-kanjivg-batch3.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = new URL('../content/hanja/characters/', import.meta.url)
const catalog: HanjaCharacter[] = readdirSync(dir).filter(f => f.endsWith('.json'))
  .flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')).characters)
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

test('餞의 검토된 순열로 17획을 재현하고 두 보류 글자는 등록하지 않는다', () => {
  const reproduced = JSON.parse(execFileSync(process.execPath,
    [fileURLToPath(new URL('../docs/hanja-goal-g1-batch3-2026-09-21/build.mjs', import.meta.url))], { encoding: 'utf8' }))
  assert.deepEqual(reviewed, reproduced)
  assert.equal(reviewed.reduce((sum, e) => sum + e.paths.length, 0), 17)
  const findings = JSON.parse(readFileSync(new URL('../docs/hanja-goal-g1-batch3-2026-09-21/findings.json', import.meta.url), 'utf8'))
  for (const pin of G1_KANJIVG_BATCH3_PINS) {
    const character = catalog.find(c => c.glyph === pin.glyph)!
    const data = hanjaStrokeData(character)!
    assert.equal(character.strokes, pin.strokes)
    assert.equal(data.verificationSource, 'ehanja-crosschecked')
    assert.equal(sha(JSON.stringify(data.paths)), pin.pathsSha256)
    assert.deepEqual(data.sourceStrokeIndices, pin.sourceStrokeIndices)
    assert.equal(HANJA_STROKES.filter(e => e.glyph === pin.glyph).length, 1)
    assert.equal(findings.entries.find((e: { glyph: string }) => e.glyph === pin.glyph).decision, 'approved')
  }
  for (const glyph of ['諭', '愉']) assert.equal(hanjaStrokeData(catalog.find(c => c.glyph === glyph)!), null)
})

test('원본 순서 복구와 근거·라이선스 교체는 공개 번들 검사를 통과하지 못한다', () => {
  const order = structuredClone(reviewed)
  order[0].sourceStrokeIndices = Array.from({ length: 17 }, (_, i) => i + 1)
  assert.throws(() => loadG1KanjiVGBatch3Strokes(order))
  const source = structuredClone(reviewed)
  source[0].sourceReference.dictionarySvgUrl = 'https://example.org/unreviewed'
  assert.throws(() => loadG1KanjiVGBatch3Strokes(source))
  const license = structuredClone(reviewed)
  license[0].geometryLicense.spdx = 'unknown'
  assert.throws(() => loadG1KanjiVGBatch3Strokes(license))
  assert.throws(() => loadG1KanjiVGBatch3Strokes([...reviewed, reviewed[0]]))
})
