import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch175.json' with {type:'json'}
import {loadGlyphWikiBatch175Strokes} from './hanja-stroke-dictionary-glyphwiki-batch175.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch175Strokes(reviewed)[0]
test('苡9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'苡',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'苡',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='苡').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch175-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('苡 국내 순열과 원본 이차·삼차 곡선 방향을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9])
 assert.equal(data.outlines![5][0].revealPath,"M7.58 83.9325 Q25.76 79.89 51.515 72.1725")
 assert.equal(data.outlines![7][0].revealPath,"M83.835 33.9525 C82.825 72.1725 59.595 87.24000000000001 21.215 93.4875")
 assert.equal(data.outlines![8][0].revealPath,"M69.695 72.53999999999999 Q83.835 79.52250000000001 91.41 89.445")
 assert.equal(data.paths.length,9)
})
test('苡 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch175Strokes(changed))}
})
