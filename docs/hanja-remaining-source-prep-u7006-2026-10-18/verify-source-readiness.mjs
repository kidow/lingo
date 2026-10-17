import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const read=f=>readFileSync(new URL(f,import.meta.url)),sha=b=>createHash('sha256').update(b).digest('hex')
const report=JSON.parse(read('./source-readiness.json'))
for(const [file,hash]of Object.entries(report.immutableInputBytePins))assert.equal(sha(read(file)),hash,file)
const catalog=JSON.parse(read(report.catalog.file)).characters.filter(x=>x.glyph===report.glyph)
assert.equal(catalog.length,1);assert.equal(catalog[0].id,report.catalog.id);assert.equal(catalog[0].strokes,report.catalog.strokes);assert.equal(catalog[0].readingGrade,report.catalog.grade)
const engine=JSON.parse(read('../hanja-remaining-seven-sources-2026-10-17/source-checks.json'))
const end=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
let checked=0
for(const row of report.completeWholeProfiles){
 const proof=JSON.parse(read(row.proofFile));assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.deepEqual(proof.engineHashes,engine.engineHashes);assert.equal(proof.engineRevision,engine.engineRevision)
 assert.equal(sha(read(row.proofFile)),row.proofFileSha256);assert.equal(proof.trace.length,row.rawRows);assert.equal(proof.groups.length,row.rawRows)
 const joins=[],empty=[],internal=[]
 for(let i=0;i<proof.trace.length;i++){
  const calls=proof.trace[i];if(!calls.length)empty.push(i)
  assert.deepEqual(calls.flatMap(c=>c.polygons),proof.groups[i].polygons)
  for(let j=1;j<calls.length;j++)if(JSON.stringify(end(calls[j-1]))!==JSON.stringify(calls[j].args.slice(0,2)))internal.push([i,j-1,j])
  if(i+1<proof.trace.length&&calls.length&&proof.trace[i+1].length&&JSON.stringify(end(calls.at(-1)))===JSON.stringify(proof.trace[i+1][0].args.slice(0,2)))joins.push([i,i+1])
 }
 assert.deepEqual(joins,row.exactAdjacentJoinsZeroBased);assert.deepEqual(empty,row.emptyRows);assert.deepEqual(internal,row.internalDisconnectedCalls)
 assert.equal(proof.trace.length-empty.length-joins.length,row.permissiveConsecutiveMinimum)
 assert.equal(proof.groups.flatMap(g=>g.polygons).length,row.polygons)
 if(report.catalog.id==='u7006')assert(row.permissiveConsecutiveMinimum>report.catalog.strokes)
 if(report.catalog.id==='u6715'){
  const middle=proof.trace.slice(3,5),horizontal=middle.every(r=>r.length===1&&r[0].kind==='cdDrawLine'&&r[0].args[1]===r[0].args[3])
  assert.equal(horizontal,row.leftInteriorTwoHorizontalSourcePrimitives)
  if(row.permissiveConsecutiveMinimum===report.catalog.strokes)assert(horizontal,'Only currently captured numeric10 profiles have horizontal source interiors; this is not domestic whole-form approval')
 }
 checked++
}
assert.equal(report.compilerPrepared,false);assert.equal(report.nativeApproved,false);assert.equal(report.runtimeApplied,false);assert.equal(report.canonicalHoldsCreated,0)
console.log(JSON.stringify({ok:true,glyph:report.glyph,catalogStrokes:report.catalog.strokes,completeWholeProfiles:checked,immutableInputPins:Object.keys(report.immutableInputBytePins).length,minimums:report.completeWholeProfiles.map(x=>({root:x.sourceRoot,minimum:x.permissiveConsecutiveMinimum})),compilerPrepared:false,nativeReviewCount:0,runtimeApplied:false,canonicalHoldsCreated:0,sourceEngineRerun:false,buildRun:false,serversStarted:0}))
