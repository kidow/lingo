import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {reviewedU7367Context,reviewedU7367Policy} from './hanja-stroke-start-caps-u7367.ts'
import {reviewedU7367TailContext,reviewedU7367TailFrame,REVIEWED_U7367_LEFT_TAIL} from './hanja-stroke-original-left-tail-u7367.ts'
import {commitReviewedU7367Tail} from './hanja-stroke-original-left-tail-dom-u7367.ts'
const strokes=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u7367-2026-10-23/fixtures.json',import.meta.url),'utf8'))['u7367'].strokes
const context=reviewedU7367TailContext(strokes)!,policy=reviewedU7367Policy(reviewedU7367Context(strokes),1,0)!,segment=strokes[1][0]
function fake(progress:number){
 const id='u7367-composite-test',events:string[]=[],doc:any={defaultView:null};let svg:any=null,hook:(()=>void)|null=null,reads=0
 const view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,ownerSVGElement:svg,isConnected:true,parentElement:null as any,attrs:{...attrs},cssTransform:'none',cssTranslate:'none',writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string):string|null{return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 svg=node('svg');const frame=reviewedU7367TailFrame(context,segment,progress),target=node('g',{'data-stroke-start-gate':policy.id,'data-u7367-progress':String(frame.bodyProgress),'data-u7367-composite-progress':String(progress),'data-u7367-clip':id});target.parentElement=svg
 const defs=node('defs');defs.parentElement=target
 const measurement=Object.assign(node('path',{d:segment.revealPath,'data-u7367-measurement':'true'}),{getTotalLength(){reads++;hook?.();return 100},getPointAtLength(d:number){return{x:9.35+d/10,y:8}}});measurement.parentElement=defs
 const clip=(suffix:string,d:string)=>{const c=node('clipPath',{id:id+suffix,clipPathUnits:'userSpaceOnUse'});c.parentElement=defs;const p=node('path',{d});p.parentElement=c;return p}
 const bodyClip=clip('-u7367-body',frame.bodyOutline),tailClip=clip('-u7367-left',frame.tailOutline)
 const mask=node('mask',{id:id+'-u7367-composite',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const group=node('g',{id:id+'-u7367-body-guide','clip-path':'url(#'+id+'-u7367-body)'});group.parentElement=mask
 const guide=node('path',{d:segment.revealPath,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter',stroke:'white'}),startCap=node('circle',{fill:'white'}),endCap=node('circle',{fill:'white'});for(const n of[guide,startCap,endCap])n.parentElement=group
 const bodyFill=node('path',{d:frame.bodyOutline,fill:'white'});bodyFill.parentElement=mask
 const tailGroup=node('g',{'clip-path':'url(#'+id+'-u7367-left)'});tailGroup.parentElement=mask
 const tailRect=node('rect',{x:'20.8',y:'88',width:'0',height:'3',fill:'white'});tailRect.parentElement=tailGroup
 const ink=node('path',{d:segment.outline,mask:'url(#'+id+'-u7367-composite)'});ink.parentElement=target
 const nodes={measurement,bodyClip,tailClip,guide,startCap,endCap,bodyFill,tailRect,ink}
 return{nodes,target,group,svg,events,id,reads:()=>reads,onLength:(f:()=>void)=>{hook=f},dispatch:()=>commitReviewedU7367Tail(context,policy,segment,progress,id,nodes as any)}
}
test('獧 original LEFT composite DOM masks one ink, keeps tail absent before body completion, fails closed on mutation',()=>{
 const share=REVIEWED_U7367_LEFT_TAIL.bodyShare
 for(const p of[0,1e-6,.03,share/2,share,share+(1-share)/2,1]){const f=fake(p),r=f.dispatch();assert.equal(r.status,p===0?'empty':'visible');assert.equal(f.reads(),1);assert.equal(f.nodes.ink.getAttribute('visibility'),p===0?'hidden':'visible');if(p<=share)assert.equal(f.nodes.tailRect.getAttribute('width'),'0');if(p>share)assert.equal(f.nodes.bodyFill.getAttribute('visibility'),'visible');if(p>0)assert.equal(f.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(f.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(f.nodes.tailRect.getAttribute('width'),'0')}
 const mutations=[(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u7367-composite-progress']='0.25'},(x:ReturnType<typeof fake>)=>{x.nodes.bodyClip.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.nodes.tailClip.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.nodes.ink.attrs.mask='url(#other)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='2px'},(x:ReturnType<typeof fake>)=>{x.nodes.tailRect.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.nodes.guide.attrs.transform='scale(2)'}]
 let negative=0;for(const mutate of mutations)for(const when of['before','length']){const f=fake(.5);if(when==='before')mutate(f);else f.onLength(()=>mutate(f));assert.equal(f.dispatch().status,'hidden');assert.equal(f.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(f.nodes.tailRect.getAttribute('width'),'0');negative++}
 const writing=fake(.5);writing.nodes.guide.writeHook=k=>{if(k==='stroke-dasharray'&&writing.reads())writing.target.attrs['data-u7367-composite-progress']='0.3'};assert.equal(writing.dispatch().status,'hidden');negative++
 console.log(JSON.stringify({newCompositeDOMFirst:true,finiteSamples:7,negative,nativeApproval:false,SSR:0,originalSourceMasks:17,originalInkPaths:1}))
})

test('獧 LEFT source fields, clock boundaries and foreign contexts fail closed',()=>{assert.equal(REVIEWED_U7367_LEFT_TAIL.bodyShare,89513895/96513895);assert.equal(REVIEWED_U7367_LEFT_TAIL.originalLEFTFlag,14);for(const p of[0,.01,.5,REVIEWED_U7367_LEFT_TAIL.bodyShare,1]){const f=reviewedU7367TailFrame(context,segment,p);assert.equal(f.tailRect.y,88);assert.equal(f.tailRect.height,3);assert.equal(f.bodyOutline+' '+f.tailOutline,segment.outline);assert.equal(f.originalMaskCount,17)}for(const p of[NaN,Infinity,-1,1.01])assert.throws(()=>reviewedU7367TailFrame(context,segment,p));assert.throws(()=>reviewedU7367TailFrame({...context},segment,.5));for(const key of['weight','revealPath','outline','bounds'] as const){const changed=JSON.parse(JSON.stringify(segment));if(key==='bounds')changed.bounds[0]+=.01;else if(key==='weight')changed.weight+=.01;else changed[key]+=' ';assert.throws(()=>reviewedU7367TailFrame(context,changed,.5))}})
test('獧 original MCQ body coverage and original LEFT connected prefixes',()=>{
 const nums=(s:string)=>(s.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number)
 const ps=(segment.outline.match(/M[^M]+/g)||[]).map((s:string)=>{const a=nums(s);return Array.from({length:a.length/2},(_,i)=>[a[2*i],a[2*i+1]])})
 const a=nums(segment.revealPath),C=[a.slice(0,2),a.slice(2,4),a.slice(4,6),a.slice(6,8)],Q=[C[3],a.slice(8,10),a.slice(10,12)]
 const lerp=(a:number[],b:number[],t:number)=>a.map((v,i)=>v*(1-t)+b[i]*t)
 const curve=(p:number[][],t:number):number[]=>p.length===1?p[0]:curve(p.slice(1).map((v,i)=>lerp(p[i],v,t)),t)
 const distance=(a:number[],b:number[])=>a.reduce((s,v,i)=>s+(v-b[i])**2,0)
 const cross=(a:number[],b:number[])=>a[0]*b[1]-a[1]*b[0],sub=(a:number[],b:number[])=>a.map((v,i)=>v-b[i])
 const area=(p:number[][])=>Math.abs(p.reduce((s,v,i)=>s+cross(v,p[(i+1)%p.length]),0))
 const convex=(p:number[][])=>{const signs=p.map((v,i)=>cross(sub(p[(i+1)%p.length],v),sub(p[(i+2)%p.length],p[(i+1)%p.length])));return signs.every(v=>v>0)||signs.every(v=>v<0)}
 const separated=(a:number[][],b:number[][])=>[a,b].some(p=>p.some((v,i)=>{const e=sub(p[(i+1)%p.length],v),n=[-e[1],e[0]],aa=a.map(v=>v[0]*n[0]+v[1]*n[1]),bb=b.map(v=>v[0]*n[0]+v[1]*n[1]);return Math.max(...aa)<=Math.min(...bb)+1e-9||Math.max(...bb)<=Math.min(...aa)+1e-9}))
 let maxDistanceSquared=0
 for(const [poly,guide]of[[ps[0],C],[ps[2],Q]]){
  const cells:number[][][]=[]
  for(let i=0;i<10;i++){
   const anchor=curve(guide,(2*i+1)/20),cell=[poly[i],poly[i+1],poly.at(-2-i)!,poly.at(-1-i)!]
   assert.ok(convex(cell));cells.push(cell)
   const d=Math.max(...cell.map(p=>distance(p,anchor)));assert.ok(d<49,'original convex cell inside original guide disk');maxDistanceSquared=Math.max(maxDistanceSquared,d)
  }
  assert.ok(Math.abs(cells.reduce((s,c)=>s+area(c),0)-area(poly))<1e-9)
  for(let i=0;i<10;i++)for(let j=i+1;j<10;j++)assert.ok(separated(cells[i],cells[j]))
 }
 assert.ok(convex(ps[1])&&convex(ps[3]))
 assert.ok(ps[1].every(p=>distance(p,C[3])<49))
 // Q-body right-to-left ending edge is x20.8, y94→88. LEFT shares y88→91.
 assert.deepEqual(ps[2].slice(10,12),[[20.8,94],[20.8,88]])
 assert.deepEqual(ps[3],[[20.8,91],[13.8,89.5],[13.8,88],[20.8,88]])
 // This convex tail's x-prefix retains its complete shared vertical edge for every p>0.
 assert.equal(20.8-13.8,7);assert.equal(91-88,3)
 const witness=[13.81,88.1],quarter=C.map(p=>p.slice())
 const l1=lerp(C[0],C[1],.25),l2=lerp(C[1],C[2],.25),l3=lerp(C[2],C[3],.25),m1=lerp(l1,l2,.25),m2=lerp(l2,l3,.25),split=lerp(m1,m2,.25)
 assert.ok(witness[1]-Math.max(C[0][1],l1[1],m1[1],split[1])>7)
 assert.ok(Math.min(split[0],m2[0],l3[0],C[3][0])-witness[0]>7)
 assert.ok(Math.min(...Q.map(p=>p[0]))-witness[0]>7)
 console.log(JSON.stringify({newTargetOnly:true,originalBodyConvexCells:20,bodyMaxDiskDistanceSquared:maxDistanceSquared,tailSharedEdgeLength:3,missingTailInteriorWitness:witness,sourceFieldsChanged:0,nativeApproval:false}))
})
