import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU51d7Context,reviewedU51d7Policy,commitReviewedU51d7Caps,REVIEWED_U51D7_SOURCE,REVIEWED_U51D7_INPUT_SHA256} from './hanja-stroke-start-gate-u51d7.ts'
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-reorder-u51d7-source-experiment-2026-10-22/fixture.json',import.meta.url),'utf8')),strokes=fixture.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x)),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex')
const context=reviewedU51d7Context(strokes),policy=reviewedU51d7Policy(context,0,0);assert(policy)
type R=readonly[bigint,bigint]
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
function r(a:bigint,b=1n):R{assert(b!==0n);if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
function q(s:string):R{if(s.includes('/')){const[a,b]=s.split('/').map(BigInt);return r(a,b)}const[a,b='']=s.split('.');return r(BigInt(a+b),10n**BigInt(b.length))}
const add=(a:R,b:R)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),neg=(a:R)=>r(-a[0],a[1]),sub=(a:R,b:R)=>add(a,neg(b)),mul=(a:R,b:R)=>r(a[0]*b[0],a[1]*b[1]),div=(a:R,b:R)=>r(a[0]*b[1],a[1]*b[0]),cmp=(a:R,b:R)=>a[0]*b[1]-b[0]*a[1],square=(a:R)=>mul(a,a),text=(a:R)=>a[1]===1n?String(a[0]):a[0]+'/'+a[1],dot=(a:R[],b:R[])=>add(mul(a[0],b[0]),mul(a[1],b[1])),abs=(a:R)=>a[0]<0n?neg(a):a

test('凗 own source and exact initial MQ arc7 math FIRST',()=>{
 assert(context);assert.equal(sha(JSON.stringify(strokes)),REVIEWED_U51D7_SOURCE.geometrySHA256)
 assert.equal(sha(JSON.stringify(strokes[0][0])),REVIEWED_U51D7_SOURCE.targetMaskSHA256)
 for(const[p,h]of Object.entries(REVIEWED_U51D7_INPUT_SHA256))assert.equal(sha(readFileSync(new URL('../'+p,import.meta.url))),h,p)
 let selected=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)if(reviewedU51d7Policy(context,i,j))selected++;assert.equal(selected,1)
 let materialNegative=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){const x=clone(strokes),m=x[i][j] as any;if(key==='bounds')m.bounds[0]+=.01;else if(typeof m[key]==='number')m[key]+=.01;else m[key]+=' ';assert.equal(reviewedU51d7Context(x),null);materialNegative++}
 const extra=clone(strokes);Object.defineProperty(extra[0][0],'extra',{value:1});assert.equal(reviewedU51d7Context(extra),null)
 let reads=0;const getter=clone(strokes);Object.defineProperty(getter[0][0],'weight',{get(){reads++;return 19.046427},enumerable:true});assert.equal(reviewedU51d7Context(getter),null);assert.equal(reads,0)
 const sparse=clone(strokes);delete(sparse[0] as any)[0];assert.equal(reviewedU51d7Context(sparse),null);assert.equal(reviewedU51d7Policy({...context!},0,0),null)
 const m=strokes[0][0];assert.equal(m.revealPath,'M10.08 16 Q19.68 20.5 24 29');assert.equal(m.revealWidth,14);assert.equal(m.weight,19.046427)
 const n=m.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(q),A=n.slice(0,2),B=n.slice(2,4),E=n.slice(4),u=B.map((b,i)=>sub(b,A[i])),v=A.map((a,i)=>add(sub(a,mul(q('2'),B[i])),E[i])),T=q('1/2'),K=q('1/20'),radius=q('7')
 const lambda=(t:R)=>{const w=u.map((a,i)=>add(a,mul(v[i],t)));return dot(w,w)},candidates=[q('0'),T],vv=dot(v,v),vertex=div(neg(dot(u,v)),vv);if(cmp(vertex,q('0'))>0n&&cmp(vertex,T)<0n)candidates.push(vertex)
 const lambdaMin=candidates.map(lambda).reduce((a,b)=>cmp(a,b)<0n?a:b),cross=abs(sub(mul(u[0],v[1]),mul(u[1],v[0]))),chord=u.map((a,i)=>add(mul(mul(q('2'),a),T),mul(v[i],square(T)))),chordSquared=dot(chord,chord)
 const curvatureMargin=sub(mul(mul(q('4'),square(K)),mul(square(lambdaMin),lambdaMin)),square(cross)),rK=mul(radius,K),cosLower=sub(q('1'),div(square(rK),q('2'))),cosMinusRK=sub(cosLower,rK)
 assert(cmp(lambdaMin,q('0'))>0n);assert(cmp(chordSquared,q('49'))>0n);assert(cmp(curvatureMargin,q('0'))>0n);assert(cmp(rK,q('1'))<0n);assert(cmp(cosMinusRK,q('0'))>0n)
 const derivativeEndpoints=[mul(q('2'),u[0]),mul(q('2'),add(u[0],v[0]))];assert(derivativeEndpoints.every(x=>cmp(x,q('0'))>0n))
 const b=policy!.certificate.storedBounds;assert.equal(text(lambdaMin),b.lambdaMin);assert.equal(text(cross),b.cross);assert.equal(text(chordSquared),b.chordSquaredAtT);assert.equal(text(sub(chordSquared,q('49'))),b.chordSquaredMinus49);assert.equal(text(cosLower),b.cosLower);assert.equal(text(cosMinusRK),b.cosMinusRK);assert.deepEqual(derivativeEndpoints.map(text),b.derivativeEndpoints);assert.equal(policy!.certificate.T,'1/2');assert.equal(policy!.certificate.K,'1/20')
 assert.equal(policy!.certificate.notRasterProof,true);assert.equal(policy!.certificate.notPreviousMaskConnectivityProof,true);assert.equal(policy!.certificate.notFullSweepProof,true);assert.equal(REVIEWED_U51D7_SOURCE.nativeApproval,false)
 console.log(JSON.stringify({mathFirst:true,target:'1m1',T:'1/2',K:'1/20',lambdaMin:text(lambdaMin),cross:text(cross),chordSquared:text(chordSquared),curvatureMargin:text(curvatureMargin),cosMinusRK:text(cosMinusRK),materialNegative,sourceCoverageApproved:false}))
})

function fake(){
 const id='u51d7-test',events:string[]=[],doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view;let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg;const group=node('g'),target=node('g',{'data-stroke-start-gate':policy!.id,'data-u51d7-progress':'0.5','data-u51d7-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const segment=policy!.segment,q0=[10.08,16];let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u51d7-measurement':'true',id:id+'-u51d7-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u51d7-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u51d7-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u51d7-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 return{id,segment,q0,svg,group,target,measurement,mask,guide,startCap,endCap,ink,completed,nodes:{measurement,guide,startCap,endCap,ink},events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(f:()=>void)=>{lengthHook=f},onPoint:(f:(d:number)=>{x:number;y:number})=>{pointHook=f}}
}
const dispatch=(x:ReturnType<typeof fake>,p:number,s=x.segment)=>commitReviewedU51d7Caps(policy!,s,p,x.id,x.nodes as any),commit=(x:ReturnType<typeof fake>,p:number)=>{x.target.attrs['data-u51d7-progress']=String(p);return dispatch(x,p)}

test('凗 own DOM canonical distance lifecycle FIRST',()=>{
 for(const p of[1e-6,.03,.5]){const x=fake(),r=commit(x,p);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,p*100);assert.equal(r.frame.rho,Math.min(7,p*100));assert.equal(x.ink.getAttribute('data-growing-distance'),String(r.frame.d));assert.equal(x.startCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.endCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(x.startCap.getAttribute('r'),'0');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null)}
 for(const p of[0,1]){const x=fake(),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}
 let negatives=0;for(const p of[NaN,Infinity,-.1,1.1]){const x=fake();assert.equal(commit(x,p).status,'hidden');negatives++}
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u51d7-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(const mutate of mutations)for(const when of['before','length','point']){const x=fake();if(when==='before')mutate(x);else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden');negatives++}
 for(const L of[NaN,Infinity,-1,0,7]){const x=fake();x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0]);negatives++}
 const invalid=fake();invalid.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(invalid,.5).status,'hidden');negatives++
 const changed=fake();changed.guide.writeHook=k=>{if(k==='stroke-dasharray'&&changed.counts()[1])changed.target.attrs['data-u51d7-progress']='.25'};assert.equal(commit(changed,.5).status,'hidden');negatives++
 const wrong=fake();assert.equal(dispatch(wrong,.5,{...wrong.segment,weight:1}).status,'hidden');assert.deepEqual(wrong.counts(),[0,0]);negatives++
 const impostor=fake();assert.equal(commitReviewedU51d7Caps({...policy!},impostor.segment,.5,impostor.id,impostor.nodes as any).status,'hidden');negatives++
 console.log(JSON.stringify({DOMFirst:true,visibleSamples:3,emptyCompleteSamples:2,negative:negatives,canonicalSetRemove:true,visibilityLast:true,SSR:0,nativeApproval:false}))
})
