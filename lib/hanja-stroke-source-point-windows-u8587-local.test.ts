import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u8587-local-components-2026-10-27/fixtures-draft.json' with {type:'json'}
import {outlineSegmentProgress,outlineClip,type HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8587LocalPointWindowContext as make,reviewedU8587LocalPointWindowPolicy as select,sampleReviewedU8587LocalPointWindowFrame as sample,commitReviewedU8587LocalPointWindow as commit,verifyReviewedU8587LocalPointWindowPriorDOM as priorDOM,REVIEWED_U8587_LOCAL_POINT_WINDOW_INPUT_SHA256 as pins,REVIEWED_U8587_LOCAL_POINT_WINDOWS as review} from './hanja-stroke-source-point-windows-u8587-local.ts'
const f=fixture.u8587,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v)),sha=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex')
const ctx=()=>{const c=make(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen:13)=>{const p=select(ctx(),pen-1,2);assert(p);return p}
const NS='http://www.w3.org/2000/svg',P='data-u8587-local-source-window-'
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

function dom(p:ReturnType<typeof policy>,requested:number,logicalOverride?:number){
 const weights=s[12].map(m=>m.weight),total=weights.reduce((a,b)=>a+b,0),before=(weights[0]+weights[1])/total,span=weights[2]/total,logical=logicalOverride??(requested===1?1:before+span*requested),amounts=outlineSegmentProgress(s[12],logical),progress=amounts[2],priorProgress=amounts[1]
 const doc=new D(),owner=new N('svg',doc),outer=new N('g',doc);owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true')
 for(let i=0;i<s.length;i++){const slot=new N('g',doc);slot.setAttribute('data-outline-stroke',String(i+1));outer.append(slot)}
 const slot=outer.children[12],g=new N('g',doc),defs=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-12-2',H=new N('path',doc)
 for(let i=0;i<4;i++){if(i===2){slot.append(g);continue}if(amounts[i]===0)continue;const path=i===1?H:new N('path',doc);path.setAttribute('d',s[12][i].outline);if(amounts[i]===1)slot.append(path);else{const part=new N('g',doc),definition=new N('defs',doc),clip=new N('clipPath',doc),rect=new N('rect',doc);clip.setAttribute('id','test-12-'+i);path.setAttribute('clip-path','url(#test-12-'+i+')');for(const[k,v]of Object.entries(outlineClip(s[12][i],amounts[i])))rect.setAttribute(k,String(v));slot.append(part);part.append(definition);definition.append(clip);clip.append(rect);part.append(path)}}g.append(defs);defs.append(c);c.append(r);g.append(ink)
 for(const n of[outer,...outer.children,...slot.children,g,defs,c,r,ink])n.ownerSVGElement=owner
 g.setAttribute('data-stroke-start-gate',p.id);g.setAttribute('data-stroke-reveal-policy',p.kind);g.setAttribute('data-stroke-reveal-progress',String(progress));g.setAttribute(P+'clip',id);g.setAttribute(P+'fingerprint',p.proofFingerprint);g.setAttribute(P+'prior-progress',String(priorProgress));g.setAttribute(P+'logical-progress',String(logical))
 c.setAttribute('id',id+'-u8587-local-source-window-clip');c.setAttribute('clipPathUnits','userSpaceOnUse');ink.setAttribute('d',p.segment.outline);ink.setAttribute('visibility','hidden');for(const k of['x','y','width','height'])r.setAttribute(k,'999')
 return{doc,owner,outer,slot,g,defs,c,r,ink,id,H,logical,progress,priorProgress,nodes:{group:g,ink,rect:r,clipPath:c}as unknown as Parameters<typeof commit>[4]}
}
const run=(p:ReturnType<typeof policy>,d:ReturnType<typeof dom>)=>commit(p,p.segment,d.progress,d.id,d.nodes,d.priorProgress,d.logical)
test('local 薇 exact whole17 context and all untouched field/pin contract',()=>{
 assert(ctx());assert.equal(sha(JSON.stringify(s)),'3700d16a0661f86803707df324e76d2305f2b8e180baa38e6dbc1fefa860f67a');for(const[p,h]of Object.entries(pins))assert.equal(sha(readFileSync(new URL('../'+p,import.meta.url))),h,p)
 const reverse=(v:object)=>Object.fromEntries(Object.entries(v).reverse());assert(make(reverse(f.fullProof),reverse(f.identity),clone(s)));assert.equal((make as(...a:unknown[])=>unknown)(f.fullProof,f.identity),null);assert.equal((make as(...a:unknown[])=>unknown)(f.fullProof,f.identity,s,0),null)
 assert.equal(make(f.fullProof,{...f.identity,extra:true},s),null);const proof=clone(f.fullProof);proof.trace[0][0].args[0]+=.01;assert.equal(make(proof,f.identity,s),null)
 for(const key of ['outline','bounds','direction','weight','revealPath','revealWidth']){const changed=clone(s)as unknown as Record<string,unknown>[][];changed[12][2][key]=null;assert.equal(make(f.fullProof,f.identity,changed as unknown as HanjaOutlineStrokes),null)}
 let reads=0;const getter=Object.defineProperty({...f.identity},'root',{enumerable:true,get(){reads++;return f.identity.root}});assert.equal(make(f.fullProof,getter,s),null);assert.equal(reads,0);assert.equal(make(f.fullProof,Object.assign(Object.create(null),f.identity),s),null)
 assert.equal(review.previewOnly,true);assert.equal(review.nativeApproval,false);assert.equal(review.runtimeApplied,false);assert.equal(review.originalPublicWholeClaim,false)
})
test('only 13m3 own private source-Q sample anchors',()=>{
 for(let i=0;i<s.length;i++)for(let m=0;m<s[i].length;m++){const p=select(ctx(),i,m);assert.equal(!!p,i===12&&m===2)}
 for(const pen of[13]as const){const p=policy(pen),values=p.segment.revealPath!.match(/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g)!.map(Number),t=p.sourceT;assert.equal(values.length,6);assert.deepEqual(p.anchor,[(1-t)**2*values[0]+2*t*(1-t)*values[2]+t*t*values[4],(1-t)**2*values[1]+2*t*(1-t)*values[3]+t*t*values[5]]);assert.throws(()=>sample({...p},p.segment,.5,1,true));assert.equal(select({...ctx()},p.pen-1,p.mask-1),null)}
})
test('new authored nested rectangle family preserves P/Q/bounds/width/weight and hides zero',()=>{
 for(const pen of[13]as const){const p=policy(pen);for(const q of[0,1e-9,.03,.5,1]){const a=sample(p,p.segment,q,1,true);assert.equal(a.outline,q===0?null:p.segment.outline);assert.equal(a.sourceGuide,p.segment.revealPath);assert.equal(a.sourceWidth,14);assert.equal(a.sourceT,p.sourceT);assert.equal(a.anchorIsOriginalQ0,false);assert.equal(a.originalClockEquivalent,false);assert.equal(a.originalPDirect,q===1);assert.equal(a.visible,q>0);assert.equal(a.phase,q===0?'empty':q===1?'full':'source-kernel-point-window');if(a.clip){const [ax,ay]=p.anchor,[x0,y0,x1,y1]=p.sourceBounds;assert.deepEqual(a.clip,{x:ax+(x0-ax)*q,y:ay+(y0-ay)*q,width:(x1-x0)*q,height:(y1-y0)*q});assert(a.clip.x<=ax&&a.clip.y<=ay&&a.clip.x+a.clip.width>=ax&&a.clip.y+a.clip.height>=ay)}}for(const q of[NaN,Infinity,-.1,1.01])assert.throws(()=>sample(p,p.segment,q,1,true));if(p.priorRequired){assert.throws(()=>sample(p,p.segment,.1,0,true));assert.throws(()=>sample(p,p.segment,.1,1,false));assert.doesNotThrow(()=>sample(p,p.segment,0,0,false))}}
})
test('actual 3-child owner accepts zero and partial13m3 with future4 exactly zero; done requires4',()=>{
 const p=policy(13);for(const q of[0,1e-6,.01,.5,.99999999,1]){const d=dom(p,q),r=run(p,d);assert.equal(d.slot.children.length,q===1?4:3);assert.equal(r.status,q===0?'empty':q===1?'complete':'visible');assert.equal(priorDOM(p,d.g as unknown as SVGGElement,d.progress,d.priorProgress,d.logical),true);assert.equal(d.ink.getAttribute(P+'committed'),'true')}
})
test('source projection rejects absent positive future, extra zero future, missing logical binding and forged current progress',()=>{
 const p=policy(13);const missing=dom(p,1);missing.slot.children[3].remove();assert.equal(run(p,missing).status,'hidden');
 const extra=dom(p,.1);extra.slot.append(new N('path',extra.doc));assert.equal(run(p,extra).status,'hidden');
 const noBinding=dom(p,.1);noBinding.g.removeAttribute(P+'logical-progress');assert.equal(run(p,noBinding).status,'hidden');
 const forged=dom(p,.1);assert.equal(commit(p,p.segment,forged.progress+.001,forged.id,forged.nodes,forged.priorProgress,forged.logical).status,'hidden');
 const noInput=dom(p,.1);assert.equal(commit(p,p.segment,noInput.progress,noInput.id,noInput.nodes,1).status,'hidden');
})
test('direct completed prior V must retain exact P, opaque unclipped same owner and frame',()=>{
 const p=policy(13);const mutations:((d:ReturnType<typeof dom>)=>void)[]=[d=>d.H.css.set('opacity','0'),d=>d.H.css.set('fillOpacity','.5'),d=>d.H.setAttribute('d','M0 0Z'),d=>d.H.setAttribute('clip-path','url(#fake)'),d=>{d.H.ownerSVGElement=new N('svg',d.doc)},d=>{d.H.isConnected=false},d=>d.g.setAttribute(P+'prior-progress','0'),d=>d.H.remove()]
 for(const mutate of mutations){const d=dom(p,.1);mutate(d);assert.equal(run(p,d).status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden')}
})
test('prior and source logical input are rechecked during rect and final visibility commit',()=>{
 const p=policy(13);for(const stage of['rect','visibility']){const d=dom(p,.5);d.doc.onSet=(n,k,v)=>{if(stage==='rect'&&n===d.r&&k==='width'||stage==='visibility'&&n===d.ink&&k==='visibility'&&v==='visible')d.H.css.set('opacity','0')};assert.equal(run(p,d).status,'hidden')}
 const d=dom(p,.5);d.doc.onSet=(n,k)=>{if(n===d.r&&k==='width')d.g.setAttribute(P+'logical-progress','1')};assert.equal(run(p,d).status,'hidden')
})
test('current canonical positive tiny geometry allows CSS quantization but no bbox or inline forgery',()=>{
 const p=policy(13),d=dom(p,1e-9);d.doc.serializeGeometry=v=>String(Math.round(Number(v.replace('px',''))*1e6)/1e6)+'px';assert.equal(run(p,d).status,'visible');assert.equal(d.owner.children.length,1);
 const bad=dom(p,1e-9);bad.doc.serializeGeometry=v=>String(Math.round(Number(v.replace('px',''))*1e6)/1e6)+'px';bad.doc.globalGeometry=(n,k)=>n.localName==='rect'&&k==='width'?'0px':null;assert.equal(run(p,bad).status,'hidden');
 d.r.style.setProperty('width','0px');assert.equal(run(p,d).status,'hidden')
})
test('before point starts: zero H, partial H, H/V boundary, partial V and lower-boundary derive exact target position',()=>{
 const p=policy(13),weights=s[12].map(m=>m.weight),total=weights.reduce((a,b)=>a+b,0),h=weights[0]/total,start=(weights[0]+weights[1])/total;
 for(const logical of[0,h/2,h-1e-10,h,h+1e-10,(h+start)/2,start-1e-10,start]){const d=dom(p,0,logical);assert.equal(d.progress,0);const amounts=outlineSegmentProgress(s[12],logical),index=amounts.slice(0,2).filter(v=>v>0).length;assert.strictEqual(d.slot.children[index],d.g);assert.equal(run(p,d).status,'empty');assert.equal(d.ink.getAttribute('visibility'),'hidden');assert.equal(d.ink.getAttribute(P+'committed'),'true')}
 const bad=dom(p,0,h/2);bad.slot.children[0].children[1].setAttribute('d','M0 0Z');assert.equal(run(p,bad).status,'hidden');
 const shifted=dom(p,0,0);shifted.slot.append(new N('path',shifted.doc));assert.equal(run(p,shifted).status,'hidden');
})
