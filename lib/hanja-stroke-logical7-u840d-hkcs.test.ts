import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {reviewedU840dHkcsLogical7Context,makeReviewedU840dHkcsLogical7SourceContext,reviewedU840dHkcsLogical7Policy,reviewedU840dHkcsLogical7Parts,reviewedU840dHkcsLogical7Plan,commitReviewedU840dHkcsLogical7,type ReviewedU840dHkcsLogical7Nodes} from './hanja-stroke-logical7-u840d-hkcs.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u840d-hkcs-2026-10-25/fixtures.json',import.meta.url),'utf8')).hkcs_m840d
const clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
const context=makeReviewedU840dHkcsLogical7SourceContext(f.fullProof,f.identity,f.strokes)
const policy=reviewedU840dHkcsLogical7Policy(context,6)!
test('萍 logical7 requires exact source, identity, original P9 and private capability',()=>{
 assert(context);assert(policy);assert.equal(reviewedU840dHkcsLogical7Context(f.strokes),context)
 assert.equal(reviewedU840dHkcsLogical7Policy(context,5),null)
 assert.equal(reviewedU840dHkcsLogical7Policy({...context!},6),null)
 for(const key of ['fullProof','identity','strokes'] as const){const bad=clone(f);if(key==='identity')bad.identity.sourceRoot+='-bad';else if(key==='strokes')bad.strokes[6][0].inkPaths[0]+=' ';else bad.fullProof.groups[6].polygons[0][0].x+=1;assert.equal(makeReviewedU840dHkcsLogical7SourceContext(bad.fullProof,bad.identity,bad.strokes),null)}
 const getter=clone(f.strokes);Object.defineProperty(getter[6][0],'outline',{enumerable:true,get(){throw Error('must not execute getter')}});assert.equal(reviewedU840dHkcsLogical7Context(getter),null)
 const parts=reviewedU840dHkcsLogical7Parts(policy,f.strokes[6])!;assert.deepEqual([parts.foot.length,parts.body.length,parts.rise.length],[3,4,2]);assert.equal(reviewedU840dHkcsLogical7Parts({...policy},f.strokes[6]),null)
})
test('萍 logical7 clock preserves completed foot/body across exact boundaries',()=>{
 const L=11.760997772216797,down=93.35-73.5,up=78.6-42.3,total=L+down+up
 const start=reviewedU840dHkcsLogical7Plan(policy,0,L),body=reviewedU840dHkcsLogical7Plan(policy,L/total,L),rise=reviewedU840dHkcsLogical7Plan(policy,(L+down)/total,L),done=reviewedU840dHkcsLogical7Plan(policy,1,L)
 assert.equal(start.foot,0);assert.equal(body.foot,1);assert.equal(body.bodyHeight,0)
 assert.equal(rise.foot,1);assert.equal(rise.bodyY,73.5);assert(Math.abs(rise.bodyHeight-19.85)<1e-12);assert(Math.abs(rise.riseHeight)<1e-12)
 assert.equal(done.phase,'rise');assert.equal(done.local,1);assert.equal(done.bodyY,42.3);assert.equal(done.riseY,42.3)
 for(const p of [-1,NaN,Infinity,1.01])assert.throws(()=>reviewedU840dHkcsLogical7Plan(policy,p,L))
 for(const length of [0,NaN,100])assert.throws(()=>reviewedU840dHkcsLogical7Plan(policy,.5,length))
})
test('萍 missing actual DOM fails closed before any UA measurement',()=>{
 const nodes={root:null,defs:null,measure:null,mask:null,guide:null,start:null,end:null,p3Clip:null,frontier:null,bodyClip:null,bodyRect:null,riseClip:null,riseRect:null,foot:null,body:null,rise:null,paths:Array(9).fill(null)} satisfies ReviewedU840dHkcsLogical7Nodes
 assert.equal(commitReviewedU840dHkcsLogical7(policy,f.strokes[6],.5,'test',nodes).status,'hidden')
})
