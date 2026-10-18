import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import * as m from './candidate.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),T=json('./config.json').targets['u7468-k'],F=json('./fixtures.json')['u7468-k'],P=json('./preparation.json'),proof=F.fullProof,id=m.selectedProofIdentity
for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(sha(read(f)),h,f)
for(const[f,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(read(f)),h,f)
assert.equal(sha(read('./config.json')),P.configSHA256)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(proof,json(id.file));assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch281-2026-10-05/draw-trace.json'));assert.equal(F.existingFull5Preserved,true)
assert.deepEqual(json('../hanja-goal-glyphwiki-batch281-2026-10-05/metadata.json').sourceGroups,m.sourceGroups);assert.deepEqual(json('../hanja-goal-glyphwiki-batch281-2026-10-05/review.json').sourceGroupsProvisional,m.sourceGroups)
const strokes=m.compileSourceWhole('u7468-k',proof.trace,proof,id)
assert.deepEqual(strokes,F.strokes);assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1)
assert.deepEqual([strokes.length,strokes.flat().length,F.rawBaseline.length],[14,16,16]);assert.equal(sha(JSON.stringify(strokes)),T.derivedSHA256);assert.equal(sha(JSON.stringify(F.baseline)),T.baselineSHA256);assert.deepEqual(F.baseline,F.strokes)
const b=F.rawBaseline,expected=[b[0],b[2],b[1],b[3],b[4],[b[5][0],b[6][0]],b[7],[b[8][0],b[9][0]],b[10],b[11],b[12],b[13],b[14],b[15]]
assert.deepEqual(strokes,expected);assert.deepEqual(m.sourceGroups,[[0],[2],[1],[3],[4],[5,6],[7],[8,9],[10],[11],[12],[13,14],[15],[16]])
const canonical=p=>{const out=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)out.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return out.sort()[0]}
const polys=v=>v.flat().flatMap(mask=>[...mask.outline.matchAll(/M([^M]+)/g)].map(hit=>canonical(hit[1].replace(/\s*Z\s*$/,'').trim().split(/\s+L/).map(t=>t.trim().split(/ +/).map(Number))))).sort()
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort()
assert.equal(original.length,34);for(const v of[F.rawBaseline,F.baseline,strokes])assert.deepEqual(polys(v),original)
for(const[a,z]of[[5,6],[8,9]])assert.notDeepEqual(proof.trace[a][0].args.slice(4,6),proof.trace[z][0].args.slice(0,2))
assert.deepEqual(proof.trace[5][0].args.slice(4,6),[89.5105,77.16]);assert.deepEqual(proof.trace[6][0].args.slice(0,2),[78.877,78.44]);assert.deepEqual(proof.trace[8][0].args.slice(4,6),[140.315,77.16]);assert.deepEqual(proof.trace[9][0].args.slice(0,2),[131.45375,78.44]);assert.equal(strokes[5].length,2);assert.equal(strokes[7].length,2)
assert.deepEqual(proof.trace[13][0].args.slice(2,4),proof.trace[14][0].args.slice(0,2));assert.deepEqual(proof.trace[12][0].args.slice(-2),[12,113]);assert.deepEqual(proof.trace[14][0].args.slice(-2),[22,123]);assert.equal(strokes[10].length,1);assert.equal(strokes[11].length,1)
const module=read('./candidate.mjs').toString(),extract=s=>{const a=s.indexOf('function compileBound('),b=s.indexOf('\n  return outlines\n}',a)+'\n  return outlines\n}'.length;return s.slice(a,b)+'\n'},factory=extract(read('../hanja-current-source-u4f8a-2026-10-18/progressive.mjs').toString());assert.equal(sha(factory),'4ea61b5e0ba522559dd0c5ef42a24cae29159a79ea4e38ff56a836a25d713355');assert.equal(extract(module),factory)
const boundaries={};strokes.forEach((a,i)=>{if(a.length>1)boundaries[i+1]=a.slice(1).map((_,j)=>a.slice(0,j+1).reduce((s,m)=>s+m.weight,0)/a.reduce((s,m)=>s+m.weight,0))});assert.deepEqual(boundaries,F.allMultiMaskBoundaries);assert.deepEqual(boundaries,T.allMultiMaskBoundaries)
let negative=0;const reject=(fn,a)=>{assert.throws(()=>Reflect.apply(fn,null,a));negative++}
for(const fn of[m.compileProgressive,m.captureGeometry])for(const a of[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true]])reject(fn,a)
for(const k of Object.keys(id)){const q={...id};delete q[k];reject(m.compileProgressive,[proof.trace,proof,q]);reject(m.compileProgressive,[proof.trace,proof,{...id,[k]:'wrong'}])}
reject(m.compileProgressive,[proof.trace,proof,{...id,extra:true}])
for(const mutate of[p=>p.extra=true,p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineHashes['kage.js']='wrong',p=>p.engineRevision='wrong',p=>p.trace[5][0].args[0]++,p=>p.groups[6].polygons[0][0].x++,p=>p.trace[9][0].args[7]++]){const p=structuredClone(proof);mutate(p);reject(m.compileProgressive,[p.trace,p,id])}
reject(m.compileProgressive,[[],proof,id]);reject(m.compileProgressive,[proof.trace,Object.assign(Object.create(null),proof),id])
for(const a of[[],['u7468-k',proof.trace,proof],['wrong',proof.trace,proof,id],['u7468-k',proof.trace,proof,id,true]])reject(m.compileSourceWhole,a)
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,cachedPositive:m.cachedPositiveCallCount(),negative,sourceGeometryGenerations:0,tailDerivations:0,engineRuns:0,pens:14,masks:16,exactOriginalPolygons:34,allMaskFieldsPreservedUnderOriginalJadeOrder:true,allMultiMaskBoundaries:boundaries,nativeApproval:false,runtimeApplied:false}))
