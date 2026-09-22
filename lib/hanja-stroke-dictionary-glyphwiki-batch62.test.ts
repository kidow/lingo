import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch62.json' with { type: 'json' }
import { loadGlyphWikiBatch62Strokes } from './hanja-stroke-dictionary-glyphwiki-batch62.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch62Strokes(reviewed)[0]
test('坰8획은 원본 도형·국내 순서로 한 번 등록된다',()=>{
  assert.equal(hanjaStrokeData({glyph:'坰',strokes:8}),data)
  assert.equal(hanjaStrokeData({glyph:'坰',strokes:7}),null)
  assert.equal(HANJA_STROKES.filter(s=>s.glyph==='坰').length,1)
  assert.equal(data.paths.length,8)
  assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,7,8,10])
  const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch62-2026-09-22/verify.mjs',import.meta.url))
  assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('坰의 둥근 꺾임과 마지막 갈고리는 원본 순서로 재생된다',()=>{
  assert.equal(data.outlines![2][0].revealPath,'M7.3 78.5 Q19.48 74 37.96 64.5')
  assert.deepEqual(data.outlines![6].map(s=>s.direction),['right','down'])
  const stroke=data.outlines![4]
  assert.deepEqual(stroke.map(s=>s.direction),['right','down','curve','left'])
  assert.equal(stroke[3].outline,'M83.45 90 L74.45 88.5 L74.45 87 L83.45 87 Z')
  const total=stroke.reduce((n,s)=>n+s.weight,0),begin=1-stroke[3].weight/total
  assert.equal(outlineSegmentProgress(stroke,begin-.001)[3],0)
  const p=outlineSegmentProgress(stroke,(begin+1)/2)
  assert.deepEqual(p.slice(0,3),[1,1,1]);assert(Math.abs(p[3]-.5)<1e-12)
})
test('坰 갈고리·곡선·순서·근거 변경은 검토 승인을 무효화한다',()=>{
  for(const modify of [
    (e:typeof reviewed[number])=>{e.outlines[4].pop()},
    (e:typeof reviewed[number])=>{e.outlines[4][3].direction='right'},
    (e:typeof reviewed[number])=>{e.outlines[4][2].revealPath='M48 73 Q48 88 30 94'},
    (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch62Strokes(changed))}
})
