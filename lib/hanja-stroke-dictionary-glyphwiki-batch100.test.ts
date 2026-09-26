import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch100.json' with {type:'json'}
import {loadGlyphWikiBatch100Strokes} from './hanja-stroke-dictionary-glyphwiki-batch100.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch100Strokes(reviewed)[0]
test('邛6획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'邛',strokes:6}),data)
 assert.equal(hanjaStrokeData({glyph:'邛',strokes:8}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='邛').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch100-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('邛의 원본 고딕 설정과 세 이차곡선과 삼차곡선 갈고리, 국내 순서를 보존한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["down"],["curve"],["right","curve"],["curve","curve"],["down"]])
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,4)
 assert.equal(data.outlines![4][0].revealPath,"M68.1 41.5 C90.14 49.5 89.56 66.5 86.0115826544759 73.53565508164263")
 assert.equal(data.outlines![4][1].revealPath,"M86.0115826544759 73.53565508164263 Q83.76 78 73.76 75.5")
 assert.match(reviewed[0].geometryLicense.modifications,/k.kShotai=k.kGothic/)
})
test('邛의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[0][0].direction='up'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[4][0];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch100Strokes(changed))}
})
