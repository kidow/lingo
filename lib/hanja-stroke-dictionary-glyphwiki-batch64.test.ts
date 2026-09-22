import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch64.json' with { type: 'json' }
import { loadGlyphWikiBatch64Strokes } from './hanja-stroke-dictionary-glyphwiki-batch64.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch64Strokes(reviewed)[0]
test('旴7획은 원본 도형·국내 순서로 한 번 등록된다',()=>{
  assert.equal(hanjaStrokeData({glyph:'旴',strokes:7}),data)
  assert.equal(hanjaStrokeData({glyph:'旴',strokes:8}),null)
  assert.equal(HANJA_STROKES.filter(s=>s.glyph==='旴').length,1)
  assert.deepEqual(data.sourceStrokeIndices,[1,2,4,5,6,7,8])
  const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch64-2026-09-22/verify.mjs',import.meta.url))
  assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('旴의 日 꺾임과 于 왼쪽 갈고리는 원본 순서로 재생된다',()=>{
  assert.deepEqual(data.outlines![1].map(s=>s.direction),['right','down'])
  const stroke=data.outlines![6]
  assert.deepEqual(stroke.map(s=>s.direction),['down','curve','left'])
  assert.equal(stroke[1].revealPath,'M64.1375 86 Q64.1375 91 59.1375 91')
  assert.equal(stroke[2].outline,'M59.1 91 L49.1 89.5 L49.1 88 L59.1 88 Z')
  const total=stroke.reduce((n,s)=>n+s.weight,0),begin=1-stroke[2].weight/total
  assert.equal(outlineSegmentProgress(stroke,begin-.001)[2],0)
  const p=outlineSegmentProgress(stroke,(begin+1)/2)
  assert.deepEqual(p.slice(0,2),[1,1]);assert(Math.abs(p[2]-.5)<1e-12)
})
test('旴의 갈고리·곡선·순서·근거 변경은 검토 승인을 무효화한다',()=>{
  for(const modify of [
    (e:typeof reviewed[number])=>{e.outlines[6].pop()},
    (e:typeof reviewed[number])=>{e.outlines[6][2].direction='right'},
    (e:typeof reviewed[number])=>{e.outlines[6][1].revealPath='M64 87 Q64 91 59 91'},
    (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch64Strokes(changed))}
})
