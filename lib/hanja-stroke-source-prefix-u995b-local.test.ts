import test from 'node:test'
import assert from 'node:assert/strict'
import fixture from '../docs/hanja-source-original-u995b-local-2026-10-27/fixtures-draft.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeLocalU995bSourcePrefixContext,localU995bSourcePrefixPolicy,sampleLocalU995bSourcePrefixFrame,commitLocalU995bSourcePrefix} from './hanja-stroke-source-prefix-u995b-local.ts'
const f=fixture.u995b,s=f.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',P='data-u995b-local-prefix-',clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const context=()=>{const c=makeLocalU995bSourcePrefixContext(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen:number)=>{const p=localU995bSourcePrefixPolicy(context(),pen-1);assert(p);return p}
const pens=[1,2,14,18,20,21,23]
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

function dom(t:number,pen=1){
 const p=policy(pen),doc=new D(),owner=new N('svg',doc),outer=new N('g',doc);owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true')
 for(let i=0;i<23;i++){const n=new N('g',doc);n.setAttribute('data-outline-stroke',String(i+1));outer.append(n)}
 const slot=outer.children[pen-1],items=p.segments.map((segment,i)=>{const g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-'+(pen-1)+'-'+i;slot.append(g);g.append(defs);defs.append(c);c.append(r);g.append(ink);for(const n of[g,defs,c,r,ink])n.ownerSVGElement=owner
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(t));g.setAttribute(P+'mask',String(i+1));g.setAttribute(P+'clip',id);g.setAttribute(P+'fingerprint',p.proofFingerprint);c.setAttribute('id',id+'-u995b-local-prefix-clip');c.setAttribute('clipPathUnits','userSpaceOnUse');ink.setAttribute('d',segment.outline);ink.setAttribute('visibility','hidden');return{g,defs,c,r,ink,id}})
 for(const n of[outer,...outer.children])n.ownerSVGElement=owner
 const ids=items.map(n=>n.id),nodes=items.map(n=>({group:n.g,ink:n.ink,rect:n.r,clipPath:n.c}))as unknown as Parameters<typeof commitLocalU995bSourcePrefix>[4]
 return{p,doc,owner,outer,slot,items,ids,nodes,pen}
}
test('strict whole23 source identity and exact seven eligible policies only',()=>{const c=context();for(let i=0;i<23;i++)assert.equal(!!localU995bSourcePrefixPolicy(c,i),pens.includes(i+1));assert.equal(localU995bSourcePrefixPolicy({...c},0),null);const changed=clone(s);changed[0][0].weight+=.01;assert.equal(makeLocalU995bSourcePrefixContext(f.fullProof,f.identity,changed),null);assert.equal((makeLocalU995bSourcePrefixContext as(...v:unknown[])=>unknown)(f.fullProof,f.identity),null)})
test('source P/Q/width/weights untouched and Y cut is monotone with explicit empty/full',()=>{for(const pen of pens){const p=policy(pen),before=clone(s[pen-1]);let cut=p.start;for(const t of[0,1e-6,.03,.5,1]){const x=sampleLocalU995bSourcePrefixFrame(p,s[pen-1],t);assert(x.cutoff>=cut);cut=x.cutoff;assert.equal(x.visible,t>0);assert.equal(x.originalPDirect,t===1);assert.deepEqual(x.outlines,s[pen-1].map(m=>m.outline));assert.deepEqual(x.sourceGuides,s[pen-1].map(m=>m.revealPath??null));assert.equal(x.originalGuideOrMaskWeightClockEquivalent,false)}assert.deepEqual(s[pen-1],before);assert.throws(()=>sampleLocalU995bSourcePrefixFrame({...p},s[pen-1],.5))}})
test('seven actual owner DOM transactions preserve original paint and exact0/epsilon/full',()=>{for(const pen of pens)for(const t of[0,1e-6,.03,.5,1]){const d=dom(t,pen),r=commitLocalU995bSourcePrefix(d.p,s[pen-1],t,d.ids,d.nodes);assert.notEqual(r.status,'hidden',r.status==='hidden'?r.error:'');assert.equal(d.items[0].ink.getAttribute('visibility'),t>0?'visible':'hidden');assert.equal(d.items[0].ink.getAttribute('clip-path'),t===1?null:'url(#'+d.ids[0]+'-u995b-local-prefix-clip)');r.cleanup()}})
test('owner/frame/source/CSS mutation fails closed including final commit',()=>{const mutations:Array<(d:ReturnType<typeof dom>)=>void>=[d=>d.owner.setAttribute('viewBox','0 0 200 200'),d=>d.items[0].ink.setAttribute('d','M0 0Z'),d=>d.slot.css.set('opacity','.5'),d=>d.items[0].g.setAttribute(P+'fingerprint','bad'),d=>{d.doc.onStyleRead=n=>{if(n===d.items[0].r)n.style.setProperty('height','0px','important')}}];for(const mutate of mutations){const d=dom(.5);mutate(d);assert.equal(commitLocalU995bSourcePrefix(d.p,s[0],.5,d.ids,d.nodes).status,'hidden')}})
test('canonical CSS quantization keeps exact source rect and rejects actual forged bbox',()=>{const d=dom(1e-6);d.doc.serializeGeometry=v=>Number.parseFloat(v).toPrecision(6)+'px';assert.notEqual(commitLocalU995bSourcePrefix(d.p,s[0],1e-6,d.ids,d.nodes).status,'hidden');const bad=dom(.5);bad.doc.globalGeometry=(n,k)=>n.localName==='rect'&&k==='width'?'0px':null;assert.equal(commitLocalU995bSourcePrefix(bad.p,s[0],.5,bad.ids,bad.nodes).status,'hidden')})
