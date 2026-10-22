import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU5611Context,reviewedU5611Policy,measureReviewedU5611Frame,commitReviewedU5611Caps,REVIEWED_U5611_SOURCE} from './hanja-stroke-start-gate-u5611.ts'
// UA API는 mock이며 실제 browser/제품 UI 승인이 아니다. 저장된 고유 곡률 산술을 재계산하지 않는다.
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-renderer-growing-hq6-up9-left14-u5611-experiment-2026-10-22/fixture.json',import.meta.url),'utf8'))
const strokes=fixture.u5611.strokes as HanjaOutlineStrokes,targets=[[5,1]] as const
const context=reviewedU5611Context(strokes),clone=()=>JSON.parse(JSON.stringify(strokes)) as HanjaOutlineStrokes
function selected(i:number){const[p,m]=targets[i],policy=reviewedU5611Policy(context,p,m);assert(policy);return policy}
function fake(i:number){
 const policy=selected(i),segment=policy.segment,id='u5611-test-'+i,L=100,events:string[]=[]
 const doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view
 let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg
 const group=node('g'),target=node('g',{'data-stroke-start-gate':policy.id,'data-u5611-progress':'.5','data-u5611-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u5611-measurement':'true',id:id+'-u5611-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u5611-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u5611-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u5611-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 const nodes={measurement,guide,startCap,endCap,ink}
 return{policy,segment,id,L,q0,doc,view,node,svg,owner,group,target,defs,measurement,mask,guide,startCap,endCap,ink,completed,nodes,events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(fn:()=>void)=>{lengthHook=fn},onPoint:(fn:(d:number)=>{x:number;y:number})=>{pointHook=fn}}
}
function dispatch(x:ReturnType<typeof fake>,p:number,s=x.segment){return commitReviewedU5611Caps(x.policy,s,p,x.id,x.nodes as any)}
function commit(x:ReturnType<typeof fake>,p:number,s=x.segment){x.target.attrs['data-u5611-progress']=String(p);return dispatch(x,p,s)}



test('嘑 exact18mask Q6 context and source certificate only',()=>{
 assert(context);assert.equal(REVIEWED_U5611_SOURCE.geometrySHA256,"1fa8bb9250960fa6aa09664ba76147f42a799005f38d8dbf34abdb580aa977db");assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),REVIEWED_U5611_SOURCE.geometrySHA256);
 const q=selected(0);assert.deepEqual([q.certificate.T,q.certificate.K],['2/3','1/100']);assert.equal(q.segment.revealPath,'M88.3975 24 Q85.635 30 82.32 36.5');assert(Object.isFrozen(q.segment)&&Object.isFrozen(q.segment.bounds));
 for(const[p,m]of[[5,0],[8,0],[8,1],[13,0],[13,1]])assert.equal(reviewedU5611Policy(context,p,m),null);
 for(const mutate of[(x:HanjaOutlineStrokes)=>(x as any)[8][1].weight++,(x:HanjaOutlineStrokes)=>(x as any)[13].reverse(),(x:HanjaOutlineStrokes)=>(x as any)[5][1].revealWidth++]){const x=clone();mutate(x);assert.equal(reviewedU5611Context(x),null)}
 const changed=clone();(changed as any)[5][1]=Object.fromEntries(Object.entries(changed[5][1]).reverse());assert(reviewedU5611Context(changed));assert.throws(()=>{(q.segment.bounds as number[])[0]=0});assert.equal(REVIEWED_U5611_SOURCE.actualComponentApproval,false)
});
test('嘑 Q6 same frame strict binding and endpoint cleanup mock',()=>{
 const a=fake(0),r=commit(a,.03);assert.equal(r.status,'visible');assert.deepEqual(a.counts(),[1,1]);assert.equal(r.frame!.d,3);assert.equal(r.frame!.rho,3);assert.equal(a.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(a.ink.getAttribute('visibility'),'hidden');assert.equal(a.startCap.getAttribute('r'),'0');
 for(const p of[0,1]){const x=fake(0);assert.equal(commit(x,p).status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0])}
 for(const p of[NaN,Infinity,-.1,1.1])assert.equal(commit(fake(0),p).status,'hidden');
 const changes=[(x:ReturnType<typeof fake>)=>x.measurement.attrs.pathLength='1',(x:ReturnType<typeof fake>)=>x.group.attrs.transform='translate(1)',(x:ReturnType<typeof fake>)=>x.group.cssTranslate='1px',(x:ReturnType<typeof fake>)=>x.endCap.parentElement=x.group,(x:ReturnType<typeof fake>)=>x.ink.ownerDocument={},(x:ReturnType<typeof fake>)=>x.target.attrs['data-u5611-progress']='.4'];
 for(const change of changes)for(const when of['pre','between','post']){const x=fake(0);if(when==='pre'){x.target.attrs['data-u5611-progress']='0.5';change(x)}else if(when==='between')x.onLength(()=>change(x));else x.onPoint(()=>{change(x);return{x:x.q0[0],y:x.q0[1]}});assert.equal((when==='pre'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden')}
 const x=fake(0);assert.equal(commitReviewedU5611Caps({...x.policy},x.segment,.5,x.id,x.nodes as any).status,'hidden');
});
