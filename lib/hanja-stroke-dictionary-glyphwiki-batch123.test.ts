import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch123.json' with {type:'json'}
import {loadGlyphWikiBatch123Strokes} from './hanja-stroke-dictionary-glyphwiki-batch123.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch123Strokes(reviewed)[0]
test('峀8획은 국내 순서로 한 번 등록되고 출처를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'峀',strokes:8}),data)
 assert.equal(hanjaStrokeData({glyph:'峀',strokes:9}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='峀').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8])
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch123-2026-09-27/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('峀의 원본 명조 직선과 연속 꺾임를 보존한다',()=>{
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,0)
 assert.deepEqual(data.outlines![4].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![1].map(p=>p.direction),['down','right'])
 assert.match(reviewed[0].geometryLicense.modifications,/default mincho new Kage/)
})
test('峀의 경로·순서·출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[0][0].direction='up'},
 (e:typeof reviewed[number])=>{e.outlines[3][0].outline='M1 1 L2 2 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch123Strokes(changed))}
})
