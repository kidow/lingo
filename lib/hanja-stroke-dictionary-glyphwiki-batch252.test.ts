import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch252.json' with {type:'json'}
import {loadGlyphWikiBatch252Strokes} from './hanja-stroke-dictionary-glyphwiki-batch252.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch252Strokes(reviewed)[0]
test('鈒12획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'鈒',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'鈒',strokes:11}),null)
 assert.equal(hanjaStrokeData({glyph:'鈒',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='鈒').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch252-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('鈒 여덟 원본 곡선과 두 연속 꺾임을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,9,10,12,14])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['right','left']
 )
 assert.deepEqual(data.outlines![10].map(p=>p.direction),['right','curve'])
 assert.equal(data.outlines!.flat().length,14)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,8)
 assert.equal(data.paths.length,12)
 assert.match(reviewed[0].geometryLicense.revision,/u53ca-k02/)
})
test('鈒 경로·초기 후보 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[10][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(2,2,4,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch252Strokes(changed))}
})
