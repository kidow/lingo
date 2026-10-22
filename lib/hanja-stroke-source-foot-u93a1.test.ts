import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU93a1FootContext,reviewedU93a1FootPolicy,makeReviewedU93a1FootSourceContext,measureReviewedU93a1FootFrame,commitReviewedU93a1FootMask,REVIEWED_U93A1_FOOT_SOURCE as SOURCE} from './hanja-stroke-source-foot-u93a1.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),sha=(s:string)=>createHash('sha256').update(s).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const f=JSON.parse(bytes(SOURCE.sourceCacheFile)),proof=JSON.parse(bytes(SOURCE.sourceFile)),strokes=f.strokes,identity={"root":"u93a1-ue0103","file":"../hanja-goal-glyphwiki-batch823-2026-10-13/engine-whole-u93a1-ue0103.json","fileSHA256":"ff41d6bf78642ce8a1d5a4c6f0d696c3be083397a04cb49a99324ae7642fa259"},context=reviewedU93a1FootContext(strokes),policies=[12,13,15,16].map(p=>reviewedU93a1FootPolicy(context,p,1)),code=readFileSync(new URL('./hanja-stroke-source-foot-u93a1.ts',import.meta.url),'utf8'),allFeet=JSON.parse(code.match(/^const FEET=(.*)$/m)![1])
function setup(index=0){
 const policy=policies[index]!,writes:string[]=[],doc:any={},view:any={document:doc,getComputedStyle:(n:any)=>({transform:n.css.transform??'none',getPropertyValue:(k:string)=>n.css[k]??''})};doc.defaultView=view
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>({localName:name,parentElement:parent,ownerDocument:doc,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:null as any,attrs:{...attrs},css:{} as any,getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=String(v);writes.push(name+':'+k+':'+v);(this as any).onSet?.(k,String(v))},removeAttribute(k:string){delete this.attrs[k]},get id(){return this.attrs.id??''}})
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u93a1-foot-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u93a1-foot-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u93a1-foot-ink','data-owner':'test','data-u93a1-foot-ink':'true',d:policy.segment.outline,mask:'url(#test-u93a1-foot-foot-x-mask)'}),foot=node('path',mask,{id:'test-u93a1-foot-foot','data-u93a1-foot-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u93a1-foot-body','data-u93a1-foot-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u93a1-foot-body-clip)'}),rect=node('rect',clip,{id:'test-u93a1-foot-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u93a1-foot-measure','data-u93a1-foot-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}
test('鎡 four own-P union/strict positive same-logical prior seed FIRST',()=>{
 assert.equal(sha(bytes(SOURCE.sourceFile)),SOURCE.sourceSHA256);assert.equal(sha(bytes(SOURCE.sourceCacheFile)),SOURCE.sourceCacheSHA256);assert.equal(sha(bytes(SOURCE.sourceConfigFile)),SOURCE.sourceConfigSHA256);
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
 assert.equal(sha(JSON.stringify(strokes)),SOURCE.geometrySHA256);assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n:number,m:any)=>n+(m.outline.match(/M/g)||[]).length,0)],[18,22,52]);
 assert.equal(sha(JSON.stringify(allFeet)),SOURCE.footGeometrySHA256);assert(context);assert.equal(makeReviewedU93a1FootSourceContext(proof,identity,strokes),context);
 for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)assert.equal(!!reviewedU93a1FootPolicy(context,i,j),[12,13,15,16].includes(i)&&j===1);
 for(const mutate of[(x:any)=>x.trace[13][0].args[0]++,(x:any)=>x.groups[15].polygons[0][0].x++,(x:any)=>delete x.engineHashes['2d.js']]){const bad=clone(proof);mutate(bad);assert.equal(makeReviewedU93a1FootSourceContext(bad,identity,strokes),null)}
 assert.equal(makeReviewedU93a1FootSourceContext(proof,{...identity,file:'other'},strokes),null);assert.equal(makeReviewedU93a1FootSourceContext({groups:proof.groups,trace:proof.trace,defaults:proof.defaults},identity,strokes),null);
 assert.equal(reviewedU93a1FootContext(JSON.parse(bytes('docs/hanja-source-cache-terminal10-u7e36-2026-10-23/fixture.json')).strokes),null);
 for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){const bad=clone(strokes),v=bad[i][j][key];bad[i][j][key]=typeof v==='number'?v+1:typeof v==='string'?v+' ':Array.isArray(v)?[...v,0]:null;assert.equal(reviewedU93a1FootContext(bad),null)}
 let getters=0;const bad=clone(strokes);Object.defineProperty(bad[0][0],'outline',{enumerable:true,get(){getters++;return strokes[0][0].outline}});assert.equal(reviewedU93a1FootContext(bad),null);assert.equal(getters,0);
 assert.equal(sha(JSON.stringify(allFeet)),SOURCE.footGeometrySHA256);assert.deepEqual(allFeet.map((x:any)=>x.pen),[13,14,16,17]);assert.deepEqual(allFeet.map((x:any)=>x.triangles.length),[16,9,16,8]);assert.equal(SOURCE.freshGuardDOMOnlyMathNotRecomputed,true);assert.equal(SOURCE.sourcePolygonsUnchanged,true);assert.equal(SOURCE.sourceLogicalMasksUnchanged,true);
 assert.equal(SOURCE.nativeProductApproval,false);assert.equal(SOURCE.sourceTimingPreservedClaim,false);
 console.log(JSON.stringify({newOwnFootSourceGuard:true,targets:4,triangles:[16,9,16,8],strictPositiveSameLogicalSeedPreviouslyProved:true,sourcePUnchanged:true,newClockNativeApproved:false,mathRerun:0,getters}));
})
function runDOM(index:number){
 const s=setup(index),read=(p:number)=>{s.g.setAttribute('data-stroke-reveal-progress',String(p));return measureReviewedU93a1FootFrame(s.policy,p,s.nodes.measurement)}
 const feet=allFeet[index],share=feet.phaseShare
 {
 for(const p of[0,1e-6,.01,.03,share-1e-10,share,share+1e-10,.95,.99999999,1]){
  const frame=read(p);assert.equal(frame.phase,p===0?'empty':p===1?'full':p<=share?'foot':'body');assert.equal(frame.UARead,p>share&&p<1)
  assert.equal(commitReviewedU93a1FootMask(s.nodes,frame),true);assert.equal(s.writes.at(-1),'path:visibility:'+(p===0?'hidden':'visible'))
  assert.equal(s.nodes.ink.getAttribute('d'),s.policy.segment.outline)
  if(p===1){assert.equal(s.nodes.ink.getAttribute('mask'),null);assert.equal(frame.L,null);assert.equal(s.nodes.ink.getAttribute('data-growing-length'),null)}
  else if(p>share){assert.equal(frame.d,frame.bodyProgress*frame.L!);assert(frame.threshold>=Number(feet.cutX[0])/Number(feet.cutX[1]));assert(frame.threshold<=s.policy.segment.bounds[2])}
 }
 const z=read(0);assert.equal(commitReviewedU93a1FootMask(s.nodes,z),true);assert.equal(s.nodes.foot.getAttribute('d'),'');assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(s.nodes.ink.getAttribute('data-growing-distance'),null)
 const stale=read(.6);s.g.setAttribute('data-stroke-reveal-progress','.7');assert.equal(commitReviewedU93a1FootMask(s.nodes,stale),false);assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden')
 assert.throws(()=>measureReviewedU93a1FootFrame({...s.policy},.5,s.nodes.measurement));for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>read(p))
 }
 const own=setup(index);own.g.setAttribute('data-stroke-reveal-progress','0.8');const f8=measureReviewedU93a1FootFrame(own.policy,.8,own.nodes.measurement);own.nodes.body.setAttribute('d','wrong');assert.equal(commitReviewedU93a1FootMask(own.nodes,f8),false)
 const forged=setup(index);forged.g.setAttribute('data-stroke-reveal-progress','0.8');const f=measureReviewedU93a1FootFrame(forged.policy,.8,forged.nodes.measurement);assert.equal(commitReviewedU93a1FootMask(forged.nodes,{...f}),false)
 const transformed=setup(index);transformed.g.setAttribute('data-stroke-reveal-progress','0.8');transformed.svg.setAttribute('transform','translate(0 0)');assert.throws(()=>measureReviewedU93a1FootFrame(transformed.policy,.8,transformed.nodes.measurement))
}
test('鎡 four foot DOM fresh frame/reset/visibility-last FIRST',()=>{for(let index=0;index<4;index++)runDOM(index)})

