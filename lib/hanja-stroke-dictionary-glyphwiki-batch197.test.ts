import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch197.json' with {type:'json'}
import {loadGlyphWikiBatch197Strokes} from './hanja-stroke-dictionary-glyphwiki-batch197.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch197Strokes(reviewed)[0]
test('茴10획은 중복 없이 등록되고 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'茴',strokes:10}),data)
 assert.equal(hanjaStrokeData({glyph:'茴',strokes:11}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='茴').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch197-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('茴 전체 원본의 두 연속 꺾임과 외곽 마지막 닫기를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,9,10,11,12,8])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['right','down'])
 assert.equal(data.outlines!.flat().length,12)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,0)
 assert.equal(data.paths.length,10)
 assert.equal(data.outlines![9][0].outline,"M17.5 87.2 L83 87.2 L83 89.2 L17.5 89.2 Z")
 assert.match(reviewed[0].geometryLicense.revision,/koseki-346600/)
})
test('茴 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][1].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch197Strokes(changed))}
})
