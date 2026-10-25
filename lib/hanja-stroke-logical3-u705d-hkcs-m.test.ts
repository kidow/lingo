import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU705dHkcsMLogical3Context as context,makeReviewedU705dHkcsMLogical3SourceContext as sourceContext,reviewedU705dHkcsMLogical3Policy as policy,reviewedU705dHkcsMLogical3Parts as parts,reviewedU705dHkcsMLogical3Geometry as geometry,reviewedU705dHkcsMLogical3Plan as plan,commitReviewedU705dHkcsMLogical3 as commit,REVIEWED_U705D_HKCS_M_LOGICAL3_SOURCE as evidence} from './hanja-stroke-logical3-u705d-hkcs-m.ts'
import type {ReviewedU705dHkcsMLogical3Nodes} from './hanja-stroke-logical3-u705d-hkcs-m.ts'
import {reviewedU705dHkcsMCapsContext as capsContext}from'./hanja-stroke-start-caps-u705d-hkcs-m.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),sha=(s:Buffer|string)=>createHash('sha256').update(s).digest('hex'),f=json('docs/hanja-source-original-u705d-hkcs-m-2026-10-26/fixtures.json').hkcs_m705d,c=sourceContext(f.fullProof,f.identity,f.strokes),q=policy(c,2);assert(c);assert(q)
const polygon=(d:string)=>{const v=d.match(/-?\d+(?:\.\d+)?/g)!.map(Number);return Array.from({length:v.length/2},(_,i)=>[v[i*2],v[i*2+1]])},area=(p:readonly(readonly number[])[])=>Math.abs(p.reduce((s,v,i)=>{const w=p[(i+1)%p.length];return s+v[0]*w[1]-w[0]*v[1]},0))/2
 test('灝 logical3 shares exact complete-source capability and rejects substitutes',()=>{
 assert.equal(c,context(f.strokes));assert.equal(c,capsContext(f.strokes));for(let i=0;i<24;i++)assert.equal(!!policy(c,i),i===2)
 assert.equal(policy({...c},2),null);assert.equal(policy(null,2),null)
 const changed=structuredClone(f.strokes);changed[2][0].outline+=' ';assert.equal(context(changed),null)
 const proof=structuredClone(f.fullProof);proof.engineRevision='unreviewed';assert.equal(sourceContext(proof,f.identity,f.strokes),null)
 const identity={...f.identity,sourceRoot:'other'};assert.equal(sourceContext(f.fullProof,identity,f.strokes),null)
 assert.equal(sourceContext(f.fullProof,Object.fromEntries(Object.entries(f.identity).reverse()),f.strokes),c)
 let reads=0;const getter=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return'hkcs_m705d'}});assert.equal(sourceContext(f.fullProof,getter,f.strokes),null);assert.equal(reads,0)
 })
 test('灝 keeps exact original P9, Q4 and source-derived affine clip polygons',()=>{
 const p=parts(q,f.strokes[2]),g=geometry(q);assert(p);assert(g);assert.equal(p.all.length,9);assert.deepEqual(p.baseIndices,[0,1,2,5,6,7,8]);assert.deepEqual(p.bodyIndices,[3,4])
 assert.deepEqual(p.all,f.strokes[2].flatMap((s:{outline:string})=>s.outline.match(/M[^M]+/g)!.map(p=>p.trim())))
 assert.deepEqual(g.bodyPolygons,[polygon(p.all[3]),polygon(p.all[4])]);assert.equal(parts(q,f.strokes[3]),null);assert.equal(parts({...q},f.strokes[2]),null)
 assert.equal(sha(JSON.stringify(f.strokes)),evidence.geometrySHA256);assert.equal(sha(read(evidence.fixture.path)),evidence.fixture.SHA256)
 for(const r of[evidence.sourceCapability,evidence.proof,evidence.standaloneNative])assert.equal(sha(read(r.path)),r.SHA256)
 assert.equal(evidence.nativeApproval,false);assert.equal(evidence.runtimeApplied,false);assert.equal(evidence.originalSubphaseClaim,false)
 })
 test('灝 single author counter preserves kernel continuity and equivalent affine clip area',()=>{
 const g=geometry(q)!;const total=g.counter.hi-g.counter.lo+g.counter.bodyWeight,s=(g.counter.bodyStart-g.counter.lo)/total,e=(g.counter.bodyEnd-g.counter.lo+g.counter.bodyWeight)/total
 const ps=[0,1e-6,s-1e-8,s,s+1e-8,.5,e-1e-8,e,e+1e-8,.75,1],rows=ps.map(p=>plan(q,p))
 for(let i=1;i<rows.length;i++){assert(rows[i].counter>=rows[i-1].counter);assert(rows[i].bodyScale>=rows[i-1].bodyScale)}
 assert.equal(rows[0].counter,g.counter.lo);assert.equal(rows[0].bodyVisible,false);assert.equal(rows.at(-1)!.counter,g.counter.hi);assert.equal(rows.at(-1)!.complete,true);assert.deepEqual(rows.at(-1)!.bodyPolygons,g.bodyPolygons)
 assert.equal(plan(q,.5105833333134675).bodyScale,.4146128695414152)
 for(const row of rows)for(let j=0;j<2;j++){const expected=area(g.bodyPolygons[j])*row.bodyScale**2;assert(Math.abs(area(row.bodyPolygons[j])-expected)<1e-9)}
 for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>plan(q,p));assert.throws(()=>plan({...q},.5))
 })
 test('灝 missing actual bindings remain hidden before document or UA access',()=>{
 let reads=0;const a=new Map<string,string>(),root={setAttribute:(k:string,v:string)=>a.set(k,v),removeAttribute:(k:string)=>a.delete(k),get ownerDocument(){reads++;throw Error('must not read missing binding')}}
 const n={root,defs:null,baseClip:null,front:null,base:null,body:null,bodyClips:[null,null],bodyFronts:[null,null],paths:Array(9).fill(null)} as unknown as ReviewedU705dHkcsMLogical3Nodes
 const r=commit(q,f.strokes[2],.5,'source-test',n);assert.equal(r.status,'hidden');assert.equal(reads,0);assert.equal(a.get('visibility'),'hidden')
 })
