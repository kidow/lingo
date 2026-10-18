import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as m from './progressive.mjs'
const json=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const cap=json('./sources.json'),proof=json('./engine-whole-u4f8a.json'),profile=json('./source-profile.json'),strokes=json('./compiled-u4f8a.json')
assert.equal(cap.root,'u4f8a');assert.equal(cap.currentBaseChangedFromArchive,true);assert.equal(profile.rawCount,8);assert.equal(profile.catalogStrokes,8);assert.equal(strokes.length,8);assert.equal(strokes.flat().length,8);assert.equal(sha(JSON.stringify(strokes)),'dd2541ae875ae0620e968e76c7e861ed03282e9b0e499d92529f8a453858ab31')
for(const r of [...cap.responses,...cap.discovery]){assert.equal(sha(r.responseText),r.responseSHA256);assert.deepEqual(JSON.parse(r.responseText),r.json)}
for(const[name,p]of Object.entries(cap.providers)){const r=cap.responses.find(r=>r.lookupName===p.fixedName);assert(r);assert.equal(r.responseSHA256,p.responseSHA256);assert.equal(sha(r.json.data),p.dataSHA256);assert.equal(cap.records[name].data,r.json.data);assert.equal(String(r.json.version),p.version);for(const row of r.json.data.split('$')){const a=row.split(':');if(a[0]==='99')assert(cap.records[a[7]],a[7])}}
for(const[file,hash]of Object.entries(profile.sourcePins))assert.equal(sha(readFileSync(new URL('../../'+file,import.meta.url))),hash,file)
const canonical=p=>{const options=[];for(const v of [p,[...p].reverse()])for(let i=0;i<v.length;i++)options.push(JSON.stringify([...v.slice(i),...v.slice(0,i)]));return options.sort()[0]}
const original=proof.groups.flatMap(g=>g.polygons).map(p=>canonical(p.map(q=>[q.x/2,q.y/2]))).sort()
const emitted=strokes.flat().flatMap(mask=>[...mask.outline.matchAll(/M([^M]+)/g)].map(hit=>canonical(hit[1].replace(/\s*Z\s*$/,'').trim().split(/\s+L/).map(t=>t.trim().split(/ +/).map(Number))))).sort()
assert.equal(original.length,22);assert.deepEqual(emitted,original)

const strictInside=(poly,x,y)=>{const px=BigInt(Math.round(x*10)),py=BigInt(Math.round(y*10));let w=0;for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],ax=BigInt(Math.round(a.x*10)),ay=BigInt(Math.round(a.y*10)),bx=BigInt(Math.round(b.x*10)),by=BigInt(Math.round(b.y*10)),c=(bx-ax)*(py-ay)-(by-ay)*(px-ax);if(c===0n&&px>=(ax<bx?ax:bx)&&px<=(ax>bx?ax:bx)&&py>=(ay<by?ay:by)&&py<=(ay>by?ay:by))return false;if(ay<=py&&by>py&&c>0n)w++;if(ay>py&&by<=py&&c<0n)w--}return w!==0};assert(proof.groups[5].polygons.some(p=>strictInside(p,113,99)));assert(proof.groups[6].polygons.some(p=>strictInside(p,113,99)));const old=JSON.parse(readFileSync(new URL('../hanja-goal-glyphwiki-batch84-2026-09-27/engine-proof.json',import.meta.url),'utf8'));assert(!old.groups[6].polygons.some(p=>strictInside(p,113,99)));assert(cap.records['u5149-02'].data.includes('2:32:7:121:98:118:169:73:188'));assert(cap.unselectedVariantRecords['u5149-v02'].record.data.includes('2:0:7:121:104:118:169:73:189'));assert.deepEqual(proof.trace[7].at(-1).args,[149.5,179,180.2,179,6,5]);
let rejects=0;const deny=args=>{assert.throws(()=>Reflect.apply(m.compileProgressive,null,args));rejects++}
for(const a of [[],[proof.trace],[proof.trace,proof],[proof.trace,proof,m.selectedProofIdentity,0]])deny(a)
for(const key of Object.keys(m.selectedProofIdentity)){let id=structuredClone(m.selectedProofIdentity);delete id[key];deny([proof.trace,proof,id]);id=structuredClone(m.selectedProofIdentity);id[key]+='wrong';deny([proof.trace,proof,id])}
deny([proof.trace,proof,{...m.selectedProofIdentity,extra:true}])
for(const alter of [p=>delete p.defaults,p=>p.defaults.kWidth++,p=>p.engineRevision='wrong',p=>p.engineHashes['kage.js']='wrong',p=>p.extra=true,p=>p.trace[0][0].args[0]++,p=>p.groups[0].polygons[0][0].x++]){const p=structuredClone(proof);alter(p);deny([p.trace,p,m.selectedProofIdentity])}
deny([[],proof,m.selectedProofIdentity])
for(const a of [[],['u4f8a',proof.trace,proof],['wrong',proof.trace,proof,m.selectedProofIdentity],['u4f8a',proof.trace,proof,m.selectedProofIdentity,0]]){assert.throws(()=>Reflect.apply(m.compileSourceWhole,null,a));rejects++}
assert.equal(m.sourceCompileCallCount(),0);assert.equal(m.nativeApproved,false);assert.equal(m.runtimeApplied,false)
console.log(JSON.stringify({passed:true,strictRejections:rejects,cachedPolygonIdentity:22,sourceCompilerRuns:0,engineRuns:0,nativeApproval:false,runtimeApplied:false}))
