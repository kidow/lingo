import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch320.json' with {type:'json'}
import {loadGlyphWikiBatch320Strokes} from './hanja-stroke-dictionary-glyphwiki-batch320.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch320Strokes(reviewed)[0]
test('敾16획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'敾',strokes:16}),data)
 assert.equal(hanjaStrokeData({glyph:'敾',strokes:15}),null)
 assert.equal(hanjaStrokeData({glyph:'敾',strokes:17}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='敾').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch320-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('敾의 국내 전체 경로와8곡선·전체 원본을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["curve"],["right"],["right"],["right"],["down"],["curve"],["curve"],["right"],["down"],["curve"],["right"],["curve"],["right"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,8)
 assert.equal(data.paths.length,16)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u657e-k/u657e/u5584-08/u6535-02'))
})
test('敾의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch320Strokes(changed))}
})
