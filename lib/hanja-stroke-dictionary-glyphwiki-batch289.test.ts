import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch289.json' with {type:'json'}
import {loadGlyphWikiBatch289Strokes} from './hanja-stroke-dictionary-glyphwiki-batch289.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch289Strokes(reviewed)[0]
test('蓚14획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'蓚',strokes:14}),data)
 assert.equal(hanjaStrokeData({glyph:'蓚',strokes:13}),null)
 assert.equal(hanjaStrokeData({glyph:'蓚',strokes:15}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='蓚').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch289-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('蓚의 국내 艹·攵·彡 순서와7곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,11,12,13,14,8,9,10])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["down"],["right"],["down"],["curve"],["down"],["down"],["curve"],["right"],["curve"],["curve"],["curve"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,14)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,7)
 assert.equal(data.paths.length,14)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u84da-k/koseki-357860/ufa5e-03/u8279-k03/u4fee/u4ebb-01/u38ca-02'))
})
test('蓚의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch289Strokes(changed))}
})
