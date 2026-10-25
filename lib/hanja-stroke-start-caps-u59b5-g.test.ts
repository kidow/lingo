import assert from 'node:assert/strict'
import test from 'node:test'

import {readFileSync} from 'node:fs'
import {makeReviewedU59b5GSourceContext,reviewedU59b5GContext,reviewedU59b5GPolicy,measureReviewedU59b5GFrame,commitReviewedU59b5GCaps,verifyReviewedU59b5GCapsPrior} from './hanja-stroke-start-caps-u59b5-g.ts'
import {makeReviewedU59b5GPrefixSourceContext,reviewedU59b5GPrefixPolicy,sampleReviewedU59b5GPrefixFrame,verifyReviewedU59b5GPrefixPrior} from './hanja-stroke-source-prefix-u59b5-g.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u59b5-g-2026-10-25/fixtures.json',import.meta.url),'utf8')).u59b5_g
const clone=<T>(x:T):T=>JSON.parse(JSON.stringify(x))
const targets=[[1,1],[2,1],[4,1]]
function measurement(policy:NonNullable<ReturnType<typeof reviewedU59b5GPolicy>>,progress:number){
 const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'}
 const doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
 const node=(localName:string,attributes:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(k:string)=>attributes[k]??null,setAttribute:(k:string,v:string)=>{attributes[k]=v},removeAttribute:(k:string)=>{delete attributes[k]}})
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(policy.pen)}),g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind,'data-u59b5g-progress':String(progress)}),defs=node('defs')
 const [x,y]=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 const guide=Object.assign(node('path',{d:policy.segment.revealPath!,'data-u59b5g-measurement':'true'}),{getTotalLength:()=>100,getPointAtLength:(d:number)=>({x:x+d,y})})
 for(const n of [pen,g,defs,guide])n.ownerSVGElement=owner
 pen.parentElement=owner;g.parentElement=pen;defs.parentElement=g;guide.parentElement=defs;owner.children=[pen];g.children=[defs];defs.children=[guide]
 const prev=node('path',{d:policy.previousSegment?.outline??''});prev.ownerSVGElement=owner;prev.parentElement=pen;prev.nextElementSibling=g;g.previousElementSibling=prev;pen.children=policy.mask===2?[prev,g,node('g'),node('g')]:[g]
 const ink=node('path');ink.parentElement=g
 return {guide:guide as unknown as SVGPathElement,g:g as unknown as SVGGElement,prev,style,nodes:{measurement:null,guide:null,startCap:null,endCap:null,ink:ink as unknown as SVGPathElement}}
}

test('妵 three independent source caps grow from zero',()=>{
 const ctx=makeReviewedU59b5GSourceContext(f.fullProof,f.identity,f.strokes)!
 for(const[p,m]of targets){const q=reviewedU59b5GPolicy(ctx,p-1,m-1)!
  for(const t of [Number.EPSILON,1e-15,1e-10,.01,.5,.99999999]){
   const d=measurement(q,t),frame=measureReviewedU59b5GFrame(q,q.segment,t,d.guide,m===2?1:0)
   assert.equal(frame.d,t*100);assert.equal(frame.rho,Math.min(7,t*100))
   if(m===2){assert.equal(verifyReviewedU59b5GCapsPrior(q,d.g,1),true);assert.equal(verifyReviewedU59b5GCapsPrior(q,d.g,.999),false);d.prev.setAttribute('d',q.previousSegment!.outline+' ');assert.equal(verifyReviewedU59b5GCapsPrior(q,d.g,1),false)}
  }
 }
})
test('妵 exact full5 and original nine masks select only three own-source caps',()=>{
 const ctx=makeReviewedU59b5GSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(ctx)
 assert.equal(ctx,reviewedU59b5GContext(f.strokes))
 for(let p=0;p<8;p++)for(let m=0;m<f.strokes[p].length;m++){const policy=reviewedU59b5GPolicy(ctx,p,m);assert.equal(!!policy,targets.some(([a,b])=>a===p+1&&b===m+1));if(policy){assert.deepEqual(policy.segment,f.strokes[p][m]);assert.equal(policy.certificate.syntax,p===0?'ML':'MQ');assert.equal(policy.certificate.initialArcMax,7)}}
 const badIdentity=clone(f.identity);badIdentity.sourceRoot='u4e77-j';assert.equal(makeReviewedU59b5GSourceContext(f.fullProof,badIdentity,f.strokes),null)
 const badProof=clone(f.fullProof);badProof.groups[0].polygons[0][0].x+=.001;assert.equal(makeReviewedU59b5GSourceContext(badProof,f.identity,f.strokes),null)
 const getter=clone(f.fullProof);Object.defineProperty(getter,'trace',{enumerable:true,get(){throw Error('getter must not run')}});assert.equal(makeReviewedU59b5GSourceContext(getter,f.identity,f.strokes),null)
 for(const [p,m]of [[0,1],[3,0],[7,0]])for(const field of ['outline','weight','revealPath','revealWidth']){const s=clone(f.strokes);if(!(field in s[p][m]))continue;s[p][m][field]=typeof s[p][m][field]==='number'?s[p][m][field]+.001:s[p][m][field]+' ';assert.equal(reviewedU59b5GContext(s),null)}
})
test('妵 exact source prefixes are nested, empty at zero and restore original full endpoint',()=>{
 const ctx=makeReviewedU59b5GPrefixSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(ctx)
 for(const[p,m,axis]of [[1,2,'down']]as const){
  const policy:NonNullable<ReturnType<typeof reviewedU59b5GPrefixPolicy>>=reviewedU59b5GPrefixPolicy(ctx,p-1,m-1)!;assert.ok(policy);assert.equal(policy.axis,axis)
  const s=f.strokes[p-1][m-1],[x,y,right,bottom]=s.bounds
  let lastArea=-1
  for(const t of [0,Number.EPSILON,1e-15,1e-10,.01,.5,.99999999,1]){
   const a=sampleReviewedU59b5GPrefixFrame(policy,s,t,1),c=a.clip
   assert.equal(a.visible,t>0);assert.equal(a.originalPDirect,t===1);assert.equal(a.UARead,false);assert.equal(a.sourceClockSuitabilityClaimed,false)
   const area=c.width*c.height;assert(area>=lastArea);lastArea=area
   const expectedArea=(right-x)*(bottom-y)*t;assert(Math.abs(area-expectedArea)<=Number.EPSILON*4*Math.max(area,expectedArea,Number.MIN_VALUE))
   assert.deepEqual(c,axis==='down'?{x,y,width:right-x,height:(bottom-y)*t}:{x,y,width:(right-x)*t,height:bottom-y})
  }
  assert.throws(()=>sampleReviewedU59b5GPrefixFrame({...policy},s,.1,1))
  assert.throws(()=>sampleReviewedU59b5GPrefixFrame(policy,{...s,weight:s.weight+.01},.1,1))
  assert.throws(()=>sampleReviewedU59b5GPrefixFrame(policy,s,.1,.9999999))
  for(const t of [-1,NaN,Infinity,1.1])assert.throws(()=>sampleReviewedU59b5GPrefixFrame(policy,s,t,1))
  assert.equal(verifyReviewedU59b5GPrefixPrior(policy,null,1),false)
 }
 assert.equal(reviewedU59b5GPrefixPolicy({id:'u59b5g-three-initial-guides'},2,1),null)
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
function dom(q:NonNullable<ReturnType<typeof reviewedU59b5GPrefixPolicy>>){
 let all:Stub[]=[];const doc:any={defaultView:null,getElementById:(id:string)=>all.find(n=>n.attrs.get('id')===id)??null}
 const view:any={document:doc,getComputedStyle:(n:Stub)=>({transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:n.attrs.get('fill')==='none'?'white':'none',fill:n.attrs.get('fill')??'black',fillRule:'nonzero',strokeWidth:'14',strokeLinecap:'round',strokeLinejoin:'miter',strokeOpacity:'1',strokeDashoffset:'0',strokeDasharray:n.attrs.get('fill')==='none'?'1px, 2px':'none',...n.style,getPropertyValue:(k:string)=>n.style[k]??(k==='mask-image'&&n.attrs.has('mask')?n.attrs.get('mask')!:'none')})};doc.defaultView=view
 const node=(n:string)=>{const r=new Stub(n,doc);all.push(r);return r}
 const prefix=q.previousMaskKind.startsWith('source-prefix-'),plain=false,caps=!prefix
 const owner=node('svg'),pen=node('g'),g=node('g'),prev=node(plain?'path':'g'),ink=plain?prev:node('path'),defs=node('defs'),mask=node('mask'),guide=node('path')
 const attach=(p:Stub,cs:Stub[])=>{p.children=cs;for(const c of cs)c.parentElement=p}
 attach(owner,[pen]);const siblings=Array.from({length:q.penMaskCount},()=>node('g'));siblings[q.mask-2]=prev;siblings[q.mask-1]=g;attach(pen,siblings)
 if(!plain)attach(prev,caps?[defs,ink]:[ink]);if(caps){attach(defs,[mask]);attach(mask,[guide])}
 for(const n of all)if(n!==owner)n.ownerSVGElement=owner
 pen.attrs.set('data-outline-stroke',String(q.pen));g.attrs.set('data-stroke-start-gate',q.id);g.attrs.set('data-stroke-reveal-policy',q.kind)
 if(!plain){prev.attrs.set('data-stroke-start-gate',prefix?'u59b5g-source-prefix-'+q.pen+'-'+(q.mask-1):'u59b5g-'+q.pen+'-'+(q.mask-1));prev.attrs.set('data-stroke-reveal-policy',q.previousMaskKind);prev.attrs.set('data-stroke-reveal-progress','1')}
 ink.attrs.set('d',q.previousSegment.outline)
 if(!plain){ink.attrs.set('data-u59b5g-full-committed','true');ink.attrs.set(prefix?'data-u59b5g-full-original-prefix':'data-u59b5g-full-original-q-tube','true')}
 if(caps){
  ink.attrs.set('mask','url(#full)');for(const[k,v]of Object.entries({id:'full',maskUnits:'userSpaceOnUse',maskContentUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'}))mask.attrs.set(k,v)
  for(const[k,v]of Object.entries({d:q.previousSegment.revealPath!,fill:'none',stroke:'white','stroke-width':'14','stroke-linecap':'round','stroke-linejoin':'miter',pathLength:'1','stroke-dasharray':'1 2','stroke-dashoffset':'0'}))guide.attrs.set(k,v)
 }
 return{g,prev,ink,mask,guide,pen,owner}
}
test('妵 compound prefix requires actual exact full predecessor and rejects stale DOM',()=>{
 const ctx=makeReviewedU59b5GPrefixSourceContext(f.fullProof,f.identity,f.strokes)!
 for(const[p,m]of [[1,2]]){
  const q=reviewedU59b5GPrefixPolicy(ctx,p-1,m-1)!
  assert.equal(verifyReviewedU59b5GPrefixPrior(q,dom(q).g as unknown as SVGGElement,1),true)
  const changes=[(n:ReturnType<typeof dom>)=>n.ink.attrs.set('d',n.ink.attrs.get('d')+' '),(n:ReturnType<typeof dom>)=>n.ink.style.opacity='.5',(n:ReturnType<typeof dom>)=>n.pen.style.transform='scale(2)',(n:ReturnType<typeof dom>)=>n.pen.children.reverse(),(n:ReturnType<typeof dom>)=>n.ink.style.fill='rgba(0,0,0,0)',(n:ReturnType<typeof dom>)=>n.ink.attrs.set('clip-path','url(#old)')];changes.push((n)=>n.prev.attrs.set('data-stroke-reveal-progress','.99999999'),(n)=>n.ink.attrs.set('data-u59b5g-full-committed','false'))
  if(q.previousMaskKind==='growing-u59b5g-caps')changes.push((n)=>n.guide.attrs.set('stroke-dasharray','.99 2'))
  for(const change of changes){const n=dom(q);change(n);assert.equal(verifyReviewedU59b5GPrefixPrior(q,n.g as unknown as SVGGElement,1),false)}
 }
})
test('妵 three caps reject non-source policy and reset to empty without UA reads',()=>{
 const ctx=makeReviewedU59b5GSourceContext(f.fullProof,f.identity,f.strokes)!
 const none={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const[p,m]of targets){const q=reviewedU59b5GPolicy(ctx,p-1,m-1)!;assert.equal(commitReviewedU59b5GCaps(q,q.segment,0,'source',none).status,'empty');assert.equal(commitReviewedU59b5GCaps({...q},q.segment,1,'source',none).status,'hidden')}
 const q=reviewedU59b5GPolicy(ctx,0,0)!;assert.equal(verifyReviewedU59b5GCapsPrior(q,null,1),false)
})
