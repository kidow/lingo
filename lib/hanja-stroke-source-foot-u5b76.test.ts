import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU5b76FootContext,reviewedU5b76FootPolicy,makeReviewedU5b76FootSourceContext,measureReviewedU5b76FootFrame,commitReviewedU5b76FootMask,REVIEWED_U5B76_FOOT_SOURCE as SOURCE} from './hanja-stroke-source-foot-u5b76.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),sha=(s:string)=>createHash('sha256').update(s).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const wrapper=JSON.parse(bytes(SOURCE.sourceCacheFile)),strokes=wrapper[SOURCE.root].strokes,proof=JSON.parse(bytes(SOURCE.sourceFile)),identity={"sourceRoot":"u5b76-ue0102","sourceProofFile":"engine-whole-u5b76-ue0102.json","sourceProofFileSha256":"21a36539fcd4ca8ce572502737989296f674f03611dc5bd369a2cc37d0a9eaa0"},context=reviewedU5b76FootContext(strokes),policies=SOURCE.targets.map(t=>reviewedU5b76FootPolicy(context,t.pen-1,t.mask-1)),code=readFileSync(new URL('./hanja-stroke-source-foot-u5b76.ts',import.meta.url),'utf8'),feet=JSON.parse(code.match(/^const FEET=(.*)$/m)![1])
function setup(index=0){
 const policy=policies[index]!,writes:string[]=[],doc:any={},view:any={document:doc,getComputedStyle:(n:any)=>({transform:n.css.transform??'none',getPropertyValue:(k:string)=>n.css[k]??''})};doc.defaultView=view
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>({localName:name,parentElement:parent,ownerDocument:doc,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:null as any,attrs:{...attrs},css:{} as any,getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=String(v);writes.push(name+':'+k+':'+v);(this as any).onSet?.(k,String(v))},removeAttribute(k:string){delete this.attrs[k]},get id(){return this.attrs.id??''}})
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u5b76-foot-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u5b76-foot-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u5b76-foot-ink','data-owner':'test','data-u5b76-foot-ink':'true',d:policy.segment.outline,mask:'url(#test-u5b76-foot-foot-x-mask)'}),foot=node('path',mask,{id:'test-u5b76-foot-foot','data-u5b76-foot-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u5b76-foot-body','data-u5b76-foot-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u5b76-foot-body-clip)'}),rect=node('rect',clip,{id:'test-u5b76-foot-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u5b76-foot-measure','data-u5b76-foot-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}



test('孶 four-foot strict whole/source/getter guard FIRST',()=>{
 for(const [p,h]of[[SOURCE.sourceFile,SOURCE.sourceSHA256],[SOURCE.sourceCacheFile,SOURCE.sourceCacheSHA256],[SOURCE.sourceConfigFile,SOURCE.sourceConfigSHA256],[SOURCE.directionReviewFile,SOURCE.directionReviewSHA256],[SOURCE.nativeHoldFile,SOURCE.nativeHoldSHA256]])assert.equal(sha(bytes(p)),h)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(strokes)),SOURCE.geometrySHA256)
 assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n:any,m:any)=>n+(m.outline.match(/M/g)||[]).length,0)],[13,19,44]);assert.equal(sha(JSON.stringify(feet)),SOURCE.allFootGeometrySHA256)
 assert(context);assert.equal(makeReviewedU5b76FootSourceContext(proof,identity,strokes),context);assert.equal(feet.length,4)
 for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)assert.equal(!!reviewedU5b76FootPolicy(context,i,j),[4,5,7,8].includes(i)&&j===1)
 for(const [i,t]of SOURCE.targets.entries()){assert(policies[i]);assert.equal(policies[i]!.id,t.id);assert.equal(policies[i]!.footIndex,i);assert.equal(sha(JSON.stringify([feet[i]])),t.footGeometrySHA256);assert.equal(feet[i].triangles.length,t.triangles);assert.equal(feet[i].order.length,t.triangles);assert.equal(new Set(feet[i].order.map((o:any)=>o.triangle)).size,t.triangles);assert.equal(Number(feet[i].phaseShare[0])/Number(feet[i].phaseShare[1]),t.phaseShare);assert(feet[i].proof.rootSeedInsideActualPriorSource);assert.equal(t.newClockNativeApproved,false)}
 for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){const bad=clone(strokes),v=bad[i][j][key];bad[i][j][key]=typeof v==='number'?v+1:typeof v==='string'?v+' ':Array.isArray(v)?[...v,0]:null;assert.equal(reviewedU5b76FootContext(bad),null)}
 for(const mutate of[(x:any)=>x.trace[5][0].args[0]++,(x:any)=>x.groups[5].polygons[0][0].x++,(x:any)=>delete x.engineHashes['2d.js']]){const bad=clone(proof);mutate(bad);assert.equal(makeReviewedU5b76FootSourceContext(bad,identity,strokes),null)}
 assert.equal(makeReviewedU5b76FootSourceContext(proof,{...identity,sourceRoot:'other'},strokes),null);assert.equal(makeReviewedU5b76FootSourceContext({groups:proof.groups,trace:proof.trace,defaults:proof.defaults},identity,strokes),null)
 let getters=0;const bad=clone(strokes);Object.defineProperty(bad[4][1],'outline',{enumerable:true,get(){getters++;return strokes[4][1].outline}});assert.equal(reviewedU5b76FootContext(bad),null);assert.equal(getters,0);assert.equal(reviewedU5b76FootPolicy({...context!},4,1),null)
 assert.equal(strokes[11][1].direction,'left');assert.equal(SOURCE.sourceTimingPreservedClaim,false);assert.equal(SOURCE.nativeProductApproval,false)
 console.log(JSON.stringify({strictGuard:'PASS',targets:4,storedFIRSTExactGeometry:true,mathRerun:0,originalPGuideWidthBodyWeights:true,LEFT12Unaffected:true}))
})
test('孶 four-foot actual DOM owner/frame/reset/visibility-last FIRST',()=>{
 for(let index=0;index<4;index++){
 const s=setup(index),share=SOURCE.targets[index].phaseShare,read=(p:number)=>{s.g.setAttribute('data-stroke-reveal-progress',String(p));return measureReviewedU5b76FootFrame(s.policy,p,s.nodes.measurement)}
 for(const p of[0,1e-6,.01,.03,.1,.25,.5,.75,share-1e-10,share,share+1e-10,.95,.99999999,1]){
 const prior=s.counts(),frame=read(p);assert.equal(frame.phase,p===0?'empty':p===1?'full':p<=share?'foot':'body');assert.equal(frame.UARead,p>share&&p<1);assert.equal(commitReviewedU5b76FootMask(s.nodes,frame),true);assert.equal(s.writes.at(-1),'path:visibility:'+(p===0?'hidden':'visible'));assert.equal(s.nodes.ink.getAttribute('d'),s.policy.segment.outline)
 if(p>share&&p<1){assert.deepEqual(s.counts(),{lengths:prior.lengths+2,points:prior.points+3});assert.equal(frame.d,frame.bodyProgress*frame.L!);assert(frame.threshold>=SOURCE.targets[index].cutX);assert(frame.threshold<=s.policy.segment.bounds[2])}else assert.deepEqual(s.counts(),prior)
 if(p===0)assert.equal(s.nodes.foot.getAttribute('d'),'');if(p===1){assert.equal(s.nodes.ink.getAttribute('mask'),null);assert.equal(frame.L,null);assert.equal(s.nodes.ink.getAttribute('data-growing-length'),null)}
 }
 assert.equal(commitReviewedU5b76FootMask(s.nodes,read(0)),true);assert.equal(s.nodes.foot.getAttribute('d'),'');assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(s.nodes.ink.getAttribute('data-growing-distance'),null)
 const stale=read(.8);s.g.setAttribute('data-stroke-reveal-progress','.9');assert.equal(commitReviewedU5b76FootMask(s.nodes,stale),false);assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden');assert.throws(()=>measureReviewedU5b76FootFrame({...s.policy},.5,s.nodes.measurement));for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>read(p))
 for(const mutate of[(n:any)=>n.nodes.body.setAttribute('d','wrong'),(n:any)=>n.nodes.ink.setAttribute('data-owner','other'),(n:any)=>n.nodes.rect.parentElement=n.defs]){const n=setup(index);n.g.setAttribute('data-stroke-reveal-progress','0.8');const frame=measureReviewedU5b76FootFrame(n.policy,.8,n.nodes.measurement);mutate(n);assert.equal(commitReviewedU5b76FootMask(n.nodes,frame),false)}
 const forged=setup(index);forged.g.setAttribute('data-stroke-reveal-progress','0.8');const frame=measureReviewedU5b76FootFrame(forged.policy,.8,forged.nodes.measurement);assert.equal(commitReviewedU5b76FootMask(forged.nodes,{...frame}),false)
 const transformed=setup(index);transformed.svg.setAttribute('transform','translate(0 0)');assert.throws(()=>measureReviewedU5b76FootFrame(transformed.policy,.8,transformed.nodes.measurement))
 }
 console.log(JSON.stringify({newOwnDOM:'PASS',footTargets:4,originalD:true,sameFrameNativeUA:true,p0DegenerateOmitted:true,visibilityLast:true,nativeApproval:false}))
})
