import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import * as candidate from './candidate.mjs';
const read=name=>readFileSync(new URL(name,import.meta.url));
const hash=value=>createHash('sha256').update(value).digest('hex');
const digest=value=>hash(JSON.stringify(value));
const config=JSON.parse(read('./config.json')),target=config.targets.u75b7;
const fixture=JSON.parse(read('./fixtures.json'));
const proof=JSON.parse(read('../../'+target.sourceFile));
const id=target.identity;
assert.equal(candidate.cachedPositiveCallCount(),0);
assert.equal(candidate.sourceCompileCallCount(),0);
const strokes=candidate.compileProgressive(proof.trace,proof,id);
assert.equal(candidate.cachedPositiveCallCount(),1);
assert.equal(candidate.sourceCompileCallCount(),0);
assert.equal(candidate.geometryDerivationCallCount(),0);
assert.equal(candidate.preparationOriginalCompilerPositiveCount,1);
assert.equal(strokes.length,10);assert.equal(strokes.reduce((n,p)=>n+p.length,0),13);
assert.equal(digest(fixture.originalOrderBaseline),target.baselineSHA256);
assert.equal(digest(strokes),target.derivedSHA256);
assert.deepEqual(strokes,target.originalPenOrder.map(i=>fixture.originalOrderBaseline[i-1]));
assert.deepEqual(candidate.sourceGroups,target.originalPenOrder.map(i=>target.originalSourceGroups[i-1]));
assert.deepEqual([...target.originalPenOrder].sort((a,b)=>a-b),Array.from({length:10},(_,i)=>i+1));
assert.deepEqual(candidate.sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:11},(_,i)=>i));
assert.deepEqual(candidate.sourceGroups,[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10]]);
assert.equal(strokes[6][0].direction,'down');assert.equal(strokes[6][1].direction,'curve');
assert.equal(strokes[6][1].revealPath,'M32.34 83.725 Q46.379999999999995 80.2375 64.38 73.2625');
assert.equal(strokes[6][1].revealWidth,14);assert.deepEqual(strokes[8].map(m=>m.direction),['curve','right','up']);
const canonical=points=>{
  const options=[];
  for(const row of [points,[...points].reverse()])for(let i=0;i<row.length;i++)options.push(JSON.stringify([...row.slice(i),...row.slice(0,i)]));
  return options.sort()[0];
};
const original=proof.groups.flatMap(g=>g.polygons).map(poly=>canonical(poly.map(v=>[v.x/2,v.y/2]))).sort();
const emitted=strokes.flatMap(p=>p.flatMap(m=>(m.outline.match(/M[^Z]*Z/g)||[]).map(path=>{
  const values=path.match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi).map(Number);
  return canonical(Array.from({length:values.length/2},(_,i)=>[values[i*2],values[i*2+1]]));
}))).sort();
assert.equal(original.length,26);assert.deepEqual(emitted,original);
assert.equal(hash(read('./fixtures.json')),target.fixtureSHA256);
assert.equal(target.sourceCompilerPositiveCountDuringPreparation,1);
assert.equal(target.runtimeSourceCompilerCalls,0);
assert.equal(target.newTailDerivations,0);assert.equal(target.engineRuns,0);
assert.equal(target.nativeApproval,false);assert.equal(candidate.nativeApproval,false);assert.equal(candidate.runtimeApplied,false);
const server=read('./serve.py').toString();
assert.ok(!/importlib|subprocess|compileProgressive|compileSourceWhole/.test(server));
assert.ok(server.includes("CONFIG_SHA='"+hash(read('./config.json'))+"'"));
assert.ok(server.includes("FIXTURE_SHA='"+hash(read('./fixtures.json'))+"'"));
assert.ok(server.includes('width:520px;height:520px'));
assert.ok(server.includes("q['root']!=['u75b7']"));
assert.ok(server.includes("source('疷')"));
assert.ok(server.includes('sourceCompilerRequests'));
assert.ok(!server.includes('TYPESAFE_API_KEY'));
const declaration=read('./candidate.d.mts').toString();assert.ok(declaration.includes("sourceRoot:'u75b7'"));
let negativeChecks=0;
const rejects=fn=>{assert.throws(fn);negativeChecks++;};
rejects(()=>candidate.compileProgressive(proof.trace,proof));
rejects(()=>candidate.compileProgressive(proof.trace,proof,id,'extra'));
rejects(()=>candidate.compileProgressive(proof.trace,proof,null));
rejects(()=>candidate.compileProgressive(proof.trace,proof,Object.assign(Object.create(null),id)));
rejects(()=>candidate.compileProgressive(proof.trace,proof,{...id,extra:'unapproved'}));
for(const key of Object.keys(id))rejects(()=>candidate.compileProgressive(proof.trace,proof,{...id,[key]:'changed'}));
rejects(()=>candidate.compileProgressive([...proof.trace].reverse(),proof,id));
const mutations=[
 p=>p.trace[0][0].args[0]+=.1,
 p=>p.trace[0][0].polygons[0][0].x+=.1,
 p=>p.groups[0].polygons[0][0].x+=.1,
 p=>p.defaults.kWidth+=.1,
 p=>p.engineRevision='changed',
 p=>p.engineHashes['2d.js']='0'.repeat(64),
 p=>delete p.engineHashes,
 p=>p.extra='unapproved',
 p=>p.trace[6]=p.trace[7],
];
for(const mutation of mutations){const changed=structuredClone(proof);mutation(changed);rejects(()=>candidate.compileProgressive(changed.trace,changed,id));}
rejects(()=>candidate.compileSourceWhole('u75b7-ue0100',proof.trace,proof,id));
rejects(()=>candidate.compileSourceWhole('other',proof.trace,proof,id));
rejects(()=>candidate.compileSourceWhole('u75b7',proof.trace,proof));
rejects(()=>candidate.compileSourceWhole('u75b7',proof.trace,proof,id,'extra'));
for(const mutate of [f=>f.root='u75b7-ue0100',f=>f.originalPenOrder.reverse(),f=>f.originalOrderBaseline[0][0].weight+=1,f=>f.originalOrderBaseline[0][0].outline+=' ',f=>f.baselineSHA256='changed',f=>f.derivedSHA256='changed',f=>f.newTailDerivations=1,f=>f.sourceCompilerPositiveCountDuringPreparation=0,f=>delete f.originalOrderBaseline,f=>f.extra=true]){
 const f=structuredClone(fixture);mutate(f);rejects(()=>candidate.validateCachedFixture(f));
}
assert.equal(candidate.cachedPositiveCallCount(),1);
assert.equal(candidate.sourceCompileCallCount(),0);assert.equal(candidate.geometryDerivationCallCount(),0);
console.log(JSON.stringify({cachedPositive:1,sourceCompilerPositiveDuringPreparation:1,runtimeSourceCompiler:0,engineRuns:0,newTailDerivations:0,pens:10,masks:13,originalPolygons:26,allMaskFieldsExactlyPermuted:true,inputPins:Object.keys(target.inputSHA256).length,negativeChecks,nativeApproval:false,HTTPRequests:0,serverStarted:false}));
