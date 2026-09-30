import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch160.json' with {type:'json'}
import {loadGlyphWikiBatch160Strokes} from './hanja-stroke-dictionary-glyphwiki-batch160.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch160Strokes(reviewed)[0]
test('杋7획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'杋',strokes:7}),data)
 assert.equal(hanjaStrokeData({glyph:'杋',strokes:8}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='杋').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch160-2026-09-30/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('杋5획 내려굽힘과6획 꺾임 경계를 보존한다',()=>{
 assert.deepEqual(data.outlines![4].map(p=>p.direction),['down','curve'])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','down','curve','right'])
 assert.equal(data.paths.length,7)
})
test('杋 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch160Strokes(changed))}
})
