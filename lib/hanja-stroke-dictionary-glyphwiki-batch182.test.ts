import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch182.json' with {type:'json'}
import {loadGlyphWikiBatch182Strokes} from './hanja-stroke-dictionary-glyphwiki-batch182.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch182Strokes(reviewed)[0]
test('珌9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'珌',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'珌',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='珌').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch182-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('珌 국내 순서와 원본 곡선·갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,7,9,6,5,8])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['down','curve','right'])
 assert.equal(data.outlines![6][1].revealPath,"M56.370000000000005 83.5 Q56.370000000000005 88.5 61.370000000000005 88.5")
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.outlines![3][0].revealPath,"M7 77.5 Q21.5 73 38 65.5")
 assert.equal(data.paths.length,9)
})
test('珌 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch182Strokes(changed))}
})
