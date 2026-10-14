import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
const root=new URL('../../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root)),obj=p=>JSON.parse(read(p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),copy=x=>JSON.parse(JSON.stringify(x)),digest=x=>sha(JSON.stringify(x))
let totalProfiles=0
for(let batch=1035;batch<=1044;batch++){
 const folder='docs/hanja-goal-glyphwiki-batch'+batch+'-2026-10-13/',a=obj(folder+'candidate-compile-analysis.json'),source=obj(folder+'sources.json'),meta=obj(folder+'metadata.json'),mod=await import(new URL(folder+'progressive.mjs',root))
 assert.equal(sha(read(folder+'progressive.mjs')),a.compilerFileSHA256)
 assert.equal(sha(read(folder+'sources.json')),a.originalSourceFileSHA256);assert.equal(sha(read(folder+'engine-proof.json')),a.originalDefaultProofFileSHA256);assert.equal(sha(read(folder+'metadata.json')),a.originalMetadataFileSHA256)
 assert.equal(mod.nativeApproval,false);assert.equal(mod.nativeOrderReviewed,0);assert.equal(mod.nativeDirectionsReviewed,0);assert.equal(mod.nativeFramesReviewed,0);assert.equal(mod.nativeReplaysReviewed,0);assert.equal(mod.runtimeApplied,false)
 assert.deepEqual(mod.supportedWholeRoots,a.profiles.map(p=>p.root))
 for(const row of a.profiles){
  const id=mod.wholeSourceIdentities[row.root],bytes=read(folder+id.file),original=JSON.parse(bytes),proof={...copy(original),sourceRoot:id.root,sourceProofFile:id.file,sourceProofFileSHA256:id.fileSHA256},before=digest(proof)
  assert.equal(sha(bytes),id.fileSHA256);assert.equal(id.fileSHA256,row.sourceIdentity.fileSHA256);assert(source.renderableWholeNames.includes(row.root))
  const out=mod.compileSourceWhole(row.root,proof.trace,proof,id)
  assert.equal(out.length,meta.candidate.strokes);assert.equal(digest(proof),before)
  assert.equal(out.flat().reduce((n,p)=>n+(p.outline.match(/M/g)||[]).length,0),original.groups.reduce((n,g)=>n+g.polygons.length,0))
  const changes={trajectory:p=>p.trace.flat()[0].args[0]+=1,polygon:p=>p.groups.find(g=>g.polygons.length).polygons[0][0].x+=1,preset:p=>p.defaults.kWidth+=1,engineRevision:p=>p.engineRevision='altered',engineHash:p=>p.engineHashes[Object.keys(p.engineHashes)[0]]='altered',wholeAttribution:p=>p.sourceRoot='wrong-whole'}
  for(const alter of Object.values(changes)){const wrong=copy(proof);alter(wrong);assert.throws(()=>mod.compileSourceWhole(row.root,wrong.trace,wrong,id))}
  for(const [key,val]of [['sourceProofFile','wrong.json'],['sourceProofFileSHA256','altered']]){const wrong=copy(proof);wrong[key]=val;assert.throws(()=>mod.compileSourceWhole(row.root,wrong.trace,wrong,id))}
  assert.throws(()=>mod.compileSourceWhole(row.root,original.trace,original,id));assert.throws(()=>mod.compileSourceWhole(row.root,proof.trace,proof));assert.throws(()=>mod.compileSourceWhole(row.root,proof.trace,proof,{...id,fileSHA256:'altered'}))
  assert.throws(()=>mod.compileSourceWhole('wrong-whole',proof.trace,proof,id))
  const numeric=a.wholeRootCountAnalysis.find(r=>r.root===row.root)
  assert.equal(numeric.minimumCountExcludesIncidentalClosing,true);assert.equal(numeric.numericCandidatePens,meta.candidate.strokes)
  for(const [i,j]of numeric.originalAuthoredExactJoins){assert.equal(original.trace[i].at(-1).args.at(-1)%100,2);assert.equal(original.trace[j][0].args.at(-2)%100,22)}
  totalProfiles++
 }
 for(const e of a.originalAlternativeWholeRootsExcluded)assert.throws(()=>mod.compileSourceWhole(e.root,[],{},{}))
 console.log(JSON.stringify({batch,glyph:meta.glyph,savedCompilerPassed:true,profiles:a.profiles.length,selectedRoot:mod.sourceRoot,originalSourceSHAIntact:true,sixMutationKindsRejected:true,fileSHAAndHeaderIdentityRejected:true,nativeApproval:false,runtimeApplied:false}))
}
console.log(JSON.stringify({batches:10,totalProfiles,compilerValidationPassed:true}))
