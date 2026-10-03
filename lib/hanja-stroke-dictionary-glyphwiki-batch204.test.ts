import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch204.json' with {type:'json'}
import {loadGlyphWikiBatch204Strokes} from './hanja-stroke-dictionary-glyphwiki-batch204.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch204Strokes(reviewed)[0]
test('堈11획은 중복 없이 등록되고 전체 원본과 연속된 선언 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'堈',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'堈',strokes:12}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='堈').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch204-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('堈 5·10획의 연속 꺾임·갈고리와 원본 4곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,9,10,11,12,13])
 assert.deepEqual(data.outlines![4].map(p=>p.direction),['right','down','curve'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['down','right'])
 assert.equal(data.outlines!.flat().length,14)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,4)
 assert.equal(data.outlines![4][2].revealPath,"M88.7542 85.85 Q88.7542 90.85 84.3792 90.85")
 assert.equal(data.paths.length,11)
 assert.match(reviewed[0].geometryLicense.revision,/u5182/)
})
test('堈 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[4][2];assert('revealPath' in part);part.revealPath='M0 0 Q0 0 1 1'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch204Strokes(changed))}
})

