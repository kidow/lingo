import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u6145-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU6145HkcsSourceContext,reviewedU6145HkcsPolicy} from './hanja-stroke-start-caps-u6145-hkcs.ts'
import {makeReviewedU6145HkcsUnion12SourceContext as source,reviewedU6145HkcsUnion12Policy as policy,sampleReviewedU6145HkcsUnion12Frame as sample,REVIEWED_U6145_HKCS_UNION12_SOURCE as facts,REVIEWED_U6145_HKCS_UNION12_INPUT_SHA256 as pins} from './hanja-stroke-union-point-window12-u6145-hkcs.ts'
const f=fixture.hkcs_m6145,s=f.strokes as HanjaOutlineStrokes,c=source(f.fullProof,f.identity,s),clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x));assert(c)
test('慅12 owns only its exact private source token and unchanged P3',()=>{
 assert.equal(c,makeReviewedU6145HkcsSourceContext(f.fullProof,f.identity,s));const p=policy(c,11,0);assert(p);assert.deepEqual(p.segment,s[11][0]);assert.equal((p.segment.outline.match(/M/g)||[]).length,3)
 for(let pen=0;pen<s.length;pen++)for(let mask=0;mask<s[pen].length;mask++)if(pen!==11||mask!==0)assert.equal(policy(c,pen,mask),null)
 assert.equal(policy({...c},11,0),null);assert.equal(reviewedU6145HkcsPolicy(c,11,0),null)
 const changed=clone(f.fullProof);changed.trace[13][0].args[0]+=.1;assert.equal(source(changed,f.identity,s),null)
 assert.equal(source(f.fullProof,{...f.identity,sourceRoot:'other'},s),null)
 let reads=0;const getter=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}});assert.equal(source(f.fullProof,getter,s),null);assert.equal(reads,0)
})
test('慅12 is a first mask with a two-axis nested window and exact original endpoint',()=>{
 const p=policy(c,11,0);assert(p);assert.notDeepEqual(p.anchor,[33.44,89]);let previous={x:p.anchor[0],y:p.anchor[1],right:p.anchor[0],bottom:p.anchor[1]}
 for(const t of[0,1e-8,.000001,.0001,.001,.01,.03,.1,.25,.5,.75,.99,1]){const v=sample(p,p.segment,t);assert.equal(v.sourceGuide,p.segment.revealPath);assert.equal(v.requiresPreviousMask,false);assert.equal(v.UARead,false);assert.equal(v.visible,t!==0);assert.equal(v.originalPDirect,t===1)
  if(v.clip){const r=v.clip,right=r.x+r.width,bottom=r.y+r.height;assert(r.x<=previous.x+1e-12&&r.y<=previous.y+1e-12&&right>=previous.right-1e-12&&bottom>=previous.bottom-1e-12);assert(Math.abs(r.width*r.width+r.height*r.height-(1097281/400)*t*t)<1e-10);previous={x:r.x,y:r.y,right,bottom}}else assert(t===0||t===1)
 }
 assert.throws(()=>sample({...p},p.segment,.01));for(const n of[-1,NaN,Infinity,1.1])assert.throws(()=>sample(p,p.segment,n))
 for(const patch of[{outline:p.segment.outline+' '},{revealPath:p.segment.revealPath+' '},{revealWidth:15},{weight:p.segment.weight+.1},{bounds:[0,0,100,100] as const}])assert.throws(()=>sample(p,{...p.segment,...patch},.01))
})
test('慅12 proof pins preserve author-clock and native-review limits',()=>{
 for(const[path,sha]of Object.entries(pins))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),sha)
 assert.equal(facts.requiresPreviousMask,false);assert.equal(facts.authorAnchorIsSourceQ0,false);assert.equal(facts.originalClockIdentityApproved,false);assert.equal(facts.nativeApproval,false);assert.equal(facts.runtimeApplied,false)
})
