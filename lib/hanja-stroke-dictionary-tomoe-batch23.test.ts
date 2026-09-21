import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-tomoe-batch23.json' with { type: 'json' }
import { loadTomoeBatch23Strokes } from './hanja-stroke-dictionary-tomoe-batch23.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'

test('饐의 국내 순서 21획과 두께 2.6을 중복 없이 등록한다', () => {
  const data = hanjaStrokeData({ glyph: '饐', strokes: 21 })!
  assert.ok(data)
  assert.equal(HANJA_STROKES.filter(e => e.glyph === '饐').length, 1)
  assert.equal(data.verificationSource, 'ehanja-crosschecked')
  assert.equal('strokeWidth' in data && data.strokeWidth, 2.6)
  assert.deepEqual(data.sourceStrokeIndices, [1,2,3,5,6,7,4,8,9,10,11,12,13,14,15,16,17,18,19,20,21])
  assert.equal(createHash('sha256').update(JSON.stringify(data.paths)).digest('hex'), reviewed[0].pathsSha256)
  assert.equal(hanjaStrokeData({ glyph: '饐', strokes: 20 }), null)
})
test('배포되는 원본·LGPL 고지에서 보정 경로를 재현한다', () => {
  const result = execFileSync(process.execPath, [fileURLToPath(new URL('../docs/hanja-goal-tomoe-batch23-2026-09-22/build.mjs', import.meta.url))], { encoding: 'utf8' })
  assert.deepEqual(JSON.parse(result), reviewed)
  const proof = JSON.parse(readFileSync(new URL('../docs/hanja-goal-tomoe-batch23-2026-09-22/findings.json', import.meta.url), 'utf8'))
  assert.equal(proof.entries.find((e: { glyph: string }) => e.glyph === '饐').normalizedCumulativeStates, 21)
})
test('순서·두께·근거·라이선스 교체 및 중복 묶음을 거부한다', () => {
  for (const modify of [
    (e: typeof reviewed[number]) => { e.strokeWidth = 5 },
    (e: typeof reviewed[number]) => { e.sourceStrokeIndices.reverse() },
    (e: typeof reviewed[number]) => { e.geometryLicense.spdx = 'unknown' },
    (e: typeof reviewed[number]) => { e.sourceReference.dictionarySvgSha256 = '0'.repeat(64) },
    (e: typeof reviewed[number]) => { e.paths.pop() },
  ]) {
    const changed = structuredClone(reviewed); modify(changed[0])
    assert.throws(() => loadTomoeBatch23Strokes(changed))
  }
  assert.throws(() => loadTomoeBatch23Strokes([...reviewed, ...reviewed]))
})
test('隴·鏘는 전체 자형의 접속 조건이 충돌하여 보류한다', () => {
  assert.equal(hanjaStrokeData({ glyph: '隴', strokes: 19 }), null)
  assert.equal(hanjaStrokeData({ glyph: '鏘', strokes: 19 }), null)
})
