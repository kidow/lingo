import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch87.json' with {type:'json'}
import {loadGlyphWikiBatch87Strokes} from './hanja-stroke-dictionary-glyphwiki-batch87.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch87Strokes(reviewed)[0]
test('秊8획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'秊',strokes:8}),data)
 assert.equal(hanjaStrokeData({glyph:'秊',strokes:6}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='秊').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch87-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('秊의 여덟 원본 획과 네 곡선을 보존한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[['curve'],['right'],['down'],['curve'],['curve'],['curve'],['right'],['down']])
 assert.equal(data.outlines![0][0].revealPath,"M73.65 9.055 Q53.175 13.53 18.5625 16.215")
 assert.equal(data.outlines![3][0].revealPath,"M47.325 24.7175 Q33.675 38.59 10.275 46.1975")
 assert.equal(data.outlines![4][0].revealPath,"M53.175 24.7175 Q71.7 39.0375 87.7875 42.6175")
 assert.equal(data.outlines![5][0].revealPath,"M77.5 48.44 Q50 54.11 11.5 56.81")
})
test('秊의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[3][0].direction='up'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[3][0];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch87Strokes(changed))}
})
