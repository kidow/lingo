import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8609HkcsSourceContext,reviewedU8609HkcsPolicy} from './hanja-stroke-start-caps-u8609-hkcs.ts'
import {makeReviewedU8609HkcsUnionPointSourceContext as source,reviewedU8609HkcsUnionPointPolicy as policy,sampleReviewedU8609HkcsUnionPointFrame as sample,verifyReviewedU8609HkcsUnionPointPrior as prior,REVIEWED_U8609_HKCS_UNION_POINT_SOURCE as facts,REVIEWED_U8609_HKCS_UNION_POINT_INPUT_SHA256 as pins} from './hanja-stroke-union-point-windows-u8609-hkcs.ts'
const f=fixture.hkcs_m8609,s=f.strokes as HanjaOutlineStrokes,c=source(f.fullProof,f.identity,s)
assert(c)
const targets=[[11,2],[12,1],[18,2]] as const
const clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
test('蘉 three point policies retain the exact private whole-source gate',()=>{
 assert.equal(c,makeReviewedU8609HkcsSourceContext(f.fullProof,f.identity,s))
 for(let p=0;p<s.length;p++)for(let m=0;m<s[p].length;m++)assert.equal(!!policy(c,p,m),targets.some(t=>t[0]===p+1&&t[1]===m+1))
 assert.equal(policy({...c},10,1),null)
 const changed=clone(s);(changed[10][1] as {weight:number}).weight+=.1;assert.equal(source(f.fullProof,f.identity,changed),null)
 assert.equal(source({...f.fullProof,glyph:'other'},f.identity,s),null)
 assert.equal(source(f.fullProof,{...f.identity,sourceRoot:'other'},s),null)
 let reads=0;const getter=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}})
 assert.equal(source(f.fullProof,getter,s),null);assert.equal(reads,0)
})
test('蘉 partial rectangles are nested and shrink in both axes; endpoints preserve the source',()=>{
 for(const[pen,mask]of targets){
  const p=policy(c,pen-1,mask-1);assert(p)
  let prev={x:p.anchor[0],y:p.anchor[1],right:p.anchor[0],bottom:p.anchor[1]}
  for(const t of[0,1e-8,.0001,.001,.01,.03,.1,.5,.99,1]){
   const v=sample(p,p.segment,t,1,true);assert.equal(v.visible,t!==0);assert.equal(v.originalPDirect,t===1);assert.equal(v.sourceGuide,p.segment.revealPath);assert.equal(v.UARead,false)
   if(v.clip){const r=v.clip,right=r.x+r.width,bottom=r.y+r.height;assert(r.x<=prev.x+1e-12&&r.y<=prev.y+1e-12&&right>=prev.right-1e-12&&bottom>=prev.bottom-1e-12);assert(Math.abs(r.width*r.width+r.height*r.height-(p.width*p.width+p.height*p.height)*t*t)<1e-10);prev={x:r.x,y:r.y,right,bottom}}
   else assert(t===0||t===1)
  }
  assert.deepEqual(p.commonKernelAnchor,p.anchor)
  if(mask===2){assert.equal(p.completedPriorFingerprint,createHash('sha256').update(JSON.stringify(s[pen-1][0])).digest('hex'));assert.throws(()=>sample(p,p.segment,.01));assert.throws(()=>sample(p,p.segment,.01,.99,true));assert.throws(()=>sample(p,p.segment,1,1,false));assert.equal(sample(p,p.segment,0).visible,false)}
  else{assert.equal(p.predecessor,null);assert.equal(p.completedPriorFingerprint,null);assert(sample(p,p.segment,.01).visible)}
  const forged={...p};assert.throws(()=>sample(forged,p.segment,.01,1,true))
  for(const patch of[{outline:p.segment.outline+' '},{revealPath:p.segment.revealPath+' '},{revealWidth:15},{weight:p.segment.weight+.1},{bounds:[0,0,100,100] as const}])assert.throws(()=>sample(p,{...p.segment,...patch},.01,1,true))
  for(const n of[-1,1.1,NaN,Infinity])assert.throws(()=>sample(p,p.segment,n,1,true))
  const old=reviewedU8609HkcsPolicy(c,pen-1,mask-1);assert(old);assert.throws(()=>sample(old as unknown as typeof p,p.segment,.01,1,true))
 }
 const p=policy(c,17,1);assert(p);const r=sample(p,p.segment,.1,1,true).clip;assert(r);const b=p.predecessor!.bounds;assert(r.x>=b[0]&&r.x+r.width<=b[2]&&r.y>=b[1]&&r.y+r.height<=b[3])
})
type Style={display:string;visibility:string;opacity:string;fillOpacity:string;strokeOpacity:string;transform:string;filter:string;clipPath:string;mixBlendMode:string;fillRule:string;stroke:string;strokeDasharray:string;fill:string;props:Record<string,string>;getPropertyValue:(k:string)=>string}
type Doc={defaultView:{document:Doc;getComputedStyle:(n:Node)=>Style}|null}
type Node={localName:string;nodeType:number;namespaceURI:string;isConnected:boolean;ownerDocument:Doc;ownerSVGElement:Node|null;parentNode:Node|null;children:Node[];attrs:Map<string,string>;style:Style;getAttribute:(k:string)=>string|null}

function tree(p:NonNullable<ReturnType<typeof policy>>){
 const doc:Doc={defaultView:null};doc.defaultView={document:doc,getComputedStyle:n=>n.style}
 const make=(localName:string):Node=>{const props:Record<string,string>={'mask-image':'none'},attrs=new Map<string,string>();const style:Style={display:'inline',visibility:'visible',opacity:'1',fillOpacity:'1',strokeOpacity:'1',transform:'none',filter:'none',clipPath:'none',mixBlendMode:'normal',fillRule:'nonzero',stroke:'none',strokeDasharray:'none',fill:'rgb(142,142,255)',props,getPropertyValue:k=>props[k]??''};return{localName,nodeType:1,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerDocument:doc,ownerSVGElement:null,parentNode:null,children:[],attrs,style,getAttribute:k=>attrs.get(k)??null}}
 const owner=make('svg'),outer=make('g'),pens=Array.from({length:20},()=>make('g')),pen=pens[p.pen-1],h=make('path'),g=make('g')
 owner.attrs.set('viewBox','0 0 100 100');owner.children=[outer];outer.parentNode=owner;outer.children=pens;outer.attrs.set('data-stroke-outlines','true')
 for(const n of[outer,...pens,h,g])n.ownerSVGElement=owner
 for(const n of pens)n.parentNode=outer
 pen.attrs.set('data-outline-stroke',String(p.pen));pen.children=[h,g];h.parentNode=g.parentNode=pen;h.attrs.set('d',p.predecessor!.outline);h.style.props.d='path("'+p.predecessor!.outline+'")'
 g.attrs.set('data-stroke-start-gate',p.id);g.attrs.set('data-stroke-reveal-policy',p.kind);g.attrs.set('data-u8609-union-point-fingerprint',p.proofFingerprint);g.attrs.set('data-u8609-union-point-clip','review-'+(p.pen-1)+'-'+(p.mask-1))
 return{doc,owner,outer,pen,h,g,make}
}
test('蘉 compound prior DOM checks exact source, ownership, paint and same-frame completion',()=>{
 for(const pen of[11,18]){
  const p=policy(c,pen-1,1);assert(p);const verify=(t:ReturnType<typeof tree>,progress=1)=>prior(p,t.g as unknown as SVGGElement,progress)
  assert(verify(tree(p)));assert.equal(verify(tree(p),.99),false)
  const mutations:Array<(t:ReturnType<typeof tree>)=>void>=[
   t=>t.h.attrs.set('d',p.predecessor!.outline+' '),t=>t.h.attrs.set('pathLength','1'),t=>t.h.attrs.set('mask','none'),t=>{t.h.style.fill='rgba(1,2,3,.5)'},t=>{t.pen.style.opacity='.5'},t=>{t.g.style.transform='matrix(1,0,0,1,1,0)'},t=>{t.h.style.props.d='path("M0 0 L1 1 Z")'},t=>t.g.attrs.set('data-u8609-union-point-fingerprint','other'),t=>t.g.attrs.set('data-u8609-union-point-clip','review-0-1'),t=>t.g.attrs.set('data-stroke-start-gate','other'),t=>t.g.attrs.set('data-stroke-reveal-policy','other'),t=>{t.pen.children=[t.g,t.h]},t=>{t.h.parentNode=t.outer},t=>{t.outer.children.reverse()},t=>{t.h.ownerSVGElement=t.make('svg')},t=>t.owner.attrs.set('viewBox','0 0 200 200'),t=>{t.h.isConnected=false}
  ]
  for(const mutate of mutations){const t=tree(p);mutate(t);assert.equal(verify(t),false)}
  const t=tree(p),read=t.h.style.getPropertyValue;t.h.style.getPropertyValue=k=>{if(k==='d')t.pen.children=[t.g,t.h];return read(k)};assert.equal(verify(t),false)
  assert.equal(prior({...p},tree(p).g as unknown as SVGGElement,1),false)
 }
 const p=policy(c,11,0);assert(p);assert.equal(prior(p,null,1),false)
})
test('蘉 source bounds and proof pins do not claim native direction or clock approval',()=>{
 for(const[path,sha]of Object.entries(pins))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),sha)
 assert.equal(facts.nativePriorDOMGuaranteedByFactory,false);assert.equal(facts.nativeApproval,false);assert.equal(facts.runtimeApplied,false);assert.equal(facts.originalClockIdentityApproved,false);assert.equal(facts.source19OtherFamiliesImpossible,false)
 assert.deepEqual(facts.compoundPriorOriginalHAndOpaqueDOMRequired,[11,18])
})

