import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {makeReviewedU83bdTSourceContext,reviewedU83bdTContext,reviewedU83bdTPolicy,measureReviewedU83bdTFrame,commitReviewedU83bdTCaps,verifyReviewedU83bdTCapsPrior,REVIEWED_U83bdT_SOURCE} from './hanja-stroke-start-caps-u83bd-t.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u83bd-t-2026-10-25/fixtures.json',import.meta.url),'utf8'))['u83bd-t']
const clone=<T>(v:T):T=>JSON.parse(JSON.stringify(v))
const targets=[[2,1],[4,1],[6,1],[7,1],[8,1],[10,2]]
test('莽 exact body3 selects only six original curve masks and rejects altered inputs',()=>{
 const ctx=makeReviewedU83bdTSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(ctx);assert.equal(ctx,reviewedU83bdTContext(f.strokes))
 assert.deepEqual(Object.keys(f.fullProof).sort(),['defaults','groups','trace'])
 for(let p=0;p<11;p++)for(let m=0;m<f.strokes[p].length;m++){const policy=reviewedU83bdTPolicy(ctx,p,m);assert.equal(!!policy,targets.some(([a,b])=>a===p+1&&b===m+1));if(policy){assert.deepEqual(policy.segment,f.strokes[p][m]);assert.equal(policy.certificate.initialArcMax,[2,4].includes(p+1)?1:7);assert.equal(policy.certificate.syntax,[2,4].includes(p+1)?'ML':'MQ')}}
 assert.equal(makeReviewedU83bdTSourceContext({...f.fullProof,engineRevision:'synthetic'},f.identity,f.strokes),null)
 const identity=clone(f.identity);identity.sourceRoot='foreign';assert.equal(makeReviewedU83bdTSourceContext(f.fullProof,identity,f.strokes),null)
 const getter=clone(f.fullProof);Object.defineProperty(getter,'groups',{enumerable:true,get(){throw Error('must not invoke getter')}});assert.equal(makeReviewedU83bdTSourceContext(getter,f.identity,f.strokes),null)
 for(const field of ['outline','revealPath','revealWidth','weight']){const strokes=clone(f.strokes);strokes[1][0][field]=typeof strokes[1][0][field]==='number'?strokes[1][0][field]+1:strokes[1][0][field]+' ';assert.equal(reviewedU83bdTContext(strokes),null)}
 const elsewhere=clone(f.strokes);elsewhere[0][0].weight+=1;assert.equal(reviewedU83bdTContext(elsewhere),null)
 assert.equal(REVIEWED_U83bdT_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U83bdT_SOURCE.runtimeApplied,false)
})

function measurement(policy:NonNullable<ReturnType<typeof reviewedU83bdTPolicy>>,progress:number){
 const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'}
 const doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
 const node=(localName:string,attributes:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(k:string)=>attributes[k]??null,setAttribute:(k:string,v:string)=>{attributes[k]=v},removeAttribute:(k:string)=>{delete attributes[k]}})
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(policy.pen)}),g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind,'data-u83bd-t-progress':String(progress)}),defs=node('defs')
 const [x,y]=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 const guide=Object.assign(node('path',{d:policy.segment.revealPath!,'data-u83bd-t-measurement':'true'}),{getTotalLength:()=>100,getPointAtLength:(d:number)=>({x:x+d,y})})
 for(const n of [pen,g,defs,guide])n.ownerSVGElement=owner
 pen.parentElement=owner;g.parentElement=pen;defs.parentElement=g;guide.parentElement=defs;owner.children=[pen];g.children=[defs];defs.children=[guide]
 const prev=node('path',{d:policy.previousSegment?.outline??''});prev.ownerSVGElement=owner;prev.parentElement=pen;prev.nextElementSibling=g;g.previousElementSibling=prev;pen.children=policy.mask===2?[prev,g]:[g]
 const ink=node('path');ink.parentElement=g
 return {style,guide:guide as unknown as SVGPathElement,g:g as unknown as SVGGElement,prev,nodes:{measurement:null,guide:null,startCap:null,endCap:null,ink:ink as unknown as SVGPathElement}}
}
test('莽 epsilon radius tends to zero and compound masks require actual adjacent completed original V',()=>{
 const ctx=makeReviewedU83bdTSourceContext(f.fullProof,f.identity,f.strokes),none={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const [p,m] of targets){const policy=reviewedU83bdTPolicy(ctx,p-1,m-1)!;const segment=f.strokes[p-1][m-1]
  assert.equal(commitReviewedU83bdTCaps(policy,segment,0,'own',none).status,'empty')
  for(const progress of [Number.EPSILON,1e-15,1e-10,.01,.03,.5,.99]){const dom=measurement(policy,progress),frame=measureReviewedU83bdTFrame(policy,segment,progress,dom.guide,m===2?1:0);assert.equal(frame.d,progress*100);assert.equal(frame.rho,Math.min(7,frame.d));if(progress<=1e-10){const bound=14*frame.d+2*Math.PI*frame.d**2;assert(bound<1.5e-7)}}
  const dom=measurement(policy,1);assert.equal(commitReviewedU83bdTCaps(policy,segment,1,'own',m===2?dom.nodes:none,m===2?1:0).status,'complete')
  assert.equal(commitReviewedU83bdTCaps({...policy},segment,1,'own',none).status,'hidden')
  if(m===2){assert.equal(verifyReviewedU83bdTCapsPrior(policy,dom.g,1),true);assert.equal(verifyReviewedU83bdTCapsPrior(policy,dom.g,.999),false);dom.prev.setAttribute('d',policy.previousSegment!.outline+' ');assert.equal(verifyReviewedU83bdTCapsPrior(policy,dom.g,1),false);assert.equal(commitReviewedU83bdTCaps(policy,segment,1,'own',dom.nodes,1).status,'hidden')}
 }
})


test('莽 new source-only proof covers six source Q and six cardinal masks without replay',()=>{
 const proof=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u83bd-t-2026-10-25/initial-conditions-proof.json',import.meta.url),'utf8'))
 assert.equal(proof.fixtureSHA256,createHash('sha256').update(readFileSync(new URL('../docs/hanja-source-original-u83bd-t-2026-10-25/fixtures.json',import.meta.url))).digest('hex'))
 assert.equal(proof.geometrySHA256,createHash('sha256').update(JSON.stringify(f.strokes)).digest('hex'))
 assert.equal(proof.initialCases.length,6);assert.equal(proof.fullQCoverage.length,6)
 assert.equal(proof.fullQCoverage.reduce((n:number,c:any)=>n+c.coverLeaves.length,0),180)
 assert(proof.fullQCoverage.every((c:any)=>c.strictFullPContained&&c.unresolved.length===0&&c.coverLeaves.every((x:any)=>BigInt(x.radiusSquaredMargin.split('/')[0])>0n)))
 assert.equal(proof.cardinalFacts.length,6);assert(proof.cardinalFacts.every((c:any)=>c.everySlabAndFrontierSingleInterval))
 assert.equal(proof.compoundInitialContact.pen,10);assert.equal(proof.compoundInitialContact.mask,2)
 assert.deepEqual(proof.compoundInitialContact.priorOriginalPolygons,[0,2]);assert.equal(proof.compoundInitialContact.halfSide,'1/200')
 assert.equal(REVIEWED_U83bdT_SOURCE.sourceProofFormat,'actual-body3')
 assert.equal(REVIEWED_U83bdT_SOURCE.proofSHA256,createHash('sha256').update(readFileSync(new URL('../docs/hanja-source-original-u83bd-t-2026-10-25/initial-conditions-proof.json',import.meta.url))).digest('hex'))
})
test('莽 compound10 requires opaque actual adjacent completed original V',()=>{
 const ctx=makeReviewedU83bdTSourceContext(f.fullProof,f.identity,f.strokes),policy=reviewedU83bdTPolicy(ctx,9,1)!
 for(const bad of ['rgba(0, 0, 0, 0)','rgb(0 0 0 / 0%)','#0000','#00000000','none','transparent','url(#foreign)']){
  const dom=measurement(policy,1);dom.style.fill=bad
  assert.equal(verifyReviewedU83bdTCapsPrior(policy,dom.g,1),false,bad)
 }
 const good=measurement(policy,1);assert.equal(verifyReviewedU83bdTCapsPrior(policy,good.g,1),true)
 good.prev.isConnected=false;assert.equal(verifyReviewedU83bdTCapsPrior(policy,good.g,1),false)
})
