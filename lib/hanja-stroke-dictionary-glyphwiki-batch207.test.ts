import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch207.json' with {type:'json'}
import {loadGlyphWikiBatch207Strokes} from './hanja-stroke-dictionary-glyphwiki-batch207.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch207Strokes(reviewed)[0]
test('悰11획은 중복 없이 등록되고 전체 원본과 연속된 선언 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'悰',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'悰',strokes:12}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='悰').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch207-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('悰 점 순열·지붕 꺾임·갈고리와 원본 7곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[2,3,1,4,5,6,7,8,9,10,11,12,13])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','curve'])
 assert.equal(data.outlines!.flat().length,13)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,7)
 assert.equal(data.outlines![8][1].revealPath,"M63.4025 86.135 Q63.4025 91.135 58.4025 91.135")
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['down'])
 assert.equal(data.paths.length,11)
 assert.match(reviewed[0].geometryLicense.revision,/u5b97-02/)
})
test('悰 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[4][0];assert('revealPath' in part);part.revealPath='M0 0 Q0 0 1 1'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=1},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch207Strokes(changed))}
})
