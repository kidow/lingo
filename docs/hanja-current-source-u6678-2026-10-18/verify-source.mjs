import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as m from './progressive.mjs'
const json=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const cap=json('./sources.json'),proof=json('./engine-whole-u6678.json'),profile=json('./source-profile.json'),strokes=json('./compiled-u6678.json')
assert.equal(cap.root,'u6678');assert.equal(cap.currentBaseChangedFromArchive,true);assert.equal(profile.exactConsecutiveMinimum,13);assert.equal(profile.catalogStrokes,12);assert.equal(strokes.length,13);assert.equal(strokes.flat().length,13);assert.equal(sha(JSON.stringify(strokes)),'25f6f3c7498266e6a718a067b22aae7d671c35ad7d99bcd03f006194c0ab8db9')
for(const r of [...cap.responses,...cap.discovery]){assert.equal(sha(r.responseText),r.responseSHA256);assert.deepEqual(JSON.parse(r.responseText),r.json)}
for(const[name,p]of Object.entries(cap.providers)){const r=cap.responses.find(r=>r.lookupName===p.fixedName);assert(r);assert.equal(r.responseSHA256,p.responseSHA256);assert.equal(sha(r.json.data),p.dataSHA256);assert.equal(cap.records[name].data,r.json.data);assert.equal(String(r.json.version),p.version);for(const row of r.json.data.split('$')){const a=row.split(':');if(a[0]==='99')assert(cap.records[a[7]],a[7])}}
for(const[file,hash]of Object.entries(profile.sourcePins))assert.equal(sha(readFileSync(new URL('../../'+file,import.meta.url))),hash,file)
const canonical=p=>{const options=[];for(const v of [p,[...p].reverse()])for(let i=0;i<v.length;i++)options.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return options.sort()[0]}
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort()
const emitted=strokes.flat().flatMap(mask=>[...mask.outline.matchAll(/M([^M]+)/g)].map(hit=>canonical(hit[1].replace(/\s*Z\s*$/,'').trim().split(/\s+L/).map(t=>t.trim().split(/ +/).map(Number))))).sort()
assert.equal(original.length,24);assert.deepEqual(emitted,original)
let rejects=0;const deny=args=>{assert.throws(()=>Reflect.apply(m.compileProgressive,null,args));rejects++}
for(const a of [[],[proof.trace],[proof.trace,proof],[proof.trace,proof,m.selectedProofIdentity,0]])deny(a)
for(const key of Object.keys(m.selectedProofIdentity)){let id=structuredClone(m.selectedProofIdentity);delete id[key];deny([proof.trace,proof,id]);id=structuredClone(m.selectedProofIdentity);id[key]+='wrong';deny([proof.trace,proof,id])}
deny([proof.trace,proof,{...m.selectedProofIdentity,extra:true}])
for(const alter of [p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineRevision='wrong',p=>p.engineHashes['kage.js']='wrong',p=>p.extra=true,p=>p.trace[0][0].args[0]++,p=>p.groups[0].polygons[0][0].x++]){const p=structuredClone(proof);alter(p);deny([p.trace,p,m.selectedProofIdentity])}
deny([[],proof,m.selectedProofIdentity])
for(const a of [[],['u6678',proof.trace,proof],['wrong',proof.trace,proof,m.selectedProofIdentity],['u6678',proof.trace,proof,m.selectedProofIdentity,0]]){assert.throws(()=>Reflect.apply(m.compileSourceWhole,null,a));rejects++}
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.nativeApproved,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,strictRejections:rejects,cachedPolygonIdentity:24,sourceCompilerRuns:0,engineRuns:0,nativeApproval:false,runtimeApplied:false}))
