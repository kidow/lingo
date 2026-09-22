import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch70.json' with {type:'json'}
import {loadGlyphWikiBatch70Strokes} from './hanja-stroke-dictionary-glyphwiki-batch70.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
import {outlineSegmentProgress} from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch70Strokes(reviewed)[0]
test('杕7획은 원본 경로·국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'杕',strokes:7}),data)
 assert.equal(hanjaStrokeData({glyph:'杕',strokes:8}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='杕').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch70-2026-09-22/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('杕의 木 점획·大 내림곡선은 원본 방향과 연결점을 유지한다',()=>{
 for(const i of [2,3,6])assert.deepEqual(data.outlines![i].map(s=>s.direction),['curve'])
 const s=data.outlines![5];assert.deepEqual(s.map(p=>p.direction),['down','curve'])
 assert.equal(s[1].revealPath,"M65.815 24 Q65.815 77 32.3325 93.5")
 assert.equal(data.outlines![3][0].revealPath,"M26.125 43 Q35.15 47 40.375 54.5")
 const begin=s[0].weight/(s[0].weight+s[1].weight)
 assert.deepEqual(outlineSegmentProgress(s,begin),[1,0])
 const p=outlineSegmentProgress(s,(begin+1)/2);assert.equal(p[0],1);assert(Math.abs(p[1]-.5)<1e-12)
})
test('杕의 점획·곡선·순서·근거 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5].pop()},
 (e:typeof reviewed[number])=>{e.outlines[3][0].direction='left'},
 (e:typeof reviewed[number])=>{e.outlines[5][1].revealPath='M65 25 Q65 77 32 93'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch70Strokes(changed))}
})
