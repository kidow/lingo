import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {makeReviewedU5767HkcsSourceContext,reviewedU5767HkcsContext,reviewedU5767HkcsPolicy,commitReviewedU5767HkcsCaps,REVIEWED_U5767_HKCS_SOURCE} from './hanja-stroke-start-caps-u5767-hkcs.ts'
import {REVIEWED_U5767_HKCS_CARDINAL_SOURCE} from './hanja-stroke-cardinal-contact-u5767-hkcs.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),sha=(b:Buffer)=>createHash('sha256').update(b).digest('hex'),f=json('docs/hanja-source-original-u5767-hkcs-2026-10-25/fixtures.json').hkcs_m5767,clone=<T>(x:T):T=>structuredClone(x)
test('坧 context binds original full5 and only two independent Q masks',()=>{
 const c=makeReviewedU5767HkcsSourceContext(f.fullProof,f.identity,f.strokes);assert(c);assert.equal(c,reviewedU5767HkcsContext(f.strokes))
 for(let p=0;p<f.strokes.length;p++)for(let m=0;m<f.strokes[p].length;m++){const q=reviewedU5767HkcsPolicy(c,p,m);assert.equal(!!q,[2,4].includes(p)&&m===0);if(q){assert.deepEqual(q.segment,f.strokes[p][m]);assert.equal(q.previousSegment,null);assert.equal(q.certificate.initialArcMax,7);assert.equal(q.certificate.T,'1/2');assert.equal(q.certificate.K,'1/20')}}
 assert.deepEqual(Object.keys(f.fullProof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(REVIEWED_U5767_HKCS_SOURCE.nativeApproval,false)
 const foreign=clone(f.identity);foreign.sourceRoot='u5767';assert.equal(makeReviewedU5767HkcsSourceContext(f.fullProof,foreign,f.strokes),null)
 let reads=0;const getter=clone(f.fullProof);Object.defineProperty(getter,'trace',{enumerable:true,get(){reads++;return[]}});assert.equal(makeReviewedU5767HkcsSourceContext(getter,f.identity,f.strokes),null);assert.equal(reads,0)
 for(const key of ['outline','revealPath','revealWidth','weight']){const a=clone(f.strokes);a[2][0][key]=typeof a[2][0][key]==='number'?a[2][0][key]+1:a[2][0][key]+' ';assert.equal(reviewedU5767HkcsContext(a),null)}
 const off=clone(f.strokes);off[0][0].weight++;assert.equal(reviewedU5767HkcsContext(off),null)
})
test('坧 source-specific caps keep empty/full ink behavior and reject fake policy',()=>{
 const c=reviewedU5767HkcsContext(f.strokes),nodes={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const pen of [3,5]){const q=reviewedU5767HkcsPolicy(c,pen-1,0)!;assert.equal(commitReviewedU5767HkcsCaps(q,q.segment,0,'own',nodes).status,'empty');assert.equal(commitReviewedU5767HkcsCaps(q,q.segment,1,'own',nodes).status,'complete');assert.equal(commitReviewedU5767HkcsCaps({...q},q.segment,.5,'own',nodes).status,'hidden')}
})
test('坧 source certificates are pinned without replaying math or projection',()=>{
 const p=json('docs/hanja-source-original-u5767-hkcs-2026-10-25/initial-conditions-proof.json'),c=json('docs/hanja-source-original-u5767-hkcs-2026-10-25/cardinal-contact-proof.json');assert.equal(sha(read('docs/hanja-source-original-u5767-hkcs-2026-10-25/initial-conditions-proof.json')),REVIEWED_U5767_HKCS_SOURCE.initialProofSHA256);assert.equal(sha(read('docs/hanja-source-original-u5767-hkcs-2026-10-25/cardinal-contact-proof.json')),REVIEWED_U5767_HKCS_CARDINAL_SOURCE.proofSHA256)
 assert.equal(p.fullQCoverage.length,2);assert.equal(p.fullQCoverage.reduce((n:number,x:{coverLeaves:unknown[]})=>n+x.coverLeaves.length,0),133);assert(p.fullQCoverage.every((x:{unresolved:unknown[];strictFullPContained:boolean})=>x.unresolved.length===0&&x.strictFullPContained));assert.equal(p.cardinalFacts.length,7)
 assert.deepEqual(c.contactSquare.center,['80','49']);assert.equal(c.contactSquare.ownEar.strictCrossMargin,'381/400');assert.equal(c.reuseConditions.originalHeadExactlyTranslated,true);assert.equal(c.band.actualOpaquePriorStillRequired,true);assert.equal(c.band.allTimeRasterClaimed,false)
 console.log(JSON.stringify({ownCertificates:true,newQ2:true,exactLeaves133:true,cardinal7:true,priorHContact:true,mathReplays:0,engine:0,projection:0,nativeApproval:false}))
})
