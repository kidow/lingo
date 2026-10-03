import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch173.json' with {type:'json'}
import {loadGlyphWikiBatch173Strokes} from './hanja-stroke-dictionary-glyphwiki-batch173.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch173Strokes(reviewed)[0]
test('昻9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'昻',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'昻',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='昻').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch173-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('昻 테두리와 갈고리의 연속 원본 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,9,10,11])
 assert.deepEqual(data.outlines![1].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['right','down','curve'])
 assert.equal(data.outlines![6][0].revealPath,"M9.6 80.84 Q26.4 78.22999999999999 51 74.17")
 assert.equal(data.outlines![7][2].revealPath,"M85.09 79.61 Q85.09 84.61 80.09 84.61")
 assert.equal(data.paths.length,9)
})
test('昻 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch173Strokes(changed))}
})

