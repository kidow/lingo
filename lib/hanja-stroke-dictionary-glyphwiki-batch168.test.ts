import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch168.json' with {type:'json'}
import {loadGlyphWikiBatch168Strokes} from './hanja-stroke-dictionary-glyphwiki-batch168.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch168Strokes(reviewed)[0]
test('畇9획은 한 번 등록되고 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'畇',strokes:9}),data)
 assert.equal(hanjaStrokeData({glyph:'畇',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='畇').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch168-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('畇2획 꺾임과7획 갈고리·마지막 가로획을 보존한다',()=>{
 assert.deepEqual(data.outlines![1].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['right','curve','curve'])
 assert.deepEqual(data.outlines![8].map(p=>p.direction),['right'])
 assert.equal(data.paths.length,9)
})
test('畇 경로와 출처를 바꾸면 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch168Strokes(changed))}
})
