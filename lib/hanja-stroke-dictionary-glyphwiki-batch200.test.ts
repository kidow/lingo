import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch200.json' with {type:'json'}
import {loadGlyphWikiBatch200Strokes} from './hanja-stroke-dictionary-glyphwiki-batch200.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch200Strokes(reviewed)[0]
test('荇10획은 중복 없이 등록되고 전체 원본과 정확한 선언 리비전을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'荇',strokes:10}),data)
 assert.equal(hanjaStrokeData({glyph:'荇',strokes:11}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='荇').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch200-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('荇 원본 3곡선과 마지막 연속 갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['down','curve'])
 assert.equal(data.outlines!.flat().length,11)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,3)
 assert.equal(data.outlines![9][1].revealPath,'M71.31 85.93 Q71.31 90.93 66.31 90.93')
 assert.equal(data.paths.length,10)
 assert.match(reviewed[0].geometryLicense.revision,/u884c@8/)
 assert.match(reviewed[0].geometryLicense.revision,/u5f73-01@2/)
})
test('荇 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[9][1].revealPath='M0 0 Q0 0 1 1'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch200Strokes(changed))}
})
