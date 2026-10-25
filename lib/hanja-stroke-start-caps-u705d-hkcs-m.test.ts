import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU705dHkcsMCapsSourceContext,reviewedU705dHkcsMCapsContext,reviewedU705dHkcsMCapsPolicy,measureReviewedU705dHkcsMCapsFrame,commitReviewedU705dHkcsMCaps,verifyReviewedU705dHkcsMCapsPrior,REVIEWED_U705D_HKCS_M_CAPS_SOURCE} from './hanja-stroke-start-caps-u705d-hkcs-m.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u705d-hkcs-m-2026-10-26/fixtures.json',import.meta.url),'utf8')).hkcs_m705d
const clone=<T>(x:T):T=>JSON.parse(JSON.stringify(x))
const targets=[[1,1],[2,1],[14,1],[15,1],[17,1],[23,1],[24,1]]
function measurement(policy:NonNullable<ReturnType<typeof reviewedU705dHkcsMCapsPolicy>>,progress:number){
 const style={transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:'none',fill:'black',fillRule:'nonzero',strokeDasharray:'none',getPropertyValue:()=> 'none'}
 const doc={defaultView:{document:null as unknown,getComputedStyle:()=>style}};doc.defaultView.document=doc
 const node=(localName:string,attributes:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,ownerSVGElement:null as unknown,parentElement:null as unknown,children:[] as unknown[],previousElementSibling:null as unknown,nextElementSibling:null as unknown,getAttribute:(k:string)=>attributes[k]??null,setAttribute:(k:string,v:string)=>{attributes[k]=v},removeAttribute:(k:string)=>{delete attributes[k]}})
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(policy.pen)}),g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind,'data-u705d-hkcs-m-progress':String(progress)}),defs=node('defs')
 const [x,y]=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 const guide=Object.assign(node('path',{d:policy.segment.revealPath!,'data-u705d-hkcs-m-measurement':'true'}),{getTotalLength:()=>100,getPointAtLength:(d:number)=>({x:x+d,y})})
 for(const n of [pen,g,defs,guide])n.ownerSVGElement=owner
 pen.parentElement=owner;g.parentElement=pen;defs.parentElement=g;guide.parentElement=defs;owner.children=[pen];g.children=[defs];defs.children=[guide]
 const prev=node('path',{d:policy.previousSegment?.outline??''});prev.ownerSVGElement=owner;prev.parentElement=pen;prev.nextElementSibling=g;g.previousElementSibling=prev;pen.children=policy.mask===2?[prev,g,node('g'),node('g')]:[g]
 const ink=node('path');ink.parentElement=g
 return {guide:guide as unknown as SVGPathElement,g:g as unknown as SVGGElement,prev,style,nodes:{measurement:null,guide:null,startCap:null,endCap:null,ink:ink as unknown as SVGPathElement}}
}

test('灝 seven own-source caps bind exact full5 and existing certificates',()=>{
 const c=makeReviewedU705dHkcsMCapsSourceContext(f.fullProof,f.identity,f.strokes);assert.ok(c);assert.equal(c,reviewedU705dHkcsMCapsContext(f.strokes))
 for(let p=0;p<24;p++)for(let m=0;m<f.strokes[p].length;m++){const q=reviewedU705dHkcsMCapsPolicy(c,p,m);assert.equal(!!q,targets.some(([a,b])=>a===p+1&&b===m+1));if(q){assert.deepEqual(q.segment,f.strokes[p][m]);assert.equal(q.certificate.syntax,'MQ');assert.equal(q.certificate.initialArcMax,7);assert.equal(q.certificate.T,p===16?'1':'1/2');assert.equal(q.certificate.K,p===1?'1/10':'1/20')}}
 const bad=clone(f.strokes);bad[0][0].revealPath+=' ';assert.equal(reviewedU705dHkcsMCapsContext(bad),null);const id=clone(f.identity);id.sourceRoot='other';assert.equal(makeReviewedU705dHkcsMCapsSourceContext(f.fullProof,id,f.strokes),null)
 const proof=clone(f.fullProof);proof.groups[0].polygons[0][0].x+=.001;assert.equal(makeReviewedU705dHkcsMCapsSourceContext(proof,f.identity,f.strokes),null)
 let reads=0;const getter=clone(f.fullProof);Object.defineProperty(getter,'trace',{enumerable:true,get(){reads++;return[]}});assert.equal(makeReviewedU705dHkcsMCapsSourceContext(getter,f.identity,f.strokes),null);assert.equal(reads,0);assert.equal(REVIEWED_U705D_HKCS_M_CAPS_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U705D_HKCS_M_CAPS_SOURCE.runtimeApplied,false)
})
test('灝 initial clock grows from zero with original MQ guides',()=>{
 const c=makeReviewedU705dHkcsMCapsSourceContext(f.fullProof,f.identity,f.strokes)!
 for(const[p,m]of targets){const q=reviewedU705dHkcsMCapsPolicy(c,p-1,m-1)!;for(const t of[Number.EPSILON,1e-15,1e-10,.01,.5,.99999999]){const d=measurement(q,t),r=measureReviewedU705dHkcsMCapsFrame(q,q.segment,t,d.guide);assert.equal(r.d,t*100);assert.equal(r.rho,Math.min(7,t*100))}}
})
test('灝 caps reject forged policy and keep zero empty without UA reads',()=>{
 const c=makeReviewedU705dHkcsMCapsSourceContext(f.fullProof,f.identity,f.strokes)!,none={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const[p,m]of targets){const q=reviewedU705dHkcsMCapsPolicy(c,p-1,m-1)!;assert.equal(commitReviewedU705dHkcsMCaps(q,q.segment,0,'hao',none).status,'empty');assert.equal(commitReviewedU705dHkcsMCaps({...q},q.segment,1,'hao',none).status,'hidden');assert.equal(verifyReviewedU705dHkcsMCapsPrior(q,null,1),false)}
})
