import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU61e5FootContext,reviewedU61e5FootPolicy,makeReviewedU61e5FootSourceContext,measureReviewedU61e5FootFrame,commitReviewedU61e5FootMask,REVIEWED_U61E5_FOOT_SOURCE as SOURCE} from './hanja-stroke-source-foot-u61e5.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),sha=(s:string)=>createHash('sha256').update(s).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const f=JSON.parse(bytes(SOURCE.sourceCacheFile)),proof=JSON.parse(bytes(SOURCE.sourceFile)),strokes=f.strokes,identity={"root":"u61e5","file":"../hanja-source-raw-compare-u61e5-2026-10-23/engine-whole-u61e5.json","fileSHA256":"b6f7e1f4927dd6fb9b20dd5105e834fab771ef2aa9bc3dab8866eb7be60fe398"},context=reviewedU61e5FootContext(strokes),policies=[reviewedU61e5FootPolicy(context,12,1)],code=readFileSync(new URL('./hanja-stroke-source-foot-u61e5.ts',import.meta.url),'utf8'),feet=JSON.parse(code.match(/^const FEET=(.*)$/m)![1])[0],R=(r:string[])=>r.map(BigInt),P=(p:string[][])=>p.map(R)
function setup(index=0){
 const policy=policies[index]!,writes:string[]=[],doc:any={},view:any={document:doc,getComputedStyle:(n:any)=>({transform:n.css.transform??'none',getPropertyValue:(k:string)=>n.css[k]??''})};doc.defaultView=view
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>({localName:name,parentElement:parent,ownerDocument:doc,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:null as any,attrs:{...attrs},css:{} as any,getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=String(v);writes.push(name+':'+k+':'+v);(this as any).onSet?.(k,String(v))},removeAttribute(k:string){delete this.attrs[k]},get id(){return this.attrs.id??''}})
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u61e5-foot-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u61e5-foot-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u61e5-foot-ink','data-owner':'test','data-u61e5-foot-ink':'true',d:policy.segment.outline,mask:'url(#test-u61e5-foot-foot-x-mask)'}),foot=node('path',mask,{id:'test-u61e5-foot-foot','data-u61e5-foot-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u61e5-foot-body','data-u61e5-foot-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u61e5-foot-body-clip)'}),rect=node('rect',clip,{id:'test-u61e5-foot-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u61e5-foot-measure','data-u61e5-foot-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}


test('懥 13m2 source union/positive prior seed FIRST',()=>{
 assert.equal(sha(bytes(SOURCE.sourceFile)),SOURCE.sourceSHA256);assert.equal(sha(bytes(SOURCE.sourceCacheFile)),SOURCE.sourceCacheSHA256);assert.equal(sha(bytes(SOURCE.sourceConfigFile)),SOURCE.sourceConfigSHA256);
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
 assert.equal(sha(JSON.stringify(strokes)),SOURCE.geometrySHA256);assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[18,21,38]);
 assert.equal(sha(JSON.stringify([feet])),SOURCE.footGeometrySHA256);assert(context);assert.equal(makeReviewedU61e5FootSourceContext(proof,identity,strokes),context);
 for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)assert.equal(!!reviewedU61e5FootPolicy(context,i,j),i===12&&j===1);
 for(const mutate of[(x:any)=>x.trace[15][0].args[0]++,(x:any)=>x.groups[15].polygons[0][0].x++,(x:any)=>delete x.engineHashes['2d.js']]){const bad=clone(proof);mutate(bad);assert.equal(makeReviewedU61e5FootSourceContext(bad,identity,strokes),null)}
 assert.equal(makeReviewedU61e5FootSourceContext(proof,{...identity,file:'other'},strokes),null);assert.equal(makeReviewedU61e5FootSourceContext({groups:proof.groups,trace:proof.trace,defaults:proof.defaults},identity,strokes),null);
 for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){const bad=clone(strokes),v=bad[i][j][key];bad[i][j][key]=typeof v==='number'?v+1:typeof v==='string'?v+' ':Array.isArray(v)?[...v,0]:null;assert.equal(reviewedU61e5FootContext(bad),null)}
 let getters=0;const bad=clone(strokes);Object.defineProperty(bad[0][0],'outline',{enumerable:true,get(){getters++;return strokes[0][0].outline}});assert.equal(reviewedU61e5FootContext(bad),null);assert.equal(getters,0);
 assert.equal(reviewedU61e5FootPolicy({...context!},12,1),null);
 assert.equal(feet.pen,13);assert.deepEqual(feet.cutX,["383647","7460"]);assert.equal(feet.triangles.length,9);assert.equal(feet.order.length,9);assert.equal(new Set(feet.order.map((x:any)=>x.triangle)).size,9);
 assert.equal(feet.sourceUnionBoundary.length,23);assert.equal(feet.proof.xMonotoneSlabs,22);assert.equal(feet.proof.nonAdjacentPairs,230);
 assert.deepEqual(SOURCE.footPhaseShareExact,["14732190332150","30627698479037"]);
 assert.equal(SOURCE.priorSourceIsCardinal,false);assert.equal(SOURCE.sourceTimingPreservedClaim,false);assert.equal(SOURCE.nativeProductApproval,false);
 assert.equal(feet.proof.rootSeedInsideActualPriorSource,true);assert.deepEqual(feet.proof.rootPreviousFullRoundEndpointDistanceSquared,["446309","1440000"]);
 // 새 witness 꼬리만: 저장seed가 ownroot삼각형과 선행원P삼각형의 strict interior.
 const prior=[[[["1083","20"],["1007","20"]],[["1189","20"],["1063","20"]],[["293","5"],["1087","20"]]],[[["1083","20"],["1007","20"]],[["293","5"],["1087","20"]],[["1153","20"],["111","2"]]],[[["1083","20"],["1007","20"]],[["1153","20"],["111","2"]],[["1133","20"],["567","10"]]],[[["1083","20"],["1007","20"]],[["1133","20"],["567","10"]],[["1113","20"],["1157","20"]]],[[["1083","20"],["1007","20"]],[["1113","20"],["1157","20"]],[["1091","20"],["1179","20"]]],[[["1083","20"],["1007","20"]],[["1091","20"],["1179","20"]],[["1069","20"],["1201","20"]]],[[["1083","20"],["1007","20"]],[["1069","20"],["1201","20"]],[["209","4"],["1223","20"]]],[[["1083","20"],["1007","20"]],[["209","4"],["1223","20"]],[["1021","20"],["1243","20"]]],[[["1083","20"],["1007","20"]],[["1021","20"],["1243","20"]],[["497","10"],["1263","20"]]],[[["497","10"],["1263","20"]],[["97","2"],["257","4"]],[["239","5"],["1273","20"]]],[[["497","10"],["1263","20"]],[["239","5"],["1273","20"]],[["487","10"],["623","10"]]],[[["497","10"],["1263","20"]],[["487","10"],["623","10"]],[["989","20"],["1217","20"]]],[[["497","10"],["1263","20"]],[["989","20"],["1217","20"]],[["1003","20"],["1189","20"]]],[[["497","10"],["1263","20"]],[["1003","20"],["1189","20"]],[["254","5"],["581","10"]]],[[["497","10"],["1263","20"]],[["254","5"],["581","10"]],[["1029","20"],["227","4"]]],[[["497","10"],["1263","20"]],[["1029","20"],["227","4"]],[["521","10"],["1109","20"]]],[[["497","10"],["1263","20"]],[["521","10"],["1109","20"]],[["1053","20"],["1083","20"]]],[[["497","10"],["1263","20"]],[["1053","20"],["1083","20"]],[["266","5"],["1057","20"]]],[[["497","10"],["1263","20"]],[["266","5"],["1057","20"]],[["537","10"],["258","5"]]],[[["497","10"],["1263","20"]],[["537","10"],["258","5"]],[["1083","20"],["1007","20"]]],[[["1089","20"],["249","5"]],[["1189","20"],["1063","20"]],[["1079","20"],["203","4"]]],[[["1189","20"],["1063","20"]],[["1207","20"],["547","10"]],[["287","5"],["1097","20"]]]],seed=feet.order[0].seed,root=feet.triangles[feet.order[0].triangle];
 const rr=(v:string[])=>[BigInt(v[0]),BigInt(v[1])],sub=(a:bigint[],b:bigint[])=>[a[0]*b[1]-b[0]*a[1],a[1]*b[1]],mul=(a:bigint[],b:bigint[])=>[a[0]*b[0],a[1]*b[1]];
 const orient=(a:string[][],b:string[][],p:string[][])=>sub(mul(sub(rr(b[0]),rr(a[0])),sub(rr(p[1]),rr(a[1]))),mul(sub(rr(b[1]),rr(a[1])),sub(rr(p[0]),rr(a[0]))))[0];
 for(const tri of [root,prior[feet.order[0].p1Triangle]])for(let i=0;i<3;i++)assert(orient(tri[i],tri[(i+1)%3],seed)>0n);
 assert.equal(strokes[12][0].revealPath,'M57.075 51.3125 Q53.582499999999996 57.925 48.185 63.9625');assert.equal(strokes[12][1].revealPath,'M37.39 65.1125 Q56.1225 64.25 77.7125 61.6625');
 assert.equal(strokes[12][1].revealWidth,14);assert.equal(strokes[12][1].weight,40.469822);
 console.log(JSON.stringify({newOwnFootSourceGuard:true,unionVertices:23,triangles:9,strictPositiveSeed:true,sourcePUnchanged:true,newClockNativeApproved:false,mathRerun:0}));
})
test('u61e5-foot actual DOM adapter new frame owner/reset/visibility-last FIRST',()=>{
 const s=setup(),read=(p:number)=>{s.g.setAttribute('data-stroke-reveal-progress',String(p));return measureReviewedU61e5FootFrame(s.policy,p,s.nodes.measurement)}
 const share=SOURCE.footPhaseShare
 {
 for(const p of[0,1e-6,.01,.03,share-1e-10,share,share+1e-10,.95,.99999999,1]){
  const frame=read(p);assert.equal(frame.phase,p===0?'empty':p===1?'full':p<=share?'foot':'body');assert.equal(frame.UARead,p>share&&p<1)
  assert.equal(commitReviewedU61e5FootMask(s.nodes,frame),true);assert.equal(s.writes.at(-1),'path:visibility:'+(p===0?'hidden':'visible'))
  assert.equal(s.nodes.ink.getAttribute('d'),s.policy.segment.outline)
  if(p===1){assert.equal(s.nodes.ink.getAttribute('mask'),null);assert.equal(frame.L,null);assert.equal(s.nodes.ink.getAttribute('data-growing-length'),null)}
  else if(p>share){assert.equal(frame.d,frame.bodyProgress*frame.L!);assert(frame.threshold>=Number(feet.cutX[0])/Number(feet.cutX[1]));assert(frame.threshold<=s.policy.segment.bounds[2])}
 }
 const z=read(0);assert.equal(commitReviewedU61e5FootMask(s.nodes,z),true);assert.equal(s.nodes.foot.getAttribute('d'),'');assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(s.nodes.ink.getAttribute('data-growing-distance'),null)
 const stale=read(.6);s.g.setAttribute('data-stroke-reveal-progress','.7');assert.equal(commitReviewedU61e5FootMask(s.nodes,stale),false);assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden')
 assert.throws(()=>measureReviewedU61e5FootFrame({...s.policy},.5,s.nodes.measurement));for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>read(p))
 }
 const own=setup();own.g.setAttribute('data-stroke-reveal-progress','0.8');const f8=measureReviewedU61e5FootFrame(own.policy,.8,own.nodes.measurement);own.nodes.body.setAttribute('d','wrong');assert.equal(commitReviewedU61e5FootMask(own.nodes,f8),false)
 const forged=setup();forged.g.setAttribute('data-stroke-reveal-progress','0.8');const f=measureReviewedU61e5FootFrame(forged.policy,.8,forged.nodes.measurement);assert.equal(commitReviewedU61e5FootMask(forged.nodes,{...f}),false)
 const transformed=setup();transformed.g.setAttribute('data-stroke-reveal-progress','0.8');transformed.svg.setAttribute('transform','translate(0 0)');assert.throws(()=>measureReviewedU61e5FootFrame(transformed.policy,.8,transformed.nodes.measurement))
})
