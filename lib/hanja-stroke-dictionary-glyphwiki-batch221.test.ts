import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch221.json' with {type:'json'}
import {loadGlyphWikiBatch221Strokes} from './hanja-stroke-dictionary-glyphwiki-batch221.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch221Strokes(reviewed)[0]
test('耈11획은 중복 없이 등록되고 정확한 전체 원본 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'耈',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'耈',strokes:12}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='耈').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch221-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('耈 꺾임과 곡선 및 원본13개 그룹을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,Array.from({length:13},(_,i)=>i+1))
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['down','curve','right'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['right','curve','curve'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['right','down'])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.outlines![7][2].revealPath,"M78.04145218132514 89.2172807815806 Q73.48 91.265 68.48 91.265")
 assert.equal(data.paths.length,11)
 assert.match(reviewed[0].geometryLicense.revision,/u8001-03/)
})
test('耈 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[7][2];assert('revealPath' in part);part.revealPath='M0 0 C0 0 1 1 2 2'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch221Strokes(changed))}
})
