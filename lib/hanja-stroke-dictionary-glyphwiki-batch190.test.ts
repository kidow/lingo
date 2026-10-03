import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch190.json' with {type:'json'}
import {loadGlyphWikiBatch190Strokes} from './hanja-stroke-dictionary-glyphwiki-batch190.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch190Strokes(reviewed)[0]
test('珦10획은 중복 없이 등록되고 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'珦',strokes:10}),data)
 assert.equal(hanjaStrokeData({glyph:'珦',strokes:11}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='珦').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch190-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('珦 국내 순열·외곽 갈고리·안쪽 꺾임을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,5,6,7,8,9,10,11,12])
 assert.deepEqual(data.outlines![1].map(p=>p.direction),['right'])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['down'])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['right','down','curve'])
 assert.deepEqual(data.outlines![8].map(p=>p.direction),['right','down'])
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,3)
 assert.equal(data.outlines![6][2].revealPath,'M87.96 86 Q87.96 91 82.96 91')
 assert.equal(data.paths.length,10)
 assert.match(reviewed[0].geometryLicense.revision,/individual glyph revisions unavailable/)
})
test('珦 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[6][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[1]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch190Strokes(changed))}
})
