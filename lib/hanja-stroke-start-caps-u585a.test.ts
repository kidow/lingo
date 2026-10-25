import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU585aSourceContext,reviewedU585aContext,reviewedU585aPolicy,measureReviewedU585aFrame,commitReviewedU585aCaps,verifyReviewedU585aCapsPrior,REVIEWED_U585a_SOURCE} from './hanja-stroke-start-caps-u585a.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u585a-base-2026-10-25/fixtures.json',import.meta.url),'utf8')).u585a
const clone=<T>(v:T):T=>JSON.parse(JSON.stringify(v))
const targets=[[3,1],[4,1],[5,2],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1]]
test('塚 exact full5 selects only nine original curve masks and rejects altered inputs',()=>{
 const ctx=makeReviewedU585aSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(ctx);assert.equal(ctx,reviewedU585aContext(f.strokes))
 assert.deepEqual(Object.keys(f.fullProof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 for(let p=0;p<12;p++)for(let m=0;m<f.strokes[p].length;m++){const policy=reviewedU585aPolicy(ctx,p,m);assert.equal(!!policy,targets.some(([a,b])=>a===p+1&&b===m+1));if(policy){assert.deepEqual(policy.segment,f.strokes[p][m]);assert.equal(policy.certificate.initialArcMax,7);assert.equal(policy.certificate.syntax,'MQ')}}
 assert.equal(makeReviewedU585aSourceContext({...f.fullProof,engineRevision:'synthetic'},f.identity,f.strokes),null)
 const identity=clone(f.identity);identity.sourceRoot='foreign';assert.equal(makeReviewedU585aSourceContext(f.fullProof,identity,f.strokes),null)
 const getter=clone(f.fullProof);Object.defineProperty(getter,'groups',{enumerable:true,get(){throw Error('must not invoke getter')}});assert.equal(makeReviewedU585aSourceContext(getter,f.identity,f.strokes),null)
 for(const field of ['outline','revealPath','revealWidth','weight']){const strokes=clone(f.strokes);strokes[4][1][field]=typeof strokes[4][1][field]==='number'?strokes[4][1][field]+1:strokes[4][1][field]+' ';assert.equal(reviewedU585aContext(strokes),null)}
 const elsewhere=clone(f.strokes);elsewhere[1][0].weight+=1;assert.equal(reviewedU585aContext(elsewhere),null)
 assert.equal(REVIEWED_U585a_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U585a_SOURCE.runtimeApplied,false)
})
test('塚 original prefix require actual exact completed prior Q7 before and after rendering',()=>{
 const c=makeReviewedU585aPrefixSourceContext(f.fullProof,f.identity,f.strokes);const q=reviewedU585aPrefixPolicy(c,7,1)!
 const doc:any={defaultView:null,getElementById:(id:string)=>all.find(n=>n.getAttribute('id')===id)??null};let all:Stub[]=[]
 class Stub{namespaceURI='http://www.w3.org/2000/svg';isConnected=true;ownerDocument=doc;ownerSVGElement:Stub|null=null;parentElement:Stub|null=null;children:Stub[]=[];attrs=new Map<string,string>();style:Record<string,string>={};localName:string;constructor(name:string){this.localName=name}getAttribute(k:string){return this.attrs.get(k)??null}get previousElementSibling():Stub|null{return this.parentElement?.children[this.parentElement.children.indexOf(this)-1]??null}get nextElementSibling():Stub|null{return this.parentElement?.children[this.parentElement.children.indexOf(this)+1]??null}contains(n:Stub):boolean{return this.children.includes(n)||this.children.some(c=>c.contains(n))}}
 const view:any={document:doc,getComputedStyle:(n:Stub)=>({transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:n.localName==='path'&&n.attrs.get('fill')==='none'?'white':'none',fill:n.attrs.get('fill')??'black',fillRule:'nonzero',strokeWidth:'14',strokeLinecap:'round',strokeLinejoin:'miter',strokeOpacity:'1',strokeDashoffset:'0',strokeDasharray:'1px, 2px',...n.style,getPropertyValue:(k:string)=>n.style[k]??(k==='mask-image'&&n.attrs.has('mask')?n.attrs.get('mask')!:'none')})};doc.defaultView=view
 function nodes(){const owner=new Stub('svg'),pen=new Stub('g'),h=new Stub('path'),prev=new Stub('g'),defs=new Stub('defs'),mask=new Stub('mask'),guide=new Stub('path'),ink=new Stub('path'),g=new Stub('g');all=[owner,pen,h,prev,defs,mask,guide,ink,g]
  const attach=(a:Stub,children:Stub[])=>{a.children=children;for(const n of children)n.parentElement=a};attach(owner,[pen]);attach(pen,[prev,g]);attach(prev,[defs,ink]);attach(defs,[mask]);attach(mask,[guide]);for(const n of all)if(n!==owner)n.ownerSVGElement=owner
  pen.attrs.set('data-outline-stroke',String(q.pen));for(const[k,v]of Object.entries({'data-stroke-start-gate':q.id,'data-stroke-reveal-policy':q.kind}))g.attrs.set(k,v)
  for(const[k,v]of Object.entries({'data-stroke-start-gate':'u585a-'+q.pen+'-1','data-stroke-reveal-policy':'growing-u585a-caps','data-stroke-reveal-progress':'1'}))prev.attrs.set(k,v)
  for(const[k,v]of Object.entries({id:'completedQ',maskUnits:'userSpaceOnUse',maskContentUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'}))mask.attrs.set(k,v)
  for(const[k,v]of Object.entries({d:q.previousSegment.revealPath!,fill:'none',stroke:'white','stroke-width':'14','stroke-linecap':'round','stroke-linejoin':'miter',pathLength:'1','stroke-dasharray':'1 2','stroke-dashoffset':'0'}))guide.attrs.set(k,v)
  for(const[k,v]of Object.entries({d:q.previousSegment.outline,mask:'url(#completedQ)','data-u585a-full-original-q-tube':'true','data-u585a-full-committed':'true'}))ink.attrs.set(k,v)
  return{owner,pen,h,prev,defs,mask,guide,ink,g}}
 const valid=nodes();assert.equal(verifyReviewedU585aPrefixPrior(q,valid.g as unknown as SVGGElement,1),true)
 const mutations=[(n:ReturnType<typeof nodes>)=>n.prev.attrs.set('data-stroke-reveal-progress','.99999999'),(n:ReturnType<typeof nodes>)=>n.guide.attrs.set('stroke-dasharray','.99999 2'),(n:ReturnType<typeof nodes>)=>n.ink.attrs.set('d','M0 0'),(n:ReturnType<typeof nodes>)=>n.ink.attrs.set('mask','url(#missing)'),(n:ReturnType<typeof nodes>)=>n.ink.style.visibility='hidden',(n:ReturnType<typeof nodes>)=>n.ink.style.opacity='.5',(n:ReturnType<typeof nodes>)=>n.pen.style.transform='scale(2)',(n:ReturnType<typeof nodes>)=>n.prev.children.push(new Stub('path')),(n:ReturnType<typeof nodes>)=>n.guide.ownerSVGElement=new Stub('svg'),(n:ReturnType<typeof nodes>)=>n.pen.children.reverse(),(n:ReturnType<typeof nodes>)=>n.ink.attrs.set('data-u585a-full-committed','false')]
 for(const mutate of mutations){const n=nodes();mutate(n);assert.equal(verifyReviewedU585aPrefixPrior(q,n.g as unknown as SVGGElement,1),false)}
 const after=nodes();assert.equal(verifyReviewedU585aPrefixPrior(q,after.g as unknown as SVGGElement,1),true);after.guide.style.strokeWidth='13';assert.equal(verifyReviewedU585aPrefixPrior(q,after.g as unknown as SVGGElement,1),false)
 for(const fill of['rgba(0, 0, 0, 0)','rgb(0 0 0 / 0)','color(srgb 0 0 0 / 0)','#0000']){const n=nodes();n.ink.style.fill=fill;assert.equal(verifyReviewedU585aPrefixPrior(q,n.g as unknown as SVGGElement,1),false)}
})

function measurement(policy:NonNullable<ReturnType<typeof reviewedU585aPolicy>>,progress:number){
 const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'}
 const doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
 const node=(localName:string,attributes:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(k:string)=>attributes[k]??null,setAttribute:(k:string,v:string)=>{attributes[k]=v},removeAttribute:(k:string)=>{delete attributes[k]}})
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(policy.pen)}),g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind,'data-u585a-progress':String(progress)}),defs=node('defs')
 const [x,y]=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 const guide=Object.assign(node('path',{d:policy.segment.revealPath!,'data-u585a-measurement':'true'}),{getTotalLength:()=>100,getPointAtLength:(d:number)=>({x:x+d,y})})
 for(const n of [pen,g,defs,guide])n.ownerSVGElement=owner
 pen.parentElement=owner;g.parentElement=pen;defs.parentElement=g;guide.parentElement=defs;owner.children=[pen];g.children=[defs];defs.children=[guide]
 const prev=node('path',{d:policy.previousSegment?.outline??''});prev.ownerSVGElement=owner;prev.parentElement=pen;prev.nextElementSibling=g;g.previousElementSibling=prev;pen.children=policy.mask===2?[prev,g]:[g]
 const ink=node('path');ink.parentElement=g
 return {guide:guide as unknown as SVGPathElement,g:g as unknown as SVGGElement,prev,style,nodes:{measurement:null,guide:null,startCap:null,endCap:null,ink:ink as unknown as SVGPathElement}}
}
test('塚 epsilon radius tends to zero and compound masks require actual adjacent completed original H',()=>{
 const ctx=makeReviewedU585aSourceContext(f.fullProof,f.identity,f.strokes),none={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const [p,m] of targets){const policy=reviewedU585aPolicy(ctx,p-1,m-1)!;const segment=f.strokes[p-1][m-1]
  assert.equal(commitReviewedU585aCaps(policy,segment,0,'own',none).status,'empty')
  for(const progress of [Number.EPSILON,1e-15,1e-10,.01,.03,.5,.99]){const dom=measurement(policy,progress),frame=measureReviewedU585aFrame(policy,segment,progress,dom.guide,m===2?1:0);assert.equal(frame.d,progress*100);assert.equal(frame.rho,Math.min(7,frame.d));if(progress<=1e-10){const bound=14*frame.d+2*Math.PI*frame.d**2;assert(bound<1.5e-7)}}
  const dom=measurement(policy,1);assert.equal(commitReviewedU585aCaps(policy,segment,1,'own',m===2?dom.nodes:none,m===2?1:0).status,'complete')
  assert.equal(commitReviewedU585aCaps({...policy},segment,1,'own',none).status,'hidden')
  if(m===2){assert.equal(verifyReviewedU585aCapsPrior(policy,dom.g,1),true);assert.equal(verifyReviewedU585aCapsPrior(policy,dom.g,.999),false);dom.prev.setAttribute('d',policy.previousSegment!.outline+' ');assert.equal(verifyReviewedU585aCapsPrior(policy,dom.g,1),false);assert.equal(commitReviewedU585aCaps(policy,segment,1,'own',dom.nodes,1).status,'hidden')}
 }
})

import {makeReviewedU585aPrefixSourceContext,reviewedU585aPrefixPolicy,sampleReviewedU585aPrefixFrame,verifyReviewedU585aPrefixPrior} from './hanja-stroke-source-prefix-u585a.ts'
test('塚 hook uses exact original P leftward prefix with a completed Q7 prior',()=>{
 const context=makeReviewedU585aPrefixSourceContext(f.fullProof,f.identity,f.strokes)
 assert.ok(context)
 const policy=reviewedU585aPrefixPolicy(context,7,1)!
 assert(policy)
 assert.equal(reviewedU585aPrefixPolicy(context,7,0),null)
 for(const p of [0,Number.EPSILON,1e-10,.01,.5,.99999999,1]){
  const frame=sampleReviewedU585aPrefixFrame(policy,f.strokes[7][1],p,1)
  assert.equal(frame.clip.width,20*p)
  assert.equal(frame.clip.x,66-20*p)
  assert.equal(frame.visible,p>0)
  assert.equal(frame.originalPDirect,p===1)
  assert.equal(frame.sourceClockSuitabilityClaimed,false)
 }
 assert.throws(()=>sampleReviewedU585aPrefixFrame(policy,f.strokes[7][1],.1,.999))
 assert.throws(()=>sampleReviewedU585aPrefixFrame(policy,{...f.strokes[7][1],weight:99},.1,1))
 assert.throws(()=>sampleReviewedU585aPrefixFrame({...policy},f.strokes[7][1],.1,1))
 assert.equal(verifyReviewedU585aPrefixPrior(policy,null,1),false)
 const proof=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u585a-base-2026-10-25/prefix-risk-proof.json',import.meta.url),'utf8'))
 assert.equal(proof.hookContact.positiveForAllProgressAboveZero,true)
 assert.equal(proof.hookAxis.singleConnectedSection,true)
 assert.equal(proof.hookContact.Q7Counterexample.strictOutside,true)
 assert.equal(proof.axis.length,4)
})
