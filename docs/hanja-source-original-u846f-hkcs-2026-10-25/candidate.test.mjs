import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,sourceGroups,sourceProposal,selectedProofIdentity,nativeApproved,runtimeApplied} from './candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex')
test('葯 HKCS13 keeps actual full5/16raw17calls37P and all original guides',()=>{
 const f=read('fixtures.json').hkcs_m846f,p=read(selectedProofIdentity.sourceProofFile)
 assert.deepEqual(f.identity,selectedProofIdentity);assert.deepEqual(f.fullProof,p);assert.deepEqual(f.sourceProposal,sourceProposal)
 assert.deepEqual(Object.keys(p),['engineRevision','engineHashes','groups','trace','defaults'])
 assert.deepEqual([f.strokes.length,f.strokes.flat().length,p.groups.length,p.trace.flat().length,p.trace.flat().reduce((n,c)=>n+c.polygons.length,0)],[13,17,16,17,37])
 assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4,5],[6,7],[8],[9],[10],[11],[12],[13,14],[15]])
 assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:16},(_,i)=>i))
 assert.equal(sha(JSON.stringify(f.strokes)),'d3f1ed65d1a64d2ecc49b7839f696c8912cc3c6d75f5ffdb411abb1a4281f66d')
 const expected=p.groups.flatMap(g=>g.polygons.map(poly=>JSON.stringify(poly.map(v=>[v.x,v.y]).sort((a,b)=>a[0]-b[0]||a[1]-b[1])))).sort()
 const actual=f.strokes.flatMap(pen=>pen.flatMap(s=>s.outline.split('M').slice(1).map(d=>{const n=d.match(/-?\d+(?:\.\d+)?/g).map(Number),points=[];for(let i=0;i<n.length;i+=2)points.push([n[i]*2,n[i+1]*2]);return JSON.stringify(points.sort((a,b)=>a[0]-b[0]||a[1]-b[1]))}))).sort()
 assert.deepEqual(actual,expected)
 sourceGroups.forEach((indexes,i)=>{let mask=0;for(const index of indexes)for(const c of p.trace[index]){const s=f.strokes[i][mask++],a=c.args;if(c.kind==='cdDrawCurve'){assert.equal(s.revealPath,`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`);assert.equal(s.revealWidth,14)}else{assert.equal(c.kind,'cdDrawLine');assert.equal(s.direction,a[0]===a[2]?(a[3]>a[1]?'down':'up'):(a[2]>a[0]?'right':'left'))}}})
 assert.equal(f.strokes[7][0].direction,'down');assert.deepEqual(f.strokes[7][0].bounds,[23.45,60.75,29.45,93.35])
 assert.equal(f.strokes[8][0].direction,'curve');assert.equal(f.strokes[11].length,3);assert.equal(f.strokes[12][0].direction,'right')
 assert.notDeepEqual(p.trace[4][0].args.slice(4,6),p.trace[5][0].args.slice(0,2));assert.notDeepEqual(p.trace[6][0].args.slice(4,6),p.trace[7][0].args.slice(0,2))
 assert.deepEqual(p.trace[13][0].args.slice(2,4),p.trace[14][0].args.slice(0,2));assert.deepEqual(p.trace[14][0].args.slice(4,6),p.trace[14][1].args.slice(0,2))
 assert.equal(sourceProposal.directOriginalDirectionFrames,39);assert.equal(sourceProposal.all13OriginalDirectionsDirectlyObserved,true);assert.equal(sourceProposal.oldCumulativeUsedAsDirectionApproval,false)
 for(const[k,h]of[['sourceProofFile','sourceProofFileSha256'],['sourceCapsuleFile','sourceCapsuleFileSha256'],['sourceChecksFile','sourceChecksFileSha256']])assert.equal(sha(readFileSync(new URL(selectedProofIdentity[k],import.meta.url))),selectedProofIdentity[h])
 for(const e of [...sourceProposal.dictionaryReviews,sourceProposal.staticReview,sourceProposal.wholeReviewReuse])assert.equal(sha(readFileSync(new URL('../../'+e.path,import.meta.url))),e.SHA256)
 assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false);assert.equal(sourceProposal.productionImportAllowed,false);assert.equal(sourceProposal.initialContactApproved,false);assert.equal(sourceProposal.allFramesApproved,false)
 assert.throws(()=>compileProgressive(p.trace,p,{...f.identity,sourceRoot:'u846f-k'}))
 const t=structuredClone(p.trace);t[0][0].args[0]++;assert.throws(()=>compileProgressive(t,p,f.identity))
 const q=structuredClone(p);q.groups[0].polygons[0][0].x++;assert.throws(()=>compileProgressive(p.trace,q,f.identity))
 let gets=0;const id={...f.identity};Object.defineProperty(id,'sourceRoot',{enumerable:true,get(){gets++;return'hkcs_m846f'}});assert.throws(()=>compileProgressive(p.trace,p,id));assert.equal(gets,0)
 console.log(JSON.stringify({pens:13,masks:17,raw:16,calls:17,P:37,originalPointsOnce:true,originalGuidesUnchanged:true,negative4:true,positiveProjectionReplayed:0,native:false,runtime:false}))
})
