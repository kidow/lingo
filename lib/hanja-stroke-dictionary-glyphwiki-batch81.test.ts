import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch81.json' with {type:'json'}
import {loadGlyphWikiBatch81Strokes} from './hanja-stroke-dictionary-glyphwiki-batch81.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch81Strokes(reviewed)[0]
test('芐7획은 원래 전체 자형과 국내 순서로 한 번 등록된다',()=>{
 assert.equal(hanjaStrokeData({glyph:'芐',strokes:7}),data)
 assert.equal(hanjaStrokeData({glyph:'芐',strokes:6}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='芐').length,1)
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7])
 const verifier=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch81-2026-09-27/verify.mjs',import.meta.url))
 assert.match(execFileSync(process.execPath,[verifier],{encoding:'utf8'}),/"passed":true/)
})
test('芐의 초두머리 순서와 마지막 곡선을 보존한다',()=>{
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[['right'],['down'],['right'],['down'],['right'],['down'],['curve']])
 assert.equal(data.outlines![6][0].revealPath,'M48 54.715 Q68.5 60.275 79.5 68.9625')
 assert(data.outlines![0][0].bounds[2]<data.outlines![2][0].bounds[0])
 assert.equal(data.outlines![6][0].revealWidth,14)
})
test('芐의 곡선·순서·백업 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[2][0].direction='down'},
 (e:typeof reviewed[number])=>{const segment=e.outlines[6][0];assert('revealPath' in segment);segment.revealPath='M1 1 Q2 2 3 3'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[2]=3},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch81Strokes(changed))}
})
