import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch66.json' with { type: 'json' }
import { loadGlyphWikiBatch66Strokes } from './hanja-stroke-dictionary-glyphwiki-batch66.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch66Strokes(reviewed)[0]
test('劤6획은 원본 도형·국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'劤',strokes:6}),data)
 assert.equal(hanjaStrokeData({glyph:'劤',strokes:7}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='劤').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,7])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch66-2026-09-22/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('劤의 두 내림 곡선과 力 갈고리는 원본 순서로 재생된다',()=>{
 for(const i of [1,5])assert.deepEqual(data.outlines![i].map(s=>s.direction),['down','curve'])
 const s=data.outlines![4];assert.deepEqual(s.map(p=>p.direction),['right','curve','curve','left'])
 assert.equal(s[2].revealPath,"M82.20138798937315 85.67067463377725 Q79.7 90 74.7 90")
 assert.equal(s[3].outline,"M74.7 90 L66.7 88.5 L66.7 87 L74.7 87 Z")
 const total=s.reduce((n,p)=>n+p.weight,0),start=1-s[3].weight/total
 assert.equal(outlineSegmentProgress(s,start-.001)[3],0)
 const p=outlineSegmentProgress(s,(start+1)/2);assert.deepEqual(p.slice(0,3),[1,1,1]);assert(Math.abs(p[3]-.5)<1e-12)
})
test('劤의 곡선·갈고리·순서·근거 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4].pop()},
 (e:typeof reviewed[number])=>{e.outlines[4][3].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[4][2].revealPath='M80 80 Q80 90 75 90'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch66Strokes(changed))}
})
