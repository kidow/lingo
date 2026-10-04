import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch240.json' with {type:'json'}
import {loadGlyphWikiBatch240Strokes} from './hanja-stroke-dictionary-glyphwiki-batch240.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch240Strokes(reviewed)[0]
test('琡12획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'琡',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'琡',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='琡').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch240-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('琡 국내 순서·갈고리·연속 꺾임과 원본14개 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,5,6,7,8,10,9,11,13])
 assert.equal(data.outlines![1][0].direction,'right')
 assert.equal(data.outlines![2][0].direction,'down')
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['down','curve'])
 assert.deepEqual(data.outlines![10].map(p=>p.direction),['right','curve'])
 assert.equal(data.outlines![7][1].revealPath,"M48.2975 85.5 Q48.2975 90.5 43.2975 90.5")
 assert.equal(data.outlines!.flat().length,14)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.paths.length,12)
 assert.match(reviewed[0].geometryLicense.revision,/u53c8-02/)
})
test('琡 경로·순서·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[10][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch240Strokes(changed))}
})
