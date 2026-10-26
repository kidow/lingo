import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u7c67-2026-10-23/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU7c67SourceWindow18Context,reviewedU7c67SourceWindow18Policy,sampleReviewedU7c67SourceWindow18Frame,commitReviewedU7c67SourceWindow18,REVIEWED_U7C67_SOURCE_WINDOW18,REVIEWED_U7C67_SOURCE_WINDOW18_INPUT_SHA256} from './hanja-stroke-source-window-u7c67-18.ts'
const f=fixture['u7c67'],s=f.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
const context=()=>{const c=makeReviewedU7c67SourceWindow18Context(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen:18)=>{const p=reviewedU7c67SourceWindow18Policy(context(),pen-1,0);assert(p);return p}
test('籧18 strict whole23 factory has exact3 args, all fields and getter-free comparison',()=>{
 assert(context())
 const reversed=(o:object)=>Object.fromEntries(Object.entries(o).reverse())
 assert(makeReviewedU7c67SourceWindow18Context(reversed(f.fullProof),reversed(f.identity),clone(s)))
 const make=makeReviewedU7c67SourceWindow18Context as (...args:unknown[])=>unknown
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
 const getter=Object.defineProperty({...f.identity},'root',{enumerable:true,get(){reads++;return f.identity.root}})
 assert.equal(make(f.fullProof,getter,s),null);assert.equal(reads,0)
 const changedSegment=clone(s);let nestedReads=0
 Object.defineProperty(changedSegment[17][0],'weight',{enumerable:true,get(){nestedReads++;return 16.924137}})
 assert.equal(make(f.fullProof,f.identity,changedSegment),null);assert.equal(nestedReads,0)
})
test('籧18 private policy selects only18m1 and declares separate source-authored anchor',()=>{
 const c=context()
 for(let pen=0;pen<s.length;pen++)for(let mask=0;mask<s[pen].length;mask++){
  const p=reviewedU7c67SourceWindow18Policy(c,pen,mask)
  if(pen===17&&mask===0)assert(p);else assert.equal(p,null)
 }
 assert.equal(reviewedU7c67SourceWindow18Policy({...c},17,0),null)
 const p=policy(18)
 assert.equal(p.proofFamily,'strict-union-kernel-at-authored-anchor')
 assert.deepEqual(p.segment,s[17][0]);assert.deepEqual(p.sourceBounds,p.segment.bounds)
 assert.deepEqual(p.anchor,[86.8,61])
 assert.notDeepEqual(p.anchor,p.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number))
})
test('籧18 frame preserves P/Q/width/calculated weight, hides0 and directly completes1',()=>{
 for(const pen of[18]as const){
  const p=policy(pen),original=clone(p.segment),[ax,ay]=p.anchor,[x0,y0,x1,y1]=p.sourceBounds
  for(const progress of[0,1e-8,1e-6,.001,.01,.03,.1,.5,.75,.999999,1]){
   const f=sampleReviewedU7c67SourceWindow18Frame(p,p.segment,progress)
   assert.equal(f.visible,progress>0);assert.equal(f.originalPDirect,progress===1);assert.equal(f.sourceGuide,p.segment.revealPath)
   assert.equal(f.sourceWidth,14);assert.equal(f.sourceCalculatedWeight,p.segment.weight);assert.deepEqual(f.originalQ0,[86.5,59.575]);assert.deepEqual(f.authorAnchorOffset,[86.8-86.5,61-59.575]);assert.equal(f.UARead,false);assert.equal(f.originalClockEquivalent,false);assert.equal(f.anchorIsOriginalQ0,false)
   if(progress>0&&progress<1)assert.deepEqual(f.clip,{x:ax+(x0-ax)*progress,y:ay+(y0-ay)*progress,width:(x1-x0)*progress,height:(y1-y0)*progress})
   else assert.equal(f.clip,null)
   assert.equal(f.outline,progress===0?null:p.segment.outline)
  }
  assert.deepEqual(p.segment,original)
 }
})
test('籧18 frames reject clone policies, getters, invalid progress and changed original fields',()=>{
 const p=policy(18)
 assert.throws(()=>sampleReviewedU7c67SourceWindow18Frame({...p},p.segment,.1))
 let reads=0;const getter=Object.defineProperty({...p},'segment',{get(){reads++;return p.segment}})
 assert.throws(()=>sampleReviewedU7c67SourceWindow18Frame(getter,p.segment,.1));assert.equal(reads,0)
 for(const patch of[{outline:p.segment.outline+' '},{revealPath:p.segment.revealPath+' '},{revealWidth:15},{weight:p.segment.weight+.01},{direction:'down' as const},{bounds:[0,0,100,100]as const}]){
  assert.throws(()=>sampleReviewedU7c67SourceWindow18Frame(p,{...p.segment,...patch},.1))
 }
 for(const v of[-1,1.1,NaN,Infinity])assert.throws(()=>sampleReviewedU7c67SourceWindow18Frame(p,p.segment,v))
})
const NS='http://www.w3.org/2000/svg',P='data-u7c67-source-window18-'
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
 for(let i=0;i<23;i++){const slot=new N('g',doc);slot.setAttribute('data-outline-stroke',String(i+1));outer.append(slot)}
 const slot=outer.children[p.pen-1],g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-'+(p.pen-1)+'-0'
 slot.append(g);g.append(defs);defs.append(c);c.append(r);g.append(ink)
 for(const node of[outer,...outer.children,g,defs,c,r,ink])node.ownerSVGElement=owner
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(progress));g.setAttribute(P+'clip',id)
 c.setAttribute('id',id+'-u7c67-source-window18-clip');c.setAttribute('clipPathUnits','userSpaceOnUse')
 ink.setAttribute('d',p.segment.outline);ink.setAttribute('visibility','hidden')
 for(const k of['x','y','width','height'])r.setAttribute(k,'999')
 return {doc,owner,outer,slot,g,defs,c,r,ink,id,nodes:{group:g,ink,rect:r,clipPath:c}as unknown as Parameters<typeof commitReviewedU7c67SourceWindow18>[4]}
}
test('籧18 DOM commits all four rect attributes, exact source ink, hidden0 and unmasked full1',()=>{
 for(const pen of[18]as const)for(const progress of[0,1e-6,.03,.5,1]){
  const p=policy(pen),d=dom(p,progress),result=commitReviewedU7c67SourceWindow18(p,p.segment,progress,d.id,d.nodes)
  assert.equal(result.status,progress===0?'empty':progress===1?'complete':'visible')
  const frame=sampleReviewedU7c67SourceWindow18Frame(p,p.segment,progress),shape=frame.clip??{x:p.anchor[0],y:p.anchor[1],width:0,height:0}
  for(const[k,v]of Object.entries(shape))assert.equal(d.r.getAttribute(k),String(v))
  assert.equal(d.ink.getAttribute('d'),p.segment.outline);assert.equal(d.ink.getAttribute('mask'),null)
  assert.equal(d.ink.getAttribute('visibility'),progress===0?'hidden':'visible');assert.equal(d.ink.getAttribute(P+'committed'),'true')
  assert.equal(d.ink.getAttribute('clip-path'),progress===1?null:'url(#'+d.id+'-u7c67-source-window18-clip)')
  result.cleanup();assert.equal(d.ink.getAttribute('visibility'),'hidden')
 }
})
test('籧18 DOM rejects different owner/coordinates/source/rect CSS and mid-commit visibility edits',()=>{
 const p=policy(18)
 const reject=(change:(d:ReturnType<typeof dom>)=>void)=>{const d=dom(p,.03);change(d);const result=commitReviewedU7c67SourceWindow18(p,p.segment,.03,d.id,d.nodes);assert.equal(result.status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden');assert.equal(d.ink.getAttribute(P+'committed'),'false')}
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
test('籧18 complete original source and new-only proof pins preserve earlier policies and native',()=>{
 assert.equal(REVIEWED_U7C67_SOURCE_WINDOW18.pens,23);assert.equal(REVIEWED_U7C67_SOURCE_WINDOW18.masks,24);assert.equal(REVIEWED_U7C67_SOURCE_WINDOW18.polygons,60)
 assert.equal(REVIEWED_U7C67_SOURCE_WINDOW18.geometrySHA256,createHash('sha256').update(JSON.stringify(s)).digest('hex'))
 assert.equal(s.flat().length,24);assert.equal(f.fullProof.groups.flatMap(g=>g.polygons).length,60)
 for(const key of['sourcePOrQOrWidth14OrCalculatedWeightChanged','originalClockEquivalent','appRendererConnected','nativeApproval','runtimeApplied','oldNative40Replayed','oldTerminal15Modified']as const)assert.equal(REVIEWED_U7C67_SOURCE_WINDOW18[key],false)
 for(const[path,pin]of Object.entries(REVIEWED_U7C67_SOURCE_WINDOW18_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),pin)
})
