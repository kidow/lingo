import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch220.json' with {type:'json'}
import {loadGlyphWikiBatch220Strokes} from './hanja-stroke-dictionary-glyphwiki-batch220.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch220Strokes(reviewed)[0]
test('笭11획은 중복 없이 등록되고 정확한 전체 원본 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'笭',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'笭',strokes:12}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='笭').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch220-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('笭 꺾임과 곡선 및 원본12개 그룹를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,Array.from({length:12},(_,i)=>i+1))
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['right','down','curve'])
 assert.equal(data.outlines!.flat().length,13)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,7)
 assert.equal(data.outlines![9][2].revealPath,"M75.8 80.93625 Q75.8 85.93625 70.8 85.93625")
 assert.equal(data.paths.length,11)
 assert.match(reviewed[0].geometryLicense.revision,/u4ee4@5/)
})
test('笭 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[9][2];assert('revealPath' in part);part.revealPath='M0 0 C0 0 1 1 2 2'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch220Strokes(changed))}
})
