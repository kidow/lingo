import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {reviewedU6705Context,reviewedU6705Policy} from './hanja-stroke-start-caps-u6705.ts'
import {reviewedU6705TailContext,reviewedU6705TailFrame,REVIEWED_U6705_LEFT_TAIL} from './hanja-stroke-original-left-tail-u6705.ts'
import {commitReviewedU6705Tail} from './hanja-stroke-original-left-tail-dom-u6705.ts'
const strokes=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-qq-u6705-source-experiment-2026-10-23/fixtures.json',import.meta.url),'utf8'))['u6705'].strokes
const context=reviewedU6705TailContext(strokes)!,policy=reviewedU6705Policy(reviewedU6705Context(strokes),10,0)!,segment=strokes[10][0]
function fake(progress:number){
 const id='u6705-composite-test',events:string[]=[],doc:any={defaultView:null};let svg:any=null,hook:(()=>void)|null=null,reads=0
 const view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,ownerSVGElement:svg,isConnected:true,parentElement:null as any,attrs:{...attrs},cssTransform:'none',cssTranslate:'none',writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string):string|null{return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 svg=node('svg');const frame=reviewedU6705TailFrame(context,segment,progress),target=node('g',{'data-stroke-start-gate':policy.id,'data-u6705-progress':String(frame.bodyProgress),'data-u6705-composite-progress':String(progress),'data-u6705-clip':id});target.parentElement=svg
 const defs=node('defs');defs.parentElement=target
 const measurement=Object.assign(node('path',{d:segment.revealPath,'data-u6705-measurement':'true'}),{getTotalLength(){reads++;hook?.();return 100},getPointAtLength(d:number){return{x:53.4675+d/10,y:52.5}}});measurement.parentElement=defs
 const clip=(suffix:string,d:string)=>{const c=node('clipPath',{id:id+suffix,clipPathUnits:'userSpaceOnUse'});c.parentElement=defs;const p=node('path',{d});p.parentElement=c;return p}
 const bodyClip=clip('-u6705-body',frame.bodyOutline),tailClip=clip('-u6705-left',frame.tailOutline)
 const mask=node('mask',{id:id+'-u6705-composite',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const group=node('g',{id:id+'-u6705-body-guide','clip-path':'url(#'+id+'-u6705-body)'});group.parentElement=mask
 const guide=node('path',{d:segment.revealPath,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter',stroke:'white'}),startCap=node('circle',{fill:'white'}),endCap=node('circle',{fill:'white'});for(const n of[guide,startCap,endCap])n.parentElement=group
 const bodyFill=node('path',{d:frame.bodyOutline,fill:'white'});bodyFill.parentElement=mask
 const tailGroup=node('g',{'clip-path':'url(#'+id+'-u6705-left)'});tailGroup.parentElement=mask
 const tailRect=node('rect',{x:'75.8',y:'88.5',width:'0',height:'3',fill:'white'});tailRect.parentElement=tailGroup
 const ink=node('path',{d:segment.outline,mask:'url(#'+id+'-u6705-composite)'});ink.parentElement=target
 const nodes={measurement,bodyClip,tailClip,guide,startCap,endCap,bodyFill,tailRect,ink}
 return{nodes,target,group,svg,events,id,reads:()=>reads,onLength:(f:()=>void)=>{hook=f},dispatch:()=>commitReviewedU6705Tail(context,policy,segment,progress,id,nodes as any)}
}
test('朅 original LEFT composite DOM masks one ink, keeps tail absent before body completion, fails closed on mutation',()=>{
 const share=REVIEWED_U6705_LEFT_TAIL.bodyShare
 for(const p of[0,1e-6,.03,share/2,share,share+(1-share)/2,1]){const f=fake(p),r=f.dispatch();assert.equal(r.status,p===0?'empty':'visible');assert.equal(f.reads(),1);assert.equal(f.nodes.ink.getAttribute('visibility'),p===0?'hidden':'visible');if(p<=share)assert.equal(f.nodes.tailRect.getAttribute('width'),'0');if(p>share)assert.equal(f.nodes.bodyFill.getAttribute('visibility'),'visible');if(p>0)assert.equal(f.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(f.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(f.nodes.tailRect.getAttribute('width'),'0')}
 const mutations=[(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u6705-composite-progress']='0.25'},(x:ReturnType<typeof fake>)=>{x.nodes.bodyClip.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.nodes.tailClip.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.nodes.ink.attrs.mask='url(#other)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='2px'},(x:ReturnType<typeof fake>)=>{x.nodes.tailRect.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.nodes.guide.attrs.transform='scale(2)'}]
 let negative=0;for(const mutate of mutations)for(const when of['before','length']){const f=fake(.5);if(when==='before')mutate(f);else f.onLength(()=>mutate(f));assert.equal(f.dispatch().status,'hidden');assert.equal(f.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(f.nodes.tailRect.getAttribute('width'),'0');negative++}
 const writing=fake(.5);writing.nodes.guide.writeHook=k=>{if(k==='stroke-dasharray'&&writing.reads())writing.target.attrs['data-u6705-composite-progress']='0.3'};assert.equal(writing.dispatch().status,'hidden');negative++
 console.log(JSON.stringify({newCompositeDOMFirst:true,finiteSamples:7,negative,nativeApproval:false,SSR:0,originalSourceMasks:15,originalInkPaths:1}))
})

test('朅 LEFT source fields, clock boundaries and foreign contexts fail closed',()=>{assert.equal(REVIEWED_U6705_LEFT_TAIL.bodyShare,78363543/88363543);assert.equal(REVIEWED_U6705_LEFT_TAIL.originalLEFTFlag,14);for(const p of[0,.01,.5,REVIEWED_U6705_LEFT_TAIL.bodyShare,1]){const f=reviewedU6705TailFrame(context,segment,p);assert.equal(f.tailRect.y,88.5);assert.equal(f.tailRect.height,3);assert.equal(f.bodyOutline+' '+f.tailOutline,segment.outline);assert.equal(f.originalMaskCount,15)}for(const p of[NaN,Infinity,-1,1.01])assert.throws(()=>reviewedU6705TailFrame(context,segment,p));assert.throws(()=>reviewedU6705TailFrame({...context},segment,.5));for(const key of['weight','revealPath','outline','bounds'] as const){const changed=JSON.parse(JSON.stringify(segment));if(key==='bounds')changed.bounds[0]+=.01;else if(key==='weight')changed.weight+=.01;else changed[key]+=' ';assert.throws(()=>reviewedU6705TailFrame(context,changed,.5))}})

