import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch186.json' with {type:'json'}
import {loadGlyphWikiBatch186Strokes} from './hanja-stroke-dictionary-glyphwiki-batch186.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch186Strokes(reviewed)[0]
test('挻10획은 한 번 등록되고 전체 원본·제외 근거를 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'挻',strokes:10}),data)
 assert.equal(hanjaStrokeData({glyph:'挻',strokes:11}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='挻').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch186-2026-10-03/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('挻 국내 순열·연속 꺾임과 원본 긴 곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,13,9,10,11,12,4,5,6,7,8])
 assert.deepEqual(data.outlines![6].map(p=>p.direction),['down','right'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['right','left'])
 assert.deepEqual(data.outlines![8].map(p=>p.direction),['right','curve'])
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.outlines![9][0].revealPath,'M34.5 51.5 Q42 91.5 88.5 88')
 assert.equal(data.paths.length,10)
})
test('挻 경로·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[6][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch186Strokes(changed))}
})
