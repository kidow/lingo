import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch261.json' with {type:'json'}
import {loadGlyphWikiBatch261Strokes} from './hanja-stroke-dictionary-glyphwiki-batch261.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch261Strokes(reviewed)[0]
test('楗13획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'楗',strokes:13}),data)
 assert.equal(hanjaStrokeData({glyph:'楗',strokes:12}),null)
 assert.equal(hanjaStrokeData({glyph:'楗',strokes:14}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='楗').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch261-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('楗 국내 순서와 聿 꺾임과 廴 연속 경로 및 마지막 곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,11,14,13,15,16,10,5,7,9])
 assert.deepEqual(data.outlines![4].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![10].map(p=>p.direction),['right','left'])
 assert.deepEqual(data.outlines![12].map(p=>p.direction),['curve'])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,4)
 assert.equal(data.paths.length,13)
 assert.match(reviewed[0].geometryLicense.revision,/u5efa@7/)
})
test('楗 경로·국내 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[11][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(2,2,4,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch261Strokes(changed))}
})
