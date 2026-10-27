import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u7aea-local-2026-10-27/fixtures-draft.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU7aeaLocalHeadTailContext as make,reviewedU7aeaLocalHeadTailPolicy as select,sampleReviewedU7aeaLocalHeadTailFrame as sample,commitReviewedU7aeaLocalHeadTail as commit,verifyReviewedU7aeaLocalHeadTailPriorDOM as priorDOM,REVIEWED_U7AEA_LOCAL_HEAD_TAIL_INPUT_SHA256 as pins,REVIEWED_U7AEA_LOCAL_HEAD_TAIL as review} from './hanja-stroke-source-head-tail-u7aea-local.ts'
const f=fixture.u7aea,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v)),sha=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex')
const ctx=()=>{const c=make(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen:7)=>{const p=select(ctx(),pen-1,1);assert(p);return p}
const NS='http://www.w3.org/2000/svg',P='data-u7aea-local-head-tail-'
class N{
 nodeType=1;namespaceURI=NS;isConnected=true;parentNode:N|null=null;children:N[]=[]
 ownerSVGElement:N|null=null;attrs=new Map<string,string>();css=new Map<string,string>();priorities=new Map<string,string>()
 style={setProperty:(k:string,v:string,priority='')=>{this.css.set(k,v);this.priorities.set(k,priority)},getPropertyValue:(k:string)=>this.css.get(k)??'',getPropertyPriority:(k:string)=>this.priorities.get(k)??''}
 localName:string;ownerDocument:D
 constructor(localName:string,ownerDocument:D){this.localName=localName;this.ownerDocument=ownerDocument}
 getAttribute(k:string){return this.attrs.get(k)??null}
 setAttribute(k:string,v:string){this.attrs.set(k,v);this.ownerDocument.onSet?.(this,k,v)}
 removeAttribute(k:string){this.attrs.delete(k)}
 append(n:N){this.children.push(n);n.parentNode=this;const owner=this.localName==='svg'?this:this.ownerSVGElement;const assign=(v:N)=>{v.ownerSVGElement=owner;v.isConnected=this.isConnected;for(const child of v.children)assign(child)};assign(n)}
 appendChild(n:N){this.append(n);return n}
 remove(){if(this.parentNode){this.parentNode.children.splice(this.parentNode.children.indexOf(this),1);this.parentNode=null}this.isConnected=false}
 geometryValue(k:string){return this.style.getPropertyPriority(k)==='important'?this.style.getPropertyValue(k):(this.ownerDocument.globalGeometry?.(this,k)??(this.style.getPropertyValue(k)||(this.getAttribute(k)??'0')+'px'))}
 getBBox(){const v=(k:string)=>Math.fround(Number(this.geometryValue(k).replace('px',''))),b={x:v('x'),y:v('y'),width:v('width'),height:v('height')};return this.ownerDocument.canonicalBox?.(b)??b}
}
class D{
 onStyleRead:((n:N)=>void)|null=null;onSet:((n:N,k:string,v:string)=>void)|null=null
 globalGeometry:((n:N,k:string)=>string|null)|null=null;serializeGeometry:((value:string)=>string)|null=null
 canonicalBox:((b:Record<'x'|'y'|'width'|'height',number>)=>Record<'x'|'y'|'width'|'height',number>)|null=null
 defaultView={document:this,getComputedStyle:(n:N)=>{
  this.onStyleRead?.(n)
  const values:Record<string,string>={display:'inline',transform:'none',filter:'none',clipPath:n.getAttribute('clip-path')??'none',opacity:'1',mixBlendMode:'normal',stroke:'none',fillOpacity:'1',fillRule:'nonzero',fill:'rgb(66, 85, 255)',visibility:n.getAttribute('visibility')??'visible'}
  for(const[k,v]of n.css)values[k]=v
  return {...values,getPropertyValue:(k:string)=>['x','y','width','height'].includes(k)&&n.localName==='rect'?(this.serializeGeometry?.(n.geometryValue(k))??n.geometryValue(k)):n.css.get(k)??(['mask-image','translate','rotate','scale'].includes(k)?'none':'')}
 }}
 createElementNS(_ns:string,name:string){return new N(name,this)}
}

function dom(p:ReturnType<typeof policy>,progress:number,priorProgress=1){
 const doc=new D(),owner=new N('svg',doc),outer=new N('g',doc);owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true')
 for(let i=0;i<13;i++){const slot=new N('g',doc);slot.setAttribute('data-outline-stroke',String(i+1));outer.append(slot)}
 const slot=outer.children[p.pen-1],g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-'+(p.pen-1)+'-'+(p.mask-1),H=p.priorRequired?new N('path',doc):null
 if(H){H.setAttribute('d',p.priorSegment!.outline);slot.append(H)}slot.append(g);g.append(defs);defs.append(c);c.append(r);g.append(ink)
 for(const n of[outer,...outer.children,g,defs,c,r,ink,...(H?[H]:[])])n.ownerSVGElement=owner
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(progress));g.setAttribute(P+'clip',id);g.setAttribute(P+'fingerprint',p.proofFingerprint);g.setAttribute(P+'prior-progress',String(priorProgress))
 c.setAttribute('id',id+'-u7aea-local-head-tail-clip');c.setAttribute('clipPathUnits','userSpaceOnUse');ink.setAttribute('d',p.segment.outline);ink.setAttribute('visibility','hidden');for(const k of['x','y','width','height'])r.setAttribute(k,'999')
 return{doc,owner,outer,slot,g,defs,c,r,ink,id,H,nodes:{group:g,ink,rect:r,clipPath:c}as unknown as Parameters<typeof commit>[4]}
}
test('local 竪 exact whole13 context and all untouched field/pin contract',()=>{
 assert(ctx());assert.equal(sha(JSON.stringify(s)),'c59c97d44ce071358ae98d1e01b34d32447276e5ab736f88d59766262dc0f110');for(const[p,h]of Object.entries(pins))assert.equal(sha(readFileSync(new URL('../'+p,import.meta.url))),h,p)
 const reverse=(v:object)=>Object.fromEntries(Object.entries(v).reverse());assert(make(reverse(f.fullProof),reverse(f.identity),clone(s)));assert.equal((make as(...a:unknown[])=>unknown)(f.fullProof,f.identity),null);assert.equal((make as(...a:unknown[])=>unknown)(f.fullProof,f.identity,s,0),null)
 assert.equal(make(f.fullProof,{...f.identity,extra:true},s),null);const proof=clone(f.fullProof);proof.trace[0][0].args[0]+=.01;assert.equal(make(proof,f.identity,s),null)
 for(const key of ['outline','bounds','direction','weight','revealPath','revealWidth']){const changed=clone(s)as unknown as Record<string,unknown>[][];changed[6][1][key]=null;assert.equal(make(f.fullProof,f.identity,changed as unknown as HanjaOutlineStrokes),null)}
 let reads=0;const getter=Object.defineProperty({...f.identity},'root',{enumerable:true,get(){reads++;return f.identity.root}});assert.equal(make(f.fullProof,getter,s),null);assert.equal(reads,0);assert.equal(make(f.fullProof,Object.assign(Object.create(null),f.identity),s),null)
 assert.equal(review.previewOnly,true);assert.equal(review.nativeApproval,false);assert.equal(review.runtimeApplied,false);assert.equal(review.originalPublicWholeClaim,false)
})
test('only local7m2 owns a strict original-Q dyadic head anchor',()=>{
 for(let i=0;i<s.length;i++)for(let m=0;m<s[i].length;m++){const p=select(ctx(),i,m);assert.equal(!!p,i===6&&m===1)}
 for(const pen of[7]as const){const p=policy(pen),values=p.segment.revealPath!.match(/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g)!.map(Number),t=p.sourceT;assert.equal(values.length,6);assert.deepEqual(p.anchor,[(1-t)**2*values[0]+2*t*(1-t)*values[2]+t*t*values[4],(1-t)**2*values[1]+2*t*(1-t)*values[3]+t*t*values[5]]);assert.throws(()=>sample({...p},p.segment,.5,1,true));assert.equal(select({...ctx()},p.pen-1,p.mask-1),null)}
})
test('source-Q head kernel then Y tail preserves exact segment and explicit boundary',()=>{
 const p=policy(7),before=clone(p.segment),a=p.headPhaseShare;let previous:{x:number;y:number;width:number;height:number}|null=null
 for(const q of[0,1e-12,1e-6,.03,a-1e-12,a,a+1e-12,.5,.9999999999,1]){const v=sample(p,p.segment,q,1,true);assert.equal(v.outline,q===0?null:p.segment.outline);assert.equal(v.sourceGuide,p.segment.revealPath);assert.equal(v.sourceWidth,14);assert.equal(v.sourceT,1/64);assert.equal(v.anchorIsOriginalQ0,false);assert.equal(v.originalClockEquivalent,false);assert.equal(v.originalGuideAndWeightUnchanged,true);assert.equal(v.nativeForwardApproval,false);assert.equal(v.runtimeApplied,false);assert.equal(v.originalPDirect,q===1);assert.equal(v.visible,q>0);assert.equal(v.phase,q===0?'empty':q===1?'full':q<a?'source-head-kernel-window':'source-y-tail');
  if(v.clip){assert(v.clip.width>0&&v.clip.height>0);if(q<a){const h=q/a,[ax,ay]=p.anchor,[x0,y0,x1,y1]=p.headBounds;assert.deepEqual(v.clip,{x:ax+(x0-ax)*h,y:ay+(y0-ay)*h,width:(x1-x0)*h,height:(y1-y0)*h});assert(v.clip.y+v.clip.height<=p.headSeam+1e-12)}else{assert.equal(v.clip.x,p.sourceBounds[0]);assert.equal(v.clip.y,p.sourceBounds[1]);assert.equal(v.clip.height,p.headSeam+(p.sourceBounds[3]-p.headSeam)*((q-a)/(1-a))-p.sourceBounds[1])}if(previous){assert(v.clip.x<=previous.x+1e-12&&v.clip.y<=previous.y+1e-12);assert(v.clip.x+v.clip.width>=previous.x+previous.width-1e-12);assert(v.clip.y+v.clip.height>=previous.y+previous.height-1e-12)}previous=v.clip}
 }
 assert.deepEqual(p.segment,before);for(const q of[NaN,Infinity,-.1,1.01])assert.throws(()=>sample(p,p.segment,q,1,true));assert.throws(()=>sample(p,p.segment,.1,0,true));assert.throws(()=>sample(p,p.segment,.1,1,false));assert.doesNotThrow(()=>sample(p,p.segment,0,0,false))
})
test('DOM commit reads actual prior original P in same owner/current frame, not just progress metadata',()=>{
 for(const pen of[7]as const)for(const q of[0,1e-6,.03,.5,1]){const p=policy(pen),d=dom(p,q),v=commit(p,p.segment,q,d.id,d.nodes,1);assert.equal(v.status,q===0?'empty':q===1?'complete':'visible');assert.equal(d.ink.getAttribute('d'),p.segment.outline);assert.equal(d.ink.getAttribute('visibility'),q===0?'hidden':'visible');assert.equal(d.ink.getAttribute(P+'committed'),'true');assert.equal(d.ink.getAttribute('clip-path'),q===1?null:'url(#'+d.id+'-u7aea-local-head-tail-clip)');if(p.priorRequired)assert.equal(priorDOM(p,d.g as unknown as SVGGElement,q,1),true)}
})
test('prior opacity/progress/source/owner/clip/geometry and rect CSS mutations fail closed',()=>{
 const mutations:((d:ReturnType<typeof dom>)=>void)[]=[d=>{d.H!.css.set('opacity','0')},d=>{d.H!.css.set('fillOpacity','.5')},d=>{d.H!.setAttribute('d','M0 0Z')},d=>{d.H!.setAttribute('clip-path','url(#fake)')},d=>{d.H!.ownerSVGElement=new N('svg',d.doc)},d=>{d.H!.isConnected=false},d=>{d.r.css.set('width','0px')},d=>{d.g.setAttribute(P+'prior-progress','0')}]
 for(const pen of[7]as const)for(const mutate of mutations){const p=policy(pen),d=dom(p,.5);mutate(d);const rejected=commit(p,p.segment,.5,d.id,d.nodes,1);assert.equal(rejected.status,'hidden');assert.equal(typeof rejected.error,'string');assert.equal(rejected.frame,null);assert.equal(d.ink.getAttribute('visibility'),'hidden');assert.equal(d.ink.getAttribute(P+'committed'),'false')}
})
test('prior completion is rechecked after rectangle attributes and final visibility commit',()=>{
 for(const pen of[7]as const)for(const stage of['rect','visibility']){const p=policy(pen),d=dom(p,.5);d.doc.onSet=(n,k,v)=>{if(stage==='rect'&&n===d.r&&k==='width'||stage==='visibility'&&n===d.ink&&k==='visibility'&&v==='visible')d.H!.css.set('opacity','0')};assert.equal(commit(p,p.segment,.5,d.id,d.nodes,1).status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden')}
})
test('canonical head geometry keeps subepsilon attributes and accepts finite collapsed probe equivalence',()=>{
 const p=policy(7),q=1e-10,d=dom(p,q)
 d.doc.serializeGeometry=v=>String(Math.round(Number(v.replace('px',''))*1e6)/1e6)+'px'
 d.doc.canonicalBox=b=>b.width<1e-8||b.height<1e-8?{x:0,y:0,width:0,height:0}:b
 const r=commit(p,p.segment,q,d.id,d.nodes,1);assert.equal(r.status,'visible');const f=sample(p,p.segment,q,1,true);assert(f.clip);assert(f.clip.width>0);assert.equal(d.r.getAttribute('width'),String(f.clip.width));assert.equal(f.progress,q);assert.equal(d.r.getBBox().width,0);assert.equal(d.owner.children.length,1)
 d.r.style.setProperty('width','0px');assert.equal(commit(p,p.segment,q,d.id,d.nodes,1).status,'hidden');assert.equal(d.owner.children.length,1)
})
test('canonical head guard rejects actual/probe bbox difference and isolated probe mutation',()=>{
 const p=policy(7),q=.03,d=dom(p,q);d.doc.globalGeometry=(n,k)=>n===d.r&&k==='width'?'0px':null;assert.equal(commit(p,p.segment,q,d.id,d.nodes,1).status,'hidden');assert.equal(d.owner.children.length,1)
 const e=dom(p,.03);e.doc.onStyleRead=n=>{if(n.localName==='rect'&&n!==e.r)n.style.setProperty('width','7px','important')};assert.equal(commit(p,p.segment,.03,e.id,e.nodes,1).status,'hidden');assert.equal(e.owner.children.length,1)
})
