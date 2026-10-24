import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{compileProgressive,selectedProofIdentity,sourceGroups,sourceProposal}from'./candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x)),f=read('./fixtures.json')['u8438-k'],full=read(selectedProofIdentity.sourceProofFile),strokes=f.strokes,start=performance.now()
assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(f.fullProof,full);assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.deepEqual([strokes.length,strokes.flat().length,full.groups.length,full.trace.flat().length,full.trace.flat().reduce((n,c)=>n+c.polygons.length,0)],[13,15,14,15,27])
assert.equal(sha(JSON.stringify(strokes)),'a1d3e3eb347dc685f20f524b19e4d49edb7956f6d30c5477f0834c6dd9b87591')
assert.deepEqual(sourceGroups,[[0],[1],[3],[2],[4],[5],[6],[13],[9,8],[10],[7],[11],[12]])
assert.deepEqual(sourceGroups.flat().toSorted((a,b)=>a-b),Array.from({length:14},(_,i)=>i))
for(const[p,h]of[[selectedProofIdentity.sourceProofFile,selectedProofIdentity.sourceProofFileSha256],[selectedProofIdentity.sourceCapsuleFile,selectedProofIdentity.sourceCapsuleFileSha256],[selectedProofIdentity.sourceChecksFile,selectedProofIdentity.sourceChecksFileSha256]])assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h)
const polygons=s=>s.match(/M[^M]+/g).map(p=>{const a=p.match(/-?\d+(?:\.\d+)?/g).map(Number);return Array.from({length:a.length/2},(_,i)=>[a[2*i],a[2*i+1]])}),cycle=(a,b)=>[b,b.toReversed()].some(v=>v.some((_,i)=>JSON.stringify(a)===JSON.stringify([...v.slice(i),...v.slice(0,i)])))
const calls=sourceGroups.flatMap(gs=>gs.flatMap(i=>full.trace[i]));let curves=0,lines=0,polygonsChecked=0
for(let i=0;i<calls.length;i++){const c=calls[i],s=strokes.flat()[i],P=polygons(s.outline),a=c.args;assert.equal(P.length,c.polygons.length);for(let j=0;j<P.length;j++){assert(cycle(P[j],c.polygons[j].map(v=>[v.x/2,v.y/2])));polygonsChecked++}
 if(c.kind==='cdDrawCurve'){assert.equal(s.revealPath,`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`);assert.equal(s.revealWidth,14);assert.equal(s.weight,Math.round(Math.hypot(a[4]-a[0],a[5]-a[1])/2*1e6)/1e6);curves++}else{assert.equal(c.kind,'cdDrawLine');assert(!('revealPath'in s));assert.equal(s.weight,Math.round(Math.hypot(a[2]-a[0],a[3]-a[1])/2*1e6)/1e6);lines++}}
assert.deepEqual(full.trace[9][0].args.slice(2,4),full.trace[8][0].args.slice(0,2))
assert.equal(sourceProposal.catalogStrokes,12);assert.equal(sourceProposal.proposedPlaybackStrokes,13);for(const k of['sourceStaticMappingApproved','initialContactApproved','productionImportAllowed','runtimeApplied','individualVariantApproved'])assert.equal(sourceProposal[k],false)
let negative=0;for(const change of[x=>x.identity.sourceRoot+='x',x=>x.identity.sourceProofFileSha256='0'.repeat(64),x=>x.full.groups[0].raw[0]++,x=>x.trace[9][0].args[0]+=.01,x=>x.trace[8][0].polygons[0][0].x+=.01]){const x={identity:clone(selectedProofIdentity),full:clone(full),trace:clone(full.trace)};change(x);assert.throws(()=>compileProgressive(x.trace,x.full,x.identity));negative++}
let getterReads=0;const bad=clone(selectedProofIdentity);Object.defineProperty(bad,'sourceRoot',{enumerable:true,get(){getterReads++;return selectedProofIdentity.sourceRoot}});assert.throws(()=>compileProgressive(full.trace,full,bad));assert.equal(getterReads,0);negative++
console.log(JSON.stringify({newSourceGateFIRSTPASS:true,pens:13,masks:15,raw:14,calls:15,polygonsChecked,curves,lines,negative,getterReads,positiveProjectionReused:true,projectionReplay:0,engine:0,staticMappingApproved:false,runtimeApplied:false,durationMs:performance.now()-start}))
