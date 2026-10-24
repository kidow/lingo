import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU9ad3HkcsCardinalSourceContext,reviewedU9ad3HkcsCardinalContext,reviewedU9ad3HkcsCardinalPolicy,sampleReviewedU9ad3HkcsCardinalFrame,verifyReviewedU9ad3HkcsCardinalPrior} from './hanja-stroke-cardinal-contact-u9ad3-hkcs.ts'
const fixed=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u9ad3-hkcs-2026-10-24/fixtures.json',import.meta.url),'utf8')).hkcs_m9ad3
test('髓 four independent P bands bind canonical source and require completed previous H',()=>{
 const context=makeReviewedU9ad3HkcsCardinalSourceContext(fixed.fullProof,fixed.identity,fixed.strokes);assert.ok(context);assert.equal(context,reviewedU9ad3HkcsCardinalContext(fixed.strokes))
 for(const[pen,origin,positive]of[[2,12,27],[8,50,39],[17,47,30],[22,54,26.5]]){
  const policy=reviewedU9ad3HkcsCardinalPolicy(context,pen-1,1);assert.ok(policy);assert.deepEqual(policy.segment,fixed.strokes[pen-1][1]);assert.deepEqual(policy.predecessor,fixed.strokes[pen-1][0])
  for(const p of[Number.EPSILON,.000001,.03,.5,.999999,1]){
   const frame=sampleReviewedU9ad3HkcsCardinalFrame(policy,policy.segment,p,1);assert.equal(frame.UARead,false);assert.equal(frame.requiresCompletedOriginalPredecessor,true);assert.equal(frame.originalPDirect,p===1)
   if(p!==1)assert.deepEqual(frame.clip,{x:policy.segment.bounds[0],y:origin-3.5*p,width:policy.segment.bounds[2]-policy.segment.bounds[0],height:(3.5+positive)*p})
  }
  assert.equal(sampleReviewedU9ad3HkcsCardinalFrame(policy,policy.segment,0,0).visible,false)
  for(const p of[-1,1.1,NaN])assert.throws(()=>sampleReviewedU9ad3HkcsCardinalFrame(policy,policy.segment,p,1))
  for(const previous of[0,.99999999,NaN])assert.throws(()=>sampleReviewedU9ad3HkcsCardinalFrame(policy,policy.segment,.03,previous))
  assert.throws(()=>sampleReviewedU9ad3HkcsCardinalFrame({...policy} as never,policy.segment,.03,1));assert.throws(()=>sampleReviewedU9ad3HkcsCardinalFrame(policy,{...policy.segment,weight:policy.segment.weight+1},.03,1))
 }
 const wrong=structuredClone(fixed.strokes);wrong[1][0].outline+=' ';assert.equal(reviewedU9ad3HkcsCardinalContext(wrong),null)
 const full=structuredClone(fixed.fullProof);full.groups[18].raw[0]=1;assert.equal(makeReviewedU9ad3HkcsCardinalSourceContext(full,fixed.identity,fixed.strokes),null)
 assert.equal(reviewedU9ad3HkcsCardinalPolicy(context,0,0),null)
})
type Stub={localName:string;namespaceURI:string;ownerDocument:any;ownerSVGElement:any;isConnected:boolean;parentNode:any;parentElement:any;previousElementSibling:any;nextElementSibling:any;children:Stub[];attrs:Map<string,string>;style:Record<string,string>;getAttribute:(k:string)=>string|null}
const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'rgb(0, 0, 0)'}
function tree(outline:string){
 const doc:any={};doc.defaultView={document:doc,getComputedStyle:(n:Stub)=>({...style,...n.style,getPropertyValue:(k:string)=>n.style[k]??'none'})}
 const node=(name:string):Stub=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,ownerSVGElement:null,isConnected:true,parentNode:null,parentElement:null,previousElementSibling:null,nextElementSibling:null,children:[],attrs:new Map,style:{},getAttribute(k){return this.attrs.get(k)??null}})
 const owner=node('svg'),parent=node('g'),prior=node('path'),g=node('g')
 const add=(p:Stub,n:Stub)=>{n.parentNode=n.parentElement=p;n.ownerSVGElement=owner;p.children.push(n)}
 add(owner,parent);add(parent,prior);add(parent,g);g.previousElementSibling=prior;prior.nextElementSibling=g;prior.attrs.set('d',outline)
 return{owner,parent,prior,g}
}
test('髓 actual prior-H DOM gate rejects foreign/masked/hidden/transformed/partial source',()=>{
 const c=makeReviewedU9ad3HkcsCardinalSourceContext(fixed.fullProof,fixed.identity,fixed.strokes);const p=reviewedU9ad3HkcsCardinalPolicy(c,1,1);assert.ok(p)
 const check=(x:ReturnType<typeof tree>,n=1)=>verifyReviewedU9ad3HkcsCardinalPrior(p,x.g as unknown as SVGGElement,n)
 assert.equal(check(tree(p.predecessor.outline)),true)
 const extra=tree(p.predecessor.outline);extra.prior.localName='g';extra.prior.children=[{localName:'circle'} as Stub];assert.equal(check(extra),false)
 const changes=[(x:ReturnType<typeof tree>)=>x.prior.attrs.set('d',p.predecessor.outline+' '),(x:ReturnType<typeof tree>)=>x.prior.attrs.set('mask','url(#x)'),(x:ReturnType<typeof tree>)=>x.prior.attrs.set('pathLength','1'),(x:ReturnType<typeof tree>)=>x.prior.style.opacity='.5',(x:ReturnType<typeof tree>)=>x.parent.style.transform='matrix(1,0,0,1,1,0)',(x:ReturnType<typeof tree>)=>x.parent.style.translate='1px',(x:ReturnType<typeof tree>)=>x.prior.style.visibility='hidden',(x:ReturnType<typeof tree>)=>x.prior.ownerSVGElement={},(x:ReturnType<typeof tree>)=>x.prior.isConnected=false]
 for(const change of changes){const x=tree(p.predecessor.outline);change(x);assert.equal(check(x),false)}
 assert.equal(check(tree(p.predecessor.outline),.999999),false)
})
