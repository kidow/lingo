import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch326.json' with {type:'json'}
import {loadGlyphWikiBatch326Strokes} from './hanja-stroke-dictionary-glyphwiki-batch326.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch326Strokes(reviewed)[0]
test('璡16획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'璡',strokes:16}),data)
 assert.equal(hanjaStrokeData({glyph:'璡',strokes:15}),null)
 assert.equal(hanjaStrokeData({glyph:'璡',strokes:17}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='璡').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch326-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('璡의 국내 전체 경로와8곡선·전체 원본을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,11,12,13,14,16,17,15,18,5,6,7,9])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["right"],["down"],["curve"],["curve"],["down"],["curve"],["right"],["right"],["right"],["down"],["right"],["curve"],["curve"],["curve"],["curve","curve"]])
 assert.equal(data.outlines!.flat().length,17)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,8)
 assert.equal(data.paths.length,16)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u74a1-k/u74a1/u738b-01/aj1-13855/u8fb6/u96b9-07'))
})
test('璡의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch326Strokes(changed))}
})
