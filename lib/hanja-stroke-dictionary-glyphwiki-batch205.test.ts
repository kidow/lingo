import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch205.json' with {type:'json'}
import {loadGlyphWikiBatch205Strokes} from './hanja-stroke-dictionary-glyphwiki-batch205.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch205Strokes(reviewed)[0]
test('寀11획은 중복 없이 등록되고 전체 원본과 연속된 선언 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'寀',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'寀',strokes:12}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='寀').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch205-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('寀 3획의 연속 꺾임과 5획 삐침 순열 및 원본 8곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,12,6,7,8,9,10,11])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['right','curve'])
 assert.equal(data.outlines!.flat().length,12)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,8)
 assert.equal(data.outlines![2][1].revealPath,"M88 19.70425 Q85 24.10525 78 31.440250000000002")
 assert.equal(data.outlines![4][0].revealPath,"M27 32.5 Q22.5 46 14 55")
 assert.equal(data.paths.length,11)
 assert.match(reviewed[0].geometryLicense.revision,/u5196-03/)
})
test('寀 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[2][1];assert('revealPath' in part);part.revealPath='M0 0 Q0 0 1 1'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch205Strokes(changed))}
})

