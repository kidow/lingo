import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch259.json' with {type:'json'}
import {loadGlyphWikiBatch259Strokes} from './hanja-stroke-dictionary-glyphwiki-batch259.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch259Strokes(reviewed)[0]
test('敭13획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'敭',strokes:13}),data)
 assert.equal(hanjaStrokeData({glyph:'敭',strokes:12}),null)
 assert.equal(hanjaStrokeData({glyph:'敭',strokes:14}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='敭').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch259-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('敭 국내 순서와 日 꺾임과 연속 갈고리 및 마지막 곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,5,6,7,8,10,11,12,13,14,15])
 assert.deepEqual(data.outlines![1].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['right','curve','curve'])
 assert.deepEqual(data.outlines![12].map(p=>p.direction),['curve'])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,8)
 assert.equal(data.paths.length,13)
 assert.match(reviewed[0].geometryLicense.revision,/u6535-02/)
})
test('敭 경로·국내 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[6][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(2,2,4,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch259Strokes(changed))}
})
