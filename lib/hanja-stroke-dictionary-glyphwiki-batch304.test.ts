import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch304.json' with {type:'json'}
import {loadGlyphWikiBatch304Strokes} from './hanja-stroke-dictionary-glyphwiki-batch304.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch304Strokes(reviewed)[0]
test('璂15획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'璂',strokes:15}),data)
 assert.equal(hanjaStrokeData({glyph:'璂',strokes:14}),null)
 assert.equal(hanjaStrokeData({glyph:'璂',strokes:16}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='璂').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch304-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('璂의 국내 전체 경로와3곡선·2·3획 순서 보정을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,5,6,7,8,9,10,11,12,13,14,15])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["right"],["down"],["curve"],["right"],["down"],["down"],["right"],["right"],["right"],["curve"],["curve"],["right"],["down"],["right"]])
 assert.equal(data.outlines!.flat().length,15)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,3)
 assert.equal(data.paths.length,15)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u7482-k/u7482/u738b-01/u57fa-02'))
})
test('璂의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch304Strokes(changed))}
})
