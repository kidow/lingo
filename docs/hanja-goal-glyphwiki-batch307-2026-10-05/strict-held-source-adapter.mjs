// Source-only immutable whole normalization. The original native HOLD is preserved.
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {fileURLToPath} from 'node:url'
const SOURCE_DIRECTORY=new URL('./',import.meta.url)
const hash=value=>createHash('sha256').update(value).digest('hex')
export const selectedWholeIdentity=Object.freeze({"sourceRoot":"u78ce-k","sourceProofFile":"engine-proof.json","sourceProofFileSHA256":"24d96544da6a0b6fda7ce7c191d0a46a9b29ba46c0f29a58a2c4f479852ba903","sourceTraceFile":"draw-trace.json","sourceTraceFileSHA256":"aa670ce13992d0b3186b9ccf73e636ce87abd361c40acba2ff074ab29795173c","sourceMetadataFile":"sources.json","sourceMetadataFileSHA256":"159ac4e8be06e34ab33e09156ea525d5c60ef9054a0c16c5818081a152d7a3a5","dictionaryMetadataFile":"metadata.json","dictionaryMetadataFileSHA256":"8a746426837728934e87e68f4535ac03015b852a537bf2ac9596091993bfd2b0","nativeHoldFile":"findings.json","nativeHoldFileSHA256":"e1291b54668c8e3f4b1e99eadcf38cbd53594f27ed820e9c6cf072999a4e0c95","priorValidationFile":"validation.json","priorValidationFileSHA256":"b7a4bb0510271e8f4e3a2277779e40e9ae7dbf8f87bb08a568ccdf79e2197c9c","originalCompilerFile":"progressive.mjs","originalCompilerFileSHA256":"b3efba38fab99c52e17e1f617e93f9f8167e4b71dab927636478585fa5cbf597","engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashesSHA256":"7104660dcf74e03b94564089b578c315cfb8d3323b8911019847950c971d2da4"})
export const sourceRoot=selectedWholeIdentity.sourceRoot
export const activePens=0
export const nativeApproval=false
export const runtimeApplied=false
const fullProofSHA256="3375263a73adfe3d0db6f1408cc114416429861b2a8839fdc4425cf37bf4c5d8"
const ORIGINAL_SOURCE_GROUPS=Object.freeze([[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10,11],[12,13],[14],[15],[16],[17]].map(group=>Object.freeze(group)))
const originalKeys=['defaults','engineHashes','engineRevision','groups']
const fullKeys=['defaults','engineHashes','engineRevision','groups','trace']
const FILE_PAIRS=[['sourceProofFile','sourceProofFileSHA256'],['sourceTraceFile','sourceTraceFileSHA256'],['sourceMetadataFile','sourceMetadataFileSHA256'],['dictionaryMetadataFile','dictionaryMetadataFileSHA256'],['nativeHoldFile','nativeHoldFileSHA256'],['priorValidationFile','priorValidationFileSHA256'],['originalCompilerFile','originalCompilerFileSHA256']]
export function readOriginalFullProof(root,identity){
  assert.equal(root,sourceRoot,'Only the documented original selected whole is bound; aliases are not inferred')
  assert.deepEqual(identity,selectedWholeIdentity,'Complete proof/trace/metadata/hold/compiler/header identity')
  for(const [fileKey,hashKey]of FILE_PAIRS)assert.equal(hash(readFileSync(new URL(identity[fileKey],SOURCE_DIRECTORY))),identity[hashKey],'Original immutable input '+fileKey)
  const proof=JSON.parse(readFileSync(new URL(identity.sourceProofFile,SOURCE_DIRECTORY)))
  const trace=JSON.parse(readFileSync(new URL(identity.sourceTraceFile,SOURCE_DIRECTORY)))
  assert.deepEqual(Object.keys(proof).sort(),originalKeys)
  assert(Array.isArray(trace),'Exact original whole trace is mandatory')
  assert.equal(trace.length,proof.groups.length)
  proof.groups.forEach((group,index)=>assert.deepEqual(group.polygons,trace[index].flatMap(call=>call.polygons),'Original proof group/trace polygons must correspond exactly'))
  const source=JSON.parse(readFileSync(new URL(identity.sourceMetadataFile,SOURCE_DIRECTORY)))
  assert.equal(source.root,root)
  assert.equal(source.records[root].name,root)
  assert(typeof source.records[root].data==='string'&&source.records[root].data.length>0,'Exact original whole provenance is mandatory')
  const normalized={...proof,trace}
  assert.equal(hash(JSON.stringify(normalized)),fullProofSHA256,'Only original header/groups plus separately saved exact original trace')
  return normalized
}
export function validateHeldSourceWhole(root,trace,fullProof,identity){
  const original=readOriginalFullProof(root,identity)
  assert.deepEqual(Object.keys(fullProof).sort(),fullKeys)
  assert.equal(hash(JSON.stringify(fullProof)),fullProofSHA256)
  assert.deepEqual(trace,fullProof.trace,'The entire exact original trace is mandatory')
  assert.deepEqual(fullProof,original)
  assert.equal(fullProof.engineRevision,identity.engineRevision)
  assert.equal(hash(JSON.stringify(fullProof.engineHashes)),identity.engineHashesSHA256)
  assert.equal(Object.keys(fullProof.engineHashes).length,8)
  const hold=JSON.parse(readFileSync(new URL(identity.nativeHoldFile,SOURCE_DIRECTORY)))
  assert.equal(hold.status,"deferred-original-trajectory-discontinuity",'Existing native verdict is immutable')
  return {sourceRoot:root,sourceProofFile:identity.sourceProofFile,sourceTraceFile:identity.sourceTraceFile,wholeSourceGuardPassed:true,rawGroups:fullProof.groups.length,drawingPrimitives:trace.flat().length,originalPolygons:fullProof.groups.flatMap(group=>group.polygons).length,historicalDiagnosticSourceGroups:ORIGINAL_SOURCE_GROUPS,blocked:true,reason:"original-pen11-halfway-detached-contour",activePens:0,compiledPens:0,strokes:null,masks:null,sourceGroups:null,nativeApproval:false,runtimeApplied:false}
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
  const root=process.argv[2],proof=readOriginalFullProof(root,selectedWholeIdentity)
  console.log(JSON.stringify(validateHeldSourceWhole(root,proof.trace,proof,selectedWholeIdentity)))
}
