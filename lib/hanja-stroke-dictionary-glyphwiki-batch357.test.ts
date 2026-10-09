import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch357.json' with {type:'json'}
import {loadGlyphWikiBatch357Strokes} from './hanja-stroke-dictionary-glyphwiki-batch357.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch357Strokes(reviewed)[0]
test('騈18획은 중복 없이 등록되고 정확한 전체 원본과 선언 의존성을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'騈',strokes:18}),data)
 assert.equal(hanjaStrokeData({glyph:'騈',strokes:17}),null)
 assert.equal(hanjaStrokeData({glyph:'騈',strokes:19}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='騈').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch357-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('騈의 전체 원본과 국내 방향, 별도 원본 갈고리 윤곽을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,5,3,6,8,9,10,11,12,13,15,14,16,17,19,18])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["down"],["right"],["right"],["right"],["down"],["curve","left"],["curve"],["curve"],["curve"],["curve"],["curve"],["right"],["curve"],["curve"],["curve"],["right"],["right"],["down"]])
 assert.equal(data.outlines!.flat().length,19)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,9)
 assert.equal(data.paths.length,18)
 assert.equal(data.outlines![5][1].direction,'left')
 assert.equal(data.outlines![5][1].weight,8)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u9a08-k/u9a08/u99ac-01/u5e77-02'))
})
test('騈의 갈고리 방향·윤곽·순열·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[5][1].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[5][1].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch357Strokes(changed))}
})
