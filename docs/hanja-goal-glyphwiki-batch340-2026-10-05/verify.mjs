import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
import {compileProgressive as compilePrimitive} from './primitive-reveal.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),f=read('./findings.json'),a=read('./alternative-inventory.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"4c08d442e25a70c92e4a206c5d3b19adfd73d4531fe5195bb0b167dccd4b4975")
assert.equal(source.root,'u74b2-k');assert.equal(Object.keys(source.records).length,7)
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[])
assert.equal(source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
for(const s of [source,...a.alternatives])for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])
assert.equal(proof.groups.length,20);assert.equal(trace.flat().length,21)
assert.equal(trace.flat().filter(p=>p.kind==='cdDrawCurve').length,13)
assert.equal(trace.flat().filter(p=>p.kind==='cdDrawBezier').length,1)
assert.deepEqual(sourceGroups,[[0],[2],[1],[3],[12],[10,11],[13],[14],[15],[16],[17],[18],[19],[4],[5],[6,7],[8,9]])
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:20},(_,i)=>i))
const compiled=compileProgressive(trace,proof),primitive=compilePrimitive(trace,proof)
assert.equal(compiled.length,17);assert.equal(compiled.flat().length,19);assert.equal(primitive.flat().length,21)
assert.equal(compiled.flat().filter(p=>p.direction==='curve').length,14)
for(let i=0;i<17;i++)assert.equal(compiled[i].map(p=>p.outline).join(' '),primitive[i].map(p=>p.outline).join(' '))
assert.equal(compiled[5].length,2);assert.equal(compiled[16].length,2)
assert.deepEqual(f.originalFinalCurveArgs,trace[15][1].args);assert.deepEqual(f.originalTerminalContour,trace[15][1].polygons.at(-1))
assert(Math.abs(trace[15][1].args[4]-Math.min(...trace[15][1].polygons.at(-1).map(p=>p.x))-20.02)<1e-10)
assert.deepEqual(f.originalCenterlineGaps[0].end,trace[10][0].args.slice(2,4));assert.deepEqual(f.originalCenterlineGaps[0].start,trace[11][0].args.slice(0,2))
assert.deepEqual(f.originalCenterlineGaps[1].end,trace[8][0].args.slice(4,6));assert.deepEqual(f.originalCenterlineGaps[1].start,trace[9][0].args.slice(0,2))
assert.equal(a.alternatives.length,6);for(const v of a.alternatives)assert.deepEqual(v.missing,[])
assert.equal(f.runtimeApplied,false);assert.equal(f.all153Approved,false);assert.equal(f.progressiveFramesInspected,27)
assert.equal(hanjaStrokeData({glyph:'璲',strokes:17}),null)
console.log(JSON.stringify({passed:true,sourceRecords:7,wholeVariants:6,rawGroups:20,drawingPrimitives:21,Q:13,C:1,researchPens:17,researchMasks:19,domesticCompleteReviewed:17,progressiveSamples:27,blockedStroke:9,runtimeApplied:false,privateMediaSaved:false}))
