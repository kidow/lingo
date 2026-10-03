import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch170.json' with {type:'json'}
import {loadGlyphWikiBatch170Strokes} from './hanja-stroke-dictionary-glyphwiki-batch170.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch170Strokes(reviewed)[0]
test('茉9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'茉',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'茉',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='茉').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch170-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('茉 풀 머리 순서와 두 곡선의 원본 방향을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9])
 assert.deepEqual(data.outlines!.slice(0,7).map(s=>s.map(p=>p.direction)),[['right'],['down'],['right'],['down'],['right'],['right'],['down']])
 assert.equal(data.outlines![7][0].revealPath,'M47.54 58.125 Q33.33 77.625 7.36 88.875')
 assert.equal(data.outlines![8][0].revealPath,'M51.95 58.125 Q64.69 75.75 87.72 85.875')
 assert.equal(data.paths.length,9)
})
test('茉 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch170Strokes(changed))}
})
