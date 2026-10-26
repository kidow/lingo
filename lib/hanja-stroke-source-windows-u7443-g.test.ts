import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u7443-g-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU7443GSourceWindowContext,reviewedU7443GSourceWindowPolicy,sampleReviewedU7443GSourceWindowFrame,commitReviewedU7443GSourceWindow,REVIEWED_U7443_G_SOURCE_WINDOWS,REVIEWED_U7443_G_SOURCE_WINDOW_INPUT_SHA256} from './hanja-stroke-source-windows-u7443-g.ts'
const f=fixture['u7443-g'],s=f.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
const context=()=>{const c=makeReviewedU7443GSourceWindowContext(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen:4|8)=>{const p=reviewedU7443GSourceWindowPolicy(context(),pen-1,0);assert(p);return p}
test('瑃 strict whole13 factory has exact3 args, all fields and getter-free comparison',()=>{
 assert(context())
 const reversed=(o:object)=>Object.fromEntries(Object.entries(o).reverse())
 assert(makeReviewedU7443GSourceWindowContext(reversed(f.fullProof),reversed(f.identity),clone(s)))
 const make=makeReviewedU7443GSourceWindowContext as (...args:unknown[])=>unknown
 assert.equal(make(f.fullProof,f.identity),null);assert.equal(make(f.fullProof,f.identity,s,0),null)
 for(const key of Object.keys(f.identity)){
  const missing={...f.identity}as Record<string,unknown>;delete missing[key]
  assert.equal(make(f.fullProof,missing,s),null)
 }
 assert.equal(make(f.fullProof,{...f.identity,extra:true},s),null)
 assert.equal(make(f.fullProof,Object.assign(Object.create(null),f.identity),s),null)
 const changed=clone(f.fullProof);changed.trace[0][0].args[0]+=.01;assert.equal(make(changed,f.identity,s),null)
 const incomplete=clone(f.strokes);incomplete.pop();assert.equal(make(f.fullProof,f.identity,incomplete),null)
 const extra=clone(s).map(slot=>[...slot]);extra[0].push(clone(extra[0][0]));assert.equal(make(f.fullProof,f.identity,extra),null)
 let reads=0
 const getter=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}})
 assert.equal(make(f.fullProof,getter,s),null);assert.equal(reads,0)
})
test('瑃 policies own only4m1 and8m1 with separate existing proof families',()=>{
 const c=context()
 for(let pen=0;pen<s.length;pen++)for(let mask=0;mask<s[pen].length;mask++){
  const p=reviewedU7443GSourceWindowPolicy(c,pen,mask)
  if(mask===0&&(pen===3||pen===7))assert(p);else assert.equal(p,null)
 }
 assert.equal(reviewedU7443GSourceWindowPolicy({...c},3,0),null)
 assert.equal(reviewedU7443GSourceWindowPolicy(c,8,0),null)
 assert.equal(policy(4).proofFamily,'strict-union-kernel-at-original-Q0')
 assert.equal(policy(8).proofFamily,'source-specific-finite-rect')
 for(const pen of[4,8]as const){const p=policy(pen);assert.deepEqual(p.segment,s[pen-1][0]);assert.deepEqual(p.sourceBounds,p.segment.bounds);assert.deepEqual(p.anchor,p.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number))}
})
test('瑃 frame preserves P/Q/width/calculated weight, hides0 and directly completes1',()=>{
 for(const pen of[4,8]as const){
  const p=policy(pen),original=clone(p.segment),[ax,ay]=p.anchor,[x0,y0,x1,y1]=p.sourceBounds
  for(const progress of[0,1e-8,1e-6,.001,.01,.03,.1,.5,.75,.999999,1]){
   const f=sampleReviewedU7443GSourceWindowFrame(p,p.segment,progress)
   assert.equal(f.visible,progress>0);assert.equal(f.originalPDirect,progress===1);assert.equal(f.sourceGuide,p.segment.revealPath)
   assert.equal(f.sourceWidth,14);assert.equal(f.UARead,false);assert.equal(f.originalClockEquivalent,false);assert.equal(f.anchorIsOriginalQ0,true)
   if(progress>0&&progress<1)assert.deepEqual(f.clip,{x:ax+(x0-ax)*progress,y:ay+(y0-ay)*progress,width:(x1-x0)*progress,height:(y1-y0)*progress})
   else assert.equal(f.clip,null)
   assert.equal(f.outline,progress===0?null:p.segment.outline)
  }
  assert.deepEqual(p.segment,original)
 }
})
test('瑃 frames reject clone policies, getters, invalid progress and changed original fields',()=>{
 const p=policy(4)
 assert.throws(()=>sampleReviewedU7443GSourceWindowFrame({...p},p.segment,.1))
 let reads=0;const getter=Object.defineProperty({...p},'segment',{get(){reads++;return p.segment}})
 assert.throws(()=>sampleReviewedU7443GSourceWindowFrame(getter,p.segment,.1));assert.equal(reads,0)
 for(const patch of[{outline:p.segment.outline+' '},{revealPath:p.segment.revealPath+' '},{revealWidth:15},{weight:p.segment.weight+.01},{direction:'down' as const},{bounds:[0,0,100,100]as const}]){
  assert.throws(()=>sampleReviewedU7443GSourceWindowFrame(p,{...p.segment,...patch},.1))
 }
 for(const v of[-1,1.1,NaN,Infinity])assert.throws(()=>sampleReviewedU7443GSourceWindowFrame(p,p.segment,v))
})
const NS='http://www.w3.org/2000/svg',P='data-u7443-g-source-window-'
class N{
 nodeType=1;namespaceURI=NS;isConnected=true;parentNode:N|null=null;children:N[]=[]
 ownerSVGElement:N|null=null;attrs=new Map<string,string>();css=new Map<string,string>()
 style={setProperty:(k:string,v:string)=>{this.css.set(k,v)},getPropertyValue:(k:string)=>this.css.get(k)??''}
 localName:string;ownerDocument:D
 constructor(localName:string,ownerDocument:D){this.localName=localName;this.ownerDocument=ownerDocument}
 getAttribute(k:string){return this.attrs.get(k)??null}
 setAttribute(k:string,v:string){this.attrs.set(k,v);this.ownerDocument.onSet?.(this,k,v)}
 removeAttribute(k:string){this.attrs.delete(k)}
 append(n:N){this.children.push(n);n.parentNode=this}
}
class D{
 onStyleRead:((n:N)=>void)|null=null;onSet:((n:N,k:string,v:string)=>void)|null=null
 defaultView={document:this,getComputedStyle:(n:N)=>{
  this.onStyleRead?.(n)
  const values:Record<string,string>={display:'inline',transform:'none',filter:'none',clipPath:n.getAttribute('clip-path')??'none',opacity:'1',mixBlendMode:'normal',stroke:'none',fillOpacity:'1',fillRule:'nonzero',fill:'rgb(66, 85, 255)',visibility:n.getAttribute('visibility')??'visible'}
  for(const[k,v]of n.css)values[k]=v
  return {...values,getPropertyValue:(k:string)=>n.css.get(k)??(['x','y','width','height'].includes(k)&&n.localName==='rect'?(n.getAttribute(k)??'0')+'px':['mask-image','translate','rotate','scale'].includes(k)?'none':'')}
 }}
 createElementNS(_ns:string,name:string){return new N(name,this)}
}
function dom(p:ReturnType<typeof policy>,progress:number){
 const doc=new D(),owner=new N('svg',doc),outer=new N('g',doc);owner.setAttribute('viewBox','0 0 100 100');owner.append(outer)
 outer.setAttribute('data-stroke-outlines','true')
 for(let i=0;i<13;i++){const slot=new N('g',doc);slot.setAttribute('data-outline-stroke',String(i+1));outer.append(slot)}
 const slot=outer.children[p.pen-1],g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-'+(p.pen-1)+'-0'
 slot.append(g);g.append(defs);defs.append(c);c.append(r);g.append(ink)
 for(const node of[outer,...outer.children,g,defs,c,r,ink])node.ownerSVGElement=owner
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(progress));g.setAttribute(P+'clip',id)
 c.setAttribute('id',id+'-u7443-g-source-window-clip');c.setAttribute('clipPathUnits','userSpaceOnUse')
 ink.setAttribute('d',p.segment.outline);ink.setAttribute('visibility','hidden')
 for(const k of['x','y','width','height'])r.setAttribute(k,'999')
 return {doc,owner,outer,slot,g,defs,c,r,ink,id,nodes:{group:g,ink,rect:r,clipPath:c}as unknown as Parameters<typeof commitReviewedU7443GSourceWindow>[4]}
}
test('瑃 DOM commits all four rect attributes, exact source ink, hidden0 and unmasked full1',()=>{
 for(const pen of[4,8]as const)for(const progress of[0,1e-6,.03,.5,1]){
  const p=policy(pen),d=dom(p,progress),result=commitReviewedU7443GSourceWindow(p,p.segment,progress,d.id,d.nodes)
  assert.equal(result.status,progress===0?'empty':progress===1?'complete':'visible')
  const frame=sampleReviewedU7443GSourceWindowFrame(p,p.segment,progress),shape=frame.clip??{x:p.anchor[0],y:p.anchor[1],width:0,height:0}
  for(const[k,v]of Object.entries(shape))assert.equal(d.r.getAttribute(k),String(v))
  assert.equal(d.ink.getAttribute('d'),p.segment.outline);assert.equal(d.ink.getAttribute('mask'),null)
  assert.equal(d.ink.getAttribute('visibility'),progress===0?'hidden':'visible');assert.equal(d.ink.getAttribute(P+'committed'),'true')
  assert.equal(d.ink.getAttribute('clip-path'),progress===1?null:'url(#'+d.id+'-u7443-g-source-window-clip)')
  result.cleanup();assert.equal(d.ink.getAttribute('visibility'),'hidden')
 }
})
test('瑃 DOM rejects different owner/coordinates/source/rect CSS and mid-commit visibility edits',()=>{
 const p=policy(8)
 const reject=(change:(d:ReturnType<typeof dom>)=>void)=>{const d=dom(p,.03);change(d);const result=commitReviewedU7443GSourceWindow(p,p.segment,.03,d.id,d.nodes);assert.equal(result.status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden');assert.equal(d.ink.getAttribute(P+'committed'),'false')}
 reject(d=>{d.g.ownerSVGElement=new N('svg',d.doc)})
 reject(d=>{d.owner.setAttribute('viewBox','0 0 200 200')})
 reject(d=>{d.outer.children.reverse()})
 reject(d=>{d.g.setAttribute('transform','translate(1)')})
 reject(d=>{d.ink.setAttribute('d',p.segment.outline+' ')})
 reject(d=>{d.r.css.set('width','100px')})
 reject(d=>{d.ink.css.set('d','path("M0 0 L1 1 Z")')})
 reject(d=>{let once=false;d.doc.onSet=(n,k)=>{if(!once&&n===d.ink&&k===P+'phase'){once=true;d.r.attrs.set('height','1')}}})
 reject(d=>{let once=false;d.doc.onSet=(n,k,v)=>{if(!once&&n===d.ink&&k==='visibility'&&v==='visible'){once=true;d.ink.attrs.set('visibility','hidden')}}})
 reject(d=>{let once=false;d.doc.onStyleRead=()=>{if(!once){once=true;d.g.ownerSVGElement=new N('svg',d.doc)}}})
})
test('瑃 fixed source/projection geometry and two distinct proof pins retain their exact scopes',()=>{
 assert.equal(REVIEWED_U7443_G_SOURCE_WINDOWS.pens,13);assert.equal(REVIEWED_U7443_G_SOURCE_WINDOWS.masks,14);assert.equal(REVIEWED_U7443_G_SOURCE_WINDOWS.polygons,25)
 assert.equal(REVIEWED_U7443_G_SOURCE_WINDOWS.geometrySHA256,f.geometrySHA256)
 assert.equal(s.flat().length,14);assert.equal(f.fullProof.groups.flatMap(g=>g.polygons).length,25)
 for(const key of['sourcePOrQOrWidth14OrCalculatedWeightChanged','originalClockEquivalent','appRendererConnected','nativeApproval','runtimeApplied']as const)assert.equal(REVIEWED_U7443_G_SOURCE_WINDOWS[key],false)
 for(const[path,pin]of Object.entries(REVIEWED_U7443_G_SOURCE_WINDOW_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),pin)
})

import {reviewedU7443GHead9Policy,sampleReviewedU7443GHead9Frame,verifyReviewedU7443GHead9PriorDOM,commitReviewedU7443GHead9,REVIEWED_U7443_G_SOURCE_WINDOW_INPUT,REVIEWED_U7443_G_HEAD9_SOURCE,REVIEWED_U7443_G_HEAD9_INPUT_SHA256} from './hanja-stroke-source-windows-u7443-g.ts'
const head9Policy=()=>{const p=reviewedU7443GHead9Policy(context(),8,0);assert(p);return p}
const H9='data-u7443-g-source-head9-'
function head9DOM(progress:number,prior7Progress=1){
 const p=head9Policy(),doc=new D(),owner=new N('svg',doc),outer=new N('g',doc)
 owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true')
 for(let i=0;i<13;i++){const n=new N('g',doc);n.setAttribute('data-outline-stroke',String(i+1));outer.append(n)}
 const priorSlot=outer.children[6],prior=new N('path',doc),slot=outer.children[8],g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='head9-8-0'
 priorSlot.append(prior);prior.setAttribute('d',p.priorSegment.outline)
 slot.append(g);g.append(defs);defs.append(c);c.append(r);g.append(ink)
 for(const n of[outer,...outer.children,prior,g,defs,c,r,ink])n.ownerSVGElement=owner
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(progress));g.setAttribute(H9+'clip',id)
 g.setAttribute(H9+'prior-stroke','7');g.setAttribute(H9+'prior-progress',String(prior7Progress))
 c.setAttribute('id',id+'-u7443-g-source-head9-clip');c.setAttribute('clipPathUnits','userSpaceOnUse');ink.setAttribute('d',p.segment.outline);ink.setAttribute('visibility','hidden')
 return {p,doc,owner,outer,priorSlot,prior,slot,g,defs,c,r,ink,id,nodes:{group:g,ink,rect:r,clipPath:c}as unknown as Parameters<typeof commitReviewedU7443GHead9>[5]}
}
test('瑃9 keeps4/8 selector unchanged and separately binds author anchor plus source stroke7',()=>{
 const p=head9Policy(),c=context()
 assert.equal(reviewedU7443GSourceWindowPolicy(c,8,0),null)
 for(const i of[0,3,6,7,9,12])assert.equal(reviewedU7443GHead9Policy(c,i,0),null)
 assert.equal(reviewedU7443GHead9Policy({...c},8,0),null)
 assert.equal(p.priorStroke,7);assert.deepEqual(p.priorSegment,s[6][0]);assert.deepEqual(p.segment,s[8][0]);assert.deepEqual(p.anchor,[73,44.75])
 const input=REVIEWED_U7443_G_SOURCE_WINDOW_INPUT
 assert(Object.isFrozen(input));assert(makeReviewedU7443GSourceWindowContext(input.fullProof,input.identity,s))
 const zero=sampleReviewedU7443GHead9Frame(p,p.segment,0,0,false);assert.equal(zero.visible,false);assert.equal(zero.outline,null)
 for(const progress of[1e-6,.001,.01,.03,.5,.999999,1]){
  for(const [priorProgress,opaque]of[[0,true],[.999999,true],[1,false]]as const)assert.throws(()=>sampleReviewedU7443GHead9Frame(p,p.segment,progress,priorProgress,opaque))
  const f=sampleReviewedU7443GHead9Frame(p,p.segment,progress,1,true)
  assert.equal(f.sourceGuide,'M72.53999999999999 44.11 Q79.91 59.3 90.965 66.16');assert.equal(f.sourceWidth,14)
  assert.deepEqual(f.sourceQ0,[72.53999999999999,44.11]);assert.notDeepEqual(f.sourceQ0,p.anchor);assert.equal(f.anchorIsOriginalQ0,false)
  assert.equal(f.originalClockEquivalent,false);assert.equal(f.priorStroke,7);assert.equal(f.UARead,false)
  assert.deepEqual(f.authorAnchorOffsetFromOriginalQ0,[73-f.sourceQ0[0],44.75-f.sourceQ0[1]])
  assert.equal(f.originalPDirect,progress===1)
 }
 assert.throws(()=>sampleReviewedU7443GHead9Frame({...p},p.segment,.03,1,true))
 let reads=0;const bad=Object.defineProperty({...p},'segment',{get(){reads++;return p.segment}})
 assert.throws(()=>sampleReviewedU7443GHead9Frame(bad,p.segment,.03,1,true));assert.equal(reads,0)
 for(const patch of[{outline:p.segment.outline+' '},{revealPath:p.segment.revealPath+' '},{revealWidth:15},{weight:p.segment.weight+.01}])assert.throws(()=>sampleReviewedU7443GHead9Frame(p,{...p.segment,...patch},.03,1,true))
 for(const n of[-1,NaN,Infinity,1.1])assert.throws(()=>sampleReviewedU7443GHead9Frame(p,p.segment,.03,n,true))
})
test('瑃9 verifies current separate7 direct opaque P and commits rect4, hidden0 and full1',()=>{
 for(const progress of[0,1e-6,.03,.5,1]){
  const d=head9DOM(progress,progress===0?0:1),prior7Progress=progress===0?0:1
  assert.equal(verifyReviewedU7443GHead9PriorDOM(d.p,d.g as unknown as SVGGElement,progress,prior7Progress),progress!==0)
  const result=commitReviewedU7443GHead9(d.p,d.p.segment,progress,prior7Progress,d.id,d.nodes)
  assert.equal(result.status,progress===0?'empty':progress===1?'complete':'visible')
  const frame=sampleReviewedU7443GHead9Frame(d.p,d.p.segment,progress,prior7Progress,progress!==0),shape=frame.clip??{x:73,y:44.75,width:0,height:0}
  for(const[k,v]of Object.entries(shape))assert.equal(d.r.getAttribute(k),String(v))
  assert.equal(d.ink.getAttribute('d'),d.p.segment.outline);assert.equal(d.prior.getAttribute('d'),s[6][0].outline)
  assert.equal(d.ink.getAttribute('visibility'),progress===0?'hidden':'visible');assert.equal(d.ink.getAttribute(H9+'committed'),'true')
  assert.equal(d.ink.getAttribute('clip-path'),progress===1?null:'url(#'+d.id+'-u7443-g-source-head9-clip)')
 }
})
test('瑃9 rejects missing/wrong7, incomplete progress, owner, effects, visibility and direct-geometry changes',()=>{
 const reject=(change:(d:ReturnType<typeof head9DOM>)=>void,prior7Progress=1)=>{const d=head9DOM(.03,prior7Progress);change(d);assert.equal(verifyReviewedU7443GHead9PriorDOM(d.p,d.g as unknown as SVGGElement,.03,prior7Progress),false);const r=commitReviewedU7443GHead9(d.p,d.p.segment,.03,prior7Progress,d.id,d.nodes);assert.equal(r.status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden')}
 reject(()=>{},0);reject(()=>{},.999999)
 reject(d=>{d.priorSlot.children=[]})
 reject(d=>{d.prior.setAttribute('d',s[7][0].outline)})
 reject(d=>{d.g.setAttribute(H9+'prior-stroke','8')})
 reject(d=>{d.g.setAttribute(H9+'prior-progress','0')})
 reject(d=>{d.prior.ownerSVGElement=new N('svg',d.doc)})
 reject(d=>{d.prior.ownerDocument=new D()})
 reject(d=>{d.prior.setAttribute('visibility','hidden')})
 reject(d=>{d.prior.css.set('visibility','hidden')})
 reject(d=>{d.prior.css.set('opacity','.5')})
 reject(d=>{d.prior.css.set('fill','rgba(66,85,255,.5)')})
 reject(d=>{d.prior.css.set('fillOpacity','.5')})
 reject(d=>{d.prior.css.set('d','path("M0 0 L1 1 Z")')})
 for(const k of['mask','clip-path','transform','filter','pathLength','stroke-dasharray','stroke-dashoffset'])reject(d=>{d.prior.setAttribute(k,k==='pathLength'?'1':'changed')})
 for(const [k,v]of[['filter','blur(1px)'],['mask-image','url(#x)'],['transform','matrix(1,0,0,1,1,0)'],['display','none']])reject(d=>{d.priorSlot.css.set(k,v)})
 reject(d=>{d.outer.children[6]=d.outer.children[7]})
})
test('瑃9 rechecks separate7 after rect updates and after target visibility mutation',()=>{
 for(const stage of['rectangle','visible','style-read']as const){
  const d=head9DOM(.03);let once=false
  if(stage==='style-read')d.doc.onStyleRead=()=>{if(!once){once=true;d.prior.ownerSVGElement=new N('svg',d.doc)}}
  else d.doc.onSet=(node,k,v)=>{if(!once&&((stage==='rectangle'&&node===d.r&&k==='x')||(stage==='visible'&&node===d.ink&&k==='visibility'&&v==='visible'))){once=true;d.prior.setAttribute('clip-path','url(#changed)')}}
  const result=commitReviewedU7443GHead9(d.p,d.p.segment,.03,1,d.id,d.nodes)
  assert.equal(result.status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden');assert.equal(d.ink.getAttribute(H9+'committed'),'false')
 }
})
test('瑃9 preserves finite-rect and nonadjacent-prior proof scopes without replaying geometry',()=>{
 assert.equal(REVIEWED_U7443_G_HEAD9_SOURCE.priorStroke,7);assert.equal(REVIEWED_U7443_G_HEAD9_SOURCE.priorIsSeparateNonAdjacentStroke,true)
 assert.equal(REVIEWED_U7443_G_HEAD9_SOURCE.eventCount,75);assert.equal(REVIEWED_U7443_G_HEAD9_SOURCE.openIntervals,74);assert.equal(REVIEWED_U7443_G_HEAD9_SOURCE.closedPositiveStates,74)
 assert.equal(REVIEWED_U7443_G_HEAD9_SOURCE.priorContactAreaLowerCoefficient,'1/2500')
 for(const key of['anchorIsOriginalQ0','originalClockEquivalent','sourcePOrQOrWidthOrWeightChanged','appRendererConnected','nativeApproval','runtimeApplied']as const)assert.equal(REVIEWED_U7443_G_HEAD9_SOURCE[key],false)
 for(const[path,pin]of Object.entries(REVIEWED_U7443_G_HEAD9_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),pin)
})
