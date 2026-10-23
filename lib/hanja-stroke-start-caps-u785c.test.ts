import assert from 'node:assert/strict'
import {test}from'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import {reviewedU785cContext,reviewedU785cPolicy,commitReviewedU785cCaps,REVIEWED_U785C_INPUT_SHA256,REVIEWED_U785C_PROOFS,REVIEWED_U785C_SOURCE}from './hanja-stroke-start-caps-u785c.ts'
const clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const strokes=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-qq-three-u785c-source-experiment-2026-10-23/fixtures.json',import.meta.url),'utf8')).u785c.strokes
const context=reviewedU785cContext(strokes);assert(context)
const targets=[1,3,6,7,8]
function selected(i:number){const p=reviewedU785cPolicy(context,targets[i],0);assert(p);return p}
function fake(i:number){
 const policy=selected(i),segment=policy.segment,id='u785c-test-'+i,L=100,events:string[]=[]
 const doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view
 let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg
 const group=node('g'),target=node('g',{'data-stroke-start-gate':policy.id,'data-u785c-progress':'.5','data-u785c-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u785c-measurement':'true',id:id+'-u785c-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u785c-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u785c-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u785c-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 const nodes={measurement,guide,startCap,endCap,ink}
 return{policy,segment,id,L,q0,doc,view,node,svg,owner,group,target,defs,measurement,mask,guide,startCap,endCap,ink,completed,nodes,events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(fn:()=>void)=>{lengthHook=fn},onPoint:(fn:(d:number)=>{x:number;y:number})=>{pointHook=fn}}
}
function dispatch(x:ReturnType<typeof fake>,p:number,s=x.segment){return commitReviewedU785cCaps(x.policy,s,p,x.id,x.nodes as any)}
function commit(x:ReturnType<typeof fake>,p:number,s=x.segment){x.target.attrs['data-u785c-progress']=String(p);return dispatch(x,p,s)}



test('硜 five exact target-only initial certificates separate MQ curvature and MLL first leg',()=>{
 for(const[p,h]of Object.entries(REVIEWED_U785C_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),h)
 assert.deepEqual(targets.map((_,i)=>selected(i).certificate.syntax),['MQ','MLL','MQ','MQ','MQ'])
 assert.equal(REVIEWED_U785C_PROOFS.length,5);assert.equal(selected(1).certificate.K,'0');assert.equal(selected(1).certificate.firstLegLength,'1253/80')
 for(const i of[0,2,3,4]){assert.equal(selected(i).certificate.T,'1/2');assert.equal(selected(i).certificate.K,'1/20');assert(Object.isFrozen(selected(i).certificate.storedBounds))}
 for(const p of[6,7,8])assert.equal(reviewedU785cPolicy(context,p,1),null)
 assert.equal(reviewedU785cPolicy(context,0,0),null);assert.equal(REVIEWED_U785C_SOURCE.runtimeApplied,false)
})
test('硜 exact source/private context rejects material changes and accessors without reading them',()=>{
 assert.equal(reviewedU785cPolicy({...context!},1,0),null)
 let negatives=0
 for(const p of targets)for(const k of Object.keys(strokes[p][0])){const q=clone(strokes);if(k==='bounds')q[p][0][k][0]+=.01;else if(typeof q[p][0][k]==='number')q[p][0][k]+=.01;else q[p][0][k]+=' ';assert.equal(reviewedU785cContext(q),null);negatives++}
 let reads=0;const q=clone(strokes);Object.defineProperty(q[1][0],'weight',{enumerable:true,get(){reads++;return 1}});assert.equal(reviewedU785cContext(q),null);assert.equal(reads,0)
 console.log(JSON.stringify({targetMaterialNegatives:negatives,sourceProjection:0,mathRerun:0,nativeScreens:0}))
})
test('硜 every new target uses same-frame distance and growing radius then rejects changed guide',()=>{
 for(let i=0;i<5;i++){
  const x=fake(i),r=commit(x,.03);assert.equal(r.status,'visible');assert(r.frame);assert.equal(r.frame.d,3);assert.equal(r.frame.rho,3);assert.equal(x.startCap.attrs.r,'3');assert.equal(x.ink.attrs['data-growing-distance'],'3')
  r.cleanup();assert.equal(x.ink.attrs.visibility,'hidden');assert.equal(x.startCap.attrs.r,'0')
  const changed=fake(i);changed.onLength(()=>{changed.measurement.attrs.d+=' '});assert.equal(commit(changed,.03).status,'hidden');assert.equal(changed.startCap.attrs.r,'0');assert.equal(changed.ink.attrs['data-growing-distance'],undefined)
  const z=fake(i);assert.equal(commit(z,0).status,'empty');assert.equal(commit(z,1).status,'complete');assert.deepEqual(z.counts(),[0,0])
 }
})
