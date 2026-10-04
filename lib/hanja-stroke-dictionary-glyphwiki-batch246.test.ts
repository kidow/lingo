import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch246.json' with {type:'json'}
import {loadGlyphWikiBatch246Strokes} from './hanja-stroke-dictionary-glyphwiki-batch246.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch246Strokes(reviewed)[0]
test('菉 배정12획과 사전11획 변형은 정확한 원본으로만 등록한다',()=>{
 assert.deepEqual(hanjaStrokeData({glyph:'菉',strokes:12}),data)
 assert.equal(hanjaStrokeData({glyph:'菉',strokes:11}),null)
 assert.equal(hanjaStrokeData({glyph:'菉',strokes:13}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='菉').length,1)
 assert.deepEqual(data.variant,{catalogStrokes:12,playbackStrokes:11,form:'사전'})
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch246-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('菉 세 획 풀머리·두 연속 꺾임과 원본14개 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,8,9,10,11,12,13])
 assert.deepEqual(data.outlines!.slice(0,3).map(s=>s[0].direction),['right','down','down'])
 assert.deepEqual(data.outlines![3].map(p=>p.direction),['left','right'])
 assert.deepEqual(data.outlines![4].map(p=>p.direction),['right','left'])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['down','curve'])
 assert.equal(data.outlines!.flat().length,14)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.paths.length,11)
 assert.match(reviewed[0].geometryLicense.revision,/exact whole u83c9\//)
 assert.doesNotMatch(reviewed[0].geometryLicense.revision,/u83c9-k/)
})
test('菉 경로·배정 획수·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[3][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.variant.catalogStrokes=11},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch246Strokes(changed))}
})
