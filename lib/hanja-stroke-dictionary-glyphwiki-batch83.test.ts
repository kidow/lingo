import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch83.json' with {type:'json'}
import {loadGlyphWikiBatch83Strokes} from './hanja-stroke-dictionary-glyphwiki-batch83.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch83Strokes(reviewed)[0]
test('阱7획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'阱',strokes:7}),data)
 assert.equal(hanjaStrokeData({glyph:'阱',strokes:6}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='阱').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,6,7])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch83-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('阱의 꺾임과 갈고리 및 네 원본 곡선을 보존한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[['right','curve'],['curve','curve'],['down'],['right'],['right'],['down','curve'],['down']])
 assert.equal(data.outlines![0][1].revealPath,"M36.2 14 Q32.4375 24.5 22.7625 38")
 assert.equal(data.outlines![1][1].revealPath,"M33.630582750469245 62.64443066669492 Q32.4375 67.5 27.4375 67.5")
 assert.equal(data.outlines![5][1].revealPath,"M54.9 53 Q54.9 83 33.8875 93.5")
 assert(data.outlines![1][0].bounds[2]<data.outlines![4][0].bounds[0])
 assert.equal(data.outlines![1][1].revealWidth,14)
})
test('阱의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[2][0].direction='up'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[0][1];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch83Strokes(changed))}
})
