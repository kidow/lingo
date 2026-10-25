import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u8b92-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8b92HkcsFlag5TailSourceContext,reviewedU8b92HkcsFlag5TailPolicy,sampleReviewedU8b92HkcsFlag5TailFrame,verifyReviewedU8b92HkcsFlag5TailPrior,REVIEWED_U8B92_HKCS_FLAG5_TAIL_SOURCE,type ReviewedU8b92HkcsFlag5TailPolicy} from './hanja-stroke-flag5-up-tail-u8b92-hkcs.ts'
const f=fixture.hkcs_m8b92,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
class Node{
 namespaceURI='http://www.w3.org/2000/svg';isConnected=true;ownerSVGElement:Node|null=null;parentElement:Node|null=null;children:Node[]=[];previousElementSibling:Node|null=null;nextElementSibling:Node|null=null
 style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'#000000',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:(_key:string)=>'none'}
 localName:string;ownerDocument:object;attributes=new Map<string,string>();constructor(localName:string,ownerDocument:object,attrs:Record<string,string>={}){this.localName=localName;this.ownerDocument=ownerDocument;for(const[k,v]of Object.entries(attrs))this.attributes.set(k,v)}
 getAttribute(k:string){return this.attributes.get(k)??null}setAttribute(k:string,v:string){this.attributes.set(k,v)}removeAttribute(k:string){this.attributes.delete(k)}
}

function tree(p:ReviewedU8b92HkcsFlag5TailPolicy){
 const doc:{defaultView:unknown}={defaultView:null};doc.defaultView={document:doc,getComputedStyle:(n:Node)=>n.style}
 const owner=new Node('svg',doc,{viewBox:'0 0 100 100'}),outer=new Node('g',doc,{'data-stroke-outlines':'true'});outer.ownerSVGElement=owner;outer.parentElement=owner;owner.children=[outer]
 outer.children=Array.from({length:24},()=>new Node('g',doc));for(const n of outer.children){n.ownerSVGElement=owner;n.parentElement=outer}
 const pen=outer.children[p.pen-1];pen.setAttribute('data-outline-stroke',String(p.pen));const ns='u8b92-hkcs-short-curve'
 const V=new Node('path',doc,{d:p.originalV.outline}),prev=new Node('g',doc,{'data-stroke-start-gate':'u8b92-hkcs-short-curve-'+p.pen+'-2','data-stroke-reveal-policy':'source-short-curve-y-u8b92-hkcs','data-stroke-reveal-progress':'1',['data-'+ns+'-previous-progress']:'1',['data-'+ns+'-display-clock']:'linear-author-original-P-min-max-y-prefix',['data-'+ns+'-author-clock']:'true',['data-'+ns+'-original-clock-equivalent']:'false',['data-'+ns+'-source-guide']:p.predecessor.revealPath}),g=new Node('g',doc,{'data-stroke-start-gate':p.id,'data-stroke-reveal-policy':p.kind}),defs=new Node('defs',doc),ink=new Node('path',doc,{d:p.predecessor.outline,['data-'+ns+'-ink']:'true',['data-'+ns+'-progress']:'1',['data-'+ns+'-phase']:'full',['data-'+ns+'-direct-original']:'true',['data-'+ns+'-source-full']:'true',['data-'+ns+'-one-p']:'true',['data-'+ns+'-ua-read']:'false',['data-'+ns+'-committed']:'true'})
 pen.children=[V,prev,g];for(const n of pen.children){n.ownerSVGElement=owner;n.parentElement=pen}V.nextElementSibling=prev;prev.previousElementSibling=V;prev.nextElementSibling=g;g.previousElementSibling=prev
 prev.children=[defs,ink];for(const n of prev.children){n.ownerSVGElement=owner;n.parentElement=prev}
 return{owner,outer,pen,V,prev,g,defs,ink}
}
function maskArea(d:string){const nums=(d.match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi)||[]).map(Number),p:number[][]=[];for(let i=0;i<nums.length;i+=2)p.push([nums[i],nums[i+1]]);return Math.abs(p.reduce((n,a,i)=>n+a[0]*p[(i+1)%p.length][1]-p[(i+1)%p.length][0]*a[1],0))/2}
test('讒 flag5 binds complete24 source and rejects other source/modified mask3',()=>{
 const c=makeReviewedU8b92HkcsFlag5TailSourceContext(f.fullProof,f.identity,s);assert(c);assert(makeReviewedU8b92HkcsFlag5TailSourceContext(clone(f.fullProof),Object.fromEntries(Object.entries(f.identity).reverse()),clone(s)))
 assert.equal(makeReviewedU8b92HkcsFlag5TailSourceContext(f.fullProof,{...f.identity,sourceRoot:'u8fc5'},s),null)
 const changed=clone(s).map(p=>p.map(m=>({...m})));changed[15][2]={...changed[15][2],weight:17};assert.equal(makeReviewedU8b92HkcsFlag5TailSourceContext(f.fullProof,f.identity,changed),null)
 assert.equal(reviewedU8b92HkcsFlag5TailPolicy({...c},15,2),null);for(const[pen,mask]of[[16,1],[16,2],[23,1],[23,2],[14,3]])assert.equal(reviewedU8b92HkcsFlag5TailPolicy(c,pen-1,mask-1),null)
})
test('讒 flag5 distance clock derives phases from source body width and UP height',()=>{
 const c=makeReviewedU8b92HkcsFlag5TailSourceContext(f.fullProof,f.identity,s);assert(c)
 for(const pen of[16,23]){const p=reviewedU8b92HkcsFlag5TailPolicy(c,pen-1,2);assert(p);const mid=sampleReviewedU8b92HkcsFlag5TailFrame(p,s[pen-1][2],.5,1),share=mid.bodyShare;assert.equal(share,pen===16?73/99:39/64);assert.equal(mid.bodyWidth,pen===16?18.25:19.5);assert.equal(mid.upHeight,pen===16?6.5:12.5)
  let prior=-1;for(const n of[0,1e-6,.03,.5,share-1e-10,share,share+1e-10,.9,.999999,1]){const z=sampleReviewedU8b92HkcsFlag5TailFrame(p,s[pen-1][2],n,n===0?0:1);assert(z.distance>=prior);prior=z.distance;assert.equal(z.UARead,false);assert.equal(z.originalInkOutline,s[pen-1][2].outline);assert.equal(z.originalOuterWeight,s[pen-1][2].weight);assert.equal(z.paintOriginalInkOnce,true);assert.equal(z.singleMaskContourRequired,true);assert.equal(z.originalClockEquivalent,false);if(z.upDistance>0)assert.equal(z.bodyComplete,true);assert.equal(z.originalPDirect,n===1)}
  const boundary=sampleReviewedU8b92HkcsFlag5TailFrame(p,s[pen-1][2],share,1);assert.equal(boundary.bodyComplete,true);assert.equal(boundary.upDistance,0);assert.equal(boundary.bodyThresholdX,p.bodyBounds[2]);const end=sampleReviewedU8b92HkcsFlag5TailFrame(p,s[pen-1][2],1,1);assert.equal(end.bodyDistance,end.bodyWidth);assert.equal(end.upDistance,end.upHeight);assert.equal(end.upThresholdY,p.upBounds[1]);assert.equal(end.phase,'complete')
  assert.throws(()=>sampleReviewedU8b92HkcsFlag5TailFrame(p,s[pen-1][2],.1,.999999));assert.throws(()=>sampleReviewedU8b92HkcsFlag5TailFrame({...p},s[pen-1][2],.5,1));for(const n of[-1,NaN,Infinity,1.1])assert.throws(()=>sampleReviewedU8b92HkcsFlag5TailFrame(p,s[pen-1][2],n,1))
 }
})
test('讒 flag5 keeps one mask contour with exact adjacent body/UP rect union',()=>{
 const c=makeReviewedU8b92HkcsFlag5TailSourceContext(f.fullProof,f.identity,s);assert(c)
 for(const pen of[16,23]){const p=reviewedU8b92HkcsFlag5TailPolicy(c,pen-1,2);assert(p);const share=sampleReviewedU8b92HkcsFlag5TailFrame(p,p.segment,.5,1).bodyShare
  assert.equal(p.bodyOutline+' '+p.upOutline,p.segment.outline);assert.equal((p.segment.outline.match(/M/g)||[]).length,3);assert(p.bodyBounds[0]<p.upBounds[0]&&p.upBounds[0]<p.upBounds[2]&&p.upBounds[2]<p.bodyBounds[2]);assert.equal(p.bodyBounds[1],p.upBounds[3]);assert(p.upBounds[1]<p.upBounds[3]&&p.bodyBounds[1]<p.bodyBounds[3])
  for(const n of[0,1e-6,.03,share,share+1e-10,.9,.999999,1]){const z=sampleReviewedU8b92HkcsFlag5TailFrame(p,p.segment,n,n===0?0:1);assert.equal((z.maskOutline.match(/M/g)||[]).length,n===0?0:1);if(n===0)assert.equal(z.maskOutline,'');else assert(Math.abs(maskArea(z.maskOutline)-(z.bodyRect.width*z.bodyRect.height+z.upRect.width*z.upRect.height))<1e-8)}
 }
 assert.equal(REVIEWED_U8B92_HKCS_FLAG5_TAIL_SOURCE.bodyTailPositiveAreaOverlap,false);assert.equal(REVIEWED_U8B92_HKCS_FLAG5_TAIL_SOURCE.oldFlag15PositiveAreaApprovalTransferred,false);assert.equal(REVIEWED_U8B92_HKCS_FLAG5_TAIL_SOURCE.nativeApproval,false)
 for(const ref of[REVIEWED_U8B92_HKCS_FLAG5_TAIL_SOURCE.fixture,REVIEWED_U8B92_HKCS_FLAG5_TAIL_SOURCE.proof,REVIEWED_U8B92_HKCS_FLAG5_TAIL_SOURCE.shortPriorModule])assert.equal(createHash('sha256').update(readFileSync(new URL('../'+ref.path,import.meta.url))).digest('hex'),ref.SHA256)
})
test('讒 flag5 requires actual completed opaque short-prefix group and original V',()=>{
 const c=makeReviewedU8b92HkcsFlag5TailSourceContext(f.fullProof,f.identity,s);assert(c)
 for(const pen of[16,23]){const p=reviewedU8b92HkcsFlag5TailPolicy(c,pen-1,2);assert(p);const yes=tree(p);assert.equal(verifyReviewedU8b92HkcsFlag5TailPrior(p,yes.g as unknown as Element,1),true)
  const changes=[(t:ReturnType<typeof tree>)=>t.ink.setAttribute('d','M0 0L1 1Z'),(t:ReturnType<typeof tree>)=>t.ink.setAttribute('data-u8b92-hkcs-short-curve-committed','false'),(t:ReturnType<typeof tree>)=>t.ink.setAttribute('data-u8b92-hkcs-short-curve-source-full','false'),(t:ReturnType<typeof tree>)=>t.ink.setAttribute('clip-path','url(#old)'),(t:ReturnType<typeof tree>)=>{t.ink.style.opacity='.5'},(t:ReturnType<typeof tree>)=>{t.ink.style.fill='rgba(0,0,0,.5)'},(t:ReturnType<typeof tree>)=>t.prev.setAttribute('data-stroke-reveal-progress','.999999'),(t:ReturnType<typeof tree>)=>t.V.setAttribute('d','M0 0Z'),(t:ReturnType<typeof tree>)=>t.prev.setAttribute('data-u8b92-hkcs-short-curve-source-guide','M0 0Q1 1 2 2'),(t:ReturnType<typeof tree>)=>t.owner.setAttribute('viewBox','0 0 200 200'),(t:ReturnType<typeof tree>)=>{t.pen.children.pop()}]
  for(const change of changes){const no=tree(p);change(no);assert.equal(verifyReviewedU8b92HkcsFlag5TailPrior(p,no.g as unknown as Element,1),false)}assert.equal(verifyReviewedU8b92HkcsFlag5TailPrior(p,yes.g as unknown as Element,.999999),false);assert.equal(verifyReviewedU8b92HkcsFlag5TailPrior({...p},yes.g as unknown as Element,1),false)
 }
})
test('讒 absent flag5 predecessor rejects without a browser read',()=>{
 const c=makeReviewedU8b92HkcsFlag5TailSourceContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU8b92HkcsFlag5TailPolicy(c,15,2);assert(p);assert.equal(verifyReviewedU8b92HkcsFlag5TailPrior(p,null,1),false)
})
