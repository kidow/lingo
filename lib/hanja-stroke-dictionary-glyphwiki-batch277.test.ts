import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch277.json' with {type:'json'}
import {loadGlyphWikiBatch277Strokes} from './hanja-stroke-dictionary-glyphwiki-batch277.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch277Strokes(reviewed)[0]
test('摠14획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'摠',strokes:14}),data)
 assert.equal(hanjaStrokeData({glyph:'摠',strokes:13}),null)
 assert.equal(hanjaStrokeData({glyph:'摠',strokes:15}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='摠').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch277-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('摠의 국내 손수변·囱·心 순서와10곡선·연속 갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,8,4,5,9,10,12,7,13,14,15,16])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["down","curve"],["curve"],["curve"],["down"],["right","down"],["curve"],["right","curve"],["curve"],["right"],["curve"],["down","curve","right"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,19)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,10)
 assert.equal(data.paths.length,14)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u6460-k/u6460-ue0102/u624c-01/u56f1-var-001@2/u56d7@4/u5902-06/u5fc3-04/u5fc3-09'))
})
test('摠의 순열·갈고리·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[11][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch277Strokes(changed))}
})
