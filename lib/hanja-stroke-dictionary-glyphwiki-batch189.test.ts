import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch189.json' with {type:'json'}
import {loadGlyphWikiBatch189Strokes} from './hanja-stroke-dictionary-glyphwiki-batch189.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch189Strokes(reviewed)[0]
test('珝10획은 중복 없이 등록되고 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'珝',strokes:10}),data)
 assert.equal(hanjaStrokeData({glyph:'珝',strokes:11}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='珝').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch189-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('珝 국내 가로·세로 순열과 연속 갈고리 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,5,6,7,8,9,10,11,12])
 assert.deepEqual(data.outlines![0].map(p=>p.direction),['right'])
 assert.deepEqual(data.outlines![1].map(p=>p.direction),['right'])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['down'])
 for(const i of [4,7])assert.deepEqual(data.outlines![i].map(p=>p.direction),['right','down','curve'])
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,7)
 assert.equal(data.outlines![4][2].revealPath,'M59.325 86 Q59.325 91 54.325 91')
 assert.equal(data.paths.length,10)
 assert.match(reviewed[0].geometryLicense.revision,/individual glyph revisions unavailable/)
})
test('珝 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[1]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch189Strokes(changed))}
})
