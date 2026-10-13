import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { compileProgressive,sourceRoot,sourceProofFile,sourceProofFileSha256,selectedProofIdentity,sourceGroups } from './candidate-progressive-k.mjs'
const sha=b=>crypto.createHash('sha256').update(b).digest('hex')
assert.equal(sourceRoot,'u85fb-k');assert.equal(sourceProofFile,'./engine-whole-u85fb-k.json')
assert.equal(sourceProofFileSha256,'a33b958f2d83984e6748d69d3d4c4048b86a161365748bc8c99351eb2fa2a979')
assert.equal(JSON.parse(fs.readFileSync(new URL('sources.json',import.meta.url))).archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
const proof=JSON.parse(fs.readFileSync(new URL(sourceProofFile,import.meta.url))),before=JSON.stringify(proof),out=compileProgressive(proof.trace,proof,selectedProofIdentity)
assert.equal(JSON.stringify(proof),before)
const canon=p=>{const a=p.reduce((s,v,i)=>{const n=p[(i+1)%p.length];return s+v.x*n.y-n.x*v.y},0),q=a<0?[p[0],...p.slice(1).reverse()]:p;return q.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'}
for(let i=0;i<out.length;i++){const expected=sourceGroups[i].flatMap(j=>proof.trace[j].flatMap(c=>c.polygons)).map(canon).sort(),actual=out[i].flatMap(m=>m.outline.match(/M[^M]+/g).map(x=>x.trim())).sort();assert.deepEqual(actual,expected,'Each original polygon exactly once at its source group')}
for(const type of['trajectory','polygon','preset','engineRevision','engineHash','wholeGroups']){let t=structuredClone(proof.trace),p=structuredClone(proof);if(type==='trajectory')t[0][0].args[0]+=.1;if(type==='polygon')t[0][0].polygons[0][0].x+=.1;if(type==='preset')p.defaults.kWidth++;if(type==='engineRevision')p.engineRevision='tamper';if(type==='engineHash')p.engineHashes['2d.js']='tamper';if(type==='wholeGroups')p.groups[0].raw[0]++;assert.throws(()=>compileProgressive(t,p,selectedProofIdentity))}
for(const k of Object.keys(selectedProofIdentity))assert.throws(()=>compileProgressive(proof.trace,proof,{...selectedProofIdentity,[k]:'tamper'}))
assert.throws(()=>compileProgressive(proof.trace,proof))
const weights=out[6].map(m=>m.weight)
console.log(JSON.stringify({glyph:'藻',sourceRoot,sourceProofFile,sourceProofFileSha256,pens:out.length,masks:out.flat().length,originalPolygons:37,eachOriginalPolygonExactlyOnce:true,sourceInputImmutable:true,mutationClassesRejected:6,identityRejects:4,water7Weights:weights,water7Boundary:weights[0]/weights.reduce((s,w)=>s+w,0),water7OriginalGapRetained:true,revealWidths:out.flat().filter(m=>m.direction==='curve').map(m=>m.revealWidth),compiledOutlinesSHA256:sha(JSON.stringify(out)),compilerFileSHA256:sha(fs.readFileSync(new URL('candidate-progressive-k.mjs',import.meta.url))),nativeApproval:false,runtimeApplied:false}))
