import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {reviewedU7d7fKTailContext,reviewedU7d7fKTailFrame,REVIEWED_U7D7F_K_LEFT_TAIL as S} from './hanja-stroke-original-left-tail-u7d7f-k.ts'
import {measureReviewedU7d7fKYTailFrame as frame,REVIEWED_U7D7F_K_YCLIP as Y} from './hanja-stroke-original-left-tail-u7d7f-k-yclip.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u7d7f-k-2026-10-24/fixtures.json',import.meta.url),'utf8')).u7d7fK,s=f.strokes[7][1],c=reviewedU7d7fKTailContext(f.strokes)!,clone=(v:any)=>JSON.parse(JSON.stringify(v))
const points=(d:string):number[][]=>Array.from(d.matchAll(/[ML](-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g),m=>[Math.round(Number(m[1])*20),Math.round(Number(m[2])*20)])
const cross=(a:number[],b:number[],p:number[])=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
const convexContains=(poly:number[][],p:number[])=>{const signs=poly.map((a,i)=>Math.sign(cross(a,poly[(i+1)%poly.length],p))).filter(Boolean);return signs.every(v=>v===signs[0])}
test('絿 new body horizontal-prefix connectivity and original LEFT adjacency FIRST',()=>{
 const old=reviewedU7d7fKTailFrame(c,s,.5),body=points(old.bodyOutline),tail=points(old.tailOutline)
 assert.equal(body.length,22);assert.equal(tail.length,4)
 // Exactly two monotone boundary chains: every nonempty horizontal sublevel is
 // connected, successive slab cells share a positive interval (a chain/BFS).
 const signs=body.map((a,i)=>Math.sign(body[(i+1)%body.length][1]-a[1])).filter(Boolean)
 assert.equal(signs.filter((v,i)=>v!==signs[(i+1)%signs.length]).length,2)
 assert.deepEqual(body[0],[1413,1720]);assert.deepEqual(body[21],[1293,1720]);assert.deepEqual(body[10],[1253,1880]);assert.deepEqual(body[11],[1253,1760])
 const levels=[...new Set(body.map(p=>p[1]))].sort((a,b)=>a-b)
 const interval=(y:number)=>body.flatMap((a,i)=>{const b=body[(i+1)%body.length];return(a[1]<y&&b[1]>y)||(b[1]<y&&a[1]>y)?[a[0]+(b[0]-a[0])*(y-a[1])/(b[1]-a[1])]:[]}).sort((a,b)=>a-b)
 for(let i=0;i<levels.length-1;i++){const x=interval((levels[i]+levels[i+1])/2);assert.equal(x.length,2);assert(x[1]>x[0])}
 // A positive root rectangle lies inside the unchanged body and completed V tip.
 const priorPolys=f.strokes[7][0].outline.match(/M[^M]+/g).map(points),root=[[1340,1720],[1360,1720],[1360,1722],[1340,1722]]
 for(const p of root){const xs=interval(p[1]===1720?1720+1e-6:p[1]);assert(p[0]>xs[0]&&p[0]<xs[1]);assert(convexContains(priorPolys[2],p))}
 assert.deepEqual(tail[0],[1253,1820]);assert.deepEqual(tail[3],[1253,1760]);assert.equal(body[10][0],tail[0][0]);assert.equal(body[11][0],tail[3][0]);assert.equal(S.leftClock,8)
 // Original guide derivative dy/dt=10(1-t)>0 for t<1; body axis has no jump.
 assert.equal(s.revealPath,'M67.6725 86 Q67.6725 91 62.6725 91');assert.equal(s.weight,7.071068);assert.equal(S.bodyShare,7.071068/(7.071068+8));assert.equal(Y.nativeApproval,false)
 console.log(JSON.stringify({bodyVertices:22,positiveSlabs:levels.length-1,connectedSlabChain:true,priorPositiveRectangle:true,LEFTSharedEdge:3,sourceUnchanged:true,nativeApproval:false}))
})
test('絿 body-axis original UA measurement, clock boundaries and fail-closed FIRST',()=>{
 const path=(y:(t:number)=>number=(t)=>86+5*(2*t-t*t))=>({getAttribute:(k:string)=>k==='d'?s.revealPath:null,getTotalLength:()=>8.1,getPointAtLength:(l:number)=>({x:67.6725-5*(l/8.1)**2,y:y(l/8.1)})}) as unknown as SVGPathElement
 let last=-1
 for(const p of[0,1e-12,.01,.03,.1,S.bodyShare-1e-10,S.bodyShare,S.bodyShare+1e-10,.9,1]){const v=frame(c,s,p,path()),old=reviewedU7d7fKTailFrame(c,s,p);assert.equal(v.tailOutline,old.tailOutline);assert.deepEqual(v.tailRect,old.tailRect);assert.equal(v.bodyProgress,old.bodyProgress);assert(v.bodyRect.height>=last);last=v.bodyRect.height;assert.equal(v.bodyRect.width,8);if(p>S.bodyShare)assert.equal(v.bodyRect.height,8)}
 assert.equal(frame(c,s,0,null).bodyRect.height,0);assert.equal(frame(c,s,1,null).bodyRect.height,8)
 const undershoot=frame(c,s,.1,path(t=>t===0?86:t===1?91:85.999999));assert.equal(undershoot.alpha,0);assert.equal(undershoot.point!.y,85.999999)
 assert.throws(()=>frame(c,s,.1,null));assert.throws(()=>frame(c,s,.1,path(()=>NaN)));assert.throws(()=>frame(null,s,.1,path()));for(const p of[NaN,Infinity,-.1,1.1])assert.throws(()=>frame(c,s,p,path()))
 for(const k of Object.keys(s)){const bad=clone(s);if(k==='bounds')bad[k][0]+=.01;else if(typeof bad[k]==='number')bad[k]+=.01;else bad[k]+=' ';assert.throws(()=>frame(c,bad,.1,path()))}
 let reads=0;const bad=clone(s);Object.defineProperty(bad,'weight',{enumerable:true,get(){reads++;return 1}});assert.throws(()=>frame(c,bad,.1,path()));assert.equal(reads,0)
 console.log(JSON.stringify({newInternalBodyAxis:true,originalClockWeightAndLEFTReused:true,UAValuePreserved:true,nativeApproval:false}))
})
