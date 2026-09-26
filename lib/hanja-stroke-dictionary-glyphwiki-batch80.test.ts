import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch80.json' with {type:'json'}
import {loadGlyphWikiBatch80Strokes} from './hanja-stroke-dictionary-glyphwiki-batch80.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
import {outlineSegmentProgress} from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch80Strokes(reviewed)[0]
test('牣7획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'牣',strokes:7}),data)
 assert.equal(hanjaStrokeData({glyph:'牣',strokes:8}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='牣').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch80-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('牣의 다섯째 갈고리와 마지막 왼쪽 곡선을 원래 경로로 재생한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[['curve'],['right'],['down'],['curve'],['right','curve','curve','left'],['curve'],['curve']])
 assert.equal(data.outlines![6][0].revealPath,"M52.3 34.5 Q53.2 48.5 45.1 58.5")
 for(const i of [4]){const segments=data.outlines![i];const total=segments.reduce((n,s)=>n+s.weight,0);const start=segments.slice(0,-1).reduce((n,s)=>n+s.weight,0)/total;assert.equal(outlineSegmentProgress(segments,start-0.000001).at(-1),0);assert.equal(outlineSegmentProgress(segments,1).at(-1),1)}
})
test('牣의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][3].direction='down'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[6][0];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[3]=5},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch80Strokes(changed))}
})
