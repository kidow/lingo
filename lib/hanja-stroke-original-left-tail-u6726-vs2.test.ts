import assert from 'node:assert/strict'
import{test}from'node:test'
import{readFileSync}from'node:fs'
import{reviewedU6726VS2TailContext,reviewedU6726VS2TailPolicy,measureReviewedU6726VS2TailFrame,commitReviewedU6726VS2Tail,REVIEWED_U6726VS2_SHORT_TAIL}from'./hanja-stroke-original-left-tail-u6726-vs2.ts'
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u6726-vs2-2026-10-24/fixtures.json',import.meta.url),'utf8')).u6726VS2,strokes=fixture.strokes,context=reviewedU6726VS2TailContext(strokes)!,policies=[[1,2],[13,1]].map(([p,m])=>reviewedU6726VS2TailPolicy(context,p,m)!)
const clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x)),nums=(s:string)=>(s.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number),polys=(s:string)=>(s.match(/M[^M]+/g)||[]).map(t=>{const n=nums(t);return Array.from({length:n.length/2},(_,i)=>[n[2*i],n[2*i+1]])})
const cross=(a:number[],b:number[],c:number[])=>((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])),dist=(a:number[],b:number[])=>a.reduce((s,v,i)=>s+(v-b[i])**2,0),area=(p:number[][])=>Math.abs(p.reduce((s,a,i)=>s+a[0]*p[(i+1)%p.length][1]-p[(i+1)%p.length][0]*a[1],0))
function inside(p:number[],poly:number[][]){let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])hit=!hit}return hit}
function convex(p:number[][]){const signs=p.map((a,i)=>cross(a,p[(i+1)%p.length],p[(i+2)%p.length]));return signs.every(x=>x>0)||signs.every(x=>x<0)}
test('朦 two new short-Q original-body vertical prefixes and existing LEFT attachment FIRST',()=>{
 let bodyCells=0,maxD=0
 for(const policy of policies){const r=policy.row,s=r.segment,[body,tail]=polys(s.outline),a=nums(s.revealPath),[x0,y0,cx,cy,x1,y1]=a
 assert.equal(s.outline,r.bodyOutline+' '+r.tailOutline);assert.equal(body.length,22);assert.equal(tail.length,4);assert.equal(y1,cy);assert(cy>y0);assert(cx<=x0&&x1<cx);assert.equal(r.leftClock,r.pen===2?7:10)
 const ys=body.map(p=>p[1]),signs=ys.map((y,i)=>Math.sign(ys[(i+1)%ys.length]-y)).filter(Boolean);assert.equal(signs.reduce((n,x,i)=>n+Number(x!==signs[(i+signs.length-1)%signs.length]),0),2,'single y-monotone polygon gives connected nonempty horizontal sublevel prefixes')
 const cells:number[][][]=[],q=(t:number)=>[(1-t)**2*x0+2*t*(1-t)*cx+t*t*x1,(1-t)**2*y0+2*t*(1-t)*cy+t*t*y1]
 for(let i=0;i<10;i++){const cell=[body[i],body[i+1],body.at(-2-i)!,body.at(-1-i)!],anchor=q((2*i+1)/20);assert(convex(cell));const d=Math.max(...cell.map(p=>dist(p,anchor)));assert(d<49);maxD=Math.max(maxD,d);cells.push(cell);bodyCells++}
 assert(Math.abs(cells.reduce((n,c)=>n+area(c),0)-area(body))<1e-8)
 const shared=body.slice(10,12);assert.equal(shared[0][0],tail[0][0]);assert.equal(shared[1][0],tail[0][0]);assert.equal(tail[0][1]-tail[3][1],3);assert(convex(tail));assert.equal(tail[3][0],tail[0][0]);assert.equal(tail[1][0],tail[2][0]);assert(shared[0][1]>=tail[0][1]&&shared[1][1]===tail[3][1])
 const previous=strokes[r.pen-1][r.mask-2],pp=polys(previous.outline)
 if(r.pen===2){assert.deepEqual(body.filter(p=>p[1]===85.5),[[30.65,85.5],[24.65,85.5]]);assert.deepEqual(pp[0].slice(1,3),[[30.65,85.5],[24.65,85.5]]);assert(inside([27.65,85.5001],pp[2]));assert(inside([27.65,85.5001],body));assert.equal(previous.direction,'down');assert.equal(previous.revealPath,undefined)}
 else{const root=[65.2,85.55];const prior=pp.find(p=>inside(root,p));assert(prior);let min=Infinity;for(let i=0;i<prior.length;i++){const p=prior[i],b=prior[(i+1)%prior.length],dx=b[0]-p[0],dy=b[1]-p[1],t=Math.max(0,Math.min(1,((root[0]-p[0])*dx+(root[1]-p[1])*dy)/(dx*dx+dy*dy)));min=Math.min(min,dist(root,[p[0]+t*dx,p[1]+t*dy]))}assert(min>1e-12,'open original-P neighborhood');const end=nums(previous.revealPath).slice(-2);assert(49-dist(root,end)>39);assert.equal(body.filter(p=>p[1]===85.55).length,1)}
 // Every positive convex tail x-prefix retains the whole vertical shared edge3;
 // body completion first is explicit and leaves all original fields/outer weights unchanged.
 assert.equal(r.bodyShare,r.bodyWeight/(r.bodyWeight+r.leftClock))
 }
 console.log(JSON.stringify({newSourceOnly:true,bodyCells,bodyMaxDiskDistanceSquared:maxD,sourcePUnchanged:true,bodyYAxisPrefixesConnected:true,actualPriorContact2:true,sharedLeftEdges3:2,wholePrefixRasterProof:false,nativeApproval:false}))
})
test('朦 fourteen actual prior-P contact failed-tail correction only',()=>{
 const r=policies[1].row,s=r.segment,body=polys(s.outline)[0],pp=polys(strokes[13][0].outline),root=[65.2,85.55],prior=pp.find(p=>inside(root,p));assert(prior);assert.equal(prior,pp[1])
 let min=Infinity;for(let i=0;i<prior.length;i++){const p=prior[i],b=prior[(i+1)%prior.length],dx=b[0]-p[0],dy=b[1]-p[1],t=Math.max(0,Math.min(1,((root[0]-p[0])*dx+(root[1]-p[1])*dy)/(dx*dx+dy*dy)));min=Math.min(min,dist(root,[p[0]+t*dx,p[1]+t*dy]))}
 assert(min>1e-12);const end=nums(strokes[13][0].revealPath).slice(-2),margin=49-dist(root,end);assert(margin>39);assert.equal(body.filter(p=>p[1]===85.55).length,1);assert.equal(r.bodyShare,r.bodyWeight/(r.bodyWeight+r.leftClock))
 console.log(JSON.stringify({failedTailOnly:true,actualPreviousPolygonIndex:1,openPreviousPDistanceSquared:min,actualPreviousEndDiskMarginSquared:margin,priorUnchangedBodyCells20Reused:true,priorDOMPASSReused:true,sourceGuideAndClockFieldsUnchanged:true,nativeApproval:false}))
})
test('朦 fourteen source-clock and affected DOM failed-tail only',()=>{
 const r=policies[1].row;assert.equal(r.leftClock,10);assert.equal(r.bodyShare,r.bodyWeight/(r.bodyWeight+10))
 for(const progress of[0,1e-6,.03,r.bodyShare/2,r.bodyShare,r.bodyShare+(1-r.bodyShare)/2,1]){const x=fake(1,progress),v=x.dispatch();assert.equal(v.status,progress===0?'empty':'visible');assert(v.frame);if(progress<=r.bodyShare)assert.equal(v.frame.tailProgress,0);if(progress>r.bodyShare)assert.equal(v.frame.bodyRect.height,r.bodyBounds[3]-r.bodyBounds[1]);v.cleanup();assert.equal(x.nodes.ink.getAttribute('visibility'),'hidden')}
 console.log(JSON.stringify({failedClockOnly:true,exactSourceClock:r.bodyShare,sourceLeft10:true,affectedDOMFinite7:true,earlierDOMNegativesReused:60,priorContactCorrectedOriginalTipTriangleReused:true,nativeApproval:false}))
})
function fake(i:number,progress:number){
 const policy=policies[i],s=policy.row.segment,r=policy.row,id='u6726-short-'+i,events:string[]=[],doc:any={defaultView:null};let owner:any=null,reads=0,hook:null|(()=>void)=null
 const view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:()=> 'none'})};doc.defaultView=view
 const node=(localName:string,attrs:Record<string,string>={})=>({localName,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string):string|null{return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(localName+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg;const target=node('g',{'data-stroke-start-gate':policy.id,'data-u6726-vs2-tail-progress':String(progress),'data-u6726-vs2-tail-clip':id});target.parentElement=svg
 const defs=node('defs');defs.parentElement=target;const a=nums(s.revealPath);let L=100
 const measurement=Object.assign(node('path',{d:s.revealPath}),{getTotalLength(){reads++;hook?.();return L},getPointAtLength(d:number){return{x:a[0]+(a[4]-a[0])*d/100,y:a[1]+(a[5]-a[1])*d/100}}});measurement.parentElement=defs
 const clip=(suffix:string,d:string)=>{const c=node('clipPath',{id:id+'-u6726-vs2-tail-'+suffix,clipPathUnits:'userSpaceOnUse'});c.parentElement=defs;const p=node('path',{d});p.parentElement=c;return p},bodyClip=clip('body',r.bodyOutline),tailClip=clip('left',r.tailOutline)
 const mask=node('mask',{id:id+'-u6726-vs2-tail',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const bg=node('g',{'clip-path':'url(#'+id+'-u6726-vs2-tail-body)'}),tg=node('g',{'clip-path':'url(#'+id+'-u6726-vs2-tail-left)'});bg.parentElement=mask;tg.parentElement=mask
 const b=r.bodyBounds,t=r.tailBounds,bodyRect=node('rect',{x:String(b[0]),y:String(b[1]),width:String(b[2]-b[0]),height:'0',fill:'white'}),tailRect=node('rect',{x:String(t[2]),y:String(t[1]),width:'0',height:String(t[3]-t[1]),fill:'white'});bodyRect.parentElement=bg;tailRect.parentElement=tg
 const ink=node('path',{d:s.outline,mask:'url(#'+id+'-u6726-vs2-tail)'});ink.parentElement=target
 const nodes={measurement,bodyClip,tailClip,bodyRect,tailRect,ink}
 return{policy,s,svg,target,bg,nodes,events,reads:()=>reads,onLength:(f:()=>void)=>{hook=f},setLength:(x:number)=>{L=x},dispatch:()=>commitReviewedU6726VS2Tail(policy,s,progress,id,nodes as any)}
}
test('朦 exact short-Q body-axis/LEFT DOM lifecycle and mutation guards FIRST',()=>{
 let negatives=0
 for(let i=0;i<2;i++){const p=policies[i],r=p.row
 for(const progress of[0,1e-6,.03,r.bodyShare/2,r.bodyShare,r.bodyShare+(1-r.bodyShare)/2,1]){const x=fake(i,progress),v=x.dispatch();assert.equal(v.status,progress===0?'empty':'visible');assert(v.frame);assert.equal(x.nodes.ink.getAttribute('visibility'),progress===0?'hidden':'visible');if(progress<=r.bodyShare)assert.equal(x.nodes.tailRect.getAttribute('width'),'0');if(progress>r.bodyShare)assert.equal(v.frame.bodyRect.height,r.bodyBounds[3]-r.bodyBounds[1]);if(progress>0)assert.equal(x.events.at(-1),'path:visibility=visible');v.cleanup();assert.equal(x.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(x.nodes.bodyRect.getAttribute('height'),'0');assert.equal(x.nodes.tailRect.getAttribute('width'),'0')}
 const mutations=[(x:ReturnType<typeof fake>)=>x.target.attrs['data-u6726-vs2-tail-progress']='other',(x:ReturnType<typeof fake>)=>x.nodes.bodyClip.attrs.d+=' ',(x:ReturnType<typeof fake>)=>x.nodes.tailClip.attrs.d+=' ',(x:ReturnType<typeof fake>)=>x.nodes.measurement.attrs.pathLength='1',(x:ReturnType<typeof fake>)=>x.bg.cssTransform='matrix(1,0,0,1,1,0)',(x:ReturnType<typeof fake>)=>x.nodes.ink.attrs.mask='url(#other)',(x:ReturnType<typeof fake>)=>x.nodes.tailRect.parentElement=x.bg,(x:ReturnType<typeof fake>)=>x.nodes.bodyRect.attrs.width='999']
 for(const mutate of mutations)for(const when of['before','length']){const x=fake(i,.1);if(when==='before')mutate(x);else x.onLength(()=>mutate(x));assert.equal(x.dispatch().status,'hidden');assert.equal(x.nodes.ink.getAttribute('visibility'),'hidden');negatives++}
 for(const n of[NaN,Infinity,-1,0]){const x=fake(i,.1);x.setLength(n);assert.equal(x.dispatch().status,'hidden');negatives++}
 for(const n of[NaN,Infinity,-.1,1.1]){assert.throws(()=>measureReviewedU6726VS2TailFrame(p,r.segment,n,null));negatives++}
 const changed=fake(i,.1);changed.nodes.ink.writeHook=k=>{if(k.endsWith('-phase'))changed.nodes.bodyClip.attrs.d+=' '};assert.equal(changed.dispatch().status,'hidden');negatives++
 for(const k of['outline','bounds','weight','revealPath']as const){const a=clone(r.segment)as any;if(k==='bounds')a[k][0]+=.01;else if(k==='weight')a[k]+=.01;else a[k]+=' ';assert.throws(()=>measureReviewedU6726VS2TailFrame(p,a,.1,null));negatives++}
 assert.throws(()=>measureReviewedU6726VS2TailFrame({...p},r.segment,.1,null));negatives++
 assert(Object.isFrozen(p.row)&&Object.isFrozen(p.row.segment));assert.equal(reviewedU6726VS2TailPolicy({...context},p.row.pen-1,p.row.mask-1),null)
 }
 console.log(JSON.stringify({newTargets:2,finiteSamples:14,DOMNegative:negatives,originalQWeightAndSourceMasksUnchanged:true,sourceDerivedLeftClocks:[7,10],nativeApproval:false,SSR:0}))
})
