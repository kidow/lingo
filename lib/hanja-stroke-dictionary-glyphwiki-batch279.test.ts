import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch279.json' with {type:'json'}
import {loadGlyphWikiBatch279Strokes} from './hanja-stroke-dictionary-glyphwiki-batch279.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch279Strokes(reviewed)[0]
test('熉14획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'熉',strokes:14}),data)
 assert.equal(hanjaStrokeData({glyph:'熉',strokes:13}),null)
 assert.equal(hanjaStrokeData({glyph:'熉',strokes:15}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='熉').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch279-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('熉의 국내 火·口·貝 순서와6곡선·연속 갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,8,9,10,12,13,14,15,16])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["curve"],["down","curve"],["curve"],["down"],["right","down"],["right"],["down"],["right","down"],["right"],["right"],["right"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,17)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.paths.length,14)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u7189-k/u7189/u706b-01/u54e1-02/u53e3/u76ee'))
})
test('熉의 순열·갈고리·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[2][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch279Strokes(changed))}
})
