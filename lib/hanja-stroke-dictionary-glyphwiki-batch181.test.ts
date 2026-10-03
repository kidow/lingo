import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch181.json' with {type:'json'}
import {loadGlyphWikiBatch181Strokes} from './hanja-stroke-dictionary-glyphwiki-batch181.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch181Strokes(reviewed)[0]
test('苾9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'苾',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'苾',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='苾').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch181-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('苾 국내 순서와 원본 곡선·갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['down','curve','right'])
 assert.equal(data.outlines![6][1].revealPath,"M33.5 84.225 Q33.5 89.225 38.5 89.225")
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.outlines![5][0].revealPath,"M75 38.900000000000006 Q52 78.55 8 93.80000000000001")
 assert.equal(data.paths.length,9)
})
test('苾 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch181Strokes(changed))}
})
