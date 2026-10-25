import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {spawnSync} from 'node:child_process'
import {makeReviewedU5ebeSourceContext,reviewedU5ebeContext,reviewedU5ebePolicy,measureReviewedU5ebeFrame,commitReviewedU5ebeCaps,verifyReviewedU5ebeCapsPrior,REVIEWED_U5ebe_SOURCE} from './hanja-stroke-start-caps-u5ebe.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u5ebe-ue0102-2026-10-25/fixtures.json',import.meta.url),'utf8')).u5ebe_ue0102
const clone=<T>(v:T):T=>JSON.parse(JSON.stringify(v))
const targets=[[3,2],[4,1]]
test('庾 exact full5 selects only two original curve masks and rejects altered inputs',()=>{
 const ctx=makeReviewedU5ebeSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(ctx);assert.equal(ctx,reviewedU5ebeContext(f.strokes))
 assert.deepEqual(Object.keys(f.fullProof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 for(let p=0;p<12;p++)for(let m=0;m<f.strokes[p].length;m++){const policy=reviewedU5ebePolicy(ctx,p,m);assert.equal(!!policy,targets.some(([a,b])=>a===p+1&&b===m+1));if(policy){assert.deepEqual(policy.segment,f.strokes[p][m]);assert.equal(policy.certificate.initialArcMax,7);assert.equal(policy.certificate.syntax,'MQ')}}
 assert.equal(makeReviewedU5ebeSourceContext({...f.fullProof,engineRevision:'synthetic'},f.identity,f.strokes),null)
 const identity=clone(f.identity);identity.sourceRoot='foreign';assert.equal(makeReviewedU5ebeSourceContext(f.fullProof,identity,f.strokes),null)
 const getter=clone(f.fullProof);Object.defineProperty(getter,'groups',{enumerable:true,get(){throw Error('must not invoke getter')}});assert.equal(makeReviewedU5ebeSourceContext(getter,f.identity,f.strokes),null)
 for(const field of ['outline','revealPath','revealWidth','weight']){const strokes=clone(f.strokes);strokes[2][1][field]=typeof strokes[2][1][field]==='number'?strokes[2][1][field]+1:strokes[2][1][field]+' ';assert.equal(reviewedU5ebeContext(strokes),null)}
 const elsewhere=clone(f.strokes);elsewhere[1][0].weight+=1;assert.equal(reviewedU5ebeContext(elsewhere),null)
 assert.equal(REVIEWED_U5ebe_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U5ebe_SOURCE.runtimeApplied,false)
})

function measurement(policy:NonNullable<ReturnType<typeof reviewedU5ebePolicy>>,progress:number){
 const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'}
 const doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
 const node=(localName:string,attributes:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(k:string)=>attributes[k]??null,setAttribute:(k:string,v:string)=>{attributes[k]=v},removeAttribute:(k:string)=>{delete attributes[k]}})
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(policy.pen)}),g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind,'data-u5ebe-progress':String(progress)}),defs=node('defs')
 const [x,y]=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 const guide=Object.assign(node('path',{d:policy.segment.revealPath!,'data-u5ebe-measurement':'true'}),{getTotalLength:()=>100,getPointAtLength:(d:number)=>({x:x+d,y})})
 for(const n of [pen,g,defs,guide])n.ownerSVGElement=owner
 pen.parentElement=owner;g.parentElement=pen;defs.parentElement=g;guide.parentElement=defs;owner.children=[pen];g.children=[defs];defs.children=[guide]
 const prev=node('path',{d:policy.previousSegment?.outline??''});prev.ownerSVGElement=owner;prev.parentElement=pen;prev.nextElementSibling=g;g.previousElementSibling=prev;pen.children=policy.mask===2?[prev,g]:[g]
 const ink=node('path');ink.parentElement=g
 return {guide:guide as unknown as SVGPathElement,g:g as unknown as SVGGElement,prev,nodes:{measurement:null,guide:null,startCap:null,endCap:null,ink:ink as unknown as SVGPathElement}}
}
test('庾 epsilon radius tends to zero and compound masks require actual adjacent completed original V',()=>{
 const ctx=makeReviewedU5ebeSourceContext(f.fullProof,f.identity,f.strokes),none={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const [p,m] of targets){const policy=reviewedU5ebePolicy(ctx,p-1,m-1)!;const segment=f.strokes[p-1][m-1]
  assert.equal(commitReviewedU5ebeCaps(policy,segment,0,'own',none).status,'empty')
  for(const progress of [Number.EPSILON,1e-15,1e-10,.01,.03,.5,.99]){const dom=measurement(policy,progress),frame=measureReviewedU5ebeFrame(policy,segment,progress,dom.guide,m===2?1:0);assert.equal(frame.d,progress*100);assert.equal(frame.rho,Math.min(7,frame.d));if(progress<=1e-10){const bound=14*frame.d+2*Math.PI*frame.d**2;assert(bound<1.5e-7)}}
  const dom=measurement(policy,1);assert.equal(commitReviewedU5ebeCaps(policy,segment,1,'own',m===2?dom.nodes:none,m===2?1:0).status,'complete')
  assert.equal(commitReviewedU5ebeCaps({...policy},segment,1,'own',none).status,'hidden')
  if(m===2){assert.equal(verifyReviewedU5ebeCapsPrior(policy,dom.g,1),true);assert.equal(verifyReviewedU5ebeCapsPrior(policy,dom.g,.999),false);dom.prev.setAttribute('d',policy.previousSegment!.outline+' ');assert.equal(verifyReviewedU5ebeCapsPrior(policy,dom.g,1),false);assert.equal(commitReviewedU5ebeCaps(policy,segment,1,'own',dom.nodes,1).status,'hidden')}
 }
})

test('庾 신규 두Q 원P·초기조건·실제prior3V 접촉 exact 증명',()=>{
 const r=spawnSync('python3',['docs/hanja-source-original-u5ebe-ue0102-2026-10-25/verify-initial-caps-proof.py','--check'],{cwd:new URL('..',import.meta.url),encoding:'utf8',timeout:30000});assert.equal(r.status,0,r.stdout+r.stderr);assert.match(r.stdout,/접촉증명 PASS/)
})
