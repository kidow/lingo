import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
import {compileProgressive as compilePrimitive} from './primitive-reveal.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),historical=read('./historical-sources.json'),second=read('./historical2-sources.json'),proof=read('./historical-engine-proof.json'),trace=read('./historical-draw-trace.json'),findings=read('./findings.json'),inventory=read('./alternative-inventory.json')
for(const[file,expected]of [["sources.json","6d29f2bda0f9449848ec35945914f38b1be6222e9aaa874dd8a26503d538e942"],["historical-sources.json","b1148174c0c954c409c1ed1830fa278e2a3ba5c4748cd599e605ae40933976ee"],["historical2-sources.json","0d28d6352fd398dd664812d59d6f90d52493a5747e00095217bd6d00be373aa7"]])assert.equal(sha(readFileSync(new URL(file,import.meta.url))),expected)
assert.equal(source.root,'u64ce-k');assert.equal(Object.keys(source.records).length,7)
assert.equal(historical.root,'u64ce-ue0102');assert.equal(Object.keys(historical.records).length,8);assert.equal(historical.providerVersions.length,4)
assert.equal(second.root,'u64ce-var-001');assert.equal(Object.keys(second.records).length,8);assert.equal(second.providerVersions.length,6)
for(const s of [source,historical,second]){assert.deepEqual(s.missing,[]);for(const v of s.providerVersions){assert.equal(sha(v.data),v.sha256);assert.equal(v.data,s.records[v.name].data);assert.equal(v.name.split('@')[1],String(v.version))}for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
assert.equal(inventory.alternatives.length,6);for(const s of [historical,second,...inventory.alternatives])assert.equal(s.records['u624b-04'].data,source.records['u624b-04'].data)
assert.equal(read('./engine-proof.json').groups.length,18);assert.equal(read('./draw-trace.json').flat().length,20)
assert.equal(proof.groups.length,19);assert.equal(trace.flat().length,21);assert.equal(trace.flat().filter(p=>p.kind==='cdDrawCurve').length,8)
assert.equal(read('./historical2-engine-proof.json').groups.length,19);assert.equal(read('./historical2-draw-trace.json').flat().length,21)
assert.deepEqual(sourceGroups,[[4],[5],[7],[6],[8],[9,10],[11],[12,13],[14],[15],[16],[17],[18],[0],[1],[2],[3]]);assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:19},(_,i)=>i))
const compiled=compileProgressive(trace,proof),primitive=compilePrimitive(trace,proof);assert.equal(compiled.length,17);assert.equal(compiled.flat().length,17);assert.equal(primitive.flat().length,21);assert.equal(compiled.flat().filter(p=>p.direction==='curve').length,8)
for(const b of findings.blocked){const c=trace[b.rawIndex].at(-1);assert.deepEqual(b.originalCurveArgs,c.args);assert.deepEqual(b.terminalContour,c.polygons.at(-1));assert.equal(c.args[4]-Math.min(...c.polygons.at(-1).map(p=>p.x)),b.gap);assert(b.gap>14)}
assert.deepEqual(findings.reviewedStrokes,[6,17]);assert.equal(findings.progressiveFramesInspected,18);assert.equal(findings.all153Approved,false);assert.equal(findings.runtimeApplied,false);assert.equal(hanjaStrokeData({glyph:'擎',strokes:17}),null)
console.log(JSON.stringify({passed:true,runtimeApplied:false,domesticCompleteReviewed:17,progressiveSamples:18,blockedStrokes:[6,17],sourceRecords:7,historicalRecords:[8,8],historicalVersions:[4,6],wholeVariants:6,rawGroups:19,drawingPrimitives:21,privateMediaSaved:false}))
