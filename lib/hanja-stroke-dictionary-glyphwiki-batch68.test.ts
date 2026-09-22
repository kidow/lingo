import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch68.json' with { type: 'json' }
import { loadGlyphWikiBatch68Strokes } from './hanja-stroke-dictionary-glyphwiki-batch68.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch68Strokes(reviewed)[0]
test('芑7획은 원본 도형·국내 순서로 한 번 등록된다',()=>{
  assert.equal(hanjaStrokeData({glyph:'芑',strokes:7}),data)
  assert.equal(hanjaStrokeData({glyph:'芑',strokes:8}),null)
  assert.equal(HANJA_STROKES.filter(s=>s.glyph==='芑').length,1)
  assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,7,8])
  const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch68-2026-09-22/verify.mjs',import.meta.url))
  assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('芑의 己 꺾임과 상향 갈고리는 원본 순서로 재생된다',()=>{
  assert.deepEqual(data.outlines![4].map(s=>s.direction),['right','down'])
  const stroke=data.outlines![6]
  assert.deepEqual(stroke.map(s=>s.direction),['down','curve','right','up'])
  assert.equal(stroke[1].revealPath,"M20 83.22 Q20 88.22 25 88.22")
  assert.equal(stroke[3].outline,"M88 85.2 L85 85.2 L88 72.7 L89 72.7 Z")
  const total=stroke.reduce((n,s)=>n+s.weight,0),begin=1-stroke[3].weight/total
  assert.equal(outlineSegmentProgress(stroke,begin-.001)[3],0)
  const p=outlineSegmentProgress(stroke,(begin+1)/2)
  assert.deepEqual(p.slice(0,3),[1,1,1]);assert(Math.abs(p[3]-.5)<1e-12)
})
test('芑의 갈고리·곡선·순서·근거 변경은 검토 승인을 무효화한다',()=>{
  for(const modify of [
    (e:typeof reviewed[number])=>{e.outlines[6].pop()},
    (e:typeof reviewed[number])=>{e.outlines[6][3].direction='down'},
    (e:typeof reviewed[number])=>{e.outlines[6][1].revealPath='M64 87 Q64 91 59 91'},
    (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch68Strokes(changed))}
})
