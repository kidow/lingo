import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch33.json' with { type:'json' }
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { loadGlyphWikiBatch33Strokes } from './hanja-stroke-dictionary-glyphwiki-batch33.ts'

test('菖12획을 고정된 전체 원본의 6개 기록에서 재현한다', () => {
  const script = fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch33-2026-09-22/build.mjs',import.meta.url))
  assert.deepEqual(JSON.parse(execFileSync(process.execPath,[script],{encoding:'utf8'})),reviewed)
  const data=hanjaStrokeData({glyph:'菖',strokes:12})!
  assert.ok(data)
  assert.equal(HANJA_STROKES.filter(e=>e.glyph==='菖').length,1)
  assert.equal(data.verificationSource,'ehanja-crosschecked')
  assert.equal(data.strokeWidth,4)
  assert.equal(data.paths.length,12)
  assert.equal(createHash('sha256').update(JSON.stringify(data.paths)).digest('hex'),reviewed[0].pathsSha256)
  assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10,11,12])
  assert.equal(hanjaStrokeData({glyph:'菖',strokes:13}),null)
})
test('菖의 경로·순열·선폭·출처·허가 변경을 거부한다', () => {
  for(const modify of [
    (e:typeof reviewed[number])=>{e.paths[11]='M 0 0 L 99 99'},
    (e:typeof reviewed[number])=>{e.sourceStrokeIndices.reverse()},
    (e:typeof reviewed[number])=>{e.strokeWidth=5},
    (e:typeof reviewed[number])=>{e.geometryLicense.revision='unverified'},
    (e:typeof reviewed[number])=>{e.geometryLicense.spdx='CC0-1.0'},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch33Strokes(changed))}
  assert.throws(()=>loadGlyphWikiBatch33Strokes([...reviewed,...reviewed]))
})
test('원본 상자형 연결 검증을 실행한다', () => {
  const script=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch33-2026-09-22/convert.test.mjs',import.meta.url))
  const env={...process.env};delete env.NODE_TEST_CONTEXT
  const output=execFileSync(process.execPath,['--test','--test-reporter=tap',script],{encoding:'utf8',env})
  assert.match(output,/^# tests 6$/m);assert.match(output,/^# pass 6$/m)
})
