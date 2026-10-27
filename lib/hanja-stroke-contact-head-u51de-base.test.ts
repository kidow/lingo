import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync}from 'node:fs'
import {createHash}from 'node:crypto'
import fixture from '../docs/hanja-source-original-u51de-base-2026-10-27/fixtures-draft.json' with {type:'json'}
import {outlineSegmentProgress,type HanjaOutlineStrokes}from './hanja-stroke-outline.ts'
import {makeReviewedU51deBaseSourceRevealContext as axisMake,reviewedU51deBaseSourceRevealPolicy as axisSelect,sampleReviewedU51deBaseSourceRevealFrame as axisSample,commitReviewedU51deBaseSourceReveal as axisCommit}from './hanja-stroke-source-reveal-u51de-base.ts'
import {makeReviewedU51deBaseContactHeadContext as make,reviewedU51deBaseContactHeadPolicy as select,sampleReviewedU51deBaseContactHeadFrame as sample,commitReviewedU51deBaseContactHead as commit,verifyReviewedU51deBaseContactHeadPriorDOM as priorDOM,REVIEWED_U51DE_BASE_CONTACT_HEAD_INPUT_SHA256 as INPUT_SHA,REVIEWED_U51DE_BASE_CONTACT_HEAD as META}from './hanja-stroke-contact-head-u51de-base.ts'
const f=fixture.u51de,s=f.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',A='data-u51de-base-source-reveal-',P='data-u51de-base-contact-head-'
const clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const ctx=()=>{const c=make(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen:number)=>{const p=select(ctx(),pen-1,1);assert(p);return p}
class N{
 nodeType=1;namespaceURI=NS;isConnected=true;parentNode:N|null=null;children:N[]=[]
 ownerSVGElement:N|null=null;attrs=new Map<string,string>();css=new Map<string,string>();priorities=new Map<string,string>()
 style={setProperty:(k:string,v:string,priority='')=>{this.css.set(k,v);this.priorities.set(k,priority)},getPropertyValue:(k:string)=>this.css.get(k)??'',getPropertyPriority:(k:string)=>this.priorities.get(k)??''}
 localName:string;ownerDocument:D
 constructor(localName:string,ownerDocument:D){this.localName=localName;this.ownerDocument=ownerDocument}
 getAttribute(k:string){return this.attrs.get(k)??null}
 get id(){return this.getAttribute('id')??''}
 hasAttribute(k:string){return this.attrs.has(k)}
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
  const values:Record<string,string>={display:'inline',transform:'none',filter:'none',clipPath:n.getAttribute('clip-path')??'none',opacity:'1',mixBlendMode:'normal',stroke:'none',fillOpacity:'1',fillRule:'nonzero',fill:n.getAttribute('fill')==='white'?'rgb(255, 255, 255)':'rgb(66, 85, 255)',visibility:n.getAttribute('visibility')??'visible'}
  for(const[k,v]of n.css)values[k]=v
  return {...values,getPropertyValue:(k:string)=>k==='mask-image'?(n.css.get(k)??n.getAttribute('mask')??'none'):['x','y','width','height'].includes(k)&&n.localName==='rect'?(this.serializeGeometry?.(n.geometryValue(k))??n.geometryValue(k)):n.css.get(k)??(['mask-image','translate','rotate','scale'].includes(k)?'none':'')}
 }}
 createElementNS(_ns:string,name:string){return new N(name,this)}
}

function scene(pen:number,requested:number){
 const pol=policy(pen),weights=s[pen-1],total=weights.reduce((n,v)=>n+v.weight,0),logical=requested===0?0:requested===1?1:(weights[0].weight+requested*weights[1].weight)/total,a=outlineSegmentProgress(weights,logical),amount=a[1],doc=new D(),owner=new N('svg',doc),outer=new N('g',doc),frame='contact-frame-'+logical;owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true');for(let i=0;i<16;i++){const v=new N('g',doc);v.setAttribute('data-outline-stroke',String(i+1));outer.append(v)}const slot=outer.children[pen-1];
 const ac=axisMake(f.fullProof,f.identity,s),ap=axisSelect(ac,pen-1,0);assert(ap);const ag=new N('g',doc),ad=new N('defs',doc),aclip=new N('clipPath',doc),ar=new N('rect',doc),ai=new N('path',doc),aid='test-'+(pen-1)+'-0';slot.append(ag);ag.append(ad);ad.append(aclip);aclip.append(ar);ag.append(ai);
 for(const[k,v]of Object.entries({'data-stroke-start-gate':ap.id,'data-stroke-reveal-policy':ap.kind,'data-stroke-reveal-progress':String(a[0]),[A+'clip']:aid,[A+'fingerprint']:ap.proofFingerprint,[A+'prior-progress']:'0',[A+'logical-progress']:String(logical),[A+'frame']:frame}))ag.setAttribute(k,v);
 aclip.setAttribute('id',aid+'-u51de-base-source-reveal-clip');aclip.setAttribute('clipPathUnits','userSpaceOnUse');ai.setAttribute('d',ap.segment.outline);ai.setAttribute('visibility','hidden');const af=axisSample(ap,ap.segment,a[0]),ashape=af.clip??{x:ap.anchor[0],y:ap.anchor[1],width:0,height:0};for(const[k,v]of Object.entries(ashape))ar.setAttribute(k,String(v));if(a[0]!==1)ai.setAttribute('clip-path','url(#'+aid+'-u51de-base-source-reveal-clip)');
 const g=new N('g',doc),defs=new N('defs',doc),mask=new N('mask',doc),head=new N('path',doc),body=new N('rect',doc),ink=new N('path',doc),id='test-'+(pen-1)+'-1';slot.append(g);g.append(defs);defs.append(mask);mask.append(head);mask.append(body);g.append(ink);
 for(const[k,v]of Object.entries({'data-stroke-start-gate':pol.id,'data-stroke-reveal-policy':pol.kind,'data-stroke-reveal-progress':String(amount),[P+'context']:'u51de-base-original-16-contact-head',[P+'clip']:id,[P+'fingerprint']:pol.proofFingerprint,[P+'prior-progress']:String(a[0]),[P+'logical-progress']:String(logical),[P+'frame']:frame}))g.setAttribute(k,v);
 for(const[k,v]of Object.entries({id:id+'-u51de-base-contact-head-mask',maskUnits:'userSpaceOnUse',maskContentUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'}))mask.setAttribute(k,v);
 head.setAttribute('id',id+'-u51de-base-contact-head-head');head.setAttribute('fill','white');body.setAttribute('id',id+'-u51de-base-contact-head-body');body.setAttribute('fill','white');ink.setAttribute('d',pol.segment.outline);ink.setAttribute('visibility','hidden');const cf=sample(pol,pol.segment,amount,a[0],a[0]===1);head.setAttribute('d',cf.headPath);for(const[k,v]of Object.entries(cf.bodyClip))body.setAttribute(k,String(v));if(amount!==1)ink.setAttribute('mask','url(#'+id+'-u51de-base-contact-head-mask)');
 const axisNodes={group:ag,ink:ai,rect:ar,clipPath:aclip}as unknown as Parameters<typeof axisCommit>[4],nodes={group:g,ink,head,body,mask}as unknown as Parameters<typeof commit>[4];
 const priorCommit=()=>axisCommit(ap,ap.segment,a[0],aid,axisNodes,0,logical,frame),run=()=>commit(pol,pol.segment,amount,id,nodes,a[0],logical,frame);
 return{doc,owner,outer,slot,pol,ag,ai,g,ink,head,body,mask,defs,nodes,frame,logical,amount,prior:a[0],priorCommit,run}
}
function start(d:ReturnType<typeof scene>){const r=d.priorCommit();assert.notEqual(r.status,'hidden',r.error??'');return d.run()}
test('only exact original source3/6/10 contact policies exist and reject clones getters foreign proofs',()=>{
 assert.equal(META.targets.length,3);for(const p of[3,6,10])assert(policy(p));assert.equal(select({...ctx()},2,1),null);assert.equal(select(ctx(),11,2),null);
 for(const[path,pin]of Object.entries(INPUT_SHA))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),pin);
 for(const change of[(x:typeof f)=>x.identity.root='u51de-k',(x:typeof f)=>x.strokes[2][1].weight++,(x:typeof f)=>x.fullProof.groups[0].polygons[0][0].x++]){const x=clone(f);change(x);assert.equal(make(x.fullProof,x.identity,x.strokes as HanjaOutlineStrokes),null)}
 const getter=clone(f);Object.defineProperty(getter.identity,'root',{get(){throw Error('getter forbidden')},enumerable:true});assert.equal(make(getter.fullProof,getter.identity,getter.strokes as HanjaOutlineStrokes),null);
 for(const pen of[3,6,10]){const p=policy(pen);assert(Object.isFrozen(p)&&Object.isFrozen(p.headParts));assert.throws(()=>sample({...p},p.segment,.5,1,true));assert.throws(()=>sample(p,{...p.segment,outline:p.segment.outline+' '},.5,1,true));assert.throws(()=>sample(p,p.segment,.1,1,false));assert.throws(()=>sample(p,p.segment,.1,0,true));for(const bad of[NaN,Infinity,-.1,1.1])assert.throws(()=>sample(p,p.segment,bad,1,true))}
 assert.equal(META.runtimeApplied,false);assert.equal(META.nativeApproval,false)
})
test('empty target retains truthful partial-prior state without approving positive target exposure',()=>{
 for(const pen of[3,6,10]){const p=policy(pen);for(const prior of[0,.25,.5,.999999,1]){const f=sample(p,p.segment,0,prior,false);assert.equal(f.visible,false);assert.equal(f.headPath,'');assert.equal(f.bodyClip.height,0);if(prior!==1)assert.throws(()=>sample(p,p.segment,1e-8,prior,true))}for(const prior of[NaN,Infinity,-.1,1.1])assert.throws(()=>sample(p,p.segment,0,prior,false))}
})
test('head area clocks remain authored; exact head phases and p0/p1 source retention',()=>{
 assert.equal(policy(3).headPhase,331476/600981875);assert.equal(policy(6).headPhase,500/2799);assert.equal(policy(10).headPhase,221/1541);
 for(const pen of[3,6,10]){const p=policy(pen),zero=sample(p,p.segment,0,0,false),full=sample(p,p.segment,1,1,true);assert.equal(zero.headPath,'');assert.equal(zero.bodyClip.height,0);assert.equal(zero.visible,false);assert.equal(full.outline,p.segment.outline);assert.equal(full.originalPDirect,true);assert.equal(full.headProgress,1);assert.equal(full.bodyProgress,1);assert.equal(full.originalClockEquivalent,false);assert.equal(full.sourceGuide,p.segment.revealPath);assert.equal(full.sourceWidth,p.segment.revealWidth);const h=sample(p,p.segment,p.headPhase,1,true);assert.equal(h.bodyProgress,0);assert.equal(h.headProgress,1);assert.equal(h.phase,'contact-head');assert.equal((h.headPath.match(/M/g)||[]).length,pen===3?2:1)}
})
test('three retained custom groups commit p0/head boundaries/body/completion with private actual prior receipts',()=>{
 for(const pen of[3,6,10]){const p=policy(pen);for(const amount of[0,1e-8,p.headPhase*.25,p.headPhase*.5,p.headPhase-1e-10,p.headPhase,p.headPhase+1e-10,.5,.999999,1]){const d=scene(pen,amount);if(amount===0)d.head.css.set('d','none');const r=start(d);assert.notEqual(r.status,'hidden',pen+':'+amount+':'+r.error);assert.equal(d.ink.getAttribute('d'),p.segment.outline);assert.equal(d.ink.getAttribute('visibility'),d.amount>0?'visible':'hidden');assert.equal(d.g.children.length,2);assert.equal(d.mask.children.length,2);if(d.amount===1)assert.equal(d.ink.getAttribute('mask'),null);if(d.amount>0)assert(priorDOM(p,d.g as unknown as SVGGElement,d.logical,d.frame));r.cleanup();assert.equal(d.ink.getAttribute('visibility'),'hidden')}}
})
test('clone receipt, stale or foreign frame, hidden/nonopaque prior and changed source fail closed',()=>{
 const copy=(n:N):N=>{const q=new N(n.localName,n.ownerDocument);q.attrs=new Map(n.attrs);q.css=new Map(n.css);q.priorities=new Map(n.priorities);q.ownerSVGElement=n.ownerSVGElement;for(const ch of n.children)q.append(copy(ch));return q};
 for(const pen of[3,6,10])for(const change of[(d:ReturnType<typeof scene>)=>d.ai.css.set('opacity','.5'),(d:ReturnType<typeof scene>)=>d.ai.setAttribute('visibility','hidden'),(d:ReturnType<typeof scene>)=>d.ag.setAttribute(A+'frame','stale'),(d:ReturnType<typeof scene>)=>d.g.setAttribute(P+'frame','foreign'),(d:ReturnType<typeof scene>)=>d.ai.setAttribute('d','M0 0Z'),(d:ReturnType<typeof scene>)=>{const q=copy(d.ag);q.parentNode=d.slot;d.slot.children[0]=q;d.ag.parentNode=null}]){const d=scene(pen,.5);assert.notEqual(start(d).status,'hidden');change(d);assert.equal(d.run().status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden')}
})
test('target hierarchy CSS transforms mask ownership and mid-read mutation reject without duplicate original ink',()=>{
 const changes=[(d:ReturnType<typeof scene>)=>d.ink.css.set('mask-image','none'),(d:ReturnType<typeof scene>)=>d.g.setAttribute('transform','translate(1 0)'),(d:ReturnType<typeof scene>)=>d.head.css.set('d','path("M0 0Z")'),(d:ReturnType<typeof scene>)=>d.body.css.set('height','0px'),(d:ReturnType<typeof scene>)=>d.head.setAttribute('fill','black'),(d:ReturnType<typeof scene>)=>d.mask.setAttribute('maskUnits','objectBoundingBox'),(d:ReturnType<typeof scene>)=>d.ink.css.set('opacity','.5'),(d:ReturnType<typeof scene>)=>d.g.append(new N('path',d.doc)),(d:ReturnType<typeof scene>)=>d.ink.ownerDocument=new D(),(d:ReturnType<typeof scene>)=>d.g.setAttribute(P+'fingerprint','foreign')];
 for(const change of changes){const d=scene(6,.5);assert.notEqual(start(d).status,'hidden');change(d);assert.equal(d.run().status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden')}
 const d=scene(10,.5);assert.notEqual(start(d).status,'hidden');d.doc.onStyleRead=n=>{if(n===d.head)d.ai.css.set('opacity','0')};assert.equal(d.run().status,'hidden');
 const v=scene(3,.5);assert.notEqual(start(v).status,'hidden');v.doc.onSet=(n,k,value)=>{if(n===v.ink&&k==='visibility'&&value==='visible')v.ai.css.set('opacity','0')};assert.equal(v.run().status,'hidden');assert.equal(v.ink.getAttribute('visibility'),'hidden');
 const rect=scene(6,.5);rect.doc.serializeGeometry=x=>Number.parseFloat(x).toFixed(4)+'px';assert.notEqual(start(rect).status,'hidden');
})
