import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch178.json' with {type:'json'}
import {loadGlyphWikiBatch178Strokes} from './hanja-stroke-dictionary-glyphwiki-batch178.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch178Strokes(reviewed)[0]
test('茁9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'茁',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'茁',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='茁').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch178-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('茁 국내 순서와 두 모서리의 연속 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10,11])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['down','right'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['down','right'])
 assert.equal(data.outlines![4][0].direction,'down')
 assert.equal(data.outlines![8][0].direction,'down')
 assert.equal(data.paths.length,9)
})
test('茁 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch178Strokes(changed))}
})
