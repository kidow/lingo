import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch249.json' with {type:'json'}
import {loadGlyphWikiBatch249Strokes} from './hanja-stroke-dictionary-glyphwiki-batch249.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch249Strokes(reviewed)[0]
test('菴12획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'菴',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'菴',strokes:11}),null)
 assert.equal(hanjaStrokeData({glyph:'菴',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='菴').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch249-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('菴 국내 풀머리·연속 꺾임·갈고리와 원본15개 호출을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,9,10,12,13,14])
 assert.deepEqual(data.outlines!.slice(0,5).map(s=>s[0].direction),['right','down','right','down','right'])
 assert.deepEqual(data.outlines![8].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![11].map(p=>p.direction),['down','curve','right'])
 assert.equal(data.outlines!.flat().length,15)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,3)
 assert.equal(data.paths.length,12)
 assert.match(reviewed[0].geometryLicense.revision,/koseki-353110/)
})
test('菴 경로·초기 후보 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[11][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(2,2,3,4)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch249Strokes(changed))}
})
