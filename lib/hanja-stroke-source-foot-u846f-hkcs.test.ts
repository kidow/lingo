import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU846fHkcsFootSourceContext,reviewedU846fHkcsFootContext,reviewedU846fHkcsFootPolicy,sampleReviewedU846fHkcsFootFrame,verifyReviewedU846fHkcsFootPrior,REVIEWED_U846F_HKCS_FOOT_SOURCE} from './hanja-stroke-source-foot-u846f-hkcs.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u846f-hkcs-2026-10-25/fixtures.json',import.meta.url),'utf8')).hkcs_m846f
test('葯 two strict-seed source feet retain source gaps and recover original P continuously',()=>{
 const c=makeReviewedU846fHkcsFootSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(c);assert.equal(c,reviewedU846fHkcsFootContext(f.strokes))
 for(const pen of[5,6]){
  const q=reviewedU846fHkcsFootPolicy(c,pen-1,1);assert.ok(q);assert.deepEqual(q.segment,f.strokes[pen-1][1]);assert.deepEqual(q.previousSegment,f.strokes[pen-1][0]);assert.equal(q.previousCompletion,'original-Q7-tube')
  const empty=sampleReviewedU846fHkcsFootFrame(q,q.segment,0,0);assert.equal(empty.visible,false);assert.equal(empty.footPathD,'')
  for(const p of[1e-6,.01,.03,q.phaseShare-1e-10,q.phaseShare,q.phaseShare+1e-10,.5,.99999999]){
   const s=sampleReviewedU846fHkcsFootFrame(q,q.segment,p,1);assert.equal(s.progress,p);assert.equal(s.paintOriginalPOnce,true);assert.equal(s.UARead,false);assert.equal(s.visible,true);assert.ok(s.footProgress>=0&&s.footProgress<=1);assert.ok(s.bodyProgress>=0&&s.bodyProgress<=1);if(p<q.phaseShare){assert.equal(s.phase,'foot');assert.ok(s.footPathD);assert.equal(s.fullFootClip.width,0);assert.equal(s.bodyClip.width,0)}else{assert.equal(s.phase,'body');assert.equal(s.footPathD,'');assert.equal(s.fullFootClip.width,q.cutX-q.bounds[0])}
  }
  const end=sampleReviewedU846fHkcsFootFrame(q,q.segment,1,1);assert.equal(end.originalPDirect,true);assert.equal(end.originalSourceFull,true);assert.equal(end.originalMaskRequiredAtCompletion,false);assert.equal(end.footPathD,'');assert.equal(end.bodyClip.width,q.bodyEndX-q.cutX)
  assert.throws(()=>sampleReviewedU846fHkcsFootFrame({...q},q.segment,.5,1));assert.throws(()=>sampleReviewedU846fHkcsFootFrame(q,{...q.segment,weight:q.segment.weight+1},.5,1));for(const p of[-1,NaN,Infinity,1.01])assert.throws(()=>sampleReviewedU846fHkcsFootFrame(q,q.segment,p,1));for(const previous of[0,.9999999,NaN])assert.throws(()=>sampleReviewedU846fHkcsFootFrame(q,q.segment,.01,previous))
 }
 assert.equal(reviewedU846fHkcsFootPolicy(c,11,2),null);assert.equal(REVIEWED_U846F_HKCS_FOOT_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U846F_HKCS_FOOT_SOURCE.guideGapPreserved,true)
 assert.equal(makeReviewedU846fHkcsFootSourceContext(f.fullProof,{...f.identity,sourceRoot:'u846f-k'},f.strokes),null)
})
test('葯 source feet require actual exact completed prior Q7 before and after rendering',()=>{
 const c=reviewedU846fHkcsFootContext(f.strokes);let q=reviewedU846fHkcsFootPolicy(c,4,1)!
 const doc:any={defaultView:null,getElementById:(id:string)=>all.find(n=>n.getAttribute('id')===id)??null};let all:Stub[]=[]
 class Stub{namespaceURI='http://www.w3.org/2000/svg';isConnected=true;ownerDocument=doc;ownerSVGElement:Stub|null=null;parentElement:Stub|null=null;children:Stub[]=[];attrs=new Map<string,string>();style:Record<string,string>={};localName:string;constructor(name:string){this.localName=name}getAttribute(k:string){return this.attrs.get(k)??null}get previousElementSibling():Stub|null{return this.parentElement?.children[this.parentElement.children.indexOf(this)-1]??null}get nextElementSibling():Stub|null{return this.parentElement?.children[this.parentElement.children.indexOf(this)+1]??null}contains(n:Stub):boolean{return this.children.includes(n)||this.children.some(c=>c.contains(n))}}
 const view:any={document:doc,getComputedStyle:(n:Stub)=>({transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:n.localName==='path'&&n.attrs.get('fill')==='none'?'white':'none',fill:n.attrs.get('fill')??'black',fillRule:'nonzero',strokeWidth:'14',strokeLinecap:'round',strokeLinejoin:'miter',strokeOpacity:'1',strokeDashoffset:'0',strokeDasharray:'1px, 2px',...n.style,getPropertyValue:(k:string)=>n.style[k]??(k==='mask-image'&&n.attrs.has('mask')?n.attrs.get('mask')!:'none')})};doc.defaultView=view
 function nodes(){const owner=new Stub('svg'),pen=new Stub('g'),h=new Stub('path'),prev=new Stub('g'),defs=new Stub('defs'),mask=new Stub('mask'),guide=new Stub('path'),ink=new Stub('path'),g=new Stub('g');all=[owner,pen,h,prev,defs,mask,guide,ink,g]
  const attach=(a:Stub,children:Stub[])=>{a.children=children;for(const n of children)n.parentElement=a};attach(owner,[pen]);attach(pen,[prev,g]);attach(prev,[defs,ink]);attach(defs,[mask]);attach(mask,[guide]);for(const n of all)if(n!==owner)n.ownerSVGElement=owner
  pen.attrs.set('data-outline-stroke',String(q.pen));for(const[k,v]of Object.entries({'data-stroke-start-gate':q.id,'data-stroke-reveal-policy':q.kind}))g.attrs.set(k,v)
  for(const[k,v]of Object.entries({'data-stroke-start-gate':'u846f-hkcs-'+q.pen+'-1','data-stroke-reveal-policy':'growing-u846f-hkcs-caps','data-stroke-reveal-progress':'1'}))prev.attrs.set(k,v)
  for(const[k,v]of Object.entries({id:'completedQ',maskUnits:'userSpaceOnUse',maskContentUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'}))mask.attrs.set(k,v)
  for(const[k,v]of Object.entries({d:q.previousSegment.revealPath!,fill:'none',stroke:'white','stroke-width':'14','stroke-linecap':'round','stroke-linejoin':'miter',pathLength:'1','stroke-dasharray':'1 2','stroke-dashoffset':'0'}))guide.attrs.set(k,v)
  for(const[k,v]of Object.entries({d:q.previousSegment.outline,mask:'url(#completedQ)','data-u846f-hkcs-full-original-q-tube':'true','data-u846f-hkcs-full-committed':'true'}))ink.attrs.set(k,v)
  return{owner,pen,h,prev,defs,mask,guide,ink,g}}
 const valid=nodes();assert.equal(verifyReviewedU846fHkcsFootPrior(q,valid.g as unknown as SVGGElement,1),true)
 const mutations=[(n:ReturnType<typeof nodes>)=>n.prev.attrs.set('data-stroke-reveal-progress','.99999999'),(n:ReturnType<typeof nodes>)=>n.guide.attrs.set('stroke-dasharray','.99999 2'),(n:ReturnType<typeof nodes>)=>n.ink.attrs.set('d','M0 0'),(n:ReturnType<typeof nodes>)=>n.ink.attrs.set('mask','url(#missing)'),(n:ReturnType<typeof nodes>)=>n.ink.style.visibility='hidden',(n:ReturnType<typeof nodes>)=>n.ink.style.opacity='.5',(n:ReturnType<typeof nodes>)=>n.pen.style.transform='scale(2)',(n:ReturnType<typeof nodes>)=>n.prev.children.push(new Stub('path')),(n:ReturnType<typeof nodes>)=>n.guide.ownerSVGElement=new Stub('svg'),(n:ReturnType<typeof nodes>)=>n.pen.children.reverse(),(n:ReturnType<typeof nodes>)=>n.ink.attrs.set('data-u846f-hkcs-full-committed','false')]
 for(const mutate of mutations){const n=nodes();mutate(n);assert.equal(verifyReviewedU846fHkcsFootPrior(q,n.g as unknown as SVGGElement,1),false)}
 const after=nodes();assert.equal(verifyReviewedU846fHkcsFootPrior(q,after.g as unknown as SVGGElement,1),true);after.guide.style.strokeWidth='13';assert.equal(verifyReviewedU846fHkcsFootPrior(q,after.g as unknown as SVGGElement,1),false)
 for(const fill of['rgba(0, 0, 0, 0)','rgb(0 0 0 / 0)','color(srgb 0 0 0 / 0)','#0000']){const n=nodes();n.ink.style.fill=fill;assert.equal(verifyReviewedU846fHkcsFootPrior(q,n.g as unknown as SVGGElement,1),false)}
 q=reviewedU846fHkcsFootPolicy(c,5,1)!;const six=nodes();assert.equal(verifyReviewedU846fHkcsFootPrior(q,six.g as unknown as SVGGElement,1),true);six.ink.attrs.set('d',f.strokes[4][0].outline);assert.equal(verifyReviewedU846fHkcsFootPrior(q,six.g as unknown as SVGGElement,1),false)
})
