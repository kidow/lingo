import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups,sourceProposal,nativeApproved,runtimeApplied} from './candidate.mjs'
const bytes=p=>readFileSync(new URL(p,import.meta.url)),sha=x=>createHash('sha256').update(x).digest('hex'),f=JSON.parse(bytes('./fixtures.json'))['u596b-k']
test('奫 static fifteen groups retain all18raw19calls32P without new guide joins',()=>{
 assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(f.sourceGroups,sourceGroups)
 assert.deepEqual(sourceGroups.flat().toSorted((a,b)=>a-b),Array.from({length:18},(_,i)=>i));assert.equal(new Set(sourceGroups.flat()).size,18)
 assert.equal(f.strokes.length,15);assert.equal(f.strokes.flat().length,19);assert.deepEqual(f.strokes.map(s=>s.length),[1,1,1,1,1,2,2,1,1,1,2,2,1,1,1])
 assert.equal(f.fullProof.trace.flat().length,19);assert.equal(f.fullProof.groups.reduce((n,g)=>n+g.polygons.length,0),32)
 assert.deepEqual(JSON.parse(bytes(selectedProofIdentity.sourceProofFile)),f.fullProof)
 for(const[p,h]of[[selectedProofIdentity.sourceProofFile,selectedProofIdentity.sourceProofFileSha256],[selectedProofIdentity.sourceCapsuleFile,selectedProofIdentity.sourceCapsuleFileSha256],[selectedProofIdentity.sourceChecksFile,selectedProofIdentity.sourceChecksFileSha256]])assert.equal(sha(bytes(p)),h)
 const original=f.fullProof.groups.flatMap(g=>g.polygons.flat()).map(v=>[v.x/2,v.y/2].join(',')).sort()
 const drawn=f.strokes.flat().flatMap(s=>{const a=(s.outline.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number),p=[];for(let i=0;i<a.length;i+=2)p.push([a[i],a[i+1]].join(','));return p}).sort();assert.deepEqual(drawn,original)
 assert.deepEqual(f.fullProof.trace[5][0].args.slice(4,6),[37.125,184.6]);assert.deepEqual(f.fullProof.trace[6][0].args.slice(0,2),[33,162.5]);assert.notDeepEqual(f.fullProof.trace[5][0].args.slice(4,6),f.fullProof.trace[6][0].args.slice(0,2))
 assert.deepEqual(f.fullProof.trace[10][0].args.slice(2,4),f.fullProof.trace[11][0].args.slice(0,2))
 assert.deepEqual(sourceGroups[9],[17]);assert.deepEqual(sourceGroups[11],[10,11]);assert.deepEqual(sourceGroups.slice(12),[[14],[15],[16]])
 assert.equal(sourceProposal.catalogStrokes,14);assert.equal(sourceProposal.proposedPlaybackStrokes,15);assert.equal(sourceProposal.sourceStaticMappingApproved,true)
 assert.equal(sourceProposal.initialContactApproved,false);assert.equal(sourceProposal.productionImportAllowed,false);assert.equal(sourceProposal.individualVariantApproved,false);assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false)
})
test('奫 source binder rejects wrong identity/proof/trace/arity before projection',()=>{
 assert.throws(()=>compileProgressive(f.fullProof.trace,f.fullProof));assert.throws(()=>compileProgressive(f.fullProof.trace,f.fullProof,{...selectedProofIdentity,sourceRoot:'u596b'}));assert.throws(()=>compileProgressive(f.fullProof.trace,f.fullProof,selectedProofIdentity,true))
 const proof=structuredClone(f.fullProof);proof.groups[5].polygons[0][0].x++;assert.throws(()=>compileProgressive(proof.trace,proof,selectedProofIdentity))
 const trace=structuredClone(f.fullProof.trace);trace[10][0].args[3]++;assert.throws(()=>compileProgressive(trace,f.fullProof,selectedProofIdentity))
 const partial={groups:f.fullProof.groups,trace:f.fullProof.trace,defaults:f.fullProof.defaults};assert.throws(()=>compileProgressive(partial.trace,partial,selectedProofIdentity))
 const identity=Object.fromEntries(Object.entries(selectedProofIdentity).reverse());assert.equal(Object.keys(identity).length,7)
 let getterRead=false;Object.defineProperty(identity,'sourceRoot',{enumerable:true,get(){getterRead=true;return 'u596b-k'}});assert.throws(()=>compileProgressive(f.fullProof.trace,f.fullProof,identity));assert.equal(getterRead,false)
})
