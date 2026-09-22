import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch73.json' with {type:'json'}
import {loadGlyphWikiBatch73Strokes} from './hanja-stroke-dictionary-glyphwiki-batch73.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
import {outlineSegmentProgress} from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch73Strokes(reviewed)[0]
test('艽6획은 완전한 백업 원본과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'艽',strokes:6}),data)
 assert.equal(hanjaStrokeData({glyph:'艽',strokes:8}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='艽').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch73-2026-09-22/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('艽의 연속 꺾임과 위쪽 갈고리는 원본 순서로 진행된다',()=>{
 assert.deepEqual(data.outlines![4].map(s=>s.direction),['down','curve'])
 const s=data.outlines![5];assert.deepEqual(s.map(p=>p.direction),['right','down','curve','right','up'])
 assert.equal(s[2].revealPath,'M67 84.4375 Q67 89.4375 72 89.4375')
 assert.equal(data.outlines![4][1].revealPath,'M44 48.1125 Q44 82.9125 9 93.7875')
 const beforeHook=s.slice(0,-1).reduce((n,p)=>n+p.weight,0)/s.reduce((n,p)=>n+p.weight,0)
 const p=outlineSegmentProgress(s,(beforeHook+1)/2);assert.deepEqual(p.slice(0,-1),[1,1,1,1]);assert(Math.abs(p[4]-.5)<1e-12)
})
test('艽의 갈고리·순서·백업 근거 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5].pop()},
 (e:typeof reviewed[number])=>{e.outlines[5][4].direction='down'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[2]=3},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch73Strokes(changed))}
})
