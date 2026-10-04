import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch247.json' with {type:'json'}
import {loadGlyphWikiBatch247Strokes} from './hanja-stroke-dictionary-glyphwiki-batch247.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch247Strokes(reviewed)[0]
test('菫12획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'菫',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'菫',strokes:11}),null)
 assert.equal(hanjaStrokeData({glyph:'菫',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='菫').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch247-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('菫 국내 풀머리·연속 꺾임·가로 뒤 관통 세로 순서와 원본13개 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,9,11,12,10,13])
 assert.deepEqual(data.outlines!.slice(0,6).map(s=>s[0].direction),['right','down','right','down','right','down'])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines!.slice(8,12).map(s=>s[0].direction),['right','right','down','right'])
 assert.equal(data.outlines!.flat().length,13)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,0)
 assert.equal(data.paths.length,12)
 assert.match(reviewed[0].geometryLicense.revision,/cdp-8a6d/)
})
test('菫 경로·초기 후보 순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[6][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(8,3,10,11,12)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch247Strokes(changed))}
})
