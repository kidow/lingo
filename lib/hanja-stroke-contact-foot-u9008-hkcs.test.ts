import test from 'node:test'
import assert from 'node:assert/strict'
import fixture from '../docs/hanja-source-original-u9008-hkcs-2026-10-27/fixtures-draft.json' with {type:'json'}
import {outlineSegmentProgress,type HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU9008HkcsSourceRevealContext,reviewedU9008HkcsSourceRevealPolicy,commitReviewedU9008HkcsSourceReveal as commitPrior} from './hanja-stroke-source-reveal-u9008-hkcs.ts'
import {makeReviewedU9008HkcsContactFootContext as make,reviewedU9008HkcsContactFootPolicy as select,sampleReviewedU9008HkcsContactFootFrame as sample,commitReviewedU9008HkcsContactFoot as commit,verifyReviewedU9008HkcsContactFootPriorDOM as priorDOM} from './hanja-stroke-contact-foot-u9008-hkcs.ts'
const f=fixture.u9008,s=f.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',P='data-u9008-hkcs-contact-foot-',Q='data-u9008-hkcs-source-reveal-',clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const context=()=>{const c=make(f.fullProof,f.identity,s);assert(c);return c},policy=()=>{const p=select(context(),9,1);assert(p);return p},sourceContext=()=>{const c=makeReviewedU9008HkcsSourceRevealContext(f.fullProof,f.identity,s);assert(c);return c}
class N{
 nodeType=1;namespaceURI=NS;isConnected=true;parentNode:N|null=null;children:N[]=[]
 ownerSVGElement:N|null=null;attrs=new Map<string,string>();css=new Map<string,string>();priorities=new Map<string,string>()
 style={setProperty:(k:string,v:string,priority='')=>{this.css.set(k,v);this.priorities.set(k,priority)},getPropertyValue:(k:string)=>this.css.get(k)??'',getPropertyPriority:(k:string)=>this.priorities.get(k)??''}
 getTotalLength(){this.ownerDocument.nativeReads++;this.ownerDocument.onNativeRead?.(this,'length');return 100}
 getPointAtLength(d:number){this.ownerDocument.nativeReads++;this.ownerDocument.onNativeRead?.(this,'point');const t=d/100,u=1-t;return{x:u*u*u*25.5+3*t*u*u*33.5+3*t*t*u*42+t*t*t*88,y:u*u*u*75+3*t*u*u*85+3*t*t*u*90+t*t*t*88}}
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
 nativeReads=0;onNativeRead:((n:N,kind:'length'|'point')=>void)|null=null
 onStyleRead:((n:N)=>void)|null=null;onSet:((n:N,k:string,v:string)=>void)|null=null
 globalGeometry:((n:N,k:string)=>string|null)|null=null;serializeGeometry:((value:string)=>string)|null=null
 canonicalBox:((b:Record<'x'|'y'|'width'|'height',number>)=>Record<'x'|'y'|'width'|'height',number>)|null=null
 defaultView={document:this,getComputedStyle:(n:N)=>{
  this.onStyleRead?.(n)
  const values:Record<string,string>={display:'inline',transform:'none',filter:'none',clipPath:n.getAttribute('clip-path')??'none',opacity:'1',mixBlendMode:'normal',stroke:'none',fillOpacity:'1',fillRule:'nonzero',fill:n.getAttribute('fill')==='none'?'none':n.getAttribute('fill')==='white'?'rgb(255, 255, 255)':'rgb(66, 85, 255)',visibility:n.getAttribute('visibility')??'visible'}
  for(const[k,v]of n.css)values[k]=v
  return {...values,getPropertyValue:(k:string)=>['x','y','width','height'].includes(k)&&n.localName==='rect'?(this.serializeGeometry?.(n.geometryValue(k))??n.geometryValue(k)):n.css.get(k)??(k==='mask-image'?(n.getAttribute('mask')??'none'):['translate','rotate','scale'].includes(k)?'none':'')}
 }}
 createElementNS(_ns:string,name:string){return new N(name,this)}
}


function scene(logical:number){
 const a=outlineSegmentProgress(s[9],logical),p=policy(),priorPolicy=reviewedU9008HkcsSourceRevealPolicy(sourceContext(),9,0)!,doc=new D(),owner=new N('svg',doc),outer=new N('g',doc),frame='frame-'+logical
 owner.setAttribute('viewBox','0 0 100 100');owner.append(outer);outer.setAttribute('data-stroke-outlines','true');for(let i=0;i<10;i++){const slot=new N('g',doc);slot.setAttribute('data-outline-stroke',String(i+1));outer.append(slot)}const slot=outer.children[9]
 const pg=new N('g',doc),pd=new N('defs',doc),pc=new N('clipPath',doc),pr=new N('rect',doc),pi=new N('path',doc),pid='unit-9-0';slot.append(pg);pg.append(pd);pd.append(pc);pc.append(pr);pg.append(pi)
 for(const[k,v]of Object.entries({'data-stroke-start-gate':priorPolicy.id,'data-stroke-reveal-policy':priorPolicy.kind,'data-stroke-reveal-progress':String(a[0]),[Q+'clip']:pid,[Q+'fingerprint']:priorPolicy.proofFingerprint,[Q+'prior-progress']:'0',[Q+'logical-progress']:String(logical),[Q+'frame']:frame}))pg.setAttribute(k,v)
 pc.setAttribute('id',pid+'-u9008-hkcs-source-reveal-clip');pc.setAttribute('clipPathUnits','userSpaceOnUse');pi.setAttribute('d',s[9][0].outline);pi.setAttribute('visibility','hidden')
 const g=new N('g',doc),defs=new N('defs',doc),ink=new N('path',doc),measurement=new N('path',doc),mask=new N('mask',doc),foot=new N('path',doc),body=new N('rect',doc),id='unit-9-1';slot.append(g);g.append(defs);defs.append(measurement);defs.append(mask);mask.append(foot);mask.append(body);g.append(ink)
 for(const[k,v]of Object.entries({'data-stroke-start-gate':p.id,'data-stroke-reveal-policy':p.kind,'data-stroke-reveal-progress':String(a[1]),[P+'context']:context().id,[P+'clip']:id,[P+'fingerprint']:p.proofFingerprint,[P+'prior-progress']:String(a[0]),[P+'logical-progress']:String(logical),[P+'frame']:frame}))g.setAttribute(k,v)
 measurement.setAttribute('id',id+'-u9008-foot-measure');measurement.setAttribute('d',s[9][1].revealPath!);measurement.setAttribute('fill','none');measurement.setAttribute('stroke','none');measurement.setAttribute('visibility','hidden')
 mask.setAttribute('id',id+'-u9008-foot-mask');for(const[k,v]of Object.entries({maskUnits:'userSpaceOnUse',maskContentUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'}))mask.setAttribute(k,v);mask.style.setProperty('mask-type','luminance')
 foot.setAttribute('id',id+'-u9008-foot-foot');foot.setAttribute('d','');foot.setAttribute('fill','white');foot.setAttribute('stroke','none');foot.setAttribute('fill-rule','nonzero');foot.setAttribute('visibility','hidden');body.setAttribute('id',id+'-u9008-foot-body');body.setAttribute('fill','white');body.setAttribute('stroke','none');body.setAttribute('fill-rule','nonzero');body.setAttribute('visibility','hidden');const b=s[9][1].bounds;for(const[k,v]of Object.entries({x:b[0],y:b[1],width:0,height:b[3]-b[1]}))body.setAttribute(k,String(v));ink.setAttribute('d',s[9][1].outline);ink.setAttribute('mask','url(#'+id+'-u9008-foot-mask)');ink.setAttribute('visibility','hidden')
 return{doc,owner,outer,slot,frame,logical,a,p,priorPolicy,pg,pi,pr,pc,pid,g,ink,foot,body,mask,measurement,id}
}
const prefix=(d:ReturnType<typeof scene>)=>commitPrior(d.priorPolicy,d.priorPolicy.segment,d.a[0],d.pid,{group:d.pg,ink:d.pi,rect:d.pr,clipPath:d.pc}as unknown as Parameters<typeof commitPrior>[4],0,d.logical,d.frame)
const run=(d:ReturnType<typeof scene>)=>commit(d.p,d.a[1],d.id,{group:d.g,ink:d.ink,foot:d.foot,body:d.body,mask:d.mask,measurement:d.measurement}as unknown as Parameters<typeof commit>[3],d.a[0],d.logical,d.frame)
const b=s[9][0].weight/s[9].reduce((n,m)=>n+m.weight,0),logical=(p:number)=>b+(1-b)*p
function pureSample(p:number){const pol=policy(),q=(p-pol.phaseShare)/(1-pol.phaseShare),L=100,t=q,u=1-t;return{sourceGuide:s[9][1].revealPath!,L,d:q*L,start:{x:25.5,y:75},end:{x:88,y:88},point:{x:u*u*u*25.5+3*t*u*u*33.5+3*t*t*u*42+t*t*t*88,y:u*u*u*75+3*t*u*u*85+3*t*t*u*90+t*t*t*88}}}
test('only exact source10m2 context and original C enter private contact-foot policy',()=>{for(let p=0;p<10;p++)for(let m=0;m<s[p].length;m++)assert.equal(!!select(context(),p,m),p===9&&m===1);const changed=clone(s);changed[9][1].revealPath+=' ';assert.equal(make(f.fullProof,f.identity,changed),null);assert.equal(select({...context()},9,1),null);assert.throws(()=>sample({...policy()},.001));assert.equal(s[9][1].revealWidth,14)})
test('two-triangle foot and original-C body keep exact phase boundaries and full source direct',()=>{const p=policy();for(const q of[0,1e-6,p.phaseShare/2,p.phaseShare,1]){const f=sample(p,q);assert.equal(f.originalClockEquivalent,false);assert.equal(f.originalPDirect,q===1);assert.equal(f.phase,q===0?'empty':q===1?'full':'foot')}const fullFoot=sample(p,p.phaseShare);assert.equal(fullFoot.footFullTriangles,2);const body=sample(p,.5,pureSample(.5));assert.equal(body.phase,'body');assert(body.bodyRect&&body.threshold>p.cut&&body.threshold<p.maxX);assert.throws(()=>sample(p,.5,{...pureSample(.5),sourceGuide:'M0 0C1 1 2 2 3 3'}));assert.throws(()=>sample(p,.5,{...pureSample(.5),d:1}))})
test('real source-prefix5 commit precedes foot commit across original and internal boundaries',()=>{const p=policy();for(const x of[0,b/2,b-1e-10,b,b+1e-10,logical(1e-6),logical(p.phaseShare-1e-10),logical(p.phaseShare),logical(p.phaseShare+1e-10),logical(.5),1]){const d=scene(x),one=prefix(d);assert.notEqual(one.status,'hidden',one.error??'');const two=run(d);assert.notEqual(two.status,'hidden',two.error??'');assert.equal(d.ink.getAttribute('d'),s[9][1].outline);assert.equal(d.g.children.filter(n=>n.localName==='path').length,1);if(d.a[1]>0)assert.equal(priorDOM(d.p,d.a[1],1,d.logical,d.frame,d.g as unknown as SVGGElement),true);if(x===1)assert.equal(d.ink.getAttribute('mask'),null)}})
test('same-frame actual opaque prior is required; metadata alone or a stale frame fails closed',()=>{for(const mutate of[(d:ReturnType<typeof scene>)=>d.pi.css.set('opacity','0'),(d:ReturnType<typeof scene>)=>d.pi.setAttribute('clip-path','url(#wrong)'),(d:ReturnType<typeof scene>)=>d.pi.setAttribute('d','M0 0Z'),(d:ReturnType<typeof scene>)=>d.pi.setAttribute(Q+'committed','false'),(d:ReturnType<typeof scene>)=>d.pg.setAttribute(Q+'frame','stale')]){const d=scene(logical(.5));assert.notEqual(prefix(d).status,'hidden');mutate(d);assert.equal(run(d).status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden')}})
test('original C native measurement and current auxiliary source mask cannot be changed',()=>{const d=scene(logical(.5));prefix(d);d.doc.onNativeRead=n=>{if(n===d.measurement)n.setAttribute('d','M0 0C1 1 2 2 3 3')};assert.equal(run(d).status,'hidden');const e=scene(logical(.5));prefix(e);e.mask.setAttribute('width','200');assert.equal(run(e).status,'hidden');const f=scene(logical(.5));prefix(f);f.doc.onStyleRead=n=>{if(n===f.body)n.style.setProperty('width','0px','important')};assert.equal(run(f).status,'hidden')})
test('empty computed d is legal; final visibility mutation rechecks prior opacity',()=>{const zero=scene(0);prefix(zero);zero.foot.css.set('d','none');assert.notEqual(run(zero).status,'hidden');const d=scene(logical(.5));prefix(d);d.doc.onSet=(n,k,v)=>{if(n===d.ink&&k==='visibility'&&v==='visible')d.pi.css.set('opacity','0')};assert.equal(run(d).status,'hidden');assert.equal(d.ink.getAttribute('visibility'),'hidden')})
test('five-policy projection accepts only the exact six-policy peer contract before commit',()=>{for(const mutate of[(d:ReturnType<typeof scene>)=>d.g.setAttribute(P+'context','other-source'),(d:ReturnType<typeof scene>)=>d.g.setAttribute(P+'fingerprint','wrong'),(d:ReturnType<typeof scene>)=>d.g.setAttribute(P+'frame','old'),(d:ReturnType<typeof scene>)=>d.g.setAttribute('data-stroke-reveal-progress','0'),(d:ReturnType<typeof scene>)=>d.measurement.setAttribute('d','M0 0C1 1 2 2 3 3'),(d:ReturnType<typeof scene>)=>d.mask.setAttribute('id','other-mask')]){const d=scene(logical(.5));mutate(d);assert.equal(prefix(d).status,'hidden')}})
