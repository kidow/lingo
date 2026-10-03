import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch180.json' with {type:'json'}
import {loadGlyphWikiBatch180Strokes} from './hanja-stroke-dictionary-glyphwiki-batch180.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch180Strokes(reviewed)[0]
test('苞9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'苞',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'苞',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='苞').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch180-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('苞 국내 순서와 원본 갈고리·모서리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10,11])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','curve','curve'])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![8].map(p=>p.direction),['down','curve','right'])
 assert.equal(data.outlines![8][1].revealPath,"M26 83.62 Q26 88.62 31 88.62")
 assert.equal(data.outlines![4][0].revealPath,"M34 28.2 Q26 47.58 6 61.64")
 assert.equal(data.paths.length,9)
})
test('苞 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch180Strokes(changed))}
})
