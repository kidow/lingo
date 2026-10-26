import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u5a93-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU5a93FirstPrefixContext,reviewedU5a93FirstPrefixPolicy,sampleReviewedU5a93FirstPrefixFrame,commitReviewedU5a93FirstPrefix,REVIEWED_U5A93_FIRST_PREFIX_SOURCE,REVIEWED_U5A93_FIRST_PREFIX_INPUT_SHA256} from './hanja-stroke-source-prefix-u5a93-first.ts'
const f=fixture.u5a93,s=f.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',P='data-u5a93-first-prefix-',clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const context=()=>{const c=makeReviewedU5a93FirstPrefixContext(f.fullProof,f.identity,s);assert(c);return c}
const policy=()=>{const p=reviewedU5a93FirstPrefixPolicy(context(),0);assert(p);return p}
test('媓 true identity3/fullproof8 and exact all12 strokes gate has no getters or outlines-only route',()=>{
 assert.deepEqual(Object.keys(f.identity).sort(),['file','fileSHA256','root']);assert.equal(Object.keys(f.fullProof).length,8);assert.equal(s.length,12);assert.equal(s.flat().length,13)
 assert.equal(createHash('sha256').update(JSON.stringify(s)).digest('hex'),'79aea820e2f76cc4fa9bbe75a4f65fb75bb62c261060b1aa4e2e3bf1e3d71752')
 const make=makeReviewedU5a93FirstPrefixContext as(...a:unknown[])=>unknown;assert(context());assert.equal(make(f.fullProof,f.identity),null);assert.equal(make(f.fullProof,f.identity,s,0),null)
 for(const k of Object.keys(f.identity)){const id={...f.identity}as Record<string,unknown>;delete id[k];assert.equal(make(f.fullProof,id,s),null)}
 assert.equal(make(f.fullProof,{...f.identity,sourceRoot:'u5a93'},s),null)
 const wrong=clone(f.fullProof);wrong.trace[0][0].args[0]+=.01;assert.equal(make(wrong,f.identity,s),null)
 for(const key of['outline','revealPath','weight','revealWidth','bounds']as const){const changed=clone(s);(changed[0][1]as unknown as Record<string,unknown>)[key]=null;assert.equal(make(f.fullProof,f.identity,changed),null)}
 let reads=0;const getter=Object.defineProperty({...f.identity},'root',{enumerable:true,get(){reads++;return'u5a93'}});assert.equal(make(f.fullProof,getter,s),null);assert.equal(reads,0)
 assert.equal(make(f.fullProof,f.identity,Object.assign(Object.create(null),s)),null)
})
test('媓 private policy owns only logical1 and both unchanged source masks',()=>{
 const c=context();for(let p=0;p<12;p++)assert.equal(Boolean(reviewedU5a93FirstPrefixPolicy(c,p)),p===0)
 assert.equal(reviewedU5a93FirstPrefixPolicy({...c},0),null);assert.throws(()=>sampleReviewedU5a93FirstPrefixFrame({...policy()},s[0],.1))
 assert.equal(policy().segments.length,2);assert.deepEqual(policy().segments.map(v=>(v.outline.match(/M/g)||[]).length),[2,2]);assert.deepEqual(policy().segments.map(v=>v.weight),[60.614478,31.692006]);assert.deepEqual(policy().segments.map(v=>v.revealWidth),[14,14])
 const combined=[{...s[0][0],outline:s[0].map(v=>v.outline).join(' ')}];assert.throws(()=>sampleReviewedU5a93FirstPrefixFrame(policy(),combined,.1))
})
test('媓 common prefix preserves source grouping/guides/weights, hides0 and directly completes two outlines1',()=>{
 const p=policy(),before=clone(s),ts=[0,1e-12,1e-6,.01,.03,.1,518/727,1229/1454,.99,1];let last=-Infinity
 for(const t of ts){const r=sampleReviewedU5a93FirstPrefixFrame(p,s[0],t);assert.equal(r.progress,t);assert.equal(r.cutoff,6.9+(79.6-6.9)*t);assert(r.cutoff>=last);last=r.cutoff;assert.equal(r.visible,t>0);assert.equal(r.originalPDirect,t===1);assert.equal(r.clip.height,r.cutoff-5.9);assert.equal(r.previewOnly,true);assert.equal(r.originalGuideOrMaskWeightClockEquivalent,false);assert.equal(r.nativeForwardApproval,false);assert.equal(r.sourceGroupingChanged,false);assert.deepEqual(r.outlines,s[0].map(v=>v.outline));assert.deepEqual(r.sourceWeights,[60.614478,31.692006]);assert.deepEqual(s,before)}
 for(const t of[-1,1.001,NaN,Infinity])assert.throws(()=>sampleReviewedU5a93FirstPrefixFrame(p,s[0],t))
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

function dom(t:number){
 const p=policy(),doc=new D(),owner=new N('svg',doc),outer=new N('g',doc);owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true')
 for(let i=0;i<12;i++){const n=new N('g',doc);n.setAttribute('data-outline-stroke',String(i+1));outer.append(n)}
 const slot=outer.children[0],items=[0,1].map(i=>{const g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-0-'+i;slot.append(g);g.append(defs);defs.append(c);c.append(r);g.append(ink);for(const n of[g,defs,c,r,ink])n.ownerSVGElement=owner
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(t));g.setAttribute(P+'mask',String(i+1));g.setAttribute(P+'clip',id);g.setAttribute(P+'fingerprint',p.proofFingerprint);c.setAttribute('id',id+'-u5a93-first-prefix-clip');c.setAttribute('clipPathUnits','userSpaceOnUse');ink.setAttribute('d',s[0][i].outline);ink.setAttribute('visibility','hidden');for(const k of['x','y','width','height']){r.setAttribute(k,'999');r.style.setProperty(k,'0px')}return{g,defs,c,r,ink,id}})
 for(const n of[outer,...outer.children])n.ownerSVGElement=owner
 const ids=items.map(n=>n.id)as[string,string],nodes=items.map(n=>({group:n.g,ink:n.ink,rect:n.r,clipPath:n.c}))as unknown as Parameters<typeof commitReviewedU5a93FirstPrefix>[4]
 return{p,doc,owner,outer,slot,items,ids,nodes}
}
test('媓 commits two exact owners/2P inks and sets four rect attrs plus identical inlineCSS without tiny snap',()=>{
 for(const t of[0,1e-12,1e-6,.01,.03,.5,.99,1]){const d=dom(t),r=commitReviewedU5a93FirstPrefix(d.p,s[0],t,d.ids,d.nodes);assert.notEqual(r.status,'hidden',r.status==='hidden'?r.error:'');const f=sampleReviewedU5a93FirstPrefixFrame(d.p,s[0],t);for(let i=0;i<2;i++){const n=d.items[i];for(const[k,v]of Object.entries(f.clip)){assert.equal(n.r.getAttribute(k),String(v));assert.equal(n.r.style.getPropertyValue(k),String(v)+'px')}assert.equal(n.ink.getAttribute('d'),s[0][i].outline);assert.equal(n.ink.getAttribute('visibility'),t>0?'visible':'hidden');assert.equal(n.ink.getAttribute('clip-path'),t===1?null:'url(#'+n.id+'-u5a93-first-prefix-clip)')}r.cleanup();assert(d.items.every(n=>n.ink.getAttribute('visibility')==='hidden'))}
})
test('媓 rejects changed source owner/order/currentframe/style and hides both if one fails',()=>{
 const changes:Array<(d:ReturnType<typeof dom>)=>void>=[d=>d.owner.setAttribute('viewBox','0 0 200 200'),d=>d.slot.children.reverse(),d=>d.items[1].g.setAttribute('data-stroke-reveal-progress','.2'),d=>d.items[1].g.setAttribute(P+'mask','1'),d=>d.items[0].ink.setAttribute('d',s[0][0].outline+' '),d=>d.items[1].ink.css.set('d','path("M0 0Z")'),d=>d.slot.css.set('opacity','.6'),d=>d.outer.css.set('fillOpacity','.6'),d=>d.items[1].g.setAttribute('transform','translate(1)'),d=>{d.items[1].g.ownerSVGElement=new N('svg',d.doc)},d=>d.items[0].ink.css.set('clipPath','none'),d=>d.items[1].c.setAttribute('clipPathUnits','objectBoundingBox'),d=>d.items[0].g.setAttribute(P+'fingerprint','wrong')]
 for(const change of changes){const d=dom(.03);change(d);const r=commitReviewedU5a93FirstPrefix(d.p,s[0],.03,d.ids,d.nodes);assert.equal(r.status,'hidden');assert(d.items.every(n=>n.ink.getAttribute('visibility')==='hidden'&&n.ink.getAttribute(P+'committed')==='false'))}
})
test('媓 detects mid-commit rectCSS/visibility mutation and rolls back both original inks',()=>{
 for(const mode of['css','visibility']){const d=dom(.01);let once=false;d.doc.onSet=(n,k,v)=>{if(!once&&n===d.items[0].ink&&((mode==='css'&&k===P+'phase')||(mode==='visibility'&&k==='visibility'&&v==='visible'))){once=true;if(mode==='css')d.items[1].r.css.set('height','0px');else d.items[0].ink.attrs.set('visibility','hidden')}};const r=commitReviewedU5a93FirstPrefix(d.p,s[0],.01,d.ids,d.nodes);assert.equal(r.status,'hidden');assert(d.items.every(n=>n.ink.getAttribute('visibility')==='hidden'))}
})
test('媓 source snapshot/140-state proof pins stay exact and preview-only flags remain false for native/runtime',()=>{
 for(const[path,pin]of Object.entries(REVIEWED_U5A93_FIRST_PREFIX_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),pin)
 assert.equal(REVIEWED_U5A93_FIRST_PREFIX_SOURCE.finitePositiveStates,140);assert.equal(REVIEWED_U5A93_FIRST_PREFIX_SOURCE.previewOnly,true);assert.equal(REVIEWED_U5A93_FIRST_PREFIX_SOURCE.nativeForwardApproval,false);assert.equal(REVIEWED_U5A93_FIRST_PREFIX_SOURCE.runtimeApplied,false);assert.equal(f.restoration.successfulCompilerRuns,1);assert.equal(f.restoration.engine,0);assert.equal(f.restoration.newGeometry,false)
})
