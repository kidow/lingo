import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch177.json' with {type:'json'}
import {loadGlyphWikiBatch177Strokes} from './hanja-stroke-dictionary-glyphwiki-batch177.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch177Strokes(reviewed)[0]
test('炡9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'炡',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'炡',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='炡').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch177-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('炡 원본 순서와 세로·곡선의 연속 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,9])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['down','curve'])
 assert.equal(data.outlines![2][1].revealPath,"M23.21 47.5 Q23.21 79 6.51 92.5")
 assert.equal(data.outlines![0][0].revealPath,"M12.355 26.5 Q14.86 43.5 9.015 53")
 assert.equal(data.outlines![8][0].direction,'right')
 assert.equal(data.paths.length,9)
})
test('炡 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch177Strokes(changed))}
})
