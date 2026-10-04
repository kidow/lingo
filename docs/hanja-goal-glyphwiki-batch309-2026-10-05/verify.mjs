import assert from 'node:assert/strict'
import {readFileSync,existsSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),findings=read('./findings.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"b1337144ca03165f963983c8c8602d11582918fa96ff0c01fdb1b555fb957234")
assert.equal(source.root,'u7bd2-k');assert.equal(Object.keys(source.records).length,4)
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[])
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'declared dependency missing')
assert.equal(proof.groups.length,17);assert.equal(trace.flat().length,17);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,9)
assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5],[6],[7],[8],[10,11],[12],[13],[9,14],[15],[16]])
assert.equal(compileProgressive(trace,proof).length,15)
assert.equal(findings.runtimeApproved,false);assert.equal(findings.progressiveReviewPassed,false);assert.equal(findings.failure.stroke,13);assert.equal(findings.failure.progress,.45)
assert.equal(hanjaStrokeData({glyph:'篒',strokes:15}),null)
assert.equal(existsSync(new URL('../../public/hanja-strokes/glyphwiki/7bd2.json',import.meta.url)),false)
console.log(JSON.stringify({passed:true,exactWholeRecords:4,rawGroups:17,drawingPrimitives:17,quadraticPrimitives:9,domesticStaticReviewed:15,progressiveFramesExamined:9,progressiveReviewPassed:false,runtimeRegistered:0,privateMediaSaved:false}))
