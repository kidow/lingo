import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch50.json' with { type: 'json' }
import { loadGlyphWikiBatch50Strokes } from './hanja-stroke-dictionary-glyphwiki-batch50.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch50Strokes(reviewed)[0]
test('萌12획은 원본 윤곽을 재현하고 국내 순서로 한 번 등록된다',()=>{
  assert.equal(hanjaStrokeData({glyph:'萌',strokes:12}),data)
  assert.equal(hanjaStrokeData({glyph:'萌',strokes:13}),null)
  assert.equal(HANJA_STROKES.filter(s=>s.glyph==='萌').length,1)
  assert.equal(data.paths.length,12)
  assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,8,9,10,11,13,14])
  const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch50-2026-09-22/verify.mjs',import.meta.url))
  assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('萌 月의 곡선과 갈고리는 원본 방향과 순서를 보존한다',()=>{
  assert.deepEqual(data.outlines![8].map(s=>s.direction),['down','curve'])
  assert.equal(data.outlines![8][1].revealPath,'M56 61.98 Q56 87.14 30.5 93.06')
  assert.deepEqual(data.outlines![5].map(s=>s.direction),['right','down'])
  const stroke=data.outlines![9]
  assert.deepEqual(stroke.map(s=>s.direction),['right','down','curve','left'])
  assert.equal(stroke[3].outline,'M79.5 90.8 L79.5 87.8 L69.5 87.8 L69.5 89.3 Z')
  const total=stroke.reduce((n,s)=>n+s.weight,0),begin=1-stroke[3].weight/total
  assert.equal(outlineSegmentProgress(stroke,begin-.001)[3],0)
  const p=outlineSegmentProgress(stroke,(begin+1)/2)
  assert.deepEqual(p.slice(0,3),[1,1,1]);assert(Math.abs(p[3]-.5)<1e-12)
})
test('萌 곡선·갈고리·국내 근거 변경은 승인을 무효화한다',()=>{
  for(const modify of [
    (e:typeof reviewed[number])=>{e.outlines[9].pop()},
    (e:typeof reviewed[number])=>{e.outlines[9][3].direction='right'},
    (e:typeof reviewed[number])=>{e.outlines[8][1].revealPath='M56 61.98 Q56 87.14 40 93.06'},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch50Strokes(changed))}
})
