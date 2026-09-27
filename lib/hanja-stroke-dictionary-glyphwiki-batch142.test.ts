import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch142.json' with {type:'json'}
import {loadGlyphWikiBatch142Strokes} from './hanja-stroke-dictionary-glyphwiki-batch142.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch142Strokes(reviewed)[0]
test('芟8획은 국내 순서로 한 번 등록되고 출처를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'芟',strokes:8}),data)
 assert.equal(hanjaStrokeData({glyph:'芟',strokes:9}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='芟').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8])
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch142-2026-09-27/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('芟의 원본 명조 곡선과 연속 꺾임를 보존한다',()=>{
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,4)
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','down','curve','right'])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['right','curve'])
 assert.match(reviewed[0].geometryLicense.modifications,/default mincho new Kage/i)
})
test('芟의 경로·순서·출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[0][0].direction='up'},
 (e:typeof reviewed[number])=>{const s=e.outlines[4][1];assert('revealPath' in s);s.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch142Strokes(changed))}
})
