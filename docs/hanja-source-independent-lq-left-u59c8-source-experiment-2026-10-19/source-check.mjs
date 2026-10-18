import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import * as m from './candidate.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),T=json('./config.json').targets.u59c8,F=json('./fixtures.json').u59c8,P=json('./preparation.json'),proof=F.fullProof,id=m.selectedProofIdentity
for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(sha(read(f)),h,f)
for(const[f,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(read(f)),h,f)
assert.equal(sha(read('./config.json')),P.configSHA256)
assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(proof,json(id.file));assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch538-2026-10-11/draw-trace.json'));assert.equal(F.existingFull5Preserved,true)
const prior=json('../hanja-goal-glyphwiki-batch538-2026-10-11/progressive-review.json');assert.deepEqual(prior.sourceGroupsZeroBased,[[0],[1],[2],[3],[5],[6],[7],[8,9],[10]]);assert.equal(prior.progressiveFramesApproved,0);assert.deepEqual(prior.unreviewedPens,[2,3,4,5,6,7,8])
const strokes=m.compileSourceWhole('u59c8',proof.trace,proof,id)
assert.deepEqual(strokes,F.strokes);assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1)
assert.deepEqual([strokes.length,strokes.flat().length,F.baseline.length,F.baseline.flat().length,F.rawBaseline.length],[8,10,8,9,9]);assert.equal(sha(JSON.stringify(strokes)),T.derivedSHA256);assert.equal(sha(JSON.stringify(F.baseline)),T.baselineSHA256)
assert.deepEqual(F.baseline,[[F.rawBaseline[0][0],F.rawBaseline[1][0]],...F.rawBaseline.slice(2)]);assert.deepEqual(F.baseline.flat(),F.rawBaseline.flat());assert.deepEqual(m.sourceGroups,[[0,1],[2],[3],[5],[6],[7],[8,9],[10]])
assert.deepEqual(proof.trace[4],[]);assert.deepEqual(proof.groups[4].polygons,[]);assert.equal(proof.groups[4].raw[0],0);assert.equal(strokes[0].length,2);assert.deepEqual(proof.trace[0][0].args.slice(2,4),[24.97,135]);assert.deepEqual(proof.trace[1][0].args.slice(0,2),[26.66,118]);assert.notDeepEqual(proof.trace[0][0].args.slice(2,4),proof.trace[1][0].args.slice(0,2))
const canonical=p=>{const o=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)o.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return o.sort()[0]}
const polys=v=>v.flat().flatMap(mask=>[...mask.outline.matchAll(/M([^M]+)/g)].map(hit=>canonical(hit[1].replace(/\s*Z\s*$/,'').trim().split(/\s+L/).map(t=>t.trim().split(/ +/).map(Number))))).sort()
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort();assert.equal(original.length,21);for(const v of[F.rawBaseline,F.baseline,strokes])assert.deepEqual(polys(v),original)
for(let i=0;i<8;i++)if(i!==6)assert.deepEqual(strokes[i],F.baseline[i]);const old=F.baseline[6][0],body=strokes[6][0],tail=strokes[6][1];assert.deepEqual({...body,outline:old.outline},old);assert.deepEqual(body.bounds,[42.8,51.5,86.8,85]);assert.equal(tail.direction,'left');assert.equal(tail.weight,5);assert.equal(body.outline+' '+tail.outline,old.outline)
assert.deepEqual(proof.trace[8][0].args.slice(2,4),proof.trace[9][0].args.slice(0,2));assert.deepEqual(proof.trace[9][0].args.slice(2,4),proof.trace[9][1].args.slice(0,2));assert.deepEqual(proof.trace[9].at(-1).args.slice(-2),[1,514])
const module=read('./candidate.mjs').toString(),reference=read('../hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs').toString(),kernel=reference.slice(reference.indexOf('  const terminalUpTail'),reference.indexOf('  return t.tailDirection')),derive=reference.slice(reference.indexOf('function derive'),reference.indexOf('export function compileProgressive'));assert.equal(sha(kernel),'7e064978de6840034305713cc03037611a3205152c91d1c70db6c1761fdece08');assert(module.includes(kernel));assert.equal(sha(derive),'2802b789ebee4fe2f9af3903f71f26f2a9609dced9171e87ecf63aba342a8657');assert(module.includes(derive))
const extract=s=>{const a=s.indexOf('function compileBound('),b=s.indexOf('\n  return outlines\n}',a)+'\n  return outlines\n}'.length;return s.slice(a,b)+'\n'},factory=extract(read('../hanja-current-source-u4f8a-2026-10-18/progressive.mjs').toString());assert.equal(sha(factory),'4ea61b5e0ba522559dd0c5ef42a24cae29159a79ea4e38ff56a836a25d713355');assert.equal(extract(module),factory)
const boundaries={};strokes.forEach((a,i)=>{if(a.length>1)boundaries[i+1]=a.slice(1).map((_,j)=>a.slice(0,j+1).reduce((s,m)=>s+m.weight,0)/a.reduce((s,m)=>s+m.weight,0))});assert.deepEqual(boundaries,F.allMultiMaskBoundaries);assert.deepEqual(boundaries,T.allMultiMaskBoundaries)
let negative=0;const reject=(fn,a)=>{assert.throws(()=>Reflect.apply(fn,null,a));negative++}
for(const fn of[m.compileProgressive,m.captureGeometry])for(const a of[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true]])reject(fn,a)
for(const k of Object.keys(id)){const q={...id};delete q[k];reject(m.compileProgressive,[proof.trace,proof,q]);reject(m.compileProgressive,[proof.trace,proof,{...id,[k]:'wrong'}])}
reject(m.compileProgressive,[proof.trace,proof,{...id,extra:true}])
for(const mutate of[p=>p.extra=true,p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineHashes['kage.js']='wrong',p=>p.engineRevision='wrong',p=>p.trace[1][0].args[0]++,p=>p.groups[9].polygons.at(-1)[0].x++,p=>p.trace[4].push({kind:'cdDrawLine',args:[],polygons:[]})]){const p=structuredClone(proof);mutate(p);reject(m.compileProgressive,[p.trace,p,id])}
reject(m.compileProgressive,[[],proof,id])
for(const a of[[],['u59c8',proof.trace,proof],['wrong',proof.trace,proof,id],['u59c8',proof.trace,proof,id,true]])reject(m.compileSourceWhole,a)
for(const a of[[],[F.baseline,proof.trace,proof],[F.baseline,proof.trace,proof,id,true],[F.baseline.slice(1),proof.trace,proof,id]])reject(m.deriveTail,a)
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,cachedPositive:m.cachedPositiveCallCount(),negative,sourceGeometryGenerations:0,tailDerivations:0,engineRuns:0,pens:8,masks:10,exactOriginalPolygons:21,emptyRaw4Preserved:true,other7PensUnchanged:true,original9CandidateUnapprovedHistoryPreserved:true,allMultiMaskBoundaries:boundaries,nativeApproval:false,runtimeApplied:false}))
