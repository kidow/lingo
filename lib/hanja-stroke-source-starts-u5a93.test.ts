import test from 'node:test'
import assert from 'node:assert/strict'
import fixture from '../docs/hanja-source-original-u5a93-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU5a93StartsContext,reviewedU5a93StartsPolicy,sampleReviewedU5a93StartsFrame,commitReviewedU5a93Starts,REVIEWED_U5A93_STARTS_SOURCE} from './hanja-stroke-source-starts-u5a93.ts'
const f=fixture.u5a93,s=f.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',P='data-u5a93-remedial-start-',clone=<T>(v:T):T=>JSON.parse(JSON.stringify(v))
function policy(pen:2|4){const c=makeReviewedU5a93StartsContext(f.fullProof,f.identity,s),p=reviewedU5a93StartsPolicy(c,pen-1,0);assert(p);return p}
class N{
 nodeType=1;namespaceURI=NS;isConnected=true;parentNode:N|null=null;children:N[]=[];ownerSVGElement:N|null=null;attrs=new Map<string,string>();css=new Map<string,string>()
 style={setProperty:(k:string,v:string)=>{this.css.set(k,v)},getPropertyValue:(k:string)=>this.css.get(k)??''}
 localName:string;ownerDocument:D
 constructor(localName:string,ownerDocument:D){this.localName=localName;this.ownerDocument=ownerDocument}
 get id(){return this.getAttribute('id')??''}
 getAttribute(k:string){return this.attrs.get(k)??null}
 setAttribute(k:string,v:string){this.attrs.set(k,v);this.ownerDocument.onSet?.(this,k,v)}
 removeAttribute(k:string){this.attrs.delete(k)}
 append(n:N){this.children.push(n);n.parentNode=this}
}
class D{
 onStyleRead:((n:N)=>void)|null=null;onSet:((n:N,k:string,v:string)=>void)|null=null
 defaultView={document:this,getComputedStyle:(n:N)=>{this.onStyleRead?.(n);const v:Record<string,string>={display:'inline',transform:'none',filter:'none',clipPath:n.getAttribute('clip-path')??'none',opacity:'1',mixBlendMode:'normal',stroke:'none',fillOpacity:'1',fillRule:'nonzero',fill:'rgb(66, 85, 255)',visibility:n.getAttribute('visibility')??'visible'};for(const[k,x]of n.css)v[k]=x;return{...v,getPropertyValue:(k:string)=>n.css.get(k)??(['x','y','width','height'].includes(k)&&n.localName==='rect'?(n.getAttribute(k)??'0')+'px':['mask-image','translate','rotate','scale'].includes(k)?'none':'')}}}
 createElementNS(_ns:string,name:string){return new N(name,this)}
}
function dom(pen:2|4,t:number){
 const p=policy(pen),doc=new D(),owner=new N('svg',doc),outer=new N('g',doc);owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true')
 for(let i=0;i<12;i++){const x=new N('g',doc);x.setAttribute('data-outline-stroke',String(i+1));outer.append(x);x.ownerSVGElement=owner}outer.ownerSVGElement=owner
 const slot=outer.children[pen-1],g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-'+(pen-1)+'-0',frame='test-frame-'+pen+'-'+t;slot.append(g);g.append(defs);defs.append(c);c.append(r);g.append(ink)
 for(const x of[g,defs,c,r,ink])x.ownerSVGElement=owner
 slot.setAttribute(P+'frame',frame);slot.setAttribute(P+'progress',String(t));g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(t));g.setAttribute(P+'clip',id);g.setAttribute(P+'frame',frame);g.setAttribute(P+'fingerprint',p.proofFingerprint);g.setAttribute(P+'source-guide',s[pen-1][0].revealPath!);g.setAttribute(P+'source-weight',String(s[pen-1][0].weight));g.setAttribute(P+'author-clock',p.authorClock);g.setAttribute(P+'original-clock-equivalent','false');c.setAttribute('id',id+'-u5a93-remedial-start-clip');c.setAttribute('clipPathUnits','userSpaceOnUse');ink.setAttribute('d',s[pen-1][0].outline);ink.setAttribute('visibility','hidden')
 const nodes={group:g,ink,rect:r,clipPath:c}as unknown as Parameters<typeof commitReviewedU5a93Starts>[4]
 return{p,doc,owner,outer,slot,g,defs,c,r,ink,id,frame,nodes,segment:s[pen-1][0]}
}
test('strict genuine full-proof/identity/whole-strokes binding; no getters or fabricated policy',()=>{
 assert(makeReviewedU5a93StartsContext(f.fullProof,f.identity,s));assert(makeReviewedU5a93StartsContext(clone(f.fullProof),clone(f.identity),clone(s)))
 const bad=clone(s)as unknown as {weight:number}[][];bad[1][0].weight+=1;assert.equal(makeReviewedU5a93StartsContext(f.fullProof,f.identity,bad as unknown as HanjaOutlineStrokes),null)
 assert.equal(makeReviewedU5a93StartsContext(f.fullProof,{...f.identity,root:'other'},s),null);assert.equal((makeReviewedU5a93StartsContext as(...a:unknown[])=>unknown)(f.fullProof,s),null)
 let reads=0;const getter={...f.identity};Object.defineProperty(getter,'root',{enumerable:true,get(){reads++;return'u5a93'}});assert.equal(makeReviewedU5a93StartsContext(f.fullProof,getter,s),null);assert.equal(reads,0)
 assert.equal(reviewedU5a93StartsPolicy({id:'u5a93-pen2-4-source-start-preview'},1,0),null);assert.equal(reviewedU5a93StartsPolicy(makeReviewedU5a93StartsContext(f.fullProof,f.identity,s),0,0),null)
})
test('source-specific finite frames keep exact P/Q/width/weight and expose changed clocks',()=>{
 for(const pen of[2,4]as const){const p=policy(pen),a=s[pen-1][0];for(const t of[0,1e-6,.03,.5,.99999999,1]){const x=sampleReviewedU5a93StartsFrame(p,a,t);assert.equal(x.sourceGuide,a.revealPath);assert.equal(x.sourceWeight,a.weight);assert.equal(x.sourceWidth,14);assert.equal(x.originalPDirect,t===1);assert.equal(x.visible,t>0);assert.equal(x.originalGuideOrWeightClockEquivalent,false);assert.equal(x.nativeForwardApproval,false);assert.equal(x.sourcePCount,pen===2?2:3);assert(Object.isFrozen(x.clip))}for(const t of[-1,1.1,NaN,Infinity])assert.throws(()=>sampleReviewedU5a93StartsFrame(p,a,t));assert.throws(()=>sampleReviewedU5a93StartsFrame({...p},a,.5))}
 const a=sampleReviewedU5a93StartsFrame(policy(2),s[1][0],0);assert.equal(a.cutoff,27);assert.deepEqual(a.clip,{x:3.75,y:26,width:38.9,height:1});assert.equal(sampleReviewedU5a93StartsFrame(policy(2),s[1][0],1).cutoff,94.35)
 const p=policy(4);assert.deepEqual(p.anchor,[65.24245421875001,9.31825805078125]);assert.notDeepEqual(p.anchor,[65.42509000000001,8.630548749999999]);assert.equal(REVIEWED_U5A93_STARTS_SOURCE.runtimeApplied,false)
})
test('both exact current owner/frames commit zero, finite and direct-complete source paths',()=>{
 for(const pen of[2,4]as const)for(const t of[0,1e-6,.03,.5,.99999999,1]){const d=dom(pen,t),v=commitReviewedU5a93Starts(d.p,d.segment,t,d.id,d.nodes,d.frame);assert.equal(v.status,t===0?'empty':t===1?'complete':'visible',JSON.stringify(v));assert.equal(d.ink.getAttribute('d'),d.segment.outline);assert.equal(d.ink.getAttribute('visibility'),t===0?'hidden':'visible');assert.equal(d.ink.getAttribute(P+'committed'),'true');assert.equal(d.ink.getAttribute('clip-path'),t===1?null:'url(#'+d.c.id+')');v.cleanup();assert.equal(d.ink.getAttribute('visibility'),'hidden')}
})
test('source/owner/frame/geometry substitution fails closed',()=>{
 const changes=[(d:ReturnType<typeof dom>)=>d.ink.setAttribute('d','M0 0 L1 1 Z'),(d:ReturnType<typeof dom>)=>d.slot.setAttribute(P+'frame','other'),(d:ReturnType<typeof dom>)=>d.g.setAttribute(P+'source-weight','0'),(d:ReturnType<typeof dom>)=>d.c.setAttribute('clipPathUnits','objectBoundingBox'),(d:ReturnType<typeof dom>)=>{d.g.ownerSVGElement=new N('svg',d.doc)},(d:ReturnType<typeof dom>)=>d.outer.children.reverse(),(d:ReturnType<typeof dom>)=>d.slot.append(new N('path',d.doc))]
 for(const pen of[2,4]as const)for(const change of changes){const d=dom(pen,.03);change(d);assert.equal(commitReviewedU5a93Starts(d.p,d.segment,.03,d.id,d.nodes,d.frame).status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden');assert.equal(d.ink.getAttribute(P+'committed'),'false')}
})
test('nonopaque/effect/CSS geometry substitutions are not accepted as source paint',()=>{
 for(const pen of[2,4]as const)for(const[k,v]of[['fill','rgba(66,85,255,.5)'],['opacity','.5'],['transform','matrix(1,0,0,1,1,0)'],['d','path("M0 0 L1 1")']]){const d=dom(pen,.03);d.ink.css.set(k,v);assert.equal(commitReviewedU5a93Starts(d.p,d.segment,.03,d.id,d.nodes,d.frame).status,'hidden')}
 for(const pen of[2,4]as const){const d=dom(pen,.03);d.doc.onStyleRead=n=>{if(n===d.r)n.css.set('width','999px')};assert.equal(commitReviewedU5a93Starts(d.p,d.segment,.03,d.id,d.nodes,d.frame).status,'hidden')}
})
test('paint-time owner mutation is rolled back instead of committing a stale frame',()=>{
 for(const pen of[2,4]as const){const d=dom(pen,.03);d.doc.onSet=(n,k,v)=>{if(n===d.ink&&k==='visibility'&&v==='visible')d.g.parentNode=new N('g',d.doc)};const v=commitReviewedU5a93Starts(d.p,d.segment,.03,d.id,d.nodes,d.frame);assert.equal(v.status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden');assert.equal(d.ink.getAttribute(P+'committed'),'false')}
})
