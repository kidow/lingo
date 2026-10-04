import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch275.json' with {type:'json'}
import {loadGlyphWikiBatch275Strokes} from './hanja-stroke-dictionary-glyphwiki-batch275.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch275Strokes(reviewed)[0]
test('慽14획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'慽',strokes:14}),data)
 assert.equal(hanjaStrokeData({glyph:'慽',strokes:13}),null)
 assert.equal(hanjaStrokeData({glyph:'慽',strokes:15}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='慽').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch275-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('慽의 국내 심방변·戚 순서와9곡선·두 연속 갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[2,3,1,4,5,10,9,11,12,13,14,7,8,6])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["curve"],["down"],["down","curve"],["right"],["down"],["right"],["right"],["down","curve"],["curve"],["curve"],["curve"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,9)
 assert.equal(data.paths.length,14)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u617d-k/u617d/u5fc4-01/u5fc4/u621a-02'))
})
test('慽의 순열·갈고리·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[8][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,1,2,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch275Strokes(changed))}
})
