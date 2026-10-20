import assert from 'node:assert/strict';
import{readFileSync}from'node:fs';import{createHash}from'node:crypto';
import * as M from './candidate.mjs';
const json=n=>JSON.parse(readFileSync(new URL(n,import.meta.url))),digest=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex'),copy=v=>JSON.parse(JSON.stringify(v));
const C=json('./config.json'),T=C.targets.u564b,F=json('./fixtures.json').u564b,P=F.fullProof,id=T.identity;
const out=M.compileProgressive(P.trace,P,id);
assert.deepEqual(out,F.strokes);assert.equal(M.cachedPositiveCallCount(),1);
assert.equal(M.sourceCompileCallCount(),0);assert.equal(M.geometryDerivationCallCount(),0);
assert.equal(out.length,15);assert.equal(out.flat().length,17);assert.equal(out.flat().reduce((s,m)=>s+(m.outline.match(/M/g)||[]).length,0),33);
assert.equal(digest(out),T.derivedSHA256);assert.equal(digest(F.baseline),T.baselineSHA256);
for(let i=0;i<15;i++)if(i!==9)assert.deepEqual(out[i],F.baseline[i]);
const old=F.baseline[9][0],body=out[9][0],tail=out[9][1];
assert.equal(body.outline+' '+tail.outline,old.outline);
for(const k of Object.keys(old))if(!['outline','bounds'].includes(k))assert.deepEqual(body[k],old[k]);
assert.deepEqual(body.bounds,[44.1,60.5,53.6,94]);assert.deepEqual(tail.bounds,[34.1,88,44.1,91]);assert.equal(tail.direction,'left');assert.equal(tail.weight,10);
assert.deepEqual(out[8],F.baseline[8]);assert.equal(out[8][0].weight/out[8].reduce((s,m)=>s+m.weight,0),.6092369035989366);
assert.equal(body.weight/(body.weight+tail.weight),.7623069611639048);
const chunks=s=>s.flat().flatMap(m=>m.outline.match(/M[^Z]* Z/g)).sort();
assert.deepEqual(chunks(out),chunks(F.baseline));
let negatives=0;const bad=f=>{assert.throws(f);negatives++};
for(const n of[0,1,2,4])bad(()=>Reflect.apply(M.compileProgressive,null,[P.trace,P,id,0].slice(0,n)));
for(const n of[0,1,2,3,5])bad(()=>Reflect.apply(M.compileSourceWhole,null,['u564b',P.trace,P,id,0].slice(0,n)));
bad(()=>M.compileSourceWhole('wrong',P.trace,P,id));
for(const k of Object.keys(id)){const q=copy(id);q[k]+='x';bad(()=>M.compileProgressive(P.trace,P,q));const z=copy(id);delete z[k];bad(()=>M.compileProgressive(P.trace,P,z))}
bad(()=>M.compileProgressive(P.trace,P,{...id,extra:true}));
for(const k of Object.keys(P)){const p=copy(P);delete p[k];bad(()=>M.compileProgressive(p.trace,p,id))}
for(const change of[p=>p.defaults.kWidth++,p=>p.trace[12][1].args[7]++,p=>p.trace[12][1].polygons.at(-1)[0].x++,p=>p.groups.reverse()]){const p=copy(P);change(p);bad(()=>M.compileProgressive(p.trace,p,id))}
const trace=copy(P.trace);trace[0][0].args[0]++;bad(()=>M.compileProgressive(trace,P,id));
assert.equal(M.cachedPositiveCallCount(),1);assert.equal(M.geometryDerivationCallCount(),0);
console.log(JSON.stringify({passed:true,cachedPositive:1,negativeGuards:negatives,polygonsExactOnce:33,other14PensUnchanged:true,bodyGuideWidthWeightUnchanged:true,HQ9Unchanged:true,sourceCompiler:0,derive:0,engine:0,nativeApproval:false,runtimeApplied:false}));
