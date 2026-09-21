import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch29.json' with { type: 'json' }
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { loadGlyphWikiBatch29Strokes } from './hanja-stroke-dictionary-glyphwiki-batch29.ts'

test('芒의 7획과 국내 草 순서를 원본 3개에서 재현한다', () => {
  const script = fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch29-2026-09-22/build.mjs', import.meta.url))
  assert.deepEqual(JSON.parse(execFileSync(process.execPath, [script], { encoding: 'utf8' })), reviewed)
  const data = hanjaStrokeData({ glyph: '芒', strokes: 7 })!
  assert.ok(data)
  assert.equal(HANJA_STROKES.filter(e => e.glyph === '芒').length, 1)
  assert.equal(data.verificationSource, 'ehanja-crosschecked')
  assert.equal(data.strokeWidth, 4)
  assert.deepEqual(data.sourceStrokeIndices, [1,2,4,3,5,6,7])
  assert.equal(createHash('sha256').update(JSON.stringify(data.paths)).digest('hex'), reviewed[0].pathsSha256)
  assert.equal(hanjaStrokeData({ glyph: '芒', strokes: 8 }), null)
})
test('芒의 경로·순열·선폭·라이선스·국내 근거 교체를 거부한다', () => {
  for (const modify of [
    (e: typeof reviewed[number]) => { e.paths[0] = 'M 0 0 L 99 99' },
    (e: typeof reviewed[number]) => { e.sourceStrokeIndices.reverse() },
    (e: typeof reviewed[number]) => { e.strokeWidth = 5 },
    (e: typeof reviewed[number]) => { e.geometryLicense.spdx = 'CC0-1.0' },
    (e: typeof reviewed[number]) => { e.sourceReference.dictionarySvgSha256 = '0'.repeat(64) },
  ]) {
    const changed = structuredClone(reviewed); modify(changed[0])
    assert.throws(() => loadGlyphWikiBatch29Strokes(changed))
  }
  assert.throws(() => loadGlyphWikiBatch29Strokes([...reviewed, ...reviewed]))
})

test('꺾임 연결은 원본 기본값을 재현하고 갈고리·축 변경은 거부한다', () => {
  const script = fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch29-2026-09-22/convert.test.mjs', import.meta.url))
  const env = { ...process.env }
  delete env.NODE_TEST_CONTEXT
  const output = execFileSync(process.execPath, ['--test', '--test-reporter=tap', script], { encoding: 'utf8', env })
  assert.match(output, /^# tests 5$/m)
  assert.match(output, /^# pass 5$/m)
})
