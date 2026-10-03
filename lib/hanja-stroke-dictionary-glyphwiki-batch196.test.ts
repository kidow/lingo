import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch196.json' with {type:'json'}
import {loadGlyphWikiBatch196Strokes} from './hanja-stroke-dictionary-glyphwiki-batch196.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch196Strokes(reviewed)[0]
test('茱10획은 중복 없이 등록되고 고정 리비전 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'茱',strokes:10}),data)
 assert.equal(hanjaStrokeData({glyph:'茱',strokes:11}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='茱').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch196-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('茱 원본 네 획 艹와 세 곡선·고정 朱 리비전을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['right'])
 assert.deepEqual(data.outlines![3].map(p=>p.direction),['down'])
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,3)
 assert.equal(data.outlines![8][0].revealPath,"M47.5 61.45 Q36 78.6 8 89.8")
 assert.equal(data.paths.length,10)
 assert.match(reviewed[0].geometryLicense.revision,/u8331-ue0102/)
 assert.match(reviewed[0].geometryLicense.revision,/u6731@1/)
})
test('茱 경로·순열·고정 리비전·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[7][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch196Strokes(changed))}
})
