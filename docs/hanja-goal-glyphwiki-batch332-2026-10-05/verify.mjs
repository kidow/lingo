import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
import {compileProgressive as compilePrimitive} from './primitive-reveal.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),findings=read('./findings.json'),alternative=read('./alternative-source.json'),altProof=read('./alternative-engine-proof.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"3588ab806076ff1d0a992b65c58939c3a17c8786c37ac286f4e06938f73d1794")
assert.equal(sha(readFileSync(new URL('./alternative-source.json',import.meta.url))),"03bf323bdbdae67cbd3c7f0f0462e557bb82fbb51343b0444bad829b4cfc3cfa")
assert.equal(source.root,'u8aea-k');assert.equal(Object.keys(source.records).length,6)
assert.equal(alternative.root,'u8aea-ue0101');assert.equal(Object.keys(alternative.records).length,8)
for(const s of [source,alternative]){assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.deepEqual(s.providerVersions,[]);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
assert.equal(proof.groups.length,19);assert.equal(trace.flat().length,20);assert.equal(trace.flat().filter(p=>p.kind==='cdDrawCurve').length,3)
assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11,12],[13],[14],[15,16],[17],[18]]);assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:19},(_,i)=>i))
const compiled=compileProgressive(trace,proof),primitive=compilePrimitive(trace,proof);assert.equal(compiled.length,16);assert.equal(compiled.flat().length,16);assert.equal(primitive.flat().length,20);assert.equal(compiled.flat().filter(p=>p.direction==='curve').length,5)
assert.deepEqual(findings.originalFinalCurveArgs,trace[18][1].args);assert.deepEqual(findings.originalTerminalContour,trace[18][1].polygons.at(-1))
assert(Math.abs(trace[18][1].args[4]-Math.min(...trace[18][1].polygons.at(-1).map(p=>p.x))-20.07)<.001)
assert.deepEqual(altProof.engineHashes,proof.engineHashes);assert.equal(altProof.groups.length,19)
const altLast=altProof.trace.at(-1).at(-1);assert.deepEqual(findings.distinctAlternative.terminalCurveArgs,altLast.args);assert.deepEqual(findings.distinctAlternative.terminalContour,altLast.polygons.at(-1));assert.equal(altLast.args[4]-Math.min(...altLast.polygons.at(-1).map(p=>p.x)),20)
assert.equal(findings.runtimeApplied,false);assert.equal(findings.all144Approved,false);assert.equal(findings.progressiveFramesInspected,9);assert.equal(findings.distinctAlternative.nativeVisualApproval,false)
assert.equal(hanjaStrokeData({glyph:'諪',strokes:16}),null)
console.log(JSON.stringify({passed:true,runtimeApplied:false,domesticCompleteReviewed:16,progressiveSamples:9,blockedStroke:16,sourceRecords:6,distinctAlternativeRecords:8,rawGroups:19,drawingPrimitives:20,privateMediaSaved:false}))
