import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),findings=read('./findings.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"5605aebe648613d6c089f2b1f235490412a9544e2b710782d436bfa9a742d39c")
assert.equal(source.root,'u8541-k');assert.equal(Object.keys(source.records).length,9)
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[])
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]])
assert.equal(proof.groups.length,18);assert.equal(trace.flat().length,19)
assert.equal(trace.flat().filter(p=>p.kind==='cdDrawCurve').length,3)
const compiled=compileProgressive(trace,proof);assert.equal(compiled.length,16);assert.equal(compiled.flat().length,16)
assert.deepEqual(findings.originalHookArgs,trace[16][1].args);assert.deepEqual(findings.originalTerminalContour,trace[16][1].polygons[1])
assert.equal(Math.min(...trace[16][1].polygons[1].map(p=>p.x)),105.3)
assert(Math.abs(trace[16][1].args[4]-105.3-20)<.1)
assert.equal(findings.runtimeApplied,false);assert.equal(findings.all144Approved,false);assert.equal(findings.progressiveFramesInspected,9)
assert.equal(hanjaStrokeData({glyph:'蕁',strokes:16}),null)
console.log(JSON.stringify({passed:true,runtimeApplied:false,domesticCompleteReviewed:16,progressiveSamples:9,blockedStroke:15,sourceRecords:9,rawGroups:18,drawingPrimitives:19,privateMediaSaved:false}))
