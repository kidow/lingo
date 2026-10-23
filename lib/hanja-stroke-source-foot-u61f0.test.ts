import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU61f0FootContext,reviewedU61f0FootPolicy,makeReviewedU61f0FootSourceContext,measureReviewedU61f0FootFrame,commitReviewedU61f0FootMask,REVIEWED_U61F0_FOOT_SOURCE as SOURCE} from './hanja-stroke-source-foot-u61f0.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url),'utf8'),sha=(s:string)=>createHash('sha256').update(s).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const f=JSON.parse(bytes(SOURCE.sourceCacheFile))['u61f0-order2'],proof=f.fullProof,strokes=f.strokes,identity=f.identity,context=reviewedU61f0FootContext(strokes),policies=[reviewedU61f0FootPolicy(context,4,1)],code=readFileSync(new URL('./hanja-stroke-source-foot-u61f0.ts',import.meta.url),'utf8'),allFeet=JSON.parse(code.match(/^const FEET=(.*)$/m)![1])
function setup(index=0){
 const policy=policies[index]!,writes:string[]=[],doc:any={},view:any={document:doc,getComputedStyle:(n:any)=>({transform:n.css.transform??'none',getPropertyValue:(k:string)=>n.css[k]??''})};doc.defaultView=view
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>({localName:name,parentElement:parent,ownerDocument:doc,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:null as any,attrs:{...attrs},css:{} as any,getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=String(v);writes.push(name+':'+k+':'+v);(this as any).onSet?.(k,String(v))},removeAttribute(k:string){delete this.attrs[k]},get id(){return this.attrs.id??''}})
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u61f0-foot-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u61f0-foot-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u61f0-foot-ink','data-owner':'test','data-u61f0-foot-ink':'true',d:policy.segment.outline,mask:'url(#test-u61f0-foot-foot-x-mask)'}),foot=node('path',mask,{id:'test-u61f0-foot-foot','data-u61f0-foot-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u61f0-foot-body','data-u61f0-foot-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u61f0-foot-body-clip)'}),rect=node('rect',clip,{id:'test-u61f0-foot-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u61f0-foot-measure','data-u61f0-foot-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}
test('懰 original cached full5 and actual prior foot-source guard FIRST',()=>{
 assert(context);assert.equal(makeReviewedU61f0FootSourceContext(proof,identity,strokes),context)
 for(const[p,h]of[[SOURCE.sourceCacheFile,SOURCE.sourceCacheSHA256],[SOURCE.sourceHeaderFile,SOURCE.sourceHeaderSHA256],[SOURCE.sourceTraceFile,SOURCE.sourceTraceSHA256],[SOURCE.sourceArchiveFile,SOURCE.sourceArchiveSHA256],[SOURCE.proofFile,SOURCE.proofSHA256]])assert.equal(sha(bytes(p)),h)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),SOURCE.full5SHA256);assert.deepEqual(JSON.parse(bytes(SOURCE.sourceHeaderFile)),Object.fromEntries(Object.entries(proof).filter(([k])=>k!=='trace')));assert.deepEqual(JSON.parse(bytes(SOURCE.sourceTraceFile)),proof.trace)
 assert.equal(sha(JSON.stringify(strokes)),SOURCE.geometrySHA256);assert.equal(sha(JSON.stringify(allFeet)),SOURCE.footGeometrySHA256);assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n:number,m:any)=>n+(m.outline.match(/M/g)||[]).length,0)],[18,21,46])
 const cert=JSON.parse(bytes(SOURCE.proofFile));assert.deepEqual([cert.DATA],allFeet);assert.deepEqual([cert.DATA.triangles.length,cert.DATA.order[0].triangle],[12,7]);assert.equal(cert.actualPrior.kind,'cardinal-originalP');assert.deepEqual(cert.originalSegment,strokes[4][1]);assert.deepEqual(cert.actualPrior.segment,strokes[4][0]);assert.equal(SOURCE.actualCachedFull5Preserved,true);assert.equal(SOURCE.priorOriginalPMembershipAloneNotUsed,true);assert.equal(SOURCE.nativeProductApproval,false);assert.equal(SOURCE.runtimeApplied,false)
 let negative=0;for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)for(const key of Object.keys(strokes[p][m])){const q=clone(strokes),s=q[p][m];if(key==='bounds')s.bounds[0]+=.01;else if(typeof s[key]==='number')s[key]+=.01;else s[key]+=' ';assert.equal(reviewedU61f0FootContext(q),null);negative++}
 for(const field of Object.keys(proof)){const bad=clone(proof);delete bad[field];assert.equal(makeReviewedU61f0FootSourceContext(bad,identity,strokes),null)}
 for(const field of Object.keys(identity)){const bad=clone(identity);delete bad[field];assert.equal(makeReviewedU61f0FootSourceContext(proof,bad,strokes),null)}
 const wrong=clone(identity);wrong.root='u7cbb';assert.equal(makeReviewedU61f0FootSourceContext(proof,wrong,strokes),null)
 let getterReads=0;const getter=clone(strokes);Object.defineProperty(getter[0][0],'weight',{enumerable:true,get(){getterReads++;return 1}});assert.equal(reviewedU61f0FootContext(getter),null);assert.equal(getterReads,0);assert.equal(reviewedU61f0FootPolicy({...context!},4,1),null);assert.equal(reviewedU61f0FootPolicy(context,4,0),null);assert.equal(reviewedU61f0FootPolicy(context,3,1),null)
 console.log(JSON.stringify({wholeMaterialNegatives:negative,getterReads,completeCachedFull5Preserved:true,originalHeader4AndTrace1Exact:true,sourceIdentityFields:Object.keys(identity).length,robustFootCertificates:1,actualPriorCardinal:1,newMathReexecuted:0,nativeApproval:false,SSR:0}))
})
function runDOM(index:number){
 const s=setup(index),read=(p:number)=>{s.g.setAttribute('data-stroke-reveal-progress',String(p));return measureReviewedU61f0FootFrame(s.policy,p,s.nodes.measurement)}
 const feet=allFeet[index],share=Number(feet.phaseShare[0])/Number(feet.phaseShare[1])
 {
 for(const p of[0,1e-6,.01,.03,share-1e-10,share,share+1e-10,.95,.99999999,1]){
  const frame=read(p);assert.equal(frame.phase,p===0?'empty':p===1?'full':p<=share?'foot':'body');assert.equal(frame.UARead,p>share&&p<1)
  assert.equal(commitReviewedU61f0FootMask(s.nodes,frame),true);assert.equal(s.writes.at(-1),'path:visibility:'+(p===0?'hidden':'visible'))
  assert.equal(s.nodes.ink.getAttribute('d'),s.policy.segment.outline)
  if(p===1){assert.equal(s.nodes.ink.getAttribute('mask'),null);assert.equal(frame.L,null);assert.equal(s.nodes.ink.getAttribute('data-growing-length'),null)}
  else if(p>share){assert.equal(frame.d,frame.bodyProgress*frame.L!);assert(frame.threshold>=Number(feet.cutX[0])/Number(feet.cutX[1]));assert(frame.threshold<=s.policy.segment.bounds[2])}
 }
 const z=read(0);assert.equal(commitReviewedU61f0FootMask(s.nodes,z),true);assert.equal(s.nodes.foot.getAttribute('d'),'');assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden');assert.equal(s.nodes.ink.getAttribute('data-growing-distance'),null)
 const stale=read(.6);s.g.setAttribute('data-stroke-reveal-progress','.7');assert.equal(commitReviewedU61f0FootMask(s.nodes,stale),false);assert.equal(s.nodes.ink.getAttribute('visibility'),'hidden')
 assert.throws(()=>measureReviewedU61f0FootFrame({...s.policy},.5,s.nodes.measurement));for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>read(p))
 }
 const own=setup(index);own.g.setAttribute('data-stroke-reveal-progress','0.8');const f8=measureReviewedU61f0FootFrame(own.policy,.8,own.nodes.measurement);own.nodes.body.setAttribute('d','wrong');assert.equal(commitReviewedU61f0FootMask(own.nodes,f8),false)
 const forged=setup(index);forged.g.setAttribute('data-stroke-reveal-progress','0.8');const f=measureReviewedU61f0FootFrame(forged.policy,.8,forged.nodes.measurement);assert.equal(commitReviewedU61f0FootMask(forged.nodes,{...f}),false)
 const transformed=setup(index);transformed.g.setAttribute('data-stroke-reveal-progress','0.8');transformed.svg.setAttribute('transform','translate(0 0)');assert.throws(()=>measureReviewedU61f0FootFrame(transformed.policy,.8,transformed.nodes.measurement))
}
test('懰 one own foot DOM fresh frame/reset/visibility-last FIRST',()=>{for(let index=0;index<1;index++)runDOM(index)})
test('懰 reported5m2 gap progress is rooted foot without guide UA reads',()=>{
 const priorWeight=strokes[4][0].weight,nextWeight=strokes[4][1].weight,global=.5009887427846339,p=(global*(priorWeight+nextWeight)-priorWeight)/nextWeight
 assert(Math.abs(p-.03)<1e-12);const s=setup();s.g.setAttribute('data-stroke-reveal-progress',String(p));const frame=measureReviewedU61f0FootFrame(s.policy,p,s.nodes.measurement)
 assert.equal(frame.phase,'foot');assert.equal(frame.UARead,false);assert.equal(frame.L,null);assert.equal(frame.point,null);assert(frame.footPathD.length>0);assert.equal(commitReviewedU61f0FootMask(s.nodes,frame),true);assert.equal(s.nodes.body.getAttribute('visibility'),'hidden');assert.deepEqual(s.counts(),{lengths:0,points:0});assert.equal(s.nodes.ink.getAttribute('d'),strokes[4][1].outline)
 console.log(JSON.stringify({reportedOldGlobal:global,derivedMaskLocal:p,newPhase:'foot',originalGuideUAReads:0,finiteDOMOnly:true,nativeApproval:false}))
})
test('懰 foot normalized UA x domain preserves raw float32 undershoot without tolerance',()=>{
 const s=setup(),share=Number(allFeet[0].phaseShare[0])/Number(allFeet[0].phaseShare[1]),p=share+1e-10,q=s.policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number)
 s.g.setAttribute('data-stroke-reveal-progress',String(p))
 for(const side of ['below','above'] as const){const raw=side==='below'?q[0]-2**-20:q[4]+2**-20;s.nodes.measurement.getPointAtLength=(d:number)=>({x:d===0?q[0]:d===40?q[4]:raw,y:q[1]});const frame=measureReviewedU61f0FootFrame(s.policy,p,s.nodes.measurement);assert.equal(frame.point!.x,raw);assert.equal(frame.threshold,side==='below'?39:s.policy.segment.bounds[2]);assert.equal(commitReviewedU61f0FootMask(s.nodes,frame),true)}
 console.log(JSON.stringify({newUADomainCases:2,rawPointPreserved:true,tolerance:0,nativeApproval:false}))
})
