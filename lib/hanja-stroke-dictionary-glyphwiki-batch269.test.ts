import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch269.json' with {type:'json'}
import {loadGlyphWikiBatch269Strokes} from './hanja-stroke-dictionary-glyphwiki-batch269.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch269Strokes(reviewed)[0]
test('葫13획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'葫',strokes:13}),data)
 assert.equal(hanjaStrokeData({glyph:'葫',strokes:12}),null)
 assert.equal(hanjaStrokeData({glyph:'葫',strokes:14}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='葫').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch269-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('葫 국내 순서와 艸 국내 순열과 口·月의 꺾임·곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,10,11,12,14,15])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['right'])
 assert.deepEqual(data.outlines![3].map(p=>p.direction),['down'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['down','curve'])
 assert.deepEqual(data.outlines![10].map(p=>p.direction),['right','down','curve'])
 assert.equal(data.outlines!.flat().length,17)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,2)
 assert.equal(data.paths.length,13)
 assert.match(reviewed[0].geometryLicense.revision,/u846b-k\/u846b-ue0102\/ufa5e-03\/u8279-k03\/u80e1\/u53e4\/u6708-02/)
})
test('葫 경로·국내 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[9][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(2,2,3,4)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch269Strokes(changed))}
})

