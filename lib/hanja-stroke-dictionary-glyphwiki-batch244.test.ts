import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch244.json' with {type:'json'}
import {loadGlyphWikiBatch244Strokes} from './hanja-stroke-dictionary-glyphwiki-batch244.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch244Strokes(reviewed)[0]
test('菁12획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'菁',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'菁',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='菁').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch244-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('菁 국내 순서·연속 꺾임과 원본14개 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,7,6,8,9,10,12,13])
 assert.deepEqual(data.outlines!.slice(0,8).map(s=>s[0].direction),['right','down','right','down','right','right','down','right'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['right','down','curve'])
 assert.equal(data.outlines!.flat().length,14)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,1)
 assert.equal(data.paths.length,12)
 assert.match(reviewed[0].geometryLicense.revision,/u9fb6-03/)
})
test('菁 경로·순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[9][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch244Strokes(changed))}
})
