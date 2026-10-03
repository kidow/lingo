import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch206.json' with {type:'json'}
import {loadGlyphWikiBatch206Strokes} from './hanja-stroke-dictionary-glyphwiki-batch206.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch206Strokes(reviewed)[0]
test('崍11획은 중복 없이 등록되고 전체 원본과 연속된 선언 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'崍',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'崍',strokes:12}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='崍').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch206-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('崍 2획의 연속 꺾임과 작은 인형 순열 및 원본 6곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,9,10,11,12,6,7,8])
 assert.deepEqual(data.outlines![1].map(p=>p.direction),['down','right'])
 assert.equal(data.outlines!.flat().length,12)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.outlines![4][0].revealPath,"M52.8025 28.5 Q49.7575 51.5 40.6225 64.5")
 assert.equal(data.outlines![8][0].direction,'down')
 assert.equal(data.paths.length,11)
 assert.match(reviewed[0].geometryLicense.revision,/u4f86-02/)
})
test('崍 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[4][0];assert('revealPath' in part);part.revealPath='M0 0 Q0 0 1 1'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch206Strokes(changed))}
})

