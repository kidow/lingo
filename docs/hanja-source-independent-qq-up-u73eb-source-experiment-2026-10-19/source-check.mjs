import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import * as m from './candidate.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),T=json('./config.json').targets.u73eb,F=json('./fixtures.json').u73eb,P=json('./preparation.json'),proof=F.fullProof,id=m.selectedProofIdentity
for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(sha(read(f)),h,f)
for(const[f,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(read(f)),h,f)
assert.equal(sha(read('./config.json')),P.configSHA256)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.deepEqual(proof,json(id.file));assert.deepEqual(proof,json('../hanja-goal-glyphwiki-batch942-2026-10-13/engine-proof.json'))
assert.equal(F.existingFull5Preserved,true);assert.equal(F.archiveFull5,true)
const old='../hanja-goal-glyphwiki-batch942-2026-10-13/',source=json(old+'sources.json'),prior=json(old+'native-hold.json')
assert.equal(source.glyph,'珫');assert.equal(prior.selectedWhole,'u73eb-g');assert.equal(prior.nativeObservation.selectedWholeCompatible,false);assert.equal(prior.nativeObservation.baseAlternative.nativeApproval,false);assert.deepEqual(prior.nativeObservation.directionsCompared,[2,3,5,6])
const roots=Object.fromEntries(['u73eb','u73eb-g'].map(n=>[n,source.records[n].data.split('$').filter(r=>r.startsWith('99:')).map(r=>r.split(':')[7])]))
assert.equal(roots.u73eb[0],'u738b-01');assert.equal(roots['u73eb-g'][0],'u738b-01')
assert.equal(proof.trace[1][0].kind,'cdDrawLine');assert.equal(proof.trace[1][0].args[0],proof.trace[1][0].args[2]);assert.equal(proof.trace[2][0].args[1],proof.trace[2][0].args[3])
assert.equal(prior.nativeObservation.mismatches[0].domestic,'Jade radical pen2 is the middle horizontal; pen3 is vertical.')
const closure=[];function visit(n){if(closure.includes(n))return;closure.push(n);for(const row of source.records[n].data.split('$'))if(row.startsWith('99:'))visit(row.split(':')[7])}visit('u73eb');assert.deepEqual(closure,['u73eb','u738b-01','u5145-02']);assert.deepEqual(closure,T.sourceFamily.selectedRootClosure);assert.equal(Object.keys(source.records).length,5)
const strokes=m.compileSourceWhole('u73eb',proof.trace,proof,id)
assert.deepEqual(strokes,F.strokes);assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1)
assert.deepEqual([strokes.length,strokes.flat().length,F.rawBaseline.length,F.baseline.flat().length],[10,12,11,11]);assert.equal(sha(JSON.stringify(strokes)),T.derivedSHA256);assert.equal(sha(JSON.stringify(F.baseline)),T.baselineSHA256)
assert.deepEqual(F.baseline,T.factoryGroupMap.map(indices=>indices.flatMap(i=>F.rawBaseline[i])));assert.deepEqual(m.sourceGroups,[[0],[2],[1],[3],[4],[5],[6,7],[8],[9],[10]]);assert.deepEqual(T.originalPenOrder,[1,3,2,4,5,6,7,8,9,10])
const canonical=p=>{const o=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)o.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return o.sort()[0]}
const polys=v=>v.flat().flatMap(mask=>mask.outline.split('M').slice(1).map(hit=>canonical(hit.replaceAll('Z','').trim().split(' L').map(t=>t.trim().split(' ').map(Number))))).sort()
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort();assert.equal(original.length,32);for(const v of[F.rawBaseline,F.baseline,strokes])assert.deepEqual(polys(v),original)
assert.equal(proof.trace[6][0].kind,'cdDrawCurve');assert.equal(proof.trace[7][0].kind,'cdDrawCurve');assert.deepEqual(proof.trace[6][0].args.slice(4,6),[100.8,97]);assert.deepEqual(proof.trace[7][0].args.slice(0,2),[84.3,101]);assert.equal(strokes[6].length,2);assert.deepEqual(strokes[6],F.baseline[6])
for(let i=0;i<10;i++)if(i!==9)assert.deepEqual(strokes[i],F.baseline[i])
const before=F.baseline[9][0],bodyMask=strokes[9][0],tail=strokes[9][1];assert.equal(before.outline,bodyMask.outline+' '+tail.outline);for(const k of Object.keys(before))if(k!=='outline')assert.deepEqual(bodyMask[k],before[k]);assert.deepEqual(bodyMask.bounds,[69.95,52,94.1,93]);assert.equal(tail.direction,'up');assert.equal(tail.weight,12.5)
const module=read('./candidate.mjs').toString(),extract=s=>{const a=s.indexOf('function compileBound('),b=s.indexOf('\n  return outlines\n}',a)+'\n  return outlines\n}'.length;return s.slice(a,b)+'\n'},factory=extract(read('../hanja-current-source-u4f8a-2026-10-18/progressive.mjs').toString());assert.equal(sha(factory),'4ea61b5e0ba522559dd0c5ef42a24cae29159a79ea4e38ff56a836a25d713355');assert.equal(extract(module),factory)
const reference=read('../hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs').toString(),kernel=reference.slice(reference.indexOf('  const terminalUpTail'),reference.indexOf('  return t.tailDirection')),partition=reference.slice(reference.indexOf('function derive'),reference.indexOf('export function compileProgressive'));assert.equal(sha(kernel),'7e064978de6840034305713cc03037611a3205152c91d1c70db6c1761fdece08');assert(module.includes(kernel));assert.equal(sha(partition),'2802b789ebee4fe2f9af3903f71f26f2a9609dced9171e87ecf63aba342a8657');assert(module.includes(partition))
const boundaries={};strokes.forEach((a,i)=>{if(a.length>1)boundaries[i+1]=a.slice(1).map((_,j)=>a.slice(0,j+1).reduce((s,m)=>s+m.weight,0)/a.reduce((s,m)=>s+m.weight,0))});assert.deepEqual(boundaries,F.allMultiMaskBoundaries);assert.deepEqual(boundaries,T.allMultiMaskBoundaries)
let negative=0;const reject=(fn,a)=>{assert.throws(()=>Reflect.apply(fn,null,a));negative++}
for(const fn of[m.compileProgressive,m.captureGeometry])for(const a of[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true]])reject(fn,a)
for(const k of Object.keys(id)){const q={...id};delete q[k];reject(m.compileProgressive,[proof.trace,proof,q]);reject(m.compileProgressive,[proof.trace,proof,{...id,[k]:'wrong'}])}
reject(m.compileProgressive,[proof.trace,proof,{...id,extra:true}])
for(const mutate of[p=>p.extra=true,p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineHashes['kage.js']='wrong',p=>p.engineRevision='wrong',p=>p.trace[7][0].args[0]++,p=>p.groups[7].polygons[0][0].x++,p=>p.trace[6][0].args[5]++]){const p=structuredClone(proof);mutate(p);reject(m.compileProgressive,[p.trace,p,id])}
reject(m.compileProgressive,[[],proof,id]);reject(m.compileProgressive,[proof.trace,Object.assign(Object.create(null),proof),id])
for(const a of[[],['u73eb',proof.trace,proof],['wrong',proof.trace,proof,id],['u73eb',proof.trace,proof,id,true]])reject(m.compileSourceWhole,a)
for(const a of[[],[F.baseline,proof.trace,proof],[F.baseline,proof.trace,proof,id,true],[[],proof.trace,proof,id]])reject(m.deriveTail,a)
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,cachedPositive:1,negative,sourceGeometryGenerations:0,tailDerivations:0,engineRuns:0,pens:10,masks:12,exactOriginalPolygons:32,allNonTargetMaskFieldsPreserved:true,targetBodyGuideWidthWeightBoundsUnchanged:true,selectedRootClosure:closure,baseNativeApproved:false,GNativeFailurePreserved:true,allMultiMaskBoundaries:boundaries,nativeApproval:false,runtimeApplied:false}))
