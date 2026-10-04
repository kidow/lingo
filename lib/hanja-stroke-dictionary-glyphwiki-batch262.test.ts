import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch262.json' with {type:'json'}
import {loadGlyphWikiBatch262Strokes} from './hanja-stroke-dictionary-glyphwiki-batch262.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch262Strokes(reviewed)[0]
test('煇13획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'煇',strokes:13}),data)
 assert.equal(hanjaStrokeData({glyph:'煇',strokes:12}),null)
 assert.equal(hanjaStrokeData({glyph:'煇',strokes:14}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='煇').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch262-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('煇 국내 순서와 火 연속 곡선과 冖·車 꺾임 및 마지막 세로을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,8,9,10,12,13,14,15])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['down','curve'])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','curve'])
 assert.deepEqual(data.outlines![8].map(p=>p.direction),['right','down'])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.paths.length,13)
 assert.match(reviewed[0].geometryLicense.revision,/u8ecd-02/)
})
test('煇 경로·국내 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(2,2,4,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch262Strokes(changed))}
})
