// Source-only immutable whole normalization. The original native HOLD is preserved.
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {fileURLToPath} from 'node:url'
const SOURCE_DIRECTORY=new URL('./',import.meta.url)
const hash=value=>createHash('sha256').update(value).digest('hex')
export const selectedWholeIdentity=Object.freeze({"sourceRoot":"u7bd2-k","sourceProofFile":"engine-proof.json","sourceProofFileSHA256":"939018010983ef24d6e3bd20b9bad0d324dd82ec542f116bd2ca2c7a12862ccc","sourceTraceFile":"draw-trace.json","sourceTraceFileSHA256":"89e4be522f8e553dc1923a3142df700f6afa1e73ca3ceacdade29cfab01619c2","sourceMetadataFile":"sources.json","sourceMetadataFileSHA256":"b1337144ca03165f963983c8c8602d11582918fa96ff0c01fdb1b555fb957234","dictionaryMetadataFile":"metadata.json","dictionaryMetadataFileSHA256":"af88415cb5c6adceb5f71923037c06ec55dca8a995c6effc3f6c9c1d5021de99","nativeHoldFile":"findings.json","nativeHoldFileSHA256":"17d6eaac8b3b0e3cbd45be1c72136a49c8f31a9137525ba55e1ffc428d9b800a","priorValidationFile":"validation.json","priorValidationFileSHA256":"7ddd9dc20c55e59eb1fece3af017b8f2c7a19bd7124b83269f7c5dbbddee6df9","originalCompilerFile":"progressive.mjs","originalCompilerFileSHA256":"c84bc9e375f395385958431d43207a52250dd187bdbe6ec7e06129c34dcc45d6","engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashesSHA256":"7104660dcf74e03b94564089b578c315cfb8d3323b8911019847950c971d2da4"})
export const sourceRoot=selectedWholeIdentity.sourceRoot
export const activePens=0
export const nativeApproval=false
export const runtimeApplied=false
const fullProofSHA256="721ba6845be7f6a6a98f8d9f45772759907615397f38d743ae0538b4370f0912"
const ORIGINAL_SOURCE_GROUPS=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[10,11],[12],[13],[9,14],[15],[16]].map(group=>Object.freeze(group)))
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
  return {sourceRoot:root,sourceProofFile:identity.sourceProofFile,sourceTraceFile:identity.sourceTraceFile,wholeSourceGuardPassed:true,rawGroups:fullProof.groups.length,drawingPrimitives:trace.flat().length,originalPolygons:fullProof.groups.flatMap(group=>group.polygons).length,historicalDiagnosticSourceGroups:ORIGINAL_SOURCE_GROUPS,blocked:true,reason:"original-pen13-detached-contour-and-nonconsecutive-raw9-14",activePens:0,compiledPens:0,strokes:null,masks:null,sourceGroups:null,nativeApproval:false,runtimeApplied:false}
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
  const root=process.argv[2],proof=readOriginalFullProof(root,selectedWholeIdentity)
  console.log(JSON.stringify(validateHeldSourceWhole(root,proof.trace,proof,selectedWholeIdentity)))
}
