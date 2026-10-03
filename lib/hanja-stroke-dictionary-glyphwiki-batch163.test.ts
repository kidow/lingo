import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch163.json' with {type:'json'}
import {loadGlyphWikiBatch163Strokes} from './hanja-stroke-dictionary-glyphwiki-batch163.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch163Strokes(reviewed)[0]
test('茄9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'茄',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'茄',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='茄').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch163-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('茄5획 굽음과8획 꺾임 경계를 보존한다',()=>{
 assert.deepEqual(data.outlines![4].map(p=>p.direction),['right','curve','curve'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['right','down'])
 assert.equal(data.paths.length,9)
})
test('茄 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch163Strokes(changed))}
})
