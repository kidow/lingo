import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch57.json' with { type: 'json' }
import { loadGlyphWikiBatch57Strokes } from './hanja-stroke-dictionary-glyphwiki-batch57.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch57Strokes(reviewed)[0]
test('慌13획은 국내 忄 순서와 원본 도형으로 한 번 등록된다',()=>{
  assert.equal(hanjaStrokeData({glyph:'慌',strokes:13}),data)
  assert.equal(hanjaStrokeData({glyph:'慌',strokes:12}),null)
  assert.equal(HANJA_STROKES.filter(s=>s.glyph==='慌').length,1)
  assert.equal(data.paths.length,13)
  assert.deepEqual(data.sourceStrokeIndices,[2,3,1,4,5,6,7,8,9,10,11,12,13])
  const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch57-2026-09-22/verify.mjs',import.meta.url))
  assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('慌의 둥근 꺾임과 마지막 갈고리는 원본 순서로 재생된다',()=>{
  assert.deepEqual(data.outlines![9].map(s=>s.direction),['down','curve','right'])
  assert.deepEqual(data.outlines![10].map(s=>s.direction),['down','curve'])
  const stroke=data.outlines![12]
  assert.deepEqual(stroke.map(s=>s.direction),['down','curve','right','up'])
  assert.equal(stroke[3].outline,'M91.05 86.65 L92.05 74.15 L91.05 74.15 L88.05 86.65 Z')
  const total=stroke.reduce((n,s)=>n+s.weight,0),begin=1-stroke[3].weight/total
  assert.equal(outlineSegmentProgress(stroke,begin-.001)[3],0)
  const p=outlineSegmentProgress(stroke,(begin+1)/2)
  assert.deepEqual(p.slice(0,3),[1,1,1]);assert(Math.abs(p[3]-.5)<1e-12)
})
test('慌 갈고리·곡선·순서·근거 변경은 검토 승인을 무효화한다',()=>{
  for(const modify of [
    (e:typeof reviewed[number])=>{e.outlines[12].pop()},
    (e:typeof reviewed[number])=>{e.outlines[12][3].direction='right'},
    (e:typeof reviewed[number])=>{e.outlines[10][1].revealPath='M48 73 Q48 88 30 94'},
    (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=1},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch57Strokes(changed))}
})
