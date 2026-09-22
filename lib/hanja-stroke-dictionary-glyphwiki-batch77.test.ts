import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch77.json' with {type:'json'}
import {loadGlyphWikiBatch77Strokes} from './hanja-stroke-dictionary-glyphwiki-batch77.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
import {outlineSegmentProgress} from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch77Strokes(reviewed)[0]
test('吪7획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'吪',strokes:7}),data)
 assert.equal(hanjaStrokeData({glyph:'吪',strokes:8}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='吪').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,5,6,7,8])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch77-2026-09-22/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('吪의 입구 꺾임과 마지막 갈고리를 원래 경로로 재생한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[['down'],['right','down'],['right'],['curve'],['down'],['curve'],['down','curve','right','up']])
 assert.equal(data.outlines![6][1].revealPath,"M66.42 81 Q66.42 86 71.42 86")
 for(const i of [1,6]){const segments=data.outlines![i];const total=segments.reduce((n,s)=>n+s.weight,0);const start=segments.slice(0,-1).reduce((n,s)=>n+s.weight,0)/total;assert.equal(outlineSegmentProgress(segments,start-0.000001).at(-1),0);assert.equal(outlineSegmentProgress(segments,1).at(-1),1)}
})
test('吪의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[6][3].direction='down'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[6][1];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[3]=3},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch77Strokes(changed))}
})
