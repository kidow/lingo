import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch297.json' with {type:'json'}
import {loadGlyphWikiBatch297Strokes} from './hanja-stroke-dictionary-glyphwiki-batch297.ts'
import {HANJA_STROKES,hanjaStrokeData} from './hanja-strokes.ts'
const data=loadGlyphWikiBatch297Strokes(reviewed)[0]
test('慤15획은 중복 없이 등록되고 정확한 전체 원본을 재현한다',()=>{
 assert.equal(hanjaStrokeData({glyph:'慤',strokes:15}),data)
 assert.equal(hanjaStrokeData({glyph:'慤',strokes:14}),null)
 assert.equal(hanjaStrokeData({glyph:'慤',strokes:16}),null)
 assert.equal(HANJA_STROKES.filter(s=>s.glyph==='慤').length,1)
 assert.match(execFileSync(process.execPath,[fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch297-2026-10-05/verify.mjs',import.meta.url))],{encoding:'utf8'}),/"passed":true/)
})
test('慤의 국내 殼·心 순서와12곡선·원본 윤곽 꺾임을 보존한다',()=>{
 assert.deepEqual(data.sourceStrokeIndices,[1,2,3,4,5,7,8,11,12,14,16,17,18,19,20])
 assert.deepEqual(data.outlines!.map(s=>s.map(p=>p.direction)),[["right"],["down"],["right"],["curve"],["right","curve"],["down","curve"],["right","down","curve"],["down","curve"],["right","down","curve","right"],["right","curve"],["curve"],["curve"],["down","curve","right"],["curve"],["curve"]])
 assert.equal(data.outlines!.flat().length,26)
 assert.equal(data.outlines!.flat().filter(p=>p.direction==='curve').length,12)
 assert.equal(data.paths.length,15)
 assert.ok(reviewed[0].geometryLicense.revision.includes('u6164-g/u58f3-g01/u6bb3-g02/u5fc3-04/u5fc3-09'))
})
test('慤의 순열·곡선·원본·사전 출처 변경은 승인을 무효화한다',()=>{
 for(const modify of [
 (e:typeof reviewed[number])=>{e.outlines[4][0].outline='M0 0 L1 1 L2 0 Z'},
 (e:typeof reviewed[number])=>{e.sourceStrokeIndices.splice(0,3,2,1,3)},
 (e:typeof reviewed[number])=>{e.geometryLicense.revision='latest'},
 (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
 ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch297Strokes(changed))}
})

test('慤의 특정 원본 접점은 겹친 윤곽만 허용하고 새 연결 경로를 만들지 않는다',()=>{
 const moduleUrl=new URL('../docs/hanja-goal-glyphwiki-batch297-2026-10-05/progressive.mjs',import.meta.url).href
 const tracePath=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch297-2026-10-05/draw-trace.json',import.meta.url))
 const proofPath=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch297-2026-10-05/engine-proof.json',import.meta.url))
 const script=`import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
 const{compileProgressive}=await import(${JSON.stringify(moduleUrl)});
 const trace=JSON.parse(readFileSync(${JSON.stringify(tracePath)},'utf8')),proof=JSON.parse(readFileSync(${JSON.stringify(proofPath)},'utf8'));
 assert.deepEqual(trace[7][0].args.slice(2,4),[72.06,84.2]);assert.deepEqual(trace[8][0].args.slice(0,2),[72.995,84.2]);
 assert.equal(compileProgressive(trace,proof).length,15);
 const moved=structuredClone(trace);moved[8][0].args[0]=72.06;assert.throws(()=>compileProgressive(moved,proof));
 const disjoint=structuredClone(trace);for(const p of disjoint[8][0].polygons.flat())p.x+=50;assert.throws(()=>compileProgressive(disjoint,proof),/original filled contours must overlap/);
 console.log('original-overlap-guard-passed');`
 assert.match(execFileSync(process.execPath,['--input-type=module','-e',script],{encoding:'utf8'}),/original-overlap-guard-passed/)
})
