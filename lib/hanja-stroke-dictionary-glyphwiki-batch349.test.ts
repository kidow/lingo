import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch349.json' with {type:'json'}
import {loadGlyphWikiBatch349Strokes} from './hanja-stroke-dictionary-glyphwiki-batch349.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch349Strokes(reviewed)[0]
test('歟18획은 한 번만 등록되고 원본 및 명시된 과거 버전을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'歟',strokes:18}),data)
 for(const strokes of [17,19])assert.equal(hanjaStrokeData({glyph:'歟',strokes}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='歟').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch349-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('歟은 국내 필순과 원본의 연속 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,8,16,15,11,10,6,7,9,4,13,14,17,18,20,21])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["down"],["right"],["right"],["right"],["down"],["curve"],["down"],["curve"],["right"],["right"],["right"],["curve"],["curve"],["curve"],["curve"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,18)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,9)
 assert.equal(data.paths.length,18)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u6b5f-k/koseki-184190/u8207@4/u6b20-02-var-003'))
})
test('歟의 방향·윤곽·순열·과거 원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[15][0].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[13][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch349Strokes(changed))}
})
