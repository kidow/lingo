import{reviewedU85afContext as whole,reviewedU85afPolicy as pick,measureReviewedU85afFrame as measure,commitReviewedU85afMask as commit,REVIEWED_U85AF_SOURCE as currentSource}from'./hanja-stroke-source-cap-u85af.ts'
import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{makeU85afSourceCapContext as make,frameU85afSourceCap as frame,U85AF_SOURCE_CAP_PROOF as proof}from'./hanja-stroke-source-cap-u85af.ts'
const dir=new URL('../docs/hanja-goal-glyphwiki-batch1089-2026-10-13/',import.meta.url)
const bytes=(p:string)=>readFileSync(new URL(p,dir)),sha=(s:string|Buffer)=>createHash('sha256').update(s).digest('hex'),body=JSON.parse(bytes('engine-whole-u85af-k.json').toString()),prep=JSON.parse(bytes('source-order-preparation.json').toString()),clone=(v:any)=>JSON.parse(JSON.stringify(v))
const input={sourceRoot:'u85af-k',bodyFileSHA256:sha(bytes('engine-whole-u85af-k.json')),correctedSourceOrderModuleSHA256:sha(bytes('source-order-candidate.mjs')),correctedGeometrySHA256:prep.expectedCompiledSHA256,targetLogicalPen:15,targetRawOneBased:15,priorLogicalPen:13,priorRawOneBased:14,targetGroup:body.groups[14],targetTrace:body.trace[14],priorGroup:body.groups[13],priorTrace:body.trace[13],oldMask:{direction:'down',weight:17.766375,bounds:[31.5,64.3,37.5,93.6]}}
test('1375 own source strict seed, exact convex head fan and nested body proof',()=>{
 assert(make(input));assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);assert.equal(body.groups.reduce((n:number,g:any)=>n+g.polygons.length,0),32);assert.equal(proof.body3OnlyAuthority,true);assert.equal(proof.actualFull5Claim,false)
 const I=(v:number)=>{const[a,b='']=String(v).split('.'),d=10n**BigInt(b.length),n=BigInt(b||'0')*400n;assert.equal(n%d,0n);return BigInt(a)*400n+n/d},point=(p:readonly number[])=>p.map(I),cross=(a:bigint[],b:bigint[],p:bigint[])=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
 const P=proof.originalTarget.map(point),H=proof.head.map(point),M=point(proof.seed),prior=body.groups[13].polygons[0].map((p:any)=>point([p.x,p.y]))
 const strict=(ps:bigint[][],p:bigint[])=>{let wn=0;for(let i=0;i<ps.length;i++){const a=ps[i],b=ps[(i+1)%ps.length],c=cross(a,b,p);if(c===0n&&p[0]>=(a[0]<b[0]?a[0]:b[0])&&p[0]<=(a[0]>b[0]?a[0]:b[0])&&p[1]>=(a[1]<b[1]?a[1]:b[1])&&p[1]<=(a[1]>b[1]?a[1]:b[1]))return false;if(a[1]<=p[1]&&b[1]>p[1]&&c>0n)wn++;if(a[1]>p[1]&&b[1]<=p[1]&&c<0n)wn--}return wn!==0}
 assert(strict(P,M));assert(strict(prior,M)) // open neighborhoods prove positive-area source intersection
 const area2=(ps:bigint[][])=>ps.reduce((s,a,i)=>{const b=ps[(i+1)%ps.length];return s+a[0]*b[1]-b[0]*a[1]},0n)
 for(let i=0;i<P.length;i++)assert(cross(P[i],P[(i+1)%P.length],P[(i+2)%P.length])>0n)
 for(const p of H)for(let i=0;i<P.length;i++)assert(cross(P[i],P[(i+1)%P.length],p)>=0n)
 assert.deepEqual(H,[P[0],[P[0][0],M[1]],[P[3][0],M[1]],P[3]]) // exact source-edge intersections with original M.y
 const fan=proof.fan.map(t=>t.map(point)),areas=fan.map(area2);assert(areas.every(x=>x>0n));assert.equal(areas.reduce((a,b)=>a+b,0n),area2(H));assert.deepEqual(areas.map(String),['9739200','1989600','7749600']);assert.equal(area2(H),19478400n);assert.equal(area2(P),201984000n);assert.equal(area2(H)*21040n,area2(P)*2029n)
 assert.deepEqual(fan,[[M,P[3],P[0]],[M,P[0],H[1]],[M,H[2],P[3]]]);assert(M[1]>P[0][1]&&M[1]<P[1][1]);assert(M[1]<P[2][1])
 // Convex homothety H_u contains M and is nested inside H for all real u in[0,1].
 // Each body P∩{y<=tau}, tau∈[M.y,maxY], is convex/nested and contains H.
 assert.equal(proof.originalMask.weight,17.766375);assert.deepEqual(proof.originalGuide,[69,136.6725,69,172.20525]);assert.deepEqual(proof.originalTypeFlags,[1,12,113]);assert.equal(proof.newMaskInternalClock,true);assert.equal(proof.nativeApproval,false)
})
test('1375 pure source cap frames omit p0, preserve original ink and total weight',()=>{
 const ctx=make(input)!;assert(ctx);const alpha=2029/21040,ps=[0,1e-6,alpha/2,alpha,alpha+(1-alpha)/2,.9999,.99999999,1],frames=ps.map(p=>frame(ctx,p)!)
 assert.equal(frames[0].phase,'empty');assert.equal(frames[0].maskPath,'');assert.equal(frames[0].maskPoints.length,0)
 assert.equal(frames[3].phase,'head');assert.deepEqual(frames[3].maskPoints,proof.head);assert.equal(frames[4].phase,'body');assert.equal(frames[4].maskPoints[2][1],proof.seed[1]+(187.2-proof.seed[1])/2)
 for(const f of frames){assert.equal(f.originalInkPath,'M75 134.6 L75 181.2 L63 187.2 L63 128.6 Z');assert.equal(f.originalWeight,17.766375);assert.equal(f.coordinateUnits,'original-source-200');assert.equal(f.productCoordinateScale,.5);assert(Object.isFrozen(f.maskPoints))}
 for(let i=1;i<frames.length-1;i++){const f=frames[i];assert.equal((f.maskPath!.match(/M/g)||[]).length,1);assert.equal((f.maskPath!.match(/Z/g)||[]).length,1)}
 assert.equal(frames.at(-1)!.phase,'original');assert.equal(frames.at(-1)!.maskPath,null);assert.equal(frames.at(-1)!.originalInkDirect,true)
})
test('1375 source-specific negative guard and fail-closed frame inputs',()=>{
 for(const mutate of[(q:any)=>q.sourceRoot='u85af',(q:any)=>q.targetTrace[0].args[1]++,(q:any)=>q.targetGroup.polygons[0][0].y++,(q:any)=>q.priorGroup.polygons[0][0].x++,(q:any)=>q.oldMask.weight++,(q:any)=>q.correctedGeometrySHA256+='x']){const q=clone(input);mutate(q);assert.equal(make(q),null)}
 const sparse=clone(input);delete sparse.targetGroup.polygons[0][0];assert.equal(make(sparse),null);const getter=clone(input);Object.defineProperty(getter,'sourceRoot',{enumerable:true,get(){throw Error('must not invoke')}});assert.equal(make(getter),null)
 assert.equal(Reflect.apply(make,null,[]),null);const ctx=make(input)!;for(const p of[NaN,Infinity,-Infinity,-.1,1.1])assert.equal(frame(ctx,p),null);assert.equal(frame(clone(ctx),.5),null);assert.equal(Reflect.apply(frame,null,[ctx]),null)
})

test('1375 fresh full5 fixed whole adapter and complete geometry guard',async()=>{
 const c=JSON.parse(readFileSync(new URL('../docs/hanja-source-cache-u85af-2026-10-22/source.json',import.meta.url)).toString()),p=JSON.parse(readFileSync(new URL('../docs/hanja-public-glyphwiki-engine-capture-u85af-2026-10-22/engine-whole-u85af-k.json',import.meta.url)).toString())
 assert.deepEqual(Object.keys(p).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(c.oldCorrectedCompiledExact,true);assert.equal(c.geometrySHA256,prep.expectedCompiledSHA256)
 const adapter=await import('../docs/hanja-source-cache-u85af-2026-10-22/source.mjs')
 assert.equal(adapter.projectionCallCount(),0);assert.deepEqual(adapter.compileSourceWhole('u85af-k',p.trace,p,c.identity),c.strokes);assert.equal(adapter.cachedPositiveCallCount(),1);assert.equal(adapter.projectionCallCount(),0);assert.throws(()=>adapter.captureProjection(p.trace,p,c.identity))
 assert.equal(c.strokes.length,18);assert.equal(c.strokes.flat().length,18);assert.equal(c.strokes.flat().reduce((n:number,m:any)=>n+(m.outline.match(/M/g)||[]).length,0),32)
 const canonical=(a:number[][])=>{const variants=[];for(const o of[a,[...a].reverse()])for(let i=0;i<a.length;i++)variants.push(JSON.stringify(o.slice(i).concat(o.slice(0,i))));return variants.sort()[0]}
 const expected=p.groups.flatMap((g:any)=>g.polygons.map((poly:any[])=>canonical(poly.map(q=>[q.x/2,q.y/2])))).sort(),actual=c.strokes.flat().flatMap((m:any)=>[...m.outline.matchAll(/M([^Z]+)Z/g)].map((x:any)=>canonical([...x[1].matchAll(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g)].map((v:any)=>[Number(v[1]),Number(v[2])])))).sort();assert.deepEqual(actual,expected)
 const ctx=whole(c.strokes);assert(ctx);const policy=pick(ctx,14,0)!;assert(policy);assert.equal(pick(ctx,13,0),null);assert.equal(pick(ctx,14,1),null);assert.equal(pick(clone(ctx),14,0),null)
 for(const mutate of[(s:any)=>s[0][0].weight++,(s:any)=>s[14][0].bounds[0]++,(s:any)=>s[13][0].outline+=' ',(s:any)=>s.reverse()]){const s=clone(c.strokes);mutate(s);assert.equal(whole(s),null)}
 assert.equal(currentSource.actualFull5SHA256,'de0d33d6a729f5533e86a1483307a7b9e838e4353638786192ed644a6ce0f925');assert.equal(currentSource.headerSynthesized,false)
})
test('1375 isolated cap DOM owner reset and visibility-last tail',()=>{
 const c=JSON.parse(readFileSync(new URL('../docs/hanja-source-cache-u85af-2026-10-22/source.json',import.meta.url)).toString()),ctx=whole(c.strokes),policy=pick(ctx,14,0)!
 const setup=()=>{const doc:any={defaultView:{getComputedStyle:()=>({transform:'none',getPropertyValue:()=> 'none'})}},writes:any[]=[];const node=(attrs:any={})=>({isConnected:true,ownerDocument:doc,ownerSVGElement:null as any,parentElement:null as any,attrs:{...attrs},getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;writes.push([this,k,v])},removeAttribute(k:string){delete this.attrs[k];writes.push([this,k,null])}});const svg=node(),g=node({'data-stroke-start-gate':'u85af-15-1','data-stroke-reveal-progress':'0'}),defs=node(),cp=node({id:'test-u85af-cap',clipPathUnits:'userSpaceOnUse'}),ink=node({'data-u85af-ink':'true','data-owner':'test',d:c.strokes[14][0].outline}),clip=node({'data-u85af-clip':'true'});for(const n of[g,defs,cp,ink,clip])n.ownerSVGElement=svg;g.parentElement=svg;defs.parentElement=g;cp.parentElement=defs;clip.parentElement=cp;ink.parentElement=g;return{svg,g,defs,cp,ink,clip,doc,writes}}
 for(const p of[0,1e-6,(2029/21040)/2,2029/21040,.5,.99999999,1]){const n=setup();n.g.attrs['data-stroke-reveal-progress']=String(p);const f=measure(policy,p)!;assert(f);assert(commit(n as any,f));assert.equal(n.ink.attrs.d,c.strokes[14][0].outline);assert.equal(n.ink.attrs['data-u85af-UA-read'],'false');assert.equal(n.ink.attrs.visibility,p===0?'hidden':'visible');assert.equal(n.ink.attrs['data-growing-progress'],String(p));const last=n.writes.filter(w=>w[0]===n.ink).at(-1)!;assert.deepEqual(last.slice(1),['visibility',p===0?'hidden':'visible']);assert.equal(n.ink.getAttribute('clip-path'),p===1?null:'url(#test-u85af-cap)');assert.equal(n.clip.getAttribute('d'),f.maskPath);assert.equal(n.ink.getAttribute('data-growing-length'),null)}
 const n=setup(),f=measure(policy,.5)!;n.g.attrs['data-stroke-reveal-progress']='.25';assert.equal(commit(n as any,f),false);n.g.attrs['data-stroke-reveal-progress']='0.5';assert.equal(commit(n as any,{...f}),false)
 for(const mutate of[(x:any)=>x.ink.attrs.d+='x',(x:any)=>x.clip.isConnected=false,(x:any)=>x.cp.attrs.id='foreign',(x:any)=>x.g.attrs.transform='scale(2)']){const x=setup();x.g.attrs['data-stroke-reveal-progress']='0.5';mutate(x);assert.equal(commit(x as any,f),false);assert.equal(x.ink.attrs.visibility,'hidden')}
 assert.equal(measure(policy,NaN),null);assert.equal(measure({...policy} as any,.5),null)
})
