import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u7aea-local-2026-10-27/fixtures-draft.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeLocalU7aeaSourcePrefixContext,localU7aeaSourcePrefixPolicy,sampleLocalU7aeaSourcePrefixFrame,commitLocalU7aeaSourcePrefix,LOCAL_U7AEA_SOURCE_PREFIX_INPUT,LOCAL_U7AEA_SOURCE_PREFIX_INPUT_SHA256,LOCAL_U7AEA_SOURCE_PREFIX_SOURCE} from './hanja-stroke-source-prefix-u7aea-local.ts'
const f=fixture.u7aea,s=f.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',P='data-u7aea-local-prefix-',clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const context=()=>{const c=makeLocalU7aeaSourcePrefixContext(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen:number)=>{const p=localU7aeaSourcePrefixPolicy(context(),pen-1);assert(p);return p}
test('竪 exact locally authored fullproof/identity/compiled snapshot rejects different geometry and getters',()=>{
 assert.equal(createHash('sha256').update(JSON.stringify(s)).digest('hex'),'c59c97d44ce071358ae98d1e01b34d32447276e5ab736f88d59766262dc0f110')
 assert.deepEqual(LOCAL_U7AEA_SOURCE_PREFIX_INPUT.strokes,s)
 const make=makeLocalU7aeaSourcePrefixContext as(...v:unknown[])=>unknown
 assert(make(clone(f.fullProof),clone(f.identity),clone(s)));assert.equal(make(f.fullProof,f.identity),null);assert.equal(make(f.fullProof,f.identity,s,0),null)
 for(const key of ['outline','bounds','weight','revealPath','revealWidth']){const changed=clone(s);(changed[7][0]as unknown as Record<string,unknown>)[key]=null;assert.equal(make(f.fullProof,f.identity,changed),null)}
 const proof=clone(f.fullProof);proof.trace[0][0].args[0]+=.01;assert.equal(make(proof,f.identity,s),null)
 assert.equal(make(f.fullProof,{...f.identity,root:'u7aea'},s),null)
 let reads=0;const getter=Object.defineProperty({...f.identity},'root',{enumerable:true,get(){reads++;return f.identity.root}});assert.equal(make(f.fullProof,getter,s),null);assert.equal(reads,0)
 const nested=clone(s);Object.defineProperty(nested[7][0],'outline',{enumerable:true,get(){reads++;return s[8][0].outline}});assert.equal(make(f.fullProof,f.identity,nested),null);assert.equal(reads,0)
 assert.equal(make(f.fullProof,f.identity,Object.assign(Object.create(null),s)),null)
})
test('竪 policies own only8/9/11/12 whole logical source masks',()=>{
 for(let i=0;i<13;i++)assert.equal(Boolean(localU7aeaSourcePrefixPolicy(context(),i)),[7,8,10,11].includes(i))
 assert.equal(localU7aeaSourcePrefixPolicy({...context()},8),null)
 for(const pen of [8,9,11,12]){const p=policy(pen);assert.throws(()=>sampleLocalU7aeaSourcePrefixFrame({...p},s[pen-1],.1));assert.throws(()=>sampleLocalU7aeaSourcePrefixFrame(p,[...s[pen-1],s[pen-1][0]],.1))}
 assert.equal(policy(9).segments.length,1);assert.throws(()=>sampleLocalU7aeaSourcePrefixFrame(policy(9),[],.1))
})
test('竪 one explicit author clock preserves exact masks and monotonically expands cap-free clip',()=>{
 for(const pen of [8,9,11,12]){const p=policy(pen),before=clone(s[pen-1]);let last=p.start
 for(const t of [0,1e-12,1e-6,.01,.03,.25,.5,.99,1]){const r=sampleLocalU7aeaSourcePrefixFrame(p,s[pen-1],t);assert.equal(r.cutoff,p.start+(p.finish-p.start)*t);assert(p.axis==='x'?r.cutoff<=last:r.cutoff>=last);last=r.cutoff;assert.equal(r.visible,t>0);assert.equal(r.originalPDirect,t===1);assert.equal(r.phase,t===0?'empty':t===1?'full':'source-union-'+p.axis+'-prefix');assert.equal(r.originalGuideOrMaskWeightClockEquivalent,false);assert.equal(r.wholeLogicalClock,true);assert.deepEqual(r.outlines,s[pen-1].map(v=>v.outline));assert.deepEqual(r.sourceWeights,s[pen-1].map(v=>v.weight));assert.deepEqual(r.sourceGuides,s[pen-1].map(v=>v.revealPath??null));assert.deepEqual(r.sourceWidths,s[pen-1].map(v=>v.revealWidth??null))}
 assert.deepEqual(s[pen-1],before);for(const t of [-1,1.001,NaN,Infinity])assert.throws(()=>sampleLocalU7aeaSourcePrefixFrame(p,s[pen-1],t))}
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

function dom(t:number,pen=9){
 const p=policy(pen),doc=new D(),owner=new N('svg',doc),outer=new N('g',doc);owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true')
 for(let i=0;i<13;i++){const n=new N('g',doc);n.setAttribute('data-outline-stroke',String(i+1));outer.append(n)}
 const slot=outer.children[pen-1],items=p.segments.map((segment,i)=>{const g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-'+(pen-1)+'-'+i;slot.append(g);g.append(defs);defs.append(c);c.append(r);g.append(ink);for(const n of[g,defs,c,r,ink])n.ownerSVGElement=owner
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(t));g.setAttribute(P+'mask',String(i+1));g.setAttribute(P+'clip',id);g.setAttribute(P+'fingerprint',p.proofFingerprint);c.setAttribute('id',id+'-u7aea-local-prefix-clip');c.setAttribute('clipPathUnits','userSpaceOnUse');ink.setAttribute('d',segment.outline);ink.setAttribute('visibility','hidden');return{g,defs,c,r,ink,id}})
 for(const n of[outer,...outer.children])n.ownerSVGElement=owner
 const ids=items.map(n=>n.id),nodes=items.map(n=>({group:n.g,ink:n.ink,rect:n.r,clipPath:n.c}))as unknown as Parameters<typeof commitLocalU7aeaSourcePrefix>[4]
 return{p,doc,owner,outer,slot,items,ids,nodes,pen}
}
test('竪 DOM adapter binds current logical owner and commits one complete original owner per affected logical pen',()=>{
 for(const pen of [8,9,11,12])for(const t of [0,1e-12,1e-6,.03,.5,1]){
 const d=dom(t,pen),r=commitLocalU7aeaSourcePrefix(d.p,s[pen-1],t,d.ids,d.nodes);assert.notEqual(r.status,'hidden',r.status==='hidden'?r.error:'')
 const f=sampleLocalU7aeaSourcePrefixFrame(d.p,s[pen-1],t);for(const n of d.items){for(const[k,v]of Object.entries(f.clip)){assert.equal(n.r.getAttribute(k),String(v));assert.equal(n.r.style.getPropertyValue(k),String(v)+'px')}assert.equal(n.ink.getAttribute('visibility'),t>0?'visible':'hidden');assert.equal(n.ink.getAttribute('clip-path'),t===1?null:'url(#'+n.id+'-u7aea-local-prefix-clip)')}r.cleanup();assert(d.items.every(n=>n.ink.getAttribute('visibility')==='hidden'))}
})
test('竪 altered source/frame/owner/CSS and mid-commit mutation fail closed for entire pen9',()=>{
 const changes:Array<(d:ReturnType<typeof dom>)=>void>=[d=>d.owner.setAttribute('viewBox','0 0 200 200'),d=>d.slot.children.push(d.items[0].g),d=>d.items[0].g.setAttribute('data-stroke-reveal-progress','.2'),d=>d.items[0].ink.setAttribute('d',s[8][0].outline+' '),d=>d.items[0].ink.css.set('d','path("M0 0Z")'),d=>d.slot.css.set('opacity','.6'),d=>d.items[0].g.setAttribute('transform','translate(1)'),d=>d.items[0].g.setAttribute(P+'fingerprint','wrong'),d=>d.items[0].c.setAttribute('clipPathUnits','objectBoundingBox')]
 for(const change of changes){const d=dom(.03);change(d);const r=commitLocalU7aeaSourcePrefix(d.p,s[8],.03,d.ids,d.nodes);assert.equal(r.status,'hidden');assert(d.items.every(n=>n.ink.getAttribute('visibility')==='hidden'))}
 const d=dom(.03);let once=false;d.doc.onSet=(n,k)=>{if(!once&&n===d.items[0].ink&&k===P+'phase'){once=true;d.items[0].r.css.set('height','0px')}};assert.equal(commitLocalU7aeaSourcePrefix(d.p,s[8],.03,d.ids,d.nodes).status,'hidden');assert(d.items.every(n=>n.ink.getAttribute('visibility')==='hidden'))
})
test('竪 fixture and source proof pins remain exact; authored-local preview cannot claim runtime',()=>{
 for(const[path,pin]of Object.entries(LOCAL_U7AEA_SOURCE_PREFIX_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),pin)
 assert.equal(LOCAL_U7AEA_SOURCE_PREFIX_SOURCE.localAuthoredRoot,true);assert.equal(LOCAL_U7AEA_SOURCE_PREFIX_SOURCE.originalPublicWhole,false);assert.equal(LOCAL_U7AEA_SOURCE_PREFIX_SOURCE.nativeForwardApproval,false);assert.equal(LOCAL_U7AEA_SOURCE_PREFIX_SOURCE.runtimeApplied,false)
})
test('canonical prefix CSS serialization preserves all exact clips without an arbitrary tolerance',()=>{
 for(const pen of[8,9,11,12]){const q=4e-10,d=dom(q,pen);d.doc.serializeGeometry=v=>String(Math.round(Number(v.replace('px',''))*1e6)/1e6)+'px';const r=commitLocalU7aeaSourcePrefix(d.p,s[pen-1],q,d.ids,d.nodes);assert.equal(r.status,'visible');const f=sampleLocalU7aeaSourcePrefixFrame(d.p,s[pen-1],q);for(const n of d.items)for(const[k,v]of Object.entries(f.clip))assert.equal(n.r.getAttribute(k),String(v));assert.equal(f.progress,q);assert.equal(d.owner.children.length,1)}
})
test('canonical prefix comparison rejects changed actual bbox and corrupted no-paint probe',()=>{
 const d=dom(.03);d.doc.globalGeometry=(n,k)=>n===d.items[0].r&&k==='width'?'0px':null;assert.equal(commitLocalU7aeaSourcePrefix(d.p,s[8],.03,d.ids,d.nodes).status,'hidden');assert.equal(d.owner.children.length,1)
 const e=dom(.03);e.doc.onStyleRead=n=>{if(n.localName==='rect'&&n!==e.items[0].r)n.style.setProperty('height','7px','important')};assert.equal(commitLocalU7aeaSourcePrefix(e.p,s[8],.03,e.ids,e.nodes).status,'hidden');assert.equal(e.owner.children.length,1)
})
