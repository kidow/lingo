import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch154.json' with {type:'json'}
import {loadGlyphWikiBatch154Strokes} from './hanja-stroke-dictionary-glyphwiki-batch154.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch154Strokes(reviewed)[0]
test('兕는 배정표8획을 유지하고 검증된 사전7획으로 한 번 등록한다',()=>{
 assert.deepEqual(hanjaStrokeData({glyph:'兕',strokes:8}),data)
 assert.equal(hanjaStrokeData({glyph:'兕',strokes:7}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='兕').length,1)
 assert.equal(data.paths.length,7)
 assert.deepEqual(data.variant,{catalogStrokes:8,playbackStrokes:7,form:'사전'})
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch154-2026-09-27/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('兕의 복합 꺾임과 두 원본 곡선을 보존한다',()=>{
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,2)
 assert.deepEqual(data.outlines![1].map(p=>p.direction),['right','down','right'])
 assert.deepEqual(data.outlines![3].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['down','curve','right'])
 assert.match(reviewed[0].geometryLicense.modifications,/default mincho new Kage/i)
})
test('兕의 변형 획수·경로·출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.variant.catalogStrokes=7},
 (e:typeof reviewed[number])=>{e.variant.playbackStrokes=8},
 (e:typeof reviewed[number])=>{e.outlines[0][0].direction='up'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch154Strokes(changed))}
})
