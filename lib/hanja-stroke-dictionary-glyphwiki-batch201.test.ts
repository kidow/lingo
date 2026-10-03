import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch201.json' with {type:'json'}
import {loadGlyphWikiBatch201Strokes} from './hanja-stroke-dictionary-glyphwiki-batch201.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch201Strokes(reviewed)[0]
test('荏10획은 중복 없이 등록되고 전체 원본과 선언된 부품을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'荏',strokes:10}),data)
 assert.equal(hanjaStrokeData({glyph:'荏',strokes:11}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='荏').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch201-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('荏 원본 두 곡선과 7획의 오른쪽에서 왼쪽 진행을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10])
 assert.equal(data.outlines!.flat().length,10)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,2)
 assert.equal(data.outlines![6][0].revealPath,'M82.6875 35.644999999999996 Q62.75 42.9425 34.8375 46.4175')
 assert.equal(data.paths.length,10)
 assert.match(reviewed[0].geometryLicense.revision,/u4ebb-01/)
 assert.match(reviewed[0].geometryLicense.revision,/u58ec/)
})
test('荏 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[6][0];assert('revealPath' in part);part.revealPath='M0 0 Q0 0 1 1'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch201Strokes(changed))}
})
