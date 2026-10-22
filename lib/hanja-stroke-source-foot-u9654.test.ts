import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU9654FootContext,reviewedU9654FootPolicy,makeReviewedU9654FootSourceContext,measureReviewedU9654FootFrame,commitReviewedU9654FootMask,REVIEWED_U9654_FOOT_SOURCE as SOURCE} from './hanja-stroke-source-foot-u9654.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),sha=(s:string)=>createHash('sha256').update(s).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const f=JSON.parse(bytes(SOURCE.sourceCacheFile)),proof=JSON.parse(bytes(SOURCE.sourceFile)),strokes=f.u9654.strokes,identity={"sourceRoot":"u9654","sourceProofFile":"engine-whole-u9654.json","sourceProofFileSha256":"c9c59133365d33fdbe9c6cb6d58963c100db5cf91be234c9b3df4f1e7e7ea169"},context=reviewedU9654FootContext(strokes),policies=[reviewedU9654FootPolicy(context,5,1)],code=readFileSync(new URL('./hanja-stroke-source-foot-u9654.ts',import.meta.url),'utf8'),feet=JSON.parse(code.match(/^const FEET=(.*)$/m)![1])[0],R=(r:string[])=>r.map(BigInt),P=(p:string[][])=>p.map(R)
function setup(index=0){
 const policy=policies[index]!,writes:string[]=[],doc:any={},view:any={document:doc,getComputedStyle:(n:any)=>({transform:n.css.transform??'none',getPropertyValue:(k:string)=>n.css[k]??''})};doc.defaultView=view
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>({localName:name,parentElement:parent,ownerDocument:doc,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:null as any,attrs:{...attrs},css:{} as any,getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=String(v);writes.push(name+':'+k+':'+v);(this as any).onSet?.(k,String(v))},removeAttribute(k:string){delete this.attrs[k]},get id(){return this.attrs.id??''}})
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u9654-foot-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u9654-foot-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u9654-foot-ink','data-owner':'test','data-u9654-foot-ink':'true',d:policy.segment.outline,mask:'url(#test-u9654-foot-foot-x-mask)'}),foot=node('path',mask,{id:'test-u9654-foot-foot','data-u9654-foot-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u9654-foot-body','data-u9654-foot-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u9654-foot-body-clip)'}),rect=node('rect',clip,{id:'test-u9654-foot-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u9654-foot-measure','data-u9654-foot-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}



test('陔6m2 own fixed full5 and whole9p10m25 guard FIRST',()=>{
 for(const [file,hash] of [[SOURCE.sourceFile,SOURCE.sourceSHA256],[SOURCE.sourceCacheFile,SOURCE.sourceCacheSHA256],[SOURCE.sourceConfigFile,SOURCE.sourceConfigSHA256],[SOURCE.directionReviewFile,SOURCE.directionReviewSHA256]])assert.equal(sha(bytes(file)),hash)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(strokes)),SOURCE.geometrySHA256)
 assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n:any,m:any)=>n+(m.outline.match(/M/g)||[]).length,0)],[9,10,25])
 assert(context);assert.equal(makeReviewedU9654FootSourceContext(proof,identity,strokes),context)
 for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)assert.equal(!!reviewedU9654FootPolicy(context,i,j),i===5&&j===1)
 for(const mutate of[(x:any)=>x.trace[7][0].args[0]++,(x:any)=>x.groups[7].polygons[0][0].x++,(x:any)=>delete x.engineHashes['2d.js']]){const bad=clone(proof);mutate(bad);assert.equal(makeReviewedU9654FootSourceContext(bad,identity,strokes),null)}
 assert.equal(makeReviewedU9654FootSourceContext(proof,{...identity,sourceRoot:'other'},strokes),null);assert.equal(makeReviewedU9654FootSourceContext({groups:proof.groups,trace:proof.trace,defaults:proof.defaults},identity,strokes),null)
 for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){const bad=clone(strokes),v=bad[i][j][key];bad[i][j][key]=typeof v==='number'?v+1:typeof v==='string'?v+' ':Array.isArray(v)?[...v,0]:null;assert.equal(reviewedU9654FootContext(bad),null)}
 let getters=0;const bad=clone(strokes);Object.defineProperty(bad[0][0],'outline',{enumerable:true,get(){getters++;return strokes[0][0].outline}});assert.equal(reviewedU9654FootContext(bad),null);assert.equal(getters,0);assert.equal(reviewedU9654FootPolicy({...context!},5,1),null)
 assert.equal(sha(JSON.stringify([feet])),SOURCE.footGeometrySHA256);assert.equal(feet.pen,6);assert.equal(feet.triangles.length,17);assert.equal(feet.order.length,17);assert.equal(new Set(feet.order.map((x:any)=>x.triangle)).size,17)
 assert.deepEqual(feet.cutX,['758669','14620']);assert.deepEqual(feet.phaseShare,['98066652202','181852132437']);assert.equal(feet.proof.xMonotoneSlabs,24);assert(feet.proof.rootSeedInsideActualPriorSource)
 assert.equal(strokes[5][1].revealPath,'M39 36 Q50 41 56 51.5');assert.equal(strokes[5][1].revealWidth,14);assert.equal(strokes[5][1].weight,23.005434)
 assert.equal(SOURCE.sourceTimingPreservedClaim,false);assert.equal(SOURCE.nativeProductApproval,false)
})
test('u9654-foot actual DOM adapter new frame owner/reset/visibility-last FIRST',()=>{
 const s=setup(),read=(p:number)=>{s.g.setAttribute('data-stroke-reveal-progress',String(p));return measureReviewedU9654FootFrame(s.policy,p,s.nodes.measurement)}
 const share=SOURCE.footPhaseShare
 {
 for(const p of[0,1e-6,.01,.03,share-1e-10,share,share+1e-10,.95,.99999999,1]){
  const frame=read(p);assert.equal(frame.phase,p===0?'empty':p===1?'full':p<=share?'foot':'body');assert.equal(frame.UARead,p>share&&p<1)
  assert.equal(commitReviewedU9654FootMask(s.nodes,frame),true);assert.equal(s.writes.at(-1),'path:visibility:'+(p===0?'hidden':'visible'))
  assert.equal(s.nodes.ink.getAttribute('d'),s.policy.segment.outline)
  if(p===1){assert.equal(s.nodes.ink.getAttribute('mask'),null);assert.equal(frame.L,null);assert.equal(s.nodes.ink.getAttribute('data-growing-length'),null)}
  else if(p>share){assert.equal(frame.d,frame.bodyProgress*frame.L!);assert(frame.threshold>=Number(feet.cutX[0])/Number(feet.cutX[1]));assert(frame.threshold<=s.policy.segment.bounds[2])}
 }
 const z=read(0);assert.equal(commitReviewedU9654FootMask(s.nodes,z),true);assert.equal(s.nodes.foot.getAttribute('d'),'');assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(s.nodes.ink.getAttribute('data-growing-distance'),null)
 const stale=read(.6);s.g.setAttribute('data-stroke-reveal-progress','.7');assert.equal(commitReviewedU9654FootMask(s.nodes,stale),false);assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden')
 assert.throws(()=>measureReviewedU9654FootFrame({...s.policy},.5,s.nodes.measurement));for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>read(p))
 }
 const own=setup();own.g.setAttribute('data-stroke-reveal-progress','0.8');const f8=measureReviewedU9654FootFrame(own.policy,.8,own.nodes.measurement);own.nodes.body.setAttribute('d','wrong');assert.equal(commitReviewedU9654FootMask(own.nodes,f8),false)
 const forged=setup();forged.g.setAttribute('data-stroke-reveal-progress','0.8');const f=measureReviewedU9654FootFrame(forged.policy,.8,forged.nodes.measurement);assert.equal(commitReviewedU9654FootMask(forged.nodes,{...f}),false)
 const transformed=setup();transformed.g.setAttribute('data-stroke-reveal-progress','0.8');transformed.svg.setAttribute('transform','translate(0 0)');assert.throws(()=>measureReviewedU9654FootFrame(transformed.policy,.8,transformed.nodes.measurement))
})
