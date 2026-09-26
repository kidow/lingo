import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch95.json' with {type:'json'}
import {loadGlyphWikiBatch95Strokes} from './hanja-stroke-dictionary-glyphwiki-batch95.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch95Strokes(reviewed)[0]
test('戹5획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'戹',strokes:5}),data)
 assert.equal(hanjaStrokeData({glyph:'戹',strokes:6}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='戹').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[4,2,3,1,5])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch95-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('戹의 원본 고딕 설정과 네 곡선과 사선, 연속된 마지막 갈고리를 보존한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["curve"],["right","down"],["right"],["down","curve"],["right","curve","curve","right","curve"]])
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.outlines![4][4].revealPath,"M81.1 87.94 Q86.1 87.94 88.6 77.94")
 assert.equal(data.outlines![4][1].revealPath,"M74.49000000000001 53.62 L43.77945536401876 72.33091588686092")
 assert.match(reviewed[0].geometryLicense.modifications,/k.kShotai=k.kGothic/)
})
test('戹의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[0][0].direction='up'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[0][0];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch95Strokes(changed))}
})
