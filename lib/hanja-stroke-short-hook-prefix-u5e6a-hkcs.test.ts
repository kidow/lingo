import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU5e6aHkcsShortHookSourceContext,reviewedU5e6aHkcsShortHookPolicy,sampleReviewedU5e6aHkcsShortHookFrame,verifyReviewedU5e6aHkcsShortHookPrior,REVIEWED_U5E6A_HKCS_SHORT_HOOK_SOURCE,type ReviewedU5e6aHkcsShortHookPolicy} from './hanja-stroke-short-hook-prefix-u5e6a-hkcs.ts'
const f=fixture.hkcs_m5e6a,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
class Node{
 namespaceURI='http://www.w3.org/2000/svg';isConnected=true;ownerSVGElement:Node|null=null;parentElement:Node|null=null;children:Node[]=[];previousElementSibling:Node|null=null;nextElementSibling:Node|null=null
 style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'#000000',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:(_key:string)=>'none'}
 localName:string;ownerDocument:object;attributes=new Map<string,string>();constructor(localName:string,ownerDocument:object,attrs:Record<string,string>={}){this.localName=localName;this.ownerDocument=ownerDocument;for(const[k,v]of Object.entries(attrs))this.attributes.set(k,v)}
 getAttribute(k:string){return this.attributes.get(k)??null}setAttribute(k:string,v:string){this.attributes.set(k,v)}removeAttribute(k:string){this.attributes.delete(k)}
}
function tree(p:ReviewedU5e6aHkcsShortHookPolicy){
 const doc:{defaultView:unknown}={defaultView:null};doc.defaultView={document:doc,getComputedStyle:(n:Node)=>n.style}
 const owner=new Node('svg',doc,{viewBox:'0 0 100 100'}),outer=new Node('g',doc,{'data-stroke-outlines':'true'});outer.ownerSVGElement=owner;outer.parentElement=owner;owner.children=[outer]
 outer.children=Array.from({length:17},()=>new Node('g',doc));for(const n of outer.children){n.ownerSVGElement=owner;n.parentElement=outer}
 const pen=outer.children[p.pen-1];pen.setAttribute('data-outline-stroke',String(p.pen))
 const g=new Node('g',doc,{'data-stroke-start-gate':p.id,'data-stroke-reveal-policy':p.kind})
 pen.children=s[p.pen-1].map((segment,i)=>i===p.mask-1?g:new Node('path',doc,{d:segment.outline}));for(const[i,n]of pen.children.entries()){n.ownerSVGElement=owner;n.parentElement=pen;n.previousElementSibling=pen.children[i-1]??null;n.nextElementSibling=pen.children[i+1]??null}
 const prev=pen.children[p.mask-2];return{owner,outer,pen,prev,g}
}
test('幪 short curves require the exact complete17 source factory',()=>{
 const c=makeReviewedU5e6aHkcsShortHookSourceContext(f.fullProof,f.identity,s);assert(c);assert(makeReviewedU5e6aHkcsShortHookSourceContext(clone(f.fullProof),Object.fromEntries(Object.entries(f.identity).reverse()),clone(s)))
 assert.equal(makeReviewedU5e6aHkcsShortHookSourceContext(f.fullProof,{...f.identity,sourceRoot:'other'},s),null)
 const changed=clone(s).map(p=>p.map(m=>({...m})));changed[1][2]={...changed[1][2],revealWidth:15};assert.equal(makeReviewedU5e6aHkcsShortHookSourceContext(f.fullProof,f.identity,changed),null)
 for(const[pen,mask]of[[2,2],[9,2],[13,1],[13,3],[1,1]])assert.equal(reviewedU5e6aHkcsShortHookPolicy(c,pen-1,mask-1),null)
 assert.equal(reviewedU5e6aHkcsShortHookPolicy({...c},1,2),null)
})
test('幪 short curve counter spans exact P minima/maxima without reading original Q x',()=>{
 const c=makeReviewedU5e6aHkcsShortHookSourceContext(f.fullProof,f.identity,s);assert(c)
 for(const[pen,mask]of[[2,3],[13,2]]){const p=reviewedU5e6aHkcsShortHookPolicy(c,pen-1,mask-1);assert(p);assert.deepEqual(p.segment,s[pen-1][mask-1]);assert.equal(p.segment.revealWidth,14);assert.equal((p.segment.outline.match(/M/g)||[]).length,2)
  let previous=-Infinity;for(const n of[0,1e-6,.03,.5,.97,.999999,1]){const z=sampleReviewedU5e6aHkcsShortHookFrame(p,s[pen-1][mask-1],n,n===0?0:1);assert.equal(z.UARead,false);if(z.clip){assert.equal(z.clip.y,p.segment.bounds[1]);assert(Math.abs(z.clip.width-(p.maximumX-p.minimumX)*n)<1e-12);assert(z.clip.width>=previous);assert(Math.abs(z.clip.x-(p.maximumX-(p.maximumX-p.minimumX)*n))<1e-12);previous=z.clip.width}else assert.equal(z.originalPDirect,n===1)}
  const end=sampleReviewedU5e6aHkcsShortHookFrame(p,s[pen-1][mask-1],1,1);assert.equal(end.clip,null);assert.equal(end.originalPDirect,true)
  assert.throws(()=>sampleReviewedU5e6aHkcsShortHookFrame(p,s[pen-1][mask-1],.5,.999999));assert.throws(()=>sampleReviewedU5e6aHkcsShortHookFrame({...p},s[pen-1][mask-1],.5,1));for(const n of[-1,NaN,Infinity,1.1])assert.throws(()=>sampleReviewedU5e6aHkcsShortHookFrame(p,s[pen-1][mask-1],n,1))
 }
 assert.equal(REVIEWED_U5E6A_HKCS_SHORT_HOOK_SOURCE.authorSelectedLinearClock,true);assert.equal(REVIEWED_U5E6A_HKCS_SHORT_HOOK_SOURCE.originalQXIsNotClipThreshold,true);assert.equal(REVIEWED_U5E6A_HKCS_SHORT_HOOK_SOURCE.originalClockIdentityApproved,false);assert.equal(REVIEWED_U5E6A_HKCS_SHORT_HOOK_SOURCE.nativeApproval,false)
 for(const ref of[REVIEWED_U5E6A_HKCS_SHORT_HOOK_SOURCE.fixture,REVIEWED_U5E6A_HKCS_SHORT_HOOK_SOURCE.proof])assert.equal(createHash('sha256').update(readFileSync(new URL('../'+ref.path,import.meta.url))).digest('hex'),ref.SHA256)
})
test('幪 current source prior must be exact completed opaque prior in own17-pen slot',()=>{
 const c=makeReviewedU5e6aHkcsShortHookSourceContext(f.fullProof,f.identity,s);assert(c)
 for(const[pen,mask]of[[2,3],[13,2]]){const p=reviewedU5e6aHkcsShortHookPolicy(c,pen-1,mask-1);assert(p);const yes=tree(p);assert.equal(verifyReviewedU5e6aHkcsShortHookPrior(p,yes.g as unknown as Element,1),true)
  const changes=[(t:ReturnType<typeof tree>)=>{t.prev.localName='g'},(t:ReturnType<typeof tree>)=>t.prev.setAttribute('mask','url(#unapproved)'),(t:ReturnType<typeof tree>)=>t.prev.setAttribute('d','M0 0L1 1Z'),(t:ReturnType<typeof tree>)=>{t.prev.style.opacity='.5'},(t:ReturnType<typeof tree>)=>{t.prev.style.fill='rgba(0,0,0,.5)'},(t:ReturnType<typeof tree>)=>{t.outer.style.opacity='.5'},(t:ReturnType<typeof tree>)=>t.prev.setAttribute('transform','scale(1)'),(t:ReturnType<typeof tree>)=>t.owner.setAttribute('viewBox','0 0 200 200'),(t:ReturnType<typeof tree>)=>{t.pen.children.pop()},(t:ReturnType<typeof tree>)=>t.pen.setAttribute('data-outline-stroke','1')]
  for(const change of changes){const no=tree(p);change(no);assert.equal(verifyReviewedU5e6aHkcsShortHookPrior(p,no.g as unknown as Element,1),false)}
  assert.equal(verifyReviewedU5e6aHkcsShortHookPrior(p,yes.g as unknown as Element,.999999),false);assert.equal(verifyReviewedU5e6aHkcsShortHookPrior({...p},yes.g as unknown as Element,1),false)
 }
})
test('幪 absent prior stays rejected before browser access',()=>{
 const c=makeReviewedU5e6aHkcsShortHookSourceContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU5e6aHkcsShortHookPolicy(c,1,2);assert(p);assert.equal(verifyReviewedU5e6aHkcsShortHookPrior(p,null,1),false)
})
