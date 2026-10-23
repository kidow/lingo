import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {gzipSync} from 'node:zlib'
import {compileProgressive,selectedProofIdentity,sourceGroups} from './candidate.mjs'
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=b=>createHash('sha256').update(b).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x)),full=read('./engine-proof.json'),source=read('./sources.json')
const started=performance.now(),strokes=compileProgressive(full.trace,full,selectedProofIdentity)
assert.deepEqual([strokes.length,strokes.flat().length,full.groups.length,full.trace.flat().length,full.trace.flat().reduce((s,c)=>s+c.polygons.length,0)],[18,24,21,24,41])
assert.equal(Object.keys(source.records).length,10);assert.equal(source.root,'u6726-ue0102');assert.deepEqual(sourceGroups,[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14,15],[16],[17],[18],[19],[20]])
const polygons=s=>s.match(/M[^M]+/g).map(p=>{const a=p.match(/-?\d+(?:\.\d+)?/g).map(Number);return Array.from({length:a.length/2},(_,i)=>[a[2*i],a[2*i+1]])}),cycle=(a,b)=>[b,b.toReversed()].some(v=>v.some((_,i)=>JSON.stringify(a)===JSON.stringify([...v.slice(i),...v.slice(0,i)])))
const original=sourceGroups.flatMap(gs=>gs.flatMap(i=>full.trace[i]));assert.equal(original.length,strokes.flat().length)
for(let i=0;i<original.length;i++){const P=polygons(strokes.flat()[i].outline);assert.equal(P.length,original[i].polygons.length);for(let j=0;j<P.length;j++)assert(cycle(P[j],original[i].polygons[j].map(v=>[v.x/2,v.y/2])))}
assert.equal(strokes[12].length,2);assert.equal(strokes[12][0].direction,'right');assert.equal(strokes[12][1].direction,'curve')
let negatives=0;for(const change of[x=>x.identity.sourceRoot='u6726-k',x=>x.identity.sourceProofFileSha256='0'.repeat(64),x=>x.full.groups[0].raw[0]++,x=>x.trace[0][0].args[0]+=.01,x=>x.trace[0][0].polygons[0][0].x+=.01]){const x={identity:clone(selectedProofIdentity),full:clone(full),trace:clone(full.trace)};change(x);assert.throws(()=>compileProgressive(x.trace,x.full,x.identity));negatives++}
let getterReads=0;const foreign=clone(selectedProofIdentity);Object.defineProperty(foreign,'sourceRoot',{enumerable:true,get(){getterReads++;return selectedProofIdentity.sourceRoot}});assert.throws(()=>compileProgressive(full.trace,full,foreign));assert.equal(getterReads,0);negatives++
const result={FIRSTSourceGuard:true,pens:18,masks:24,originalP:41,rawGroups:21,calls:24,strictIdentityKeys:7,negative:negatives,getterReads,sourceProjection:1,engineRuns:0,archiveGET:0,originalPCyclesPreserved:true,source13MasksRemainIndependent:true,nativeApproval:false,registered:false,geometrySHA256:sha(JSON.stringify(strokes)),durationMs:performance.now()-started}
if(process.env.HANJA_SOURCE_CAPTURE==='1')result.strokesGzipBase64=gzipSync(Buffer.from(JSON.stringify(strokes))).toString('base64')
console.log(JSON.stringify(result))
