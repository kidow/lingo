import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as m from './candidate.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),T=json('./config.json').targets['u84c0-k'],F=json('./fixtures.json')['u84c0-k'],P=json('./preparation.json'),proof=F.fullProof,id=m.selectedProofIdentity
for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(sha(read(f)),h,f)
for(const[f,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(read(f)),h,f)
assert.equal(sha(read('./config.json')),P.configSHA256)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(Object.keys(json(id.headerFile)).sort(),['defaults','engineHashes','engineRevision','groups']);assert.deepEqual(proof,{...json(id.headerFile),trace:json(id.traceFile)})
assert.equal(F.archiveFull5WholeIdentity,false);assert.equal(F.archiveOnly,true);assert.equal(F.fixedSnapshotOnly,true);assert.equal(F.currentAlternativeUsed,false)
const source=json(id.sourceFile);assert.equal(source.root,'u84c0-k');assert.deepEqual(source.missing,[]);assert.equal(Object.keys(source.records).length,8);assert.deepEqual(source.providerVersions,[])
const strokes=m.compileSourceWhole('u84c0-k',proof.trace,proof,id)
assert.deepEqual(strokes,F.strokes);assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1)
assert.deepEqual([strokes.length,strokes.flat().length,F.baseline.length,F.baseline.flat().length,F.rawBaseline.length],[14,17,14,16,16]);assert.equal(sha(JSON.stringify(strokes)),T.derivedSHA256);assert.equal(sha(JSON.stringify(F.baseline)),T.baselineSHA256)
const canonical=p=>{const o=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)o.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return o.sort()[0]}
const polys=v=>v.flat().flatMap(mask=>[...mask.outline.matchAll(/M([^M]+)/g)].map(hit=>canonical(hit[1].replace(/\s*Z\s*$/,'').trim().split(/\s+L/).map(t=>t.trim().split(/ +/).map(Number))))).sort()
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort()
assert.equal(original.length,41);for(const v of[F.rawBaseline,F.baseline,strokes])assert.deepEqual(polys(v),original)
assert.deepEqual(F.baseline,T.factoryGroupMap.map(indices=>indices.flatMap(i=>F.rawBaseline[i])));for(let i=0;i<14;i++)if(i!==5)assert.deepEqual(strokes[i],F.baseline[i])
assert.deepEqual(m.sourceGroups,[[0],[1],[3],[2],[4,5],[6],[7],[8],[9,10],[11,12],[13],[14],[15],[16]]);assert.deepEqual(m.sourceGroups.slice(0,4),[[0],[1],[3],[2]]);assert.deepEqual(proof.trace[4][0].args.slice(2,4),proof.trace[5][0].args.slice(0,2));assert.equal(F.baseline[4].length,1)
for(const[p,a,b]of[[8,9,10],[9,11,12]]){assert.equal(strokes[p].length,2);assert.notDeepEqual(proof.trace[a][0].args.slice(4,6),proof.trace[b][0].args.slice(0,2));assert.deepEqual(strokes[p],F.baseline[p])}
assert.deepEqual(proof.groups[6].raw.slice(1,3),[0,304]);assert.deepEqual(proof.trace[6].at(-1).args.slice(-2),[1,314])
const old=F.baseline[5][0],body=strokes[5][0],tail=strokes[5][1];assert.deepEqual({...body,outline:old.outline,bounds:old.bounds},old);assert.deepEqual(old.bounds,[13.65,43.9,30.15,93.5]);assert.deepEqual(body.bounds,[20.65,43.9,30.15,93.5]);assert.equal(tail.direction,'left');assert.equal(tail.weight,7);assert.equal(body.outline+' '+tail.outline,old.outline)
const module=read('./candidate.mjs').toString(),reference=read('../hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs').toString(),kernel=reference.slice(reference.indexOf('  const terminalUpTail'),reference.indexOf('  return t.tailDirection')),derive=reference.slice(reference.indexOf('function derive'),reference.indexOf('export function compileProgressive'))
assert.equal(sha(kernel),'7e064978de6840034305713cc03037611a3205152c91d1c70db6c1761fdece08');assert(module.includes(kernel));assert(module.includes(derive))
const extract=s=>{const a=s.indexOf('function compileBound'),b=s.indexOf('\n  return outlines\n}',a)+'\n  return outlines\n}'.length;return s.slice(a,b)+'\n'},factory=extract(read('../hanja-current-source-u4f8a-2026-10-18/progressive.mjs').toString())
assert.equal(sha(factory),'4ea61b5e0ba522559dd0c5ef42a24cae29159a79ea4e38ff56a836a25d713355');assert.equal(extract(module),factory)
let negative=0;const reject=(fn,a)=>{assert.throws(()=>Reflect.apply(fn,null,a));negative++}
for(const fn of[m.compileProgressive,m.captureGeometry])for(const a of[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true]])reject(fn,a)
for(const k of Object.keys(id)){const q={...id};delete q[k];reject(m.compileProgressive,[proof.trace,proof,q]);reject(m.compileProgressive,[proof.trace,proof,{...id,[k]:'wrong'}])}
reject(m.compileProgressive,[proof.trace,proof,{...id,extra:true}])
for(const mutate of[p=>p.extra=true,p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineHashes['kage.js']='wrong',p=>p.engineRevision='wrong',p=>p.trace[0][0].args[0]++,p=>p.groups[0].polygons[0][0].x++]){const p=structuredClone(proof);mutate(p);reject(m.compileProgressive,[p.trace,p,id])}
reject(m.compileProgressive,[[],proof,id])
for(const a of[[],['u84c0-k',proof.trace,proof],['wrong',proof.trace,proof,id],['u84c0-k',proof.trace,proof,id,true]])reject(m.compileSourceWhole,a)
for(const a of[[],[F.baseline,proof.trace,proof],[F.baseline,proof.trace,proof,id,true],[F.baseline.slice(1),proof.trace,proof,id]])reject(m.deriveTail,a)
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,cachedPositive:1,negative,sourceGeometryGenerations:0,tailDerivations:0,engineRuns:0,exactOriginalPolygons:41,other13PensUnchanged:true,activeBodyBoundsChanged:true,pens:14,masks:17,allMultiMaskBoundaries:F.allMultiMaskBoundaries,nativeApproval:false,runtimeApplied:false}))
