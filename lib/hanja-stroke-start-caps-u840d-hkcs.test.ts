import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {makeReviewedU840dHkcsCapsSourceContext,reviewedU840dHkcsCapsContext,reviewedU840dHkcsCapsPolicy,commitReviewedU840dHkcsCaps,REVIEWED_U840D_HKCS_CAPS_SOURCE} from './hanja-stroke-start-caps-u840d-hkcs.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),sha=(b:Buffer)=>createHash('sha256').update(b).digest('hex'),f=json('docs/hanja-source-original-u840d-hkcs-2026-10-25/fixtures.json').hkcs_m840d,clone=<T>(x:T):T=>structuredClone(x)
test('萍 context binds original full5 and only four independent Q masks',()=>{
 const c=makeReviewedU840dHkcsCapsSourceContext(f.fullProof,f.identity,f.strokes);assert(c);assert.equal(c,reviewedU840dHkcsCapsContext(f.strokes))
 for(let p=0;p<f.strokes.length;p++)for(let m=0;m<f.strokes[p].length;m++){const q=reviewedU840dHkcsCapsPolicy(c,p,m);assert.equal(!!q,[4,5,8,9].includes(p)&&m===0);if(q){assert.deepEqual(q.segment,f.strokes[p][m]);assert.equal(q.previousSegment,null);assert.equal(q.certificate.initialArcMax,7);assert.equal(q.certificate.T,'1/2');assert.equal(q.certificate.K,[4,5].includes(p)?'1/10':'1/20')}}
 assert.deepEqual(Object.keys(f.fullProof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(REVIEWED_U840D_HKCS_CAPS_SOURCE.nativeApproval,false)
 const foreign=clone(f.identity);foreign.sourceRoot='u840d';assert.equal(makeReviewedU840dHkcsCapsSourceContext(f.fullProof,foreign,f.strokes),null)
 let reads=0;const getter=clone(f.fullProof);Object.defineProperty(getter,'trace',{enumerable:true,get(){reads++;return[]}});assert.equal(makeReviewedU840dHkcsCapsSourceContext(getter,f.identity,f.strokes),null);assert.equal(reads,0)
 for(const key of ['outline','revealPath','revealWidth','weight']){const a=clone(f.strokes);a[4][0][key]=typeof a[4][0][key]==='number'?a[4][0][key]+1:a[4][0][key]+' ';assert.equal(reviewedU840dHkcsCapsContext(a),null)}
 const off=clone(f.strokes);off[0][0].weight++;assert.equal(reviewedU840dHkcsCapsContext(off),null)
})
test('萍 source-specific caps keep empty/full ink behavior and reject fake policy',()=>{
 const c=reviewedU840dHkcsCapsContext(f.strokes),nodes={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const pen of [5,6,9,10]){const q=reviewedU840dHkcsCapsPolicy(c,pen-1,0)!;assert.equal(commitReviewedU840dHkcsCaps(q,q.segment,0,'own',nodes).status,'empty');assert.equal(commitReviewedU840dHkcsCaps(q,q.segment,1,'own',nodes).status,'complete');assert.equal(commitReviewedU840dHkcsCaps({...q},q.segment,.5,'own',nodes).status,'hidden')}
})
test('萍 caps pins the successful summary without claiming retained leaf proof',()=>{
 const meta=REVIEWED_U840D_HKCS_CAPS_SOURCE,p=json(meta.initialProofFile)
 assert.equal(sha(read(meta.initialProofFile)),meta.initialProofSHA256);assert.equal(sha(read(meta.initialScriptFile)),meta.initialScriptSHA256);assert.equal(sha(read(meta.sourceCacheFile)),meta.sourceCacheSHA256)
 assert.equal(p.reportedCases.length,4);assert.equal(p.reportedCases.reduce((n:number,x:{coverLeavesReported:number})=>n+x.coverLeavesReported,0),117)
 assert(p.reportedCases.every((x:{fullQ7Reported:boolean;unresolvedReported:number})=>x.fullQ7Reported&&x.unresolvedReported===0));assert.equal(p.evidenceRetention.fullLeafDataRetained,false);assert.equal(p.evidenceRetention.fullLeafDataReverified,false)
 assert.equal(meta.fullCertificateLeavesRetained,false);assert.equal(meta.mathReplaysByThisAgent,0);assert.equal(meta.nativeApproval,false);assert.equal(meta.runtimeApplied,false)
 console.log(JSON.stringify({caps4:true,successfulSummaryOnly:true,reportedLeaves117:true,fullLeavesRetained:false,mathReplays:0,engine:0,projection:0,nativeApproval:false}))
})
