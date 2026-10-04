import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch238.json' with {type:'json'}
import {loadGlyphWikiBatch238Strokes} from './hanja-stroke-dictionary-glyphwiki-batch238.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch238Strokes(reviewed)[0]
test('焞12획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'焞',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'焞',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='焞').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch238-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('焞 火·子의 연속 경로와 두 꺾임 및 원본16개 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,10,11,13,14])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['down','curve'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['right','curve'])
 assert.deepEqual(data.outlines![10].map(p=>p.direction),['down','curve'])
 assert.equal(data.outlines![10][1].revealPath,'M65.45 85.59 Q65.45 90.59 60.45 90.59')
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.paths.length,12)
 assert.match(reviewed[0].geometryLicense.revision,/u4eab-02/)
})
test('焞 경로·순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[10][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch238Strokes(changed))}
})
