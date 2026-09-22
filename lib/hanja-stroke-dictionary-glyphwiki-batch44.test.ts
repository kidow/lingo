import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch44.json' with { type: 'json' }
import { loadGlyphWikiBatch44Strokes } from './hanja-stroke-dictionary-glyphwiki-batch44.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineClip, outlineSegmentProgress } from './hanja-stroke-outline.ts'

const data=loadGlyphWikiBatch44Strokes(reviewed)[0]
test('苛9획의 등록·순서·완전한 원본 윤곽을 검증한다',()=>{
  assert.equal(hanjaStrokeData({glyph:'苛',strokes:9}),data)
  assert.equal(hanjaStrokeData({glyph:'苛',strokes:10}),null)
  assert.equal(HANJA_STROKES.filter(s=>s.glyph==='苛').length,1)
  assert.equal(data.paths.length,9)
  assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,7,8,10,6])
  assert.equal(createHash('sha256').update(JSON.stringify(data.paths)).digest('hex'),data.pathsSha256)
  const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch44-2026-09-22/verify.mjs',import.meta.url))
  assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('苛의 갈고리는 세로와 곡선 이후 오른쪽에서 왼쪽으로 드러난다',()=>{
  const last=data.outlines![8]
  assert.deepEqual(last.map(s=>s.direction),['down','curve','left'])
  assert.equal(last[2].outline,'M71 90.95 L71 87.95 L61 87.95 L61 89.45 Z')
  const total=last.reduce((n,s)=>n+s.weight,0),begin=1-last[2].weight/total
  assert.equal(outlineSegmentProgress(last,begin-.001)[2],0)
  const progress=outlineSegmentProgress(last,(begin+1)/2)
  assert.deepEqual(progress.slice(0,2),[1,1]);assert(Math.abs(progress[2]-.5)<1e-12)
  assert.deepEqual(outlineClip(last[2],.5),{x:66,y:87.95,width:5,height:3})
})
test('갈고리 생략·방향 변경·국내 순서 및 출처 변경을 거부한다',()=>{
  for(const modify of [
    (e:typeof reviewed[number])=>{e.outlines[8].pop()},
    (e:typeof reviewed[number])=>{e.outlines[8][2].direction='right'},
    (e:typeof reviewed[number])=>{e.sourceStrokeIndices.reverse()},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
    (e:typeof reviewed[number])=>{e.geometryLicense.revision='unverified'},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch44Strokes(changed))}
})
test('번들링용 시간 정규화는 고정 값이며 허용 오차로 검증을 완화하지 않는다',()=>{
  assert.equal(data.outlines![0][0].weight,41.41)
  for(const segment of data.outlines!.flat())assert.equal(segment.weight,Math.round(segment.weight*1e6)/1e6)
  const changed=structuredClone(reviewed)
  changed[0].outlines[0][0].weight=41.410000000000004
  assert.throws(()=>loadGlyphWikiBatch44Strokes(changed))
})
