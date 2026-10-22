import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const FIXTURE='docs/hanja-source-independent-reorder-u8810-source-experiment-2026-10-23/fixture.json',FULL5='docs/hanja-source-raw-compare-u8810-2026-10-23/engine-whole-u8810.json'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=<T,>(v:T):T=>structuredClone(v)
const fixture=JSON.parse(read(FIXTURE).toString()),strokes=fixture.strokes
type R=readonly[bigint,bigint]
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
function r(a:bigint,b=1n):R{assert(b!==0n);if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
function q(s:string):R{if(s.includes('/')){const[a,b]=s.split('/').map(BigInt);return r(a,b)}const[a,b='']=s.split('.');return r(BigInt(a+b),10n**BigInt(b.length))}
const add=(a:R,b:R)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),neg=(a:R)=>r(-a[0],a[1]),sub=(a:R,b:R)=>add(a,neg(b)),mul=(a:R,b:R)=>r(a[0]*b[0],a[1]*b[1]),div=(a:R,b:R)=>r(a[0]*b[1],a[1]*b[0]),cmp=(a:R,b:R)=>a[0]*b[1]-b[0]*a[1],square=(a:R)=>mul(a,a),text=(a:R)=>a[1]===1n?String(a[0]):a[0]+'/'+a[1],dot=(a:R[],b:R[])=>add(mul(a[0],b[0]),mul(a[1],b[1])),abs=(a:R)=>a[0]<0n?neg(a):a
test('蠐 own9 initial arc7 proof FIRST batch',()=>{
 assert.equal(sha(read(FIXTURE)),'b6e2f229a4fbf730f357e12b7c4ca581b95cd2996f84864d162af7ac00e33e55')
 assert.equal(sha(read(FULL5)),'8061eba86732b7e13a5c5e169b08adebf4e846bf176a7a938cfde5f1dcab3a4b')
 const full=JSON.parse(read(FULL5).toString());assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(full.groups.length,23);assert.equal(full.groups.flatMap((g:any)=>g.polygons).length,46)
 assert.equal(sha(JSON.stringify(strokes)),'f333a586206102922031a9b39bf376e0cdc00c9a658e690510ee2d9f733b800f');assert.equal(strokes.length,20);assert.equal(strokes.flat().length,23)
 const coords=[[5,1],[6,1],[9,1],[10,1],[12,2],[13,1],[14,1],[16,1],[17,1]],certificates:any[]=[],held:any[]=[]
 for(const[pen,mask]of coords){
  const m=strokes[pen-1][mask-1];assert.equal(m.direction,'curve');assert.equal(m.revealWidth,14);const syntax=m.revealPath.replace(/[-\d.\s]/g,'');assert(['MQ','MQQ','MLQ'].includes(syntax));if(syntax==='MLQ'){const n=m.revealPath.match(/-?\d+(?:\.\d+)?/g).map(q),dx=sub(n[2],n[0]),dy=sub(n[3],n[1]),lengthSquared=add(square(dx),square(dy));assert.equal(text(dx),'0');assert(cmp(dy,q('7'))>0n);certificates.push({pen,mask,rawOneBased:fixture.sourceGroups[pen-1][mask-1]+1,syntax,maskSHA256:sha(JSON.stringify(m)),guide:m.revealPath,width:14,radius:7,weight:m.weight,T:'first-L',K:'0',initialLegKind:'straight-first-leg',firstLegLength:text(dy),chordSquaredAtT:text(lengthSquared),chordSquaredMinus49:text(sub(lengthSquared,q('49'))),curvatureMargin:'straight-kappa0',initialArcMax:7,onlyInitialSufficientConditions:true,initialSourcePConnectedNotProved:true,fullCoverageNotProved:true,fullSweepNotProved:true});continue}
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
 assert.equal(certificates.length+held.length,9);assert(certificates.length>0);assert.deepEqual(held.map(h=>[h.pen,h.mask]),[])
 console.log('U8810_MATH_FIRST '+JSON.stringify({certificates,held,mathBatchRuns:1,sourceProjection:0,engine:0,oldMathReruns:0,nativeApproval:false}))
})

import {reviewedU8810Context,reviewedU8810Policy,commitReviewedU8810Caps,REVIEWED_U8810_SOURCE,REVIEWED_U8810_INPUT_SHA256} from './hanja-stroke-start-caps-u8810.ts'
function fake(policy:any){
 const id='u8810-test',events:string[]=[],doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view;let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg;const group=node('g'),target=node('g',{'data-stroke-start-gate':policy!.id,'data-u8810-progress':'0.5','data-u8810-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const segment=policy!.segment,q0=segment.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u8810-measurement':'true',id:id+'-u8810-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u8810-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u8810-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u8810-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 return{policy,id,segment,q0,svg,group,target,measurement,mask,guide,startCap,endCap,ink,completed,nodes:{measurement,guide,startCap,endCap,ink},events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(f:()=>void)=>{lengthHook=f},onPoint:(f:(d:number)=>{x:number;y:number})=>{pointHook=f}}
}
const dispatch=(x:ReturnType<typeof fake>,p:number,s=x.segment)=>commitReviewedU8810Caps(x.policy,s,p,x.id,x.nodes as any),commit=(x:ReturnType<typeof fake>,p:number)=>{x.target.attrs['data-u8810-progress']=String(p);return dispatch(x,p)}

test('蠐 own9 initial-arc DOM sourceguards and lifecycle FIRST batch',()=>{
 const context=reviewedU8810Context(strokes);assert(context)
 assert.deepEqual(REVIEWED_U8810_SOURCE.counts,{"pens":20,"masks":23,"polygons":46,"targets":9,"MQ":7,"MQQ":1,"MLQ":1})
 for(const[p,h]of Object.entries(REVIEWED_U8810_INPUT_SHA256))assert.equal(sha(read(p)),h,p)
 let selected=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)if(reviewedU8810Policy(context,i,j))selected++;assert.equal(selected,9)
 let materialNegative=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){const x=clone(strokes),m=x[i][j];if(key==='bounds')m.bounds[0]+=.01;else if(typeof m[key]==='number')m[key]+=.01;else m[key]+=' ';assert.equal(reviewedU8810Context(x),null);materialNegative++}
 const extra=clone(strokes);Object.defineProperty(extra[0][0],'extra',{value:1});assert.equal(reviewedU8810Context(extra),null)
 let getterReads=0;const getter=clone(strokes);Object.defineProperty(getter[0][0],'weight',{get(){getterReads++;return 1},enumerable:true});assert.equal(reviewedU8810Context(getter),null);assert.equal(getterReads,0)
 const sparse=clone(strokes);delete sparse[0][0];assert.equal(reviewedU8810Context(sparse),null);assert.equal(reviewedU8810Policy({...context},0,0),null)
 const expected=[[5,1,"1/4","1/100","0e615e9bae5a06269fe99842dcd2021590a31f116fb502f6755dc7b4b83a20d3","5496921/25600","96660181304786837961/41943040000000000","18551/20000"],[6,1,"1/3","1/30","a2ea4b17cb1527cc55d6df2880498abaf0981113d8ec4456d43a36cd8f253ae1","10195249/75904","432744835359778610833/98395787781734400","1331/1800"],[9,1,"2/3","1/30","a691e6c791eaf9ef42eb0b8d1aa7bf117f197ea205a3c1a6aa2a5150914d5f55","699397/20000","37223661747143773/1800000000000000","1331/1800"],[10,1,"1/2","1/80","8aa05f8efb296de07b558e0b74f3387100d76be5f9350c25ba588ce79743547e","510158500000000603000000000001/10000000000000000000000000000","32872890734779642258231476094055054751446252065009680000002621302500000001809000000000001/1600000000000000000000000000000000000000000000000000000000000000000000000000000000000000","11631/12800"],[12,2,"1/3","1/100","009f15a413585bbd1d1152b110429230235ad8dbba9e06fdd8fe146d01501092","288706101164151707866910669849/2812500000000000000000000000","16606305786546296091448537279555813158164758457540923648476791226373163409771738856567049/55618286132812500000000000000000000000000000000000000000000000000000000000000000000000","18551/20000"],[13,1,"1/4","1/25","7856e98fe3be1bf2beae918c75546bcfca56f66e951bd7bd0a6f0c731ae4843d","192892428124999994807500000000001/1000000000000000000000000000000","2024894774527047504944176034432355739835038290862991060924687500659563453124999984422500000000001/156250000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","851/1250"],[14,1,"1/2","1/100","5c2acf17c2f49f0656f356a78bf8026d094226a1c69baf92c4240a7c98f66495","1762461/40000","201786701163593690564999999987679/16000000000000000000000000000000","18551/20000"],[16,1,"1/4","1/50","1df3588678ca9c9614ef91089ab4848266fd14dfffe9caa548dca33869f62cc6","543718489/2560000","48417101467709225000564169/10485760000000000000000","4251/5000"],[17,1,"first-L","0","59d3d09ba33731f97a08c70d192ca4b3f576517bd449da596a25e416c99b1e4e",null,"straight-kappa0",null]]
 for(const spec of expected){
 const [pen,mask,T,K,hash,lambda,curvature,cos]=spec as [number,number,string,string,string,string|null,string,string|null]
 const policy=reviewedU8810Policy(context,pen-1,mask-1)!;assert(policy);assert.deepEqual(policy.segment,strokes[pen-1][mask-1]);assert.equal(sha(JSON.stringify(policy.segment)),hash);assert.equal(policy.certificate.T,T);assert.equal(policy.certificate.K,K);assert.equal(policy.certificate.storedBounds.lambdaMin??null,lambda);assert.equal(policy.certificate.storedBounds.curvatureMargin,curvature);assert.equal(policy.certificate.storedBounds.cosMinusRK??null,cos)
 const make=()=>fake(policy)
for(const p of[1e-6,.03,.5]){const x=make(),r=commit(x,p);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,p*100);assert.equal(r.frame.rho,Math.min(7,p*100));assert.equal(x.ink.getAttribute('data-growing-distance'),String(r.frame.d));assert.equal(x.startCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.endCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(x.startCap.getAttribute('r'),'0');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null)}
 for(const p of[0,1]){const x=make(),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}
 let negatives=0;for(const p of[NaN,Infinity,-.1,1.1]){const x=make();assert.equal(commit(x,p).status,'hidden');negatives++}
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u8810-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(const mutate of mutations)for(const when of['before','length','point']){const x=make();if(when==='before')mutate(x);else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden');negatives++}
 for(const L of[NaN,Infinity,-1,0,7]){const x=make();x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0]);negatives++}
 const invalid=make();invalid.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(invalid,.5).status,'hidden');negatives++
 const changed=make();changed.guide.writeHook=k=>{if(k==='stroke-dasharray'&&changed.counts()[1])changed.target.attrs['data-u8810-progress']='.25'};assert.equal(commit(changed,.5).status,'hidden');negatives++
 const wrong=make();assert.equal(dispatch(wrong,.5,{...wrong.segment,weight:1}).status,'hidden');assert.deepEqual(wrong.counts(),[0,0]);negatives++
 const impostor=make();assert.equal(commitReviewedU8810Caps({...policy!},impostor.segment,.5,impostor.id,impostor.nodes as any).status,'hidden');negatives++
 console.log(JSON.stringify({DOMFirst:true,visibleSamples:3,emptyCompleteSamples:2,negative:negatives,canonicalSetRemove:true,visibilityLast:true,SSR:0,nativeApproval:false}))
 }
 assert.equal(REVIEWED_U8810_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U8810_SOURCE.previousMaskContactApproved,false);assert.equal(REVIEWED_U8810_SOURCE.fifteenM2OutsidePolicy,true);assert.equal(reviewedU8810Policy(context,14,1),null);
 console.log(JSON.stringify({ownDOMBatchFirst:true,targets:9,selected,materialNegative,getterReads,mathReruns:0,SSR:0,nativeApproval:false}))
})

