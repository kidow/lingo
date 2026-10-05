import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch343.json' with {type:'json'}
import {loadGlyphWikiBatch343Strokes} from './hanja-stroke-dictionary-glyphwiki-batch343.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch343Strokes(reviewed)[0]
test('薏17획은 중복 없이 등록되고 정확한 전체·과거 버전 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'薏',strokes:17}),data)
 assert.equal(hanjaStrokeData({glyph:'薏',strokes:16}),null)
 assert.equal(hanjaStrokeData({glyph:'薏',strokes:18}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='薏').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch343-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('薏의 전체 원본과 국내 방향, 별도 원본 갈고리 윤곽을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10,11,13,14,15,16,17,18])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["down"],["right"],["down"],["down"],["right"],["curve"],["curve"],["right"],["down"],["curve"],["right"],["right"],["curve"],["curve","up"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,18)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,7)
 assert.equal(data.paths.length,17)
 assert.equal(data.outlines![14][1].direction,'up')
 assert.equal(data.outlines![14][1].weight,12.5)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u858f-k/koseki-364070/ufa5e-03/u8279-k03/u610f/u5fc3-04/u5fc3-09'))
})
test('薏의 갈고리 방향·윤곽·순열·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[14][1].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[14][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch343Strokes(changed))}
})
