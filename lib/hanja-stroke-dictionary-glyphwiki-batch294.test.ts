import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch294.json' with {type:'json'}
import {loadGlyphWikiBatch294Strokes} from './hanja-stroke-dictionary-glyphwiki-batch294.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch294Strokes(reviewed)[0]
test('僿15획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'僿',strokes:15}),data)
 assert.equal(hanjaStrokeData({glyph:'僿',strokes:14}),null)
 assert.equal(hanjaStrokeData({glyph:'僿',strokes:16}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='僿').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch294-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('僿의 국내 塞·土 순서와5곡선·연속 꺾임을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,8,19,9,10,11,13,14,16,18,17])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["down"],["down"],["curve"],["right","curve"],["right"],["right"],["down"],["down"],["right"],["curve"],["curve"],["right"],["down"],["right"]])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.paths.length,15)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u50ff-k/u50ff/u4ebb-01/u585e/u5b80-03/u5196-03'))
})
test('僿의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch294Strokes(changed))}
})
