import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {makeReviewedU902dCardinalSourceContext,reviewedU902dCardinalContext,reviewedU902dCardinalPolicy,sampleReviewedU902dCardinalFrame,verifyReviewedU902dCardinalPrior,REVIEWED_U902D_CARDINAL_SOURCE as SOURCE} from './hanja-stroke-cardinal-contact-u902d.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url))
const sha=(v:Buffer|string)=>createHash('sha256').update(v).digest('hex')
const f=JSON.parse(bytes(SOURCE.fixture).toString()).u902d
const ctx=makeReviewedU902dCardinalSourceContext(f.fullProof,f.identity,f.strokes)
test('逭 bands3 share exact full5 canonical and original lineY, P and weights',()=>{
 assert(ctx);assert.equal(ctx,reviewedU902dCardinalContext(f.strokes))
 assert.equal(sha(bytes(SOURCE.fixture)),SOURCE.fixtureSHA256)
 assert.equal(sha(JSON.stringify(f.strokes)),SOURCE.geometrySHA256)
 assert.equal(sha(bytes(SOURCE.sourceContextModule)),SOURCE.sourceContextSHA256)
 assert.equal(sha(bytes(SOURCE.proofFile)),SOURCE.proofSHA256)
 const proof=JSON.parse(bytes(SOURCE.proofFile).toString())
 assert.deepEqual(proof.independentNewExactFractionProofs.map((z:any)=>[z.pen,z.slabs.length,z.eventFrontiers.length]),[[5,6,7],[7,6,7],[11,6,7]])
 for(const [pen,raw]of [[5,12],[7,15],[11,3]]){
  const p=reviewedU902dCardinalPolicy(ctx,pen-1,1);assert(p)
  assert.deepEqual(p.segment,f.strokes[pen-1][1]);assert.deepEqual(p.predecessor,f.strokes[pen-1][0])
  assert.equal(p.origin,f.fullProof.trace[raw][0].args[1]/2)
  assert.equal('revealPath'in p.segment,false);assert.equal('revealWidth'in p.segment,false)
  assert.equal(p.segment.weight,f.strokes[pen-1][1].weight)
 }
 const changed=structuredClone(f.strokes);changed[0][0].weight++
 assert.equal(reviewedU902dCardinalContext(changed),null)
 assert.equal(reviewedU902dCardinalPolicy({...ctx},4,1),null)
 assert.equal(reviewedU902dCardinalPolicy(ctx,4,0),null)
 assert.equal(SOURCE.nativeApproval,false);assert.equal(SOURCE.runtimeApplied,false)
})
test('逭 bands are empty at0, source-original direct at1 and retain finite original outer progress',()=>{
 assert(ctx)
 for(const pen of[5,7,11]){
  const p=reviewedU902dCardinalPolicy(ctx,pen-1,1);assert(p)
  const empty=sampleReviewedU902dCardinalFrame(p,p.segment,0,0);assert.equal(empty.visible,false);assert.equal(empty.clip,null)
  for(const progress of[1e-6,.01,.03,.5,.99999999]){
   const frame=sampleReviewedU902dCardinalFrame(p,p.segment,progress,1);assert(frame.clip)
   assert.equal(frame.progress,progress);assert.equal(frame.UARead,false);assert.equal(frame.originalPDirect,false)
   assert.equal(frame.clip.y,p.origin-p.negativeExtent*progress)
   assert.equal(frame.clip.height,(p.negativeExtent+p.positiveExtent)*progress)
   assert(frame.clip.y<=p.origin&&frame.clip.y+frame.clip.height>=p.origin)
   assert.equal(frame.clip.width,p.segment.bounds[2]-p.segment.bounds[0])
  }
  const end=sampleReviewedU902dCardinalFrame(p,p.segment,1,1);assert.equal(end.originalPDirect,true);assert.equal(end.clip,null)
  assert.throws(()=>sampleReviewedU902dCardinalFrame(p,p.segment,.01,.99999999))
  assert.throws(()=>sampleReviewedU902dCardinalFrame({...p},p.segment,.01,1))
  assert.throws(()=>sampleReviewedU902dCardinalFrame(p,{...p.segment,weight:0},.01,1))
  assert.throws(()=>sampleReviewedU902dCardinalFrame(p,p.segment,NaN,1))
 }
})
class N{
 namespaceURI='http://www.w3.org/2000/svg';isConnected=true;children:N[]=[];parentElement:N|null=null;ownerSVGElement:N|null=null;ownerDocument:any;attrs:Record<string,string>={};localName:string
 constructor(name:string){this.localName=name}
 get parentNode(){return this.parentElement}
 get previousElementSibling(){const a=this.parentElement?.children||[];return a[a.indexOf(this)-1]||null}
 get nextElementSibling(){const a=this.parentElement?.children||[];return a[a.indexOf(this)+1]||null}
 getAttribute(k:string){return this.attrs[k]??null}
}
function tree(p:any){
 const doc:any={};doc.defaultView={document:doc,getComputedStyle:()=>({transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',fillRule:'nonzero',stroke:'none',fill:'rgb(0, 0, 0)',getPropertyValue:()=> 'none'})}
 const svg=new N('svg'),pen=new N('g'),previous=new N('path'),g=new N('g')
 for(const n of[svg,pen,previous,g]){n.ownerDocument=doc;n.ownerSVGElement=n===svg?null:svg}
 svg.children=[pen];pen.parentElement=svg;pen.children=[previous,g];previous.parentElement=g.parentElement=pen
 pen.attrs['data-outline-stroke']=String(p.pen);g.attrs['data-stroke-start-gate']=p.id;previous.attrs.d=p.predecessor.outline
 return {svg,pen,previous,g}
}
test('逭 actual completed sole original H is required before/after each band commit',()=>{
 assert(ctx)
 for(const pen of[5,7,11]){
  const p=reviewedU902dCardinalPolicy(ctx,pen-1,1);assert(p)
  const t=tree(p),g=t.g as unknown as SVGGElement
  assert(verifyReviewedU902dCardinalPrior(p,g,1))
  sampleReviewedU902dCardinalFrame(p,p.segment,.03,1)
  assert(verifyReviewedU902dCardinalPrior(p,g,1))
  assert.equal(verifyReviewedU902dCardinalPrior(p,g,.99999999),false)
  for(const [key,value]of [['mask','url(#old)'],['d',p.predecessor.outline+' '],['transform','translate(0 0)']]){
   const old=t.previous.attrs[key];t.previous.attrs[key]=value
   assert.equal(verifyReviewedU902dCardinalPrior(p,g,1),false)
   if(old===undefined)delete t.previous.attrs[key];else t.previous.attrs[key]=old
  }
  t.pen.attrs['data-outline-stroke']='99';assert.equal(verifyReviewedU902dCardinalPrior(p,g,1),false);t.pen.attrs['data-outline-stroke']=String(p.pen)
  t.previous.ownerSVGElement=new N('svg');assert.equal(verifyReviewedU902dCardinalPrior(p,g,1),false);t.previous.ownerSVGElement=t.svg
  const wrap=new N('g'),duplicate=new N('path')
  for(const n of[wrap,duplicate]){n.ownerDocument=t.g.ownerDocument;n.ownerSVGElement=t.svg}
  wrap.parentElement=t.pen;wrap.attrs['data-stroke-reveal-progress']='1';wrap.children=[t.previous,duplicate]
  t.previous.parentElement=duplicate.parentElement=wrap;t.pen.children=[wrap,t.g];duplicate.attrs.d=p.predecessor.outline
  assert.equal(verifyReviewedU902dCardinalPrior(p,g,1),false)
 }
})
