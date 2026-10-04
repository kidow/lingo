import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch272.json' with {type:'json'}
import {loadGlyphWikiBatch272Strokes} from './hanja-stroke-dictionary-glyphwiki-batch272.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch272Strokes(reviewed)[0]
test('靷13획은 중복 없이 등록되고 선언된 과거 리비전과 별칭을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'靷',strokes:13}),data)
 assert.equal(hanjaStrokeData({glyph:'靷',strokes:12}),null)
 assert.equal(hanjaStrokeData({glyph:'靷',strokes:14}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='靷').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch272-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('靷 국내 순서와 革 중앙 세로획·引 꺾임·원본 갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,6,7,9,10,5,11,13,14,17])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![8].map(p=>p.direction),['down'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![10].map(p=>p.direction),['right'])
 // Original diagonal descends from x101.18 to98.435; the existing reveal axis is left.
 assert.deepEqual(data.outlines![11].map(p=>p.direction),['left','right','curve','curve'])
 assert.deepEqual(data.outlines![12].map(p=>p.direction),['down'])
 assert.equal(data.outlines!.flat().length,18)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,2)
 assert.equal(data.paths.length,13)
 assert.match(reviewed[0].geometryLicense.revision,/u9769-01@2\/u53e3@12\/u53e3-j@2/)
})
test('靷 경로·국내 순서·과거 리비전·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[11][2].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(7,2,5,10)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch272Strokes(changed))}
})
