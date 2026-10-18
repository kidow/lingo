import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as m from './candidate.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),T=json('./config.json').targets.u8f36,F=json('./fixtures.json').u8f36,P=json('./preparation.json'),proof=F.fullProof,id=m.selectedProofIdentity
for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(sha(read(f)),h,f)
for(const[f,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(read(f)),h,f)
assert.equal(sha(read('./config.json')),P.configSHA256)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(proof,json(id.file));assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch790-2026-10-13/draw-trace.json'));assert.equal(F.existingFull5Preserved,true)
const source=json('../hanja-goal-glyphwiki-batch790-2026-10-13/sources.json');assert.equal(source.root,'u8f36');assert.deepEqual(source.missing,[]);assert.deepEqual(Object.keys(source.records).sort(),['u8eca-01','u8f36','u8f36-ue0100','u914b-02']);assert.deepEqual(source.providerVersions,[]);assert.equal(Object.keys(proof.engineHashes).length,8)
const strokes=m.compileSourceWhole('u8f36',proof.trace,proof,id)
assert.deepEqual(strokes,F.strokes);assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1)
assert.deepEqual([strokes.length,strokes.flat().length,F.baseline.length,F.baseline.flat().length,F.rawBaseline.length],[16,18,16,17,17]);assert.equal(sha(JSON.stringify(strokes)),T.derivedSHA256);assert.equal(sha(JSON.stringify(F.baseline)),T.baselineSHA256)
const canonical=p=>{const o=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)o.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return o.sort()[0]}
const polys=v=>v.flat().flatMap(mask=>[...mask.outline.matchAll(/M([^M]+)/g)].map(hit=>canonical(hit[1].replace(/\s*Z\s*$/,'').trim().split(/\s+L/).map(t=>t.trim().split(/ +/).map(Number))))).sort()
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort()
assert.equal(original.length,37);for(const v of[F.rawBaseline,F.baseline,strokes])assert.deepEqual(polys(v),original)
assert.deepEqual(F.baseline,T.factoryGroupMap.map(indices=>indices.flatMap(i=>F.rawBaseline[i])));for(let i=0;i<16;i++)if(i!==13)assert.deepEqual(strokes[i],F.baseline[i])
assert.deepEqual(m.sourceGroups,[[0],[1],[2,3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13,14],[15],[16],[17],[18]]);for(const[a,b]of[[2,3],[13,14]])assert.deepEqual(proof.trace[a][0].args.slice(2,4),proof.trace[b][0].args.slice(0,2));assert.equal(strokes[2].length,1);assert.equal(strokes[11].length,1);assert.deepEqual(strokes[11],F.baseline[11]);assert.deepEqual(strokes[15],F.baseline[15]);assert.notEqual(m.sourceGroups.findIndex(a=>a.includes(14)),m.sourceGroups.findIndex(a=>a.includes(18)))
assert.equal(strokes[8].length,2);assert.deepEqual(proof.trace[9][0].args.slice(2,4),[165.7,24]);assert.deepEqual(proof.trace[10][0].args.slice(0,2),[160.6,24]);assert.notDeepEqual(proof.trace[9][0].args.slice(2,4),proof.trace[10][0].args.slice(0,2));assert.deepEqual(strokes[8],F.baseline[8])
assert.deepEqual(m.sourceGroups[13],[16]);assert.deepEqual(proof.trace[16].at(-1).args.slice(-2),[1006,5]);assert.deepEqual(proof.trace[16].at(-1).polygons.at(-1).map(p=>[p.x,p.y]),[[163.1,120.5],[165.1,99.5],[163.1,99.5],[157.6,120.5]])
const old=F.baseline[13][0],body=strokes[13][0],tail=strokes[13][1];assert.deepEqual({...body,outline:old.outline},old);assert.deepEqual(old.bounds,[70.3,28,84.3,65.75]);assert.deepEqual(body.bounds,old.bounds);assert.equal(tail.direction,'up');assert.equal(tail.weight,10.5);assert.equal(body.outline+' '+tail.outline,old.outline)
assert.deepEqual(proof.trace[1][0].args.slice(-2),[12,113]);assert.deepEqual(proof.trace[3][0].args.slice(-2),[22,123]);assert.deepEqual(proof.trace[12][0].args.slice(-2),[12,113]);assert.deepEqual(proof.trace[14][0].args.slice(-2),[22,123])
const module=read('./candidate.mjs').toString(),reference=read('../hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs').toString(),kernel=reference.slice(reference.indexOf('  const terminalUpTail'),reference.indexOf('  return t.tailDirection')),derive=reference.slice(reference.indexOf('function derive'),reference.indexOf('export function compileProgressive'))
assert.equal(sha(kernel),'7e064978de6840034305713cc03037611a3205152c91d1c70db6c1761fdece08');assert(module.includes(kernel));assert(module.includes(derive))
const extract=s=>{const a=s.indexOf('function compileBound'),b=s.indexOf('\n  return outlines\n}',a)+'\n  return outlines\n}'.length;return s.slice(a,b)+'\n'},factory=extract(read('../hanja-current-source-u4f8a-2026-10-18/progressive.mjs').toString())
assert.equal(sha(factory),'4ea61b5e0ba522559dd0c5ef42a24cae29159a79ea4e38ff56a836a25d713355');assert.equal(extract(module),factory)
const boundaries={};strokes.forEach((a,i)=>{if(a.length>1)boundaries[i+1]=a.slice(1).map((_,j)=>a.slice(0,j+1).reduce((s,m)=>s+m.weight,0)/a.reduce((s,m)=>s+m.weight,0))});assert.deepEqual(boundaries,F.allMultiMaskBoundaries);assert.deepEqual(boundaries,T.allMultiMaskBoundaries)
let negative=0;const reject=(fn,a)=>{assert.throws(()=>Reflect.apply(fn,null,a));negative++}
for(const fn of[m.compileProgressive,m.captureGeometry])for(const a of[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true]])reject(fn,a)
for(const k of Object.keys(id)){const q={...id};delete q[k];reject(m.compileProgressive,[proof.trace,proof,q]);reject(m.compileProgressive,[proof.trace,proof,{...id,[k]:'wrong'}])}
reject(m.compileProgressive,[proof.trace,proof,{...id,extra:true}])
for(const mutate of[p=>p.extra=true,p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineHashes['kage.js']='wrong',p=>p.engineRevision='wrong',p=>p.trace[9][0].args[0]++,p=>p.groups[16].polygons[0][0].x++,p=>p.trace[10][0].args[7]++,p=>p.trace[16].at(-1).args[5]++]){const p=structuredClone(proof);mutate(p);reject(m.compileProgressive,[p.trace,p,id])}
reject(m.compileProgressive,[[],proof,id]);reject(m.compileProgressive,[proof.trace,Object.assign(Object.create(null),proof),id])
for(const a of[[],['u8f36',proof.trace,proof],['wrong',proof.trace,proof,id],['u8f36',proof.trace,proof,id,true]])reject(m.compileSourceWhole,a)
for(const a of[[],[F.baseline,proof.trace,proof],[F.baseline,proof.trace,proof,id,true],[F.baseline.slice(1),proof.trace,proof,id]])reject(m.deriveTail,a)
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,cachedPositive:1,negative,sourceGeometryGenerations:0,tailDerivations:0,engineRuns:0,exactOriginalPolygons:37,other15PensUnchanged:true,bodyBoundsUnchanged:true,pens:16,masks:18,tailPen:14,tailRaw:16,allMultiMaskBoundaries:boundaries,nativeApproval:false,runtimeApplied:false}))
