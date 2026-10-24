import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU5dd1SourceContext,reviewedU5dd1Context,reviewedU5dd1Policy,commitReviewedU5dd1Caps,REVIEWED_U5dd1_SOURCE} from './hanja-stroke-start-caps-u5dd1.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u5dd1-2026-10-25/fixtures.json',import.meta.url),'utf8')).u5dd1
const clone=<T>(v:T):T=>JSON.parse(JSON.stringify(v))
test('巑 body3 whole context selects only six exact original initial Q masks',()=>{
 const ctx=makeReviewedU5dd1SourceContext(f.fullProof,f.identity,f.strokes);assert.ok(ctx);assert.equal(ctx,reviewedU5dd1Context(f.strokes))
 assert.deepEqual(Object.keys(f.fullProof).sort(),['defaults','groups','trace']);assert.equal(REVIEWED_U5dd1_SOURCE.sourceProofFormat,'actual-body3')
 for(let p=0;p<22;p++)for(let m=0;m<f.strokes[p].length;m++){const policy=reviewedU5dd1Policy(ctx,p,m);assert.equal(!!policy,m===0&&[3,7,9,13,20,21].includes(p));if(policy){assert.deepEqual(policy.segment,f.strokes[p][m]);assert.equal(policy.certificate.T,'1/2');assert.equal(policy.certificate.K,'1/20');assert.equal(policy.certificate.initialArcMax,7)}}
 assert.equal(REVIEWED_U5dd1_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U5dd1_SOURCE.runtimeApplied,false)
})
test('巑 source headers, getters, identity and any original segment mutation fail closed',()=>{
 assert.equal(makeReviewedU5dd1SourceContext({...f.fullProof,engineRevision:'synthetic'},f.identity,f.strokes),null)
 const id=clone(f.identity);id.sourceRoot='foreign';assert.equal(makeReviewedU5dd1SourceContext(f.fullProof,id,f.strokes),null)
 const p=clone(f.fullProof);Object.defineProperty(p,'groups',{enumerable:true,get(){throw Error('getter must not run')}});assert.equal(makeReviewedU5dd1SourceContext(p,f.identity,f.strokes),null)
 for(const field of ['outline','revealPath','revealWidth','weight']){const strokes=clone(f.strokes);strokes[3][0][field]=typeof strokes[3][0][field]==='number'?strokes[3][0][field]+1:strokes[3][0][field]+' ';assert.equal(reviewedU5dd1Context(strokes),null)}
 const outside=clone(f.strokes);outside[0][0].weight+=1;assert.equal(reviewedU5dd1Context(outside),null);assert.equal(reviewedU5dd1Policy(null,3,0),null)
})
test('巑 private policies preserve empty and full-Q completion without UA or geometry rewrite',()=>{
 const ctx=makeReviewedU5dd1SourceContext(f.fullProof,f.identity,f.strokes);const nodes={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const pen of[4,8,10,14,21,22]){const policy=reviewedU5dd1Policy(ctx,pen-1,0)!;const segment=f.strokes[pen-1][0];assert.equal(commitReviewedU5dd1Caps(policy,segment,0,'own',nodes).status,'empty');assert.equal(commitReviewedU5dd1Caps(policy,segment,1,'own',nodes).status,'complete');assert.equal(commitReviewedU5dd1Caps(policy,{...segment,weight:segment.weight+1},1,'own',nodes).status,'hidden');assert.equal(commitReviewedU5dd1Caps({...policy},segment,1,'own',nodes).status,'hidden');assert.equal(commitReviewedU5dd1Caps(policy,segment,NaN,'own',nodes).status,'hidden')}
})
