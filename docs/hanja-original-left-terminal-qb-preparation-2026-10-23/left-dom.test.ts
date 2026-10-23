import assert from 'node:assert/strict'
import test from 'node:test'
import a from '../hanja-source-original-u7c67-2026-10-23/fixtures.json' with {type:'json'}
import b from '../hanja-source-original-u8627-vs2-2026-10-23/fixtures.json' with {type:'json'}
import {reviewedU7c67Context,reviewedU7c67Policy} from '../../lib/hanja-stroke-start-caps-u7c67.ts'
import {reviewedU8627Context,reviewedU8627Policy} from '../hanja-original-qb-policy-proof-2026-10-23/caps-u8627.ts'
import {leftSourceContext,leftPolicy,leftFrame,LEFT_PREPARATION as P} from './left-terminal.ts'
import {commitLeftU7c67} from './left-dom-u7c67.ts'
import {commitLeftU8627} from './left-dom-u8627.ts'
const cases:any[]=[{ns:'u7c67',root:'u7c67',entry:a.u7c67,pen:15,commit:commitLeftU7c67,caps:()=>reviewedU7c67Policy(reviewedU7c67Context(a.u7c67.strokes),14,0)},{ns:'u8627',root:'u8627-ue0102',entry:b['u8627-ue0102'],pen:13,commit:commitLeftU8627,caps:()=>reviewedU8627Policy(reviewedU8627Context(b['u8627-ue0102'].strokes),12,0)}]
function fake(c:any,progress:number){
 const context=leftSourceContext(c.root,c.entry.fullProof,c.entry.identity,c.entry.strokes),left=leftPolicy(context,c.pen-1,0)!,policy=c.caps(),segment=c.entry.strokes[c.pen-1][0],frame=leftFrame(left,segment,progress)
 const id=c.ns+'-left-test',events:string[]=[],doc:any={defaultView:null};let svg:any=null,hook:(()=>void)|null=null,reads=0
 const view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,ownerSVGElement:svg,isConnected:true,parentElement:null as any,attrs:{...attrs},cssTransform:'none',cssTranslate:'none',writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string):string|null{return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 svg=node('svg');const target=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':'original-left-terminal',['data-'+c.ns+'-progress']:String(frame.bodyProgress),['data-'+c.ns+'-composite-progress']:String(progress),['data-'+c.ns+'-clip']:id});target.parentElement=svg
 const defs=node('defs');defs.parentElement=target
 const q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number)
 const measurement=Object.assign(node('path',{d:segment.revealPath,['data-'+c.ns+'-measurement']:'true'}),{getTotalLength(){reads++;hook?.();return 100},getPointAtLength(d:number){return{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const clip=(suffix:string,d:string)=>{const path=node('clipPath',{id:id+'-'+c.ns+suffix,clipPathUnits:'userSpaceOnUse'});path.parentElement=defs;const p=node('path',{d});p.parentElement=path;return p}
 const bodyClip=clip('-body',frame.bodyOutline),tailClip=clip('-left',frame.tailOutline)
 const mask=node('mask',{id:id+'-'+c.ns+'-composite',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const group=node('g',{id:id+'-'+c.ns+'-body-guide','clip-path':'url(#'+id+'-'+c.ns+'-body)'});group.parentElement=mask
 const guide=node('path',{d:segment.revealPath,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter',stroke:'white'}),startCap=node('circle',{fill:'white'}),endCap=node('circle',{fill:'white'});for(const n of[guide,startCap,endCap])n.parentElement=group
 const bodyFill=node('path',{d:frame.bodyOutline,fill:'white'});bodyFill.parentElement=mask
 const tailGroup=node('g',{'clip-path':'url(#'+id+'-'+c.ns+'-left)'});tailGroup.parentElement=mask
 const tailRect=node('rect',{x:'63.5',y:'81.3',width:'0',height:'3',fill:'white'});tailRect.parentElement=tailGroup
 const ink=node('path',{d:segment.outline,mask:'url(#'+id+'-'+c.ns+'-composite)'});ink.parentElement=target
 const nodes={measurement,bodyClip,tailClip,guide,startCap,endCap,bodyFill,tailRect,ink}
 return{nodes,target,group,svg,events,id,left,policy,segment,reads:()=>reads,onLength:(f:()=>void)=>{hook=f},dispatch:()=>c.commit(left,policy,segment,progress,id,nodes)}
}
test('two original LEFT DOM namespaces clip one ink and keep terminal absent until body completion',()=>{
 let samples=0,negative=0
 for(const c of cases){
  for(const p of[0,1e-6,.03,P.bodyShare-1e-10,P.bodyShare,P.bodyShare+1e-10,(P.bodyShare+1)/2,.9999,.99999999,1]){const f=fake(c,p),r=f.dispatch();assert.equal(r.status,p===0?'empty':'visible');assert.equal(f.reads(),1);assert.equal(f.nodes.ink.getAttribute('visibility'),p===0?'hidden':'visible');assert.equal(f.nodes.ink.getAttribute('d'),f.segment.outline);if(p<=P.bodyShare)assert.equal(f.nodes.tailRect.getAttribute('width'),'0');else assert.equal(f.nodes.bodyFill.getAttribute('visibility'),'visible');if(p>0)assert.equal(f.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(f.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(f.nodes.tailRect.getAttribute('width'),'0');assert.equal(f.nodes.ink.getAttribute('data-'+c.ns+'-composite-phase'),null);samples++}
  const mutations=[(f:any)=>{f.target.attrs['data-'+c.ns+'-composite-progress']='.25'},(f:any)=>{f.nodes.bodyClip.attrs.d+=' '},(f:any)=>{f.nodes.tailClip.attrs.d+=' '},(f:any)=>{f.nodes.ink.attrs.mask='url(#other)'},(f:any)=>{f.group.cssTranslate='2px'},(f:any)=>{f.nodes.tailRect.parentElement=f.group},(f:any)=>{f.nodes.guide.attrs.transform='scale(2)'},(f:any)=>{f.target.attrs['data-stroke-reveal-policy']='growing-other'},(f:any)=>{f.nodes.measurement.attrs.d+=' '}]
  for(const mutate of mutations)for(const when of['before','length']){const f=fake(c,.5);if(when==='before')mutate(f);else f.onLength(()=>mutate(f));assert.equal(f.dispatch().status,'hidden');assert.equal(f.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(f.nodes.tailRect.getAttribute('width'),'0');negative++}
  const writing=fake(c,.5);writing.nodes.guide.writeHook=k=>{if(k==='stroke-dasharray'&&writing.reads())writing.target.attrs['data-'+c.ns+'-composite-progress']='.3'};assert.equal(writing.dispatch().status,'hidden');negative++
  const tailWriting=fake(c,(P.bodyShare+1)/2);tailWriting.nodes.tailRect.writeHook=k=>{if(k==='width'&&tailWriting.reads())tailWriting.nodes.tailRect.attrs.x='53'};assert.equal(tailWriting.dispatch().status,'hidden');negative++
  const forged=fake(c,.5);assert.equal(c.commit({...forged.left},forged.policy,forged.segment,.5,forged.id,forged.nodes).status,'hidden');negative++
  const foreign=fake(c,.5),other=cases.find(x=>x!==c)!;assert.equal(c.commit(foreign.left,other.caps(),foreign.segment,.5,foreign.id,foreign.nodes).status,'hidden');negative++
 }
 console.log(JSON.stringify({newCompositeDOMFIRST:true,wholeBindings:2,finiteSamples:samples,negativeCases:negative,realUA:false,nativeScreens:0,sourceMasksChanged:false,originalInkPaths:1}))
})
