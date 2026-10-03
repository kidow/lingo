import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch214.json' with {type:'json'}
import {loadGlyphWikiBatch214Strokes} from './hanja-stroke-dictionary-glyphwiki-batch214.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch214Strokes(reviewed)[0]
test('焄11획은 중복 없이 등록되고 정확한 전체 원본 경로를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'焄',strokes:11}),data)
 assert.equal(hanjaStrokeData({glyph:'焄',strokes:12}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='焄').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch214-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('焄 두 꺾임과 네 점 및 원본 13개 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,Array.from({length:13},(_,i)=>i+1))
 assert.deepEqual(data.outlines![0].map(p=>p.direction),['right','down'])
 assert.deepEqual(data.outlines![5].map(p=>p.direction),['right','down'])
 assert.equal(data.outlines!.flat().length,13)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.outlines![3][0].revealPath,"M42.7125 12.41 Q41.205 50.715 7.035 67.83")
 assert.equal(data.outlines!.slice(7).flat().filter(p=>p.direction==='curve').length,4)
 assert.equal(data.paths.length,11)
 assert.match(reviewed[0].geometryLicense.revision,/u5f50-ue0101/)
})
test('焄 경로·순열·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{const part=e.outlines[3][0];assert('revealPath' in part);part.revealPath='M0 0 Q0 0 1 1'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch214Strokes(changed))}
})
