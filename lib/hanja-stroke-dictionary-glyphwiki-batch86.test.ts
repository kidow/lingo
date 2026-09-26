import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch86.json' with {type:'json'}
import {loadGlyphWikiBatch86Strokes} from './hanja-stroke-dictionary-glyphwiki-batch86.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch86Strokes(reviewed)[0]
test('枏8획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'枏',strokes:8}),data)
 assert.equal(hanjaStrokeData({glyph:'枏',strokes:6}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='枏').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7,8])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch86-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('枏의 빈 제어 항목을 제외하고 꺾임과 세 원본 곡선을 보존한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[['right'],['down'],['curve'],['curve'],['down'],['right','down','curve'],['right'],['right']])
 assert.equal(data.outlines![2][0].revealPath,"M22.875 30.5 Q18.4 55 6.3175 74")
 assert.equal(data.outlines![3][0].revealPath,"M25.1125 43 Q33.615 47 38.5375 54.5")
 assert.equal(data.outlines![5][2].revealPath,"M83.0376 85 Q83.0376 90 78.0376 90")
 assert.equal(data.outlines![5][2].revealWidth,14)
})
test('枏의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[2][0].direction='up'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[2][0];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch86Strokes(changed))}
})
