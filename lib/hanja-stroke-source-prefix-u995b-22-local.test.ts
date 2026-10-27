import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u995b-local-2026-10-27/fixtures-draft.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeLocalU995b22SourcePrefixContext,localU995b22SourcePrefixPolicy,sampleLocalU995b22SourcePrefixFrame,commitLocalU995b22SourcePrefix,LOCAL_U995B22_SOURCE_PREFIX_INPUT,LOCAL_U995B22_SOURCE_PREFIX_INPUT_SHA256,LOCAL_U995B22_SOURCE_PREFIX_SOURCE} from './hanja-stroke-source-prefix-u995b-22-local.ts'
const f=fixture.u995b,s=f.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',P='data-u995b-22-local-prefix-',clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const context=()=>{const c=makeLocalU995b22SourcePrefixContext(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen=22)=>{const p=localU995b22SourcePrefixPolicy(context(),pen-1);assert(p);return p}
test('饛22 strict fixed fullproof/identity/source binding rejects changed geometry and getters',()=>{
 assert.equal(createHash('sha256').update(JSON.stringify(s)).digest('hex'),'d661f0f15ef21322c84c0c8eeb5e9ea030e3ab705de8851e4d9b9233ef5b5238')
 const make=makeLocalU995b22SourcePrefixContext as(...args:unknown[])=>unknown
 assert(make(clone(f.fullProof),clone(f.identity),clone(s)));assert.equal(make(f.fullProof,f.identity),null);assert.equal(make(f.fullProof,f.identity,s,0),null)
 for(const key of ['outline','bounds','weight','revealPath','revealWidth']){const changed=clone(s);(changed[21][0]as unknown as Record<string,unknown>)[key]=null;assert.equal(make(f.fullProof,f.identity,changed),null)}
 const proof=clone(f.fullProof);proof.trace[0][0].args[0]+=.01;assert.equal(make(proof,f.identity,s),null)
 assert.equal(make(f.fullProof,{...f.identity,root:'u995b'},s),null);assert.equal(make(f.fullProof,f.identity,Object.assign(Object.create(null),s)),null)
 let reads=0;const nested=clone(s);Object.defineProperty(nested[21][0],'outline',{enumerable:true,get(){reads++;return s[21][0].outline}});assert.equal(make(f.fullProof,f.identity,nested),null);assert.equal(reads,0)
 const identity=Object.defineProperty({...f.identity},'root',{enumerable:true,get(){reads++;return f.identity.root}});assert.equal(make(f.fullProof,identity,s),null);assert.equal(reads,0)
})
test('饛22 alone owns the proven X-decreasing original union policy',()=>{
 for(let i=0;i<23;i++)assert.equal(Boolean(localU995b22SourcePrefixPolicy(context(),i)),i===21)
 const p=policy();assert.equal(p.axis,'x');assert.equal(p.start,90.4);assert.equal(p.finish,75.6);assert.equal(p.segments.length,1)
 assert.equal(localU995b22SourcePrefixPolicy({...context()},21),null)
 assert.throws(()=>sampleLocalU995b22SourcePrefixFrame({...p},s[21],.1));assert.throws(()=>sampleLocalU995b22SourcePrefixFrame(p,[...s[21],s[21][0]],.1))
})
test('饛22 zero-empty and full-direct preserve all original P/Q/weights under continuous cap-free cuts',()=>{
 const p=policy(),before=clone(s[21]);let last=p.start
 for(const t of [0,1e-12,1e-6,.01,.25,.5,.99,1]){const r=sampleLocalU995b22SourcePrefixFrame(p,s[21],t);assert.equal(r.cutoff,p.start+(p.finish-p.start)*t);assert(r.cutoff<=last);last=r.cutoff;assert.equal(r.visible,t>0);assert.equal(r.originalPDirect,t===1);assert.deepEqual(r.outlines,s[21].map(v=>v.outline));assert.deepEqual(r.sourceGuides,s[21].map(v=>v.revealPath));assert.deepEqual(r.sourceWeights,s[21].map(v=>v.weight));assert.equal(r.originalGuideOrMaskWeightClockEquivalent,false)}
 assert.deepEqual(s[21],before);for(const t of [-1,1.001,NaN,Infinity])assert.throws(()=>sampleLocalU995b22SourcePrefixFrame(p,s[21],t))
})
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
 getBBox(){const v=(k:string)=>Math.fround(Number(this.geometryValue(k).replace('px','')));return{x:v('x'),y:v('y'),width:v('width'),height:v('height')}}
}
class D{
 onStyleRead:((n:N)=>void)|null=null;onSet:((n:N,k:string,v:string)=>void)|null=null
 globalGeometry:((n:N,k:string)=>string|null)|null=null;serializeGeometry:((value:string)=>string)|null=null
 defaultView={document:this,getComputedStyle:(n:N)=>{
  this.onStyleRead?.(n)
  const values:Record<string,string>={display:'inline',transform:'none',filter:'none',clipPath:n.getAttribute('clip-path')??'none',opacity:'1',mixBlendMode:'normal',stroke:'none',fillOpacity:'1',fillRule:'nonzero',fill:'rgb(66, 85, 255)',visibility:n.getAttribute('visibility')??'visible'}
  for(const[k,v]of n.css)values[k]=v
  return {...values,getPropertyValue:(k:string)=>['x','y','width','height'].includes(k)&&n.localName==='rect'?(this.serializeGeometry?.(n.geometryValue(k))??n.geometryValue(k)):n.css.get(k)??(['mask-image','translate','rotate','scale'].includes(k)?'none':'')}
 }}
 createElementNS(_ns:string,name:string){return new N(name,this)}
}

function dom(t:number,pen=22){
 const p=policy(pen),doc=new D(),owner=new N('svg',doc),outer=new N('g',doc);owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true')
 for(let i=0;i<23;i++){const n=new N('g',doc);n.setAttribute('data-outline-stroke',String(i+1));outer.append(n)}
 const slot=outer.children[pen-1],items=p.segments.map((segment,i)=>{const g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-'+(pen-1)+'-'+i;slot.append(g);g.append(defs);defs.append(c);c.append(r);g.append(ink);for(const n of[g,defs,c,r,ink])n.ownerSVGElement=owner
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(t));g.setAttribute(P+'mask',String(i+1));g.setAttribute(P+'clip',id);g.setAttribute(P+'fingerprint',p.proofFingerprint);c.setAttribute('id',id+'-u995b-22-local-prefix-clip');c.setAttribute('clipPathUnits','userSpaceOnUse');ink.setAttribute('d',segment.outline);ink.setAttribute('visibility','hidden');return{g,defs,c,r,ink,id}})
 for(const n of[outer,...outer.children])n.ownerSVGElement=owner
 const ids=items.map(n=>n.id),nodes=items.map(n=>({group:n.g,ink:n.ink,rect:n.r,clipPath:n.c}))as unknown as Parameters<typeof commitLocalU995b22SourcePrefix>[4]
 return{p,doc,owner,outer,slot,items,ids,nodes,pen}
}

test('饛22 DOM commits real single-mask clip and browser-canonical geometry, then cleans up',()=>{
 for(const t of [0,1e-12,1e-6,.03,.5,1]){const d=dom(t);d.doc.serializeGeometry=value=>Number.parseFloat(value).toPrecision(6)+'px';const r=commitLocalU995b22SourcePrefix(d.p,s[21],t,d.ids,d.nodes);assert.notEqual(r.status,'hidden',r.status==='hidden'?r.error:'')
 const frame=sampleLocalU995b22SourcePrefixFrame(d.p,s[21],t);for(const n of d.items){assert.equal(n.ink.getAttribute('d'),s[21][0].outline);assert.equal(n.ink.getAttribute('visibility'),t>0?'visible':'hidden');assert.equal(n.ink.getAttribute('clip-path'),t===1?null:'url(#'+n.id+'-u995b-22-local-prefix-clip)');for(const[k,v]of Object.entries(frame.clip)){assert.equal(n.r.getAttribute(k),String(v));assert.equal(n.r.style.getPropertyValue(k),String(v)+'px')}}assert.equal(d.owner.children.length,1);r.cleanup();assert(d.items.every(n=>n.ink.getAttribute('visibility')==='hidden'))}
})
test('饛22 altered source, owner, frame, CSS and mid-commit changes fail closed',()=>{
 const changes:Array<(d:ReturnType<typeof dom>)=>void>=[d=>d.owner.setAttribute('viewBox','0 0 200 200'),d=>d.outer.children.reverse(),d=>d.items[0].g.setAttribute('data-stroke-reveal-progress','.2'),d=>d.items[0].ink.setAttribute('d',s[21][0].outline+' '),d=>d.items[0].ink.css.set('d','path("M0 0Z")'),d=>d.slot.css.set('opacity','.6'),d=>d.items[0].g.setAttribute('transform','translate(1)'),d=>d.items[0].g.setAttribute(P+'fingerprint','wrong'),d=>d.items[0].c.setAttribute('clipPathUnits','objectBoundingBox')]
 for(const change of changes){const d=dom(.03);change(d);assert.equal(commitLocalU995b22SourcePrefix(d.p,s[21],.03,d.ids,d.nodes).status,'hidden');assert(d.items.every(n=>n.ink.getAttribute('visibility')==='hidden'))}
 const d=dom(.03);let once=false;d.doc.onSet=(n,k)=>{if(!once&&n===d.items[0].ink&&k===P+'phase'){once=true;d.items[0].r.css.set('height','0px')}};assert.equal(commitLocalU995b22SourcePrefix(d.p,s[21],.03,d.ids,d.nodes).status,'hidden')
 const z=dom(.03);z.doc.serializeGeometry=()=> '0px';z.doc.globalGeometry=(n,k)=>n.localName==='rect'&&k==='width'?'0px':null;assert.equal(commitLocalU995b22SourcePrefix(z.p,s[21],.03,z.ids,z.nodes).status,'hidden')
})
test('饛22 source and connected-prefix proof pins bind this preview without native/runtime claims',()=>{
 for(const[path,pin]of Object.entries(LOCAL_U995B22_SOURCE_PREFIX_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),pin)
 assert.deepEqual(LOCAL_U995B22_SOURCE_PREFIX_INPUT.strokes,s);assert.equal(LOCAL_U995B22_SOURCE_PREFIX_SOURCE.localAuthoredRoot,true);assert.equal(LOCAL_U995B22_SOURCE_PREFIX_SOURCE.originalPublicWhole,false);assert.equal(LOCAL_U995B22_SOURCE_PREFIX_SOURCE.sourceDirectionApprovalPending,true);assert.equal(LOCAL_U995B22_SOURCE_PREFIX_SOURCE.nativeForwardApproval,false);assert.equal(LOCAL_U995B22_SOURCE_PREFIX_SOURCE.runtimeApplied,false)
})
