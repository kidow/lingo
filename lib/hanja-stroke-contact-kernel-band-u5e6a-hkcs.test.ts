import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU5e6aHkcsKernelBandSourceContext,reviewedU5e6aHkcsKernelBandPolicy,sampleReviewedU5e6aHkcsKernelBandFrame,verifyReviewedU5e6aHkcsKernelBandPrior,REVIEWED_U5E6A_HKCS_KERNEL_BAND_SOURCE,type ReviewedU5e6aHkcsKernelBandPolicy} from './hanja-stroke-contact-kernel-band-u5e6a-hkcs.ts'
const f=fixture.hkcs_m5e6a,s=f.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
class Node{
 namespaceURI='http://www.w3.org/2000/svg';isConnected=true;ownerSVGElement:Node|null=null;parentElement:Node|null=null;children:Node[]=[];previousElementSibling:Node|null=null;nextElementSibling:Node|null=null
 style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'#000000',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:(_key:string)=>'none'}
 localName:string;ownerDocument:object;attributes=new Map<string,string>();constructor(localName:string,ownerDocument:object,attrs:Record<string,string>={}){this.localName=localName;this.ownerDocument=ownerDocument;for(const[k,v]of Object.entries(attrs))this.attributes.set(k,v)}
 getAttribute(k:string){return this.attributes.get(k)??null}setAttribute(k:string,v:string){this.attributes.set(k,v)}removeAttribute(k:string){this.attributes.delete(k)}
}
function tree(p:ReviewedU5e6aHkcsKernelBandPolicy){
 const doc:{defaultView:unknown}={defaultView:null};doc.defaultView={document:doc,getComputedStyle:(n:Node)=>n.style}
 const owner=new Node('svg',doc,{viewBox:'0 0 100 100'}),outer=new Node('g',doc,{'data-stroke-outlines':'true'});outer.ownerSVGElement=owner;outer.parentElement=owner;owner.children=[outer]
 outer.children=Array.from({length:17},()=>new Node('g',doc));for(const n of outer.children){n.ownerSVGElement=owner;n.parentElement=outer}
 const pen=outer.children[p.pen-1];pen.setAttribute('data-outline-stroke',String(p.pen))
 const g=new Node('g',doc,{'data-stroke-start-gate':p.id,'data-stroke-reveal-policy':p.kind})
 pen.children=s[p.pen-1].map((segment,i)=>i===p.mask-1?g:new Node('path',doc,{d:segment.outline}));for(const[i,n]of pen.children.entries()){n.ownerSVGElement=owner;n.parentElement=pen;n.previousElementSibling=pen.children[i-1]??null;n.nextElementSibling=pen.children[i+1]??null}
 const prev=pen.children[p.mask-2];return{owner,outer,pen,prev,g}
}
test('幪 kernel band requires exact whole17 source and rejects other families',()=>{
 const c=makeReviewedU5e6aHkcsKernelBandSourceContext(f.fullProof,f.identity,s);assert(c);assert(makeReviewedU5e6aHkcsKernelBandSourceContext(clone(f.fullProof),Object.fromEntries(Object.entries(f.identity).reverse()),clone(s)));
 for(const[pen,mask]of[[2,3],[9,1],[13,2],[8,1]])assert.equal(reviewedU5e6aHkcsKernelBandPolicy(c,pen-1,mask-1),null);assert.equal(reviewedU5e6aHkcsKernelBandPolicy({...c},1,1),null);
 const changed=clone(s).map(p=>p.map(m=>({...m})));changed[8][1]={...changed[8][1],weight:changed[8][1].weight+.1};assert.equal(makeReviewedU5e6aHkcsKernelBandSourceContext(f.fullProof,f.identity,changed),null);
 assert.equal(makeReviewedU5e6aHkcsKernelBandSourceContext(f.fullProof,{...f.identity,sourceRoot:'other'},s),null);
})
test('幪 authored centered bands preserve source and exact foot boundary without asserting publisher clock',()=>{
 const c=makeReviewedU5e6aHkcsKernelBandSourceContext(f.fullProof,f.identity,s);assert(c);
 for(const pen of[2,9]){const p=reviewedU5e6aHkcsKernelBandPolicy(c,pen-1,1);assert(p);assert.deepEqual(p.segment,s[pen-1][1]);assert.deepEqual(p.predecessor,s[pen-1][0]);let lower=Infinity,upper=-Infinity;
 for(const n of[0,1e-6,.03,.5,.97,.999999,1]){const z=sampleReviewedU5e6aHkcsKernelBandFrame(p,p.segment,n,n===0?0:1);assert.equal(z.UARead,false);if(z.clip){assert(z.clip.y<=p.originY);assert(z.clip.y+z.clip.height>=p.originY);assert(z.clip.y<=lower);assert(z.clip.y+z.clip.height>=upper);lower=z.clip.y;upper=z.clip.y+z.clip.height;assert.equal(z.clip.x,p.segment.bounds[0]);assert.equal(z.clip.width,p.segment.bounds[2]-p.segment.bounds[0]);}else{assert.equal(z.originalPDirect,n===1);assert.equal(z.visible,n===1)}}
 for(const n of[-1,NaN,Infinity,1.1])assert.throws(()=>sampleReviewedU5e6aHkcsKernelBandFrame(p,p.segment,n,1));assert.throws(()=>sampleReviewedU5e6aHkcsKernelBandFrame(p,p.segment,.5,.999999));assert.throws(()=>sampleReviewedU5e6aHkcsKernelBandFrame({...p},p.segment,.5,1));}
 const p=reviewedU5e6aHkcsKernelBandPolicy(c,1,1);assert(p);assert.equal(p.footBoundaryProgress,146/157);for(const [n,sign]of[[146/157-1e-10,-1],[146/157,0],[146/157+1e-10,1]]){const z=sampleReviewedU5e6aHkcsKernelBandFrame(p,p.segment,n,1);assert(z.clip);assert.equal(Math.sign(z.clip.y+z.clip.height-63),sign)}
 assert.equal(REVIEWED_U5E6A_HKCS_KERNEL_BAND_SOURCE.authorSelectedLinearClock,true);assert.equal(REVIEWED_U5E6A_HKCS_KERNEL_BAND_SOURCE.originalClockIdentityApproved,false);assert.equal(REVIEWED_U5E6A_HKCS_KERNEL_BAND_SOURCE.source9BodyStrictConvex,false);assert.equal(REVIEWED_U5E6A_HKCS_KERNEL_BAND_SOURCE.lowerFootOriginalAndEdgeOnly,true);assert.equal(REVIEWED_U5E6A_HKCS_KERNEL_BAND_SOURCE.nativeApproval,false);
 for(const ref of[REVIEWED_U5E6A_HKCS_KERNEL_BAND_SOURCE.fixture,REVIEWED_U5E6A_HKCS_KERNEL_BAND_SOURCE.proof])assert.equal(createHash('sha256').update(readFileSync(new URL('../'+ref.path,import.meta.url))).digest('hex'),ref.SHA256)
})
test('幪 kernel prior requires direct exact opaque source H and whole17 coordinate slot',()=>{
 const c=makeReviewedU5e6aHkcsKernelBandSourceContext(f.fullProof,f.identity,s);assert(c);for(const pen of[2,9]){const p=reviewedU5e6aHkcsKernelBandPolicy(c,pen-1,1);assert(p);const yes=tree(p);assert(verifyReviewedU5e6aHkcsKernelBandPrior(p,yes.g as unknown as Element,1));
 const changes=[(t:ReturnType<typeof tree>)=>{t.prev.localName='g'},(t:ReturnType<typeof tree>)=>t.prev.setAttribute('mask','url(#unapproved)'),(t:ReturnType<typeof tree>)=>t.prev.setAttribute('d','M0 0L1 1Z'),(t:ReturnType<typeof tree>)=>{t.prev.style.opacity='.5'},(t:ReturnType<typeof tree>)=>{t.prev.style.fill='rgba(0,0,0,.5)'},(t:ReturnType<typeof tree>)=>t.owner.setAttribute('viewBox','0 0 200 200'),(t:ReturnType<typeof tree>)=>{t.pen.children.pop()}];for(const change of changes){const no=tree(p);change(no);assert.equal(verifyReviewedU5e6aHkcsKernelBandPrior(p,no.g as unknown as Element,1),false)}assert.equal(verifyReviewedU5e6aHkcsKernelBandPrior(p,yes.g as unknown as Element,.99),false);assert.equal(verifyReviewedU5e6aHkcsKernelBandPrior({...p},yes.g as unknown as Element,1),false)}
})
test('幪 kernel missing prior rejects before any browser read',()=>{const c=makeReviewedU5e6aHkcsKernelBandSourceContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU5e6aHkcsKernelBandPolicy(c,1,1);assert(p);assert.equal(verifyReviewedU5e6aHkcsKernelBandPrior(p,null,1),false)})
