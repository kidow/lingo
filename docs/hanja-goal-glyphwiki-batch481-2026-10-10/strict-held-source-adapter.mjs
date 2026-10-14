// Source-only strict proof normalization. Existing native gap/form HOLD remains active.
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {fileURLToPath} from 'node:url'
const SOURCE_DIRECTORY=new URL('./',import.meta.url)
const hash=value=>createHash('sha256').update(value).digest('hex')
export const sourceProfiles=Object.freeze([{"identity":{"sourceRoot":"u6f0c","sourceProofFile":"engine-proof.json","sourceProofFileSHA256":"e944cc2432b0f858ab6fd2b4d29b9feed338e77bf46a6583f8305a5b8cc53d97","sourceMetadataFile":"sources.json","sourceMetadataFileSHA256":"75ef47abfcc2e4b6c76cd74945bb998c041116d65cc09a23245effd1402e46d6","sourceInventoryFile":"whole-variant-inventory.json","sourceInventoryFileSHA256":"f928e9f1748fb29cc7c78d3e05c43fdf793b3ec277ca026794f7ace56b9dc79c","originalCompilerFile":"progressive.mjs","originalCompilerFileSHA256":"f3b1210a0ac648352a2c4fdfb334fa0f52b42a8de138a933f5d9b16a2e4310c5","engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashesSHA256":"7104660dcf74e03b94564089b578c315cfb8d3323b8911019847950c971d2da4"},"fullProofSHA256":"9f6751ba89e1542869101dddd7d531a8e77566126248ae78384ba38f2505783a","missingIntermediateHorizontal":false},{"identity":{"sourceRoot":"u6f0c-ue0100","sourceProofFile":"engine-proof.json","sourceProofFileSHA256":"e944cc2432b0f858ab6fd2b4d29b9feed338e77bf46a6583f8305a5b8cc53d97","sourceMetadataFile":"sources.json","sourceMetadataFileSHA256":"75ef47abfcc2e4b6c76cd74945bb998c041116d65cc09a23245effd1402e46d6","sourceInventoryFile":"whole-variant-inventory.json","sourceInventoryFileSHA256":"f928e9f1748fb29cc7c78d3e05c43fdf793b3ec277ca026794f7ace56b9dc79c","originalCompilerFile":"progressive.mjs","originalCompilerFileSHA256":"f3b1210a0ac648352a2c4fdfb334fa0f52b42a8de138a933f5d9b16a2e4310c5","engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashesSHA256":"7104660dcf74e03b94564089b578c315cfb8d3323b8911019847950c971d2da4"},"fullProofSHA256":"9f6751ba89e1542869101dddd7d531a8e77566126248ae78384ba38f2505783a","missingIntermediateHorizontal":false},{"identity":{"sourceRoot":"u6f0c-ue0101","sourceProofFile":"engine-proof.json","sourceProofFileSHA256":"e944cc2432b0f858ab6fd2b4d29b9feed338e77bf46a6583f8305a5b8cc53d97","sourceMetadataFile":"sources.json","sourceMetadataFileSHA256":"75ef47abfcc2e4b6c76cd74945bb998c041116d65cc09a23245effd1402e46d6","sourceInventoryFile":"whole-variant-inventory.json","sourceInventoryFileSHA256":"f928e9f1748fb29cc7c78d3e05c43fdf793b3ec277ca026794f7ace56b9dc79c","originalCompilerFile":"progressive.mjs","originalCompilerFileSHA256":"f3b1210a0ac648352a2c4fdfb334fa0f52b42a8de138a933f5d9b16a2e4310c5","engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashesSHA256":"7104660dcf74e03b94564089b578c315cfb8d3323b8911019847950c971d2da4"},"fullProofSHA256":"9f6751ba89e1542869101dddd7d531a8e77566126248ae78384ba38f2505783a","missingIntermediateHorizontal":false},{"identity":{"sourceRoot":"u6f0c-ue0102","sourceProofFile":"engine-proof-alternative.json","sourceProofFileSHA256":"1ed3b082a63f336bb9a56f545c203abec0e5adbf2767e6a3bb68111a17f82261","sourceMetadataFile":"sources.json","sourceMetadataFileSHA256":"75ef47abfcc2e4b6c76cd74945bb998c041116d65cc09a23245effd1402e46d6","sourceInventoryFile":"whole-variant-inventory.json","sourceInventoryFileSHA256":"f928e9f1748fb29cc7c78d3e05c43fdf793b3ec277ca026794f7ace56b9dc79c","originalCompilerFile":"progressive.mjs","originalCompilerFileSHA256":"f3b1210a0ac648352a2c4fdfb334fa0f52b42a8de138a933f5d9b16a2e4310c5","engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashesSHA256":"7104660dcf74e03b94564089b578c315cfb8d3323b8911019847950c971d2da4"},"fullProofSHA256":"7f90ac8e73aaf80bb5b0d90487a24f91e3ae304cce0af647279c1f7004382a31","missingIntermediateHorizontal":true}].map(value=>Object.freeze({...value,identity:Object.freeze(value.identity)})))
export const activePens=0
export const nativeApproval=false
export const runtimeApplied=false
const expectedKeys=['defaults','engineHashes','engineRevision','groups','trace']
export function validateHeldSourceWhole(root,trace,fullProof,explicitIdentity){
  const selected=sourceProfiles.find(value=>value.identity.sourceRoot===root)
  assert(selected,'Only explicitly documented whole roots are supported; no latest or sibling substitution')
  assert.deepEqual(explicitIdentity,selected.identity,'Explicit whole/proof/source/inventory/compiler/header identity')
  const id=selected.identity
  for(const [fileKey,hashKey]of [['sourceProofFile','sourceProofFileSHA256'],['sourceMetadataFile','sourceMetadataFileSHA256'],['sourceInventoryFile','sourceInventoryFileSHA256'],['originalCompilerFile','originalCompilerFileSHA256']])
    assert.equal(hash(readFileSync(new URL(id[fileKey],SOURCE_DIRECTORY))),id[hashKey],'Original file byte pin '+fileKey)
  assert.deepEqual(Object.keys(fullProof).sort(),expectedKeys,'Complete original whole/header proof keys')
  assert.equal(hash(JSON.stringify(fullProof)),selected.fullProofSHA256,'Exact frozen whole calls, polygons, defaults and eight engine hashes')
  assert.deepEqual(trace,fullProof.trace,'Entire original trace is mandatory')
  assert.equal(fullProof.engineRevision,id.engineRevision)
  assert.equal(hash(JSON.stringify(fullProof.engineHashes)),id.engineHashesSHA256)
  assert.equal(Object.keys(fullProof.engineHashes).length,8)
  const source=JSON.parse(readFileSync(new URL(id.sourceMetadataFile,SOURCE_DIRECTORY)))
  const inventory=JSON.parse(readFileSync(new URL(id.sourceInventoryFile,SOURCE_DIRECTORY)))
  assert(source.wholeNames.includes(root))
  assert(inventory.wholeVariants.some(value=>value.root===root))
  assert.equal(fullProof.trace.length,fullProof.groups.length)
  fullProof.groups.forEach((group,index)=>assert.deepEqual(trace[index].flatMap(call=>call.polygons),group.polygons,'Original raw group polygons and call order'))
  const first=trace[2][0],second=trace[3][0]
  assert.equal(trace[2].length,1);assert.equal(trace[3].length,1)
  assert.equal(first.kind,'cdDrawCurve');assert.equal(second.kind,'cdDrawCurve')
  const end=first.args.slice(4,6),start=second.args.slice(0,2),gap=Math.hypot(start[0]-end[0],start[1]-end[1])
  assert(gap>0,'Original water gap must remain blocked')
  return {sourceRoot:root,sourceProofFile:id.sourceProofFile,sourceProofFileSHA256:id.sourceProofFileSHA256,wholeSourceGuardPassed:true,rawGroups:fullProof.groups.length,drawingPrimitives:trace.reduce((sum,calls)=>sum+calls.length,0),originalPolygons:fullProof.groups.reduce((sum,group)=>sum+group.polygons.length,0),waterGap:{rawZeroBased:[2,3],end,start,distance:gap},missingIntermediateHorizontal:selected.missingIntermediateHorizontal,blocked:true,reason:selected.missingIntermediateHorizontal?'original-water-gap-and-alternate-whole-missing-domestic-horizontal':'original-third-water-trajectory-gap',activePens:0,compiledPens:0,strokes:null,masks:null,sourceGroups:null,nativeApproval:false,runtimeApplied:false}
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
  const root=process.argv[2],selected=sourceProfiles.find(value=>value.identity.sourceRoot===root)
  assert(selected,'An explicit fixed whole root argument is required')
  const proof=JSON.parse(readFileSync(new URL(selected.identity.sourceProofFile,SOURCE_DIRECTORY)))
  console.log(JSON.stringify(validateHeldSourceWhole(root,proof.trace,proof,selected.identity)))
}
