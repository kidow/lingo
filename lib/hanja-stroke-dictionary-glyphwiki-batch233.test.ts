import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch233.json' with {type:'json'}
import {loadGlyphWikiBatch233Strokes} from './hanja-stroke-dictionary-glyphwiki-batch233.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch233Strokes(reviewed)[0]
test('晫12획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'晫',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'晫',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='晫').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch233-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('晫 두 꺾임과 원본14개 직선 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,5,6,7,8,9,11,12,13,14])
 for(const i of [1,7])assert.deepEqual(data.outlines![i].map(p=>p.direction),['right','down'])
 assert.equal(data.outlines!.flat().length,14)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,0)
 assert.equal(data.paths.length,12)
 assert.match(reviewed[0].geometryLicense.revision,/u5353-07/)
})
test('晫 경로·순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[1][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch233Strokes(changed))}
})
