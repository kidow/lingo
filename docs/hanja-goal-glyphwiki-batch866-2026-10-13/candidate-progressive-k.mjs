// Unapproved K whole candidate. Original disjoint water centerlines remain unchanged.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceRoot='u85fb-k'
export const sourceProofFile='./engine-whole-u85fb-k.json'
export const sourceProofFileSha256='a33b958f2d83984e6748d69d3d4c4048b86a161365748bc8c99351eb2fa2a979'
export const selectedProofIdentity=Object.freeze({sourceRoot,sourceProofFile,sourceProofFileSha256})
export const sourceGroups=Object.freeze([[0],[1],[3],[2],[4],[5],[6,7],[8],[9,10],[11],[12],[13,14],[15],[16],[17,18],[19],[20],[21],[22],[23]].map(g=>Object.freeze(g)))
export const nativeApproved=false
export const runtimeApplied=false
export const approvalStatus='source-only independent water masks; native review pending'
const originalGroups=[[0],[1],[3],[2],[4],[5],[6,7],[8],[9,10],[11],[12],[13,14],[15],[16],[17,18],[19],[20],[21],[22],[23]]
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
const length=c=>Math.hypot(...endpoint(c).map((v,i)=>v-c.args[i]))/2
const segment=(polygons,direction,weight)=>{
 const pts=polygons.flat();assert(pts.length>0&&pts.every(p=>p.off===0));assert(weight>0)
 const ordered=polygons.map(p=>{const area=p.reduce((s,v,i)=>{const n=p[(i+1)%p.length];return s+v.x*n.y-n.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
 return{outline:ordered.map(p=>p.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z').join(' '),bounds:[Math.min(...pts.map(p=>p.x))/2,Math.min(...pts.map(p=>p.y))/2,Math.max(...pts.map(p=>p.x))/2,Math.max(...pts.map(p=>p.y))/2],direction,weight:Math.round(weight*1e6)/1e6}
}
const piece=c=>{
 const a=c.args
 if(c.kind==='cdDrawCurve')return{...segment(c.polygons,'curve',length(c)),revealPath:'M'+a[0]/2+' '+a[1]/2+' Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2,revealWidth:14}
 assert.equal(c.kind,'cdDrawLine','This source has only original L/Q calls')
 const dir=a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve'
 const s=segment(c.polygons,dir,length(c));return dir==='curve'?{...s,revealPath:'M'+a[0]/2+' '+a[1]/2+' L'+a[2]/2+' '+a[3]/2,revealWidth:14}:s
}
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit K source file/byte identity required')
 const bytes=readFileSync(new URL(sourceProofFile,import.meta.url))
 assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceProofFileSha256)
 const original=JSON.parse(bytes);assert.deepEqual(proof,original,'Exact original five-key header/body/preset')
 assert.deepEqual(trace,original.trace)
 assert.deepEqual(sourceGroups,originalGroups,'Only root-observed grass permutation and specific water pair are allowed')
 assert.deepEqual([...sourceGroups.flat()].sort((a,b)=>a-b),trace.map((_,i)=>i),'All source raw rows exactly once')
 for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
 const out=sourceGroups.map(g=>{
   const calls=g.flatMap(i=>trace[i]);assert(calls.length>0)
   if(g.length===2&&g[0]===6&&g[1]===7){
     assert.equal(calls.length,2);assert.deepEqual(calls[0].args,[13.64,145.075,40.24,152.05,37.2,184.6,7,8]);assert.deepEqual(calls[1].args,[33.4,158.25,36.44,148.95,68.36,93.925,32,7])
     assert.deepEqual(endpoint(calls[0]),[37.2,184.6]);assert.deepEqual(calls[1].args.slice(0,2),[33.4,158.25])
     // Separate original Q masks. Do not bridge the(-3.8,-26.35) source gap.
     return calls.map(piece)
   }
   if(calls.length===1)return[piece(calls[0])]
   for(let i=1;i<calls.length;i++)assert.deepEqual(endpoint(calls[i-1]),calls[i].args.slice(0,2),'No other disconnected compound is allowed')
   assert(calls.every(c=>c.kind==='cdDrawLine'),'Only original exact L folds grouped')
   const start=calls[0].args.slice(0,2),path='M'+start[0]/2+' '+start[1]/2+calls.map(c=>' L'+c.args[2]/2+' '+c.args[3]/2).join('')
   return[{...segment(calls.flatMap(c=>c.polygons),'curve',calls.reduce((s,c)=>s+length(c),0)),revealPath:path,revealWidth:14}]
 })
 assert.equal(out.length,20);assert.equal(out.flat().length,21)
 return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(root,sourceRoot,'VS2 is not an implicit file alias');return compileProgressive(trace,proof,identity)}
