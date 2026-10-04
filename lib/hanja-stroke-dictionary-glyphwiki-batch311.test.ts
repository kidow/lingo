import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch311.json' with {type:'json'}
import {loadGlyphWikiBatch311Strokes} from './hanja-stroke-dictionary-glyphwiki-batch311.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch311Strokes(reviewed)[0]
test('蔯15획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'蔯',strokes:15}),data)
 assert.equal(hanjaStrokeData({glyph:'蔯',strokes:14}),null)
 assert.equal(hanjaStrokeData({glyph:'蔯',strokes:16}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='蔯').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch311-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('蔯의 국내 전체 경로와5곡선·중앙 세로13획 순서 보정을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,7,8,9,11,12,17,14,10,15,16])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["down"],["right"],["down"],["right","curve"],["curve","curve"],["down"],["right"],["down"],["right","down"],["right"],["right"],["down"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,18)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.paths.length,15)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u852f-k/u852f-ue0102/ufa5e-03/u8279-k03/u9673/u961d-01/u6771-02'))
})
test('蔯의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch311Strokes(changed))}
})
