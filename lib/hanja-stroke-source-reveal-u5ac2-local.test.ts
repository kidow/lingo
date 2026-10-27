import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u5ac2-sou10-layout-v2-2026-10-27/fixtures-draft.json' with {type:'json'}
import {outlineSegmentProgress,type HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeLocalU5ac2RevealContext,localU5ac2RevealPolicy,sampleLocalU5ac2RevealFrame,commitLocalU5ac2Reveal,verifyLocalU5ac2RevealPriorDOM,LOCAL_U5AC2_REVEAL_INPUT,LOCAL_U5AC2_REVEAL_SOURCE,LOCAL_U5AC2_REVEAL_INPUT_SHA256} from './hanja-stroke-source-reveal-u5ac2-local.ts'
const f=fixture.u5ac2,s=f.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',P='data-u5ac2-local-reveal-',clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v)),targets=[[1,1],[2,1],[4,1],[13,1],[1,2],[12,2]]
const context=()=>{const c=makeLocalU5ac2RevealContext(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen:number,mask:number)=>{const p=localU5ac2RevealPolicy(context(),pen-1,mask-1);assert(p);return p}
test('嫂 six policies bind exact authored fullproof/identity/mask fields without reading getters',()=>{
 assert.equal(createHash('sha256').update(JSON.stringify(s)).digest('hex'),'5e97d491dc632136822abac0459dd60608770c578a81b76f61733277e1dbfc10');assert.deepEqual(LOCAL_U5AC2_REVEAL_INPUT.strokes,s)
 const make=makeLocalU5ac2RevealContext as(...v:unknown[])=>unknown;assert(make(clone(f.fullProof),clone(f.identity),clone(s)));assert.equal(make(f.fullProof,f.identity),null);assert.equal(make(f.fullProof,f.identity,s,0),null);assert.equal(make(f.fullProof,{...f.identity,root:'u5ac2'},s),null);assert.equal(make(f.fullProof,Object.assign(Object.create(null),f.identity),s),null)
 for(const key of ['outline','bounds','weight','revealPath','revealWidth']){const changed=clone(s);(changed[11][1]as unknown as Record<string,unknown>)[key]=null;assert.equal(make(f.fullProof,f.identity,changed),null)}
 let reads=0;const getter=Object.defineProperty({...f.identity},'root',{enumerable:true,get(){reads++;return f.identity.root}});assert.equal(make(f.fullProof,getter,s),null);const nested=clone(s);Object.defineProperty(nested[11][1],'outline',{enumerable:true,get(){reads++;return s[11][1].outline}});assert.equal(make(f.fullProof,f.identity,nested),null);assert.equal(reads,0)
 for(let pen=1;pen<=13;pen++)for(let mask=1;mask<=s[pen-1].length;mask++)assert.equal(!!localU5ac2RevealPolicy(context(),pen-1,mask-1),targets.some(([a,b])=>a===pen&&b===mask));assert.equal(localU5ac2RevealPolicy({...context()},0,0),null)
})
test('嫂 five source-axis frames preserve original masks and explicit empty/direct completion',()=>{
 for(const[pen,mask]of targets.filter(([p])=>p!==12)){const p=policy(pen,mask),segment=s[pen-1][mask-1],before=clone(segment);let last=p.start
 for(const t of [0,1e-12,1e-6,.03,.25,.5,.99,1]){const frame=sampleLocalU5ac2RevealFrame(p,segment,t);assert.equal(frame.cutoff,p.start+(p.finish-p.start)*t);assert(p.axis==='x'?frame.cutoff<=last:frame.cutoff>=last);last=frame.cutoff;assert.equal(frame.visible,t>0);assert.equal(frame.originalPDirect,t===1);assert.equal(frame.outline,segment.outline);assert.equal(frame.sourceGuide,segment.revealPath??null);assert.equal(frame.sourceWeight,segment.weight);assert.equal(frame.sourceWidth,segment.revealWidth??null);assert.equal(frame.originalMicroclockEquivalent,false);assert.equal(frame.paintOriginalPOnce,true);assert.equal(frame.headPathD,'');if(t===0)assert.equal(frame.clip.width*frame.clip.height,0)}
 assert.deepEqual(segment,before);for(const t of [-1,1.001,NaN,Infinity])assert.throws(()=>sampleLocalU5ac2RevealFrame(p,segment,t));assert.throws(()=>sampleLocalU5ac2RevealFrame({...p},segment,.1));assert.throws(()=>sampleLocalU5ac2RevealFrame(p,{...segment,weight:segment.weight+.01},.1))}
})
test('嫂12 head3 then bodyX prefix uses clip-only phases and one unchanged original D',()=>{
 const p=policy(12,2),segment=s[11][1],h=LOCAL_U5AC2_REVEAL_SOURCE.headPhaseShare,zero=sampleLocalU5ac2RevealFrame(p,segment,0);assert.equal(zero.visible,false);assert.equal(zero.headPathD,'');assert.equal(zero.bodyProgress,0);assert.equal(zero.clip.width,0)
 for(const t of [1e-12,h/4,h-1e-10]){const frame=sampleLocalU5ac2RevealFrame(p,segment,t);assert.equal(frame.phase,'source-head-triangles');assert.equal(frame.bodyProgress,0);assert.equal(frame.clip.width,0);assert.equal(frame.outline,segment.outline);assert.equal(frame.paintOriginalPOnce,true);assert(frame.headPathD);assert(frame.headPathD.match(/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g)?.map(Number).every(Number.isFinite))}
 const at=sampleLocalU5ac2RevealFrame(p,segment,h),after=sampleLocalU5ac2RevealFrame(p,segment,h+1e-10);assert.equal(at.headPathD,p.headOutline);assert.equal(at.headFullTriangles,3);assert.equal(at.bodyProgress,0);assert.equal(after.phase,'source-body-x-prefix');assert.equal(after.headPathD,p.headOutline);assert(after.bodyProgress>0);assert(after.cutoff<p.start);assert.equal(after.bodyOutline,p.bodyOutline)
 const full=sampleLocalU5ac2RevealFrame(p,segment,1);assert.equal(full.originalPDirect,true);assert.equal(full.outline,segment.outline);assert.equal(full.sourceWeight,segment.weight);assert.equal(full.bodyProgress,1);assert.equal(full.sourceGuide,segment.revealPath);assert.equal(full.originalMicroclockEquivalent,false)
})
class N{
 nodeType=1;namespaceURI=NS;isConnected=true;parentNode:N|null=null;children:N[]=[]
 ownerSVGElement:N|null=null;attrs=new Map<string,string>();css=new Map<string,string>();priorities=new Map<string,string>()
 style={setProperty:(k:string,v:string,priority='')=>{this.css.set(k,v);this.priorities.set(k,priority)},getPropertyValue:(k:string)=>this.css.get(k)??'',getPropertyPriority:(k:string)=>this.priorities.get(k)??''}
 localName:string;ownerDocument:D
 constructor(localName:string,ownerDocument:D){this.localName=localName;this.ownerDocument=ownerDocument}
 get parentElement(){return this.parentNode}
 get nextElementSibling():N|null{if(!this.parentNode)return null;return this.parentNode.children[this.parentNode.children.indexOf(this)+1]??null}
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
 emptyPathComputedNone=false
 onStyleRead:((n:N)=>void)|null=null;onSet:((n:N,k:string,v:string)=>void)|null=null
 globalGeometry:((n:N,k:string)=>string|null)|null=null;serializeGeometry:((value:string)=>string)|null=null
 defaultView={document:this,getComputedStyle:(n:N)=>{
  this.onStyleRead?.(n)
  const values:Record<string,string>={display:'inline',transform:'none',filter:'none',clipPath:n.getAttribute('clip-path')??'none',opacity:'1',mixBlendMode:'normal',stroke:'none',fillOpacity:'1',fillRule:'nonzero',fill:'rgb(66, 85, 255)',visibility:n.getAttribute('visibility')??'visible'}
  for(const[k,v]of n.css)values[k]=v
  return {...values,getPropertyValue:(k:string)=>k==='d'&&this.emptyPathComputedNone&&n.getAttribute('d')===''&&!n.css.has('d')?'none':['x','y','width','height'].includes(k)&&n.localName==='rect'?(this.serializeGeometry?.(n.geometryValue(k))??n.geometryValue(k)):n.css.get(k)??(['mask-image','translate','rotate','scale'].includes(k)?'none':'')}
 }}
 createElementNS(_ns:string,name:string){return new N(name,this)}
}

function dom(t:number,pen=12,mask=2){const p=policy(pen,mask),doc=new D(),owner=new N('svg',doc),outer=new N('g',doc);owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true');for(let i=0;i<13;i++){const g=new N('g',doc);g.setAttribute('data-outline-stroke',String(i+1));outer.append(g)}const slot=outer.children[pen-1],segments=s[pen-1],sum=segments.reduce((n,v)=>n+v.weight,0),before=segments.slice(0,mask-1).reduce((n,v)=>n+v.weight,0),logical=(before+t*segments[mask-1].weight)/sum,amounts=outlineSegmentProgress(segments,logical),progress=amounts[mask-1],prior=mask===2?amounts[0]:0,frameId='test-frame',items:Record<number,{g:N;defs:N;u:N;head:N;rect:N;ink:N;id:string}>={}
 for(let mi=0;mi<segments.length;mi++){const pol=localU5ac2RevealPolicy(context(),pen-1,mi);if(mi!==mask-1&&amounts[mi]===1){const ink=new N('path',doc);ink.setAttribute('d',segments[mi].outline);slot.append(ink);continue}if(!pol&&amounts[mi]===0)continue;if(!pol)throw Error('These tests need only completed generic prior or exact future policy')
 const g=new N('g',doc),defs=new N('defs',doc),u=new N('clipPath',doc),head=new N('path',doc),rect=new N('rect',doc),ink=new N('path',doc),id='test-'+(pen-1)+'-'+mi;slot.append(g);g.append(defs);defs.append(u);u.append(head);u.append(rect);g.append(ink)
 for(const[k,v]of Object.entries({'data-stroke-start-gate':pol.id,'data-stroke-reveal-policy':pol.kind,'data-stroke-reveal-progress':String(amounts[mi]),[P+'clip']:id,[P+'fingerprint']:pol.proofFingerprint,[P+'prior-progress']:String(mi>0?amounts[mi-1]:0),[P+'logical-progress']:String(logical),[P+'frame']:frameId}))g.setAttribute(k,v)
 u.setAttribute('id',id+'-u5ac2-local-union');u.setAttribute('clipPathUnits','userSpaceOnUse');ink.setAttribute('d',segments[mi].outline);ink.setAttribute('visibility',mi===mask-1?'hidden':amounts[mi]>0?'visible':'hidden');items[mi]={g,defs,u,head,rect,ink,id}}
 const n=items[mask-1];assert(n);const nodes={group:n.g,ink:n.ink,unionClip:n.u,head:n.head,rect:n.rect}as unknown as Parameters<typeof commitLocalU5ac2Reveal>[4];return{p,doc,owner,outer,slot,nodes,n,items,pen,mask,logical,progress,prior,frameId}}
function commit(d:ReturnType<typeof dom>){return commitLocalU5ac2Reveal(d.p,s[d.pen-1][d.mask-1],d.progress,d.n.id,d.nodes,d.prior,d.logical,d.frameId)}
test('嫂 six DOM adapters commit one original ink and exact clip tree, then cleanup hides it',()=>{
 for(const[pen,mask]of targets)for(const t of [0,1e-12,1e-6,.03,.5,1]){const d=dom(t,pen,mask),result=commit(d);assert.notEqual(result.status,'hidden',result.error??'');assert.equal(d.n.ink.getAttribute('visibility'),d.progress>0?'visible':'hidden');assert.equal(d.n.ink.getAttribute('d'),s[pen-1][mask-1].outline);assert.equal(d.n.g.children.filter(n=>n.localName==='path').length,1);assert.equal(d.n.ink.getAttribute('clip-path'),d.progress===1?null:'url(#'+d.n.id+'-u5ac2-local-union)');assert.equal(d.owner.children.length,1);result.cleanup();assert.equal(d.n.ink.getAttribute('visibility'),'hidden')}
})
test('嫂 compound positive progress requires actual completed opaque same-owner original prior',()=>{
 for(const[pen,mask]of [[1,2],[12,2]]){const good=dom(.03,pen,mask);assert.equal(verifyLocalU5ac2RevealPriorDOM(good.p,good.n.g as unknown as SVGGElement,good.progress,good.prior,good.logical,good.frameId),true);assert.notEqual(commit(good).status,'hidden')
 const changes:Array<(d:ReturnType<typeof dom>)=>void>=[d=>d.slot.children[0].setAttribute('d','M0 0Z'),d=>d.slot.children[0].css.set('opacity','.6'),d=>d.slot.children[0].setAttribute('clip-path','url(#partial)'),d=>d.slot.children[0].isConnected=false,d=>d.slot.children[0].ownerSVGElement=new N('svg',d.doc),d=>d.n.g.setAttribute(P+'logical-progress','0'),d=>d.n.g.setAttribute(P+'frame','stale')]
 for(const change of changes){const d=dom(.03,pen,mask);change(d);assert.equal(commit(d).status,'hidden');assert.equal(d.n.ink.getAttribute('visibility'),'hidden')}
 const d=dom(.03,pen,mask);assert.equal(commitLocalU5ac2Reveal(d.p,s[pen-1][mask-1],d.progress,d.n.id,d.nodes,0,d.logical,d.frameId).status,'hidden')}
})
test('嫂 changed source D/owner/clip/CSS and a mid-commit prior mutation fail closed',()=>{
 const changes:Array<(d:ReturnType<typeof dom>)=>void>=[d=>d.owner.setAttribute('viewBox','0 0 200 200'),d=>d.n.u.setAttribute('clipPathUnits','objectBoundingBox'),d=>d.n.g.setAttribute(P+'fingerprint','wrong'),d=>d.n.ink.setAttribute('d',s[11][1].outline+' '),d=>d.n.ink.css.set('d','path("M0 0Z")'),d=>d.n.rect.css.set('clipPath','url(#wrong)'),d=>d.n.head.css.set('d','path("M0 0Z")'),d=>d.n.u.setAttribute('transform','translate(1)'),d=>d.slot.children.reverse(),d=>d.n.g.append(new N('path',d.doc)),d=>d.n.ink.css.set('stroke','red'),d=>d.slot.css.set('opacity','.5')]
 for(const change of changes){const d=dom(.03);change(d);assert.equal(commit(d).status,'hidden');assert.equal(d.n.ink.getAttribute('visibility'),'hidden')}
 const d=dom(.03);let once=false;d.doc.onSet=(n,k)=>{if(!once&&n===d.n.ink&&k===P+'phase'){once=true;d.slot.children[0].css.set('opacity','.6')}};assert.equal(commit(d).status,'hidden');assert.equal(d.n.ink.getAttribute('visibility'),'hidden')
})

test('嫂 empty head clip accepts actual computed d none without allowing a nonempty CSS substitute',()=>{const d=dom(.03,2,1);d.doc.emptyPathComputedNone=true;assert.notEqual(commit(d).status,'hidden');assert.equal(d.n.u.children.length,2);assert.equal(d.n.u.children[0].localName,'path');assert.equal(d.n.u.children[1].localName,'rect');const bad=dom(.03,2,1);bad.doc.emptyPathComputedNone=true;bad.n.head.css.set('d','path("M0 0L1 1Z")');assert.equal(commit(bad).status,'hidden')})
test('嫂 browser canonical rectangle rounding is accepted, CSS-forged positive body zero is rejected',()=>{
 const d=dom(.5,12,2);d.doc.serializeGeometry=v=>Number.parseFloat(v).toPrecision(6)+'px';assert.notEqual(commit(d).status,'hidden');assert.equal(d.owner.children.length,1)
 const forged=dom(.5,12,2);forged.doc.serializeGeometry=()=> '0px';forged.doc.globalGeometry=(n,k)=>n.localName==='rect'&&k==='width'?'0px':null;assert.equal(commit(forged).status,'hidden');assert.equal(forged.owner.children.length,1);assert.equal(forged.n.ink.getAttribute('visibility'),'hidden')
})
test('嫂 preview metadata retains all proof pins, catalog12/playback13 and no runtime approval',()=>{
 for(const[path,pin]of Object.entries(LOCAL_U5AC2_REVEAL_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),pin)
 assert.equal(LOCAL_U5AC2_REVEAL_SOURCE.catalogStrokes,12);assert.equal(LOCAL_U5AC2_REVEAL_SOURCE.playbackStrokes,13);assert.equal(LOCAL_U5AC2_REVEAL_SOURCE.oneOriginalInkPath,true);assert.equal(LOCAL_U5AC2_REVEAL_SOURCE.maskWeightsChanged,false);assert.equal(LOCAL_U5AC2_REVEAL_SOURCE.runtimeApplied,false);assert.equal(LOCAL_U5AC2_REVEAL_SOURCE.nativeForwardApproval,false);assert.equal(LOCAL_U5AC2_REVEAL_SOURCE.targets.length,6);assert(Object.isFrozen(LOCAL_U5AC2_REVEAL_INPUT.strokes))
})
