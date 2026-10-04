import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch268.json' with {type:'json'}
import {loadGlyphWikiBatch268Strokes} from './hanja-stroke-dictionary-glyphwiki-batch268.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch268Strokes(reviewed)[0]
test('萱13획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'萱',strokes:13}),data)
 assert.equal(hanjaStrokeData({glyph:'萱',strokes:12}),null)
 assert.equal(hanjaStrokeData({glyph:'萱',strokes:14}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='萱').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch268-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('萱 국내 순서와 艸 국내 순열과 宀·日의 꺾임을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,9,10,11,13,14,15])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['right'])
 assert.deepEqual(data.outlines![3].map(p=>p.direction),['down'])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['right','curve'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['right','down'])
 assert.equal(data.outlines!.flat().length,15)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,2)
 assert.equal(data.paths.length,13)
 assert.match(reviewed[0].geometryLicense.revision,/koseki-353380\/ufa5e-03\/u8279-k03\/u5ba3\/u5b80-03\/u5196-03\/u65e5/)
})
test('萱 경로·국내 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[9][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(2,2,3,4)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch268Strokes(changed))}
})
