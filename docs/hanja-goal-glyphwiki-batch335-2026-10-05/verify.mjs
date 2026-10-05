import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
import {compileProgressive as compilePrimitive} from './primitive-reveal.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),findings=read('./findings.json'),alternatives=read('./alternative-inventory.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"544d133f9c62a5539ae016262d9e94add232ebb2d25ac93076e480458466198f")
assert.equal(source.root,'u9321-k');assert.equal(Object.keys(source.records).length,5)
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[])
for(const s of [source,...alternatives.alternatives])for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])
assert.equal(proof.groups.length,18);assert.equal(trace.flat().length,18);assert.equal(trace.flat().filter(p=>p.kind==='cdDrawCurve').length,8)
assert.equal(proof.groups[8].raw[0],0);assert.deepEqual(proof.groups[8].polygons,[]);assert.deepEqual(trace[8],[])
assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5],[6],[7],[9],[10],[11],[12],[13],[14,15],[16],[17]]);assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i).filter(i=>i!==8))
const compiled=compileProgressive(trace,proof),primitive=compilePrimitive(trace,proof);assert.equal(compiled.length,16);assert.equal(compiled.flat().length,16);assert.equal(primitive.flat().length,18);assert.equal(compiled.flat().filter(p=>p.direction==='curve').length,9)
assert.deepEqual(findings.originalFinalCurveArgs,trace[17][1].args);assert.deepEqual(findings.originalTerminalContour,trace[17][1].polygons.at(-1));assert.equal(trace[17][1].args[4]-Math.min(...trace[17][1].polygons.at(-1).map(p=>p.x)),20.00999999999999)
assert.equal(alternatives.alternatives.length,3);for(const a of alternatives.alternatives){assert.deepEqual(a.missing,[]);assert.equal(a.records['u5947-08'].data,source.records['u5947-08'].data)}
assert.equal(findings.runtimeApplied,false);assert.equal(findings.all144Approved,false);assert.equal(findings.progressiveFramesInspected,9);assert.equal(hanjaStrokeData({glyph:'錡',strokes:16}),null)
console.log(JSON.stringify({passed:true,runtimeApplied:false,domesticCompleteReviewed:16,progressiveSamples:9,blockedStroke:16,sourceRecords:5,wholeVariants:3,rawGroups:18,nonDrawingSourceGroups:[8],drawingPrimitives:18,privateMediaSaved:false}))
