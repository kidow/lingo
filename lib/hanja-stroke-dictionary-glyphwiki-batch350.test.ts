import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch350.json' with {type:'json'}
import {loadGlyphWikiBatch350Strokes} from './hanja-stroke-dictionary-glyphwiki-batch350.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch350Strokes(reviewed)[0]
test('璵18획은 한 번만 등록되고 원본 및 명시된 과거 버전을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'璵',strokes:18}),data)
 for(const strokes of [17,19])assert.equal(hanjaStrokeData({glyph:'璵',strokes}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='璵').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch350-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('璵은 국내 필순과 원본의 연속 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,5,6,7,12,20,19,15,14,10,11,13,8,17,18])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["right"],["down"],["curve"],["curve"],["down"],["right"],["right"],["right"],["down"],["curve"],["down"],["curve"],["right"],["right"],["right"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,18)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.paths.length,18)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u74b5-k/u738b-01/u8207@4'))
})
test('璵의 방향·윤곽·순열·과거 원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[10][0].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[13][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch350Strokes(changed))}
})
