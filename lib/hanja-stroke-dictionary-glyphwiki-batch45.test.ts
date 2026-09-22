import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch45.json' with { type: 'json' }
import { loadGlyphWikiBatch45Strokes } from './hanja-stroke-dictionary-glyphwiki-batch45.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineClip, outlineSegmentProgress } from './hanja-stroke-outline.ts'

const data=loadGlyphWikiBatch45Strokes(reviewed)[0]
test('芍7획은 중복 없이 등록되고 원본 윤곽·국내 순서를 재현한다',()=>{
  assert.equal(hanjaStrokeData({glyph:'芍',strokes:7}),data)
  assert.equal(hanjaStrokeData({glyph:'芍',strokes:8}),null)
  assert.equal(HANJA_STROKES.filter(s=>s.glyph==='芍').length,1)
  assert.equal(data.paths.length,7)
  assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,8])
  assert.equal(createHash('sha256').update(JSON.stringify(data.paths)).digest('hex'),data.pathsSha256)
  const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch45-2026-09-22/verify.mjs',import.meta.url))
  assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('芍의 바깥 획은 가로·곡선·모서리 뒤 왼쪽 갈고리로 이어진다',()=>{
  const outer=data.outlines![5]
  assert.deepEqual(outer.map(s=>s.direction),['right','curve','curve','left'])
  assert.equal(outer[3].outline,'M67.4 91 L67.4 88 L57.4 88 L57.4 89.5 Z')
  const total=outer.reduce((n,s)=>n+s.weight,0),begin=1-outer[3].weight/total
  assert.equal(outlineSegmentProgress(outer,begin-.001)[3],0)
  const p=outlineSegmentProgress(outer,(begin+1)/2)
  assert.deepEqual(p.slice(0,3),[1,1,1]);assert(Math.abs(p[3]-.5)<1e-12)
  const clip=outlineClip(outer[3],.5)
  assert(Math.abs(clip.x-62.4)<1e-12);assert(Math.abs(clip.width-5)<1e-12)
  assert.equal(clip.y,88);assert.equal(clip.height,3)
  assert.equal(data.outlines![6][0].direction,'right')
})
test('갈고리·곡선·내부 획·버전 참조가 바뀌면 등록을 거부한다',()=>{
  for(const modify of [
    (e:typeof reviewed[number])=>{e.outlines[5].pop()},
    (e:typeof reviewed[number])=>{e.outlines[5][3].direction='right'},
    (e:typeof reviewed[number])=>{e.outlines[4][0].revealPath='M0 0 L1 1'},
    (e:typeof reviewed[number])=>{e.sourceStrokeIndices.reverse()},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
    (e:typeof reviewed[number])=>{e.geometryLicense.revision='unverified'},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch45Strokes(changed))}
})
