import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch171.json' with {type:'json'}
import {loadGlyphWikiBatch171Strokes} from './hanja-stroke-dictionary-glyphwiki-batch171.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch171Strokes(reviewed)[0]
test('竗9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'竗',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'竗',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='竗').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch171-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('竗 올림과 세로갈고리의 연속 원본 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,9])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['down','curve'])
 assert.equal(data.outlines![4][0].revealPath,'M7.625 82 Q26.15 75 46.1 67')
 assert.equal(data.outlines![5][1].revealPath,'M66.985 57.5 Q66.985 62.5 61.985 62.5')
 assert.equal(data.paths.length,9)
})
test('竗 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch171Strokes(changed))}
})
