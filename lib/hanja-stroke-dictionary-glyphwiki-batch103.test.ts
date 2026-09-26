import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch103.json' with {type:'json'}
import {loadGlyphWikiBatch103Strokes} from './hanja-stroke-dictionary-glyphwiki-batch103.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch103Strokes(reviewed)[0]
test('芄7획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'芄',strokes:7}),data)
 assert.equal(hanjaStrokeData({glyph:'芄',strokes:8}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='芄').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch103-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('芄의 원본 고딕 설정과 네 이차곡선과 연속 갈고리, 국내 순서를 보존한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["down"],["right"],["down"],["down","curve"],["right","down","curve","right","curve"],["curve"]])
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,4)
 assert.equal(data.outlines![4][1].revealPath,"M43.3 48.265 Q43.3 82.21 12.87 93.16")
 assert.equal(data.outlines![5][4].revealPath,"M83.05 88.78 Q88.05 88.78 90.55 78.78")
 assert.match(reviewed[0].geometryLicense.modifications,/k.kShotai=k.kGothic/)
})
test('芄의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[0][0].direction='up'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[5][4];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch103Strokes(changed))}
})
