import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch318.json' with {type:'json'}
import {loadGlyphWikiBatch318Strokes} from './hanja-stroke-dictionary-glyphwiki-batch318.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch318Strokes(reviewed)[0]
test('彛15획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'彛',strokes:16}),data)
 assert.equal(hanjaStrokeData({glyph:'彛',strokes:15}),null)
 assert.equal(hanjaStrokeData({glyph:'彛',strokes:17}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='彛').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch318-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('彛의 국내 전체 경로와10곡선·전체 원본을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,4,5,6,7,8,9,10,11,12,14,16,19,17,18])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["right"],["right"],["curve"],["curve"],["right"],["down"],["curve"],["curve"],["curve"],["right","curve"],["curve"],["curve"],["right"],["curve"],["down"]])
 assert.equal(data.outlines!.flat().length,17)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,10)
 assert.equal(data.paths.length,16)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u5f5b-k/u5f5b/aj1-15391/u5f50-ue0101/u7c73-06-var-001/j83-4a2c/u516b-03/u5200-14/u5efe-04'))
})
test('彛의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch318Strokes(changed))}
})
