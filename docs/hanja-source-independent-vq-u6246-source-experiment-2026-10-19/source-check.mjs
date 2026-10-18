import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as m from './candidate.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),T=json('./config.json').targets.u6246,F=json('./fixtures.json').u6246,P=json('./preparation.json'),proof=F.fullProof,id=m.selectedProofIdentity
for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(sha(read(f)),h,f)
for(const[f,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(read(f)),h,f)
assert.equal(sha(read('./config.json')),P.configSHA256)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(proof,json(id.file));assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch804-2026-10-13/draw-trace.json'));assert.equal(F.existingFull5Preserved,true)
const source=json('../hanja-goal-glyphwiki-batch804-2026-10-13/sources.json');assert.equal(source.root,'u6246');assert.deepEqual(source.missing,[]);assert.equal(Object.keys(source.records).length,10);assert.deepEqual(source.providerVersions,[]);assert.equal(Object.keys(proof.engineHashes).length,8);const closure=[];function visit(n){if(closure.includes(n))return;closure.push(n);for(const row of source.records[n].data.split('$'))if(row.startsWith('99:'))visit(row.split(':')[7])}visit('u6246');assert.deepEqual(closure,['u6246','u6236-10','u8863']);assert.deepEqual(closure,T.sourceFamily.selectedRootClosure)
const strokes=m.compileSourceWhole('u6246',proof.trace,proof,id)
assert.deepEqual(strokes,F.strokes);assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1)
assert.deepEqual([strokes.length,strokes.flat().length,F.rawBaseline.length],[10,11,11]);assert.equal(sha(JSON.stringify(strokes)),T.derivedSHA256);assert.equal(sha(JSON.stringify(F.baseline)),T.baselineSHA256);assert.deepEqual(F.baseline,F.strokes)
assert.deepEqual(strokes,T.factoryGroupMap.map(indices=>indices.flatMap(i=>F.rawBaseline[i])));assert.deepEqual(m.sourceGroups,[[4],[1,2],[3],[0],[5],[6],[7],[8,9],[10],[11]]);assert.deepEqual(m.sourceGroups.slice(0,4),[[4],[1,2],[3],[0]]);assert.deepEqual(m.sourceGroups.slice(4),[[5],[6],[7],[8,9],[10],[11]])
const canonical=p=>{const o=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)o.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return o.sort()[0]}
const polys=v=>v.flat().flatMap(mask=>[...mask.outline.matchAll(/M([^M]+)/g)].map(hit=>canonical(hit[1].replace(/\s*Z\s*$/,'').trim().split(/\s+L/).map(t=>t.trim().split(/ +/).map(Number))))).sort()
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort()
assert.equal(original.length,25);for(const v of[F.rawBaseline,F.baseline,strokes])assert.deepEqual(polys(v),original)
assert.deepEqual(proof.trace[1][0].args.slice(2,4),proof.trace[2][0].args.slice(0,2));assert.equal(strokes[1].length,1);assert.deepEqual(proof.trace[4][0].args.slice(4,6),proof.trace[0][0].args.slice(0,2));assert.notEqual(m.sourceGroups.findIndex(a=>a.includes(4)),m.sourceGroups.findIndex(a=>a.includes(0)));assert.notEqual(m.sourceGroups.findIndex(a=>a.includes(5)),m.sourceGroups.findIndex(a=>a.includes(7)))
assert.equal(strokes[7].length,2);assert.deepEqual(proof.trace[8][0].args.slice(2,4),[78.935,173.8]);assert.deepEqual(proof.trace[9][0].args.slice(0,2),[48.875,181]);assert.notDeepEqual(proof.trace[8][0].args.slice(2,4),proof.trace[9][0].args.slice(0,2));assert.equal(Math.hypot(48.875-78.935,181-173.8),T.independentMaskPolicies[0].gap)
assert.deepEqual(proof.trace[2][0].args.slice(-2),[22,123]);assert.equal(proof.trace[0].length,2);assert.equal(m.geometryDerivationCallCount(),0)
const module=read('./candidate.mjs').toString(),extract=s=>{const a=s.indexOf('function compileBound'),b=s.indexOf('\n  return outlines\n}',a)+'\n  return outlines\n}'.length;return s.slice(a,b)+'\n'},factory=extract(read('../hanja-current-source-u4f8a-2026-10-18/progressive.mjs').toString())
assert.equal(sha(factory),'4ea61b5e0ba522559dd0c5ef42a24cae29159a79ea4e38ff56a836a25d713355');assert.equal(extract(module),factory)
const boundaries={};strokes.forEach((a,i)=>{if(a.length>1)boundaries[i+1]=a.slice(1).map((_,j)=>a.slice(0,j+1).reduce((s,m)=>s+m.weight,0)/a.reduce((s,m)=>s+m.weight,0))});assert.deepEqual(boundaries,F.allMultiMaskBoundaries);assert.deepEqual(boundaries,T.allMultiMaskBoundaries)
let negative=0;const reject=(fn,a)=>{assert.throws(()=>Reflect.apply(fn,null,a));negative++}
for(const fn of[m.compileProgressive,m.captureGeometry])for(const a of[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true]])reject(fn,a)
for(const k of Object.keys(id)){const q={...id};delete q[k];reject(m.compileProgressive,[proof.trace,proof,q]);reject(m.compileProgressive,[proof.trace,proof,{...id,[k]:'wrong'}])}
reject(m.compileProgressive,[proof.trace,proof,{...id,extra:true}])
for(const mutate of[p=>p.extra=true,p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineHashes['kage.js']='wrong',p=>p.engineRevision='wrong',p=>p.trace[8][0].args[0]++,p=>p.groups[9].polygons[0][0].x++,p=>p.trace[9][0].args[7]++]){const p=structuredClone(proof);mutate(p);reject(m.compileProgressive,[p.trace,p,id])}
reject(m.compileProgressive,[[],proof,id]);reject(m.compileProgressive,[proof.trace,Object.assign(Object.create(null),proof),id])
for(const a of[[],['u6246',proof.trace,proof],['wrong',proof.trace,proof,id],['u6246',proof.trace,proof,id,true]])reject(m.compileSourceWhole,a)
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,cachedPositive:1,negative,sourceGeometryGenerations:0,tailDerivations:0,engineRuns:0,exactOriginalPolygons:25,allMaskFieldsPreservedUnderExactRefGroups:true,pens:10,masks:11,selectedRootClosure:closure,allMultiMaskBoundaries:boundaries,nativeApproval:false,runtimeApplied:false}))
