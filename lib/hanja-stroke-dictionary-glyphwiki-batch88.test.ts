import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch88.json' with {type:'json'}
import {loadGlyphWikiBatch88Strokes} from './hanja-stroke-dictionary-glyphwiki-batch88.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch88Strokes(reviewed)[0]
test('昑8획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'昑',strokes:8}),data)
 assert.equal(hanjaStrokeData({glyph:'昑',strokes:6}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='昑').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch88-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('昑의 소형 명조 원본과 두 꺾임, 사선 경로를 보존한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[['down'],['right','down'],['right'],['right'],['curve'],['curve'],['right'],['right','curve']])
 assert.equal(data.outlines![4][0].revealPath,"M63.230000000000004 8 Q53.989999999999995 35.5 34.9325 54")
 assert.equal(data.outlines![5][0].revealPath,"M62.075 11 Q74.2025 37 91.5275 46.5")
 assert.equal(data.outlines![7][1].revealPath,"M81.71 59.5 L71.315 88.5")
 assert.match(reviewed[0].geometryLicense.modifications,/new Kage\(1\)/)
})
test('昑의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].direction='up'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[4][0];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch88Strokes(changed))}
})
