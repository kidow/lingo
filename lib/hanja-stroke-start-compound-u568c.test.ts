import assert from'node:assert/strict'
import{test}from'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
const FIXTURE='docs/hanja-source-cache-u568c-2026-10-23/fixture.json',FULL5='docs/hanja-source-raw-compare-u568c-2026-10-23/engine-whole-u568c.json'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=<T,>(v:T):T=>structuredClone(v)
const fixture=JSON.parse(read(FIXTURE).toString()),strokes=fixture.strokes
type R=readonly[bigint,bigint]
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
function r(a:bigint,b=1n):R{assert(b!==0n);if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
function q(s:string):R{if(s.includes('/')){const[a,b]=s.split('/').map(BigInt);return r(a,b)}const[a,b='']=s.split('.');return r(BigInt(a+b),10n**BigInt(b.length))}
const add=(a:R,b:R)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),neg=(a:R)=>r(-a[0],a[1]),sub=(a:R,b:R)=>add(a,neg(b)),mul=(a:R,b:R)=>r(a[0]*b[0],a[1]*b[1]),div=(a:R,b:R)=>r(a[0]*b[1],a[1]*b[0]),cmp=(a:R,b:R)=>a[0]*b[1]-b[0]*a[1],square=(a:R)=>mul(a,a),text=(a:R)=>a[1]===1n?String(a[0]):a[0]+'/'+a[1],dot=(a:R[],b:R[])=>add(mul(a[0],b[0]),mul(a[1],b[1])),abs=(a:R)=>a[0]<0n?neg(a):a
test('嚌 compound3 exact first straight arc7 proof FIRST batch',()=>{
 assert.equal(sha(read(FIXTURE)),'fd3319d9ac2f941e9ef51a5a505c6d3e72b90788c92f9493ae1dc69ac6423d55');assert.equal(sha(JSON.stringify(strokes)),'aa124ad522573bf1e5ba90f904ffcf2796af551fb294d070c6d19779b53661c8');assert.equal(strokes.length,17);assert.equal(strokes.flat().length,19)
 assert.equal(sha(read(FULL5)),'0fb793d710713d24757c82f0ba9494beb5d025d43ceb10ede0a0dfd7ecc6535d');const full=JSON.parse(read(FULL5).toString());assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(full.groups.flatMap((g:any)=>g.polygons).length,39)
 const certificates:any[]=[]
 for(const[pen,syntax]of[[2,'MLL'],[9,'MLQQ'],[14,'MLQ']]as const){const m=strokes[pen-1][0];assert.equal(m.direction,'curve');assert.equal(m.revealWidth,14);assert.equal(m.revealPath.match(/[MLQC]/g).join(''),syntax)
  const n=m.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,4).map(q),A=n.slice(0,2),B=n.slice(2,4),delta=B.map((b:R,i:number)=>sub(b,A[i]));assert((cmp(delta[0],q('0'))===0n)!==(cmp(delta[1],q('0'))===0n));const axis=cmp(delta[0],q('0'))!==0n?0:1,length=abs(delta[axis]),lengthSquared=dot(delta,delta),margin=sub(lengthSquared,q('49'));assert(cmp(length,q('7'))>0n);assert(cmp(margin,q('0'))>0n)
  certificates.push({pen,mask:1,syntax,initialLegKind:'straight-first-leg',sourceRawOneBased:fixture.sourceGroups[pen-1].map((v:number)=>v+1),maskSHA256:sha(JSON.stringify(m)),guide:m.revealPath,width:14,radius:7,weight:m.weight,A:A.map(text),firstEnd:B.map(text),delta:delta.map(text),firstLegLength:text(length),firstLegSquared:text(lengthSquared),chordSquaredMinus49:text(margin),unitTangent:delta.map((v:R)=>text(div(v,length))),curvature:'0',rK:'0',cosLower:'1',cosMinusRK:'1',priorSegments:0,cornersWithinInitialArc7:0,initialArcMax:7,UAFullGuideLengthRequired:true,firstLegIsNotFullGuideLength:true,onlyInitialSufficientConditions:true,initialSourcePConnectedNotProved:true,fullCoverageNotProved:true,fullSweepNotProved:true,terminalApproved:false})
 }
 assert.equal(certificates.length,3);console.log('U568C_COMPOUND_MATH_FIRST '+JSON.stringify({certificates,mathBatchRuns:1,sourceProjection:0,engine:0,oldMathReruns:0,nativeApproval:false}))
})

import {reviewedU568cCompoundContext,reviewedU568cCompoundPolicy,commitReviewedU568cCompoundCaps,REVIEWED_U568C_COMPOUND_SOURCE,REVIEWED_U568C_COMPOUND_INPUT_SHA256} from './hanja-stroke-start-compound-u568c.ts'
function fake(policy:any){
 const id='u568c-compound-test',events:string[]=[],doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view;let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg;const group=node('g'),target=node('g',{'data-stroke-start-gate':policy!.id,'data-u568c-compound-progress':'0.5','data-u568c-compound-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const segment=policy!.segment,q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u568c-compound-measurement':'true',id:id+'-u568c-compound-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u568c-compound-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u568c-compound-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u568c-compound-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 return{policy,id,segment,q0,svg,group,target,measurement,mask,guide,startCap,endCap,ink,completed,nodes:{measurement,guide,startCap,endCap,ink},events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(f:()=>void)=>{lengthHook=f},onPoint:(f:(d:number)=>{x:number;y:number})=>{pointHook=f}}
}
const dispatch=(x:ReturnType<typeof fake>,p:number,s=x.segment)=>commitReviewedU568cCompoundCaps(x.policy,s,p,x.id,x.nodes as any),commit=(x:ReturnType<typeof fake>,p:number)=>{x.target.attrs['data-u568c-compound-progress']=String(p);return dispatch(x,p)}

test('嚌 compound3 DOM sourceguards and lifecycle FIRST batch',()=>{
 const context=reviewedU568cCompoundContext(strokes);assert(context)
 assert.deepEqual(REVIEWED_U568C_COMPOUND_SOURCE.counts,{pens:17,masks:19,polygons:39,targets:3})
 for(const[p,h]of Object.entries(REVIEWED_U568C_COMPOUND_INPUT_SHA256))assert.equal(sha(read(p)),h,p)
 let selected=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)if(reviewedU568cCompoundPolicy(context,i,j))selected++;assert.equal(selected,3)
 let materialNegative=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){const x=clone(strokes),m=x[i][j];if(key==='bounds')m.bounds[0]+=.01;else if(typeof m[key]==='number')m[key]+=.01;else m[key]+=' ';assert.equal(reviewedU568cCompoundContext(x),null);materialNegative++}
 const extra=clone(strokes);Object.defineProperty(extra[0][0],'extra',{value:1});assert.equal(reviewedU568cCompoundContext(extra),null)
 let getterReads=0;const getter=clone(strokes);Object.defineProperty(getter[0][0],'weight',{get(){getterReads++;return 1},enumerable:true});assert.equal(reviewedU568cCompoundContext(getter),null);assert.equal(getterReads,0)
 const sparse=clone(strokes);delete sparse[0][0];assert.equal(reviewedU568cCompoundContext(sparse),null);assert.equal(reviewedU568cCompoundPolicy({...context},0,0),null)
 const expected=[[2,1,"MLL","0e66e62f0569ca66cc3e0098b71bd542d0fe88dbcbd99d85411cf4612a18d594","40803/2500"],[9,1,"MLQQ","bc230fd8a2dee53d9c8dfa04c6d0cce2d580ac38db122b3eba70b4291ff98161","7203/400"],[14,1,"MLQ","f1874b0dc948f32646a2a9e60147c59180a0bd0ccaf877f5dde2e3755013b472","407/25"]]
 for(const spec of expected){
 const [pen,mask,syntax,hash,firstLeg]=spec as [number,number,string,string,string]
 const policy=reviewedU568cCompoundPolicy(context,pen-1,mask-1)!;assert(policy);assert.deepEqual(policy.segment,strokes[pen-1][mask-1]);assert.equal(sha(JSON.stringify(policy.segment)),hash);assert.equal(policy.certificate.syntax,syntax);assert.equal(policy.certificate.initialLegKind,'straight-first-leg');assert.equal(policy.certificate.firstLegLength,firstLeg);assert.equal(policy.certificate.K,'0');assert.equal(policy.certificate.storedBounds.UAFullGuideLengthRequired,true)
 const make=()=>fake(policy)
for(const p of[1e-6,.03,.5]){const x=make(),r=commit(x,p);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,p*100);assert.equal(r.frame.rho,Math.min(7,p*100));assert.equal(x.ink.getAttribute('data-growing-distance'),String(r.frame.d));assert.equal(x.startCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.endCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(x.startCap.getAttribute('r'),'0');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null)}
 for(const p of[0,1]){const x=make(),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}
 let negatives=0;for(const p of[NaN,Infinity,-.1,1.1]){const x=make();assert.equal(commit(x,p).status,'hidden');negatives++}
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u568c-compound-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(const mutate of mutations)for(const when of['before','length','point']){const x=make();if(when==='before')mutate(x);else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden');negatives++}
 for(const L of[NaN,Infinity,-1,0,7]){const x=make();x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0]);negatives++}
 const invalid=make();invalid.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(invalid,.5).status,'hidden');negatives++
 const changed=make();changed.guide.writeHook=k=>{if(k==='stroke-dasharray'&&changed.counts()[1])changed.target.attrs['data-u568c-compound-progress']='.25'};assert.equal(commit(changed,.5).status,'hidden');negatives++
 const wrong=make();assert.equal(dispatch(wrong,.5,{...wrong.segment,weight:1}).status,'hidden');assert.deepEqual(wrong.counts(),[0,0]);negatives++
 const impostor=make();assert.equal(commitReviewedU568cCompoundCaps({...policy!},impostor.segment,.5,impostor.id,impostor.nodes as any).status,'hidden');negatives++
 console.log(JSON.stringify({DOMFirst:true,visibleSamples:3,emptyCompleteSamples:2,negative:negatives,canonicalSetRemove:true,visibilityLast:true,SSR:0,nativeApproval:false}))
 }
 assert.equal(REVIEWED_U568C_COMPOUND_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U568C_COMPOUND_SOURCE.previousMaskContactApproved,false);assert.equal(REVIEWED_U568C_COMPOUND_SOURCE.terminalReviewed,false);assert.equal(REVIEWED_U568C_COMPOUND_SOURCE.twelveM2OutsidePolicy,true)
 console.log(JSON.stringify({ownDOMBatchFirst:true,targets:3,selected,materialNegative,getterReads,mathReruns:0,SSR:0,nativeApproval:false}))
})
