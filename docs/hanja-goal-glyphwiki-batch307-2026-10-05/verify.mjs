import assert from 'node:assert/strict'
import {readFileSync,existsSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),findings=read('./findings.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"159ac4e8be06e34ab33e09156ea525d5c60ef9054a0c16c5818081a152d7a3a5")
assert.equal(source.root,'u78ce-k');assert.equal(Object.keys(source.records).length,4)
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[])
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'declared dependency missing')
assert.equal(proof.groups.length,18);assert.equal(trace.flat().length,18);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,12)
assert.deepEqual(sourceGroups,[[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10,11],[12,13],[14],[15],[16],[17]])
assert.equal(compileProgressive(trace,proof).length,15)
assert.equal(findings.runtimeApproved,false);assert.equal(findings.progressiveReviewPassed,false);assert.equal(findings.failure.stroke,11);assert.equal(findings.failure.progress,.5)
assert.equal(hanjaStrokeData({glyph:'磎',strokes:15}),null)
assert.equal(existsSync(new URL('../../public/hanja-strokes/glyphwiki/78ce.json',import.meta.url)),false)
console.log(JSON.stringify({passed:true,exactWholeRecords:4,rawGroups:18,drawingPrimitives:18,quadraticPrimitives:12,domesticStaticReviewed:15,progressiveFramesExamined:18,progressiveReviewPassed:false,runtimeRegistered:0,privateMediaSaved:false}))
