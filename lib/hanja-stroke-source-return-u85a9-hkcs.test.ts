import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU85a9HkcsSourceReturnSourceContext,reviewedU85a9HkcsSourceReturnContext,reviewedU85a9HkcsSourceReturnPolicy,sampleReviewedU85a9HkcsSourceReturnFrame,verifyReviewedU85a9HkcsSourceReturnPrior} from './hanja-stroke-source-return-u85a9-hkcs.ts'
const fixed=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u85a9-hkcs-2026-10-24/fixtures.json',import.meta.url),'utf8'))['hkcs_m85a9']
test('薩6m2 original P returns left continuously and requires exact completed direct6m1 before and after commit',()=>{
 const context=makeReviewedU85a9HkcsSourceReturnSourceContext(fixed.fullProof,fixed.identity,fixed.strokes)
 assert.ok(context);assert.equal(context,reviewedU85a9HkcsSourceReturnContext(fixed.strokes))
 const policy=reviewedU85a9HkcsSourceReturnPolicy(context,5,1);assert.ok(policy)
 assert.deepEqual(policy.segment,fixed.strokes[5][1]);assert.deepEqual(policy.predecessor,fixed.strokes[5][0])
 let lastWidth=0
 for(const progress of [1e-6,.01,.03,.5,.99999999]){
  const f=sampleReviewedU85a9HkcsSourceReturnFrame(policy,policy.segment,progress,1)
  assert.equal(f.phase,'source-x-prefix');assert.equal(f.UARead,false);assert.equal(f.paintOriginalPOnce,true)
  assert.deepEqual(f.clip,{x:34.25-12.95*progress,y:69.4,width:12.95*progress,height:77.95-69.4})
  assert.ok(f.clip);assert.ok(f.clip.width>lastWidth);lastWidth=f.clip.width
 }
 const empty=sampleReviewedU85a9HkcsSourceReturnFrame(policy,policy.segment,0,0);assert.equal(empty.visible,false)
 const full=sampleReviewedU85a9HkcsSourceReturnFrame(policy,policy.segment,1,1);assert.equal(full.originalPDirect,true);assert.equal(full.originalSourceFull,true);assert.equal(full.clip,null)
 for(const p of [-1,NaN,Infinity,1.01])assert.throws(()=>sampleReviewedU85a9HkcsSourceReturnFrame(policy,policy.segment,p,1))
 for(const p of [0,.9999999,NaN])assert.throws(()=>sampleReviewedU85a9HkcsSourceReturnFrame(policy,policy.segment,.5,p))
 assert.throws(()=>sampleReviewedU85a9HkcsSourceReturnFrame({...policy} as never,policy.segment,.5,1))
 assert.throws(()=>sampleReviewedU85a9HkcsSourceReturnFrame(policy,{...policy.segment,revealPath:policy.segment.revealPath+' '},.5,1))
 assert.equal(reviewedU85a9HkcsSourceReturnPolicy(context,5,0),null)
 class Stub{
  localName:string;attrs=new Map<string,string>();style:Record<string,string>={};children:Stub[]=[];parentElement:Stub|null=null;ownerSVGElement:Stub|null=null;ownerDocument=doc;isConnected=true
  constructor(name:string){this.localName=name}
  getAttribute(k:string){return this.attrs.get(k)??null}
  get previousElementSibling():Stub|null{if(!this.parentElement)return null;return this.parentElement.children[this.parentElement.children.indexOf(this)-1]??null}
  get nextElementSibling():Stub|null{if(!this.parentElement)return null;return this.parentElement.children[this.parentElement.children.indexOf(this)+1]??null}
 }
 const doc={defaultView:{getComputedStyle:(n:Stub)=>({transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',...n.style,getPropertyValue:(k:string)=>n.style[k]??'none'})}}
 function nodes(){
  const owner=new Stub('svg'),pen=new Stub('g'),previous=new Stub('g'),ink=new Stub('path'),g=new Stub('g')
  owner.children=[pen];pen.parentElement=owner;pen.children=[previous,g];previous.parentElement=pen;g.parentElement=pen;previous.children=[ink];ink.parentElement=previous
  for(const n of [pen,previous,ink,g])n.ownerSVGElement=owner
  pen.attrs.set('data-outline-stroke','6');g.attrs.set('data-stroke-start-gate',policy!.id)
  previous.attrs.set('data-stroke-start-gate','u85a9-hkcs-source-prefix-6-1');previous.attrs.set('data-stroke-reveal-policy','source-P-y-prefix-u85a9-hkcs');previous.attrs.set('data-stroke-reveal-progress','1')
  ink.attrs.set('d',policy!.predecessor.outline)
  for(const [k,v] of Object.entries({committed:'true',progress:'1',phase:'full','direct-original':'true','source-full':'true','one-p':'true','ua-read':'false'}))ink.attrs.set('data-u85a9-hkcs-source-prefix-'+k,v)
  return {owner,pen,previous,ink,g}
 }
 const valid=nodes();assert.equal(verifyReviewedU85a9HkcsSourceReturnPrior(policy,valid.g as unknown as SVGGElement,1),true)
 const mutations=[(n:ReturnType<typeof nodes>)=>n.ink.attrs.set('mask','url(#old-q-tube)'),(n:ReturnType<typeof nodes>)=>n.ink.attrs.set('d','M0 0'),(n:ReturnType<typeof nodes>)=>n.previous.attrs.set('data-stroke-reveal-progress','.9999999'),(n:ReturnType<typeof nodes>)=>n.previous.children.push(new Stub('path')),(n:ReturnType<typeof nodes>)=>n.ink.style.opacity='.5',(n:ReturnType<typeof nodes>)=>n.ink.style.visibility='hidden',(n:ReturnType<typeof nodes>)=>n.pen.style.transform='scale(2)',(n:ReturnType<typeof nodes>)=>n.ink.ownerSVGElement=new Stub('svg'),(n:ReturnType<typeof nodes>)=>n.ink.attrs.set('data-u85a9-hkcs-source-prefix-source-full','false'),(n:ReturnType<typeof nodes>)=>n.pen.children.reverse()]
 for(const mutate of mutations){const n=nodes();mutate(n);assert.equal(verifyReviewedU85a9HkcsSourceReturnPrior(policy,n.g as unknown as SVGGElement,1),false)}
 assert.equal(verifyReviewedU85a9HkcsSourceReturnPrior(policy,valid.g as unknown as SVGGElement,.99999999),false)
 valid.ink.attrs.set('clip-path','url(#changed-after-commit)');assert.equal(verifyReviewedU85a9HkcsSourceReturnPrior(policy,valid.g as unknown as SVGGElement,1),false)
})
