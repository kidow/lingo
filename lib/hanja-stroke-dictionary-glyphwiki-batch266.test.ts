import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch266.json' with {type:'json'}
import {loadGlyphWikiBatch266Strokes} from './hanja-stroke-dictionary-glyphwiki-batch266.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch266Strokes(reviewed)[0]
test('筽13획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'筽',strokes:13}),data)
 assert.equal(hanjaStrokeData({glyph:'筽',strokes:12}),null)
 assert.equal(hanjaStrokeData({glyph:'筽',strokes:14}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='筽').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch266-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('筽 국내 순서와 竹 곡선과 口·吳 꺾임 및 국내 순열을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,10,14,11,12,13])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['curve'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['down','right','down'])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.paths.length,13)
 assert.match(reviewed[0].geometryLicense.revision,/u7af9-03\/u5433-04\/u53e3/)
})
test('筽 경로·국내 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[9][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(2,2,4,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch266Strokes(changed))}
})
