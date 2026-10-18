import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import * as m from './candidate.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),T=json('./config.json').targets["u840e-k"],F=json('./fixtures.json')["u840e-k"],P=json('./preparation.json'),proof=F.fullProof,id=m.selectedProofIdentity
for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(sha(read(f)),h,f)
for(const[f,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(read(f)),h,f)
assert.equal(sha(read('./config.json')),P.configSHA256)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
const header=json(id.headerFile),body=json(id.wholeFile);assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);assert.deepEqual(proof,{engineRevision:header.engineRevision,engineHashes:header.engineHashes,groups:body.groups,trace:body.trace,defaults:body.defaults});assert.notDeepEqual(proof.trace,header.trace);assert.equal(F.archiveFull5,false);assert.equal(F.newFull5Combination,true);
const source=json('../hanja-goal-glyphwiki-batch770-2026-10-13/sources.json'),prior=json('../hanja-goal-glyphwiki-batch770-2026-10-13/review.json');assert.equal(source.glyph,"萎");assert.deepEqual(prior.dictionaryDirectionStrokes,[10]);assert.equal(prior.progressiveFramesReviewed,0);assert.equal(prior.progressiveFramesApproved,0);assert.deepEqual(prior.sourceGroupsZeroBased,[]);assert(prior.compatibleWholeRoots.includes("u840e-k"));assert.deepEqual(prior.compatibleWholeRoots,["u840e-k","u840e-ue0102"]);
const closure=[];function visit(n){if(closure.includes(n))return;closure.push(n);const d=source.records[n].data;if(d.startsWith('[[')&&d.endsWith(']]'))visit(d.slice(2,-2));else for(const row of d.split('$'))if(row.startsWith('99:'))visit(row.split(':')[7])}visit("u840e-k");assert.deepEqual(closure,["u840e-k","koseki-351650","u8279-k03","u59d4","u79be-03","u5973-04"]);assert.deepEqual(closure,T.sourceFamily.selectedRootClosure);assert.equal(Object.keys(source.records).length,11)
const strokes=m.compileSourceWhole("u840e-k",proof.trace,proof,id)
assert.deepEqual(strokes,F.strokes);assert.deepEqual(F.baseline,F.strokes);assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1)
assert.deepEqual([strokes.length,strokes.flat().length,F.rawBaseline.length],[12,13,13]);assert.equal(sha(JSON.stringify(strokes)),T.derivedSHA256);assert.equal(sha(JSON.stringify(F.baseline)),T.baselineSHA256)
assert.deepEqual(strokes,T.factoryGroupMap.map(indices=>indices.flatMap(i=>F.rawBaseline[i])));assert.deepEqual(m.sourceGroups,[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12]])
const canonical=p=>{const o=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)o.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return o.sort()[0]}
const polys=v=>v.flat().flatMap(mask=>mask.outline.split('M').slice(1).map(hit=>canonical(hit.replaceAll('Z','').trim().split(' L').map(t=>t.trim().split(' ').map(Number))))).sort()
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort();assert.equal(original.length,24);for(const v of[F.rawBaseline,F.baseline,strokes])assert.deepEqual(polys(v),original)
const end=proof.trace[9][0].args.slice(2,4),start=proof.trace[10][0].args.slice(0,2);assert.deepEqual(end,[57.72,166.952]);assert.deepEqual(start,[67.32,158.57999999999998]);assert.notDeepEqual(end,start);assert.equal(strokes[9].length,2);assert.equal(proof.trace[9][0].kind,'cdDrawLine');assert.equal(proof.trace[10][0].kind,'cdDrawCurve')
for(const[a,b]of [])assert.deepEqual(proof.trace[a][0].args.slice(proof.trace[a][0].kind==='cdDrawLine'?2:4,proof.trace[a][0].kind==='cdDrawLine'?4:6),proof.trace[b][0].args.slice(0,2))
const module=read('./candidate.mjs').toString(),extract=s=>{const a=s.indexOf('function compileBound('),b=s.indexOf('\n  return outlines\n}',a)+'\n  return outlines\n}'.length;return s.slice(a,b)+'\n'},factory=extract(read('../hanja-current-source-u4f8a-2026-10-18/progressive.mjs').toString());assert.equal(sha(factory),'4ea61b5e0ba522559dd0c5ef42a24cae29159a79ea4e38ff56a836a25d713355');assert.equal(extract(module),factory)
const boundaries={};strokes.forEach((a,i)=>{if(a.length>1)boundaries[i+1]=a.slice(1).map((_,j)=>a.slice(0,j+1).reduce((s,m)=>s+m.weight,0)/a.reduce((s,m)=>s+m.weight,0))});assert.deepEqual(boundaries,F.allMultiMaskBoundaries);assert.deepEqual(boundaries,T.allMultiMaskBoundaries)
let negative=0;const reject=(fn,a)=>{assert.throws(()=>Reflect.apply(fn,null,a));negative++}
for(const fn of[m.compileProgressive,m.captureGeometry])for(const a of[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true]])reject(fn,a)
for(const k of Object.keys(id)){const q={...id};delete q[k];reject(m.compileProgressive,[proof.trace,proof,q]);reject(m.compileProgressive,[proof.trace,proof,{...id,[k]:'wrong'}])}
reject(m.compileProgressive,[proof.trace,proof,{...id,extra:true}])
for(const mutate of[p=>p.extra=true,p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineHashes['kage.js']='wrong',p=>p.engineRevision='wrong',p=>p.trace[10][0].args[0]++,p=>p.groups[10].polygons[0][0].x++,p=>p.trace[9][0].args[5]++]){const p=structuredClone(proof);mutate(p);reject(m.compileProgressive,[p.trace,p,id])}
reject(m.compileProgressive,[[],proof,id]);reject(m.compileProgressive,[proof.trace,Object.assign(Object.create(null),proof),id])
for(const a of[[],["u840e-k",proof.trace,proof],['wrong',proof.trace,proof,id],["u840e-k",proof.trace,proof,id,true]])reject(m.compileSourceWhole,a)
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,cachedPositive:1,negative,sourceGeometryGenerations:0,tailDerivations:0,engineRuns:0,pens:12,masks:13,exactOriginalPolygons:24,allMaskFieldsPreservedUnderExactRefGroups:true,selectedRootClosure:closure,onlyOriginalDomesticDirectionObserved:10,allMultiMaskBoundaries:boundaries,nativeApproval:false,runtimeApplied:false}))
