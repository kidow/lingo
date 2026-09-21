import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch26.json' with { type: 'json' }
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { loadGlyphWikiBatch26Strokes } from './hanja-stroke-dictionary-glyphwiki-batch26.ts'

test('芥의 국내 8획 순서와 분리된 草 자형을 등록한다', () => {
  const data = hanjaStrokeData({ glyph: '芥', strokes: 8 })!
  assert.ok(data)
  assert.equal(HANJA_STROKES.filter(e => e.glyph === '芥').length, 1)
  assert.equal(data.verificationSource, 'ehanja-crosschecked')
  assert.equal(data.strokeWidth, 4)
  assert.deepEqual(data.sourceStrokeIndices, [1,2,4,3,5,6,7,8])
  assert.equal(createHash('sha256').update(JSON.stringify(data.paths)).digest('hex'), reviewed[0].pathsSha256)
  assert.equal(hanjaStrokeData({ glyph: '芥', strokes: 7 }), null)
})
test('배포한 원본과 고정된 검토 기록에서 전체 경로를 재현한다', () => {
  const script = fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch26-2026-09-22/build.mjs', import.meta.url))
  assert.deepEqual(JSON.parse(execFileSync(process.execPath, [script], { encoding: 'utf8' })), reviewed)
  const findings = JSON.parse(readFileSync(new URL('../docs/hanja-goal-glyphwiki-batch26-2026-09-22/findings.json', import.meta.url), 'utf8'))
  assert.equal(findings.entries.find((e: { glyph: string }) => e.glyph === '芥').normalizedCumulativeStates, 8)
})
test('필순·선폭·라이선스·근거의 변경과 중복 묶음을 거부한다', () => {
  for (const modify of [
    (e: typeof reviewed[number]) => { e.strokeWidth = 5 },
    (e: typeof reviewed[number]) => { e.sourceStrokeIndices.reverse() },
    (e: typeof reviewed[number]) => { e.geometryLicense.spdx = 'CC0-1.0' },
    (e: typeof reviewed[number]) => { e.sourceReference.dictionarySvgSha256 = '0'.repeat(64) },
    (e: typeof reviewed[number]) => { e.paths.pop() },
  ]) {
    const changed = structuredClone(reviewed); modify(changed[0])
    assert.throws(() => loadGlyphWikiBatch26Strokes(changed))
  }
  assert.throws(() => loadGlyphWikiBatch26Strokes([...reviewed, ...reviewed]))
})
test('KAGE 변환은 지원하지 않는 필기 요소를 생략하지 않는다', () => {
  const script = fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch26-2026-09-22/convert.test.mjs', import.meta.url))
  const env = { ...process.env }
  delete env.NODE_TEST_CONTEXT
  const output = execFileSync(process.execPath, ['--test', '--test-reporter=tap', script], {
    encoding: 'utf8',
    env,
  })
  assert.match(output, /^# tests 4$/m)
  assert.match(output, /^# pass 4$/m)
})
test('庾의 새 후보는 마지막 획의 시작과 자형 차이로 보류한다', () => {
  assert.equal(hanjaStrokeData({ glyph: '庾', strokes: 11 }), null)
  assert.equal(hanjaStrokeData({ glyph: '庾', strokes: 12 }), null)
})
