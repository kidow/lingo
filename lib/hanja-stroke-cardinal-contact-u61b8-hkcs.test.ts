import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU61b8HkcsCardinalSourceContext,reviewedU61b8HkcsCardinalPolicy,sampleReviewedU61b8HkcsCardinalFrame,verifyReviewedU61b8HkcsCardinalPrior,REVIEWED_U61B8_HKCS_CARDINAL_SOURCE} from './hanja-stroke-cardinal-contact-u61b8-hkcs.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u61b8-hkcs-2026-10-25/fixtures.json',import.meta.url),'utf8')).hkcs_m61b8
test('憸 original H-to-V bands select only two exact masks and preserve empty/full endpoints',()=>{
 const ctx=makeReviewedU61b8HkcsCardinalSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(ctx)
 for(let p=0;p<f.strokes.length;p++)for(let m=0;m<f.strokes[p].length;m++){const policy=reviewedU61b8HkcsCardinalPolicy(ctx,p,m);assert.equal(!!policy,m===1&&[7,10].includes(p));if(!policy)continue
  const s=f.strokes[p][m],raw=f.fullProof.groups[f.sourceProposal.groups[p][m]].raw;assert.deepEqual(policy.segment,s);assert.equal(policy.origin,raw[4]/2);assert.equal(policy.originY,policy.origin)
  assert.equal(sampleReviewedU61b8HkcsCardinalFrame(policy,s,0,0).visible,false)
  const full=sampleReviewedU61b8HkcsCardinalFrame(policy,s,1,1);assert.equal(full.originalPDirect,true);assert.equal(full.clip,null)
  for(const x of [Number.EPSILON,1e-15,.000001,.01,.03,.5,.99]){const a=sampleReviewedU61b8HkcsCardinalFrame(policy,s,x,1);assert(a.clip);assert(a.clip.height>0);assert.equal(a.clip.y,policy.origin-policy.negativeExtent*x);assert(a.clip.y<=policy.origin);assert(a.clip.y+a.clip.height>=policy.origin)}
  assert.throws(()=>sampleReviewedU61b8HkcsCardinalFrame(policy,s,.01,.999));assert.throws(()=>sampleReviewedU61b8HkcsCardinalFrame({...policy},s,.01,1));assert.throws(()=>sampleReviewedU61b8HkcsCardinalFrame(policy,{...s,weight:s.weight+1},.01,1))
 }
 assert.equal(makeReviewedU61b8HkcsCardinalSourceContext({...f.fullProof,header:'synthetic'},f.identity,f.strokes),null)
 assert.equal(REVIEWED_U61B8_HKCS_CARDINAL_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U61B8_HKCS_CARDINAL_SOURCE.newGuideAdded,false)
})
test('憸 bands require adjacent sole direct original H in the same untransformed opaque SVG',()=>{
 const ctx=makeReviewedU61b8HkcsCardinalSourceContext(f.fullProof,f.identity,f.strokes)
 for(const pen of[8,11]){const policy=reviewedU61b8HkcsCardinalPolicy(ctx,pen-1,1)!;const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'},doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
  const node=(localName:string,a:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerDocument:doc,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(k:string)=>a[k]??null,setAttribute:(k:string,v:string)=>{a[k]=v},removeAttribute:(k:string)=>{delete a[k]}})
  const owner=node('svg'),parent=node('g',{'data-outline-stroke':String(pen)}),prev=node('path',{d:policy.predecessor.outline}),g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind});for(const n of[parent,prev,g])n.ownerSVGElement=owner
  parent.parentElement=owner;owner.children=[parent];prev.parentElement=parent;g.parentElement=parent;parent.children=[prev,g];prev.nextElementSibling=g;g.previousElementSibling=prev
  assert.equal(verifyReviewedU61b8HkcsCardinalPrior(policy,g as unknown as Element,1),true);assert.equal(verifyReviewedU61b8HkcsCardinalPrior(policy,g as unknown as Element,.999),false)
  prev.setAttribute('mask','url(#foreign)');assert.equal(verifyReviewedU61b8HkcsCardinalPrior(policy,g as unknown as Element,1),false);prev.removeAttribute('mask')
  style.opacity='.5';assert.equal(verifyReviewedU61b8HkcsCardinalPrior(policy,g as unknown as Element,1),false);style.opacity='1'
  for(const fill of ['rgba(0,0,0,0)','rgb(0 0 0 / 0%)','#0000','#00000000','url(#foreign)']){style.fill=fill;assert.equal(verifyReviewedU61b8HkcsCardinalPrior(policy,g as unknown as Element,1),false)}
  for(const fill of ['black','rgba(0,0,0,1)','rgb(0 0 0 / 100%)','#000f','#000000ff']){style.fill=fill;assert.equal(verifyReviewedU61b8HkcsCardinalPrior(policy,g as unknown as Element,1),true)}
  style.fill='black'
  prev.setAttribute('d',policy.predecessor.outline+' ');assert.equal(verifyReviewedU61b8HkcsCardinalPrior(policy,g as unknown as Element,1),false)
 }
})

