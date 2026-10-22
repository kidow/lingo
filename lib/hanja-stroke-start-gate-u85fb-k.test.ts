import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const FIXTURE='docs/hanja-source-cache-u85fb-k-2026-10-23/fixture.json',FULL5='docs/hanja-goal-glyphwiki-batch866-2026-10-13/engine-whole-u85fb-k.json'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=<T,>(v:T):T=>structuredClone(v)
const fixture=JSON.parse(read(FIXTURE).toString()),strokes=fixture.strokes
type R=readonly[bigint,bigint]
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
function r(a:bigint,b=1n):R{assert(b!==0n);if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
function q(s:string):R{if(s.includes('/')){const[a,b]=s.split('/').map(BigInt);return r(a,b)}const[a,b='']=s.split('.');return r(BigInt(a+b),10n**BigInt(b.length))}
const add=(a:R,b:R)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),neg=(a:R)=>r(-a[0],a[1]),sub=(a:R,b:R)=>add(a,neg(b)),mul=(a:R,b:R)=>r(a[0]*b[0],a[1]*b[1]),div=(a:R,b:R)=>r(a[0]*b[1],a[1]*b[0]),cmp=(a:R,b:R)=>a[0]*b[1]-b[0]*a[1],square=(a:R)=>mul(a,a),text=(a:R)=>a[1]===1n?String(a[0]):a[0]+'/'+a[1],dot=(a:R[],b:R[])=>add(mul(a[0],b[0]),mul(a[1],b[1])),abs=(a:R)=>a[0]<0n?neg(a):a
test('藻K own6 MQ exact initial arc7 proof FIRST batch',()=>{
 assert.equal(sha(read(FIXTURE)),'42c85eb7e2bc072e3b877d167d18f2ab676aef649d14e1cd47adb3c32813936b')
 assert.equal(sha(read(FULL5)),'a33b958f2d83984e6748d69d3d4c4048b86a161365748bc8c99351eb2fa2a979')
 const full=JSON.parse(read(FULL5).toString());assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(full.groups.length,24);assert.equal(full.groups.flatMap((g:any)=>g.polygons).length,37)
 assert.equal(sha(JSON.stringify(strokes)),'10473af0ab3b4d2af3352192ac4c5e346f4e08edede2c498a20784f787a200fb');assert.equal(strokes.length,20);assert.equal(strokes.flat().length,21)
 const coords=[[5,1],[6,1],[7,1],[7,2],[19,1],[20,1]],certificates:any[]=[],held:any[]=[]
 for(const[pen,mask]of coords){
  const m=strokes[pen-1][mask-1];assert.equal(m.direction,'curve');assert.equal(m.revealWidth,14);assert(/^M[-\d.]+ [-\d.]+ Q[-\d.]+ [-\d.]+ [-\d.]+ [-\d.]+$/.test(m.revealPath))
  const n=m.revealPath.match(/-?\d+(?:\.\d+)?/g).map(q),A=n.slice(0,2),B=n.slice(2,4),E=n.slice(4),u=B.map((b:R,i:number)=>sub(b,A[i])),v=A.map((a:R,i:number)=>add(sub(a,mul(q('2'),B[i])),E[i]))
  const cross=abs(sub(mul(u[0],v[1]),mul(u[1],v[0]))),vv=dot(v,v);let selected:any=null
  for(const ts of['1/4','1/3','1/2','2/3','3/4','1']){
   const T=q(ts),lambda=(t:R)=>dot(u.map((a:R,i:number)=>add(a,mul(v[i],t))),u.map((a:R,i:number)=>add(a,mul(v[i],t)))),candidates=[q('0'),T]
   if(cmp(vv,q('0'))>0n){const vertex=div(neg(dot(u,v)),vv);if(cmp(vertex,q('0'))>0n&&cmp(vertex,T)<0n)candidates.push(vertex)}
   const at=candidates.reduce((a,b)=>cmp(lambda(a),lambda(b))<0n?a:b),lambdaMin=lambda(at),chord=u.map((a:R,i:number)=>add(mul(mul(q('2'),a),T),mul(v[i],square(T)))),chordSquared=dot(chord,chord)
   if(cmp(lambdaMin,q('0'))<=0n||cmp(chordSquared,q('49'))<=0n)continue
   const axis=[0,1].find(i=>{const a=u[i],b=add(u[i],mul(v[i],T));return cmp(a,q('0'))*cmp(b,q('0'))>0n});if(axis===undefined)continue
   for(const den of[1000,500,200,100,80,60,50,40,30,25,20,16,15,13,12,10]){
    const K=q('1/'+den),curvatureMargin=sub(mul(mul(q('4'),square(K)),mul(square(lambdaMin),lambdaMin)),square(cross)),rK=mul(q('7'),K),cosLower=sub(q('1'),div(square(rK),q('2'))),cosMinusRK=sub(cosLower,rK)
    if(cmp(curvatureMargin,q('0'))<=0n||cmp(cosMinusRK,q('0'))<=0n)continue
    selected={pen,mask,rawOneBased:fixture.sourceGroups[pen-1][mask-1]+1,syntax:'MQ',maskSHA256:sha(JSON.stringify(m)),guide:m.revealPath,width:14,radius:7,weight:m.weight,T:ts,K:'1/'+den,A:A.map(text),u:u.map(text),v:v.map(text),lambdaMin:text(lambdaMin),lambdaMinAt:text(at),cross:text(cross),chordSquaredAtT:text(chordSquared),chordSquaredMinus49:text(sub(chordSquared,q('49'))),curvatureMargin:text(curvatureMargin),rK:text(rK),cosLower:text(cosLower),cosMinusRK:text(cosMinusRK),injectiveAxis:axis===0?'x':'y',derivativeEndpoints:[mul(q('2'),u[axis]),mul(q('2'),add(u[axis],mul(v[axis],T)))].map(text),initialArcMax:7,onlyInitialSufficientConditions:true,initialSourcePConnectedNotProved:true,fullCoverageNotProved:true,fullSweepNotProved:true};break
   }
   if(selected)break
  }
  if(selected)certificates.push(selected);else{const lambda0=dot(u,u),rKappaSquared=div(mul(q('49'),square(cross)),mul(q('4'),mul(square(lambda0),lambda0))),necessaryQuarterBound=sub(rKappaSquared,q('9/16'));assert(cmp(necessaryQuarterBound,q('0'))>0n);held.push({pen,mask,guide:m.revealPath,maskSHA256:sha(JSON.stringify(m)),reason:'At M, r*kappa > 3/4 > sqrt(3)-1, so no K>=kappa satisfies rK < 1-(rK)^2/2 on any initial interval including M. This rejects this sufficient certificate only, not all possible display policies.',lambda0:text(lambda0),cross:text(cross),rKappaSquared:text(rKappaSquared),rKappaSquaredMinus9Over16:text(necessaryQuarterBound),standardR7NormalOffsetSufficientConditionCannotHold:true,nativeApproval:false})}
 }
 assert.equal(certificates.length+held.length,6);assert(certificates.length>0);assert.deepEqual(held.map(h=>[h.pen,h.mask]),[[7,2]])
 console.log('U85FB_K_MATH_FIRST '+JSON.stringify({certificates,held,mathBatchRuns:1,sourceProjection:0,engine:0,oldMathReruns:0,nativeApproval:false}))
})

import {reviewedU85fbKContext,reviewedU85fbKPolicy,commitReviewedU85fbKCaps,REVIEWED_U85FB_K_SOURCE,REVIEWED_U85FB_K_INPUT_SHA256} from './hanja-stroke-start-gate-u85fb-k.ts'
function fake(policy:any){
 const id='u85fb-k-test',events:string[]=[],doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view;let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg;const group=node('g'),target=node('g',{'data-stroke-start-gate':policy!.id,'data-u85fb-k-progress':'0.5','data-u85fb-k-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const segment=policy!.segment,q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u85fb-k-measurement':'true',id:id+'-u85fb-k-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u85fb-k-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u85fb-k-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u85fb-k-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 return{policy,id,segment,q0,svg,group,target,measurement,mask,guide,startCap,endCap,ink,completed,nodes:{measurement,guide,startCap,endCap,ink},events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(f:()=>void)=>{lengthHook=f},onPoint:(f:(d:number)=>{x:number;y:number})=>{pointHook=f}}
}
const dispatch=(x:ReturnType<typeof fake>,p:number,s=x.segment)=>commitReviewedU85fbKCaps(x.policy,s,p,x.id,x.nodes as any),commit=(x:ReturnType<typeof fake>,p:number)=>{x.target.attrs['data-u85fb-k-progress']=String(p);return dispatch(x,p)}

test('藻K own5 proved MQ DOM sourceguards and lifecycle FIRST batch',()=>{
 const context=reviewedU85fbKContext(strokes);assert(context)
 assert.deepEqual(REVIEWED_U85FB_K_SOURCE.counts,{pens:20,masks:21,polygons:37,targets:5,attemptedMQTargets:6})
 for(const[p,h]of Object.entries(REVIEWED_U85FB_K_INPUT_SHA256))assert.equal(sha(read(p)),h,p)
 let selected=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)if(reviewedU85fbKPolicy(context,i,j))selected++;assert.equal(selected,5)
 let materialNegative=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){const x=clone(strokes),m=x[i][j];if(key==='bounds')m.bounds[0]+=.01;else if(typeof m[key]==='number')m[key]+=.01;else m[key]+=' ';assert.equal(reviewedU85fbKContext(x),null);materialNegative++}
 const extra=clone(strokes);Object.defineProperty(extra[0][0],'extra',{value:1});assert.equal(reviewedU85fbKContext(extra),null)
 let getterReads=0;const getter=clone(strokes);Object.defineProperty(getter[0][0],'weight',{get(){getterReads++;return 1},enumerable:true});assert.equal(reviewedU85fbKContext(getter),null);assert.equal(getterReads,0)
 const sparse=clone(strokes);delete sparse[0][0];assert.equal(reviewedU85fbKContext(sparse),null);assert.equal(reviewedU85fbKPolicy({...context},0,0),null)
 const expected=[[5,1,"1/2","1/25","9cfe3e097f899299d817f06d1dcdd0113103d3b33b1d8de6ac8f4d2921906f9e","40537809/640000","425818842497181366129/40960000000000000000","851/1250"],[6,1,"1/2","1/20","939c691c970dca874b190dea317401e51e4b3775bd6be6bc7fbb818a125bbf5d","42224401/640000","21361628185633176753201/26214400000000000000","471/800"],[7,1,"1/3","1/13","4330b43e83efee70859682a8b36be1a5b01e81be0cc4dca68086ebd6e63b2242","1299521/10000","116851199094935261/42250000000000","107/338"],[19,1,"1/4","1/40","bb81d80b227a53e376f3cf9f7d3a6b3967a9440972b5bf04a372b119f0b20280","11178589/40000","320363657783481150469/25600000000000000","2591/3200"],[20,1,"1/4","1/60","1d0d0adbc41f0795eaf3ff403d9d851d624801db858d0665b678942ae6e1054f","72287312769/292057600","7501853350801004123852489583801/2491182452574886297600000000","6311/7200"]]
 for(const spec of expected){
 const [pen,mask,T,K,hash,lambda,curvature,cos]=spec as [number,number,string,string,string,string,string,string]
 const policy=reviewedU85fbKPolicy(context,pen-1,mask-1)!;assert(policy);assert.deepEqual(policy.segment,strokes[pen-1][mask-1]);assert.equal(sha(JSON.stringify(policy.segment)),hash);assert.equal(policy.certificate.T,T);assert.equal(policy.certificate.K,K);assert.equal(policy.certificate.storedBounds.lambdaMin,lambda);assert.equal(policy.certificate.storedBounds.curvatureMargin,curvature);assert.equal(policy.certificate.storedBounds.cosMinusRK,cos)
 const make=()=>fake(policy)
for(const p of[1e-6,.03,.5]){const x=make(),r=commit(x,p);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,p*100);assert.equal(r.frame.rho,Math.min(7,p*100));assert.equal(x.ink.getAttribute('data-growing-distance'),String(r.frame.d));assert.equal(x.startCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.endCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(x.startCap.getAttribute('r'),'0');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null)}
 for(const p of[0,1]){const x=make(),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}
 let negatives=0;for(const p of[NaN,Infinity,-.1,1.1]){const x=make();assert.equal(commit(x,p).status,'hidden');negatives++}
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u85fb-k-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(const mutate of mutations)for(const when of['before','length','point']){const x=make();if(when==='before')mutate(x);else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden');negatives++}
 for(const L of[NaN,Infinity,-1,0,7]){const x=make();x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0]);negatives++}
 const invalid=make();invalid.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(invalid,.5).status,'hidden');negatives++
 const changed=make();changed.guide.writeHook=k=>{if(k==='stroke-dasharray'&&changed.counts()[1])changed.target.attrs['data-u85fb-k-progress']='.25'};assert.equal(commit(changed,.5).status,'hidden');negatives++
 const wrong=make();assert.equal(dispatch(wrong,.5,{...wrong.segment,weight:1}).status,'hidden');assert.deepEqual(wrong.counts(),[0,0]);negatives++
 const impostor=make();assert.equal(commitReviewedU85fbKCaps({...policy!},impostor.segment,.5,impostor.id,impostor.nodes as any).status,'hidden');negatives++
 console.log(JSON.stringify({DOMFirst:true,visibleSamples:3,emptyCompleteSamples:2,negative:negatives,canonicalSetRemove:true,visibilityLast:true,SSR:0,nativeApproval:false}))
 }
 assert.equal(REVIEWED_U85FB_K_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U85FB_K_SOURCE.previousMaskContactApproved,false);assert.equal(REVIEWED_U85FB_K_SOURCE.sevenM2ExcludedAndHeld,true);assert.equal(reviewedU85fbKPolicy(context,6,1),null);assert.deepEqual(REVIEWED_U85FB_K_SOURCE.heldTargets.map(t=>[t.pen,t.mask]),[[7,2]])
 console.log(JSON.stringify({ownDOMBatchFirst:true,targets:5,selected,materialNegative,getterReads,mathReruns:0,SSR:0,nativeApproval:false}))
})
