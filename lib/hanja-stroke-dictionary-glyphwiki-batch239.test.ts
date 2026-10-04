import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch239.json' with {type:'json'}
import {loadGlyphWikiBatch239Strokes} from './hanja-stroke-dictionary-glyphwiki-batch239.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch239Strokes(reviewed)[0]
test('琠12획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'琠',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'琠',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='琠').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch239-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('琠 국내 순서·연속 꺾임과 원본13개 경로 및 literal 출처를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,6,7,12,10,11,9,13,14])
 assert.equal(data.outlines![1][0].direction,'right')
 assert.equal(data.outlines![2][0].direction,'down')
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines!.slice(6,9).map(p=>p[0].direction),['right','down','down'])
 assert.equal(data.outlines!.flat().length,13)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,3)
 assert.equal(data.paths.length,12)
 assert.match(reviewed[0].geometryLicense.revision,/u5178@3/)
 assert.match(reviewed[0].geometryLicense.revision,/cdp-89e0@2/)
})
test('琠 경로·순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch239Strokes(changed))}
})
