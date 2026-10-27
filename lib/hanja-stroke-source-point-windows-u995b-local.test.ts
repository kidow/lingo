import test from 'node:test'
import assert from 'node:assert/strict'
import fixture from '../docs/hanja-source-original-u995b-local-2026-10-27/fixtures-draft.json' with {type:'json'}
import {outlineSegmentProgress,outlineClip,type HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU995bLocalPointWindowContext as make,reviewedU995bLocalPointWindowPolicy as select,sampleReviewedU995bLocalPointWindowFrame as sample,commitReviewedU995bLocalPointWindow as commit,verifyReviewedU995bLocalPointWindowPriorDOM as priorDOM} from './hanja-stroke-source-point-windows-u995b-local.ts'
const f=fixture.u995b,s=f.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',P='data-u995b-local-source-window-',clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const ctx=()=>{const c=make(f.fullProof,f.identity,s);assert(c);return c}
const policy=(pen:number,mask:number)=>{const p=select(ctx(),pen-1,mask-1);assert(p);return p}
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

function scene(pen:15|19,logical:number){
 const a=outlineSegmentProgress(s[pen-1],logical),doc=new D(),owner=new N('svg',doc),outer=new N('g',doc),frame='frame-'+logical;owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true');for(let i=0;i<23;i++){const n=new N('g',doc);n.setAttribute('data-outline-stroke',String(i+1));outer.append(n)}const slot=outer.children[pen-1],items=[]as {p:ReturnType<typeof policy>;g:N;ink:N;r:N;c:N;id:string;nodes:Parameters<typeof commit>[4];progress:number;prior:number}[];
 for(let i=0;i<2;i++){const pol=select(ctx(),pen-1,i);if(!pol){if(a[i]<=0)continue;const ink=new N('path',doc);ink.setAttribute('d',s[pen-1][i].outline);if(a[i]===1)slot.append(ink);else{const g=new N('g',doc),d=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),id='test-'+(pen-1)+'-'+i;slot.append(g);g.append(d);d.append(c);c.append(r);g.append(ink);c.setAttribute('id',id);ink.setAttribute('clip-path','url(#'+id+')');for(const[k,v]of Object.entries(outlineClip(s[pen-1][i],a[i])))r.setAttribute(k,String(v))}continue}
 const g=new N('g',doc),d=new N('defs',doc),c=new N('clipPath',doc),r=new N('rect',doc),ink=new N('path',doc),id='test-'+(pen-1)+'-'+i;slot.append(g);g.append(d);d.append(c);c.append(r);g.append(ink);g.setAttribute('data-stroke-start-gate',pol.id);g.setAttribute('data-stroke-reveal-policy',pol.kind);g.setAttribute('data-stroke-reveal-progress',String(a[i]));g.setAttribute(P+'clip',id);g.setAttribute(P+'fingerprint',pol.proofFingerprint);g.setAttribute(P+'prior-progress',String(i?a[0]:0));g.setAttribute(P+'logical-progress',String(logical));g.setAttribute(P+'frame',frame);c.setAttribute('id',id+'-u995b-local-source-window-clip');c.setAttribute('clipPathUnits','userSpaceOnUse');ink.setAttribute('d',s[pen-1][i].outline);ink.setAttribute('visibility','hidden');items.push({p:pol,g,ink,r,c,id,nodes:{group:g,ink,rect:r,clipPath:c}as unknown as Parameters<typeof commit>[4],progress:a[i],prior:i?a[0]:0})
 }return{doc,owner,outer,slot,items,frame,logical,a}
}
const run=(d:ReturnType<typeof scene>,i:number)=>{const m=d.items[i];return commit(m.p,m.p.segment,m.progress,m.id,m.nodes,m.prior,d.logical,d.frame)}
test('only15m2 and19m1/m2 policies bind exact23 source; source19 is twoQ, not wholeY',()=>{for(let p=0;p<23;p++)for(let m=0;m<s[p].length;m++)assert.equal(!!select(ctx(),p,m),p===14&&m===1||p===18);assert.equal(policy(19,1).kind,'source-mask-y-prefix-u995b-local');assert.equal(policy(19,2).kind,'source-point-window-u995b-local');assert(s[18].every(m=>m.revealPath?.includes(' Q')));const changed=clone(s);changed[18][1].outline+=' ';assert.equal(make(f.fullProof,f.identity,changed),null);assert.equal(select({...ctx()},18,1),null)})
test('point anchors derive from originalQ source dyadics and preserve original guide/width/weights',()=>{for(const[pen,mask]of[[15,2],[19,2]]){const p=policy(pen,mask),v=p.segment.revealPath!.match(/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g)!.map(Number),t=p.sourceT;assert.deepEqual(p.anchor,[0,1].map(k=>(1-t)**2*v[k]+2*t*(1-t)*v[k+2]+t*t*v[k+4]));const a=sample(p,p.segment,.5,1,true);assert.equal(a.sourceGuide,p.segment.revealPath);assert.equal(a.sourceWidth,14);assert.equal(a.originalClockEquivalent,false);assert.throws(()=>sample({...p},p.segment,.5,1,true))}})
test('15 genericH zero/partial/full projection and actual opaque completed prior',()=>{const masks=s[14],b=masks[0].weight/(masks[0].weight+masks[1].weight);for(const logical of[0,b/2,b-1e-10,b,b+1e-10,b+(1-b)*.5,1]){const d=scene(15,logical),r=run(d,0);assert.notEqual(r.status,'hidden',r.error??'');assert.equal(d.items[0].ink.getAttribute('visibility'),d.a[1]>0?'visible':'hidden')}const bad=scene(15,b+(1-b)*.5);bad.slot.children[0].css.set('opacity','0');assert.equal(run(bad,0).status,'hidden')})
test('19mask1 sourceY then pointmask2 require actual completed prefix group in same frame',()=>{const masks=s[18],b=masks[0].weight/(masks[0].weight+masks[1].weight);for(const logical of[0,1e-6,.25,b-1e-10,b,b+1e-10,b+(1-b)*.5,1]){const d=scene(19,logical),one=run(d,0),two=run(d,1);assert.notEqual(one.status,'hidden',one.error??'');assert.notEqual(two.status,'hidden',two.error??'');assert.equal(d.items[0].ink.getAttribute('d'),s[18][0].outline);assert.equal(d.items[1].ink.getAttribute('d'),s[18][1].outline);if(d.a[1]>0)assert.equal(priorDOM(d.items[1].p,d.items[1].g as unknown as SVGGElement,d.a[1],1,logical,d.frame),true)}})
test('19 stale/full-prefix metadata alone never replaces actual opaque original priorP',()=>{const masks=s[18],b=masks[0].weight/(masks[0].weight+masks[1].weight),logical=b+(1-b)*.5;for(const mutate of[(d:ReturnType<typeof scene>)=>d.items[0].ink.css.set('opacity','0'),(d:ReturnType<typeof scene>)=>d.items[0].ink.setAttribute('clip-path','url(#fake)'),(d:ReturnType<typeof scene>)=>d.items[0].g.setAttribute(P+'frame','stale'),(d:ReturnType<typeof scene>)=>d.items[0].ink.setAttribute('d','M0 0Z'),(d:ReturnType<typeof scene>)=>d.items[0].ink.setAttribute(P+'committed','false')]){const d=scene(19,logical);assert.notEqual(run(d,0).status,'hidden');mutate(d);assert.equal(run(d,1).status,'hidden')}})
test('point prior is checked again during final visibility and canonical geometry fails closed',()=>{const masks=s[18],b=masks[0].weight/(masks[0].weight+masks[1].weight),d=scene(19,b+(1-b)*.5);run(d,0);d.doc.onSet=(n,k,v)=>{if(n===d.items[1].ink&&k==='visibility'&&v==='visible')d.items[0].ink.css.set('opacity','0')};assert.equal(run(d,1).status,'hidden');const e=scene(19,b+(1-b)*.5);run(e,0);e.items[1].r.css.set('width','0px');assert.equal(run(e,1).status,'hidden')})
