import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch346.json' with {type:'json'}
import {loadGlyphWikiBatch346Strokes} from './hanja-stroke-dictionary-glyphwiki-batch346.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch346Strokes(reviewed)[0]
test('霙17획은 한 번만 등록되고 원본 및 명시된 완성 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'霙',strokes:17}),data)
 for(const strokes of [16,18])assert.equal(hanjaStrokeData({glyph:'霙',strokes}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='霙').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch346-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('霙은 국내 필순과 원본의 연속 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,5,6,7,8,9,10,11,13,12,14,15,17,18,19])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["curve"],["curve"],["down"],["right"],["right"],["right"],["right"],["right"],["down"],["right"],["down"],["down"],["curve"],["right"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,17)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.paths.length,17)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u9719-ue0102/u96e8-03/u5e00-03-var-003/koseki-344840/u82f1-ue0104/ufa5e-03/u8279-k03/u592e-04'))
})
test('霙의 방향·윤곽·순열·완성 원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[15][0].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[13][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch346Strokes(changed))}
})
