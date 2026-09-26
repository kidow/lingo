import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch96.json' with {type:'json'}
import {loadGlyphWikiBatch96Strokes} from './hanja-stroke-dictionary-glyphwiki-batch96.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch96Strokes(reviewed)[0]
test('乫6획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'乫',strokes:6}),data)
 assert.equal(hanjaStrokeData({glyph:'乫',strokes:8}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='乫').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch96-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('乫의 원본 고딕 설정과 다섯 곡선과 사선, 연속된 마지막 갈고리를 보존한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right","curve","curve"],["curve"],["down"],["right","down"],["right"],["right","curve","curve","right","curve"]])
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.outlines![5][4].revealPath,"M81.125 88.25 Q86.125 88.25 88.625 78.25")
 assert.equal(data.outlines![5][1].revealPath,"M72.2875 55.25 L32.07342721437464 75.01636606852558")
 assert.match(reviewed[0].geometryLicense.modifications,/k.kShotai=k.kGothic/)
})
test('乫의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[0][1].direction='up'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[0][1];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch96Strokes(changed))}
})
