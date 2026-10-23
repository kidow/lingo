import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{reviewedU785cFootContext,reviewedU785cFootPolicy,measureReviewedU785cFootFrame,commitReviewedU785cFootMask}from './hanja-stroke-source-foot-u785c.ts'
const strokes=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-qq-three-u785c-source-experiment-2026-10-23/fixtures.json',import.meta.url),'utf8')).u785c.strokes
const feet=JSON.parse(readFileSync(new URL('../docs/hanja-source-foot-u785c-preparation-2026-10-23/prefix-proof.json',import.meta.url),'utf8')).pieces.map((p:any)=>p.data)
const context=reviewedU785cFootContext(strokes),policies=[6,7,8].map(p=>reviewedU785cFootPolicy(context,p,1))
function setup(index=0){
 const policy=policies[index]!,writes:string[]=[],doc:any={},view:any={document:doc,getComputedStyle:(n:any)=>({transform:n.css.transform??'none',getPropertyValue:(k:string)=>n.css[k]??''})};doc.defaultView=view
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>({localName:name,parentElement:parent,ownerDocument:doc,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:null as any,attrs:{...attrs},css:{} as any,getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=String(v);writes.push(name+':'+k+':'+v);(this as any).onSet?.(k,String(v))},removeAttribute(k:string){delete this.attrs[k]},get id(){return this.attrs.id??''}})
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u785c-foot-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u785c-foot-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u785c-foot-ink','data-owner':'test','data-u785c-foot-ink':'true',d:policy.segment.outline,mask:'url(#test-u785c-foot-foot-x-mask)'}),foot=node('path',mask,{id:'test-u785c-foot-foot','data-u785c-foot-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u785c-foot-body','data-u785c-foot-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u785c-foot-body-clip)'}),rect=node('rect',clip,{id:'test-u785c-foot-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u785c-foot-measure','data-u785c-foot-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}

test('硜 three proven strict-x feet clamp only normalized native endpoint domain; raw points and exact frame guards remain',()=>{
 for(let i=0;i<3;i++){
  const x=setup(i),nums=x.policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);assert(nums[0]<nums[2]&&nums[2]<nums[4])
  const share=Number(feet[i].phaseShare[0])/Number(feet[i].phaseShare[1]),p=share+(1-share)/2,cut=Number(feet[i].cutX[0])/Number(feet[i].cutX[1]);x.g.setAttribute('data-stroke-reveal-progress',String(p))
  const original=x.nodes.measurement.getPointAtLength
  for(const edge of['low','high']as const){
   const rawX=edge==='low'?nums[0]-1e-6:nums[4]+1e-6
   x.nodes.measurement.getPointAtLength=(d:number)=>d===0?{x:nums[0],y:nums[1]}:d===40?{x:nums[4],y:nums[5]}:{x:rawX,y:40}
   const f=measureReviewedU785cFootFrame(x.policy,p,x.nodes.measurement as any);assert.equal(f.point!.x,rawX);assert.equal(f.threshold,edge==='low'?cut:x.policy.segment.bounds[2]);assert(commitReviewedU785cFootMask(x.nodes as any,f));assert.equal(Number(x.nodes.ink.attrs['data-growing-end-x']),rawX)
   assert.equal(commitReviewedU785cFootMask(x.nodes as any,{...f}),false);assert(commitReviewedU785cFootMask(x.nodes as any,f))
  }
  for(const bad of[Infinity,NaN]){x.nodes.measurement.getPointAtLength=(d:number)=>d===0?{x:nums[0],y:nums[1]}:d===40?{x:nums[4],y:nums[5]}:{x:bad,y:40};assert.throws(()=>measureReviewedU785cFootFrame(x.policy,p,x.nodes.measurement as any))}
  x.nodes.measurement.getPointAtLength=(d:number)=>({x:nums[0],y:40});assert.throws(()=>measureReviewedU785cFootFrame(x.policy,p,x.nodes.measurement as any))
  x.nodes.measurement.getPointAtLength=original
 }
 console.log(JSON.stringify({newDomainOnlyRegression:1,feet:3,endpointDomains:6,rawUAPreserved:true,identityImpostorsRejected:6,nonfiniteRejected:6,nonincreasingEndpointsRejected:3,mathRerun:0,sourceProjection:0,nativeScreens:0}))
})
