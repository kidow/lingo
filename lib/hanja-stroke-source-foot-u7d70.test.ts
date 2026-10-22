import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU7d70Context,reviewedU7d70Policy,measureReviewedU7d70Frame,commitReviewedU7d70Mask,REVIEWED_U7D70_SOURCE} from './hanja-stroke-source-foot-u7d70.ts'
const source=JSON.parse(readFileSync(new URL('../docs/hanja-source-cache-u7d70-2026-10-22/source.json',import.meta.url),'utf8')),strokes=source.strokes,clone=(v:any)=>JSON.parse(JSON.stringify(v)),context=reviewedU7d70Context(strokes),policies=[reviewedU7d70Policy(context,0,1),reviewedU7d70Policy(context,7,1)]
const code=readFileSync(new URL('./hanja-stroke-source-foot-u7d70.ts',import.meta.url),'utf8'),feet=JSON.parse(code.match(/^const FEET=(.*)$/m)![1]),R=(r:string[])=>r.map(BigInt),P=(p:string[][])=>p.map(R)
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
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u7d70-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u7d70-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u7d70-ink','data-owner':'test','data-u7d70-ink':'true',d:policy.segment.outline,mask:'url(#test-u7d70-foot-x-mask)'}),foot=node('path',mask,{id:'test-u7d70-foot','data-u7d70-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u7d70-body','data-u7d70-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u7d70-body-clip)'}),rect=node('rect',clip,{id:'test-u7d70-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u7d70-measure','data-u7d70-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}

test('u7d70 exact whole12 and two private policies only; own enumerable dense fields',()=>{
 assert(context&&policies.every(Boolean));assert.equal(REVIEWED_U7D70_SOURCE.geometrySHA256,source.geometrySHA256);assert.equal(createHash('sha256').update(JSON.stringify(feet)).digest('hex'),REVIEWED_U7D70_SOURCE.footGeometrySHA256)
 assert.equal(reviewedU7d70Policy({id:'u7d70-exact12'},0,1),null);for(const [p,m]of[[0,0],[1,1],[7,0],[8,1]])assert.equal(reviewedU7d70Policy(context,p,m),null)
 for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++){const x=clone(strokes);x[p][m].weight++;assert.equal(reviewedU7d70Context(x),null)}
 const sparse=clone(strokes);delete sparse[7][1];assert.equal(reviewedU7d70Context(sparse),null)
 for(const kind of['inherited','hidden','getter']){const x=clone(strokes),s=x[0][1],w=s.weight;let reads=0;delete s.weight;if(kind==='inherited'){Object.setPrototypeOf(s,{weight:w});s.extra=0}else if(kind==='hidden'){Object.defineProperty(s,'weight',{value:w,enumerable:false});s.extra=0}else Object.defineProperty(s,'weight',{enumerable:true,get(){reads++;return w}});assert.equal(reviewedU7d70Context(x),null);assert.equal(reads,0)}
})
test('u7d70 exact union arrangement no overlap/omission, root and shared-edge connected homotheties',()=>{
 for(const foot of feet){const p1=jiParsePoly(strokes[foot.pen-1][0].outline).map(jiPositivePoly),p2=jiParsePoly(strokes[foot.pen-1][1].outline).map(jiPositivePoly),cut=R(foot.cutX),head=p2.map(p=>jiClipLine(p,[cut,[0n,1n]],[cut,[1n,1n]])).filter(p=>p.length>=3&&jiArea2(p)[0]>0n),tri=foot.triangles.map(t=>t.map(P))
  for(let i=0;i<tri.length;i++){assert(jiArea2(tri[i])[0]>0n);for(let j=i+1;j<tri.length;j++)assert.equal(jiOverlap(tri[i],tri[j]),null)}
  const difference=(from:any[],cover:any[])=>{let rest=from;for(const old of cover)rest=rest.flatMap(p=>jiPolyDiff(p,old));return rest}
  const htri=head.flatMap(jiTriangulate);assert.equal(difference(htri,tri).length,0);assert.equal(difference(tri,htri).length,0)
  const reached=new Set<number>();for(const item of foot.order){assert(!reached.has(item.triangle));const t=tri[item.triangle],seed=P(item.seed);assert(jiInTri(seed,t));if(item.parent===null){assert.equal(reached.size,0);assert(p1.some(p=>jiOwnPoint(p,seed)==='inside'))}else{assert(reached.has(item.parent));const edge=jiShareEdge(t,tri[item.parent]);assert(edge);assert.equal(zhenCross(edge[0],edge[1],seed)[0],0n);assert(jiInTri(seed,tri[item.parent]))}reached.add(item.triangle)}assert.equal(reached.size,tri.length)
  const area=tri.reduce((a,t)=>zhenAdd(a,jiArea2(t)),[0n,1n]);assert.equal(jiCmp(jiDiv(area,[2n,1n]),R(foot.unionArea)),0);assert.equal(jiCmp(foot.weights.map(R).reduce(zhenAdd,[0n,1n]),[1n,1n]),0)
 }
})
test('u7d70 own x-monotone original-P body preserves connected prefixes and exact full coverage',()=>{
 for(const foot of feet){const p=jiParsePoly(strokes[foot.pen-1][1].outline).map(jiPositivePoly),main=p[0],min=main.reduce((i,v,k)=>jiCmp(v[0],main[i][0])<0?k:i,0),max=main.reduce((i,v,k)=>jiCmp(v[0],main[i][0])>0?k:i,0),cut=R(foot.cutX)
 for(const step of[1,-1]){let i=min;while(i!==max){const next=(i+step+main.length)%main.length;assert(jiCmp(main[next][0],main[i][0])>=0);i=next}}
 if(foot.pen===1){const edge=jiShareEdge(main,p[1]);assert(edge);assert(edge.every(v=>jiCmp(v[0],cut)>0))}else for(const extra of p.slice(1))assert(extra.every(v=>jiCmp(v[0],cut)<0))
 const q=strokes[foot.pen-1][1].revealPath.match(/-?\d+(?:\.\d+)?/g).map(zhenR);assert(zhenSub(q[2],q[0])[0]>0n&&zhenSub(q[4],q[2])[0]>0n)
 }
})
test('u7d70 foot/empty/full reset and connected original-UA body frame; canonical distance and unmasked p1',()=>{
 for(let index=0;index<2;index++){const t=setup(index),guide=t.nodes.measurement.attrs.d,inkD=t.nodes.ink.attrs.d
 for(const p of[0,1e-6,.01,.25,.5]){const f=measureReviewedU7d70Frame(t.policy,p,t.nodes.measurement);assert.equal(f.UARead,false);assert.equal(commitReviewedU7d70Mask(t.nodes,f),true);if(p===0){assert.equal(f.footPathD,'');assert.equal(t.nodes.ink.attrs.visibility,'hidden')}assert.equal(t.nodes.ink.getAttribute('data-growing-distance'),null)}assert.deepEqual(t.counts(),{lengths:0,points:0})
 const frame=measureReviewedU7d70Frame(t.policy,.75,t.nodes.measurement);assert.equal(frame.d,20);assert.equal(frame.bodyProgress,.5);assert(frame.threshold>=Number(feet[index].cutX[0])/Number(feet[index].cutX[1]));assert.deepEqual(t.counts(),{lengths:2,points:3});assert.equal(commitReviewedU7d70Mask(t.nodes,frame),true);assert.equal(t.nodes.ink.attrs['data-growing-distance'],'20');assert.equal(t.nodes.ink.getAttribute('data-growing-canstance'),null);assert.equal(t.nodes.ink.getAttribute('data-growing-radius'),null);assert.equal(t.nodes.rect.attrs.width,String(frame.threshold-t.policy.segment.bounds[0]));assert.equal(t.writes.at(-1),'path:visibility:visible')
 const full=measureReviewedU7d70Frame(t.policy,1,t.nodes.measurement);assert.equal(full.UARead,false);assert.equal(commitReviewedU7d70Mask(t.nodes,full),true);assert.equal(t.nodes.ink.getAttribute('mask'),null);assert.equal(t.nodes.ink.attrs['data-u7d70-full-mask'],'true');assert.equal(t.nodes.ink.getAttribute('data-growing-end-x'),null)
 const empty=measureReviewedU7d70Frame(t.policy,0,t.nodes.measurement);assert.equal(commitReviewedU7d70Mask(t.nodes,empty),true);assert.equal(t.nodes.ink.attrs.visibility,'hidden');assert.equal(t.nodes.ink.attrs.mask,'url(#test-u7d70-foot-x-mask)');assert.equal(t.nodes.foot.attrs.d,'');assert.equal(t.nodes.body.attrs.visibility,'hidden');assert.equal(t.nodes.rect.attrs.width,'0');assert.equal(t.nodes.ink.attrs.d,inkD);assert.equal(t.nodes.body.attrs.d,inkD);assert.equal(t.nodes.measurement.attrs.d,guide)
 }
})
test('u7d70 rejects invalid measurement/foreign frames and atomic transform/owner/clip mutations',()=>{
 for(const p of[NaN,Infinity,-.01,1.01]){const t=setup();assert.throws(()=>measureReviewedU7d70Frame(t.policy,p,t.nodes.measurement))}
 for(const mutate of[(t:any)=>t.nodes.measurement.isConnected=false,(t:any)=>t.nodes.measurement.attrs.pathLength='1',(t:any)=>t.defs.css.transform='matrix(1,0,0,1,1,0)',(t:any)=>t.nodes.measurement.getTotalLength=()=>NaN,(t:any)=>t.nodes.measurement.getPointAtLength=()=>({x:NaN,y:1}),(t:any)=>t.nodes.measurement.getTotalLength=()=>{t.nodes.measurement.attrs.d+=' ';return 40}]){const t=setup();mutate(t);assert.throws(()=>measureReviewedU7d70Frame(t.policy,.75,t.nodes.measurement))}
 for(const mutate of[(t:any)=>t.nodes.foot.attrs.transform='translate(1 0)',(t:any)=>t.nodes.body.css.translate='1px 0px',(t:any)=>t.nodes.rect.parentElement=t.defs,(t:any)=>t.nodes.body.attrs.d+=' ',(t:any)=>t.clip.attrs.clipPathUnits='objectBoundingBox',(t:any)=>t.nodes.rect.attrs.x='0',(t:any)=>t.nodes.ink.attrs.mask='none']){const t=setup(),f=measureReviewedU7d70Frame(t.policy,.75,t.nodes.measurement);mutate(t);assert.equal(commitReviewedU7d70Mask(t.nodes,f),false);assert.equal(t.nodes.ink.attrs.visibility,'hidden')}
 const t=setup(),f=measureReviewedU7d70Frame(t.policy,.1,t.nodes.measurement);(t.nodes.foot as any).onSet=(k:string,v:string)=>{if(k==='d'&&v)t.nodes.ink.attrs['data-owner']='changed'};assert.equal(commitReviewedU7d70Mask(t.nodes,f),false);assert.equal(t.nodes.ink.attrs.visibility,'hidden');assert.equal(commitReviewedU7d70Mask(setup().nodes,{} as any),false)
})
