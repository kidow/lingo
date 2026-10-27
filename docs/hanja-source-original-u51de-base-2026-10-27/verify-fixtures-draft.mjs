import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const root=new URL('../../',import.meta.url),read=p=>readFileSync(new URL(p,root)),sha=b=>createHash('sha256').update(b).digest('hex')
const f=JSON.parse(read('docs/hanja-source-original-u51de-base-2026-10-27/fixtures-draft.json')).u51de
for(const[p,h]of Object.entries(f.inputSHA256))assert.equal(sha(read(p)),h,p)
const source=JSON.parse(read('docs/hanja-goal-glyphwiki-batch1059-2026-10-13/engine-whole-u51de.json'))
assert.deepEqual(f.fullProof,source);assert.deepEqual(Object.keys(source).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.deepEqual(f.identity,{root:'u51de',file:'../hanja-goal-glyphwiki-batch1059-2026-10-13/engine-whole-u51de.json',fileSHA256:'59adc1112c7e6456b67ecc86c6583f11475287bf71af5a8f0a6e429d5dddc91c'})
assert.deepEqual(f.sourceGroups,[[0],[1,2],[19],[12],[13],[14,15],[16],[17],[11,18],[3,4],[5],[6],[7],[8],[9],[10]])
assert.deepEqual(f.sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:20},(_,i)=>i))
const legacy=read('docs/hanja-goal-glyphwiki-batch388-2026-10-09/serve.py').toString();assert(legacy.includes(JSON.stringify(f.sourceGroups).replaceAll(',',', '))||legacy.includes('[[0],[1,2],[19],[12],[13],[14,15],[16],[17],[11,18],[3,4],[5],[6],[7],[8],[9],[10]]'))
const compiler=read(f.restoration.compilerPath).toString();assert.equal(sha(compiler),f.restoration.compilerSHA256)
for(const[name,key]of[['segment','segmentDeclarationSHA256'],['originalPrimitiveMask','primitiveDeclarationSHA256']]){const r=f.restoration.declarationRanges[name];assert.equal(sha(compiler.slice(r.start,r.end)),f.restoration[key])}
let calls=0,P=0
for(let pen=0;pen<16;pen++){
 const originalCalls=f.sourceGroups[pen].flatMap(i=>source.trace[i]),masks=f.strokes[pen];assert.equal(originalCalls.length,masks.length)
 for(let mi=0;mi<masks.length;mi++){
  const c=originalCalls[mi],m=masks[mi],a=c.args,pieces=m.outline.match(/M[^M]+/g);assert.equal(pieces.length,c.polygons.length)
  const points=[]
  for(let j=0;j<c.polygons.length;j++){
   const polygon=c.polygons[j];assert(polygon.every(p=>p.off===0));const area=polygon.reduce((sum,p,i)=>{const q=polygon[(i+1)%polygon.length];return sum+p.x*q.y-q.x*p.y},0);assert.notEqual(area,0)
   const expected=(area<0?[polygon[0],...polygon.slice(1).reverse()]:polygon).map(p=>[p.x/2,p.y/2]),nums=pieces[j].match(/[-+]?(?:[0-9]*[.][0-9]+|[0-9]+)(?:[eE][-+]?[0-9]+)?/g).map(Number)
   assert.deepEqual(Array.from({length:nums.length/2},(_,i)=>nums.slice(i*2,i*2+2)),expected);assert(pieces[j].trimEnd().endsWith('Z'));points.push(...expected);P++
  }
  assert.deepEqual(m.bounds,[Math.min(...points.map(p=>p[0])),Math.min(...points.map(p=>p[1])),Math.max(...points.map(p=>p[0])),Math.max(...points.map(p=>p[1]))])
  assert(['cdDrawLine','cdDrawCurve','cdDrawBezier'].includes(c.kind));const end=c.kind==='cdDrawBezier'?6:c.kind==='cdDrawCurve'?4:2
  assert.equal(m.weight,Math.round(Math.hypot(a[end]-a[0],a[end+1]-a[1])/2*1e6)/1e6)
  const direction=c.kind!=='cdDrawLine'?'curve':a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve';assert.equal(m.direction,direction)
  if(direction==='curve'){assert.equal(m.revealWidth,14);assert.deepEqual(m.revealPath.match(/[-+]?(?:[0-9]*[.][0-9]+|[0-9]+)(?:[eE][-+]?[0-9]+)?/g).map(Number),a.slice(0,end+2).map(n=>n/2))}else{assert.equal(Object.hasOwn(m,'revealPath'),false);assert.equal(Object.hasOwn(m,'revealWidth'),false)}
  calls++
 }
}
for(let i=0;i<20;i++)assert.deepEqual(source.trace[i].flatMap(c=>c.polygons),source.groups[i].polygons)
assert.deepEqual([f.strokes.length,source.groups.length,calls,P],[16,20,23,39]);assert.equal(sha(JSON.stringify(f.strokes)),f.compiledSHA256);assert.equal(f.compiledSHA256,'c9ac1ef9b6c55526779f888cfd12f31622fad344ed20cbbf3dfa0dabee7caea1')
assert.equal(f.membership.nonconsecutiveGroup.boundaryNotAnEndpointContinuation,false);assert.deepEqual(source.trace[11].at(-1).args.slice(2,4),source.trace[18][0].args.slice(0,2))
assert.equal(f.variant.catalogStrokes,15);assert.equal(f.variant.playbackStrokes,16);assert.equal(f.variant.variantApproved,false)
const direction=JSON.parse(read(f.directionEvidence.path));assert.equal(direction.actualBrowser.totalFreshScreenshots,50);assert.equal(direction.lifecycle.stopped,true);assert.equal(direction.lifecycle.remainingOwnedServers,0);assert.equal(direction.interpretationLimits.rawMappingApproved,false)
for(const key of['registered','temporalGroupingApproved','contactGeometryApproved','candidateAnimationApproved','nativeApproval','runtimeApplied'])assert.equal(f[key],false,key)
assert.equal(f.restoration.compilerBatchPasses,1);assert.equal(f.restoration.engine,0)
console.log(JSON.stringify({result:'PASS-original-source-conservation-only',logical:16,raw:20,masks:23,P:39,compilerReexecution:0,engine:0,registered:false,compiledSHA256:f.compiledSHA256}))
