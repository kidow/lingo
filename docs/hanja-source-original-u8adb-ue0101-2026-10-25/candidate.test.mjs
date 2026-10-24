import assert from'node:assert/strict';import test from'node:test';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{compileProgressive,sourceGroups,sourceProposal,selectedProofIdentity,nativeApproved,runtimeApplied}from'./candidate.mjs';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex');
test('諛 VS1 draft16 binds original18 rows19calls32P without source edits',()=>{
 const f=read('fixtures.json').u8adb_ue0101,p=read(selectedProofIdentity.sourceProofFile);
 assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(f.fullProof,p);assert.deepEqual(f.sourceProposal,sourceProposal);
 assert.deepEqual(Object.keys(p),['engineRevision','engineHashes','groups','trace','defaults']);
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,p.groups.length,p.trace.flat().length,p.trace.flat().reduce((n,c)=>n+c.polygons.length,0)],[16,19,18,19,32]);
 assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16],[17]]);
 assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i));
 assert.equal(sha(JSON.stringify(f.strokes)),'772457380d2b5ff8e542065696c96652585401dff1ca7d3fe015b021ea565978');
 for(const[a,b]of[[5,6],[12,13]])assert.deepEqual(p.trace[a][0].args.slice(2,4),p.trace[b][0].args.slice(0,2));
 assert.equal(f.strokes[0][0].direction,'right');assert.equal(f.strokes[0][0].bounds[1]<f.strokes[0][0].bounds[3],true);
 assert.equal(sourceProposal.catalogStrokes,15);assert.equal(sourceProposal.proposedPlaybackStrokes,16);
 assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false);for(const k of['sourceStaticMappingApproved','initialContactApproved','allFramesApproved','productionImportAllowed','individualVariantApproved','countConflictResolved'])assert.equal(sourceProposal[k],false);
 for(const[k,h]of[['sourceProofFile','sourceProofFileSha256'],['sourceCapsuleFile','sourceCapsuleFileSha256'],['sourceChecksFile','sourceChecksFileSha256']])assert.equal(sha(readFileSync(new URL(selectedProofIdentity[k],import.meta.url))),selectedProofIdentity[h]);
 assert.throws(()=>compileProgressive(p.trace,p,{...f.identity,sourceRoot:'u8adb'}));const t=structuredClone(p.trace);t[0][0].args[0]++;assert.throws(()=>compileProgressive(t,p,f.identity));const q=structuredClone(p);q.groups[0].polygons[0][0].x++;assert.throws(()=>compileProgressive(p.trace,q,f.identity));let reads=0;const id={...f.identity};Object.defineProperty(id,'sourceRoot',{enumerable:true,get(){reads++;return'u8adb-ue0101'}});assert.throws(()=>compileProgressive(p.trace,p,id));assert.equal(reads,0);
 console.log(JSON.stringify({logical16:true,raw18:true,calls19:true,P32:true,negative4:true,positiveProjectionReplayed:0,native:false,runtime:false}));
});
