import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch231.json' with {type:'json'}
import {loadGlyphWikiBatch231Strokes} from './hanja-stroke-dictionary-glyphwiki-batch231.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch231Strokes(reviewed)[0]
test('堧12획은 중복 없이 등록되고 정확한 전체 원본 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'堧',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'堧',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='堧').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch231-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('堧 꺾임과 곡선 및 원본14개 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,9,10,11,12,13])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['right','down','curve'])
 assert.equal(data.outlines!.flat().length,14)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.outlines![6][2].revealPath,"M86.03020000000001 45.33199999999999 Q86.03020000000001 50.33199999999999 81.03020000000001 50.33199999999999")
 assert.equal(data.paths.length,12)
 assert.match(reviewed[0].geometryLicense.revision,/u800c-04/)
})
test('堧 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[6][2];assert('revealPath' in part);part.revealPath='M0 0 C0 0 1 1 2 2'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch231Strokes(changed))}
})
