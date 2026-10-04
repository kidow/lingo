import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch282.json' with {type:'json'}
import {loadGlyphWikiBatch282Strokes} from './hanja-stroke-dictionary-glyphwiki-batch282.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch282Strokes(reviewed)[0]
test('禑14획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'禑',strokes:14}),data)
 assert.equal(hanjaStrokeData({glyph:'禑',strokes:13}),null)
 assert.equal(hanjaStrokeData({glyph:'禑',strokes:15}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='禑').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch282-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('禑의 국내 示·禺 순서와4곡선·연속 갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,9,11,13,14,10,16,17])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["right"],["down"],["down","curve"],["down"],["down"],["right","down"],["right"],["right"],["down"],["right","down","curve"],["down"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,18)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,4)
 assert.equal(data.paths.length,14)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u7991-k/u7991/u793a-01/u79ba-02/u79ba@1'))
})
test('禑의 순열·갈고리·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[10][2].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch282Strokes(changed))}
})
