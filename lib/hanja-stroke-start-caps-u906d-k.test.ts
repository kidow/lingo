import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const FIXTURE='docs/hanja-source-cache-reorder-u906d-k-2026-10-23/fixture.json',FULL5='docs/hanja-goal-glyphwiki-batch867-2026-10-13/engine-whole-u906d-k.json'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=<T,>(v:T):T=>structuredClone(v)
const fixture=JSON.parse(read(FIXTURE).toString()),strokes=fixture.strokes
type R=readonly[bigint,bigint]
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
function r(a:bigint,b=1n):R{assert(b!==0n);if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
function q(s:string):R{if(s.includes('/')){const[a,b]=s.split('/').map(BigInt);return r(a,b)}const[a,b='']=s.split('.');return r(BigInt(a+b),10n**BigInt(b.length))}
const add=(a:R,b:R)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),neg=(a:R)=>r(-a[0],a[1]),sub=(a:R,b:R)=>add(a,neg(b)),mul=(a:R,b:R)=>r(a[0]*b[0],a[1]*b[1]),div=(a:R,b:R)=>r(a[0]*b[1],a[1]*b[0]),cmp=(a:R,b:R)=>a[0]*b[1]-b[0]*a[1],square=(a:R)=>mul(a,a),text=(a:R)=>a[1]===1n?String(a[0]):a[0]+'/'+a[1],dot=(a:R[],b:R[])=>add(mul(a[0],b[0]),mul(a[1],b[1])),abs=(a:R)=>a[0]<0n?neg(a):a
test('遭K own6 initial arc7 proof FIRST batch',()=>{
 assert.equal(sha(read(FIXTURE)),'8503729f72579cac9f6029501f1699c2182896b330220683e50ca71c7c676d60')
 assert.equal(sha(read(FULL5)),'139450f89416e14e1d1b097345f17167443cab237a4b7d6acc6ac4a64bde682f')
 const full=JSON.parse(read(FULL5).toString());assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(full.groups.length,19);assert.equal(full.groups.flatMap((g:any)=>g.polygons).length,30)
 assert.equal(sha(JSON.stringify(strokes)),'1e67a6daa66c2d9e88e82ffcf242bf88c3a99e8203c3a4f1d68662b2601c3113');assert.equal(strokes.length,15);assert.equal(strokes.flat().length,16)
 const coords=[[3,1],[9,1],[12,1],[13,1],[14,1],[15,1]],certificates:any[]=[],held:any[]=[]
 for(const[pen,mask]of coords){
  const m=strokes[pen-1][mask-1];assert.equal(m.direction,'curve');assert.equal(m.revealWidth,14);const syntax=m.revealPath.replace(/[-\d.\s]/g,'');assert(['MQ','MLL'].includes(syntax));if(syntax==='MLL'){const n=m.revealPath.match(/-?\d+(?:\.\d+)?/g).map(q),dx=sub(n[2],n[0]),dy=sub(n[3],n[1]),lengthSquared=add(square(dx),square(dy));assert.equal(text(dy),'0');assert(cmp(dx,q('7'))>0n);certificates.push({pen,mask,rawOneBased:fixture.sourceGroups[pen-1][mask-1]+1,syntax,maskSHA256:sha(JSON.stringify(m)),guide:m.revealPath,width:14,radius:7,weight:m.weight,T:'first-L',K:'0',initialLegKind:'straight-first-leg',firstLegLength:text(dx),chordSquaredAtT:text(lengthSquared),chordSquaredMinus49:text(sub(lengthSquared,q('49'))),curvatureMargin:'straight-kappa0',initialArcMax:7,onlyInitialSufficientConditions:true,initialSourcePConnectedNotProved:true,fullCoverageNotProved:true,fullSweepNotProved:true});continue}
  const n=m.revealPath.match(/-?\d+(?:\.\d+)?/g).map(q),A=n.slice(0,2),B=n.slice(2,4),E=n.slice(4,6),u=B.map((b:R,i:number)=>sub(b,A[i])),v=A.map((a:R,i:number)=>add(sub(a,mul(q('2'),B[i])),E[i]))
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
    selected={pen,mask,rawOneBased:fixture.sourceGroups[pen-1][mask-1]+1,syntax,initialLegKind:syntax==='MQQ'?'first-quadratic':'quadratic',maskSHA256:sha(JSON.stringify(m)),guide:m.revealPath,width:14,radius:7,weight:m.weight,T:ts,K:'1/'+den,A:A.map(text),u:u.map(text),v:v.map(text),lambdaMin:text(lambdaMin),lambdaMinAt:text(at),cross:text(cross),chordSquaredAtT:text(chordSquared),chordSquaredMinus49:text(sub(chordSquared,q('49'))),curvatureMargin:text(curvatureMargin),rK:text(rK),cosLower:text(cosLower),cosMinusRK:text(cosMinusRK),injectiveAxis:axis===0?'x':'y',derivativeEndpoints:[mul(q('2'),u[axis]),mul(q('2'),add(u[axis],mul(v[axis],T)))].map(text),initialArcMax:7,onlyInitialSufficientConditions:true,initialSourcePConnectedNotProved:true,fullCoverageNotProved:true,fullSweepNotProved:true};break
   }
   if(selected)break
  }
  if(selected)certificates.push(selected);else held.push({pen,mask,guide:m.revealPath,maskSHA256:sha(JSON.stringify(m)),reason:'No sufficient T/K in this bounded initial certificate search; no universal display impossibility claim.',nativeApproval:false})
 }
 assert.equal(certificates.length+held.length,6);assert(certificates.length>0);assert.deepEqual(held.map(h=>[h.pen,h.mask]),[])
 console.log('U906D_K_MATH_FIRST '+JSON.stringify({certificates,held,mathBatchRuns:1,sourceProjection:0,engine:0,oldMathReruns:0,nativeApproval:false}))
})

import {reviewedU906dKContext,reviewedU906dKPolicy,commitReviewedU906dKCaps,REVIEWED_U906D_K_SOURCE,REVIEWED_U906D_K_INPUT_SHA256} from './hanja-stroke-start-caps-u906d-k.ts'
function fake(policy:any){
 const id='u906d-k-test',events:string[]=[],doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view;let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg;const group=node('g'),target=node('g',{'data-stroke-start-gate':policy!.id,'data-u906d-k-progress':'0.5','data-u906d-k-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const segment=policy!.segment,q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u906d-k-measurement':'true',id:id+'-u906d-k-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u906d-k-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u906d-k-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u906d-k-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 return{policy,id,segment,q0,svg,group,target,measurement,mask,guide,startCap,endCap,ink,completed,nodes:{measurement,guide,startCap,endCap,ink},events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(f:()=>void)=>{lengthHook=f},onPoint:(f:(d:number)=>{x:number;y:number})=>{pointHook=f}}
}
const dispatch=(x:ReturnType<typeof fake>,p:number,s=x.segment)=>commitReviewedU906dKCaps(x.policy,s,p,x.id,x.nodes as any),commit=(x:ReturnType<typeof fake>,p:number)=>{x.target.attrs['data-u906d-k-progress']=String(p);return dispatch(x,p)}

test('遭K own6 initial-arc DOM sourceguards and lifecycle FIRST batch',()=>{
 const strokes=JSON.parse(read('docs/hanja-source-cache-terminal3-u906d-k-2026-10-23/fixture.json').toString()).strokes
 const context=reviewedU906dKContext(strokes);assert(context)
 assert.deepEqual(REVIEWED_U906D_K_SOURCE.counts,{"pens":15,"masks":17,"polygons":31,"originalPolygons":30,"targets":6,"MQ":3,"MLL":3})
 for(const[p,h]of Object.entries(REVIEWED_U906D_K_INPUT_SHA256))assert.equal(sha(read(p)),h,p)
 let selected=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)if(reviewedU906dKPolicy(context,i,j))selected++;assert.equal(selected,6)
 let materialNegative=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){const x=clone(strokes),m=x[i][j];if(key==='bounds')m.bounds[0]+=.01;else if(typeof m[key]==='number')m[key]+=.01;else m[key]+=' ';assert.equal(reviewedU906dKContext(x),null);materialNegative++}
 const extra=clone(strokes);Object.defineProperty(extra[0][0],'extra',{value:1});assert.equal(reviewedU906dKContext(extra),null)
 let getterReads=0;const getter=clone(strokes);Object.defineProperty(getter[0][0],'weight',{get(){getterReads++;return 1},enumerable:true});assert.equal(reviewedU906dKContext(getter),null);assert.equal(getterReads,0)
 const sparse=clone(strokes);delete sparse[0][0];assert.equal(reviewedU906dKContext(sparse),null);assert.equal(reviewedU906dKPolicy({...context},0,0),null)
 const expected=[[3,1,"first-L","0","e33ed471104e8042f70d8ace7a39a0e171f0e6a93cf254997a29c769afa53d3b",null,"straight-kappa0",null],[9,1,"first-L","0","0022a5f98e08f57a2a9538c6779d0684da85131a9393cc32a48da59358a72239",null,"straight-kappa0",null],[12,1,"1/2","1/40","1ff718cbf5f1110fea6f5356e54a492a583ff242b95cbaefac9f65b025011a9c","793/8","6952457/204800","2591/3200"],[13,1,"1/2","1/40","9e734d85ba36edffa710c2395bba4d7f7ee6a2717640fc54e8c4b735f848392b","9216/89","8316147456/17624225","2591/3200"],[14,1,"first-L","0","90985092651d634c5364974b40b8421825b5cad39124e680905ff798c81bbe9b",null,"straight-kappa0",null],[15,1,"1/3","1/200","2091b81d6549aa323c494cd7442c61027de2ea2e4b3a9021b0a0d166bd0985c1","241/2","3417521/80000","77151/80000"]]
 for(const spec of expected){
 const [pen,mask,T,K,hash,lambda,curvature,cos]=spec as [number,number,string,string,string,string|null,string,string|null]
 const policy=reviewedU906dKPolicy(context,pen-1,mask-1)!;assert(policy);assert.deepEqual(policy.segment,strokes[pen-1][mask-1]);assert.equal(sha(JSON.stringify(policy.segment)),hash);assert.equal(policy.certificate.T,T);assert.equal(policy.certificate.K,K);assert.equal(policy.certificate.storedBounds.lambdaMin??null,lambda);assert.equal(policy.certificate.storedBounds.curvatureMargin,curvature);assert.equal(policy.certificate.storedBounds.cosMinusRK??null,cos)
 const make=()=>fake(policy)
for(const p of[1e-6,.03,.5]){const x=make(),r=commit(x,p);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,p*100);assert.equal(r.frame.rho,Math.min(7,p*100));assert.equal(x.ink.getAttribute('data-growing-distance'),String(r.frame.d));assert.equal(x.startCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.endCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(x.startCap.getAttribute('r'),'0');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null)}
 for(const p of[0,1]){const x=make(),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}
 let negatives=0;for(const p of[NaN,Infinity,-.1,1.1]){const x=make();assert.equal(commit(x,p).status,'hidden');negatives++}
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u906d-k-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(const mutate of mutations)for(const when of['before','length','point']){const x=make();if(when==='before')mutate(x);else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden');negatives++}
 for(const L of[NaN,Infinity,-1,0,7]){const x=make();x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0]);negatives++}
 const invalid=make();invalid.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(invalid,.5).status,'hidden');negatives++
 const changed=make();changed.guide.writeHook=k=>{if(k==='stroke-dasharray'&&changed.counts()[1])changed.target.attrs['data-u906d-k-progress']='.25'};assert.equal(commit(changed,.5).status,'hidden');negatives++
 const wrong=make();assert.equal(dispatch(wrong,.5,{...wrong.segment,weight:1}).status,'hidden');assert.deepEqual(wrong.counts(),[0,0]);negatives++
 const impostor=make();assert.equal(commitReviewedU906dKCaps({...policy!},impostor.segment,.5,impostor.id,impostor.nodes as any).status,'hidden');negatives++
 console.log(JSON.stringify({DOMFirst:true,visibleSamples:3,emptyCompleteSamples:2,negative:negatives,canonicalSetRemove:true,visibilityLast:true,SSR:0,nativeApproval:false}))
 }
 assert.equal(REVIEWED_U906D_K_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U906D_K_SOURCE.previousMaskContactApproved,false);assert.equal(REVIEWED_U906D_K_SOURCE.fifteenM2OutsidePolicy,true);assert.equal(reviewedU906dKPolicy(context,14,1),null);
 console.log(JSON.stringify({ownDOMBatchFirst:true,targets:6,selected,materialNegative,getterReads,mathReruns:0,SSR:0,nativeApproval:false}))
})
