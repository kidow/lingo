import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch210.json' with {type:'json'}
import {loadGlyphWikiBatch210Strokes} from './hanja-stroke-dictionary-glyphwiki-batch210.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch210Strokes(reviewed)[0]
test('晥11획은 중복 없이 등록되고 전체 원본과 연속된 선언 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'晥',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'晥',strokes:12}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='晥').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch210-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('晥 日 꺾임과 宀 곡선·마지막 갈고리 및 원본 4곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,9,10,11,12,13])
 assert.deepEqual(data.outlines![1].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['right','curve'])
 assert.deepEqual(data.outlines![10].map(p=>p.direction),['down','curve','right'])
 assert.equal(data.outlines!.flat().length,15)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,4)
 assert.equal(data.outlines![10][1].revealPath,"M70.645 83.5 Q70.645 88.5 75.645 88.5")
 assert.equal(data.paths.length,11)
 assert.match(reviewed[0].geometryLicense.revision,/u5196-08-var-001/)
})
test('晥 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[10][1];assert('revealPath' in part);part.revealPath='M0 0 Q0 0 1 1'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch210Strokes(changed))}
})
