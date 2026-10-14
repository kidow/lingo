// Source-only immutable whole normalization. The original native HOLD is preserved.
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {fileURLToPath} from 'node:url'
const SOURCE_DIRECTORY=new URL('./',import.meta.url)
const hash=value=>createHash('sha256').update(value).digest('hex')
export const selectedWholeIdentity=Object.freeze({"sourceRoot":"u74b2-k","sourceProofFile":"engine-proof.json","sourceProofFileSHA256":"9b844ca62398ef15f60ea4cd35690a0f3e93707686600a253d63753a40fa7695","sourceTraceFile":"draw-trace.json","sourceTraceFileSHA256":"4b12ee5622121684abb5ba7c570e46f770efeb44d0e12b00dd92d278fa989814","sourceMetadataFile":"sources.json","sourceMetadataFileSHA256":"4c08d442e25a70c92e4a206c5d3b19adfd73d4531fe5195bb0b167dccd4b4975","dictionaryMetadataFile":"metadata.json","dictionaryMetadataFileSHA256":"a860fda91bec12b150ae989af026ccca1b7ee45595cf1f17c712feeb957ed627","nativeHoldFile":"findings.json","nativeHoldFileSHA256":"8d8074ceed85f9cce6a54560b91ca3fc41caa5ff57531a49bee3f43793805faf","priorValidationFile":"validation.json","priorValidationFileSHA256":"6249566bac1302d5d3a2a72e79dbf2afa27ceb888ea936ad769371407dfde174","originalCompilerFile":"progressive.mjs","originalCompilerFileSHA256":"559bad41b46106e385071099b41076024aee4c7de6857a1d8554dcff089b0157","engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashesSHA256":"7104660dcf74e03b94564089b578c315cfb8d3323b8911019847950c971d2da4"})
export const sourceRoot=selectedWholeIdentity.sourceRoot
export const activePens=0
export const nativeApproval=false
export const runtimeApplied=false
const fullProofSHA256="2e47be37faa39104cd41fc2590825433bb45968ca2a154694edf0e84de4fc048"
const ORIGINAL_SOURCE_GROUPS=Object.freeze([[0],[2],[1],[3],[12],[10,11],[13],[14],[15],[16],[17],[18],[19],[4],[5],[6,7],[8,9]].map(group=>Object.freeze(group)))
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
  assert.equal(hold.status,"deferred-original-terminal-hook-and-centerline-gaps",'Existing native verdict is immutable')
  return {sourceRoot:root,sourceProofFile:identity.sourceProofFile,sourceTraceFile:identity.sourceTraceFile,wholeSourceGuardPassed:true,rawGroups:fullProof.groups.length,drawingPrimitives:trace.flat().length,originalPolygons:fullProof.groups.flatMap(group=>group.polygons).length,historicalDiagnosticSourceGroups:ORIGINAL_SOURCE_GROUPS,blocked:true,reason:"original-pen9-terminal-tip-and-pen6-17-trajectory-gaps",activePens:0,compiledPens:0,strokes:null,masks:null,sourceGroups:null,nativeApproval:false,runtimeApplied:false}
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
  const root=process.argv[2],proof=readOriginalFullProof(root,selectedWholeIdentity)
  console.log(JSON.stringify(validateHeldSourceWhole(root,proof.trace,proof,selectedWholeIdentity)))
}
