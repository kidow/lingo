import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch61.json' with { type: 'json' }
import { loadGlyphWikiBatch61Strokes } from './hanja-stroke-dictionary-glyphwiki-batch61.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch61Strokes(reviewed)[0]
test('玘7획은 국내 가로·가로·세로 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'玘',strokes:7}),data)
 assert.equal(hanjaStrokeData({glyph:'玘',strokes:8}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='玘').length,1)
 assert.equal(data.paths.length,7)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7])
 assert.deepEqual(data.outlines!.slice(0,3).map(s=>s[0].direction),['right','right','down'])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch61-2026-09-22/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('玘의 원본 곡선과 갈고리는 순차 재생되고 윤곽 중첩에 구멍이 나지 않는다',()=>{
 assert.equal(data.outlines![3][0].revealPath,'M8.155 77.5 Q25.0475 73 44.27 65.5')
 assert.deepEqual(data.outlines![4].map(s=>s.direction),['right','down'])
 const stroke=data.outlines![6]
 assert.deepEqual(stroke.map(s=>s.direction),['down','curve','right','up'])
 assert.equal(stroke[3].outline,'M90.2 83.5 L87.2 83.5 L90.2 71 L91.2 71 Z')
 const total=stroke.reduce((n,s)=>n+s.weight,0),begin=1-stroke[3].weight/total
 assert.equal(outlineSegmentProgress(stroke,begin-.001)[3],0)
 const p=outlineSegmentProgress(stroke,(begin+1)/2)
 assert.deepEqual(p.slice(0,3),[1,1,1]);assert(Math.abs(p[3]-.5)<1e-12)
 for(const s of data.outlines!.flat())for(const path of s.outline.split(' Z').map(x=>x.trim()).filter(Boolean)){
  const vertices=[...path.matchAll(/[ML](-?[0-9.]+) (-?[0-9.]+)/g)].map(m=>[Number(m[1]),Number(m[2])])
  assert(vertices.reduce((sum,v,i)=>{const next=vertices[(i+1)%vertices.length];return sum+v[0]*next[1]-next[0]*v[1]},0)>0)
 }
})
test('玘의 갈고리·곡선·필순·근거 변경은 승인을 무효화한다',()=>{
 for(const modify of [
  (e:typeof reviewed[number])=>{e.outlines[6].pop()},
  (e:typeof reviewed[number])=>{e.outlines[6][3].direction='right'},
  (e:typeof reviewed[number])=>{e.outlines[3][0].revealPath='M8 77 Q25 73 44 65'},
  (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
  (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch61Strokes(changed))}
})
