import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch342.json' with {type:'json'}
import {loadGlyphWikiBatch342Strokes} from './hanja-stroke-dictionary-glyphwiki-batch342.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch342Strokes(reviewed)[0]
test('璥17획은 중복 없이 등록되고 정확한 전체·과거 버전 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'璥',strokes:17}),data)
 assert.equal(hanjaStrokeData({glyph:'璥',strokes:16}),null)
 assert.equal(hanjaStrokeData({glyph:'璥',strokes:18}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='璥').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch342-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('璥의 전체 원본과 국내 방향, 별도 원본 갈고리 윤곽을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,5,6,8,7,9,10,12,13,15,16,17,18,19])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["right"],["down"],["curve"],["right"],["down"],["right"],["down"],["curve"],["curve","left"],["down"],["curve"],["right"],["curve"],["right"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,18)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,7)
 assert.equal(data.paths.length,17)
 assert.equal(data.outlines![9][1].direction,'left')
 assert.equal(data.outlines![9][1].weight,10)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u74a5-ue0102/koseki-238380/u738b-01/u656c-var-002@1/u535d-03/u53e3@12/u53e3-j@2/u6535-02@9'))
})
test('璥의 갈고리 방향·윤곽·순열·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[9][1].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[9][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch342Strokes(changed))}
})
