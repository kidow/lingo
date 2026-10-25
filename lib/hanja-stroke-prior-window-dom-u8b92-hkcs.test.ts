import test from 'node:test'
import assert from 'node:assert/strict'
import fixture from '../docs/hanja-source-original-u8b92-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8b92PriorWindowSourceContext,reviewedU8b92PriorWindowPolicy} from './hanja-stroke-prior-window-u8b92-hkcs.ts'
import {verifyReviewedU8b92PriorWindowPriorDOM} from './hanja-stroke-prior-window-dom-u8b92-hkcs.ts'
type Style={display:string;visibility:string;opacity:string;fillOpacity:string;strokeOpacity:string;transform:string;filter:string;clipPath:string;mixBlendMode:string;fillRule:string;stroke:string;fill:string;props:Record<string,string>;getPropertyValue:(k:string)=>string}
type Doc={defaultView:{document:Doc;getComputedStyle:(n:Node)=>Style}|null}
type Node={localName:string;nodeType:number;namespaceURI:string;isConnected:boolean;ownerDocument:Doc;ownerSVGElement:Node|null;parentNode:Node|null;children:Node[];attrs:Map<string,string>;style:Style;getAttribute:(k:string)=>string|null}
const f=fixture.hkcs_m8b92,c=makeReviewedU8b92PriorWindowSourceContext(f.fullProof,f.identity,f.strokes as HanjaOutlineStrokes)
assert(c)
const policy=reviewedU8b92PriorWindowPolicy(c,13,1)
assert(policy)
function tree(){
 const doc:Doc={defaultView:null};doc.defaultView={document:doc,getComputedStyle:n=>n.style}
 const make=(localName:string):Node=>{
  const props:Record<string,string>={'mask-image':'none'},attrs=new Map<string,string>()
  const style:Style={display:'inline',visibility:'visible',opacity:'1',fillOpacity:'1',strokeOpacity:'1',transform:'none',filter:'none',clipPath:'none',mixBlendMode:'normal',fillRule:'nonzero',stroke:'none',fill:'rgb(142, 142, 255)',props,getPropertyValue:k=>props[k]??''}
  return{localName,nodeType:1,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerDocument:doc,ownerSVGElement:null,parentNode:null,children:[],attrs,style,getAttribute:k=>attrs.get(k)??null}
 }
 const owner=make('svg'),pen=make('g'),prior=make('path'),g=make('g')
 owner.attrs.set('viewBox','0 0 100 100');owner.children=[pen];pen.parentNode=owner
 for(const n of[pen,prior,g])n.ownerSVGElement=owner
 pen.children=[prior,g];prior.parentNode=g.parentNode=pen
 for(const n of[pen,prior]){n.attrs.set('data-u8b92-prior14-owner','review-u8b92-prior14');n.attrs.set('data-u8b92-prior14-pen','14')}
 prior.attrs.set('data-u8b92-prior14-mask','1');prior.attrs.set('data-u8b92-prior14-progress','1');prior.attrs.set('d',policy!.priorSegment.outline);prior.style.props.d='path("'+policy!.priorSegment.outline+'")'
 g.attrs.set('data-stroke-start-gate',policy!.id);g.attrs.set('data-stroke-reveal-policy',policy!.kind);g.attrs.set('data-u8b92-prior-window-clip','review-13-1')
 return{doc,owner,pen,prior,g,make}
}
const verify=(t:ReturnType<typeof tree>,p=1)=>verifyReviewedU8b92PriorWindowPriorDOM(policy!,t.g as unknown as SVGGElement,p)
test('讒14 exact source prior DOM passes with the actual sibling/owner contract',()=>{
 const t=tree();assert(verify(t));t.prior.style.props.d='path("'+policy.priorSegment.outline.replaceAll('L','L ')+'")';assert(verify(t))
 for(const color of ['rgb(1 2 3 / 1)','rgba(1,2,3,1)','rgb(1 2 3 / 100%)']){t.prior.style.fill=color;assert(verify(t))}
})
test('讒14 rejects forged policy, wrong pen/owner/progress and non-direct prior',()=>{
 const mutators:Array<(t:ReturnType<typeof tree>)=>void>=[
  t=>t.prior.attrs.set('data-u8b92-prior14-progress','.5'),t=>t.pen.attrs.set('data-u8b92-prior14-pen','13'),t=>t.prior.attrs.set('data-u8b92-prior14-mask','2'),t=>t.g.attrs.set('data-stroke-reveal-policy','other'),t=>t.g.attrs.set('data-stroke-start-gate','other'),t=>t.g.attrs.set('data-u8b92-prior-window-clip','review-12-1'),t=>t.prior.attrs.set('data-u8b92-prior14-owner','other'),t=>{t.prior.parentNode=t.owner},t=>{t.pen.children=[t.g,t.prior]},t=>t.pen.children.push(t.make('path')),t=>{t.prior.ownerSVGElement=t.make('svg')},t=>{t.prior.isConnected=false},t=>t.owner.attrs.set('viewBox','0 0 200 200'),t=>{t.pen.localName='svg'}
 ]
 for(const mutate of mutators){const t=tree();mutate(t);assert.equal(verify(t),false)}
 const t=tree();assert.equal(verify(t,0),false);assert.equal(verifyReviewedU8b92PriorWindowPriorDOM({...policy},t.g as unknown as SVGGElement,1),false)
 let reads=0;const bad=Object.defineProperty({...policy},'priorSegment',{enumerable:true,get(){reads++;return policy.priorSegment}})
 assert.equal(verifyReviewedU8b92PriorWindowPriorDOM(bad,t.g as unknown as SVGGElement,1),false);assert.equal(reads,0)
})
test('讒14 rejects source/CSS geometry changes and every nonopaque or effected prior',()=>{
 const mutators:Array<(t:ReturnType<typeof tree>)=>void>=[
  t=>t.prior.attrs.set('d',policy.priorSegment.outline+' '),t=>t.prior.attrs.set('pathLength','1'),t=>{t.prior.style.props.d='path("M0 0 L1 1 Z")'},t=>{t.prior.style.props.d='none'},t=>{t.prior.style.fill='rgba(1,2,3,.5)'},t=>{t.prior.style.fill='none'},t=>{t.prior.style.fill='url(#paint)'},t=>{t.prior.style.opacity='.5'},t=>{t.pen.style.opacity='.5'},t=>{t.owner.style.fillOpacity='.5'},t=>{t.prior.style.strokeOpacity='.5'},t=>{t.prior.style.fillRule='evenodd'},t=>{t.prior.style.stroke='black'},t=>{t.g.style.transform='matrix(1,0,0,1,1,0)'},t=>{t.pen.style.filter='blur(1px)'},t=>{t.prior.style.clipPath='url(#clip)'},t=>{t.prior.style.props['mask-image']='url(#mask)'},t=>{t.prior.style.props.translate='1px'},t=>{t.prior.style.visibility='hidden'},t=>{t.prior.style.mixBlendMode='multiply'}
 ]
 for(const name of['mask','clip-path','transform','filter'])mutators.push(t=>t.prior.attrs.set(name,'none'))
 for(const mutate of mutators){const t=tree();mutate(t);assert.equal(verify(t),false)}
})
test('讒14 detects parent/order mutation during computed style reads',()=>{
 const t=tree(),original=t.prior.style.getPropertyValue
 t.prior.style.getPropertyValue=k=>{if(k==='d')t.pen.children=[t.g,t.prior];return original(k)}
 assert.equal(verify(t),false)
 const u=tree(),read=u.prior.style.getPropertyValue
 u.prior.style.getPropertyValue=k=>{if(k==='d')u.prior.parentNode=u.owner;return read(k)}
 assert.equal(verify(u),false)
})
