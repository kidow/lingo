import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as m from './candidate.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),T=json('./config.json').targets.u90a0,F=json('./fixtures.json').u90a0,P=json('./preparation.json'),proof=F.fullProof,id=m.selectedProofIdentity
for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(sha(read(f)),h,f)
for(const[f,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(read(f)),h,f)
assert.equal(sha(read('./config.json')),P.configSHA256)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(proof,json(id.file))
const strokes=m.compileSourceWhole('u90a0',proof.trace,proof,id)
assert.deepEqual(strokes,F.strokes);assert.deepEqual(strokes,F.baseline);assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1)
assert.deepEqual([strokes.length,strokes.flat().length,F.rawBaseline.length],[7,8,8]);assert.equal(sha(JSON.stringify(strokes)),T.derivedSHA256);assert.equal(T.baselineSHA256,T.derivedSHA256)
const canonical=p=>{const o=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)o.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return o.sort()[0]}
const polys=v=>v.flat().flatMap(mask=>[...mask.outline.matchAll(/M([^M]+)/g)].map(hit=>canonical(hit[1].replace(/\s*Z\s*$/,'').trim().split(/\s+L/).map(t=>t.trim().split(/ +/).map(Number))))).sort()
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort()
assert.equal(original.length,21);for(const v of[F.rawBaseline,F.baseline,strokes])assert.deepEqual(polys(v),original)
assert.deepEqual(strokes.flat(),F.rawBaseline.flat())
assert.deepEqual(proof.trace[6],[]);assert.deepEqual(proof.groups[6].polygons,[]);assert.equal(proof.groups[6].raw[0],0)
assert.deepEqual(T.factorySourceGroups,[[0],[1],[2],[3,4],[5],[6,7,8],[9],[10]])
assert.deepEqual(m.sourceGroups,[[0],[1,2],[3,4],[5],[7,8],[9],[10]])
assert.equal(strokes[1].length,2);assert.deepEqual(proof.trace[1][0].args.slice(2,4),[83.625,30]);assert.deepEqual(proof.trace[2][0].args.slice(0,2),[79.005,30])
assert.notDeepEqual(proof.trace[1][0].args.slice(2,4),proof.trace[2][0].args.slice(0,2))
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
for(const[a,b]of[[3,4],[7,8]])assert.deepEqual(endpoint(proof.trace[a].at(-1)),proof.trace[b][0].args.slice(0,2))
for(const r of[4,9])assert.deepEqual(endpoint(proof.trace[r][0]),proof.trace[r][1].args.slice(0,2))
assert.equal(proof.trace[4][1].args.at(-1),114);assert.equal(proof.trace[9][1].args.at(-1),414)
assert.equal(strokes[2].length,1);assert.equal(strokes[5].length,1)
assert.deepEqual(endpoint(proof.trace[8][0]),[145,84]);assert.deepEqual(proof.trace[9][0].args.slice(0,2),[145,83])
const module=read('./candidate.mjs').toString(),extract=s=>{const a=s.indexOf('function compileBound'),b=s.indexOf('\n  return outlines\n}',a)+'\n  return outlines\n}'.length;return s.slice(a,b)+'\n'},factory=extract(read('../hanja-current-source-u4f8a-2026-10-18/progressive.mjs').toString())
assert.equal(sha(factory),'4ea61b5e0ba522559dd0c5ef42a24cae29159a79ea4e38ff56a836a25d713355');assert.equal(extract(module),factory)
assert(module.includes('UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]'));assert(!module.includes('function derive('))
let negative=0;const reject=(fn,a)=>{assert.throws(()=>Reflect.apply(fn,null,a));negative++}
for(const fn of[m.compileProgressive,m.captureGeometry])for(const a of[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true]])reject(fn,a)
for(const k of Object.keys(id)){const q={...id};delete q[k];reject(m.compileProgressive,[proof.trace,proof,q]);reject(m.compileProgressive,[proof.trace,proof,{...id,[k]:'wrong'}])}
reject(m.compileProgressive,[proof.trace,proof,{...id,extra:true}])
for(const mutate of[p=>p.extra=true,p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineHashes['kage.js']='wrong',p=>p.engineRevision='wrong',p=>p.trace[0][0].args[0]++,p=>p.groups[0].polygons[0][0].x++]){const p=structuredClone(proof);mutate(p);reject(m.compileProgressive,[p.trace,p,id])}
reject(m.compileProgressive,[[],proof,id])
for(const a of[[],['u90a0',proof.trace,proof],['wrong',proof.trace,proof,id],['u90a0',proof.trace,proof,id,true]])reject(m.compileSourceWhole,a)
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,cachedPositive:1,negative,sourceGeometryGenerations:0,tailDerivations:0,engineRuns:0,exactOriginalPolygons:21,pens:7,masks:8,emptyRaw6Preserved:true,allMultiMaskBoundaries:F.allMultiMaskBoundaries,nativeApproval:false,runtimeApplied:false}))
