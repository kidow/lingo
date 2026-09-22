import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch74.json' with {type:'json'}
import {loadGlyphWikiBatch74Strokes} from './hanja-stroke-dictionary-glyphwiki-batch74.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
import {outlineSegmentProgress} from './hanja-stroke-outline.ts'
const data=loadGlyphWikiBatch74Strokes(reviewed)[0]
test('伻7획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'伻',strokes:7}),data)
 assert.equal(hanjaStrokeData({glyph:'伻',strokes:8}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='伻').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,5,4,6,7])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch74-2026-09-22/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('伻의 세 곡선과 왼쪽에서 오른쪽으로 쓰는 가운데 순서를 유지한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[['curve'],['down'],['right'],['curve'],['curve'],['right'],['down']])
 assert.equal(data.outlines![0][0].revealPath,'M33.2975 7.5 Q22.43 36 6.33 58.5')
 assert.equal(data.outlines![3][0].revealPath,'M53.2375 24 Q48.8875 37.5 38.375 48.5')
 assert.equal(data.outlines![4][0].revealPath,'M73.175 24 Q82.9625 34.5 86.5875 46.5')
 for(const i of [0,3,4])assert.deepEqual(outlineSegmentProgress(data.outlines![i],.5),[.5])
})
test('伻의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[3][0].direction='right'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[4][0];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[3]=4},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch74Strokes(changed))}
})
