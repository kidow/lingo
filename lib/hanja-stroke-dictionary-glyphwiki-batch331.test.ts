import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch331.json' with {type:'json'}
import {loadGlyphWikiBatch331Strokes} from './hanja-stroke-dictionary-glyphwiki-batch331.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch331Strokes(reviewed)[0]
test('蕨16획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'蕨',strokes:16}),data)
 assert.equal(hanjaStrokeData({glyph:'蕨',strokes:15}),null)
 assert.equal(hanjaStrokeData({glyph:'蕨',strokes:17}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='蕨').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch331-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('蕨의 국내 전체 경로와9곡선·전체 원본을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10,12,13,15,16,18,19])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["down"],["right"],["down"],["right"],["curve"],["curve"],["curve"],["right"],["curve"],["down"],["curve"],["curve"],["curve"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,9)
 assert.equal(data.paths.length,16)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u8568-k/u8568-ue0102/ufa5e-03/u8279-k03/u53a5-var-001/u5382-05/u6b2e/u5c70/u6b20-02'))
})
test('蕨의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch331Strokes(changed))}
})
