import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {makeReviewedU902dSourceContext,reviewedU902dContext,reviewedU902dPolicy,measureReviewedU902dFrame,commitReviewedU902dCaps,reviewedU902dPreviousComplete,REVIEWED_U902d_SOURCE as SOURCE,REVIEWED_U902d_PROOFS as PROOFS} from './hanja-stroke-start-caps-u902d.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url))
const sha=(v:Buffer|string)=>createHash('sha256').update(v).digest('hex')
function tree(policy:any){
 const doc:any={},view:any={document:doc},all:any[]=[];doc.defaultView=view
 const node=(name:string,attrs:Record<string,string>={},parent:any=null):any=>{
  const n:any={localName:name,parentElement:parent,attrs:{...attrs},children:[],isConnected:true,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,ownerSVGElement:null,
   getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v},removeAttribute(k:string){delete this.attrs[k]}}
  Object.defineProperty(n,'previousElementSibling',{get(){const i=this.parentElement?.children.indexOf(this);return i>0?this.parentElement.children[i-1]:null}})
  Object.defineProperty(n,'nextElementSibling',{get(){const i=this.parentElement?.children.indexOf(this);return this.parentElement?.children[i+1]??null}})
  if(parent)parent.children.push(n);all.push(n);return n
 }
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(policy.pen)},owner)
 const prior=policy.requiresPrevious?node('path',{d:policy.previousSegment.outline},pen):null
 const id='new-u902d',g=node('g',{'data-stroke-start-gate':policy.id,'data-u902d-progress':'0','data-u902d-clip':id},pen),defs=node('defs',{},g)
 const mask=node('mask',{id:id+'-u902d-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'},defs)
 const common={'data-growing-owner':id}
 const measurement=node('path',{...common,id:id+'-u902d-measure',d:policy.segment.revealPath,'data-u902d-measurement':'true'},defs)
 const guide=node('path',{...common,id:id+'-u902d-guide',d:policy.segment.revealPath,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'},mask)
 const startCap=node('circle',common,mask),endCap=node('circle',common,mask),ink=node('path',{...common,d:policy.segment.outline,mask:'url(#'+id+'-u902d-growing)'},g)
 for(const n of all)if(n!==owner)n.ownerSVGElement=owner
 view.getComputedStyle=()=>({transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'rgb(0, 0, 0)',getPropertyValue:()=> 'none'})
 const q=policy.segment.revealPath.match(/-?\d+(?:\.\d+)?/g).map(Number)
 measurement.getTotalLength=()=>100
 measurement.getPointAtLength=(d:number)=>{const t=d/100;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return {g,prior,pen,id,measurement,nodes:{measurement,guide,startCap,endCap,ink},setProgress:(p:number)=>g.attrs['data-u902d-progress']=String(p)}
}
test('逭 caps5 share exact whole foot canonical; new initial/fullQ proofs and unchanged cardinal facts are pinned',()=>{
 const f=JSON.parse(bytes(SOURCE.sourceCacheFile).toString()).u902d,proof=JSON.parse(bytes(SOURCE.proofFile).toString())
 assert.equal(sha(bytes(SOURCE.sourceCacheFile)),SOURCE.sourceCacheSHA256)
 assert.equal(sha(JSON.stringify(f.strokes)),SOURCE.geometrySHA256)
 assert.equal(sha(bytes(SOURCE.sourceContextModule)),SOURCE.sourceContextModuleSHA256)
 assert.equal(sha(bytes(SOURCE.proofFile)),SOURCE.proofSHA256)
 assert.deepEqual(PROOFS,proof.initialCertificates)
 assert.deepEqual(proof.fullQCoverageCertificates.map((x:any)=>[x.pen,x.mask,x.coverLeaves.length]),[[2,1,29],[3,2,23],[9,1,33],[10,1,33]])
 const reuse=proof.reusedFullQCoverage[0];assert.equal(reuse.recomputed,false);assert.equal(sha(bytes(reuse.path)),reuse.SHA256)
 assert.equal(proof.compound3m2.guideQ0InsidePriorH,false);assert.equal(proof.compound3m2.insidePriorH,true)
 const ctx=makeReviewedU902dSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx)
 assert.equal(ctx,reviewedU902dContext(f.strokes))
 const foreign=structuredClone(f.strokes);foreign[0][0].weight++
 assert.equal(makeReviewedU902dSourceContext(f.fullProof,f.identity,foreign),null)
 assert.equal(makeReviewedU902dSourceContext(f.fullProof,{...f.identity,sourceRoot:'u902d-vs2'},f.strokes),null)
 assert.equal(reviewedU902dPolicy({...ctx},1,0),null)
 for(const [pen,mask]of SOURCE.targets){
  const p=reviewedU902dPolicy(ctx,pen-1,mask-1);assert(p)
  assert.deepEqual(p.segment,f.strokes[pen-1][mask-1]);assert.equal(p.requiresPrevious,pen===3)
  assert.equal(p.certificate.K,pen===2?'1/10':'1/20');assert.equal(p.certificate.T,pen===3?'1':'1/2')
 }
 for(const fact of proof.cardinalFacts){
  const s=f.strokes[fact.pen-1][1]
  const coords=s.outline.match(/-?\d+(?:\.\d+)?/g).map(Number)
  for(let i=0;i<coords.length;i+=2){assert(coords[i]>=s.bounds[0]&&coords[i]<=s.bounds[2]);assert(coords[i+1]>=s.bounds[1]&&coords[i+1]<=s.bounds[3])}
  assert(s.bounds[1]+.03*(s.bounds[3]-s.bounds[1])<fact.previousHBounds[1])
  assert.equal(fact.nativeFailureClaim,false)
 }
 assert.equal(SOURCE.nativeApproval,false);assert.equal(SOURCE.runtimeApplied,false)
 assert.equal(proof.allTimeGrowingPConnectivityProved,false)
})
test('逭 actual new measure/commit contract, taper and completedH before/after gate',()=>{
 const f=JSON.parse(bytes(SOURCE.sourceCacheFile).toString()).u902d,ctx=makeReviewedU902dSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx)
 for(const [pen,mask]of SOURCE.targets){
  const p=reviewedU902dPolicy(ctx,pen-1,mask-1);assert(p);const t=tree(p)
  assert(reviewedU902dPreviousComplete(p,t.g,1))
  for(const progress of[0,1e-6,.01,.5,.99999999]){
   t.setProgress(progress)
   const frame=measureReviewedU902dFrame(p,p.segment,progress,t.measurement,1)
   assert.equal(frame.rho,Math.min(7,progress*100))
   assert.equal(frame.guide,p.segment.revealPath)
   const result=commitReviewedU902dCaps(p,p.segment,progress,t.id,t.nodes,1)
   assert.equal(result.status,progress===0?'empty':'visible')
   if(progress>0){assert.equal(t.nodes.startCap.attrs.r,String(frame.rho));assert.equal(t.nodes.ink.attrs['data-growing-radius'],String(frame.rho))}
  }
  t.setProgress(1);assert.equal(commitReviewedU902dCaps(p,p.segment,1,t.id,t.nodes,1).status,'complete')
  if(p.requiresPrevious){
   assert.equal(reviewedU902dPreviousComplete(p,t.g,.99999999),false)
   t.prior.attrs.d+=' ';t.setProgress(.01)
   assert.equal(commitReviewedU902dCaps(p,p.segment,.01,t.id,t.nodes,1).status,'hidden')
   t.prior.attrs.d=p.previousSegment!.outline
   const saved=t.measurement.getPointAtLength
   t.measurement.getPointAtLength=(d:number)=>{const q=saved(d);t.prior.attrs.d+=' ';return q}
   assert.equal(commitReviewedU902dCaps(p,p.segment,.01,t.id,t.nodes,1).status,'hidden')
   t.measurement.getPointAtLength=saved;t.prior.attrs.d=p.previousSegment!.outline
   assert(reviewedU902dPreviousComplete(p,t.g,1))
   t.prior.attrs.mask='url(#fake)';assert.equal(reviewedU902dPreviousComplete(p,t.g,1),false);delete t.prior.attrs.mask
   t.prior.ownerSVGElement={};assert.equal(reviewedU902dPreviousComplete(p,t.g,1),false)
  }
 }
})
