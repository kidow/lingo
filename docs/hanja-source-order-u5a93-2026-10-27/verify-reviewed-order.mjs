import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {fileURLToPath} from 'node:url'
import {resolve} from 'node:path'

const ROOT=fileURLToPath(new URL('../../',import.meta.url))
const SELF='docs/hanja-source-order-u5a93-2026-10-27/verify-reviewed-order.mjs'
const MANIFEST='docs/hanja-source-order-u5a93-2026-10-27/reviewed-order-manifest.json'
const FIXTURE='docs/hanja-source-original-u5a93-2026-10-26/fixtures.json'
const FIXTURE_SHA='a7ad43dd32a18ac22628c77d942fc53ab26d3642bcabce108248a74babf79733'
const PUBLISHER='docs/hanja-official-media-compare-u5a93-2026-10-27/native-controlled-direction-review.json'
const PUBLISHER_SHA='99e7f7ed69c21f9bb8726ae9a6f968a3b3872b91e96828bd2641fba4b7956f29'
const ORIGINAL_SHA='79aea820e2f76cc4fa9bbe75a4f65fb75bb62c261060b1aa4e2e3bf1e3d71752'
const PERMUTATION=[0,1,2,3,4,5,6,7,8,10,9,11]
const sha=value=>createHash('sha256').update(value).digest('hex')
const bytes=path=>readFileSync(resolve(ROOT,path))
const fixtureBytes=bytes(FIXTURE),publisherBytes=bytes(PUBLISHER)
assert.equal(sha(fixtureBytes),FIXTURE_SHA)
assert.equal(sha(publisherBytes),PUBLISHER_SHA)
const fixture=JSON.parse(fixtureBytes).u5a93,publisher=JSON.parse(publisherBytes)
const original=fixture.strokes,originalJSON=JSON.stringify(original)
assert.equal(original.length,12)
assert.equal(fixture.sourceGroups.length,12)
assert.equal(sha(originalJSON),ORIGINAL_SHA)
assert.equal(fixture.compiledSHA256,ORIGINAL_SHA)
assert.deepEqual([...PERMUTATION].sort((a,b)=>a-b),Array.from({length:12},(_,i)=>i))
assert.equal(new Set(PERMUTATION).size,12)
assert.deepEqual(fixture.identity,{root:'u5a93',file:'engine-whole-u5a93.json',fileSHA256:'689e2d502a5cf1bf337192a939dc0efad1f877c476e0d980bc404d9ddf5c25f8'})
assert.equal(fixture.fullProof.sourceRoot,fixture.identity.root)
assert.equal(fixture.fullProof.sourceProofFile,fixture.identity.file)
assert.equal(fixture.fullProof.sourceProofFileSHA256,fixture.identity.fileSHA256)
const sourceProofBefore=JSON.stringify(fixture.fullProof)
const ordered=PERMUTATION.map(i=>original[i])
const orderedGroups=PERMUTATION.map(i=>fixture.sourceGroups[i])
assert(ordered.every((stroke,i)=>stroke===original[PERMUTATION[i]]&&JSON.stringify(stroke)===JSON.stringify(original[PERMUTATION[i]])))
assert(Array.from({length:9},(_,i)=>i).every(i=>ordered[i]===original[i]))
assert.equal(ordered[11],original[11])
assert.deepEqual(orderedGroups.flat().sort((a,b)=>a-b),fixture.sourceGroups.flat().sort((a,b)=>a-b))
assert.equal(JSON.stringify(original),originalJSON)
assert.equal(JSON.stringify(fixture.fullProof),sourceProofBefore)
assert.equal(publisher.glyph,'媓')
assert.equal(publisher.sourceOrderFinding.correctionRequired,true)
assert.equal(publisher.observations.find(x=>x.stroke===10).observedMacro,'R')
assert.equal(publisher.observations.find(x=>x.stroke===11).observedMacro,'D')
assert.deepEqual(original[9].map(x=>x.direction),['down'])
assert.deepEqual(original[10].map(x=>x.direction),['right'])
assert.deepEqual(ordered[9].map(x=>x.direction),['right'])
assert.deepEqual(ordered[10].map(x=>x.direction),['down'])
const durationFields=original.flat().flatMap((part,pen)=>Object.keys(part).filter(k=>/duration/i.test(k)).map(key=>({pen,key,value:part[key]})))
const manifest={
 schema:'hanja-reviewed-logical-order-permutation/v1',date:'2026-10-27',glyph:'媓',root:'u5a93',status:'prepared-order-permutation-not-native-approved',
 inputs:{fixture:{path:FIXTURE,SHA256:FIXTURE_SHA},publisherDirectionReview:{path:PUBLISHER,SHA256:PUBLISHER_SHA},verifier:{path:SELF,SHA256:sha(bytes(SELF))}},
 originalSourceIdentity:fixture.identity,originalFullProofSnapshotSHA256:sha(sourceProofBefore),
 snapshotSerialization:'SHA256 of UTF-8 JavaScript JSON.stringify(actual entire stroke array); no Python float reserialization.',
 originalCompiledSHA256:ORIGINAL_SHA,reviewedOrderSnapshotSHA256:sha(JSON.stringify(ordered)),
 permutationZeroBased:PERMUTATION,originalSourceGroups:fixture.sourceGroups,reviewedOrderSourceGroups:orderedGroups,
 logicalPens:12,originalPartCounts:original.map(x=>x.length),reviewedPartCounts:ordered.map(x=>x.length),
 changedLogicalPositions:[{newPen:10,oldPen:11,originalRawIndices:orderedGroups[9],macro:'R',partDirections:ordered[9].map(x=>x.direction)},{newPen:11,oldPen:10,originalRawIndices:orderedGroups[10],macro:'D',partDirections:ordered[10].map(x=>x.direction)}],
 verification:{allOriginalLogicalIndicesExactlyOnce:true,noStrokeOmittedOrDuplicated:true,entireStrokeArraysOnlyPermuted:true,allExistingPartPropertiesPreserved:true,originalP_Q_WidthWeightsBoundsUnchanged:true,firstNineAndLastUnchanged:true,originalSourceGroupMultisetPreserved:true,baseFixtureNotMutated:true,originalFullProofNotMutated:true,publisher10R11DMatchedByReviewedMetadata:true,sourceCompilerRuns:0,engineRuns:0,nativeObservations:0,SSR:0},
 durationPreservation:{explicitPartDurationFields:durationFields.length,existingDurationValuesUnchanged:true,newDurationFieldsCreated:false,durationsRecomputed:false,limits:'All existing part properties and per-part weights are unchanged. The compiled fixture has no explicit duration fields when the count is zero; no timing-equivalence claim is made.'},
 approval:{orderDataCorrectionPrepared:true,sourceGeometryChanged:false,wholeCandidateApproved:false,nativeAnimation:false,runtime:false,examBody:false},nativeApproval:false,runtimeApplied:false,
 limits:['Only complete existing stroke arrays at logical positions10 and11 are exchanged; no geometry, guide, width, weight or part property is edited.','This is order-data preparation based on ROOT publisher macro evidence, not a native playback or whole-candidate approval.','The remaining pen6 initial visual spur and all independent unresolved native conditions remain open.','Original compiled snapshot and newly reviewed-order snapshot have different explicit hashes; the original fixture/full5 remain unchanged.']
}
if(process.argv.includes('--emit'))console.log(JSON.stringify(manifest,null,2))
else{assert.deepEqual(JSON.parse(bytes(MANIFEST)),manifest);console.log(JSON.stringify({verified:true,logicalPens:12,permutation:PERMUTATION,originalCompiledSHA256:ORIGINAL_SHA,reviewedOrderSnapshotSHA256:manifest.reviewedOrderSnapshotSHA256,engine:0,native:0,runtimeApplied:false}))}
