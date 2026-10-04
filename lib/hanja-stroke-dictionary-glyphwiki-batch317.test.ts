import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch317.json' with {type:'json'}
import {loadGlyphWikiBatch317Strokes} from './hanja-stroke-dictionary-glyphwiki-batch317.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch317Strokes(reviewed)[0]
test('鋌15획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'鋌',strokes:15}),data)
 assert.equal(hanjaStrokeData({glyph:'鋌',strokes:14}),null)
 assert.equal(hanjaStrokeData({glyph:'鋌',strokes:16}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='鋌').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch317-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('鋌의 국내 전체 경로와7Q·1C·전체 원본을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,14,15,16,17,9,11,13])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["curve"],["right"],["right"],["down"],["curve"],["curve"],["curve"],["curve"],["right"],["down"],["right"],["curve"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,15)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,9)
 assert.equal(data.paths.length,15)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u92cc-ue0102/juki-bde9/u91d2-01/u5ef7/u5ef4-var-001/u58ec'))
})
test('鋌의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch317Strokes(changed))}
})
