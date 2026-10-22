import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU568cFootContext,reviewedU568cFootPolicy,makeReviewedU568cFootSourceContext,measureReviewedU568cFootFrame,commitReviewedU568cFootMask,REVIEWED_U568C_FOOT_SOURCE as SOURCE} from './hanja-stroke-source-foot-u568c.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),sha=(s:string)=>createHash('sha256').update(s).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const f=JSON.parse(bytes(SOURCE.sourceCacheFile)),proof=JSON.parse(bytes(SOURCE.sourceFile)),strokes=f.strokes,identity={"root":"u568c","file":"../hanja-source-raw-compare-u568c-2026-10-23/engine-whole-u568c.json","fileSHA256":"0fb793d710713d24757c82f0ba9494beb5d025d43ceb10ede0a0dfd7ecc6535d"},context=reviewedU568cFootContext(strokes),policies=[reviewedU568cFootPolicy(context,11,1)],code=readFileSync(new URL('./hanja-stroke-source-foot-u568c.ts',import.meta.url),'utf8'),feet=JSON.parse(code.match(/^const FEET=(.*)$/m)![1])[0],R=(r:string[])=>r.map(BigInt),P=(p:string[][])=>p.map(R)
// Reused exact primitive code only; every union/seed/frontier check below is own 嚌12m2 data.
const zhenG=(a,b)=>{a=a<0n?-a:a;while(b){var t=a%b;a=b;b=t;}return a}
const zhenNeg=a=>[-a[0],a[1]]
const zhenN=([n,d])=>{if(d<0n){n=-n;d=-d}var g=zhenG(n,d);return[n/g,d/g]}
const zhenR=(s)=>{s=String(s);var neg=s[0]==='-';if(neg)s=s.slice(1);var [a,b='']=s.split('.');return[BigInt((neg?'-':'')+(a+b)),10n**BigInt(b.length)];}
const zhenAdd=(a,b)=>zhenN([a[0]*b[1]+b[0]*a[1],a[1]*b[1]])
const zhenSub=(a,b)=>zhenAdd(a,zhenNeg(b))
const zhenMul=(a,b)=>zhenN([a[0]*b[0],a[1]*b[1]])
const zhenPoint=(x,y)=>[zhenR(x),zhenR(y)]
const zhenCross=(a,b,p)=>zhenSub(zhenMul(zhenSub(b[0],a[0]),zhenSub(p[1],a[1])),zhenMul(zhenSub(b[1],a[1]),zhenSub(p[0],a[0])))
const jiCmp=(a,b)=>{const n=zhenSub(a,b)[0];return n<0n?-1:n>0n?1:0}
const jiDiv=(a,b)=>{assert.notEqual(b[0],0n);return zhenN([a[0]*b[1],a[1]*b[0]])}
const jiEqP=(a,b)=>a.every((v,k)=>jiCmp(v,b[k])===0)
const jiArea2=p=>p.reduce((s,a,i)=>zhenAdd(s,zhenSub(zhenMul(a[0],p[(i+1)%p.length][1]),zhenMul(a[1],p[(i+1)%p.length][0]))),[0n,1n])
const jiPositivePoly=p=>jiArea2(p)[0]<0n?[...p].reverse():p
const jiInTri=(p,t)=>t.every((a,i)=>zhenCross(a,t[(i+1)%3],p)[0]>=0n)
const jiTriangulate=p0=>{var p=jiPositivePoly(p0).slice(),out=[],budget=p.length*p.length;while(p.length>3){var found=false;for(var i=0;i<p.length;i++){var a=p[(i+p.length-1)%p.length],b=p[i],c=p[(i+1)%p.length],turn=zhenCross(a,b,c);if(turn[0]===0n){p.splice(i,1);found=true;break}if(turn[0]<0n)continue;var tri=[a,b,c];if(p.some((q,j)=>j!==i&&j!==(i+p.length-1)%p.length&&j!==(i+1)%p.length&&jiInTri(q,tri)))continue;out.push(tri);p.splice(i,1);found=true;break}assert.ok(found&&budget-->0,'Exact simple ear decomposition failed')}if(p.length===3&&jiArea2(p)[0]>0n)out.push(p);assert.equal(jiCmp(out.reduce((a,t)=>zhenAdd(a,jiArea2(t)),[0n,1n]),jiArea2(jiPositivePoly(p0))),0);return out}
const jiClipLine=(p,a,b)=>{var out=[];for(var i=0;i<p.length;i++){var s=p[i],e=p[(i+1)%p.length],ds=zhenCross(a,b,s),de=zhenCross(a,b,e),ins=ds[0]>=0n,ine=de[0]>=0n;if(ins)out.push(s);if(ins!==ine){var t=jiDiv(ds,zhenSub(ds,de));out.push(s.map((x,k)=>zhenAdd(x,zhenMul(t,zhenSub(e[k],x)))))} }return out.filter((x,i)=>!i||!jiEqP(x,out[i-1])).filter((x,i,a)=>a.length<2||i!==a.length-1||!jiEqP(x,a[0]))}
const jiClipConvex=(p,c)=>{for(var i=0;i<c.length&&p.length;i++)p=jiClipLine(p,c[i],c[(i+1)%c.length]);return p}
const jiOverlap=(a,b)=>{var p=jiClipConvex(a,b);return p.length>=3&&jiArea2(p)[0]>0n?p:null}
const jiShareEdge=(a,b)=>{for(var i=0;i<a.length;i++)for(var j=0;j<b.length;j++){var u=a[i],v=a[(i+1)%a.length],x=b[j],y=b[(j+1)%b.length];if(zhenCross(u,v,x)[0]||zhenCross(u,v,y)[0])continue;var k=jiCmp(u[0],v[0])!==0?0:1;var aa=jiCmp(u[k],v[k])<0?[u,v]:[v,u],bb=jiCmp(x[k],y[k])<0?[x,y]:[y,x],lo=jiCmp(aa[0][k],bb[0][k])>0?aa[0]:bb[0],hi=jiCmp(aa[1][k],bb[1][k])<0?aa[1]:bb[1];if(jiCmp(lo[k],hi[k])<0)return[lo,hi]}return null}
const jiPolyDiff=(a,b)=>{if(!jiOverlap(a,b))return[a];var cur=a,parts=[];for(var i=0;i<b.length&&cur.length;i++){var outside=jiClipLine(cur,b[(i+1)%b.length],b[i]);if(outside.length>=3&&jiArea2(outside)[0]>0n)parts.push(outside);cur=jiClipLine(cur,b[i],b[(i+1)%b.length])}return parts}
const jiParsePoly=d=>{assert.match(d,/^(?:M[-\d.]+ [-\d.]+(?: L[-\d.]+ [-\d.]+)+ Z)(?: M[-\d.]+ [-\d.]+(?: L[-\d.]+ [-\d.]+)+ Z)*$/);return d.split(' Z').filter(x=>x.trim()).map(s=>s.trim().split(/[ML]/).filter(Boolean).map(x=>{var a=x.trim().split(/\s+/);return zhenPoint(a[0],a[1])}))}
const jiOwnPoint=function(poly,p){var w=0;for(var i=0;i<poly.length;i++){var a=poly[i],b=poly[(i+1)%poly.length],cross=zhenCross(a,b,p),insideX=jiCmp(p[0],a[0])>=0&&jiCmp(p[0],b[0])<=0||jiCmp(p[0],b[0])>=0&&jiCmp(p[0],a[0])<=0,insideY=jiCmp(p[1],a[1])>=0&&jiCmp(p[1],b[1])<=0||jiCmp(p[1],b[1])>=0&&jiCmp(p[1],a[1])<=0;if(cross[0]===0n&&insideX&&insideY)return'boundary';if(jiCmp(a[1],p[1])<=0&&jiCmp(b[1],p[1])>0&&cross[0]>0n)w++;if(jiCmp(a[1],p[1])>0&&jiCmp(b[1],p[1])<=0&&cross[0]<0n)w--;}return w?'inside':'outside'}

function setup(index=0){
 const policy=policies[index]!,writes:string[]=[],doc:any={},view:any={document:doc,getComputedStyle:(n:any)=>({transform:n.css.transform??'none',getPropertyValue:(k:string)=>n.css[k]??''})};doc.defaultView=view
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>({localName:name,parentElement:parent,ownerDocument:doc,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:null as any,attrs:{...attrs},css:{} as any,getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=String(v);writes.push(name+':'+k+':'+v);(this as any).onSet?.(k,String(v))},removeAttribute(k:string){delete this.attrs[k]},get id(){return this.attrs.id??''}})
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u568c-foot-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u568c-foot-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u568c-foot-ink','data-owner':'test','data-u568c-foot-ink':'true',d:policy.segment.outline,mask:'url(#test-u568c-foot-foot-x-mask)'}),foot=node('path',mask,{id:'test-u568c-foot-foot','data-u568c-foot-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u568c-foot-body','data-u568c-foot-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u568c-foot-body-clip)'}),rect=node('rect',clip,{id:'test-u568c-foot-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u568c-foot-measure','data-u568c-foot-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}


const failedTail=process.env.LINGO_U568C_FOOT_FAILED_TAIL
test('u568c12 own exact source authority, union, foot partition and connected frontier FIRST',()=>{
 if(!failedTail){
 assert.equal(sha(bytes(SOURCE.sourceFile)),SOURCE.sourceSHA256);assert.equal(sha(bytes(SOURCE.sourceCacheFile)),SOURCE.sourceCacheSHA256);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(strokes)),SOURCE.geometrySHA256);assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[17,20,40]);assert(context);assert.equal(makeReviewedU568cFootSourceContext(proof,identity,strokes),context);
 }
 if(failedTail!=='strokes'){
 for(let i=0;i<17;i++)for(let j=0;j<strokes[i].length;j++)assert.equal(!!reviewedU568cFootPolicy(context,i,j),i===11&&j===1);
 for(const mutate of[(x)=>x.trace[12][0].args[0]++,(x)=>x.groups[12].polygons[0][0].x++,(x)=>delete x.engineHashes['2d.js']]){const bad=clone(proof);mutate(bad);assert.equal(makeReviewedU568cFootSourceContext(bad,identity,strokes),null)}
 assert.equal(makeReviewedU568cFootSourceContext(proof,{...identity,file:'other'},strokes),null);assert.equal(makeReviewedU568cFootSourceContext({groups:proof.groups,trace:proof.trace,defaults:proof.defaults},identity,strokes),null);
 }
 for(const mutate of[(s)=>s[11][1].weight++,(s)=>s[11][1].revealPath+=' ',(s)=>s[11][0].bounds[0]++,(s)=>s[0][0].weight++,(s)=>s[11].reverse()]){const bad=clone(strokes);mutate(bad);assert.equal(reviewedU568cFootContext(bad),null)}
 let getters=0;const accessor={...strokes[0][0]};Object.defineProperty(accessor,'outline',{enumerable:true,get(){getters++;return strokes[0][0].outline}});const bad=clone(strokes);bad[0][0]=accessor;assert.equal(reviewedU568cFootContext(bad),null);assert.equal(getters,0);
 const prior=jiParsePoly(strokes[11][0].outline),source=jiParsePoly(strokes[11][1].outline),rawP=source.flatMap(jiTriangulate),triangles=feet.triangles.map(t=>t.map(P)),union=feet.sourceUnionBoundary.map(P),head=feet.headBoundary.map(P),cut=R(feet.cutX),done=new Set();let total=[0n,1n],weight=[0n,1n];
 for(const row of feet.order){const tri=triangles[row.triangle],seed=P(row.seed);assert(jiArea2(tri)[0]>0n);assert(jiInTri(seed,tri));if(row.parent===null){assert(prior.some(p=>jiOwnPoint(p,seed)==='inside'))}else{assert(done.has(row.parent));const edge=jiShareEdge(triangles[row.parent],tri);assert(edge);assert(jiInTri(seed,triangles[row.parent]));assert.deepEqual(seed,edge[0].map((x,k)=>jiDiv(zhenAdd(x,edge[1][k]),[2n,1n])))}let outside=[tri];for(const p of rawP)outside=outside.flatMap(v=>jiPolyDiff(v,p));assert.equal(outside.length,0,'every mask triangle inside original source union');total=zhenAdd(total,jiArea2(tri));done.add(row.triangle)}
 assert.equal(done.size,12);assert.equal(jiCmp(total,R(feet.area2)),0);assert.equal(jiCmp(total,jiArea2(head)),0);for(let i=0;i<triangles.length;i++)for(let j=i+1;j<triangles.length;j++)assert.equal(jiOverlap(triangles[i],triangles[j]),null);for(const w of feet.weights){assert(BigInt(w[0])>0n);weight=zhenAdd(weight,R(w))}assert.equal(jiCmp(weight,[1n,1n]),0);
 for(const p of rawP){let left=jiClipLine(p,[cut,[0n,1n]],[cut,[200n,1n]]);if(left.length<3||jiArea2(left)[0]===0n)continue;let rest=[left];for(const tri of triangles)rest=rest.flatMap(v=>jiPolyDiff(v,tri));assert.equal(rest.length,0,'complete source left sector covered exactly')}
 const unionTris=jiTriangulate(union);for(const tri of unionTris){let rest=[tri];for(const p of rawP)rest=rest.flatMap(v=>jiPolyDiff(v,p));assert.equal(rest.length,0)}for(const p of rawP){let rest=[p];for(const tri of unionTris)rest=rest.flatMap(v=>jiPolyDiff(v,tri));assert.equal(rest.length,0)}
 const pointKey=p=>p.map(r=>r.join('/')).join(','),unique=vs=>[...new Map(vs.map(v=>[v.join('/'),v])).values()].sort(jiCmp),edges=source.flatMap(p=>p.map((a,i)=>[a,p[(i+1)%p.length]])),critical=source.flat().map(p=>p[0]);
 for(let i=0;i<edges.length;i++)for(let j=i+1;j<edges.length;j++){const[a,b]=edges[i],[c,d]=edges[j],r=b.map((v,k)=>zhenSub(v,a[k])),s=d.map((v,k)=>zhenSub(v,c[k])),den=zhenSub(zhenMul(r[0],s[1]),zhenMul(r[1],s[0]));if(!den[0])continue;const z=c.map((v,k)=>zhenSub(v,a[k])),t=jiDiv(zhenSub(zhenMul(z[0],s[1]),zhenMul(z[1],s[0])),den),u=jiDiv(zhenSub(zhenMul(z[0],r[1]),zhenMul(z[1],r[0])),den);if(jiCmp(t,[0n,1n])>=0&&jiCmp(t,[1n,1n])<=0&&jiCmp(u,[0n,1n])>=0&&jiCmp(u,[1n,1n])<=0)critical.push(zhenAdd(a[0],zhenMul(t,r[0])))}
 const xs=unique(critical),ysAt=(p,x)=>{let ys=[];for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length];if(jiCmp(x,a[0])<Math.min(0,jiCmp(b[0],a[0]))||jiCmp(x,a[0])>Math.max(0,jiCmp(b[0],a[0])))continue;if(jiCmp(a[0],b[0])===0){ys.push(a[1],b[1]);continue}ys.push(zhenAdd(a[1],zhenMul(jiDiv(zhenSub(x,a[0]),zhenSub(b[0],a[0])),zhenSub(b[1],a[1]))))}return unique(ys)},intervals=(polys,x)=>{const ys=unique(polys.flatMap(p=>ysAt(p,x))),out=[];for(let i=0;i+1<ys.length;i++){const mid=jiDiv(zhenAdd(ys[i],ys[i+1]),[2n,1n]);if(!polys.some(p=>jiOwnPoint(p,[x,mid])!=='outside'))continue;if(out.length&&jiCmp(out.at(-1)[1],ys[i])===0)out.at(-1)[1]=ys[i+1];else out.push([ys[i],ys[i+1]])}return out};
 const probes=xs.flatMap((x,i)=>i+1<xs.length?[x,jiDiv(zhenAdd(x,xs[i+1]),[2n,1n])]:[x]);for(const x of probes){const expected=intervals(source,x),actual=intervals([union],x);assert.deepEqual(actual,expected);if(jiCmp(x,xs[0])>0&&jiCmp(x,xs.at(-1))<0)assert.equal(expected.length,1,'single connected vertical source interval on every exact arrangement slab/boundary')}
 const q=strokes[11][1].revealPath.match(/-?\d+(?:\.\d+)?/g).map(zhenR);assert(zhenSub(q[2],q[0])[0]>0n);assert(zhenSub(q[4],q[2])[0]>0n);assert.equal(jiCmp(jiDiv(jiArea2(head),jiArea2(union)),R(SOURCE.footPhaseShareExact)),0);assert.equal(SOURCE.sourceTimingPreservedClaim,false);assert.equal(SOURCE.nativeProductApproval,false);assert.equal(SOURCE.runtimeApplied,false);
})
test('u568c-foot actual DOM adapter new frame owner/reset/visibility-last FIRST',()=>{
 const s=setup(),read=(p:number)=>{s.g.setAttribute('data-stroke-reveal-progress',String(p));return measureReviewedU568cFootFrame(s.policy,p,s.nodes.measurement)}
 const share=SOURCE.footPhaseShare
 {
 for(const p of[0,1e-6,.01,.03,share-1e-10,share,share+1e-10,.95,.99999999,1]){
  const frame=read(p);assert.equal(frame.phase,p===0?'empty':p===1?'full':p<=share?'foot':'body');assert.equal(frame.UARead,p>share&&p<1)
  assert.equal(commitReviewedU568cFootMask(s.nodes,frame),true);assert.equal(s.writes.at(-1),'path:visibility:'+(p===0?'hidden':'visible'))
  assert.equal(s.nodes.ink.getAttribute('d'),s.policy.segment.outline)
  if(p===1){assert.equal(s.nodes.ink.getAttribute('mask'),null);assert.equal(frame.L,null);assert.equal(s.nodes.ink.getAttribute('data-growing-length'),null)}
  else if(p>share){assert.equal(frame.d,frame.bodyProgress*frame.L!);assert(frame.threshold>=Number(feet.cutX[0])/Number(feet.cutX[1]));assert(frame.threshold<=s.policy.segment.bounds[2])}
 }
 const z=read(0);assert.equal(commitReviewedU568cFootMask(s.nodes,z),true);assert.equal(s.nodes.foot.getAttribute('d'),'');assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(s.nodes.ink.getAttribute('data-growing-distance'),null)
 const stale=read(.6);s.g.setAttribute('data-stroke-reveal-progress','.7');assert.equal(commitReviewedU568cFootMask(s.nodes,stale),false);assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden')
 assert.throws(()=>measureReviewedU568cFootFrame({...s.policy},.5,s.nodes.measurement));for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>read(p))
 }
 const own=setup();own.g.setAttribute('data-stroke-reveal-progress','0.8');const f8=measureReviewedU568cFootFrame(own.policy,.8,own.nodes.measurement);own.nodes.body.setAttribute('d','wrong');assert.equal(commitReviewedU568cFootMask(own.nodes,f8),false)
 const forged=setup();forged.g.setAttribute('data-stroke-reveal-progress','0.8');const f=measureReviewedU568cFootFrame(forged.policy,.8,forged.nodes.measurement);assert.equal(commitReviewedU568cFootMask(forged.nodes,{...f}),false)
 const transformed=setup();transformed.g.setAttribute('data-stroke-reveal-progress','0.8');transformed.svg.setAttribute('transform','translate(0 0)');assert.throws(()=>measureReviewedU568cFootFrame(transformed.policy,.8,transformed.nodes.measurement))
})
