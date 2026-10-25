import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU846fHkcsSourceContext,reviewedU846fHkcsContext,reviewedU846fHkcsPolicy,commitReviewedU846fHkcsCaps,measureReviewedU846fHkcsFrame,REVIEWED_U846F_HKCS_SOURCE} from './hanja-stroke-start-caps-u846f-hkcs.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u846f-hkcs-2026-10-25/fixtures.json',import.meta.url),'utf8')).hkcs_m846f
const clone=<T>(v:T):T=>JSON.parse(JSON.stringify(v))
test('葯 whole actualfull5 context selects only six independent Q and exact prior-H12m2',()=>{
 const c=makeReviewedU846fHkcsSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(c);assert.equal(c,reviewedU846fHkcsContext(f.strokes))
 const targets=[[5,1],[6,1],[7,1],[9,1],[10,1],[11,1],[12,2]]
 for(let p=0;p<f.strokes.length;p++)for(let m=0;m<f.strokes[p].length;m++){const q=reviewedU846fHkcsPolicy(c,p,m);assert.equal(!!q,targets.some(([a,b])=>a===p+1&&b===m+1));if(q){assert.deepEqual(q.segment,f.strokes[p][m]);assert.equal(q.certificate.initialArcMax,7);assert.equal(q.certificate.T,'1/2');assert.equal(q.certificate.K,'1/20')}}
 assert.deepEqual(Object.keys(f.fullProof),['engineRevision','engineHashes','groups','trace','defaults']);assert.equal(REVIEWED_U846F_HKCS_SOURCE.nativeApproval,false)
 const foreign=clone(f.identity);foreign.sourceRoot='u846f-k';assert.equal(makeReviewedU846fHkcsSourceContext(f.fullProof,foreign,f.strokes),null)
 const getter=clone(f.fullProof);Object.defineProperty(getter,'trace',{enumerable:true,get(){throw Error('must not read')}});assert.equal(makeReviewedU846fHkcsSourceContext(getter,f.identity,f.strokes),null)
 for(const key of['outline','revealPath','revealWidth','weight']){const a=clone(f.strokes);a[4][0][key]=typeof a[4][0][key]==='number'?a[4][0][key]+1:a[4][0][key]+' ';assert.equal(reviewedU846fHkcsContext(a),null)}
 const off=clone(f.strokes);off[0][0].weight++;assert.equal(reviewedU846fHkcsContext(off),null)
})
test('葯 empty/full Q7 API preserves source and actual measured partial radius',()=>{
 const c=reviewedU846fHkcsContext(f.strokes),empty={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const pen of[5,6,7,9,10,11]){const q=reviewedU846fHkcsPolicy(c,pen-1,0)!;assert.equal(commitReviewedU846fHkcsCaps(q,q.segment,0,'own',empty).status,'empty');assert.equal(commitReviewedU846fHkcsCaps(q,q.segment,1,'own',empty).status,'complete');assert.equal(commitReviewedU846fHkcsCaps({...q},q.segment,.5,'own',empty).status,'hidden')}
 const conditional=reviewedU846fHkcsPolicy(c,11,1)!;assert.equal(commitReviewedU846fHkcsCaps(conditional,conditional.segment,1,'own',empty,1).status,'hidden')
 const policy=reviewedU846fHkcsPolicy(c,4,0)!,q0=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 const style={transform:'none',getPropertyValue:()=> 'none'}
 const doc:any={defaultView:null};doc.defaultView={document:doc,getComputedStyle:()=>style}
 const owner:any={namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerDocument:doc,parentElement:null,getAttribute:()=>null}
 const group:any={namespaceURI:owner.namespaceURI,isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:owner,getAttribute:(k:string)=>k==='data-stroke-start-gate'?policy.id:k==='data-u846f-hkcs-progress'?'.5':null}
 const defs:any={namespaceURI:owner.namespaceURI,isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:group,localName:'defs',getAttribute:()=>null};group.localName='g'
 const guide:any={namespaceURI:owner.namespaceURI,isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:defs,getAttribute:(k:string)=>k==='d'?policy.segment.revealPath:k==='data-u846f-hkcs-measurement'?'true':null,getTotalLength:()=>40,getPointAtLength:()=>({x:q0[0]+1,y:q0[1]+1})}
 group.getAttribute=(k:string)=>k==='data-stroke-start-gate'?policy.id:k==='data-u846f-hkcs-progress'?'0.5':null
 const frame=measureReviewedU846fHkcsFrame(policy,policy.segment,.5,guide);assert.equal(frame.rho,7);assert.equal(frame.d,20);assert.equal(frame.L,40)
 guide.getTotalLength=()=>{group.parentElement=null;return 40};assert.throws(()=>measureReviewedU846fHkcsFrame(policy,policy.segment,.5,guide))
})
test('葯12m2 conditional completion needs actual opaque direct original H',()=>{
 const c=reviewedU846fHkcsContext(f.strokes),q=reviewedU846fHkcsPolicy(c,11,1)!
 const doc:any={defaultView:null};class N{localName:string;namespaceURI='http://www.w3.org/2000/svg';isConnected=true;ownerDocument=doc;ownerSVGElement:N|null=null;parentElement:N|null=null;children:N[]=[];attrs=new Map<string,string>();style:Record<string,string>={};constructor(name:string){this.localName=name}getAttribute(k:string){return this.attrs.get(k)??null}setAttribute(k:string,v:string){this.attrs.set(k,v)}removeAttribute(k:string){this.attrs.delete(k)}get previousElementSibling():N|null{return this.parentElement?.children[this.parentElement.children.indexOf(this)-1]??null}get nextElementSibling():N|null{return this.parentElement?.children[this.parentElement.children.indexOf(this)+1]??null}}
 const view:any={document:doc,getComputedStyle:(n:N)=>({transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'rgb(0, 0, 0)',fillRule:'nonzero',strokeDasharray:'none',...n.style,getPropertyValue:(k:string)=>n.style[k]??'none'})};doc.defaultView=view
 function nodes(){const owner=new N('svg'),pen=new N('g'),h=new N('path'),g=new N('g'),third=new N('g'),ink=new N('path');owner.children=[pen];pen.parentElement=owner;pen.children=[h,g,third];for(const n of[h,g,third])n.parentElement=pen;g.children=[ink];ink.parentElement=g;for(const n of[pen,h,g,third,ink])n.ownerSVGElement=owner;h.attrs.set('d',q.previousSegment!.outline);pen.attrs.set('data-outline-stroke','12');g.attrs.set('data-stroke-start-gate',q.id);g.attrs.set('data-stroke-reveal-policy',q.kind);ink.attrs.set('d',q.segment.outline);return{owner,pen,h,g,third,ink}}
 const run=(n:ReturnType<typeof nodes>,previous=1)=>commitReviewedU846fHkcsCaps(q,q.segment,1,'own',{measurement:null,guide:null,startCap:null,endCap:null,ink:n.ink as unknown as SVGPathElement},previous).status
 assert.equal(run(nodes()),'complete');assert.equal(run(nodes(),.99999999),'hidden')
 for(const mutate of[(n:ReturnType<typeof nodes>)=>n.h.attrs.set('d','M0 0'),(n:ReturnType<typeof nodes>)=>n.h.attrs.set('clip-path','url(#partial)'),(n:ReturnType<typeof nodes>)=>n.h.attrs.set('mask','url(#partial)'),(n:ReturnType<typeof nodes>)=>n.h.style.visibility='hidden',(n:ReturnType<typeof nodes>)=>n.h.style.opacity='.5',(n:ReturnType<typeof nodes>)=>n.h.style.fill='rgba(0, 0, 0, 0)',(n:ReturnType<typeof nodes>)=>n.h.style.fill='color(srgb 0 0 0 / 0)',(n:ReturnType<typeof nodes>)=>n.h.style.fillRule='evenodd',(n:ReturnType<typeof nodes>)=>n.pen.style.transform='scale(2)',(n:ReturnType<typeof nodes>)=>n.h.ownerSVGElement=new N('svg'),(n:ReturnType<typeof nodes>)=>n.pen.children.reverse()]){const n=nodes();mutate(n);assert.equal(run(n),'hidden')}
})
