import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
import {compileProgressive as compilePrimitive} from './primitive-reveal.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const original=read('./sources.json'),op=read('./engine-proof.json'),ot=read('./draw-trace.json'),source=read('./historical-sources.json'),proof=read('./historical-engine-proof.json'),trace=read('./historical-draw-trace.json'),f=read('./findings.json'),inventory=read('./alternative-inventory.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"936fea9d2a18cc47da88862ba1e34597a563f0ae5e8b57ca7f684e8fd7abb03c")
assert.equal(sha(readFileSync(new URL('./historical-sources.json',import.meta.url))),"1e2677bddd5b6eaa04003746fc75b7f55643a31667ceb28faf98ce5ebab80c26")
assert.equal(original.root,'u74a5-k');assert.equal(Object.keys(original.records).length,7)
assert.equal(source.root,'u74a5-ue0102');assert.equal(Object.keys(source.records).length,8)
assert.deepEqual(source.providerVersions.map(v=>v.name),["u656c-var-002@1","u53e3@12","u53e3-j@2","u6535-02@9"])
for(const s of [original,source,...inventory.alternatives]){assert.deepEqual(s.missing,[]);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]],'declared whole dependency missing')}
for(const v of source.providerVersions){assert.equal(sha(v.data),v.sha256);assert.equal(v.data,source.records[v.name].data)}
assert.equal(op.groups.length,18);assert.equal(ot.flat().length,19);assert.equal(proof.groups.length,19);assert.equal(trace.flat().length,20)
assert.equal(trace.flat().filter(p=>p.kind==='cdDrawCurve').length,7)
assert.equal(trace.flat().filter(p=>p.kind==='cdDrawBezier').length,0)
assert.deepEqual(sourceGroups,[[0],[2],[1],[3],[4],[5],[7],[6],[8],[9,10],[11],[12,13],[14],[15],[16],[17],[18]]);assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:19},(_,i)=>i))
const compiled=compileProgressive(trace,proof),primitive=compilePrimitive(trace,proof)
assert.equal(compiled.length,17);assert.equal(compiled.flat().length,17);assert.equal(primitive.flat().length,20);assert.equal(compiled.flat().filter(p=>p.direction==='curve').length,7)
for(let i=0;i<17;i++)assert.equal(compiled[i].map(p=>p.outline).join(' '),primitive[i].map(p=>p.outline).join(' '))
assert.deepEqual(f.originalFinalCurveArgs,trace[10][1].args);assert.deepEqual(f.originalTerminalContour,trace[10][1].polygons.at(-1))
assert.equal(trace[10][1].args[4]-Math.min(...trace[10][1].polygons.flat().map(p=>p.x)),f.originalGap)
assert.equal(f.originalGap,20.07000000000002);assert.equal(f.runtimeApplied,false);assert.equal(f.progressive.all153Approved,false);assert.equal(f.progressive.progressiveFramesInspected,9)
assert.equal(inventory.alternatives.length,5)
assert.equal(hanjaStrokeData({glyph:'璥',strokes:17}),null)
console.log(JSON.stringify({passed:true,runtimeApplied:false,originalRecords:7,historicalRecords:8,historicalVersions:4,domesticHistoricalReviewed:17,progressiveSamples:9,blockedStroke:10,wholeVariants:5,sourceHashesVerified:true,privateMediaSaved:false}))
