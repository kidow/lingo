import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u655d-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU655dSourceWindowContext,reviewedU655dSourceWindowPolicy,sampleReviewedU655dSourceWindowFrame,commitReviewedU655dSourceWindow,reviewedU655dBodyTailPolicy,sampleReviewedU655dBodyTailFrame,verifyReviewedU655dBodyTailPriorDOM,verifyReviewedU655dBodyTailBodyDOM,commitReviewedU655dBodyTail,REVIEWED_U655D_BODY_TAIL_CUT,REVIEWED_U655D_SOURCE_WINDOW_INPUT_SHA256,REVIEWED_U655D_SOURCE_WINDOWS} from './hanja-stroke-source-windows-u655d.ts'
const f=fixture['u655d'],s=f.strokes as HanjaOutlineStrokes,clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const context=()=>{const c=makeReviewedU655dSourceWindowContext(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen:number)=>{const p=reviewedU655dSourceWindowPolicy(context(),pen-1,0);assert(p);return p}
const bodyPolicy=()=>{const p=reviewedU655dBodyTailPolicy(context(),3,1);assert(p);return p}
const P='data-u655d-source-window-',B='data-u655d-source-body-tail-',NS='http://www.w3.org/2000/svg'
test('敝 whole factory binds exact3 args/proof/identity/all11 strokes without getters',()=>{
 const make=makeReviewedU655dSourceWindowContext as(...args:unknown[])=>unknown
 assert(context());assert.equal(make(f.fullProof,f.identity),null);assert.equal(make(f.fullProof,f.identity,s,1),null)
 const changed=clone(f.fullProof);changed.trace[0][0].args[0]+=.01;assert.equal(make(changed,f.identity,s),null)
 for(const k of Object.keys(f.identity)){const id={...f.identity}as Record<string,unknown>;delete id[k];assert.equal(make(f.fullProof,id,s),null)}
 for(const field of['outline','revealPath','weight','revealWidth','bounds']as const){const x=clone(s);(x[3][1]as unknown as Record<string,unknown>)[field]=null;assert.equal(make(f.fullProof,f.identity,x),null)}
 let reads=0;const id=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return'u655d'}});assert.equal(make(f.fullProof,id,s),null);assert.equal(reads,0)
 assert.equal(make(f.fullProof,f.identity,Object.assign(Object.create(null),s)),null)
})
test('敝 owns7 point targets plus one MLQ body-tail policy; private source brand rejects copies',()=>{
 const c=context();for(let p=0;p<s.length;p++)for(let m=0;m<s[p].length;m++){assert.equal(Boolean(reviewedU655dSourceWindowPolicy(c,p,m)),m===0&&[0,1,5,6,7,9,10].includes(p));assert.equal(Boolean(reviewedU655dBodyTailPolicy(c,p,m)),p===3&&m===1)}
 assert.equal(reviewedU655dSourceWindowPolicy({...c},0,0),null);assert.equal(reviewedU655dBodyTailPolicy({...c},3,1),null)
 assert.throws(()=>sampleReviewedU655dSourceWindowFrame({...policy(1)},policy(1).segment,.1))
 assert.throws(()=>sampleReviewedU655dBodyTailFrame({...bodyPolicy()},bodyPolicy().segment,.1,1,true,true))
})
test('敝 point rectangles preserve original P/Q and shrink both dimensions with direct1',()=>{
 for(const pen of[1,2,6,7,8,10,11]){const p=policy(pen),original=clone(p.segment);let previous=0
  for(const t of[0,1e-8,1e-6,.001,.01,.03,.5,.9,1]){const frame=sampleReviewedU655dSourceWindowFrame(p,p.segment,t);assert.equal(frame.visible,t>0);assert.equal(frame.originalPDirect,t===1);assert.equal(frame.outline,t===0?null:p.segment.outline);assert.equal(frame.originalClockEquivalent,false);if(frame.clip){assert(frame.clip.width>0&&frame.clip.height>0);assert(frame.clip.width*frame.clip.height>previous);previous=frame.clip.width*frame.clip.height}assert.deepEqual(p.segment,original)}
 }
 for(const t of[-.1,1.1,NaN,Infinity])assert.throws(()=>sampleReviewedU655dSourceWindowFrame(policy(1),policy(1).segment,t))
 assert.equal(policy(6).anchorIsOriginalQ0,true);for(const p of[1,2,7,8,11])assert.equal(policy(p).anchorIsOriginalQ0,false)
})
test('敝4 source-weight cut yields exact body1/tail0 boundary and preserves all five original paths',()=>{
 const p=bodyPolicy(),cut=REVIEWED_U655D_BODY_TAIL_CUT;assert.equal(cut,45/52.071068);assert.equal(p.segment.weight,52.071068);assert.equal(p.sourceParts.length,5)
 const before=sampleReviewedU655dBodyTailFrame(p,p.segment,cut-1e-12,1,true,false),at=sampleReviewedU655dBodyTailFrame(p,p.segment,cut,1,true,false),after=sampleReviewedU655dBodyTailFrame(p,p.segment,cut+1e-12,1,true,true),end=sampleReviewedU655dBodyTailFrame(p,p.segment,1,1,true,true)
 assert(before.bodyProgress<1);assert.equal(at.bodyProgress,1);assert.equal(at.tailProgress,0);assert.equal(at.bodyRect,null);assert.equal(at.tailVisible,false);assert(after.tailProgress>0);assert(after.tailPoints);assert.equal(end.bodyOriginalPDirect,true);assert.equal(end.tailOriginalPDirect,true);assert.equal(end.fullOriginalPDirect,true);assert.equal(end.sourceLQRestarted,false);assert.equal(end.originalClockEquivalent,false);assert.equal(end.bodyP1to4NotOnlyLShape,true)
 assert.throws(()=>sampleReviewedU655dBodyTailFrame(p,p.segment,.1,0,true,false));assert.throws(()=>sampleReviewedU655dBodyTailFrame(p,p.segment,.9,1,true,false));assert.throws(()=>sampleReviewedU655dBodyTailFrame(p,p.segment,.1,1,false,false))
 assert.equal(sampleReviewedU655dBodyTailFrame(p,p.segment,0).bodyVisible,false)
})
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
 for(let i=0;i<11;i++){const slot=new N('g',doc);slot.setAttribute('data-outline-stroke',String(i+1));outer.append(slot)}
 const slot=outer.children[p.pen-1],g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-'+(p.pen-1)+'-0'
 slot.append(g);g.append(defs);defs.append(c);c.append(r);g.append(ink)
 for(const node of[outer,...outer.children,g,defs,c,r,ink])node.ownerSVGElement=owner
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(progress));g.setAttribute(P+'clip',id)
 c.setAttribute('id',id+'-u655d-source-window-clip');c.setAttribute('clipPathUnits','userSpaceOnUse')
 ink.setAttribute('d',p.segment.outline);ink.setAttribute('visibility','hidden')
 for(const k of['x','y','width','height'])r.setAttribute(k,'999')
 return {doc,owner,outer,slot,g,defs,c,r,ink,id,nodes:{group:g,ink,rect:r,clipPath:c}as unknown as Parameters<typeof commitReviewedU655dSourceWindow>[4]}
}

test('敝4 tiny positive progress preserves exact rect attributes and inline CSS instead of snapping',()=>{
 const t=2.729126799396933e-16,d=bodyDOM(t),base=d.doc.defaultView.getComputedStyle
 d.doc.defaultView.getComputedStyle=(n:N)=>{const style=base(n);return n!==d.r?style:{...style,getPropertyValue:(k:string)=>{if(['x','y','width','height'].includes(k)){const inline=n.css.get(k);if(inline!==undefined)return inline;const v=Number(n.getAttribute(k));if(v>0&&v<1e-12)return'0px'}return style.getPropertyValue(k)}}}
 const r=commitReviewedU655dBodyTail(d.p,d.p.segment,t,1,d.id,d.nodes);assert.equal(r.status,'visible',r.status==='hidden'?r.error:'')
 assert.equal(r.frame.progress,t);assert(r.frame.bodyProgress>0);assert.equal(r.frame.tailProgress,0);assert(r.frame.bodyRect)
 for(const[k,v]of Object.entries(r.frame.bodyRect!)){assert.equal(d.r.getAttribute(k),String(v));assert.equal(d.r.style.getPropertyValue(k),String(v)+'px')}
 assert(Number(d.r.getAttribute('width'))>0);assert(Number(d.r.getAttribute('height'))>0);assert.equal(d.tail.getAttribute('visibility'),'hidden');assert(d.paths.every(n=>n.getAttribute('visibility')==='visible'));r.cleanup()
})
test('敝4 tiny inline CSS does not bypass exact CSS or prior source guards',()=>{
 for(const alter of[(d:ReturnType<typeof bodyDOM>)=>{d.doc.onStyleRead=n=>{if(n===d.r)n.css.set('width','1px')}},(d:ReturnType<typeof bodyDOM>)=>d.H.setAttribute('d','M0 0 Z')]){const t=2.729126799396933e-16,d=bodyDOM(t);alter(d);assert.equal(commitReviewedU655dBodyTail(d.p,d.p.segment,t,1,d.id,d.nodes).status,'hidden');assert(d.paths.every(n=>n.getAttribute('visibility')==='hidden'));assert.equal(d.tail.getAttribute('visibility'),'hidden')}
})

test('敝 point actual commits use11 source slots and reject geometry/CSS/owner changes',()=>{
 for(const pen of[1,2,6,7,8,10,11])for(const t of[0,.01,.5,1]){const p=policy(pen),d=dom(p,t),r=commitReviewedU655dSourceWindow(p,p.segment,t,d.id,d.nodes);assert.equal(r.status,t===0?'empty':t===1?'complete':'visible');assert.equal(d.ink.getAttribute('d'),p.segment.outline);r.cleanup();assert.equal(d.ink.getAttribute('visibility'),'hidden')}
 for(const alter of[(d:ReturnType<typeof dom>)=>d.owner.setAttribute('viewBox','0 0 200 200'),(d:ReturnType<typeof dom>)=>d.slot.css.set('opacity','.6'),(d:ReturnType<typeof dom>)=>d.ink.css.set('clipPath','none'),(d:ReturnType<typeof dom>)=>d.ink.setAttribute('d','M0 0 Z'),(d:ReturnType<typeof dom>)=>d.r.css.set('height','1px')]){const p=policy(8),d=dom(p,.01);alter(d);assert.equal(commitReviewedU655dSourceWindow(p,p.segment,.01,d.id,d.nodes).status,'hidden')}
})
function bodyDOM(t:number){
 const p=bodyPolicy(),doc=new D(),owner=new N('svg',doc),outer=new N('g',doc);owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true')
 for(let i=0;i<11;i++){const n=new N('g',doc);n.setAttribute('data-outline-stroke',String(i+1));outer.append(n)}
 const slot=outer.children[3],H=new N('path',doc),g=new N('g',doc),defs=new N('defs',doc),bc=new N('clipPath',doc),r=new N('rect',doc),tc=new N('clipPath',doc),poly=new N('polygon',doc),body=new N('g',doc),paths=p.sourceParts.slice(0,4).map(()=>new N('path',doc)),tail=new N('path',doc),id='test-3-1'
 slot.append(H);slot.append(g);g.append(defs);defs.append(bc);bc.append(r);defs.append(tc);tc.append(poly);g.append(body);paths.forEach(n=>body.append(n));g.append(tail)
 for(const n of[outer,...outer.children,H,g,defs,bc,r,tc,poly,body,...paths,tail])n.ownerSVGElement=owner
 H.setAttribute('d',p.priorSegment.outline);paths.forEach((n,i)=>{n.setAttribute('d',p.sourceParts[i]);n.setAttribute('visibility','hidden')});tail.setAttribute('d',p.sourceParts[4]);tail.setAttribute('visibility','hidden')
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(t));g.setAttribute(B+'clip',id);g.setAttribute(B+'fingerprint',p.proofFingerprint);g.setAttribute(B+'prior-progress','1')
 bc.setAttribute('id',id+'-u655d-body-clip');tc.setAttribute('id',id+'-u655d-tail-clip');bc.setAttribute('clipPathUnits','userSpaceOnUse');tc.setAttribute('clipPathUnits','userSpaceOnUse')
 const nodes={group:g,bodyGroup:body,bodyInkPaths:paths,bodyRect:r,bodyClipPath:bc,tailInk:tail,tailPolygon:poly,tailClipPath:tc}as unknown as Parameters<typeof commitReviewedU655dBodyTail>[5]
 return{p,doc,owner,outer,slot,H,g,defs,bc,r,tc,poly,body,paths,tail,id,nodes}
}
test('敝4 actual commit paints current complete P4 before attached P5 and directly completes5P',()=>{
 const cut=REVIEWED_U655D_BODY_TAIL_CUT
 for(const t of[0,1e-6,.01,cut-1e-12,cut,cut+1e-12,.99,1]){const d=bodyDOM(t),r=commitReviewedU655dBodyTail(d.p,d.p.segment,t,1,d.id,d.nodes);assert.notEqual(r.status,'hidden',r.status==='hidden'?r.error:'');assert.equal(d.tail.getAttribute('visibility'),t>cut?'visible':'hidden');assert(d.paths.every(p=>p.getAttribute('visibility')===(t>0?'visible':'hidden')));if(t>=cut)assert.equal(d.body.getAttribute('clip-path'),null);if(t===1)assert.equal(d.tail.getAttribute('clip-path'),null);r.cleanup();assert(d.paths.every(n=>n.getAttribute('visibility')==='hidden'));assert.equal(d.tail.getAttribute('visibility'),'hidden')}
})
test('敝4 fails closed for prior/P4 owner, opacity, source, clips and mid-commit mutations',()=>{
 const changes:Array<(d:ReturnType<typeof bodyDOM>)=>void>=[d=>d.H.setAttribute('d',d.p.priorSegment.outline+' '),d=>d.H.css.set('opacity','.6'),d=>d.slot.css.set('opacity','.6'),d=>d.paths[3].setAttribute('d',d.p.sourceParts[3]+' '),d=>d.paths[3].css.set('opacity','.6'),d=>d.body.css.set('clipPath','url(#foreign)'),d=>d.tail.css.set('clipPath','none'),d=>d.g.setAttribute(B+'fingerprint','wrong'),d=>d.g.setAttribute(B+'prior-progress','0'),d=>{d.paths[3].ownerSVGElement=new N('svg',d.doc)},d=>{let once=false;d.doc.onSet=(n,k,v)=>{if(!once&&n===d.tail&&k==='visibility'&&v==='visible'){once=true;d.paths[3].attrs.set('visibility','hidden')}}}]
 for(const change of changes){const d=bodyDOM(.99);change(d);const r=commitReviewedU655dBodyTail(d.p,d.p.segment,.99,1,d.id,d.nodes);assert.equal(r.status,'hidden');assert(d.paths.every(n=>n.getAttribute('visibility')==='hidden'));assert.equal(d.tail.getAttribute('visibility'),'hidden')}
 const d=bodyDOM(.99);assert.equal(verifyReviewedU655dBodyTailPriorDOM(d.p,d.g as unknown as SVGGElement,.99,0),false);assert.equal(verifyReviewedU655dBodyTailBodyDOM(d.p,d.nodes,.99,1),false)
})
test('敝 source and proof fingerprints remain exact; renderer/native approval stays false',()=>{
 for(const[path,pin]of Object.entries(REVIEWED_U655D_SOURCE_WINDOW_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),pin)
 assert.equal(REVIEWED_U655D_SOURCE_WINDOWS.geometrySHA256,f.geometrySHA256);assert.equal(s.length,11);assert.equal(s.flat().length,13);assert.equal(f.fullProof.groups.flatMap(g=>g.polygons).length,28);for(const k of['sourcePOrQOrWidth14OrCalculatedWeightChanged','originalClockEquivalent','appRendererConnected','nativeApproval','runtimeApplied']as const)assert.equal(REVIEWED_U655D_SOURCE_WINDOWS[k],false)
})
