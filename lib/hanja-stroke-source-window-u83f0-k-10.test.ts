import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-independent-melon-line-q-u83f0-k-source-experiment-2026-10-23/fixtures.json' with {type:'json'}
import assessment from '../docs/hanja-source-pen10-u83f0-k-assessment-2026-10-23/evidence.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU83f0KSourceWindow10Context,reviewedU83f0KSourceWindow10Policy,sampleReviewedU83f0KSourceWindow10Frame,verifyReviewedU83f0KSourceWindow10Prior,commitReviewedU83f0KSourceWindow10,REVIEWED_U83F0_K_SOURCE_WINDOW10,REVIEWED_U83F0_K_SOURCE_WINDOW10_INPUT_SHA256} from './hanja-stroke-source-window-u83f0-k-10.ts'
const f=fixture['u83f0-k'],s=f.strokes as HanjaOutlineStrokes,id=assessment.sourceIdentity,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
const context=()=>{const c=makeReviewedU83f0KSourceWindow10Context(f.fullProof,id,s);assert(c);return c}
const policy=()=>{const p=reviewedU83f0KSourceWindow10Policy(context(),9,1);assert(p);return p}
test('菰10 preview strict whole3arg gate preserves all source fields and rejects getters',()=>{
 assert(context());const make=makeReviewedU83f0KSourceWindow10Context as (...args:unknown[])=>unknown
 assert(make(clone(f.fullProof),clone(id),clone(s)));assert.equal(make(f.fullProof,id),null);assert.equal(make(f.fullProof,id,s,0),null)
 assert.equal(make(f.fullProof,{...id,extra:1},s),null);assert.equal(make(f.fullProof,Object.assign(Object.create(null),id),s),null)
 const changed=clone(s);changed[0][0].weight+=1;assert.equal(make(f.fullProof,id,changed),null)
 const short=clone(s).slice(0,-1);assert.equal(make(f.fullProof,id,short),null)
 let reads=0;const getter=Object.defineProperty({...id},'path',{enumerable:true,get(){reads++;return id.path}});assert.equal(make(f.fullProof,getter,s),null);assert.equal(reads,0)
 for(let p=0;p<s.length;p++)for(let m=0;m<s[p].length;m++)assert.equal(!!reviewedU83f0KSourceWindow10Policy(context(),p,m),p===9&&m===1)
 assert.equal(reviewedU83f0KSourceWindow10Policy({...context()},9,1),null)
})
test('菰10 only original Q3P rectangle with unchanged P/Q/weight and unapproved forward clock',()=>{
 const p=policy(),original=clone(p.segment)
 for(const progress of[0,1e-8,.001,.03,13/152-1e-10,13/152,13/152+1e-10,.5,1]){
  const frame=sampleReviewedU83f0KSourceWindow10Frame(p,p.segment,progress,1,true)
  assert.equal(frame.visible,progress>0);assert.equal(frame.originalPDirect,progress===1);assert.equal(frame.sourceGuide,p.segment.revealPath);assert.equal(frame.sourceWidth,14);assert.equal(frame.sourceCalculatedWeight,p.segment.weight)
  assert.deepEqual(frame.originalQ0,[46.2,87.8425]);assert.equal(frame.anchorIsOriginalQ0,false);assert.equal(frame.originalClockEquivalent,false);assert.equal(frame.UARead,false)
  if(progress>0&&progress<1)assert.deepEqual(frame.clip,{x:63.75+(45.3-63.75)*progress,y:84.5+(82.6-84.5)*progress,width:(78.65-45.3)*progress,height:(92.1-82.6)*progress});else assert.equal(frame.clip,null)
 }
 assert.deepEqual(p.segment,original)
 assert.throws(()=>sampleReviewedU83f0KSourceWindow10Frame({...p},p.segment,.1,1,true))
 for(const patch of[{outline:p.segment.outline+' '},{revealPath:p.segment.revealPath+' '},{revealWidth:15},{weight:p.segment.weight+.01}])assert.throws(()=>sampleReviewedU83f0KSourceWindow10Frame(p,{...p.segment,...patch},.1,1,true))
 for(const progress of[-1,1.1,NaN,Infinity])assert.throws(()=>sampleReviewedU83f0KSourceWindow10Frame(p,p.segment,progress,1,true))
 assert.throws(()=>sampleReviewedU83f0KSourceWindow10Frame(p,p.segment,.1,1,false));assert.throws(()=>sampleReviewedU83f0KSourceWindow10Frame(p,p.segment,.1,.99999,true))
})
const NS='http://www.w3.org/2000/svg',P='data-u83f0-k-source-window10-'
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
 for(let i=0;i<12;i++){const slot=new N('g',doc);slot.setAttribute('data-outline-stroke',String(i+1));outer.append(slot)}
 const slot=outer.children[p.pen-1],g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-'+(p.pen-1)+'-1'
 const prior=new N('path',doc);prior.setAttribute('d',p.priorSegment.outline);prior.ownerSVGElement=owner;slot.append(prior);slot.append(g);g.append(defs);defs.append(c);c.append(r);g.append(ink)
 for(const node of[outer,...outer.children,g,defs,c,r,ink])node.ownerSVGElement=owner
 for(const n of[slot,g,prior])n.setAttribute(P+'owner',id+'-owner');g.setAttribute(P+'frame','frame-1');prior.setAttribute(P+'frame','frame-1');prior.setAttribute(P+'progress','1');
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(progress));g.setAttribute(P+'clip',id)
 c.setAttribute('id',id+'-u83f0-k-source-window10-clip');c.setAttribute('clipPathUnits','userSpaceOnUse')
 ink.setAttribute('d',p.segment.outline);ink.setAttribute('visibility','hidden')
 for(const k of['x','y','width','height'])r.setAttribute(k,'999')
 return {doc,owner,outer,slot,g,defs,c,r,ink,id,prior,nodes:{group:g,ink,rect:r,clipPath:c}as unknown as Parameters<typeof commitReviewedU83f0KSourceWindow10>[4]}
}

test('菰10 same SVG/owner/frame completed opaque original V prior and rect4 commit',()=>{
 for(const progress of[0,1e-6,.03,13/152,.5,1]){
  const p=policy(),d=dom(p,progress)
  assert(verifyReviewedU83f0KSourceWindow10Prior(p,d.g as unknown as SVGGElement,1,'frame-1'))
  const result=commitReviewedU83f0KSourceWindow10(p,p.segment,progress,d.id,d.nodes,1,'frame-1')
  assert.equal(result.status,progress===0?'empty':progress===1?'complete':'visible',result.reason??'')
  const frame=sampleReviewedU83f0KSourceWindow10Frame(p,p.segment,progress,1,true),shape=frame.clip??{x:63.75,y:84.5,width:0,height:0}
  for(const[k,v]of Object.entries(shape))assert.equal(d.r.getAttribute(k),String(v))
  assert.equal(d.ink.getAttribute('clip-path'),progress===1?null:'url(#'+d.id+'-u83f0-k-source-window10-clip)');assert.equal(d.ink.getAttribute('d'),p.segment.outline)
 }
})
test('菰10 rejects wrong owner/frame/priorP/opacity/effect/clip and post-update tampering',()=>{
 const p=policy(),reject=(change:(d:ReturnType<typeof dom>)=>void)=>{const d=dom(p,.03);change(d);const r=commitReviewedU83f0KSourceWindow10(p,p.segment,.03,d.id,d.nodes,1,'frame-1');assert.equal(r.status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden')}
 reject(d=>d.prior.setAttribute('d',p.priorSegment.outline+' '));reject(d=>d.prior.setAttribute(P+'frame','old-frame'));reject(d=>d.prior.setAttribute(P+'progress','.999'));reject(d=>d.prior.setAttribute(P+'owner','other'))
 reject(d=>d.prior.setAttribute('mask','url(#x)'));reject(d=>d.prior.setAttribute('clip-path','url(#x)'));reject(d=>d.prior.css.set('opacity','.6'));reject(d=>d.prior.css.set('visibility','hidden'));reject(d=>d.slot.css.set('filter','blur(1px)'));reject(d=>d.prior.ownerSVGElement=new N('svg',d.doc))
 reject(d=>d.r.css.set('height','99px'));reject(d=>d.ink.css.set('d','path("M0 0 L1 1 Z")'))
 reject(d=>{let once=false;d.doc.onSet=(n,k)=>{if(!once&&n===d.r&&k==='height'){once=true;d.prior.attrs.set(P+'frame','old-frame')}}})
 reject(d=>{let once=false;d.doc.onSet=(n,k,v)=>{if(!once&&n===d.ink&&k==='visibility'&&v==='visible'){once=true;d.prior.css.set('opacity','.5')}}})
})
test('菰10 evidence pins and preview-only/forward-unapproved metadata remain explicit',()=>{
 const meta=REVIEWED_U83F0_K_SOURCE_WINDOW10
 assert.equal(meta.previewOnly,true);assert.equal(meta.originalForwardApproved,false);assert.equal(meta.R7HeadJustified,false);assert.equal(meta.originalClockEquivalent,false);assert.equal(meta.nativeApproval,false);assert.equal(meta.runtimeApplied,false);assert.equal(meta.appRendererConnected,false)
 assert.equal(meta.sourceVToQGapChanged,false);assert.equal(meta.finiteEquationCount,200);assert.equal(meta.eventCount,79);assert.equal(meta.firstExposureOutsidePrior,'13/152');assert.equal(meta.geometrySHA256,createHash('sha256').update(JSON.stringify(s)).digest('hex'))
 for(const[path,pin]of Object.entries(REVIEWED_U83F0_K_SOURCE_WINDOW10_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),pin)
})
