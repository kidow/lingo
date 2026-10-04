import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch291.json' with {type:'json'}
import {loadGlyphWikiBatch291Strokes} from './hanja-stroke-dictionary-glyphwiki-batch291.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch291Strokes(reviewed)[0]
test('馝14획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'馝',strokes:14}),data)
 assert.equal(hanjaStrokeData({glyph:'馝',strokes:13}),null)
 assert.equal(hanjaStrokeData({glyph:'馝',strokes:15}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='馝').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch291-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('馝의 국내 香·必 순서와8곡선·연속 꺾임을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,9,10,13,15,12,11,14])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["right"],["down"],["curve"],["curve"],["down"],["right","down"],["right"],["right"],["curve"],["curve"],["down","curve","right"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,17)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,8)
 assert.equal(data.paths.length,14)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u999d-k/u999d/u9999-01/u65e5/u5fc5-02'))
})
test('馝의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch291Strokes(changed))}
})
