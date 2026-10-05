import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch345.json' with {type:'json'}
import {loadGlyphWikiBatch345Strokes} from './hanja-stroke-dictionary-glyphwiki-batch345.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch345Strokes(reviewed)[0]
test('鍈17획은 한 번만 등록되고 원본 및 명시된 과거 버전을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'鍈',strokes:17}),data)
 for(const strokes of [16,18])assert.equal(hanjaStrokeData({glyph:'鍈',strokes}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='鍈').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch345-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('鍈은 국내 필순과 원본의 연속 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,18])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["curve"],["right"],["right"],["down"],["curve"],["curve"],["curve"],["right"],["down"],["right"],["down"],["down"],["curve"],["right"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,17)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,8)
 assert.equal(data.paths.length,17)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u9348-ue0102/koseki-460810/u91d2-01/u82f1-02-var-001@3/ufa5e-03@3'))
})
test('鍈의 방향·윤곽·순열·과거 원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[15][0].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[13][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch345Strokes(changed))}
})
