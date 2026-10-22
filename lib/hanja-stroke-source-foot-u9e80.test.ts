import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU9e80Context,reviewedU9e80Policy,makeReviewedU9e80SourceContext,measureReviewedU9e80Frame,commitReviewedU9e80Mask,REVIEWED_U9E80_SOURCE as SOURCE} from './hanja-stroke-source-foot-u9e80.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),sha=(s:string)=>createHash('sha256').update(s).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const f=JSON.parse(bytes(SOURCE.sourceCacheFile)).u9e80,proof=JSON.parse(bytes(SOURCE.sourceFile)),strokes=f.strokes,identity={"root":"u9e80","file":"../hanja-goal-glyphwiki-batch761-2026-10-12/engine-proof.json","fileSHA256":"1e4dc5fc697863702da91dbc29d68236a8daf1d3e43240239e7821881dee296b"},context=reviewedU9e80Context(strokes),policies=[reviewedU9e80Policy(context,8,1)],code=readFileSync(new URL('./hanja-stroke-source-foot-u9e80.ts',import.meta.url),'utf8'),feet=JSON.parse(code.match(/^const FEET=(.*)$/m)![1])[0],R=(r:string[])=>r.map(BigInt),P=(p:string[][])=>p.map(R)
// Reused pure exact primitives only; old tests and the 26-slab sweep are not executed.
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
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u9e80-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u9e80-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u9e80-ink','data-owner':'test','data-u9e80-ink':'true',d:policy.segment.outline,mask:'url(#test-u9e80-foot-x-mask)'}),foot=node('path',mask,{id:'test-u9e80-foot','data-u9e80-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u9e80-body','data-u9e80-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u9e80-body-clip)'}),rect=node('rect',clip,{id:'test-u9e80-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u9e80-measure','data-u9e80-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}


const failedTail=process.env.LINGO_U9E80_FAILED_TAIL==='1'
test('u9e80 own source authority and cached connected-foot partition FIRST',()=>{
 if(!failedTail){
 assert.equal(sha(bytes(SOURCE.sourceFile)),SOURCE.sourceSHA256);assert.equal(sha(bytes(SOURCE.sourceCacheFile)),SOURCE.sourceCacheSHA256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(f.fullProof,proof);assert.equal(sha(JSON.stringify(strokes)),SOURCE.geometrySHA256)
 assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n:number,m:any)=>n+(m.outline.match(/M/g)||[]).length,0)],[13,16,42])
 assert(context);assert.equal(makeReviewedU9e80SourceContext(proof,identity,strokes),context)
 for(let i=0;i<13;i++)for(let j=0;j<strokes[i].length;j++){const p=reviewedU9e80Policy(context,i,j);if(i===8&&j===1){assert(p);assert.equal(p.id,'u9e80-9-2');assert.deepEqual(p.segment,strokes[i][j])}else assert.equal(p,null)}
 for(const mutate of[(x:any)=>x.trace[10][0].args[0]++,(x:any)=>x.groups[10].polygons[0][0].x++,(x:any)=>delete x.engineHashes['2d.js']]){const bad=clone(proof);mutate(bad);assert.equal(makeReviewedU9e80SourceContext(bad,identity,strokes),null)}
 assert.equal(makeReviewedU9e80SourceContext(proof,{...identity,file:'other'},strokes),null)
 for(const mutate of[(s:any)=>s[8][1].weight++,(s:any)=>s[8][1].revealPath+=' ',(s:any)=>s[8][0].bounds[0]++,(s:any)=>s[10].reverse(),(s:any)=>delete s[0][0]]){const bad=clone(strokes);mutate(bad);assert.equal(reviewedU9e80Context(bad),null)}
 }
 const triangles=feet.triangles.map((t:any)=>t.map(P)),root=feet.order[0],prior=jiParsePoly(strokes[8][0].outline),rawP=jiParsePoly(strokes[8][1].outline).flatMap(jiTriangulate)
 let total=[0n,1n],weights=[0n,1n];const done=new Set<number>()
 for(const row of feet.order){const tri=triangles[row.triangle],seed=P(row.seed);assert(jiArea2(tri)[0]>0n);assert(jiInTri(seed,tri));total=zhenAdd(total,jiArea2(tri))
  if(row.parent===null){assert.equal(row.triangle,root.triangle);assert(prior.some(p=>jiOwnPoint(p,seed)==='inside'))}
  else{assert(done.has(row.parent));const edge=jiShareEdge(triangles[row.parent],tri);assert(edge);assert(jiInTri(seed,triangles[row.parent]));assert.deepEqual(row.seed.map(R),edge[0].map((x,k)=>jiDiv(zhenAdd(x,edge[1][k]),[2n,1n])))}
  let outside=[tri];for(const p of rawP)outside=outside.flatMap(v=>jiPolyDiff(v,p));assert.equal(outside.length,0,'no new ink outside source union')
  done.add(row.triangle)
 }
 assert.equal(done.size,14);assert.equal(jiCmp(total,R(feet.area2)),0)
 for(let i=0;i<triangles.length;i++)for(let j=i+1;j<triangles.length;j++)assert.equal(jiOverlap(triangles[i],triangles[j]),null)
 for(const w of feet.weights){assert(BigInt(w[0])>0n);weights=zhenAdd(weights,R(w))}assert.equal(jiCmp(weights,[1n,1n]),0)
 assert.equal(feet.proof.sourceUnionXMonotoneCertifiedSlabs,26);assert.equal(feet.proof.oldSlabLoopReexecutions,0)
 assert.equal(SOURCE.orderProvisional,true);assert.equal(SOURCE.sourceTimingPreservedClaim,false);assert.equal(SOURCE.nativeProductApproval,false);assert.equal(SOURCE.runtimeApplied,false)
 assert.deepEqual(SOURCE.requiredFreshDomesticDirections,Array.from({length:13},(_,i)=>i+1))
})
test('u9e80 actual DOM adapter new frame owner/reset/visibility-last FIRST',()=>{
 const s=setup(),read=(p:number)=>{s.g.setAttribute('data-stroke-reveal-progress',String(p));return measureReviewedU9e80Frame(s.policy,p,s.nodes.measurement)}
 const share=SOURCE.footPhaseShare
 if(!failedTail){
 for(const p of[0,1e-6,.01,.03,share-1e-10,share,share+1e-10,.95,.99999999,1]){
  const frame=read(p);assert.equal(frame.phase,p===0?'empty':p===1?'full':p<=share?'foot':'body');assert.equal(frame.UARead,p>share&&p<1)
  assert.equal(commitReviewedU9e80Mask(s.nodes,frame),true);assert.equal(s.writes.at(-1),'path:visibility:'+(p===0?'hidden':'visible'))
  assert.equal(s.nodes.ink.getAttribute('d'),s.policy.segment.outline)
  if(p===1){assert.equal(s.nodes.ink.getAttribute('mask'),null);assert.equal(frame.L,null);assert.equal(s.nodes.ink.getAttribute('data-growing-length'),null)}
  else if(p>share){assert.equal(frame.d,frame.bodyProgress*frame.L!);assert(frame.threshold>=Number(feet.cutX[0])/Number(feet.cutX[1]));assert(frame.threshold<=s.policy.segment.bounds[2])}
 }
 const z=read(0);assert.equal(commitReviewedU9e80Mask(s.nodes,z),true);assert.equal(s.nodes.foot.getAttribute('d'),'');assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(s.nodes.ink.getAttribute('data-growing-distance'),null)
 const stale=read(.6);s.g.setAttribute('data-stroke-reveal-progress','.7');assert.equal(commitReviewedU9e80Mask(s.nodes,stale),false);assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden')
 assert.throws(()=>measureReviewedU9e80Frame({...s.policy},.5,s.nodes.measurement));for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>read(p))
 }
 const own=setup();own.g.setAttribute('data-stroke-reveal-progress','0.8');const f8=measureReviewedU9e80Frame(own.policy,.8,own.nodes.measurement);own.nodes.body.setAttribute('d','wrong');assert.equal(commitReviewedU9e80Mask(own.nodes,f8),false)
 const forged=setup();forged.g.setAttribute('data-stroke-reveal-progress','0.8');const f=measureReviewedU9e80Frame(forged.policy,.8,forged.nodes.measurement);assert.equal(commitReviewedU9e80Mask(forged.nodes,{...f}),false)
 const transformed=setup();transformed.g.setAttribute('data-stroke-reveal-progress','0.8');transformed.svg.setAttribute('transform','translate(0 0)');assert.throws(()=>measureReviewedU9e80Frame(transformed.policy,.8,transformed.nodes.measurement))
})
