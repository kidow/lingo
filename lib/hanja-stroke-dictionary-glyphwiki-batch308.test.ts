import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch308.json' with {type:'json'}
import {loadGlyphWikiBatch308Strokes} from './hanja-stroke-dictionary-glyphwiki-batch308.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch308Strokes(reviewed)[0]
test('稶15획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'稶',strokes:15}),data)
 assert.equal(hanjaStrokeData({glyph:'稶',strokes:14}),null)
 assert.equal(hanjaStrokeData({glyph:'稶',strokes:16}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='稶').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch308-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('稶의 국내 전체 경로와8이차곡선·1삼차곡선·원본 위쪽 갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,10,11,12,13,14,15,16])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["right"],["down"],["curve"],["curve"],["right"],["down"],["right","down"],["right"],["curve"],["curve","up"],["curve"],["curve"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,17)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,9)
 assert.equal(data.paths.length,15)
 assert.equal(data.outlines![10][1].direction,'up')
 assert.ok(reviewed[0].geometryLicense.revision.includes('u7a36-k/u7a36/u79be-01/u5f67-02'))
})
test('稶의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.outlines[10][1].direction='down'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch308Strokes(changed))}
})
