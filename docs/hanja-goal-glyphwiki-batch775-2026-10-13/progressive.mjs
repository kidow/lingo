const ORIGINAL=[[{"kind":"cdDrawCurve","args":[24.27,53,29.64,87,17.11,106,7,8]}],[{"kind":"cdDrawCurve","args":[78.865,51,67.23,64,47.54,83,0,7]}],[{"kind":"cdDrawLine","args":[47.54,18,47.54,95,0,1]},{"kind":"cdDrawCurve","args":[47.54,95,47.54,158,11.74,185,1,7]}],[{"kind":"cdDrawCurve","args":[46.645,121,68.125,141,74.39,161,7,8]}],[{"kind":"cdDrawLine","args":[120,16,115,64,0,32]}],[{"kind":"cdDrawLine","args":[88,37,160,37,0,2]}],[{"kind":"cdDrawLine","args":[160,37,160,64,22,32]}],[{"kind":"cdDrawLine","args":[79,64,189,64,0,100]}],[{"kind":"cdDrawLine","args":[102,80,102,108,12,113]}],[{"kind":"cdDrawLine","args":[102,80,161,80,2,2]}],[{"kind":"cdDrawLine","args":[161,80,161,108,22,123]}],[{"kind":"cdDrawLine","args":[102,108,161,108,2,2]}],[{"kind":"cdDrawLine","args":[95,134,181,134,2,0]}],[{"kind":"cdDrawLine","args":[95,134,95,158,12,113]}],[{"kind":"cdDrawLine","args":[95,158,186,158,2,0]}],[{"kind":"cdDrawLine","args":[142,115,142,186,0,100]}]]
const TRACE_SHA256="78e9f4543370f6eeab021c28be28f0b6ecab54c181aa27e155248a832913b624"
const GROUPS_SHA256="11ebb6ecacf0f1319dc1d0f189e787f356d45223db4f4825ad3eeda973fc6acb"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Selected fixed whole: u7152-ue0104. This compiler grants no animation approval.
export const sourceGroups=[[0],[1],[2],[3],[4],[5,6],[7],[8],[9,10],[11],[12],[13,14],[15]]
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex')
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
export function compileProgressive(trace,proof){
 assert.equal(trace.length,16);assert.equal(proof.groups.length,16)
 assert.deepEqual(trace.map(row=>row.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
 assert.equal(digest(trace),TRACE_SHA256,'Pinned selected-whole trajectory and polygons')
 assert.equal(digest(proof.groups),GROUPS_SHA256,'Pinned selected-whole raw coordinates and polygons')
 assert.deepEqual(proof.defaults,PINNED_DEFAULTS)
 assert.equal(proof.engineRevision,ENGINE_REVISION);assert.deepEqual(proof.engineHashes,ENGINE_HASHES)
 assert.deepEqual(sourceGroups.flat(),Array.from({length:16},(_,i)=>i))
 for(let i=0;i<16;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
 const segment=(polygons,direction,weight)=>{
  const points=polygons.flat();assert(points.length>0&&points.every(p=>p.off===0));assert(weight>0)
  const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
  return {outline:normalized.map(p=>p.map((v,i)=>(i?'L':'M')+(v.x/2)+' '+(v.y/2)).join(' ')+' Z').join(' '),bounds:[Math.min(...points.map(v=>v.x/2)),Math.min(...points.map(v=>v.y/2)),Math.max(...points.map(v=>v.x/2)),Math.max(...points.map(v=>v.y/2))],direction,weight:Math.round(weight*1e6)/1e6}
 }
 return sourceGroups.map(indices=>{
  const calls=indices.flatMap(i=>trace[i])
  for(let i=1;i<calls.length;i++)assert.deepEqual(endpoint(calls[i-1]),calls[i].args.slice(0,2),'Original directed centerlines must join exactly')
  const pieces=calls.map(c=>{
   const a=c.args
   if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:'M'+a[0]/2+' '+a[1]/2+' Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2,revealWidth:14}
   assert.equal(c.kind,'cdDrawLine')
   const direction=a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve'
   const p=segment(c.polygons,direction,Math.hypot(a[2]-a[0],a[3]-a[1])/2)
   return direction==='curve'?{...p,revealPath:'M'+a[0]/2+' '+a[1]/2+' L'+a[2]/2+' '+a[3]/2,revealWidth:14}:p
  })
  if(pieces.length===1)return [pieces[0]]
  // Terminal113 extends below the fold elbow beyond a width14 centerline mask.
  // Reveal the two unchanged original Line polygons directionally in the same pen.
  if(indices.length===2&&indices[0]===13&&indices[1]===14){
   assert.deepEqual(pieces.map(p=>p.direction),['down','right'])
   return pieces
  }
  const first=calls[0].args
  return [{outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:'M'+first[0]/2+' '+first[1]/2+' '+calls.map(c=>{const a=c.args;return c.kind==='cdDrawLine'?'L'+a[2]/2+' '+a[3]/2:'Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2}).join(' '),revealWidth:14}]
 })
}

