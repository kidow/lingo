import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch305.json' with {type:'json'}
import {loadGlyphWikiBatch305Strokes} from './hanja-stroke-dictionary-glyphwiki-batch305.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch305Strokes(reviewed)[0]
test('璉15획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'璉',strokes:15}),data)
 assert.equal(hanjaStrokeData({glyph:'璉',strokes:14}),null)
 assert.equal(hanjaStrokeData({glyph:'璉',strokes:16}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='璉').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch305-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('璉의 국내 전체 경로와4Q·1C 및 꺾임·받침 연결을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,11,12,13,15,16,17,18,5,6,7,9])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["right"],["down"],["curve"],["right"],["down"],["right","down"],["right"],["right"],["right"],["down"],["curve"],["curve"],["right","down"],["curve","curve"]])
 assert.equal(data.outlines!.flat().length,18)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.paths.length,15)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u7489-k/u7489/u738b-01/u9023-ue0100/aj1-14097/u8fb6/u8eca-06'))
})
test('璉의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch305Strokes(changed))}
})
