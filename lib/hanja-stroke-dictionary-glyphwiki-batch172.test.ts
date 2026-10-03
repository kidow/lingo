import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch172.json' with {type:'json'}
import {loadGlyphWikiBatch172Strokes} from './hanja-stroke-dictionary-glyphwiki-batch172.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch172Strokes(reviewed)[0]
test('柶9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'柶',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'柶',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='柶').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch172-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('柶 테두리와 둥근 꺾임의 연속 원본 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,9,10])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['down','curve','right'])
 assert.equal(data.outlines![6][1].revealPath,"M58.44750000000001 27.9375 Q58.44750000000001 56.0625 45.43 68.4375")
 assert.equal(data.outlines![7][1].revealPath,"M70.195 53.875 Q70.195 58.875 75.195 58.875")
 assert.equal(data.paths.length,9)
})
test('柶 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch172Strokes(changed))}
})

