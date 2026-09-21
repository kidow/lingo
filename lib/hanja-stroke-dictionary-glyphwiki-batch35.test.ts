import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch35.json' with { type:'json' }
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { loadGlyphWikiBatch35Strokes } from './hanja-stroke-dictionary-glyphwiki-batch35.ts'

test('葺13획을 고정된 전체 원본의 5개 기록에서 재현한다', () => {
  const script = fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch35-2026-09-22/build.mjs',import.meta.url))
  assert.deepEqual(JSON.parse(execFileSync(process.execPath,[script],{encoding:'utf8'})),reviewed)
  const data=hanjaStrokeData({glyph:'葺',strokes:13})!
  assert.ok(data)
  assert.equal(HANJA_STROKES.filter(e=>e.glyph==='葺').length,1)
  assert.equal(data.verificationSource,'ehanja-crosschecked')
  assert.equal(data.strokeWidth,1.5)
  assert.equal(data.paths.length,13)
  assert.equal(createHash('sha256').update(JSON.stringify(data.paths)).digest('hex'),reviewed[0].pathsSha256)
  assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10,11,12,13])
  assert.equal(hanjaStrokeData({glyph:'葺',strokes:14}),null)
})
test('葺의 경로·순열·선폭·출처·허가 변경을 거부한다', () => {
  for(const modify of [
    (e:typeof reviewed[number])=>{e.paths[11]='M 0 0 L 99 99'},
    (e:typeof reviewed[number])=>{e.sourceStrokeIndices.reverse()},
    (e:typeof reviewed[number])=>{e.strokeWidth=5},
    (e:typeof reviewed[number])=>{e.geometryLicense.revision='unverified'},
    (e:typeof reviewed[number])=>{e.geometryLicense.spdx='CC0-1.0'},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch35Strokes(changed))}
  assert.throws(()=>loadGlyphWikiBatch35Strokes([...reviewed,...reviewed]))
})
test('연결 수직선·상자형 연결과 선폭 검증을 실행한다', () => {
  const script=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch35-2026-09-22/convert.test.mjs',import.meta.url))
  const env={...process.env};delete env.NODE_TEST_CONTEXT
  const output=execFileSync(process.execPath,['--test','--test-reporter=tap',script],{encoding:'utf8',env})
  assert.match(output,/^# tests 6$/m);assert.match(output,/^# pass 6$/m)
})
