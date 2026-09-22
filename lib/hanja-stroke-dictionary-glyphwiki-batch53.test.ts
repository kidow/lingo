import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch53.json' with { type: 'json' }
import asset from '../public/hanja-strokes/glyphwiki/8404.json' with { type: 'json' }
import { loadGlyphWikiBatch53Strokes } from './hanja-stroke-dictionary-glyphwiki-batch53.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch53Strokes(reviewed)[0]
test('萄12획은 고정 원본과 엔진 내장 프리셋으로 재현된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'萄',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'萄',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='萄').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,12,13,5,6,7,8,9,11])
 assert.equal(asset.engineConstructorSize,1);assert.equal(asset.engineStyle,'gothic')
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch53-2026-09-22/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('萄 초두는 외곽과 분리되고 갈고리는 원본 곡선 뒤에 재생된다',()=>{
 assert(data.outlines![4][0].bounds[2]<data.outlines![1][0].bounds[0])
 const hook=data.outlines![5]
 assert.deepEqual(hook.map(s=>s.direction),['right','curve','curve'])
 assert(hook[2].revealPath!.endsWith('Q75 91.5 69 90'))
 const total=hook.reduce((n,s)=>n+s.weight,0),start=1-hook[2].weight/total
 assert.equal(outlineSegmentProgress(hook,start-.001)[2],0)
 const p=outlineSegmentProgress(hook,(start+1)/2);assert.deepEqual(p.slice(0,2),[1,1]);assert(Math.abs(p[2]-.5)<1e-12)
 assert.deepEqual(data.outlines![10].map(s=>s.direction),['down','right'])
})
test('萄의 승인되지 않은 경로·순서·근거 변경을 거부한다',()=>{
 for(const modify of [
  (e:typeof reviewed[number])=>{e.outlines[5].pop()},
  (e:typeof reviewed[number])=>{e.outlines[4][0].outline=e.outlines[1][0].outline},
  (e:typeof reviewed[number])=>{e.sourceStrokeIndices[4]=5},
  (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch53Strokes(changed))}
})
