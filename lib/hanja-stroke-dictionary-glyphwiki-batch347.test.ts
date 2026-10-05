import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch347.json' with {type:'json'}
import {loadGlyphWikiBatch347Strokes} from './hanja-stroke-dictionary-glyphwiki-batch347.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch347Strokes(reviewed)[0]
test('擥18획은 중복 없이 등록되고 정확한 전체·과거 버전 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'擥',strokes:18}),data)
 assert.equal(hanjaStrokeData({glyph:'擥',strokes:17}),null)
 assert.equal(hanjaStrokeData({glyph:'擥',strokes:19}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='擥').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch347-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('擥의 전체 원본과 국내 방향, 별도 원본 갈고리 윤곽을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[2,3,4,6,7,1,9,10,11,12,13,15,16,17,18,19,20,21])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["down"],["curve"],["right"],["down"],["curve"],["curve"],["right"],["right"],["down"],["curve"],["down"],["down"],["right"],["curve"],["right"],["right"],["curve","left"]])
 assert.equal(data.outlines!.flat().length,19)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.paths.length,18)
 assert.equal(data.outlines![17][1].direction,'left')
 assert.equal(data.outlines![17][1].weight,10)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u64e5-k/u64e5/cdp-8d50-03@1/u81e3@3/cdp-8d4e-var-001@2/cdp-8c74-var-001@1/u7f52@4/u624b-04'))
})
test('擥의 갈고리 방향·윤곽·순열·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[17][1].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[17][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch347Strokes(changed))}
})
