import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch216.json' with {type:'json'}
import {loadGlyphWikiBatch216Strokes} from './hanja-stroke-dictionary-glyphwiki-batch216.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch216Strokes(reviewed)[0]
test('珹 배정11획을 유지하고 사전10획으로 중복 없이 재생한다',()=>{
 assert.deepEqual(hanjaStrokeData({glyph:'珹',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'珹',strokes:10}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='珹').length,1)
 assert.equal(data.paths.length,10)
 assert.deepEqual(data.variant,{catalogStrokes:11,playbackStrokes:10,form:'사전'})
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch216-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('珹 국내 玉 순열과 成 꺾임의 원본 연결·곡선·갈고리를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,5,6,7,8,9,10,11])
 assert.equal(data.outlines!.flat().length,13)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,7)
 assert.equal(data.outlines![6].length,3)
 assert.equal(data.outlines![7][0].revealPath,"M66.6075 7.5 Q72.1825 90 90.0225 90")
 assert.match(reviewed[0].geometryLicense.revision,/u73f9-ue0102\/u738b-01\/u6210-02/)
})
test('珹 배정/재생 획수·갈고리·순열·출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.variant.catalogStrokes=10},
 (e:typeof reviewed[number])=>{e.variant.playbackStrokes=11},
 (e:typeof reviewed[number])=>{const part=e.outlines[6][1];assert('revealPath' in part);part.revealPath='M0 0 Q1 1 2 2'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch216Strokes(changed))}
})
