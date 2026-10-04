import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch273.json' with {type:'json'}
import {loadGlyphWikiBatch273Strokes} from './hanja-stroke-dictionary-glyphwiki-batch273.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch273Strokes(reviewed)[0]
test('塼14획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'塼',strokes:14}),data)
 assert.equal(hanjaStrokeData({glyph:'塼',strokes:13}),null)
 assert.equal(hanjaStrokeData({glyph:'塼',strokes:15}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='塼').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch273-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('塼 국내 순서와 土·專·寸의5곡선·꺾임·원본 갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,8,9,10,11,12,13,14,15])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['curve'])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![8].map(p=>p.direction),['down'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['curve'])
 assert.deepEqual(data.outlines![10].map(p=>p.direction),['curve'])
 assert.deepEqual(data.outlines![12].map(p=>p.direction),['down','curve'])
 assert.deepEqual(data.outlines![13].map(p=>p.direction),['curve'])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.paths.length,14)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u587c-k/u587c/u571f-01/u5c08/cdp-8bd0/u5bf8-04'))
})
test('塼 경로·국내 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[12][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(7,2,10,9)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch273Strokes(changed))}
})
