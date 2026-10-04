import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch287.json' with {type:'json'}
import {loadGlyphWikiBatch287Strokes} from './hanja-stroke-dictionary-glyphwiki-batch287.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch287Strokes(reviewed)[0]
test('蓆14획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'蓆',strokes:14}),data)
 assert.equal(hanjaStrokeData({glyph:'蓆',strokes:13}),null)
 assert.equal(hanjaStrokeData({glyph:'蓆',strokes:15}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='蓆').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch287-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('蓆의 국내 艹·广·廿·巾 순서와2곡선·연속 꺾임을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,10,8,9,11,12,13,15])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["down"],["right"],["down"],["down"],["right"],["down","curve"],["right"],["down"],["down"],["right"],["down"],["right","down","curve"],["down"]])
 assert.equal(data.outlines!.flat().length,17)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,2)
 assert.equal(data.paths.length,14)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u84c6-k/koseki-357240/ufa5e-03/u8279-k03/u5e2d/u5e7f-05/u5eff/u5dfe-04@6'))
})
test('蓆의 순열·갈고리·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[12][2].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch287Strokes(changed))}
})
