import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch280.json' with {type:'json'}
import {loadGlyphWikiBatch280Strokes} from './hanja-stroke-dictionary-glyphwiki-batch280.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch280Strokes(reviewed)[0]
test('瑥14획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'瑥',strokes:14}),data)
 assert.equal(hanjaStrokeData({glyph:'瑥',strokes:13}),null)
 assert.equal(hanjaStrokeData({glyph:'瑥',strokes:15}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='瑥').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch280-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('瑥의 국내 玉·𥁕 순서와3곡선·연속 꺾임을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,5,6,9,10,8,11,12,14,15,16])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["right"],["down"],["curve"],["down"],["right","down"],["curve"],["curve"],["right"],["down"],["right","down"],["down"],["down"],["right"]])
 assert.equal(data.outlines!.flat().length,16)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,3)
 assert.equal(data.paths.length,14)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u7465-k/u7465-ue0100/u738b-01/u25055@6/u56d7@2/gt-k00049/u76bf-04@4'))
})
test('瑥의 순열·갈고리·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch280Strokes(changed))}
})
