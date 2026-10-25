import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {makeReviewedU6fe9HkcsMCapsSourceContext,reviewedU6fe9HkcsMCapsContext,reviewedU6fe9HkcsMCapsPolicy,commitReviewedU6fe9HkcsMCaps,REVIEWED_U6FE9_HKCS_M_CAPS_SOURCE} from './hanja-stroke-start-caps-u6fe9-hkcs-m.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),sha=(b:Buffer)=>createHash('sha256').update(b).digest('hex'),f=json('docs/hanja-source-original-u6fe9-hkcs-m-2026-10-25/fixtures.json').hkcs_m6fe9,clone=<T>(x:T):T=>structuredClone(x)
test('濩 context binds original full5 and only exact five independent and one conditional transition masks',()=>{
 const c=makeReviewedU6fe9HkcsMCapsSourceContext(f.fullProof,f.identity,f.strokes);assert(c);assert.equal(c,reviewedU6fe9HkcsMCapsContext(f.strokes))
 for(let p=0;p<f.strokes.length;p++)for(let m=0;m<f.strokes[p].length;m++){const q=reviewedU6fe9HkcsMCapsPolicy(c,p,m);assert.equal(!!q,[[0,0],[1,0],[7,0],[9,0],[15,1],[16,0]].some(([a,b])=>a===p&&b===m));if(q){assert.deepEqual(q.segment,f.strokes[p][m]);assert.deepEqual(q.previousSegment,m>0?f.strokes[p][m-1]:null);assert.equal(q.certificate.initialArcMax,7);assert.equal(q.certificate.T,p===9?'1':'1/2');assert.equal(q.certificate.K,'1/20')}}
 assert.deepEqual(Object.keys(f.fullProof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(REVIEWED_U6FE9_HKCS_M_CAPS_SOURCE.nativeApproval,false)
 const foreign=clone(f.identity);foreign.sourceRoot='u6fe9-ue0102';assert.equal(makeReviewedU6fe9HkcsMCapsSourceContext(f.fullProof,foreign,f.strokes),null)
 let reads=0;const getter=clone(f.fullProof);Object.defineProperty(getter,'trace',{enumerable:true,get(){reads++;return[]}});assert.equal(makeReviewedU6fe9HkcsMCapsSourceContext(getter,f.identity,f.strokes),null);assert.equal(reads,0)
 for(const key of ['outline','revealPath','revealWidth','weight']){const a=clone(f.strokes);a[0][0][key]=typeof a[0][0][key]==='number'?a[0][0][key]+1:a[0][0][key]+' ';assert.equal(reviewedU6fe9HkcsMCapsContext(a),null)}
 const off=clone(f.strokes);off[0][0].weight++;assert.equal(reviewedU6fe9HkcsMCapsContext(off),null)
})
test('濩 source-specific caps keep empty/full ink behavior and reject fake policy',()=>{
 const c=reviewedU6fe9HkcsMCapsContext(f.strokes),nodes={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const pen of [1,2,8,10,17]){const q=reviewedU6fe9HkcsMCapsPolicy(c,pen-1,0)!;assert.equal(commitReviewedU6fe9HkcsMCaps(q,q.segment,0,'own',nodes).status,'empty');assert.equal(commitReviewedU6fe9HkcsMCaps(q,q.segment,1,'own',nodes).status,'complete');assert.equal(commitReviewedU6fe9HkcsMCaps({...q},q.segment,.5,'own',nodes).status,'hidden')}
})
test('濩 transition caps reject missing actual opaque prior H before UA work',()=>{
 const c=reviewedU6fe9HkcsMCapsContext(f.strokes),q=reviewedU6fe9HkcsMCapsPolicy(c,15,1)!
 const nodes={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 assert.deepEqual(q.previousSegment,f.strokes[15][0]);assert.equal(commitReviewedU6fe9HkcsMCaps(q,q.segment,0,'own',nodes,0).status,'empty')
 assert.equal(commitReviewedU6fe9HkcsMCaps(q,q.segment,.5,'own',nodes,0).status,'hidden');assert.equal(commitReviewedU6fe9HkcsMCaps(q,q.segment,1,'own',nodes,1).status,'hidden')
 assert.equal(reviewedU6fe9HkcsMCapsPolicy({...c!},15,1),null)
})
test('濩 caps pins existing initial6 and conditional strip evidence without replay',()=>{
 const m=REVIEWED_U6FE9_HKCS_M_CAPS_SOURCE,p=json(m.initialProofFile),c=json(m.priorContactProofFile)
 for(const[path,pin]of[[m.sourceCacheFile,m.sourceCacheSHA256],[m.initialProofFile,m.initialProofSHA256],[m.initialScriptFile,m.initialScriptSHA256],[m.priorContactProofFile,m.priorContactProofSHA256]])assert.equal(sha(read(path)),pin)
 assert.equal(p.fullQCoverage.length,6);assert.equal(p.fullQCoverage.reduce((n:number,x:{coverLeaves:unknown[]})=>n+x.coverLeaves.length,0),238);assert(p.fullQCoverage.every((x:{unresolved:unknown[];strictFullPContained:boolean})=>x.unresolved.length===0&&x.strictFullPContained));assert.equal(p.cardinalFacts.length,11)
 assert.equal(c.pen,16);assert.equal(c.mask,2);assert.equal(c.actualOpaquePriorVerified,false);assert.equal(c.allGrowingPComponentsConnectivityProved,false);assert.equal(m.actualOpaquePriorStillRequired,true);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
 console.log(JSON.stringify({caps6:true,leaves238:true,cardinal11:true,priorHStillRequired:true,mathReplays:0,engine:0,projection:0,nativeApproval:false}))
})
