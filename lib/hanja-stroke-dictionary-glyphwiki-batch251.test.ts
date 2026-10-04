import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch251.json' with {type:'json'}
import {loadGlyphWikiBatch251Strokes} from './hanja-stroke-dictionary-glyphwiki-batch251.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch251Strokes(reviewed)[0]
test('鈐12획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'鈐',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'鈐',strokes:11}),null)
 assert.equal(hanjaStrokeData({glyph:'鈐',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='鈐').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch251-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('鈐 일곱 원본 곡선과 마지막 연속 꺾임을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,9,10,11,12])
 assert.deepEqual(data.outlines![11].map(p=>p.direction),['right','left'])
 assert.equal(data.outlines!.flat().length,13)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,7)
 assert.equal(data.paths.length,12)
 assert.match(reviewed[0].geometryLicense.revision,/u4eca-02/)
})
test('鈐 경로·초기 후보 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[11][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(2,2,4,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch251Strokes(changed))}
})
