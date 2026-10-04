import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch222.json' with {type:'json'}
import {loadGlyphWikiBatch222Strokes} from './hanja-stroke-dictionary-glyphwiki-batch222.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch222Strokes(reviewed)[0]
test('荳11획은 중복 없이 등록되고 정확한 전체 원본 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'荳',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'荳',strokes:12}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='荳').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch222-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('荳 꺾임과 곡선 및 원본12개 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10,11,12])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['right','down'])
 assert.equal(data.outlines!.flat().length,12)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,2)
 assert.equal(data.outlines![8][0].revealPath,"M25.5 70.17 Q35 76.45 39 85.87")
 assert.equal(data.paths.length,11)
 assert.match(reviewed[0].geometryLicense.revision,/u8c46/)
})
test('荳 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[8][0];assert('revealPath' in part);part.revealPath='M0 0 C0 0 1 1 2 2'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch222Strokes(changed))}
})
