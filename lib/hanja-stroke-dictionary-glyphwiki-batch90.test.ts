import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch90.json' with {type:'json'}
import {loadGlyphWikiBatch90Strokes} from './hanja-stroke-dictionary-glyphwiki-batch90.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch90Strokes(reviewed)[0]
test('芋7획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'芋',strokes:7}),data)
 assert.equal(hanjaStrokeData({glyph:'芋',strokes:6}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='芋').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch90-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('芋의 초두머리 순서와 원본 세로 갈고리를 보존한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[['right'],['down'],['right'],['down'],['right'],['right'],['down','curve']])
 assert.equal(data.outlines![6][1].revealPath,"M49.5 86.38 Q49.5 91.38 44.5 91.38")
})
test('芋의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[6][1].direction='up'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[6][1];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch90Strokes(changed))}
})
