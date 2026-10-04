import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch276.json' with {type:'json'}
import {loadGlyphWikiBatch276Strokes} from './hanja-stroke-dictionary-glyphwiki-batch276.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch276Strokes(reviewed)[0]
test('憁14획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'憁',strokes:14}),data)
 assert.equal(hanjaStrokeData({glyph:'憁',strokes:13}),null)
 assert.equal(hanjaStrokeData({glyph:'憁',strokes:15}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='憁').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch276-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('憁의 국내 심방변·囱·心 순서와10곡선·연속 갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[2,3,1,8,4,5,9,10,12,7,13,14,15,16])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["curve"],["down"],["curve"],["down"],["right","down"],["curve"],["right","curve"],["curve"],["right"],["curve"],["down","curve","right"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,18)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,10)
 assert.equal(data.paths.length,14)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u6181-k/u5fc4-01/u5fc4/u60a4-g/u5fc3-04/u5fc3-09/u56f1-g@4/u56d7@4'))
})
test('憁의 순열·갈고리·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[11][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,1,2,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch276Strokes(changed))}
})
