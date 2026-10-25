import assert from 'node:assert/strict'
import test from 'node:test'

import {makeReviewedU5aa4GCardinalSourceContext,reviewedU5aa4GCardinalPolicy,sampleReviewedU5aa4GCardinalFrame,verifyReviewedU5aa4GCardinalPrior} from './hanja-stroke-cardinal-contact-u5aa4-g.ts'
test('媤 field H/V band uses exact source bounds and actual opaque original H',()=>{
 const c=makeReviewedU5aa4GCardinalSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(c)
 const q=reviewedU5aa4GCardinalPolicy(c,4,1)!;assert.ok(q)
 for(const p of[0,Number.EPSILON,1e-10,.01,.5,.99999999,1]){const r=sampleReviewedU5aa4GCardinalFrame(q,q.segment,p,1);assert.equal(r.UARead,false);assert.equal(r.originalPDirect,p===1);if(p>0&&p<1){assert(r.clip);assert.equal(r.clip.y,12.5-3.5*p);assert.equal(r.clip.height,43.5*p)}else assert.equal(r.clip,null)}
 assert.throws(()=>sampleReviewedU5aa4GCardinalFrame(q,q.segment,.1,.999));assert.throws(()=>sampleReviewedU5aa4GCardinalFrame({...q},q.segment,.1,1))
 const make=()=>dom({pen:q.pen,mask:q.mask,penMaskCount:2,id:q.id,kind:q.kind,previousMaskKind:'plain-cardinal',previousSegment:q.predecessor}as unknown as NonNullable<ReturnType<typeof reviewedU5aa4GPrefixPolicy>>)
 const n=make();assert.equal(verifyReviewedU5aa4GCardinalPrior(q,n.g as unknown as SVGGElement,1),true);assert.equal(verifyReviewedU5aa4GCardinalPrior(q,n.g as unknown as SVGGElement,.999),false)
 n.prev.attrs.set('d',q.predecessor.outline+' ');assert.equal(verifyReviewedU5aa4GCardinalPrior(q,n.g as unknown as SVGGElement,1),false)
 const faded=make();faded.prev.style.opacity='.5';assert.equal(verifyReviewedU5aa4GCardinalPrior(q,faded.g as unknown as SVGGElement,1),false)
})
import {readFileSync} from 'node:fs'
import {makeReviewedU5aa4GSourceContext,reviewedU5aa4GContext,reviewedU5aa4GPolicy,measureReviewedU5aa4GFrame,commitReviewedU5aa4GCaps,verifyReviewedU5aa4GCapsPrior} from './hanja-stroke-start-caps-u5aa4-g.ts'
import {makeReviewedU5aa4GPrefixSourceContext,reviewedU5aa4GPrefixPolicy,sampleReviewedU5aa4GPrefixFrame,verifyReviewedU5aa4GPrefixPrior} from './hanja-stroke-source-prefix-u5aa4-g.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u5aa4-g-2026-10-25/fixtures.json',import.meta.url),'utf8')).u5aa4_g
const clone=<T>(x:T):T=>JSON.parse(JSON.stringify(x))
const targets=[[1,1],[2,1],[9,1],[11,1],[12,1]]
function measurement(policy:NonNullable<ReturnType<typeof reviewedU5aa4GPolicy>>,progress:number){
 const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'}
 const doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
 const node=(localName:string,attributes:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(k:string)=>attributes[k]??null,setAttribute:(k:string,v:string)=>{attributes[k]=v},removeAttribute:(k:string)=>{delete attributes[k]}})
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(policy.pen)}),g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind,'data-u5aa4g-progress':String(progress)}),defs=node('defs')
 const [x,y]=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 const guide=Object.assign(node('path',{d:policy.segment.revealPath!,'data-u5aa4g-measurement':'true'}),{getTotalLength:()=>100,getPointAtLength:(d:number)=>({x:x+d,y})})
 for(const n of [pen,g,defs,guide])n.ownerSVGElement=owner
 pen.parentElement=owner;g.parentElement=pen;defs.parentElement=g;guide.parentElement=defs;owner.children=[pen];g.children=[defs];defs.children=[guide]
 const prev=node('path',{d:policy.previousSegment?.outline??''});prev.ownerSVGElement=owner;prev.parentElement=pen;prev.nextElementSibling=g;g.previousElementSibling=prev;pen.children=policy.mask===2?[prev,g,node('g'),node('g')]:[g]
 const ink=node('path');ink.parentElement=g
 return {guide:guide as unknown as SVGPathElement,g:g as unknown as SVGGElement,prev,style,nodes:{measurement:null,guide:null,startCap:null,endCap:null,ink:ink as unknown as SVGPathElement}}
}

test('媤 five independent source caps grow from zero',()=>{
 const ctx=makeReviewedU5aa4GSourceContext(f.fullProof,f.identity,f.strokes)!
 for(const[p,m]of targets){const q=reviewedU5aa4GPolicy(ctx,p-1,m-1)!
  for(const t of [Number.EPSILON,1e-15,1e-10,.01,.5,.99999999]){
   const d=measurement(q,t),frame=measureReviewedU5aa4GFrame(q,q.segment,t,d.guide,m===2?1:0)
   assert.equal(frame.d,t*100);assert.equal(frame.rho,Math.min(7,t*100))
   if(m===2){assert.equal(verifyReviewedU5aa4GCapsPrior(q,d.g,1),true);assert.equal(verifyReviewedU5aa4GCapsPrior(q,d.g,.999),false);d.prev.setAttribute('d',q.previousSegment!.outline+' ');assert.equal(verifyReviewedU5aa4GCapsPrior(q,d.g,1),false)}
  }
 }
})
test('媤 exact full5 and original sixteen masks select only five own-source caps',()=>{
 const ctx=makeReviewedU5aa4GSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(ctx)
 assert.equal(ctx,reviewedU5aa4GContext(f.strokes))
 for(let p=0;p<12;p++)for(let m=0;m<f.strokes[p].length;m++){const policy=reviewedU5aa4GPolicy(ctx,p,m);assert.equal(!!policy,targets.some(([a,b])=>a===p+1&&b===m+1));if(policy){assert.deepEqual(policy.segment,f.strokes[p][m]);assert.equal(policy.certificate.syntax,p===0?'ML':'MQ');assert.equal(policy.certificate.initialArcMax,7)}}
 const badIdentity=clone(f.identity);badIdentity.sourceRoot='u4e77-j';assert.equal(makeReviewedU5aa4GSourceContext(f.fullProof,badIdentity,f.strokes),null)
 const badProof=clone(f.fullProof);badProof.groups[0].polygons[0][0].x+=.001;assert.equal(makeReviewedU5aa4GSourceContext(badProof,f.identity,f.strokes),null)
 const getter=clone(f.fullProof);Object.defineProperty(getter,'trace',{enumerable:true,get(){throw Error('getter must not run')}});assert.equal(makeReviewedU5aa4GSourceContext(getter,f.identity,f.strokes),null)
 for(const [p,m]of [[0,1],[9,1],[9,2]])for(const field of ['outline','weight','revealPath','revealWidth']){const s=clone(f.strokes);if(!(field in s[p][m]))continue;s[p][m][field]=typeof s[p][m][field]==='number'?s[p][m][field]+.001:s[p][m][field]+' ';assert.equal(reviewedU5aa4GContext(s),null)}
})
test('媤 exact source prefixes are nested, empty at zero and restore original full endpoint',()=>{
 const ctx=makeReviewedU5aa4GPrefixSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(ctx)
 for(const[p,m,axis]of [[1,2,'down'],[10,2,'down'],[10,3,'right']]as const){
  const policy:NonNullable<ReturnType<typeof reviewedU5aa4GPrefixPolicy>>=reviewedU5aa4GPrefixPolicy(ctx,p-1,m-1)!;assert.ok(policy);assert.equal(policy.axis,axis)
  const s=f.strokes[p-1][m-1],[x,y,right,bottom]=s.bounds
  let lastArea=-1
  for(const t of [0,Number.EPSILON,1e-15,1e-10,.01,.5,.99999999,1]){
   const a=sampleReviewedU5aa4GPrefixFrame(policy,s,t,1),c=a.clip
   assert.equal(a.visible,t>0);assert.equal(a.originalPDirect,t===1);assert.equal(a.UARead,false);assert.equal(a.sourceClockSuitabilityClaimed,false)
   const area=c.width*c.height;assert(area>=lastArea);lastArea=area
   const expectedArea=(right-x)*(bottom-y)*t;assert(Math.abs(area-expectedArea)<=Number.EPSILON*4*Math.max(area,expectedArea,Number.MIN_VALUE))
   assert.deepEqual(c,axis==='down'?{x,y,width:right-x,height:(bottom-y)*t}:{x,y,width:(right-x)*t,height:bottom-y})
  }
  assert.throws(()=>sampleReviewedU5aa4GPrefixFrame({...policy},s,.1,1))
  assert.throws(()=>sampleReviewedU5aa4GPrefixFrame(policy,{...s,weight:s.weight+.01},.1,1))
  assert.throws(()=>sampleReviewedU5aa4GPrefixFrame(policy,s,.1,.9999999))
  for(const t of [-1,NaN,Infinity,1.1])assert.throws(()=>sampleReviewedU5aa4GPrefixFrame(policy,s,t,1))
  assert.equal(verifyReviewedU5aa4GPrefixPrior(policy,null,1),false)
 }
 assert.equal(reviewedU5aa4GPrefixPolicy({id:'u5aa4g-five-initial-guides'},2,1),null)
})
class Stub{
 attrs=new Map<string,string>();children:Stub[]=[];parentElement:Stub|null=null;ownerSVGElement:Stub|null=null;isConnected=true
 namespaceURI='http://www.w3.org/2000/svg';style:Record<string,string>={};ownerDocument:any;localName:string
 constructor(name:string,doc:any){this.localName=name;this.ownerDocument=doc}
 getAttribute(k:string){return this.attrs.get(k)??null}
 get previousElementSibling():Stub|null{return this.parentElement?.children[this.parentElement.children.indexOf(this)-1]??null}
 get nextElementSibling():Stub|null{return this.parentElement?.children[this.parentElement.children.indexOf(this)+1]??null}
 contains(n:Stub):boolean{return this.children.includes(n)||this.children.some(c=>c.contains(n))}
}
function dom(q:NonNullable<ReturnType<typeof reviewedU5aa4GPrefixPolicy>>){
 let all:Stub[]=[];const doc:any={defaultView:null,getElementById:(id:string)=>all.find(n=>n.attrs.get('id')===id)??null}
 const view:any={document:doc,getComputedStyle:(n:Stub)=>({transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:n.attrs.get('fill')==='none'?'white':'none',fill:n.attrs.get('fill')??'black',fillRule:'nonzero',strokeWidth:'14',strokeLinecap:'round',strokeLinejoin:'miter',strokeOpacity:'1',strokeDashoffset:'0',strokeDasharray:n.attrs.get('fill')==='none'?'1px, 2px':'none',...n.style,getPropertyValue:(k:string)=>n.style[k]??(k==='mask-image'&&n.attrs.has('mask')?n.attrs.get('mask')!:'none')})};doc.defaultView=view
 const node=(n:string)=>{const r=new Stub(n,doc);all.push(r);return r}
 const prefix=q.previousMaskKind.startsWith('source-prefix-'),plain=q.previousMaskKind==='plain-cardinal',caps=!prefix&&!plain
 const owner=node('svg'),pen=node('g'),g=node('g'),prev=node(plain?'path':'g'),ink=plain?prev:node('path'),defs=node('defs'),mask=node('mask'),guide=node('path')
 const attach=(p:Stub,cs:Stub[])=>{p.children=cs;for(const c of cs)c.parentElement=p}
 attach(owner,[pen]);const siblings=Array.from({length:q.penMaskCount},()=>node('g'));siblings[q.mask-2]=prev;siblings[q.mask-1]=g;attach(pen,siblings)
 if(!plain)attach(prev,caps?[defs,ink]:[ink]);if(caps){attach(defs,[mask]);attach(mask,[guide])}
 for(const n of all)if(n!==owner)n.ownerSVGElement=owner
 pen.attrs.set('data-outline-stroke',String(q.pen));g.attrs.set('data-stroke-start-gate',q.id);g.attrs.set('data-stroke-reveal-policy',q.kind)
 if(!plain){prev.attrs.set('data-stroke-start-gate',prefix?'u5aa4g-source-prefix-'+q.pen+'-'+(q.mask-1):'u5aa4g-'+q.pen+'-'+(q.mask-1));prev.attrs.set('data-stroke-reveal-policy',q.previousMaskKind);prev.attrs.set('data-stroke-reveal-progress','1')}
 ink.attrs.set('d',q.previousSegment.outline)
 if(!plain){ink.attrs.set('data-u5aa4g-full-committed','true');ink.attrs.set(prefix?'data-u5aa4g-full-original-prefix':'data-u5aa4g-full-original-q-tube','true')}
 if(caps){
  ink.attrs.set('mask','url(#full)');for(const[k,v]of Object.entries({id:'full',maskUnits:'userSpaceOnUse',maskContentUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'}))mask.attrs.set(k,v)
  for(const[k,v]of Object.entries({d:q.previousSegment.revealPath!,fill:'none',stroke:'white','stroke-width':'14','stroke-linecap':'round','stroke-linejoin':'miter',pathLength:'1','stroke-dasharray':'1 2','stroke-dashoffset':'0'}))guide.attrs.set(k,v)
 }
 return{g,prev,ink,mask,guide,pen,owner}
}
test('媤 compound prefix requires actual exact full predecessor and rejects stale DOM',()=>{
 const ctx=makeReviewedU5aa4GPrefixSourceContext(f.fullProof,f.identity,f.strokes)!
 for(const[p,m]of [[1,2],[10,2],[10,3]]){
  const q=reviewedU5aa4GPrefixPolicy(ctx,p-1,m-1)!
  assert.equal(verifyReviewedU5aa4GPrefixPrior(q,dom(q).g as unknown as SVGGElement,1),true)
  const changes=[(n:ReturnType<typeof dom>)=>n.ink.attrs.set('d',n.ink.attrs.get('d')+' '),(n:ReturnType<typeof dom>)=>n.ink.style.opacity='.5',(n:ReturnType<typeof dom>)=>n.pen.style.transform='scale(2)',(n:ReturnType<typeof dom>)=>n.pen.children.reverse(),(n:ReturnType<typeof dom>)=>n.ink.style.fill='rgba(0,0,0,0)',(n:ReturnType<typeof dom>)=>n.ink.attrs.set('clip-path','url(#old)')];if(q.previousMaskKind!=='plain-cardinal')changes.push((n)=>n.prev.attrs.set('data-stroke-reveal-progress','.99999999'),(n)=>n.ink.attrs.set('data-u5aa4g-full-committed','false'))
  if(q.previousMaskKind==='growing-u5aa4g-caps')changes.push((n)=>n.guide.attrs.set('stroke-dasharray','.99 2'))
  for(const change of changes){const n=dom(q);change(n);assert.equal(verifyReviewedU5aa4GPrefixPrior(q,n.g as unknown as SVGGElement,1),false)}
 }
})
test('媤 five caps reject non-source policy and reset to empty without UA reads',()=>{
 const ctx=makeReviewedU5aa4GSourceContext(f.fullProof,f.identity,f.strokes)!
 const none={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const[p,m]of targets){const q=reviewedU5aa4GPolicy(ctx,p-1,m-1)!;assert.equal(commitReviewedU5aa4GCaps(q,q.segment,0,'source',none).status,'empty');assert.equal(commitReviewedU5aa4GCaps({...q},q.segment,1,'source',none).status,'hidden')}
 const q=reviewedU5aa4GPolicy(ctx,0,0)!;assert.equal(verifyReviewedU5aa4GCapsPrior(q,null,1),false)
})
