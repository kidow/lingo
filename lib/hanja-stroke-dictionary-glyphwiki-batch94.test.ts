import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch94.json' with {type:'json'}
import {loadGlyphWikiBatch94Strokes} from './hanja-stroke-dictionary-glyphwiki-batch94.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch94Strokes(reviewed)[0]
test('宂5획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'宂',strokes:5}),data)
 assert.equal(hanjaStrokeData({glyph:'宂',strokes:6}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='宂').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch94-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('宂의 원본 고딕 설정과 다섯 곡선, 연속된 마지막 갈고리를 보존한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["down"],["curve"],["right","curve"],["down","curve"],["down","curve","right","curve"]])
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.outlines![4][3].revealPath,"M84.5 89.5 Q89.5 89.5 92 79.5")
 assert.match(reviewed[0].geometryLicense.modifications,/k.kShotai=k.kGothic/)
})
test('宂의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[1][0].direction='up'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[1][0];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch94Strokes(changed))}
})
