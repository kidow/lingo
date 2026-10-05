import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch351.json' with {type:'json'}
import {loadGlyphWikiBatch351Strokes} from './hanja-stroke-dictionary-glyphwiki-batch351.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch351Strokes(reviewed)[0]
test('璹18획은 중복 없이 등록되고 정확한 전체 원본과 선언 의존성을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'璹',strokes:18}),data)
 assert.equal(hanjaStrokeData({glyph:'璹',strokes:17}),null)
 assert.equal(hanjaStrokeData({glyph:'璹',strokes:19}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='璹').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch351-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('璹의 전체 원본과 국내 방향, 별도 원본 갈고리 윤곽을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,5,6,7,8,10,11,12,13,14,15,17,18,19,20])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["right"],["down"],["curve"],["right"],["down"],["right"],["curve"],["right"],["down"],["right"],["right"],["down"],["curve"],["right"],["right"],["curve","left"],["curve"]])
 assert.equal(data.outlines!.flat().length,19)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.paths.length,18)
 assert.equal(data.outlines![16][1].direction,'left')
 assert.equal(data.outlines![16][1].weight,10)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u74b9-k/u74b9/u738b-01/u58fd/cdp-8d53-var-001/u58eb-03/u53e3'))
})
test('璹의 갈고리 방향·윤곽·순열·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[16][1].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[16][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch351Strokes(changed))}
})
