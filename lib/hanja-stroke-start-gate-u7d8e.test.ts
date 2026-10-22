import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{reviewedU7d8eContext as context,reviewedU7d8ePolicy as policy,sampleReviewedU7d8eFoot as frame,REVIEWED_U7D8E_FOOT_PROOFS as PROOFS,REVIEWED_U7D8E_SOURCE as SOURCE}from'./hanja-stroke-start-gate-u7d8e.ts'
type R=readonly[bigint,bigint];type P=readonly[R,R]
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
const r=(n:bigint,d=1n):R=>{assert(d);if(d<0n){n=-n;d=-d}const g=gcd(n,d);return[n/g,d/g]},add=(a:R,b:R)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),sub=(a:R,b:R)=>r(a[0]*b[1]-b[0]*a[1],a[1]*b[1]),mul=(a:R,b:R)=>r(a[0]*b[0],a[1]*b[1]),div=(a:R,b:R)=>r(a[0]*b[1],a[1]*b[0]),eq=(a:R,b:R)=>a[0]*b[1]===b[0]*a[1],rat=(a:readonly string[])=>r(BigInt(a[0]),BigInt(a[1])),point=(p:readonly(readonly string[])[]):P=>[rat(p[0]),rat(p[1])]
const dec=(v:number):R=>{const[a,b='']=String(v).split('.');return r(BigInt(a+b),10n**BigInt(b.length))},vec=(a:P,b:P):P=>[sub(a[0],b[0]),sub(a[1],b[1])],cross=(a:P,b:P)=>sub(mul(a[0],b[1]),mul(a[1],b[0])),ori=(a:P,b:P,p:P)=>cross(vec(b,a),vec(p,a)),signed=(p:readonly P[])=>div(p.reduce((n,a,i)=>add(n,cross(a,p[(i+1)%p.length])),r(0n)),r(2n)),area=(p:readonly P[])=>{if(p.length<3)return r(0n);const a=signed(p);return r(a[0]<0n?-a[0]:a[0],a[1])},ccw=(p:P[])=>signed(p)[0]<0n?p.slice().reverse():p.slice(),pe=(a:P,b:P)=>eq(a[0],b[0])&&eq(a[1],b[1]),key=(p:P)=>p.map(v=>v.join('/')).join(','),center=(p:readonly P[]):P=>[div(p.reduce((n,v)=>add(n,v[0]),r(0n)),r(BigInt(p.length))),div(p.reduce((n,v)=>add(n,v[1]),r(0n)),r(BigInt(p.length)))]
const hit=(a:P,b:P,c:P,d:P):P=>{const v=vec(b,a),t=div(cross(vec(c,a),vec(d,c)),cross(v,vec(d,c)));return[add(a[0],mul(t,v[0])),add(a[1],mul(t,v[1]))]}
function clip(p:P[],a:P,b:P){const out:P[]=[];for(let i=0;i<p.length;i++){const u=p[i],v=p[(i+1)%p.length],x=ori(a,b,u)[0],y=ori(a,b,v)[0];if(x>=0n)out.push(u);if(x*y<0n)out.push(hit(u,v,a,b))}return out.filter((v,i)=>!i||!pe(v,out[i-1])).filter((v,i,a)=>i!==a.length-1||!pe(v,a[0]))}
function intersect(a:P[],b:P[]){let p=a.slice();for(let i=0;i<b.length&&p.length;i++)p=clip(p,b[i],b[(i+1)%b.length]);return p}
const inTri=(p:P,t:P[])=>t.every((a,i)=>ori(a,t[(i+1)%3],p)[0]>=0n)
function ear(p:P[]){let v=ccw(p),out:P[][]=[];while(v.length>3){let found=false;for(let i=0;i<v.length;i++){const a=v[(i+v.length-1)%v.length],b=v[i],c=v[(i+1)%v.length];if(ori(a,b,c)[0]===0n){v.splice(i,1);found=true;break}if(ori(a,b,c)[0]<0n)continue;if(v.some((q,j)=>j!==i&&j!==(i+1)%v.length&&j!==(i+v.length-1)%v.length&&inTri(q,[a,b,c])))continue;out.push([a,b,c]);v.splice(i,1);found=true;break}assert(found)}if(area(v)[0])out.push(v);return out}

const cmp=(a:R,b:R)=>sub(a,b)[0]<0n?-1:sub(a,b)[0]>0n?1:0,num=(v:readonly string[])=>Number(v[0])/Number(v[1])
function intervals(p:P[],x:R){const ys:R[]=[];for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length];if(sub(a[0],x)[0]*sub(b[0],x)[0]<0n)ys.push(add(a[1],div(mul(sub(x,a[0]),sub(b[1],a[1])),sub(b[0],a[0]))))}ys.sort(cmp);assert.equal(ys.length%2,0);return Array.from({length:ys.length/2},(_,i)=>[ys[2*i],ys[2*i+1]] as const)}
function unionIntervals(rows:readonly(readonly[R,R])[]){const sorted=rows.slice().sort((a,b)=>cmp(a[0],b[0])),out:[R,R][]=[];for(const[a,b]of sorted){const last=out.at(-1);if(last&&cmp(a,last[1])<=0){if(cmp(b,last[1])>0)last[1]=b}else out.push([a,b])}return out}
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
function inside(p:P,v:P[]){let w=0;for(let i=0;i<v.length;i++){const a=v[i],b=v[(i+1)%v.length],o=ori(a,b,p)[0];if(o===0n&&sub(p[0],a[0])[0]*sub(p[0],b[0])[0]<=0n&&sub(p[1],a[1])[0]*sub(p[1],b[1])[0]<=0n)return 0;if(cmp(a[1],p[1])<=0&&cmp(b[1],p[1])>0&&o>0n)w++;if(cmp(a[1],p[1])>0&&cmp(b[1],p[1])<=0&&o<0n)w--}return w?1:-1}
test('綎 own QQ1-y/QQ2-x exact contact and pure original-P policy FIRST',()=>{
 const cache=json(SOURCE.sourceCacheFile).u7d8e,source=json(SOURCE.sourceFile)
 assert.equal(sha(read(SOURCE.sourceFile)),SOURCE.sourceSHA256);assert.equal(sha(read(SOURCE.sourceCacheFile)),SOURCE.sourceCacheSHA256);assert.equal(sha(JSON.stringify(cache.strokes)),SOURCE.geometrySHA256);assert.equal(sha(JSON.stringify(PROOFS)),SOURCE.proofSHA256)
 assert.deepEqual(Object.keys(source).sort(),['engineRevision','engineHashes','groups','trace','defaults'].sort())
 assert.equal(cache.strokes.length,13);assert.equal(cache.strokes.flat().length,15);assert.equal(source.trace.flatMap((a:any)=>a).flatMap((a:any)=>a.polygons).length,35)
 const C=context(clone(cache.strokes));assert(C);assert.equal(context({} as any),null);assert.equal(policy({...C},0,1),null)
 let graphTriangles=0,slabs=0,negatives=0
 for(let k=0;k<2;k++){
  const F=PROOFS[k],POL=policy(C,k,1)!;assert(POL);assert.equal(POL.axis,k===0?'y':'x');assert.equal(policy(C,k,0),null);assert.equal(policy(C,k,2),null)
  const project=(p:P):P=>POL.axis==='y'?[p[1],p[0]]:p
  const polygons=(raw:number):P[][]=>source.trace[raw].flatMap((c:any)=>c.polygons).map((p:any)=>ccw(p.map((v:any):P=>project([div(dec(v.x),r(2n)),div(dec(v.y),r(2n))]))))
  const p1=polygons(2*k),p2=polygons(2*k+1),union=ccw(F.unionBoundary.map(point)),sector=ccw(F.sector.map(point)),tris=F.triangles.map(t=>ccw(t.map(point))),p1tris=p1.flatMap(ear),cut=rat(F.cut),max=rat(F.projectionRange[1])
  assert(eq(area(union),rat(F.unionArea)));assert(eq(area(sector),rat(F.sectorArea)))
  const xs=[...new Map([...union,...p2.flat()].map(p=>[p[0].join('/'),p[0]])).values()].sort(cmp);let exactArea=r(0n)
  for(let i=0;i<xs.length-1;i++){const mid=div(add(xs[i],xs[i+1]),r(2n)),actual=unionIntervals(p2.flatMap(p=>intervals(p,mid))),expected=intervals(union,mid);assert.equal(actual.length,1);assert.deepEqual(actual,expected);exactArea=add(exactArea,mul(sub(xs[i+1],xs[i]),sub(actual[0][1],actual[0][0])))}assert(eq(exactArea,area(union)));slabs+=xs.length-1
  let pairs=0;for(let i=0;i<union.length;i++)for(let j=i+1;j<union.length;j++){if(j===i+1||(i===0&&j===union.length-1))continue;pairs++;const a=union[i],b=union[(i+1)%union.length],c=union[j],d=union[(j+1)%union.length];assert(!(ori(a,b,c)[0]*ori(a,b,d)[0]<0n&&ori(c,d,a)[0]*ori(c,d,b)[0]<0n))}assert.equal(pairs,F.nonAdjacentPairs)
  const contacts=p1tris.flatMap(a=>ear(union).flatMap(b=>{const q=intersect(a,b);return area(q)[0]>0n?q:[]}));assert(contacts.length);const maxContact=contacts.reduce((a,b)=>cmp(a[0],b[0])>0?a:b)[0];assert(eq(cut,maxContact));assert.deepEqual(sector,ccw(clip(union,[cut,r(0n)],[cut,r(100n)])));assert(eq(tris.reduce((s,t)=>add(s,area(t)),r(0n)),area(sector)))
  for(let i=0;i<tris.length;i++)for(let j=i+1;j<tris.length;j++)assert.equal(area(intersect(tris[i],tris[j]))[0],0n)
  const seen=new Set<number>();let weights=r(0n)
  for(let i=0;i<F.order.length;i++){const o=F.order[i],t=tris[o.triangle],seed=point(o.seed);assert(!seen.has(o.triangle));assert(inTri(seed,t));assert(eq(rat(F.weights[i]),div(area(t),area(sector))));weights=add(weights,rat(F.weights[i]));if(o.parent===null){assert('p1Triangle'in o);const q=intersect(t,p1tris[o.p1Triangle!]);assert(area(q)[0]>0n);assert(pe(seed,center(q)));assert(p1.some(p=>inside(seed,p)===1),'strict original P1 seed');assert(p2.some(p=>inside(seed,p)===1),'strict original P2 seed');const args=source.trace[2*k][0].args,end=project([div(dec(args[4]),r(2n)),div(dec(args[5]),r(2n))]),delta=vec(seed,end),distance=add(mul(delta[0],delta[0]),mul(delta[1],delta[1]));assert(eq(distance,rat(F.rootPreviousFullRoundEndpointDistanceSquared)));assert(sub(r(49n),distance)[0]>0n)}else{assert(seen.has(o.parent));const edge=t.filter(v=>tris[o.parent!].some(w=>pe(v,w)));assert.equal(edge.length,2);assert(pe(seed,center(edge)))}seen.add(o.triangle)}
  assert.equal(seen.size,tris.length);graphTriangles+=seen.size;assert(eq(weights,r(1n)));assert(eq(rat(F.phaseShare),div(area(sector),area(union))))
  const args=source.trace[2*k+1][0].args,axis=POL.axis==='y'?1:0,d0=sub(dec(args[2+axis]),dec(args[axis])),d1=sub(dec(args[4+axis]),dec(args[2+axis])),derivative=cmp(d0,d1)<0?d0:d1;assert(derivative[0]>0n);assert(eq(derivative,rat(F.sourceQMinProjectionDerivative)));assert(eq(rat(F.nativeSourceProjection[0]),div(dec(args[axis]),r(2n))));assert(eq(rat(F.nativeSourceProjection[1]),div(dec(args[4+axis]),r(2n))))
  const zero=frame(POL,0),full=frame(POL,1),share=POL.phaseShare,foot=frame(POL,share);assert.equal(zero.phase,'empty');assert.equal(zero.footPathD,'');assert.equal(zero.bodyClip,null);assert.equal(full.originalPDirect,true);assert.equal(full.bodyClip,null);assert.equal(full.footPathD,'');assert.equal(full.L,null);assert.equal(foot.footFullTriangles,tris.length);assert.equal(foot.bodyClip![POL.axis==='x'?'width':'height'],0);assert.equal(frame(POL,1e-6).phase,'foot');assert.equal(frame(POL,.99999999,{sourceGuide:POL.segment.revealPath!,L:42,d:((.99999999-share)/(1-share))*42,point:{x:args[4]/2,y:args[5]/2}}).originalPDirect,false)
  const p=share+(1-share)*.5,q0=num(F.nativeSourceProjection[0]),q1=num(F.nativeSourceProjection[1]),sample=(q:number)=>({sourceGuide:POL.segment.revealPath!,L:42,d:((p-share)/(1-share))*42,point:POL.axis==='x'?{x:q,y:args[1]/2}:{x:args[0]/2,y:q}})
  const size=POL.axis==='x'?'width':'height';assert.equal(frame(POL,p,sample(q0)).bodyClip![size],0);assert.equal(frame(POL,p,sample(q1)).bodyClip![size],POL.max-POL.cut)
  for(const v of[-1,NaN,Infinity,1.01]){assert.throws(()=>frame(POL,v));negatives++}assert.throws(()=>frame({...POL},.1));assert.throws(()=>frame(POL,p));negatives+=2
  for(const change of[(v:any)=>v.sourceGuide+=' ',(v:any)=>v.d++,(v:any)=>v.L=NaN,(v:any)=>v.point.x=Infinity]){const bad=sample((q0+q1)/2);change(bad);assert.throws(()=>frame(POL,p,bad));negatives++}
  let reads=0;const getter=sample(q0);Object.defineProperty(getter,'L',{enumerable:true,get(){reads++;return 42}});assert.throws(()=>frame(POL,p,getter));assert.equal(reads,0);negatives++
  for(const key of Object.keys(cache.strokes[k][1])){const bad=clone(cache.strokes);if(key==='bounds')bad[k][1].bounds[0]++;else if(typeof bad[k][1][key]==='number')bad[k][1][key]++;else bad[k][1][key]+=' ';assert.notDeepEqual(bad,cache.strokes);assert.equal(context(bad),null);negatives++}
 }
 const sparse=clone(cache.strokes);delete sparse[0][1];assert.equal(context(sparse),null);const hidden=clone(cache.strokes);Object.defineProperty(hidden[1][1],'weight',{enumerable:false,value:hidden[1][1].weight});assert.equal(context(hidden),null);const nonTarget=clone(cache.strokes);nonTarget[12][0].weight++;assert.equal(context(nonTarget),null);assert(Object.isFrozen(PROOFS[0].order[0].seed))
 assert.equal(graphTriangles,19);assert.equal(slabs,49);assert.equal(PROOFS.reduce((n,p)=>n+p.projectionMonotoneSlabs,0),45);assert.equal(SOURCE.newInternalClock,true);assert.equal(SOURCE.microBackfillOfficialDirectionOrTimingEquivalent,false);assert.equal(SOURCE.priorP1WholeFullRoundCoverageApproved,false);assert.equal(SOURCE.DOMAdapterPrepared,true)
 console.log(JSON.stringify({glyph:'綎',targets:['1m2:y','2m2:x'],graphTriangles,slabs,negatives,strictP1P2Seeds:true,sourcePGuideWidthWeightPreserved:true,newInternalClock:true,officialMicroTimingEquivalent:false,priorP1WholeCoverageApproved:false,DOMAdapter:true,native:false,SSR:0,engine:0,sourceProjection:0}))
})

import{measureReviewedU7d8eFrame as measure,commitReviewedU7d8eMask as commit}from'./hanja-stroke-start-gate-u7d8e.ts'
function adapterTree(POL:any,p:number){
 const writes:{node:string;key:string;value:string|null}[]=[],reads:string[]=[]
 const view:any={getComputedStyle:(n:any)=>({transform:n.cssTransform??'none',getPropertyValue:(k:string)=>n.css?.[k]??''})},doc:any={defaultView:view};view.document=doc
 let hook:((stage:string)=>void)|null=null,writeHook:((n:any,key:string,value:string|null)=>void)|null=null
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>{const n:any={localName:name,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,parentElement:parent,ownerSVGElement:null,attrs:{...attrs},get id(){return this.attrs.id??''},getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=v;writes.push({node:this.id||name,key:k,value:v});writeHook?.(this,k,v)},removeAttribute(k:string){delete this.attrs[k];writes.push({node:this.id||name,key:k,value:null});writeHook?.(this,k,null)}};return n}
 const svg=node('svg',null),target=node('g',svg,{'data-stroke-start-gate':POL.id,'data-stroke-reveal-progress':String(p)}),defs=node('defs',target),key='u7d8e-adapter-'+POL.pen,b=POL.segment.bounds,CUT=POL.cut
 const path=node('path',defs,{id:key+'-u7d8e-measure',d:POL.segment.revealPath,'data-u7d8e-measurement':'true'})
 const mask=node('mask',defs,{id:key+'-u7d8e-foot-axis-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:key+'-u7d8e-body-clip',clipPathUnits:'userSpaceOnUse'})
 const ink=node('path',target,{id:key+'-u7d8e-ink','data-u7d8e-ink':'true','data-owner':key,d:POL.segment.outline,mask:'url(#'+mask.id+')','fill-rule':'nonzero',stroke:'none',visibility:'hidden'})
 const foot=node('path',mask,{id:key+'-u7d8e-foot','data-u7d8e-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none',d:'',visibility:'hidden'})
 const body=node('path',mask,{id:key+'-u7d8e-body','data-u7d8e-body':'true',d:POL.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#'+clip.id+')',visibility:'hidden'})
 const rect=node('rect',clip,{id:key+'-u7d8e-rect',x:String(POL.axis==='x'?CUT:b[0]),y:String(POL.axis==='y'?CUT:b[1]),width:String(POL.axis==='x'?0:b[2]-b[0]),height:String(POL.axis==='y'?0:b[3]-b[1])})
 for(const n of[target,defs,path,mask,clip,ink,foot,body,rect])n.ownerSVGElement=svg
 const a=POL.segment.revealPath.match(/-?\d+(?:\.\d+)?/g).map(Number)
 path.getTotalLength=()=>{reads.push('L');hook?.('L');return 42}
 path.getPointAtLength=(d:number)=>{reads.push('q');hook?.('q');return{x:a[0]+(a[4]-a[0])*d/42,y:a[1]+(a[5]-a[1])*d/42}}
 return{nodes:{ink,foot,body,rect,measurement:path},path,target,defs,svg,doc,view,mask,clip,ink,foot,body,rect,writes,reads,hook:(f:typeof hook)=>{hook=f},writeHook:(f:typeof writeHook)=>{writeHook=f},setProgress:(n:number)=>{target.attrs['data-stroke-reveal-progress']=String(n)}}
}
test('綎 DOM adapter tail FIRST: own connected original Q, axis clip, replay and visibility-last',()=>{
 const cache=json(SOURCE.sourceCacheFile).u7d8e,C=context(cache.strokes)!;assert(C);let guards=0,completed=0,start=process.env.HANJA_U7D8E_ADAPTER_TAIL==='1'?1:0
 for(let i=start;i<2;i++){
  const P=policy(C,i,1)!,p=P.phaseShare+(1-P.phaseShare)*.4,T=adapterTree(P,p),F=measure(P,p,T.path)
 assert.equal(F.UARead,true);assert.equal(F.d,F.bodyProgress*42);assert.deepEqual(T.reads,['L','q','q','q','L']);assert.equal(F.point![P.axis],F.nativePoint![P.axis]);assert.equal(F.threshold,F.bodyClip![P.axis]+F.bodyClip![P.axis==='x'?'width':'height'])
  assert.equal(commit(T.nodes,F),true);assert.equal(T.writes.at(-1)!.key,'visibility');assert.equal(T.writes.at(-1)!.value,'visible');assert.equal(T.writes.at(-1)!.node,T.ink.id);assert.equal(T.ink.attrs.d,P.segment.outline);assert.equal(T.body.attrs.d,P.segment.outline);assert.equal(Number(T.rect.attrs[P.axis==='x'?'width':'height']),F.threshold-P.cut);assert.equal(T.ink.attrs['data-growing-distance'],String(F.d));assert.equal(T.ink.attrs['data-growing-length'],'42');assert.equal(T.ink.getAttribute('data-growing-radius'),null)
  const calls=T.reads.length;T.setProgress(1);const full=measure(P,1,T.path);assert.equal(full.UARead,false);assert.equal(T.reads.length,calls);assert.equal(commit(T.nodes,full),true);assert.equal(T.ink.getAttribute('mask'),null);assert.equal(T.ink.attrs['data-u7d8e-full-mask'],'true');assert.equal(T.ink.getAttribute('data-growing-length'),null);assert.equal(T.ink.getAttribute('data-growing-end-x'),null);assert.equal(T.ink.attrs.d,P.segment.outline);completed++
  T.setProgress(0);assert.equal(commit(T.nodes,measure(P,0,T.path)),true);assert.equal(T.ink.attrs.visibility,'hidden');assert.equal(T.ink.attrs.mask,'url(#'+T.mask.id+')');assert.equal(T.foot.attrs.d,'');assert.equal(T.body.attrs.visibility,'hidden');assert.equal(Number(T.rect.attrs[P.axis==='x'?'width':'height']),0);assert.equal(T.ink.attrs['data-u7d8e-phase'],'empty')
  T.setProgress(1e-6);assert.equal(commit(T.nodes,measure(P,1e-6,T.path)),true);assert.equal(T.ink.attrs.visibility,'visible');assert.equal(T.body.attrs.visibility,'hidden');assert.equal(T.reads.length,calls)
  for(const mutate of[(t:any)=>t.path.attrs.d+=' ',(t:any)=>t.path.attrs.pathLength='1',(t:any)=>t.path.attrs['data-u7d8e-measurement']='false',(t:any)=>t.target.attrs['data-stroke-reveal-progress']='.1',(t:any)=>t.path.isConnected=false,(t:any)=>t.path.parentElement=t.svg,(t:any)=>t.defs.attrs.transform='translate(1)',(t:any)=>t.target.cssTransform='scale(2)',(t:any)=>t.svg.css={rotate:'1deg'},(t:any)=>t.path.ownerDocument={},(t:any)=>t.view.document={}]){
   const bad=adapterTree(P,p);mutate(bad);assert.throws(()=>measure(P,p,bad.path));assert.equal(bad.reads.length,0);guards++
  }
  for(const stage of ['L','q']){const bad=adapterTree(P,p);bad.hook(s=>{if(s===stage)bad.target.attrs['data-stroke-reveal-progress']='.1'});assert.throws(()=>measure(P,p,bad.path));guards++}
  const changing=adapterTree(P,p);let n=0;changing.path.getTotalLength=()=>++n===1?42:43;assert.throws(()=>measure(P,p,changing.path));guards++
  const nonfinite=adapterTree(P,p);nonfinite.path.getPointAtLength=()=>({x:NaN,y:0});assert.throws(()=>measure(P,p,nonfinite.path));guards++
  const forged=adapterTree(P,p);assert.throws(()=>measure({...P},p,forged.path));assert.equal(forged.reads.length,0);guards++
  for(const mutate of[(t:any)=>t.target.attrs['data-stroke-reveal-progress']='.2',(t:any)=>t.ink.attrs.d+=' ',(t:any)=>t.body.attrs.d+=' ',(t:any)=>t.foot.attrs.fill='black',(t:any)=>t.ink.attrs.stroke='black',(t:any)=>t.rect.attrs.x='999',(t:any)=>t.rect.attrs.y='999',(t:any)=>t.rect.attrs[P.axis==='x'?'height':'width']='999',(t:any)=>t.mask.attrs.maskUnits='objectBoundingBox',(t:any)=>t.body.attrs['clip-path']='url(#other)',(t:any)=>t.foot.parentElement=t.defs,(t:any)=>t.measurement.ownerSVGElement={}]){
   const bad=adapterTree(P,p),f=measure(P,p,bad.path);mutate({...bad,measurement:bad.path});assert.equal(commit(bad.nodes,f),false);assert.equal(bad.ink.attrs.visibility,'hidden');assert.equal(bad.foot.attrs.visibility,'hidden');assert.equal(bad.body.attrs.visibility,'hidden');guards++
  }
  const late=adapterTree(P,p),lateFrame=measure(P,p,late.path);late.writeHook((node,key)=>{if(node===late.ink&&key==='data-u7d8e-phase')late.rect.attrs.x='999'});assert.equal(commit(late.nodes,lateFrame),false);assert.equal(late.ink.attrs.visibility,'hidden');guards++
  const copied=adapterTree(P,p),privateFrame=measure(P,p,copied.path);assert.equal(commit(copied.nodes,{...privateFrame}),false);assert.equal(copied.ink.attrs.visibility,'hidden');guards++
 }
 assert.equal(completed,2-start);assert.equal(SOURCE.DOMAdapterPrepared,true);assert.equal(SOURCE.priorP1WholeFullRoundCoverageApproved,false);assert.equal(SOURCE.nativeApproval,false)
 console.log(JSON.stringify({glyph:'綎',adapterTargetAxes:['1m2:y','2m2:x'].slice(start),failedOnlyStart:start,passedTargetLoopsRepeated:0,guards,completed,actualUA:false,mathLoopsRepeated:0,SSR:0,nativeApproval:false,sharedEdits:0}))
})
