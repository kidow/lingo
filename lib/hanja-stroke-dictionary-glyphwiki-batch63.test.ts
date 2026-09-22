import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch63.json' with { type: 'json' }
import { loadGlyphWikiBatch63Strokes } from './hanja-stroke-dictionary-glyphwiki-batch63.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch63Strokes(reviewed)[0]
test('玔7획은 원본 도형·국내 순서로 한 번 등록된다',()=>{
  assert.equal(hanjaStrokeData({glyph:'玔',strokes:7}),data)
  assert.equal(hanjaStrokeData({glyph:'玔',strokes:8}),null)
  assert.equal(HANJA_STROKES.filter(s=>s.glyph==='玔').length,1)
  assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7])
  const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch63-2026-09-22/verify.mjs',import.meta.url))
  assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('玔의 川 첫 획은 원본 세로선을 마친 뒤 같은 점에서 곡선을 시작한다',()=>{
  const stroke=data.outlines![4]
  assert.deepEqual(stroke.map(s=>s.direction),['down','curve'])
  assert.equal(stroke[1].revealPath,'M48.099999999999994 48 Q49.3 85.5 30.1 93.5')
  const total=stroke.reduce((n,s)=>n+s.weight,0),begin=stroke[0].weight/total
  assert.equal(outlineSegmentProgress(stroke,begin-.001)[1],0)
  const p=outlineSegmentProgress(stroke,(begin+1)/2)
  assert.equal(p[0],1);assert(Math.abs(p[1]-.5)<1e-12)
})
test('玔의 곡선 시작·순서·근거 변경은 검토 승인을 무효화한다',()=>{
  for(const modify of [
    (e:typeof reviewed[number])=>{e.outlines[4].pop()},
    (e:typeof reviewed[number])=>{e.outlines[4][1].direction='down'},
    (e:typeof reviewed[number])=>{e.outlines[4][1].revealPath='M48 49 Q49.3 85.5 30.1 93.5'},
    (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch63Strokes(changed))}
})
