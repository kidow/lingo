import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch354.json' with {type:'json'}
import {loadGlyphWikiBatch354Strokes} from './hanja-stroke-dictionary-glyphwiki-batch354.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch354Strokes(reviewed)[0]
test('藎18획은 한 번만 등록되고 원본 및 명시된 선언 의존성을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'藎',strokes:18}),data)
 for(const strokes of [17,19])assert.equal(hanjaStrokeData({glyph:'藎',strokes}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='藎').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch354-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('藎은 국내 필순과 원본의 연속 경로를 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,4,3,5,8,7,9,10,11,12,13,14,15,16,18,19,20])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["down"],["right"],["down"],["curve"],["right"],["right"],["down"],["right"],["curve"],["curve"],["curve"],["curve"],["down"],["curve"],["down"],["down"],["right"]])
 assert.equal(data.outlines!.flat().length,18)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,6)
 assert.equal(data.paths.length,18)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u85ce-k/koseki-366050/ufa5e-03/u8279-k03/u76e1/cdp-8ca5/extf-04230/u2ff1-u8080-u4e00/u706c-04/u76bf-04'))
})
test('藎의 방향·윤곽·순열·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].direction='right'},
 (e:typeof reviewed[number])=>{e.outlines[13][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch354Strokes(changed))}
})
