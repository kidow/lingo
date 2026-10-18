import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as m from './candidate.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),T=json('./config.json').targets.u90a0,F=json('./fixtures.json').u90a0,P=json('./preparation.json'),proof=F.fullProof,id=m.selectedProofIdentity
for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(sha(read(f)),h,f)
for(const[f,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(read(f)),h,f)
assert.equal(sha(read('./config.json')),P.configSHA256)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(proof,json(id.file));assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch627-2026-10-11/draw-trace.json'))
const prior=json(T.cachedBaselineFile).u90a0;assert.deepEqual(F.baseline,prior.strokes);assert.deepEqual(F.rawBaseline,prior.rawBaseline);assert.deepEqual(proof,prior.fullProof)
assert.deepEqual(proof.trace[6],[]);assert.deepEqual(proof.groups[6].polygons,[]);assert.equal(proof.groups[6].raw[0],0)
assert.deepEqual(m.sourceGroups,[[0],[1,2],[3,4],[5],[7,8],[9],[10]]);assert.deepEqual(F.baseline.flat(),F.rawBaseline.flat())
const strokes=m.compileSourceWhole('u90a0',proof.trace,proof,id)
assert.deepEqual(strokes,F.strokes);assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1)
assert.deepEqual([strokes.length,strokes.flat().length,F.baseline.length,F.baseline.flat().length],[7,9,7,8]);assert.equal(sha(JSON.stringify(strokes)),T.derivedSHA256);assert.equal(sha(JSON.stringify(F.baseline)),T.baselineSHA256)
const canonical=p=>{const o=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)o.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return o.sort()[0]}
const polys=v=>v.flat().flatMap(mask=>[...mask.outline.matchAll(/M([^M]+)/g)].map(hit=>canonical(hit[1].replace(/\s*Z\s*$/,'').trim().split(/\s+L/).map(t=>t.trim().split(/ +/).map(Number))))).sort()
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort()
assert.equal(original.length,21);for(const v of[F.rawBaseline,F.baseline,strokes])assert.deepEqual(polys(v),original)
for(let i=0;i<7;i++)if(i!==2)assert.deepEqual(strokes[i],F.baseline[i]);assert.equal(strokes[5].length,1)
assert.deepEqual(proof.trace[1][0].args.slice(2,4),[83.625,30]);assert.deepEqual(proof.trace[2][0].args.slice(0,2),[79.005,30]);assert.equal(strokes[1].length,2)
const old=F.baseline[2][0],body=strokes[2][0],tail=strokes[2][1];assert.deepEqual({...body,outline:old.outline},old);assert.deepEqual(body.bounds,[13.5,46,49.6,93.5]);assert.equal(tail.direction,'left');assert.equal(tail.weight,9);assert.equal(body.outline+' '+tail.outline,old.outline);assert.equal(body.revealWidth,14);assert.deepEqual(proof.trace[4].at(-1).polygons.at(-1),[{x:71.3,y:181,off:0},{x:71.3,y:175,off:0},{x:53.3,y:175,off:0},{x:53.3,y:178,off:0}]);assert.deepEqual(proof.trace[4].at(-1).args.slice(-2),[2,114])
const module=read('./candidate.mjs').toString(),reference=read('../hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs').toString(),kernel=reference.slice(reference.indexOf('  const terminalUpTail'),reference.indexOf('  return t.tailDirection')),derive=reference.slice(reference.indexOf('function derive'),reference.indexOf('export function compileProgressive'))
assert.equal(sha(kernel),'7e064978de6840034305713cc03037611a3205152c91d1c70db6c1761fdece08');assert(module.includes(kernel));assert.equal(sha(derive),'2802b789ebee4fe2f9af3903f71f26f2a9609dced9171e87ecf63aba342a8657');assert(module.includes(derive))
const boundaries={};strokes.forEach((a,i)=>{if(a.length>1)boundaries[i+1]=a.slice(1).map((_,j)=>a.slice(0,j+1).reduce((s,m)=>s+m.weight,0)/a.reduce((s,m)=>s+m.weight,0))});assert.deepEqual(boundaries,F.allMultiMaskBoundaries);assert.deepEqual(boundaries,T.allMultiMaskBoundaries)
let negative=0;const reject=(fn,a)=>{assert.throws(()=>Reflect.apply(fn,null,a));negative++}
for(const a of[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true]])reject(m.compileProgressive,a)
for(const k of Object.keys(id)){const q={...id};delete q[k];reject(m.compileProgressive,[proof.trace,proof,q]);reject(m.compileProgressive,[proof.trace,proof,{...id,[k]:'wrong'}])}
reject(m.compileProgressive,[proof.trace,proof,{...id,extra:true}])
for(const mutate of[p=>p.extra=true,p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineHashes['kage.js']='wrong',p=>p.engineRevision='wrong',p=>p.trace[4].at(-1).args[7]++,p=>p.groups[4].polygons.at(-1)[0].x++,p=>p.trace[6].push({kind:'cdDrawLine',args:[],polygons:[]})]){const p=structuredClone(proof);mutate(p);reject(m.compileProgressive,[p.trace,p,id])}
reject(m.compileProgressive,[[],proof,id])
for(const a of[[],['u90a0',proof.trace,proof],['wrong',proof.trace,proof,id],['u90a0',proof.trace,proof,id,true]])reject(m.compileSourceWhole,a)
for(const a of[[],[F.baseline,proof.trace,proof],[F.baseline,proof.trace,proof,id,true],[F.baseline.slice(1),proof.trace,proof,id]])reject(m.deriveTail,a)
const mutated=structuredClone(F.baseline);mutated[2][0].bounds[0]++;reject(m.deriveTail,[mutated,proof.trace,proof,id])
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,cachedPositive:1,negative,sourceGeometryGenerations:0,tailDerivations:0,engineRuns:0,exactOriginalPolygons:21,pens:7,masks:9,other6PensUnchanged:true,pen6Unchanged:true,allMultiMaskBoundaries:boundaries,nativeApproval:false,runtimeApplied:false}))
