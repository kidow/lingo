import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u8b92-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8b92HkcsHvSourceContext,reviewedU8b92HkcsHvPolicy,sampleReviewedU8b92HkcsHvFrame,verifyReviewedU8b92HkcsHvPrior,REVIEWED_U8B92_HKCS_HV_SOURCE,type ReviewedU8b92HkcsHvPolicy} from './hanja-stroke-cardinal-contact-u8b92-hkcs.ts'
const f=fixture.hkcs_m8b92,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
class Node{
 namespaceURI='http://www.w3.org/2000/svg';isConnected=true;ownerSVGElement:Node|null=null;parentElement:Node|null=null;children:Node[]=[];previousElementSibling:Node|null=null;nextElementSibling:Node|null=null
 style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'#000000',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:(_key:string)=>'none'}
 localName:string;ownerDocument:object;attributes=new Map<string,string>();constructor(localName:string,ownerDocument:object,attrs:Record<string,string>={}){this.localName=localName;this.ownerDocument=ownerDocument;for(const[k,v]of Object.entries(attrs))this.attributes.set(k,v)}
 getAttribute(k:string){return this.attributes.get(k)??null}setAttribute(k:string,v:string){this.attributes.set(k,v)}removeAttribute(k:string){this.attributes.delete(k)}
}
function tree(p:ReviewedU8b92HkcsHvPolicy){
 const doc:{defaultView:unknown}={defaultView:null};doc.defaultView={document:doc,getComputedStyle:(n:Node)=>n.style}
 const owner=new Node('svg',doc,{viewBox:'0 0 100 100'}),outer=new Node('g',doc,{'data-stroke-outlines':'true'});outer.ownerSVGElement=owner;outer.parentElement=owner;owner.children=[outer]
 outer.children=Array.from({length:24},()=>new Node('g',doc));for(const n of outer.children){n.ownerSVGElement=owner;n.parentElement=outer}
 const pen=outer.children[p.pen-1];pen.setAttribute('data-outline-stroke',String(p.pen))
 const prev=new Node('path',doc,{d:p.predecessor.outline}),g=new Node('g',doc,{'data-stroke-start-gate':p.id,'data-stroke-reveal-policy':p.kind}),after=new Node('path',doc)
 pen.children=[prev,g];for(const n of pen.children){n.ownerSVGElement=owner;n.parentElement=pen}g.previousElementSibling=prev;prev.nextElementSibling=g;g.nextElementSibling=null;after.previousElementSibling=null
 return{owner,outer,pen,prev,g,after}
}
test('讒 H-to-V targets require the exact complete24 source factory',()=>{
 const c=makeReviewedU8b92HkcsHvSourceContext(f.fullProof,f.identity,s);assert(c);assert(makeReviewedU8b92HkcsHvSourceContext(clone(f.fullProof),Object.fromEntries(Object.entries(f.identity).reverse()),clone(s)))
 assert.equal(makeReviewedU8b92HkcsHvSourceContext(f.fullProof,{...f.identity,sourceRoot:'other'},s),null)
 const changed=clone(s).map(p=>p.map(m=>({...m})));changed[5][1]={...changed[5][1],weight:changed[5][1].weight+1};assert.equal(makeReviewedU8b92HkcsHvSourceContext(f.fullProof,f.identity,changed),null)
 for(const[pen,mask]of[[6,1],[6,3],[11,1],[20,1],[14,2],[16,2],[23,2]])assert.equal(reviewedU8b92HkcsHvPolicy(c,pen-1,mask-1),null)
 assert.equal(reviewedU8b92HkcsHvPolicy({...c},5,1),null)
})
test('讒 H-to-V counter spans exact P minima/maxima without reading original Q y',()=>{
 const c=makeReviewedU8b92HkcsHvSourceContext(f.fullProof,f.identity,s);assert(c)
 for(const pen of[6,11,20]){const p=reviewedU8b92HkcsHvPolicy(c,pen-1,1);assert(p);assert.deepEqual(p.segment,s[pen-1][1]);assert.equal(p.segment.direction,'down');assert.equal((p.segment.outline.match(/M/g)||[]).length,2)
  let previous=-Infinity;for(const n of[0,1e-6,.03,.5,.97,.999999,1]){const z=sampleReviewedU8b92HkcsHvFrame(p,s[pen-1][1],n,n===0?0:1);assert.equal(z.UARead,false);if(z.clip){assert.equal(z.clip.y,p.originY-p.negativeExtent*n);assert.equal(z.clip.height,(p.negativeExtent+p.positiveExtent)*n);assert(z.clip.height>=previous);previous=z.clip.height}else assert.equal(z.originalPDirect,n===1)}
  const end=sampleReviewedU8b92HkcsHvFrame(p,s[pen-1][1],1,1);assert.equal(end.clip,null);assert.equal(end.originalPDirect,true)
  assert.throws(()=>sampleReviewedU8b92HkcsHvFrame(p,s[pen-1][1],.5,.999999));assert.throws(()=>sampleReviewedU8b92HkcsHvFrame({...p},s[pen-1][1],.5,1));for(const n of[-1,NaN,Infinity,1.1])assert.throws(()=>sampleReviewedU8b92HkcsHvFrame(p,s[pen-1][1],n,1))
 }
 assert.equal(REVIEWED_U8B92_HKCS_HV_SOURCE.authorSelectedLinearClock,true);assert.equal(REVIEWED_U8B92_HKCS_HV_SOURCE.originalQYIsNotClipThreshold,true);assert.equal(REVIEWED_U8B92_HKCS_HV_SOURCE.originalClockIdentityApproved,false);assert.equal(REVIEWED_U8B92_HKCS_HV_SOURCE.nativeApproval,false);assert.deepEqual(REVIEWED_U8B92_HKCS_HV_SOURCE.originalQSeam11Normalized,[.5,0]);assert.equal(REVIEWED_U8B92_HKCS_HV_SOURCE.sourceQSeamRepaired,false)
 for(const ref of[REVIEWED_U8B92_HKCS_HV_SOURCE.fixture,REVIEWED_U8B92_HKCS_HV_SOURCE.proof])assert.equal(createHash('sha256').update(readFileSync(new URL('../'+ref.path,import.meta.url))).digest('hex'),ref.SHA256)
})
test('讒 current source prior must be exact completed opaque H in own24-pen slot with2 masks',()=>{
 const c=makeReviewedU8b92HkcsHvSourceContext(f.fullProof,f.identity,s);assert(c)
 for(const pen of[6,11,20]){const p=reviewedU8b92HkcsHvPolicy(c,pen-1,1);assert(p);const yes=tree(p);assert.equal(verifyReviewedU8b92HkcsHvPrior(p,yes.g as unknown as Element,1),true)
  const changes=[(t:ReturnType<typeof tree>)=>t.prev.setAttribute('d','M0 0L1 1Z'),(t:ReturnType<typeof tree>)=>{t.prev.style.opacity='.5'},(t:ReturnType<typeof tree>)=>{t.prev.style.fill='rgba(0,0,0,.5)'},(t:ReturnType<typeof tree>)=>{t.outer.style.opacity='.5'},(t:ReturnType<typeof tree>)=>t.prev.setAttribute('transform','scale(1)'),(t:ReturnType<typeof tree>)=>t.owner.setAttribute('viewBox','0 0 200 200'),(t:ReturnType<typeof tree>)=>{t.pen.children.pop()},(t:ReturnType<typeof tree>)=>t.pen.setAttribute('data-outline-stroke','1')]
  for(const change of changes){const no=tree(p);change(no);assert.equal(verifyReviewedU8b92HkcsHvPrior(p,no.g as unknown as Element,1),false)}
  assert.equal(verifyReviewedU8b92HkcsHvPrior(p,yes.g as unknown as Element,.999999),false);assert.equal(verifyReviewedU8b92HkcsHvPrior({...p},yes.g as unknown as Element,1),false)
 }
})
test('讒 absent prior stays rejected before browser access',()=>{
 const c=makeReviewedU8b92HkcsHvSourceContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU8b92HkcsHvPolicy(c,5,1);assert(p);assert.equal(verifyReviewedU8b92HkcsHvPrior(p,null,1),false)
})
