import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch253.json' with {type:'json'}
import {loadGlyphWikiBatch253Strokes} from './hanja-stroke-dictionary-glyphwiki-batch253.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch253Strokes(reviewed)[0]
test('僊13획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'僊',strokes:13}),data)
 assert.equal(hanjaStrokeData({glyph:'僊',strokes:12}),null)
 assert.equal(hanjaStrokeData({glyph:'僊',strokes:14}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='僊').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch253-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('僊 국내 순서와 두 연속 꺾임 및 마지막 곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,8,9,7,10,11,12,13,15])
 assert.deepEqual(data.outlines![4].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![11].map(p=>p.direction),['right','curve','curve'])
 assert.deepEqual(data.outlines![12].map(p=>p.direction),['down','curve','right'])
 assert.equal(data.outlines!.flat().length,18)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.paths.length,13)
 assert.match(reviewed[0].geometryLicense.revision,/aj1-07982/)
})
test('僊 경로·국내 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[12][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(5,3,7,8,9)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch253Strokes(changed))}
})
