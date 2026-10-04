import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch263.json' with {type:'json'}
import {loadGlyphWikiBatch263Strokes} from './hanja-stroke-dictionary-glyphwiki-batch263.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch263Strokes(reviewed)[0]
test('煐13획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'煐',strokes:13}),data)
 assert.equal(hanjaStrokeData({glyph:'煐',strokes:12}),null)
 assert.equal(hanjaStrokeData({glyph:'煐',strokes:14}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='煐').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch263-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('煐 국내 순서와 火·央 연속 곡선과 네 획 艹 및 央 꺾임을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,9,10,12,13,14])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['down','curve'])
 assert.deepEqual(data.outlines![11].map(p=>p.direction),['down','curve'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['right','down'])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.paths.length,13)
 assert.match(reviewed[0].geometryLicense.revision,/u82f1-ue0104@4\/ufa5e-03@3\/u592e@2/)
})
test('煐 경로·국내 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[9][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(2,2,4,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch263Strokes(changed))}
})
