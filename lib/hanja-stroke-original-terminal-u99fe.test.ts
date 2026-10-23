import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {reviewedU99feTerminalContext,makeReviewedU99feTerminalSourceContext,reviewedU99feTerminalPolicy,reviewedU99feTerminalFrame,measureReviewedU99feTerminalFrame,REVIEWED_U99FE_TERMINALS}from'./hanja-stroke-original-terminal-u99fe.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u99fe-2026-10-24/fixtures.json',import.meta.url),'utf8')).u99fe,st=f.strokes,context=makeReviewedU99feTerminalSourceContext(f.fullProof,f.identity,st)!
const clone=(x:any)=>JSON.parse(JSON.stringify(x))
const S=10n**15n
const q=(s:string|number)=>{const text=String(s),negative=text.startsWith('-'),v=negative?text.slice(1):text,[a,z='']=v.split('.');assert(z.length<=15);return(BigInt(a)*S+BigInt((z+'0'.repeat(15)).slice(0,15)))*(negative?-1n:1n)}
type V=readonly[bigint,bigint]
const points=(outline:string):V[]=>{const a=outline.match(/-?\d+(?:\.\d+)?/g)!.map(q);return Array.from({length:a.length/2},(_,i)=>[a[i*2],a[i*2+1]])}
const cross=(a:V,b:V,c:V)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
const hasEdge=(p:V[],a:V,z:V)=>p.some((v,i)=>v[0]===a[0]&&v[1]===a[1]&&p[(i+1)%p.length][0]===z[0]&&p[(i+1)%p.length][1]===z[1])
const convex=(p:V[])=>{const signs=p.map((v,i)=>cross(v,p[(i+1)%p.length],p[(i+2)%p.length]));return signs.every(v=>v>0n)||signs.every(v=>v<0n)}
function monotoneY(p:V[]){
 const ys=[...new Set(p.map(v=>v[1]))].sort((a,b)=>a<b?-1:a>b?1:0)
 let count=0
 for(let i=0;i<ys.length-1;i++){
  const y=(ys[i]+ys[i+1])/2n,edges=p.map((a,j)=>[a,p[(j+1)%p.length]] as const).filter(([a,b])=>a[1]<y&&y<b[1]||b[1]<y&&y<a[1])
  assert.equal(edges.length,2)
  const x=edges.map(([a,b])=>{let n=a[0]*(b[1]-a[1])+(b[0]-a[0])*(y-a[1]),d=b[1]-a[1];if(d<0n){n=-n;d=-d}return[n,d]})
  assert.notEqual(x[0][0]*x[1][1],x[1][0]*x[0][1]);count++
 }return count
}
test('駾 new terminal source-prefix conditions exactly bind original polygons and completed predecessor',()=>{
 assert(context);assert.equal(reviewedU99feTerminalContext(st),context)
 assert.equal(makeReviewedU99feTerminalSourceContext({...f.fullProof,defaults:{}},f.identity,st),null)
 const a=REVIEWED_U99FE_TERMINALS.targets[0],z=REVIEWED_U99FE_TERMINALS.targets[1],body=points(a.bodyOutline),left=points(a.tailOutline),prior6=(st[5][1].outline.match(/M[^M]+/g)as string[]).map(points)
 assert.equal(a.bodyOutline+' '+a.tailOutline,st[5][2].outline)
 const E:V=[q('33.1'),q('84.8')],F:V=[q('38.3'),q('87.85')]
 assert(hasEdge(body,E,F));assert(prior6.some((p:V[])=>hasEdge(p,F,E)))
 const slabs=monotoneY(body);assert(q('84.8')<q(a.originY)&&q(a.originY)<q('87.85'))
 const start=(st[5][2].revealPath.match(/-?\d+(?:\.\d+)?/g)as string[]).map(q),before=(st[5][1].revealPath.match(/-?\d+(?:\.\d+)?/g)as string[]).map(q)
 assert.deepEqual(before.slice(-2),start.slice(0,2));assert(start[3]>start[1]&&start[5]===start[3])
 for(const v of[E,F])assert((v[0]-start[0])**2n+(v[1]-start[1])**2n<49n*S*S)
 // Each positive original-Q-start Y band includes a positive-length subedge E→F.
 // Y-monotonicity gives one positive interval per slab, hence no detached body component.
 assert(convex(left));assert(hasEdge(body,[q('28.2'),q('93.65')],[q('28.2'),q('87.65')]))
 assert.equal(q('28.2')-q('20.2'),8n*S);assert.equal(q('90.65')-q('87.65'),3n*S)
 const bp=(z.bodyOutline.match(/M[^M]+/g)as string[]).map(points),up=points(z.tailOutline),prior17=(st[16][1].outline.match(/M[^M]+/g)as string[]).map(points)
 assert.equal(z.bodyOutline+' '+z.tailOutline,st[16][2].outline);assert(bp.every(convex));assert(convex(up))
 const G:V=[q('78.2'),q('87')],H:V=[q('78.2'),q('93')]
 assert(hasEdge(bp[0],H,G));assert(prior17.some((p:V[])=>hasEdge(p,G,H)))
 assert(hasEdge(bp[0],[q('90.4'),q('87')],[q('90.4'),q('93')]));assert(hasEdge(bp[1],[q('90.4'),q('93')],[q('90.4'),q('87')]))
 assert.equal(q('87')-q('74.5'),q('12.5'));assert.equal(q('91.4')-q('87.4'),4n*S)
 assert(hasEdge(up,[q('90.4'),q('87')],[q('87.4'),q('87')]))
 assert(q('78.2')<q('87.4')&&q('90.4')<=q('90.4'))
 // RIGHT positive x-prefix attaches at G→H. UP convex prefixes retain their
 // full positive-length base inside the completed RIGHT body's top edge.
 assert.equal(a.bodyShare,a.segment.weight/(a.segment.weight+8));assert.equal(z.bodyShare,z.segment.weight/(z.segment.weight+12.5))
 console.log(JSON.stringify({newSourceOnly:true,bodyYOpenSlabs:slabs,originalSharedEdges:4,LEFT:8,UP:12.5,sourceFieldsChanged:0,newGuide:0,nativeApproval:false}))
})
test('駾 terminal finite frames preserve Q origin, exact LEFT/UP clocks and fail closed',()=>{
 let negative=0,samples=0
 for(const row of REVIEWED_U99FE_TERMINALS.targets){
  const p=reviewedU99feTerminalPolicy(context,row.pen-1,row.mask-1)!
  for(const v of[0,1e-6,.03,p.bodyShare-1e-10,p.bodyShare,p.bodyShare+1e-10,p.bodyShare+(1-p.bodyShare)/2,1]){
   const original=reviewedU99feTerminalFrame(p,p.segment,v,1);assert.equal(original.bodyOutline+' '+original.tailOutline,p.segment.outline);assert.equal(original.paintOriginalInkOnce,true);assert.equal(original.originalMaskCount,23)
   const guide='revealPath'in p.segment?p.segment.revealPath:undefined,nums=guide?.match(/-?\d+(?:\.\d+)?/g)?.map(Number)
   const path={getAttribute:(k:string)=>k==='d'?guide:null,getTotalLength:()=>100,getPointAtLength:(d:number)=>{const t=d/100,n=nums!;return{x:(1-t)**2*n[0]+2*(1-t)*t*n[2]+t*t*n[4],y:(1-t)**2*n[1]+2*(1-t)*t*n[3]+t*t*n[5]}}}as unknown as SVGPathElement
   const frame=measureReviewedU99feTerminalFrame(p,p.segment,v,1,p.terminal==='LEFT'?path:null)
   assert.equal(frame.visible,v>0);assert.equal(frame.tailProgress===0,v<=p.bodyShare);assert.equal(frame.bodyOriginIsOriginalQStartY,p.terminal==='LEFT')
   if(p.terminal==='LEFT'){assert.equal(frame.bodyRect.y,p.originY-(p.originY-p.bodyBounds[1])*frame.alpha);assert.equal(frame.tailRect.height,3)}else{assert.equal(frame.bodyRect.width,(93.4-78.2)*frame.bodyProgress);assert.equal(frame.tailRect.width,4)}
   samples++
  }
  for(const v of[NaN,Infinity,-1,1.01]){assert.throws(()=>reviewedU99feTerminalFrame(p,p.segment,v,1));negative++}
  for(const previous of[0,.99999,NaN]){assert.throws(()=>reviewedU99feTerminalFrame(p,p.segment,.01,previous));negative++}
  for(const key of['outline','bounds','direction','weight','revealPath','revealWidth']){const bad=clone(p.segment);if(typeof bad[key]==='number')bad[key]+=.01;else if(Array.isArray(bad[key]))bad[key][0]+=.01;else bad[key]=String(bad[key])+' ';assert.throws(()=>reviewedU99feTerminalFrame(p,bad,.5,1));negative++}
  assert.throws(()=>reviewedU99feTerminalFrame({...p}as any,p.segment,.5,1));negative++
 }
 const left=reviewedU99feTerminalPolicy(context,5,2)!;assert.throws(()=>measureReviewedU99feTerminalFrame(left,left.segment,.03,1,null));negative++
 assert.equal(reviewedU99feTerminalPolicy({...context}as any,5,2),null)
 console.log(JSON.stringify({newTerminalFiniteFIRST:true,samples,negative,nativeApproval:false,SSR:0,engine:0,projection:0}))
})
