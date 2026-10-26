import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u85c7-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU85c7HkcsSourceContext} from './hanja-stroke-start-caps-u85c7-hkcs.ts'
import {makeReviewedU85c7HkcsCardinalPointSourceContext as source,reviewedU85c7HkcsCardinalPointPolicy as policy,sampleReviewedU85c7HkcsCardinalPointFrame as sample,verifyReviewedU85c7HkcsCardinalPointPriorDOM as prior,REVIEWED_U85C7_HKCS_CARDINAL_POINT_SOURCE as facts,REVIEWED_U85C7_HKCS_CARDINAL_POINT_INPUT_SHA256 as pins} from './hanja-stroke-cardinal-point-windows-u85c7-hkcs.ts'
const f=fixture.hkcs_m85c7,s=f.strokes as HanjaOutlineStrokes,c=source(f.fullProof,f.identity,s),clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x));assert(c)
const targets=[10,12]
test('藇 exact three-input whole factory exposes only the two unchanged cardinal source policies',()=>{
 assert.equal(c,makeReviewedU85c7HkcsSourceContext(f.fullProof,f.identity,s))
 for(const n of targets){const p=policy(c,n,1);assert(p);assert.deepEqual(p.segment,s[n][1]);assert.deepEqual(p.predecessor,s[n][0]);assert.equal(p.segment.revealPath,undefined);assert.equal(p.segment.revealWidth,undefined);assert.equal(p.segment.direction,'down');assert.equal(policy({...c},n,1),null)}
 for(let pen=0;pen<s.length;pen++)for(let mask=0;mask<s[pen].length;mask++)if(!targets.includes(pen)||mask!==1)assert.equal(policy(c,pen,mask),null)
 const changed=clone(f.fullProof);changed.trace[7][0].args[0]+=.1;assert.equal(source(changed,f.identity,s),null);assert.equal(source(f.fullProof,{...f.identity,sourceRoot:'other'},s),null)
 let reads=0;const getter=Object.defineProperty({...f.identity},'sourceRoot',{enumerable:true,get(){reads++;return f.identity.sourceRoot}});assert.equal(source(f.fullProof,getter,s),null);assert.equal(reads,0)
})
test('藇 both axes converge to zero, preserve nested source bounds and enforce completed opaque prior',()=>{
 for(const n of targets){const p=policy(c,n,1);assert(p);let previous={x:p.anchor[0],y:p.anchor[1],right:p.anchor[0],bottom:p.anchor[1]};assert.equal(sample(p,p.segment,0).visible,false)
  const [left,right,up,down]=p.extents,width=left+right,height=up+down
  for(const t of[1e-8,.0001,.001,.01,.03,.1,.5,.99,1]){const v=sample(p,p.segment,t,1,true);assert.equal(v.originalPDirect,t===1);assert.equal(v.segmentGuideAdded,false);assert.equal(v.UARead,false);if(v.clip){const r=v.clip,endX=r.x+r.width,endY=r.y+r.height;assert(r.x<=previous.x+1e-12&&r.y<=previous.y+1e-12&&endX>=previous.right-1e-12&&endY>=previous.bottom-1e-12);assert(Math.abs(r.width-width*t)<1e-12&&Math.abs(r.height-height*t)<1e-12);previous={x:r.x,y:r.y,right:endX,bottom:endY}}else assert.equal(t,1)}
  assert.throws(()=>sample(p,p.segment,.01));assert.throws(()=>sample(p,p.segment,1,1,false));assert.throws(()=>sample(p,p.segment,.01,.99,true));assert.throws(()=>sample({...p},p.segment,.01,1,true));for(const t of[-1,NaN,Infinity,1.1])assert.throws(()=>sample(p,p.segment,t,1,true))
  for(const patch of[{outline:p.segment.outline+' '},{revealPath:'M0 0 L1 1'},{revealWidth:14},{weight:18},{direction:'up' as const}])assert.throws(()=>sample(p,{...p.segment,...patch},.01,1,true))
 }
})
test('藇 exact prior-exit boundaries identify real bodyP exposure rather than merely a rectangle crossing',()=>{
 for(const n of targets){const p=policy(c,n,1);assert(p);const h=p.predecessor.bounds,body=p.segment.bounds,bottom=h[3],a=p.priorFirstOutsideProgress,down=p.extents[3];assert.equal(a,n===10?4/107:20/841);assert(Math.abs(p.anchor[1]+down*a-bottom)<1e-12)
  for(const t of[a-1e-10,a]){const r:Readonly<{x:number;y:number;width:number;height:number}>|null=sample(p,p.segment,t,1,true).clip;assert(r);assert(r.x>=h[0]&&r.x+r.width<=h[2]+1e-12&&r.y>=h[1]&&r.y+r.height<=bottom+1e-12)}
  const t=a+1e-10,r=sample(p,p.segment,t,1,true).clip;assert(r);const witness=[p.anchor[0],bottom+down*(t-a)/2];assert(witness[0]>body[0]&&witness[0]<body[2]&&witness[1]>bottom&&witness[1]<body[3]);assert(witness[0]>r.x&&witness[0]<r.x+r.width&&witness[1]>r.y&&witness[1]<r.y+r.height)
 }
})
type Style={display:string;visibility:string;opacity:string;fillOpacity:string;strokeOpacity:string;transform:string;filter:string;clipPath:string;mixBlendMode:string;fillRule:string;stroke:string;strokeDasharray:string;fill:string;props:Record<string,string>;getPropertyValue:(k:string)=>string}
type Doc={defaultView:{document:Doc;getComputedStyle:(n:Node)=>Style}|null}
type Node={localName:string;nodeType:number;namespaceURI:string;isConnected:boolean;ownerDocument:Doc;ownerSVGElement:Node|null;parentNode:Node|null;children:Node[];attrs:Map<string,string>;style:Style;getAttribute:(k:string)=>string|null}

function tree(p:NonNullable<ReturnType<typeof policy>>){
 const doc:Doc={defaultView:null};doc.defaultView={document:doc,getComputedStyle:n=>n.style}
 const make=(localName:string):Node=>{const props:Record<string,string>={'mask-image':'none'},attrs=new Map<string,string>();const style:Style={display:'inline',visibility:'visible',opacity:'1',fillOpacity:'1',strokeOpacity:'1',transform:'none',filter:'none',clipPath:'none',mixBlendMode:'normal',fillRule:'nonzero',stroke:'none',strokeDasharray:'none',fill:'rgb(142,142,255)',props,getPropertyValue:k=>props[k]??''};return{localName,nodeType:1,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerDocument:doc,ownerSVGElement:null,parentNode:null,children:[],attrs,style,getAttribute:k=>attrs.get(k)??null}}
 const owner=make('svg'),outer=make('g'),pens=Array.from({length:18},()=>make('g')),pen=pens[p.pen-1],h=make('path'),g=make('g')
 owner.attrs.set('viewBox','0 0 100 100');owner.children=[outer];outer.parentNode=owner;outer.children=pens;outer.attrs.set('data-stroke-outlines','true')
 for(const n of[outer,...pens,h,g])n.ownerSVGElement=owner
 for(const n of pens)n.parentNode=outer
 pen.attrs.set('data-outline-stroke',String(p.pen));pen.children=[h,g];h.parentNode=g.parentNode=pen;h.attrs.set('d',p.predecessor!.outline);h.style.props.d='path("'+p.predecessor!.outline+'")'
 g.attrs.set('data-stroke-start-gate',p.id);g.attrs.set('data-stroke-reveal-policy',p.kind);g.attrs.set('data-u85c7-cardinal-point-fingerprint',p.proofFingerprint);g.attrs.set('data-u85c7-cardinal-point-clip','review-'+(p.pen-1)+'-'+(p.mask-1))
 return{doc,owner,outer,pen,h,g,make}
}


test('藇 both exact prior DOM slots reject source, frame, opacity and ownership changes',()=>{
 for(const n of targets){const p=policy(c,n,1);assert(p);const verify=(t:ReturnType<typeof tree>,progress=1)=>prior(p,t.g as unknown as SVGGElement,progress);assert(verify(tree(p)));assert.equal(verify(tree(p),.99),false)
  const mutations:Array<(t:ReturnType<typeof tree>)=>void>=[t=>t.h.attrs.set('d',p.predecessor.outline+' '),t=>t.h.attrs.set('pathLength','1'),t=>t.h.attrs.set('mask','none'),t=>{t.h.style.fill='rgba(1,2,3,.5)'},t=>{t.pen.style.opacity='.6'},t=>{t.g.style.transform='matrix(1,0,0,1,1,0)'},t=>{t.h.style.props.d='path("M0 0 L1 1 Z")'},t=>t.g.attrs.set('data-u85c7-cardinal-point-fingerprint','other'),t=>t.g.attrs.set('data-u85c7-cardinal-point-clip','review-7-1'),t=>t.g.attrs.set('data-stroke-start-gate','other'),t=>t.g.attrs.set('data-stroke-reveal-policy','other'),t=>{t.pen.children=[t.g,t.h]},t=>{t.h.parentNode=t.outer},t=>{t.outer.children.reverse()},t=>{t.h.ownerSVGElement=t.make('svg')},t=>t.owner.attrs.set('viewBox','0 0 200 200'),t=>{t.h.isConnected=false}]
  for(const mutate of mutations){const t=tree(p);mutate(t);assert.equal(verify(t),false)}
  const t=tree(p),read=t.h.style.getPropertyValue;t.h.style.getPropertyValue=k=>{if(k==='d')t.pen.children=[t.g,t.h];return read(k)};assert.equal(verify(t),false);assert.equal(prior({...p},tree(p).g as unknown as SVGGElement,1),false)
 }
})
test('藇 source evidence pins preserve pending native and author-clock limits',()=>{
 for(const[path,sha]of Object.entries(pins))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),sha)
 assert.equal(facts.sourceGuideAdded,false);assert.equal(facts.sourceFactoryDoesNotGuaranteePriorDOM,true);assert.equal(facts.originalQOrPOrWidthOrWeightChanged,false);assert.equal(facts.authorClockIsOriginalQTraversal,false);assert.equal(facts.nativeApproval,false);assert.equal(facts.runtimeApplied,false)
})
