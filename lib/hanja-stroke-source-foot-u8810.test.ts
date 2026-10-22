import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU8810FootContext,reviewedU8810FootPolicy,makeReviewedU8810FootSourceContext,measureReviewedU8810FootFrame,commitReviewedU8810FootMask,REVIEWED_U8810_FOOT_SOURCE as SOURCE} from './hanja-stroke-source-foot-u8810.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),sha=(s:string)=>createHash('sha256').update(s).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const f=JSON.parse(bytes(SOURCE.sourceCacheFile)),proof=JSON.parse(bytes(SOURCE.sourceFile)),strokes=f.strokes,identity={"root":"u8810","file":"../hanja-source-raw-compare-u8810-2026-10-23/engine-whole-u8810.json","fileSHA256":"8061eba86732b7e13a5c5e169b08adebf4e846bf176a7a938cfde5f1dcab3a4b"},context=reviewedU8810FootContext(strokes),policies=[reviewedU8810FootPolicy(context,14,1)],code=readFileSync(new URL('./hanja-stroke-source-foot-u8810.ts',import.meta.url),'utf8'),feet=JSON.parse(code.match(/^const FEET=(.*)$/m)![1])[0],R=(r:string[])=>r.map(BigInt),P=(p:string[][])=>p.map(R)
function setup(index=0){
 const policy=policies[index]!,writes:string[]=[],doc:any={},view:any={document:doc,getComputedStyle:(n:any)=>({transform:n.css.transform??'none',getPropertyValue:(k:string)=>n.css[k]??''})};doc.defaultView=view
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>({localName:name,parentElement:parent,ownerDocument:doc,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:null as any,attrs:{...attrs},css:{} as any,getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=String(v);writes.push(name+':'+k+':'+v);(this as any).onSet?.(k,String(v))},removeAttribute(k:string){delete this.attrs[k]},get id(){return this.attrs.id??''}})
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u8810-foot-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u8810-foot-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u8810-foot-ink','data-owner':'test','data-u8810-foot-ink':'true',d:policy.segment.outline,mask:'url(#test-u8810-foot-foot-x-mask)'}),foot=node('path',mask,{id:'test-u8810-foot-foot','data-u8810-foot-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u8810-foot-body','data-u8810-foot-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u8810-foot-body-clip)'}),rect=node('rect',clip,{id:'test-u8810-foot-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u8810-foot-measure','data-u8810-foot-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}


test('u8810 15m2 exact source authority and already-proved own contact certificate FIRST',()=>{
 assert.equal(sha(bytes(SOURCE.sourceFile)),SOURCE.sourceSHA256);assert.equal(sha(bytes(SOURCE.sourceCacheFile)),SOURCE.sourceCacheSHA256);assert.equal(sha(bytes(SOURCE.sourceConfigFile)),SOURCE.sourceConfigSHA256);
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(strokes)),SOURCE.geometrySHA256);
 assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[20,23,46]);
 assert.equal(sha(JSON.stringify([feet])),SOURCE.footGeometrySHA256);assert(context);assert.equal(makeReviewedU8810FootSourceContext(proof,identity,strokes),context);
 for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)assert.equal(!!reviewedU8810FootPolicy(context,i,j),i===14&&j===1);
 for(const mutate of[(x)=>x.trace[17][0].args[0]++,(x)=>x.groups[17].polygons[0][0].x++,(x)=>delete x.engineHashes['2d.js']]){const bad=clone(proof);mutate(bad);assert.equal(makeReviewedU8810FootSourceContext(bad,identity,strokes),null)}
 assert.equal(makeReviewedU8810FootSourceContext(proof,{...identity,file:'other'},strokes),null);assert.equal(makeReviewedU8810FootSourceContext({groups:proof.groups,trace:proof.trace,defaults:proof.defaults},identity,strokes),null);
 for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){const bad=clone(strokes),v=bad[i][j][key];bad[i][j][key]=typeof v==='number'?v+1:typeof v==='string'?v+' ':Array.isArray(v)?[...v,0]:null;assert.equal(reviewedU8810FootContext(bad),null)}
 let getters=0;const accessor={...strokes[0][0]};Object.defineProperty(accessor,'outline',{enumerable:true,get(){getters++;return strokes[0][0].outline}});const bad=clone(strokes);bad[0][0]=accessor;assert.equal(reviewedU8810FootContext(bad),null);assert.equal(getters,0);
 assert.equal(reviewedU8810FootPolicy({...context!},14,1),null);
 // The exact arrangement arithmetic was executed once before authoring; this tail binds its saved certificate, not a second calculation.
 assert.equal(feet.pen,15);assert.deepEqual(feet.cutX,["393","5"]);assert.equal(feet.triangles.length,9);assert.equal(feet.order.length,9);assert.equal(new Set(feet.order.map(x=>x.triangle)).size,9);
 assert.deepEqual(feet.proof.priorIntersectionArea,["367181","24800"]);assert.deepEqual(feet.proof.rootActualP1IntersectionArea,["18227642731","2550641600"]);
 assert.equal(feet.proof.sourceP1IsCardinal,true);assert.equal(feet.proof.rootEndpointDiscNotAssumed,true);assert.equal(feet.proof.arithmeticBatchFirstPassed,true);
 assert.equal(feet.sourceUnionBoundary.length,19);assert.equal(feet.proof.xMonotoneSlabs,18);assert.equal(feet.proof.nonAdjacentPairs,152);
 assert.deepEqual(SOURCE.footPhaseShareExact,["58988763662","81314786437"]);assert.equal(SOURCE.sourceTimingPreservedClaim,false);assert.equal(SOURCE.nativeProductApproval,false);assert.equal(SOURCE.runtimeApplied,false);
 assert.equal(strokes[14][0].direction,'down');assert.equal(strokes[14][0].revealPath,undefined);
 assert.equal(strokes[14][1].revealPath,'M70.19 49.1 Q77.89500000000001 46.325 85.6 42.625');assert.equal(strokes[14][1].revealWidth,14);assert.equal(strokes[14][1].weight,16.715075);
})
test('u8810-foot actual DOM adapter new frame owner/reset/visibility-last FIRST',()=>{
 const s=setup(),read=(p:number)=>{s.g.setAttribute('data-stroke-reveal-progress',String(p));return measureReviewedU8810FootFrame(s.policy,p,s.nodes.measurement)}
 const share=SOURCE.footPhaseShare
 {
 for(const p of[0,1e-6,.01,.03,share-1e-10,share,share+1e-10,.95,.99999999,1]){
  const frame=read(p);assert.equal(frame.phase,p===0?'empty':p===1?'full':p<=share?'foot':'body');assert.equal(frame.UARead,p>share&&p<1)
  assert.equal(commitReviewedU8810FootMask(s.nodes,frame),true);assert.equal(s.writes.at(-1),'path:visibility:'+(p===0?'hidden':'visible'))
  assert.equal(s.nodes.ink.getAttribute('d'),s.policy.segment.outline)
  if(p===1){assert.equal(s.nodes.ink.getAttribute('mask'),null);assert.equal(frame.L,null);assert.equal(s.nodes.ink.getAttribute('data-growing-length'),null)}
  else if(p>share){assert.equal(frame.d,frame.bodyProgress*frame.L!);assert(frame.threshold>=Number(feet.cutX[0])/Number(feet.cutX[1]));assert(frame.threshold<=s.policy.segment.bounds[2])}
 }
 const z=read(0);assert.equal(commitReviewedU8810FootMask(s.nodes,z),true);assert.equal(s.nodes.foot.getAttribute('d'),'');assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(s.nodes.ink.getAttribute('data-growing-distance'),null)
 const stale=read(.6);s.g.setAttribute('data-stroke-reveal-progress','.7');assert.equal(commitReviewedU8810FootMask(s.nodes,stale),false);assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden')
 assert.throws(()=>measureReviewedU8810FootFrame({...s.policy},.5,s.nodes.measurement));for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>read(p))
 }
 const own=setup();own.g.setAttribute('data-stroke-reveal-progress','0.8');const f8=measureReviewedU8810FootFrame(own.policy,.8,own.nodes.measurement);own.nodes.body.setAttribute('d','wrong');assert.equal(commitReviewedU8810FootMask(own.nodes,f8),false)
 const forged=setup();forged.g.setAttribute('data-stroke-reveal-progress','0.8');const f=measureReviewedU8810FootFrame(forged.policy,.8,forged.nodes.measurement);assert.equal(commitReviewedU8810FootMask(forged.nodes,{...f}),false)
 const transformed=setup();transformed.g.setAttribute('data-stroke-reveal-progress','0.8');transformed.svg.setAttribute('transform','translate(0 0)');assert.throws(()=>measureReviewedU8810FootFrame(transformed.policy,.8,transformed.nodes.measurement))
})
