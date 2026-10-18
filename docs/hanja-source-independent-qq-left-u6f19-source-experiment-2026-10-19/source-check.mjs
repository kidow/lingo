import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as m from './candidate.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),T=json('./config.json').targets.u6f19,F=json('./fixtures.json').u6f19,P=json('./preparation.json'),proof=F.fullProof,id=m.selectedProofIdentity
for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(sha(read(f)),h,f)
for(const[f,h]of Object.entries(P.newFilesSHA256))assert.equal(sha(read(f)),h,f)
assert.equal(sha(read('./config.json')),P.configSHA256);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(proof,json(id.file))
const strokes=m.compileSourceWhole('u6f19',proof.trace,proof,id)
assert.deepEqual(strokes,F.strokes);assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.cachedPositiveCallCount(),1)
assert.deepEqual([strokes.length,strokes.flat().length,F.baseline.length,F.baseline.flat().length,F.rawBaseline.length],[14,16,14,15,15])
assert.equal(sha(JSON.stringify(strokes)),T.derivedSHA256);assert.equal(sha(JSON.stringify(F.baseline)),T.baselineSHA256)
const canonical=p=>{const o=[];for(const v of[p,[...p].reverse()])for(let i=0;i<v.length;i++)o.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return o.sort()[0]}
const polys=v=>v.flat().flatMap(mask=>[...mask.outline.matchAll(/M([^M]+)/g)].map(hit=>canonical(hit[1].replace(/\s*Z\s*$/,'').trim().split(/\s+L/).map(t=>t.trim().split(/ +/).map(Number))))).sort()
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort()
assert.equal(original.length,31);for(const v of[F.rawBaseline,F.baseline,strokes])assert.deepEqual(polys(v),original)
assert.deepEqual(F.baseline.flat(),F.rawBaseline.flat());for(let i=0;i<14;i++)if(i!==12)assert.deepEqual(strokes[i],F.baseline[i])
assert.equal(strokes[2].length,2);assert.deepEqual(proof.trace[2][0].args.slice(4,6),[36.425,184]);assert.deepEqual(proof.trace[3][0].args.slice(0,2),[32.6,150]);assert.notDeepEqual(proof.trace[2][0].args.slice(4,6),proof.trace[3][0].args.slice(0,2))
assert.deepEqual(m.sourceGroups,[[0],[1],[2,3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15]])
assert.equal(proof.trace[5][0].args.at(-1),113);assert.equal(proof.trace[7][0].args.at(-1),323);assert.equal(strokes[4].length,1);assert.equal(strokes[5].length,1)
assert.deepEqual(proof.trace[6][0].args.slice(2,4),proof.trace[7][0].args.slice(0,2));assert.deepEqual(proof.trace[14][0].args.slice(2,4),proof.trace[14][1].args.slice(0,2))
const old=F.baseline[12][0],body=strokes[12][0],tail=strokes[12][1]
assert.deepEqual({...body,outline:old.outline,bounds:old.bounds},old);assert.deepEqual(old.bounds,[60.4,61.05,79.9,94]);assert.deepEqual(body.bounds,[70.4,61.05,79.9,94])
assert.equal(tail.direction,'left');assert.equal(tail.weight,10);assert.equal(body.outline+' '+tail.outline,old.outline)
const module=read('./candidate.mjs').toString(),reference=read('../hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs').toString()
const kernel=reference.slice(reference.indexOf('  const terminalUpTail'),reference.indexOf('  return t.tailDirection')),derive=reference.slice(reference.indexOf('function derive'),reference.indexOf('export function compileProgressive'))
assert.equal(sha(kernel),'7e064978de6840034305713cc03037611a3205152c91d1c70db6c1761fdece08');assert(module.includes(kernel));assert(module.includes(derive))
const extract=s=>{const a=s.indexOf('function compileBound'),b=s.indexOf('\n  return outlines\n}',a)+'\n  return outlines\n}'.length;return s.slice(a,b)+'\n'}
const factory=extract(read('../hanja-current-source-u4f8a-2026-10-18/progressive.mjs').toString())
assert.equal(sha(factory),'4ea61b5e0ba522559dd0c5ef42a24cae29159a79ea4e38ff56a836a25d713355');assert.equal(extract(module),factory)
let negative=0;const reject=(fn,a)=>{assert.throws(()=>Reflect.apply(fn,null,a));negative++}
for(const fn of[m.compileProgressive,m.captureGeometry])for(const a of[[],[proof.trace],[proof.trace,proof],[proof.trace,proof,id,true]])reject(fn,a)
for(const k of Object.keys(id)){const q={...id};delete q[k];reject(m.compileProgressive,[proof.trace,proof,q]);reject(m.compileProgressive,[proof.trace,proof,{...id,[k]:'wrong'}])}
reject(m.compileProgressive,[proof.trace,proof,{...id,extra:true}])
for(const mutate of[p=>p.extra=true,p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineHashes['kage.js']='wrong',p=>p.engineRevision='wrong',p=>p.trace[0][0].args[0]++,p=>p.groups[0].polygons[0][0].x++]){const p=structuredClone(proof);mutate(p);reject(m.compileProgressive,[p.trace,p,id])}
reject(m.compileProgressive,[[],proof,id])
for(const a of[[],['u6f19',proof.trace,proof],['wrong',proof.trace,proof,id],['u6f19',proof.trace,proof,id,true]])reject(m.compileSourceWhole,a)
for(const a of[[],[F.baseline,proof.trace,proof],[F.baseline,proof.trace,proof,id,true],[F.baseline.slice(1),proof.trace,proof,id]])reject(m.deriveTail,a)
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.geometryDerivationCallCount(),0);assert.equal(m.nativeApproval,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,cachedPositive:1,negative,sourceGeometryGenerations:0,tailDerivations:0,engineRuns:0,exactOriginalPolygons:31,pens:14,masks:16,allMultiMaskBoundaries:F.allMultiMaskBoundaries,nativeApproval:false,runtimeApplied:false}))
