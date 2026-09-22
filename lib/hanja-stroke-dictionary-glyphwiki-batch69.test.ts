import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch69.json' with { type: 'json' }
import { loadGlyphWikiBatch69Strokes } from './hanja-stroke-dictionary-glyphwiki-batch69.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch69Strokes(reviewed)[0]
test('戺7획은 원본 도형·국내 순서로 한 번 등록된다',()=>{
  assert.equal(hanjaStrokeData({glyph:'戺',strokes:7}),data)
  assert.equal(hanjaStrokeData({glyph:'戺',strokes:8}),null)
  assert.equal(HANJA_STROKES.filter(s=>s.glyph==='戺').length,1)
  assert.deepEqual(data.sourceStrokeIndices,[1,3,5,2,6,8,9])
  const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch69-2026-09-22/verify.mjs',import.meta.url))
  assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('戺의 戶 내림곡선과 巳 갈고리는 국내 순서로 재생된다',()=>{
  assert.deepEqual(data.outlines![1].map(s=>s.direction),['right','down'])
  assert.deepEqual(data.outlines![3].map(s=>s.direction),['down','curve'])
  const stroke=data.outlines![6]
  assert.deepEqual(stroke.map(s=>s.direction),['down','curve','right','up'])
  assert.equal(stroke[1].revealPath,"M56.4875 81.5 Q56.4875 86.5 61.4875 86.5")
  assert.equal(stroke[3].outline,"M90.05 83.5 L87.05 83.5 L90.05 71 L91.05 71 Z")
  const total=stroke.reduce((n,s)=>n+s.weight,0),begin=1-stroke[3].weight/total
  assert.equal(outlineSegmentProgress(stroke,begin-.001)[3],0)
  const p=outlineSegmentProgress(stroke,(begin+1)/2)
  assert.deepEqual(p.slice(0,3),[1,1,1]);assert(Math.abs(p[3]-.5)<1e-12)
})
test('戺의 갈고리·곡선·순서·근거 변경은 검토 승인을 무효화한다',()=>{
  for(const modify of [
    (e:typeof reviewed[number])=>{e.outlines[6].pop()},
    (e:typeof reviewed[number])=>{e.outlines[6][3].direction='down'},
    (e:typeof reviewed[number])=>{e.outlines[6][1].revealPath='M64 87 Q64 91 59 91'},
    (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch69Strokes(changed))}
})
