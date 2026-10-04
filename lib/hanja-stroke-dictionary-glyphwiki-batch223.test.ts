import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch223.json' with {type:'json'}
import {loadGlyphWikiBatch223Strokes} from './hanja-stroke-dictionary-glyphwiki-batch223.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch223Strokes(reviewed)[0]
test('荻11획은 중복 없이 등록되고 정확한 전체 원본 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'荻',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'荻',strokes:12}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='荻').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch223-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('荻 꺾임과 곡선 및 원본11개 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10,11])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['curve','curve'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['down','curve'])
 assert.equal(data.outlines!.flat().length,13)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,8)
 assert.equal(data.outlines![5][0].revealPath,"M9.454500000000001 33.1 C39.503475 49.9 35.69445 81.4 30.498240349998536 87.41604992261969")
 assert.equal(data.paths.length,11)
 assert.match(reviewed[0].geometryLicense.revision,/u72c4/)
})
test('荻 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[5][0];assert('revealPath' in part);part.revealPath='M0 0 C0 0 1 1 2 2'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch223Strokes(changed))}
})
