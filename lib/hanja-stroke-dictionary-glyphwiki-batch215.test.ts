import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch215.json' with {type:'json'}
import {loadGlyphWikiBatch215Strokes} from './hanja-stroke-dictionary-glyphwiki-batch215.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch215Strokes(reviewed)[0]
test('珷 배정11획은 그대로 두고 사전12획 변형으로 중복 없이 등록한다',()=>{
 assert.deepEqual(hanjaStrokeData({glyph:'珷',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'珷',strokes:12}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='珷').length,1)
 assert.equal(data.paths.length,12)
 assert.deepEqual(data.variant,{catalogStrokes:11,playbackStrokes:12,form:'사전'})
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch215-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('珷 玉 순열·세 올림/점 곡선·굽은 갈고리와 원본 빈 명령을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,3,2,4,5,6,7,8,9,10,11,12,13])
 assert.equal(data.outlines!.flat().length,12)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,4)
 assert.equal(data.outlines![10][0].revealPath,"M70.92 8.5 C70.92 62 80.28 89 91.08 89")
 assert.equal(data.paths.length,12)
 assert.match(reviewed[0].geometryLicense.revision,/u6b62-06/)
})
test('珷 배정/재생 획수·경로·순열·출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.variant.catalogStrokes=12},
 (e:typeof reviewed[number])=>{e.variant.playbackStrokes=11},
 (e:typeof reviewed[number])=>{const part=e.outlines[10][0];assert('revealPath' in part);part.revealPath='M0 0 C0 0 1 1 2 2'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch215Strokes(changed))}
})
