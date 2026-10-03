import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch169.json' with {type:'json'}
import {loadGlyphWikiBatch169Strokes} from './hanja-stroke-dictionary-glyphwiki-batch169.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch169Strokes(reviewed)[0]
test('唜10획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'唜',strokes:10}),data)
 assert.equal(hanjaStrokeData({glyph:'唜',strokes:11}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='唜').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch169-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('唜9획 방향 보정과10획 곡선·갈고리 경계를 보존한다',()=>{
 assert.deepEqual(data.outlines![8].map(p=>p.direction),['curve'])
 assert.deepEqual(data.outlines![9].map(p=>p.direction),['down','curve','right','up'])
 assert.equal(data.outlines![8][0].revealPath,'M93.94 69.8475 L44.06 76.7325')
 assert.equal(data.paths.length,10)
})
test('唜 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch169Strokes(changed))}
})
