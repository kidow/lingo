import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),findings=read('./findings.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"2e281c8023e63c21d0fee8f37312d0f32fcfa99d7e0446f4e39ca5bbd7dcbadc")
assert.equal(source.root,'u8559-k');assert.equal(Object.keys(source.records).length,7)
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[])
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]])
assert.equal(proof.groups.length,17);assert.equal(trace.flat().length,19)
assert.equal(trace.flat().filter(p=>p.kind==='cdDrawCurve').length,6)
const compiled=compileProgressive(trace,proof);assert.equal(compiled.length,16);assert.equal(compiled.flat().length,16)
assert.deepEqual(findings.originalFinalLineArgs,trace[14][2].args);assert.deepEqual(findings.originalTerminalContour,trace[14][2].polygons[2])
assert.equal(Math.min(...trace[14][2].polygons[2].map(p=>p.y)),150)
assert(Math.abs(trace[14][2].args[3]-150-31.0306)<.001)
assert.equal(findings.runtimeApplied,false);assert.equal(findings.all144Approved,false);assert.equal(findings.progressiveFramesInspected,9)
assert.equal(hanjaStrokeData({glyph:'蕙',strokes:16}),null)
console.log(JSON.stringify({passed:true,runtimeApplied:false,domesticCompleteReviewed:16,progressiveSamples:9,blockedStroke:14,sourceRecords:7,rawGroups:17,drawingPrimitives:19,privateMediaSaved:false}))
