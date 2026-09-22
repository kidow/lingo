import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch47.json' with { type: 'json' }
import { loadGlyphWikiBatch47Strokes } from './hanja-stroke-dictionary-glyphwiki-batch47.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'

const data=loadGlyphWikiBatch47Strokes(reviewed)[0]
test('菽12획은 원본 전체 윤곽을 재현하고 국내 순서로 한 번 등록된다',()=>{
  assert.equal(hanjaStrokeData({glyph:'菽',strokes:12}),data)
  assert.equal(hanjaStrokeData({glyph:'菽',strokes:13}),null)
  assert.equal(HANJA_STROKES.filter(s=>s.glyph==='菽').length,1)
  assert.equal(data.paths.length,12)
  assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,10,9,11,13])
  const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch47-2026-09-22/verify.mjs',import.meta.url))
  assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('菽8획 갈고리는 원본 세로·곡선 뒤 왼쪽으로 재생된다',()=>{
  const hook=data.outlines![7]
  assert.deepEqual(hook.map(s=>s.direction),['down','curve','left'])
  assert.equal(hook[2].outline,'M24.5 90.65 L24.5 87.65 L16.5 87.65 L16.5 89.15 Z')
  const total=hook.reduce((n,s)=>n+s.weight,0),begin=1-hook[2].weight/total
  assert.equal(outlineSegmentProgress(hook,begin-.001)[2],0)
  const p=outlineSegmentProgress(hook,(begin+1)/2)
  assert.deepEqual(p.slice(0,2),[1,1]);assert(Math.abs(p[2]-.5)<1e-12)
  assert.deepEqual(data.outlines![10].map(s=>s.direction),['right','curve'])
  assert.match(data.outlines![10][1].revealPath!,/^M87\.85 37\.74 Q/)
})
test('菽 원본 갈고리·작은 획 순서·국내 근거 변경을 거부한다',()=>{
  for(const modify of [
    (e:typeof reviewed[number])=>{e.outlines[7].pop()},
    (e:typeof reviewed[number])=>{e.outlines[7][2].direction='right'},
    (e:typeof reviewed[number])=>{[e.sourceStrokeIndices[8],e.sourceStrokeIndices[9]]=[e.sourceStrokeIndices[9],e.sourceStrokeIndices[8]]},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch47Strokes(changed))}
})
