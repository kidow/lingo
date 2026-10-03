import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch198.json' with {type:'json'}
import {loadGlyphWikiBatch198Strokes} from './hanja-stroke-dictionary-glyphwiki-batch198.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch198Strokes(reviewed)[0]
test('茵10획은 중복 없이 등록되고 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'茵',strokes:10}),data)
 assert.equal(hanjaStrokeData({glyph:'茵',strokes:11}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='茵').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch198-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('茵 연속 꺾임과 type7의 두 곡선·마지막 외곽 닫기를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,9,10,11,8])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['down','curve'])
 assert.equal(data.outlines!.flat().length,12)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,2)
 assert.equal(data.outlines![7][1].revealPath,"M49 51.48999999999999 Q50 76.9 22 84.6")
 assert.equal(data.outlines![8][0].revealPath,"M50.5 59.575 Q63.5 67.66 71 77.67")
 assert.equal(data.paths.length,10)
 assert.match(reviewed[0].geometryLicense.revision,/u56e0-var-001/)
})
test('茵 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[7][1].revealPath='M0 0 Q0 0 1 1'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch198Strokes(changed))}
})
