import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch298.json' with {type:'json'}
import {loadGlyphWikiBatch298Strokes} from './hanja-stroke-dictionary-glyphwiki-batch298.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch298Strokes(reviewed)[0]
test('憘15획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'憘',strokes:15}),data)
 assert.equal(hanjaStrokeData({glyph:'憘',strokes:14}),null)
 assert.equal(hanjaStrokeData({glyph:'憘',strokes:16}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='憘').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch298-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('憘의 국내 忄·丷 순서와4곡선·연속 꺾임을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[2,3,1,4,5,6,7,8,10,12,11,13,14,15,17])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["curve"],["down"],["right"],["down"],["right"],["down"],["right","down"],["right"],["curve"],["curve"],["right"],["down"],["right","down"],["right"]])
 assert.equal(data.outlines!.flat().length,17)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,4)
 assert.equal(data.paths.length,15)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u6198-k/u6198/u5fc4-01/u5fc4/u559c/u58f4-03/u53e3'))
})
test('憘의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch298Strokes(changed))}
})
