import {readFileSync} from 'node:fs'
import {verifyReviewedU51deBaseSourceRevealCompletedDOM as completedDOM}from './hanja-stroke-source-reveal-u51de-base.ts'
import {createHash} from 'node:crypto'
import {REVIEWED_U51DE_BASE_SOURCE_REVEAL_INPUT_SHA256 as INPUT_SHA,REVIEWED_U51DE_BASE_SOURCE_REVEAL as META}from './hanja-stroke-source-reveal-u51de-base.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import fixture from '../docs/hanja-source-original-u51de-base-2026-10-27/fixtures-draft.json' with {type:'json'}
import {outlineSegmentProgress,outlineClip,type HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU51deBaseSourceRevealContext as make,reviewedU51deBaseSourceRevealPolicy as select,sampleReviewedU51deBaseSourceRevealFrame as sample,commitReviewedU51deBaseSourceReveal as commit,verifyReviewedU51deBaseSourceRevealPriorDOM as priorDOM} from './hanja-stroke-source-reveal-u51de-base.ts'
const f=fixture.u51de,s=f.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',P='data-u51de-base-source-reveal-',clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const ctx=()=>{const c=make(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen:number,mask:number)=>{const p=select(ctx(),pen-1,mask-1);assert(p);return p}
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
  const values:Record<string,string>={display:'inline',transform:'none',filter:'none',clipPath:n.getAttribute('clip-path')??'none',opacity:'1',mixBlendMode:'normal',stroke:'none',fillOpacity:'1',fillRule:'nonzero',fill:'rgb(66, 85, 255)',visibility:n.getAttribute('visibility')??'visible'}
  for(const[k,v]of n.css)values[k]=v
  return {...values,getPropertyValue:(k:string)=>['x','y','width','height'].includes(k)&&n.localName==='rect'?(this.serializeGeometry?.(n.geometryValue(k))??n.geometryValue(k)):n.css.get(k)??(['mask-image','translate','rotate','scale'].includes(k)?'none':'')}
 }}
 createElementNS(_ns:string,name:string){return new N(name,this)}
}

function scene(pen:number,logical:number){
 const a=outlineSegmentProgress(s[pen-1],logical),doc=new D(),owner=new N('svg',doc),outer=new N('g',doc),frame='frame-'+logical;owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true');for(let i=0;i<16;i++){const n=new N('g',doc);n.setAttribute('data-outline-stroke',String(i+1));outer.append(n)}const slot=outer.children[pen-1],items=[]as {p:ReturnType<typeof policy>;g:N;ink:N;r:N;c:N;id:string;nodes:Parameters<typeof commit>[4];progress:number;prior:number}[];
 for(let i=0;i<s[pen-1].length;i++){const segment=s[pen-1][i],pol=select(ctx(),pen-1,i);if(pen===12&&i===2){buildHook(slot,doc,a[i],a[i-1],logical,frame,'test-'+(pen-1)+'-'+i);continue}if(!pol){if(a[i]<=0)continue;const ink=new N('path',doc);ink.setAttribute('d',segment.outline);if(a[i]===1)slot.append(ink);else{const g=new N('g',doc),d=new N('defs',doc),c=new N(segment.direction==='curve'?'mask':'clipPath',doc),shape=new N(segment.direction==='curve'?'path':'rect',doc),id='test-'+(pen-1)+'-'+i;slot.append(g);g.append(d);d.append(c);c.append(shape);g.append(ink);c.setAttribute('id',id);if(segment.direction==='curve'){for(const[k,v]of Object.entries({maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'}))c.setAttribute(k,v);for(const[k,v]of Object.entries({d:segment.revealPath!,fill:'none',stroke:'white','stroke-width':String(segment.revealWidth),'stroke-linecap':'round',pathLength:'1','stroke-dasharray':String(a[i])+' 2','stroke-dashoffset':'0'}))shape.setAttribute(k,v);ink.setAttribute('mask','url(#'+id+')')}else{ink.setAttribute('clip-path','url(#'+id+')');for(const[k,v]of Object.entries(outlineClip(segment,a[i])))shape.setAttribute(k,String(v))}}continue}
 const g=new N('g',doc),d=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-'+(pen-1)+'-'+i;slot.append(g);g.append(d);d.append(c);c.append(r);g.append(ink);g.setAttribute('data-stroke-start-gate',pol.id);g.setAttribute('data-stroke-reveal-policy',pol.kind);g.setAttribute('data-stroke-reveal-progress',String(a[i]));g.setAttribute(P+'clip',id);g.setAttribute(P+'fingerprint',pol.proofFingerprint);g.setAttribute(P+'prior-progress',String(i?a[i-1]:0));g.setAttribute(P+'logical-progress',String(logical));g.setAttribute(P+'frame',frame);c.setAttribute('id',id+'-u51de-base-source-reveal-clip');c.setAttribute('clipPathUnits','userSpaceOnUse');ink.setAttribute('d',segment.outline);ink.setAttribute('visibility','hidden');const amount=sample(pol,segment,a[i],i?a[i-1]:0,i?a[i-1]===1:false),shape=amount.clip??{x:pol.anchor[0],y:pol.anchor[1],width:0,height:0};for(const[k,v]of Object.entries(shape))r.setAttribute(k,String(v));if(a[i]!==1)ink.setAttribute('clip-path','url(#'+id+'-u51de-base-source-reveal-clip)');items.push({p:pol,g,ink,r,c,id,nodes:{group:g,ink,rect:r,clipPath:c}as unknown as Parameters<typeof commit>[4],progress:a[i],prior:i?a[i-1]:0})
 }return{doc,owner,outer,slot,items,frame,logical,a}
}

function buildHook(slot:N,doc:D,amount:number,prior:number,logical:number,frame:string,id:string){
 const pre='data-u51de-base-source-hook-',g=new N('g',doc),defs=new N('defs',doc),clip=new N('clipPath',doc),body=new N('rect',doc),up=new N('rect',doc),ink=new N('path',doc);slot.append(g);g.append(defs);defs.append(clip);clip.append(body);clip.append(up);g.append(ink);
 for(const[k,v]of Object.entries({'data-stroke-start-gate':'u51de-base-source-hook-12-3','data-stroke-reveal-policy':'source-body-then-up-u51de-base','data-stroke-reveal-progress':String(amount),[pre+'context']:'u51de-base-original-16-source-hook',[pre+'clip']:id,[pre+'fingerprint']:'e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e',[pre+'prior-progress']:String(prior),[pre+'logical-progress']:String(logical),[pre+'frame']:frame}))g.setAttribute(k,v);
 clip.setAttribute('id',id+'-u51de-base-source-hook-clip');clip.setAttribute('clipPathUnits','userSpaceOnUse');body.setAttribute('id',id+'-u51de-base-source-hook-body');up.setAttribute('id',id+'-u51de-base-source-hook-up');
 const lambda=31/56,t=Math.max(0,(amount-lambda)/(1-lambda));for(const[node,shape]of[[body,{x:75.5,y:60.5,width:18.5*Math.min(1,amount/lambda),height:6}],[up,{x:88,y:60.5-12.5*t,width:4,height:12.5*t}]]as const)for(const[k,v]of Object.entries(shape))node.setAttribute(k,String(v));ink.setAttribute('d',s[11][2].outline);if(amount!==1)ink.setAttribute('clip-path','url(#'+id+'-u51de-base-source-hook-clip)');
}

const runAll=(d:ReturnType<typeof scene>)=>d.items.map(m=>commit(m.p,m.p.segment,m.progress,m.id,m.nodes,m.prior,d.logical,d.frame))
function assertAll(d:ReturnType<typeof scene>){for(const v of runAll(d))assert.notEqual(v.status,'hidden',v.error??'')}
test('19 exact original-source axes; four held targets reject and all source inputs remain pinned/frozen',()=>{
 let count=0;for(let p=0;p<16;p++)for(let m=0;m<s[p].length;m++){const v=select(ctx(),p,m);assert.equal(!!v,!['3:2','6:2','10:2','12:3'].includes((p+1)+':'+(m+1)));if(v)count++}assert.equal(count,19);
 assert.equal(s.length,16);assert.equal(s.flat().length,23);assert.equal(s.flat().reduce((n,x)=>n+(x.outline.match(/M/g)||[]).length,0),39);
 for(const[path,pin]of Object.entries(INPUT_SHA))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),pin);
 for(const modify of[(v:typeof f)=>v.identity.root='u51de-k',(v:typeof f)=>v.strokes[1][1].weight+=1,(v:typeof f)=>v.fullProof.groups[0].polygons[0][0].x+=1]){
 const v=clone(f);modify(v);assert.equal(make(v.fullProof,v.identity,v.strokes as HanjaOutlineStrokes),null)}
 assert.equal(select({...ctx()},0,0),null);const p=policy(1,1);assert.throws(()=>sample({...p},p.segment,.5));assert.throws(()=>sample(p,{...p.segment,outline:p.segment.outline+' '},.5));assert(Object.isFrozen(s)&&Object.isFrozen(s[0][0]));
 assert.equal(META.nativeApproval,false);assert.equal(META.runtimeApplied,false);
})
test('source axis frames preserve p0 empty, p1 original and exact direction without guide rewrites',()=>{
 for(const t of META.targets){const p=policy(t.pen,t.mask);for(const amount of[0,Number.EPSILON,.25,.5,.999999,1]){
 const a=sample(p,p.segment,amount,p.priorRequired?1:0,p.priorRequired);assert.equal(a.visible,amount>0);assert.equal(a.originalPDirect,amount===1);assert.equal(a.outline,amount===0?null:p.segment.outline);assert.equal(a.sourceGuide,p.segment.revealPath);assert.equal(a.sourceWidth,p.segment.revealWidth);assert.equal(a.originalClockEquivalent,false);if(a.clip){assert(a.clip.width>=0&&a.clip.height>=0);const k=p.axis==='x'?'width':'height';assert(Math.abs(a.clip[k]-Math.abs(p.axisFinish-p.axisStart)*amount)<1e-12)}}
 assert.throws(()=>sample(p,p.segment,NaN));if(p.priorRequired){assert.throws(()=>sample(p,p.segment,.1,1,false));assert.throws(()=>sample(p,p.segment,.1,.99,true))}
 }
 assert.equal(policy(2,2).axis,'y');assert(policy(2,2).axisFinish<policy(2,2).axisStart);
})
test('all retained source groups commit through original-weight boundaries; prior1 DOM is actual same owner/frame',()=>{
 for(let pen=1;pen<=16;pen++){const total=s[pen-1].reduce((n,x)=>n+x.weight,0);let done=0;const amounts=[0,1e-8,.5,1];for(const seg of s[pen-1]){done+=seg.weight;const b=done/total;amounts.push(Math.max(0,b-1e-9),Math.min(1,b+1e-9))}for(const logical of amounts){const d=scene(pen,logical);assertAll(d);for(const m of d.items){assert.equal(m.ink.getAttribute('d'),m.p.segment.outline);assert.equal(m.ink.getAttribute('visibility'),m.progress>0?'visible':'hidden');if(m.progress===1){assert.equal(m.ink.getAttribute('clip-path'),null);assert.equal(m.g.children.length,2)}}}}
 for(const pen of[2,9,12]){const d=scene(pen,1);assertAll(d);const m=d.items.find(x=>x.p.mask===2)!;assert(priorDOM(m.p,m.g as unknown as SVGGElement,1,1,1,d.frame))}
})
test('current-frame source guards reject transform, foreign owner/doc, duplicated ink and forged progress',()=>{
 const changes=[(d:ReturnType<typeof scene>)=>d.items[0].g.setAttribute('transform','translate(1 0)'),(d:ReturnType<typeof scene>)=>d.items[0].g.setAttribute(P+'frame','old'),(d:ReturnType<typeof scene>)=>d.items[0].ink.setAttribute('d','M0 0Z'),(d:ReturnType<typeof scene>)=>d.items[0].g.append(new N('path',d.doc)),(d:ReturnType<typeof scene>)=>d.items[0].ink.ownerDocument=new D(),(d:ReturnType<typeof scene>)=>d.items[0].ink.ownerSVGElement=new N('svg',d.doc),(d:ReturnType<typeof scene>)=>d.items[0].g.setAttribute(P+'logical-progress','0.2'),(d:ReturnType<typeof scene>)=>d.items[0].ink.css.set('opacity','.5')];
 for(const change of changes){const d=scene(1,.5);change(d);assert.equal(runAll(d)[0].status,'hidden');assert.equal(d.items[0].ink.getAttribute('visibility'),'hidden')}
})
test('2m2 9m2 12m2 reject altered actual completed prior and same-frame retained peer state',()=>{
 for(const pen of[2,9,12])for(const change of[(d:ReturnType<typeof scene>)=>d.items[0].ink.css.set('opacity','0'),(d:ReturnType<typeof scene>)=>d.items[0].ink.setAttribute('clip-path','url(#fake)'),(d:ReturnType<typeof scene>)=>d.items[0].g.setAttribute(P+'frame','stale'),(d:ReturnType<typeof scene>)=>d.items[0].ink.setAttribute(P+'committed','false'),(d:ReturnType<typeof scene>)=>d.items[0].ink.setAttribute('d','M0 0Z')]){
 const d=scene(pen,1);assertAll(d);change(d);const m=d.items.find(v=>v.p.mask===2)!;assert.equal(commit(m.p,m.p.segment,m.progress,m.id,m.nodes,m.prior,d.logical,d.frame).status,'hidden');assert.equal(priorDOM(m.p,m.g as unknown as SVGGElement,1,1,1,d.frame),false)}
})
test('canonical geometry and visibility commit reject mid-read CSS/prior mutation; source ink never duplicates',()=>{
 const collapsed=scene(1,1e-12);collapsed.doc.canonicalBox=()=>({x:0,y:0,width:0,height:0});assertAll(collapsed);
 const css=scene(1,.5);css.doc.onStyleRead=n=>{if(n===css.items[0].r)n.style.setProperty('height','0px','important')};assert.equal(runAll(css)[0].status,'hidden');
 const d=scene(2,1);assertAll(d);const m=d.items[1];d.doc.onSet=(n,k,v)=>{if(n===m.ink&&k==='visibility'&&v==='visible')d.items[0].ink.css.set('opacity','0')};assert.equal(commit(m.p,m.p.segment,1,m.id,m.nodes,1,1,d.frame).status,'hidden');
 const extra=scene(1,.5);extra.slot.append(new N('path',extra.doc));assert.equal(runAll(extra)[0].status,'hidden');
})
test('successful completion is privately bound; same-owner cloned retained prior cannot forge approval',()=>{
 const d=scene(2,1);assertAll(d);const m=d.items[0];assert(completedDOM(m.p,m.g as unknown as SVGGElement,1,d.frame));
 const copy=(n:N):N=>{const q=new N(n.localName,n.ownerDocument);q.attrs=new Map(n.attrs);q.css=new Map(n.css);q.priorities=new Map(n.priorities);q.ownerSVGElement=n.ownerSVGElement;for(const child of n.children)q.append(copy(child));return q};
 const forged=copy(m.g);forged.parentNode=d.slot;d.slot.children[0]=forged;m.g.parentNode=null;
 assert.equal(completedDOM(m.p,forged as unknown as SVGGElement,1,d.frame),false);const next=d.items[1];assert.equal(priorDOM(next.p,next.g as unknown as SVGGElement,1,1,1,d.frame),false);assert.equal(commit(next.p,next.p.segment,1,next.id,next.nodes,1,1,d.frame).status,'hidden');
})
test('completed DOM guard rejects stale receipts, opacity mutations and cleanup revocation',()=>{
 for(const pen of[2,9,12]){const d=scene(pen,1);assertAll(d);const m=d.items[1];assert(completedDOM(m.p,m.g as unknown as SVGGElement,1,d.frame));assert.equal(completedDOM(m.p,m.g as unknown as SVGGElement,1,'stale'),false);m.ink.css.set('opacity','.5');assert.equal(completedDOM(m.p,m.g as unknown as SVGGElement,1,d.frame),false);m.ink.css.delete('opacity');const result=commit(m.p,m.p.segment,1,m.id,m.nodes,1,1,d.frame);assert.notEqual(result.status,'hidden');result.cleanup();assert.equal(completedDOM(m.p,m.g as unknown as SVGGElement,1,d.frame),false)}
})
