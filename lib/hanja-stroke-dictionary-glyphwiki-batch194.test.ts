import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch194.json' with {type:'json'}
import {loadGlyphWikiBatch194Strokes} from './hanja-stroke-dictionary-glyphwiki-batch194.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch194Strokes(reviewed)[0]
test('茨10획은 중복 없이 등록되고 고정 리비전 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'茨',strokes:10}),data)
 assert.equal(hanjaStrokeData({glyph:'茨',strokes:11}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='茨').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch194-2026-10-04/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('茨 네 획 艹 순열과 올림획·연속 꺾임·다섯 곡선을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,6,7,8,9,10,11])
 assert.deepEqual(data.outlines![2].map(p=>p.direction),['right'])
 assert.deepEqual(data.outlines![3].map(p=>p.direction),['down'])
 assert.deepEqual(data.outlines![7].map(p=>p.direction),['right','curve'])
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,5)
 assert.equal(data.outlines![5][0].revealPath,"M8.5 78.37 Q27.5 70.4425 46 58.3625")
 assert.equal(data.outlines![7][1].revealPath,"M86.24 46.2825 Q81.935 50.8125 71.48 58.74")
 assert.equal(data.paths.length,10)
 assert.match(reviewed[0].geometryLicense.revision,/u6b21-var-002@3 and u6b20-02-var-002@2/)
})
test('茨 경로·순열·고정 리비전·출처 변경은 검토 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[7][0].direction='left'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices[0]=2},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch194Strokes(changed))}
})
