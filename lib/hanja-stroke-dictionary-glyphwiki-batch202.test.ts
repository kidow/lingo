import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch202.json' with {type:'json'}
import {loadGlyphWikiBatch202Strokes} from './hanja-stroke-dictionary-glyphwiki-batch202.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch202Strokes(reviewed)[0]
test('荑10획은 중복 없이 등록되고 전체 원본과 연속된 선언 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'荑',strokes:10}),data)
 assert.equal(hanjaStrokeData({glyph:'荑',strokes:11}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='荑').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch202-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('荑 6·8·9획의 연속 꺾임과 원본 4곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10,11,12,13])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['left','right','curve','curve'])
 assert.deepEqual(data.outlines![8].map(p=>p.direction),['down','curve'])
 assert.equal(data.outlines!.flat().length,15)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,4)
 assert.equal(data.outlines![8][1].revealPath,'M50 56.1725 Q50 86.3825 7 93.935')
 assert.equal(data.paths.length,10)
 assert.match(reviewed[0].geometryLicense.revision,/u5937/)
})
test('荑 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[7][2];assert('revealPath' in part);part.revealPath='M0 0 Q0 0 1 1'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch202Strokes(changed))}
})
