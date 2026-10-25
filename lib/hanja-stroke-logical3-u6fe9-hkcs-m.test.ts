import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {makeReviewedU6fe9HkcsMLogical3SourceContext as context,reviewedU6fe9HkcsMLogical3Context as sourceContext,reviewedU6fe9HkcsMLogical3Policy as policy,reviewedU6fe9HkcsMLogical3Parts as parts,reviewedU6fe9HkcsMLogical3Geometry as geometry,reviewedU6fe9HkcsMLogical3Plan as plan,commitReviewedU6fe9HkcsMLogical3 as commit,REVIEWED_U6FE9_HKCS_M_LOGICAL3_SOURCE as evidence} from './hanja-stroke-logical3-u6fe9-hkcs-m.ts'
import type {ReviewedU6fe9HkcsMLogical3Nodes} from './hanja-stroke-logical3-u6fe9-hkcs-m.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),sha=(b:Buffer|string)=>createHash('sha256').update(b).digest('hex'),f=json('docs/hanja-source-original-u6fe9-hkcs-m-2026-10-25/fixtures.json').hkcs_m6fe9
const c=context(f.fullProof,f.identity,f.strokes),q=policy(c,2);assert(c);assert(q)
test('濩 logical3 binds the complete original source and rejects substitutions',()=>{
 assert.equal(c,sourceContext(f.strokes));for(let i=0;i<17;i++)assert.equal(!!policy(c,i),i===2)
 assert.equal(policy(null,2),null);assert.equal(policy({} as typeof c,2),null)
 const changed=structuredClone(f.strokes);changed[2][0].outline+=' ';assert.equal(sourceContext(changed),null)
 assert.equal(context(f.fullProof,{...f.identity,sourceRoot:'other'},f.strokes),null)
 const changedProof=structuredClone(f.fullProof);changedProof.groups.reverse();assert.equal(context(changedProof,f.identity,f.strokes),null)
 let reads=0;const getter=Object.defineProperty({},'sourceRoot',{get(){reads++;return f.identity.sourceRoot},enumerable:true});assert.equal(context(f.fullProof,getter,f.strokes),null);assert.equal(reads,0)
 const reversed=Object.fromEntries(Object.entries(f.identity).reverse());assert.equal(context(f.fullProof,reversed,f.strokes),c)
})
test('濩 keeps the original nine P paths and exact reversed Q, without fixture projection',()=>{
 const p=parts(q,f.strokes[2]);assert(p);assert.deepEqual([p.foot.length,p.body.length,p.rise.length],[3,4,2])
 const outlines=f.strokes[2].flatMap((s:{outline:string})=>s.outline.match(/M[^M]+/g)!.map(p=>p.trim()));assert.deepEqual([...p.foot,...p.body,...p.rise],outlines)
 assert.equal(parts(q,f.strokes[3]),null);assert.equal(parts({} as typeof q,f.strokes[2]),null)
 assert.deepEqual(geometry(q),{guide:'M19.245 71.5 Q17.465 69 8.120000000000001 67',anchor:[245/12,4121/60]})
 assert.equal(evidence.geometrySHA256,sha(JSON.stringify(f.strokes)));assert.equal(evidence.sourceFull5SHA256,sha(read(evidence.sourceIdentity.sourceProofFile.replace('../','docs/'))))
 for(const ref of[evidence.nativeReview,evidence.P3Proof,evidence.bandProof])assert.equal(sha(read(ref.path)),ref.SHA256)
 assert.equal(evidence.nativeApproval,false);assert.equal(evidence.runtimeApplied,false)
})
test('濩 source-specific phase plan reaches exact completion using stable difference coverage',()=>{
 const L=12.18,total=L+(93.45-72.5)+(72.85-26.85)
 const a=plan(q,0,L),b=plan(q,L/total,L),d=plan(q,(L+(93.45-72.5))/total,L),z=plan(q,1,L)
 assert.equal(a.phase,'foot');assert.equal(a.foot,0);assert.equal(b.phase,'body');assert.equal(d.phase,'rise');assert.equal(z.local,1);assert.equal(z.riseY,26.85)
 assert.equal(z.bodyHeight,93.45-z.bodyY);assert(z.bodyHeight>=93.45-z.bodyY)
 assert(z.bodyY+z.bodyHeight<93.45,'recorded floating sum counterexample stays visible')
 for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>plan(q,p,L));for(const l of[0,NaN,Infinity,20])assert.throws(()=>plan(q,.5,l))
})
test('濩 missing actual SVG bindings hide paint before any UA measurement',()=>{
 let reads=0;const attrs=new Map<string,string>(),root={setAttribute:(k:string,v:string)=>attrs.set(k,v),removeAttribute:(k:string)=>attrs.delete(k)}
 const n={root,defs:null,measure:{getTotalLength(){reads++;return 12.18}},mask:null,guide:null,start:null,end:null,p3Clip:null,frontier:null,bodyClip:null,bodyRect:null,riseClip:null,riseRect:null,foot:null,body:null,rise:null,paths:[]} as unknown as ReviewedU6fe9HkcsMLogical3Nodes
 assert.equal(commit(q,f.strokes[2],.5,'valid',n).status,'hidden');assert.equal(reads,0);assert.equal(attrs.get('visibility'),'hidden')
})
