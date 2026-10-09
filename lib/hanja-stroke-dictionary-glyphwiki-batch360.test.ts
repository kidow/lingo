import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch360.json' with {type:'json'}
import {loadGlyphWikiBatch360Strokes} from './hanja-stroke-dictionary-glyphwiki-batch360.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch360Strokes(reviewed)[0]
test('礖19획은 정확한 전체 원본을 재현하며 중복 없이 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'礖',strokes:19}),data)
 assert.equal(hanjaStrokeData({glyph:'礖',strokes:18}),null)
 assert.equal(hanjaStrokeData({glyph:'礖',strokes:20}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='礖').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch360-2026-10-09/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('礖의 국내 순서와 연속 중심선을 유지하고 비그리기 원본을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,6,8,9,10,15,23,22,18,17,13,14,16,11,20,21])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["curve"],["down"],["curve"],["right"],["curve"],["down"],["right"],["right"],["right"],["down"],["curve"],["down"],["curve"],["left"],["left"],["right"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,19)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,7)
 for(const n of [3,11,13]){
  const segment=data.outlines![n][0]
  assert.ok('revealPath' in segment)
  assert.equal(typeof segment.revealPath,'string')
  assert.ok(segment.revealPath)
  assert.equal(segment.revealPath.match(/M/g)!.length,1)
 }
 assert.ok(reviewed[0].geometryLicense.revision.includes('u7916-k/u7916/u77f3-01/u8207@4'))
})
test('礖의 경로·방향·순서·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[3][0].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[14][0].direction='right'},
 (e:typeof reviewed[number])=>{
  const segment=e.outlines[11][0]
  assert.ok('revealPath' in segment)
  segment.revealPath='M0 0 L1 1'
 },
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,3,2,1)},
 (e:typeof reviewed[number])=>{e.geometrySource='0'.repeat(64)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch360Strokes(changed))}
})
