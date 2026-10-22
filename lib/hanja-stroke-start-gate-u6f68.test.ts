import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const FIXTURE='docs/hanja-source-independent-reorder-u6f68-source-experiment-2026-10-23/fixture.json',FULL5='docs/hanja-source-raw-compare-u6f68-2026-10-23/engine-whole-u6f68.json'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=<T,>(v:T):T=>structuredClone(v)
const fixture=JSON.parse(read(FIXTURE).toString()),strokes=fixture.strokes
type R=readonly[bigint,bigint]
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
function r(a:bigint,b=1n):R{assert(b!==0n);if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
function q(s:string):R{if(s.includes('/')){const[a,b]=s.split('/').map(BigInt);return r(a,b)}const[a,b='']=s.split('.');return r(BigInt(a+b),10n**BigInt(b.length))}
const add=(a:R,b:R)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),neg=(a:R)=>r(-a[0],a[1]),sub=(a:R,b:R)=>add(a,neg(b)),mul=(a:R,b:R)=>r(a[0]*b[0],a[1]*b[1]),div=(a:R,b:R)=>r(a[0]*b[1],a[1]*b[0]),cmp=(a:R,b:R)=>a[0]*b[1]-b[0]*a[1],square=(a:R)=>mul(a,a),text=(a:R)=>a[1]===1n?String(a[0]):a[0]+'/'+a[1],dot=(a:R[],b:R[])=>add(mul(a[0],b[0]),mul(a[1],b[1])),abs=(a:R)=>a[0]<0n?neg(a):a
test('潨 own10 MQ exact initial arc7 proof FIRST batch',()=>{
 assert.equal(sha(read(FIXTURE)),'d07dc4934de46af1ac84ef33cfee28b57d231c660d0a2f5678c6f3e8768a3494')
 assert.equal(sha(read(FULL5)),'7411f7ea88acc7ba7544d5ac54a8d9f98602569b383a2445c8f6cb5f33367e52')
 const full=JSON.parse(read(FULL5).toString());assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(full.groups.length,17);assert.equal(full.groups.flatMap((g:any)=>g.polygons).length,33)
 assert.equal(sha(JSON.stringify(strokes)),'99ac9fce880e3aadcedad052dce8c487290eb5ccb7e6750a6260fd89e3ffb46d');assert.equal(strokes.length,15);assert.equal(strokes.flat().length,17)
 const coords=[[1,1],[2,1],[3,1],[3,2],[4,1],[10,1],[12,1],[13,1],[14,1],[15,1]],certificates:any[]=[],held:any[]=[]
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
  if(selected)certificates.push(selected);else held.push({pen,mask,reason:'tested exact T/K sufficient conditions not established; no native approval'})
 }
 assert.equal(certificates.length+held.length,10);assert(certificates.length>0)
 console.log('U6F68_MATH_FIRST '+JSON.stringify({certificates,held,mathBatchRuns:1,sourceProjection:0,engine:0,oldMathReruns:0,nativeApproval:false}))
})

import {reviewedU6f68Context,reviewedU6f68Policy,commitReviewedU6f68Caps,REVIEWED_U6F68_SOURCE,REVIEWED_U6F68_INPUT_SHA256} from './hanja-stroke-start-gate-u6f68.ts'
function fake(policy:any){
 const id='u6f68-test',events:string[]=[],doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view;let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg;const group=node('g'),target=node('g',{'data-stroke-start-gate':policy!.id,'data-u6f68-progress':'0.5','data-u6f68-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const segment=policy!.segment,q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u6f68-measurement':'true',id:id+'-u6f68-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u6f68-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u6f68-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u6f68-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 return{policy,id,segment,q0,svg,group,target,measurement,mask,guide,startCap,endCap,ink,completed,nodes:{measurement,guide,startCap,endCap,ink},events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(f:()=>void)=>{lengthHook=f},onPoint:(f:(d:number)=>{x:number;y:number})=>{pointHook=f}}
}
const dispatch=(x:ReturnType<typeof fake>,p:number,s=x.segment)=>commitReviewedU6f68Caps(x.policy,s,p,x.id,x.nodes as any),commit=(x:ReturnType<typeof fake>,p:number)=>{x.target.attrs['data-u6f68-progress']=String(p);return dispatch(x,p)}

test('潨 own10 MQ DOM sourceguards and lifecycle FIRST batch',()=>{
 const context=reviewedU6f68Context(strokes);assert(context)
 assert.deepEqual(REVIEWED_U6F68_SOURCE.counts,{pens:15,masks:17,polygons:33,targets:10})
 for(const[p,h]of Object.entries(REVIEWED_U6F68_INPUT_SHA256))assert.equal(sha(read(p)),h,p)
 let selected=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)if(reviewedU6f68Policy(context,i,j))selected++;assert.equal(selected,10)
 let materialNegative=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){const x=clone(strokes),m=x[i][j];if(key==='bounds')m.bounds[0]+=.01;else if(typeof m[key]==='number')m[key]+=.01;else m[key]+=' ';assert.equal(reviewedU6f68Context(x),null);materialNegative++}
 const extra=clone(strokes);Object.defineProperty(extra[0][0],'extra',{value:1});assert.equal(reviewedU6f68Context(extra),null)
 let getterReads=0;const getter=clone(strokes);Object.defineProperty(getter[0][0],'weight',{get(){getterReads++;return 1},enumerable:true});assert.equal(reviewedU6f68Context(getter),null);assert.equal(getterReads,0)
 const sparse=clone(strokes);delete sparse[0][0];assert.equal(reviewedU6f68Context(sparse),null);assert.equal(reviewedU6f68Policy({...context},0,0),null)
 const expected=[[1,1,"1/2","1/20","eb88b08de9cd4e726aeb91bd69699084cc0239ac4f88bb3838093ec431b3b632","2622789/40000","4053875585669355069/6400000000000000","471/800"],[2,1,"1/2","1/20","2a5b8c023ad3c3a0c93e5071d8dd802e325bb4e0fd5fc38a95f3be7e2633cea6","43334761/640000","8449034198205676953081/26214400000000000000","471/800"],[3,1,"1/3","1/13","b967c03e70965a73d2f8d60182bf1e692ac6e24dbb623330bbe11da15fe19dc2","1182465769/8011961","133162163323423337034735498060031/13906670574551537238254240000","107/338"],[3,2,"1/3","1/12","72152507f7a93a931a1b000f1051d154686e5ec7074a0ef7fef497aaa9c6b7b7","378769/10000","3241853946130609/36000000000000","71/288"],[4,1,"1/2","1/100","333574b81c9c152840cc77e79c2bf4575cbff046b2786ed24e42db1d861a3946","125/2","2243/32","18551/20000"],[10,1,"1/4","1/40","2dd64cf44e4c5338076e57757f715cafff8a248a1d4d53ab459665b75d3af671","169","786709/400","2591/3200"],[12,1,"1/3","1/50","fc4b1094b0b656e611cfa51ff7478f6398c0fa07a4058f921d3085f41d999c4d","9657/64","246431676393/163840000","4251/5000"],[13,1,"1/4","1/80","a1ecb3646e7a56fcefd546e925436d47f812ff3b5d0e71702ebd4b9b45a5791c","304825/1024","271897283723089/68719476736","11631/12800"],[14,1,"1/2","1/60","3aee67b55d14c0fb7fba7f2d55da1384c1b20d6b0d529332e19465db19c26e3e","125/2","239359/2304","6311/7200"],[15,1,"1/4","1/100","b9cbf588c923058bd4d89b88708cf9e148d5cfea2eb0169a5471d3270f5adbea","705049/1024","69985974829392649/2684354560000","18551/20000"]]
 for(const spec of expected){
 const [pen,mask,T,K,hash,lambda,curvature,cos]=spec as [number,number,string,string,string,string,string,string]
 const policy=reviewedU6f68Policy(context,pen-1,mask-1)!;assert(policy);assert.deepEqual(policy.segment,strokes[pen-1][mask-1]);assert.equal(sha(JSON.stringify(policy.segment)),hash);assert.equal(policy.certificate.T,T);assert.equal(policy.certificate.K,K);assert.equal(policy.certificate.storedBounds.lambdaMin,lambda);assert.equal(policy.certificate.storedBounds.curvatureMargin,curvature);assert.equal(policy.certificate.storedBounds.cosMinusRK,cos)
 const make=()=>fake(policy)
for(const p of[1e-6,.03,.5]){const x=make(),r=commit(x,p);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,p*100);assert.equal(r.frame.rho,Math.min(7,p*100));assert.equal(x.ink.getAttribute('data-growing-distance'),String(r.frame.d));assert.equal(x.startCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.endCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(x.startCap.getAttribute('r'),'0');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null)}
 for(const p of[0,1]){const x=make(),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}
 let negatives=0;for(const p of[NaN,Infinity,-.1,1.1]){const x=make();assert.equal(commit(x,p).status,'hidden');negatives++}
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u6f68-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(const mutate of mutations)for(const when of['before','length','point']){const x=make();if(when==='before')mutate(x);else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden');negatives++}
 for(const L of[NaN,Infinity,-1,0,7]){const x=make();x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0]);negatives++}
 const invalid=make();invalid.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(invalid,.5).status,'hidden');negatives++
 const changed=make();changed.guide.writeHook=k=>{if(k==='stroke-dasharray'&&changed.counts()[1])changed.target.attrs['data-u6f68-progress']='.25'};assert.equal(commit(changed,.5).status,'hidden');negatives++
 const wrong=make();assert.equal(dispatch(wrong,.5,{...wrong.segment,weight:1}).status,'hidden');assert.deepEqual(wrong.counts(),[0,0]);negatives++
 const impostor=make();assert.equal(commitReviewedU6f68Caps({...policy!},impostor.segment,.5,impostor.id,impostor.nodes as any).status,'hidden');negatives++
 console.log(JSON.stringify({DOMFirst:true,visibleSamples:3,emptyCompleteSamples:2,negative:negatives,canonicalSetRemove:true,visibilityLast:true,SSR:0,nativeApproval:false}))
 }
 assert.equal(REVIEWED_U6F68_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U6F68_SOURCE.previousMaskContactApproved,false);assert.equal(REVIEWED_U6F68_SOURCE.threeM2TimeConnectivityApproved,false)
 console.log(JSON.stringify({ownDOMBatchFirst:true,targets:10,selected,materialNegative,getterReads,mathReruns:0,SSR:0,nativeApproval:false}))
})
