import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch174.json' with {type:'json'}
import {loadGlyphWikiBatch174Strokes} from './hanja-stroke-dictionary-glyphwiki-batch174.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch174Strokes(reviewed)[0]
test('苒9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'苒',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'苒',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='苒').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch174-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('苒 국내 순열과 테두리 갈고리의 연속 원본 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,7,8,9,6,5,10])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','down','curve'])
 assert.equal(data.outlines![5][2].revealPath,"M75.5 87.285 Q75.5 92.285 70.5 92.285")
 assert.equal(data.outlines![7][0].direction,'down')
 assert.equal(data.outlines![8][0].direction,'right')
 assert.equal(data.paths.length,9)
})
test('苒 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch174Strokes(changed))}
})

