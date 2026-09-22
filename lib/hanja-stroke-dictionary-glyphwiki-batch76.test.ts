import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch76.json' with {type:'json'}
import {loadGlyphWikiBatch76Strokes} from './hanja-stroke-dictionary-glyphwiki-batch76.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
import {outlineSegmentProgress} from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch76Strokes(reviewed)[0]
test('扤6획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'扤',strokes:6}),data)
 assert.equal(hanjaStrokeData({glyph:'扤',strokes:8}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='扤').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch76-2026-09-22/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('扤의 두 갈고리는 원래 몸통 뒤에 재생된다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[['right'],['down','curve','left'],['curve'],['right'],['down','curve'],['down','curve','right','up']])
 assert.equal(data.outlines![1][1].revealPath,'M24.25 85.5 Q24.25 90.5 19.25 90.5')
 for(const i of [1,5]){const segments=data.outlines![i];const total=segments.reduce((n,s)=>n+s.weight,0);const start=segments.slice(0,-1).reduce((n,s)=>n+s.weight,0)/total;assert.equal(outlineSegmentProgress(segments,start-0.000001).at(-1),0);assert.equal(outlineSegmentProgress(segments,1).at(-1),1)}
})
test('扤의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][3].direction='down'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[4][1];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[3]=3},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch76Strokes(changed))}
})
