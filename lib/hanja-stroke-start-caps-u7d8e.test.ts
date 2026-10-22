import assert from'node:assert/strict'
import test from'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{reviewedU7d8eStartsContext as context,reviewedU7d8eStartsPolicy as policy,measureReviewedU7d8eStartsFrame as measure,commitReviewedU7d8eStartsCaps as commit,REVIEWED_U7D8E_STARTS_SOURCE as SOURCE}from'./hanja-stroke-start-caps-u7d8e.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
function tree(P:any,p:number){
 const writes:{id:string;key:string;value:string|null}[]=[],reads:string[]=[];let readHook:((stage:string)=>void)|null=null,writeHook:((n:any,key:string)=>void)|null=null
 const view:any={getComputedStyle:(n:any)=>({transform:n.cssTransform??'none',getPropertyValue:(k:string)=>n.css?.[k]??''})},doc:any={defaultView:view};view.document=doc
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,isConnected:true,parentElement:parent,ownerSVGElement:null as any,attrs:{...attrs},get id(){return this.attrs.id??''},getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=v;writes.push({id:this.id,key:k,value:v});writeHook?.(this,k)},removeAttribute(k:string){delete this.attrs[k];writes.push({id:this.id,key:k,value:null});writeHook?.(this,k)}})
 const id='u7d8e-starts-'+P.pen,svg:any=node('svg',null),target:any=node('g',svg,{'data-stroke-start-gate':P.id,'data-stroke-reveal-progress':String(p)}),defs:any=node('defs',target)
 const measurement:any=node('path',defs,{id:id+'-u7d8e-starts-measure','data-growing-owner':id,'data-u7d8e-starts-measurement':'true',d:P.segment.revealPath})
 const mask:any=node('mask',defs,{id:id+'-u7d8e-starts-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'})
 const guide:any=node('path',mask,{id:id+'-u7d8e-starts-guide','data-growing-owner':id,d:P.segment.revealPath,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter','stroke-dasharray':'0 2','stroke-dashoffset':'0',stroke:'white',fill:'none'})
 const startCap:any=node('circle',mask,{id:id+'-start','data-growing-owner':id,fill:'white',stroke:'none',cx:'0',cy:'0',r:'0'}),endCap:any=node('circle',mask,{id:id+'-end','data-growing-owner':id,fill:'white',stroke:'none',cx:'0',cy:'0',r:'0'})
 const ink:any=node('path',target,{id:id+'-ink','data-growing-owner':id,d:P.segment.outline,mask:'url(#'+mask.id+')',stroke:'none','fill-rule':'nonzero',visibility:'hidden'})
 for(const n of[target,defs,measurement,mask,guide,startCap,endCap,ink])n.ownerSVGElement=svg
 const nums=P.segment.revealPath.match(/-?\d+(?:\.\d+)?/g).map(Number),L=P.pen===12?70:42
 measurement.getTotalLength=()=>{reads.push('L');readHook?.('L');return L}
 measurement.getPointAtLength=(d:number)=>{reads.push('q');readHook?.('q');return{x:nums[0]+(nums.at(-2)-nums[0])*d/L,y:nums[1]+(nums.at(-1)-nums[1])*d/L}}
 return{nodes:{measurement,guide,startCap,endCap,ink},id,svg,target,defs,measurement,mask,guide,startCap,endCap,ink,view,doc,L,writes,reads,onRead:(f:typeof readHook)=>{readHook=f},onWrite:(f:typeof writeHook)=>{writeHook=f},setProgress:(p:number)=>{target.attrs['data-stroke-reveal-progress']=String(p)}}
}
test('綎 three stored-own starts DOM adapter tail FIRST: no math regeneration',()=>{
 for(const[p,h]of Object.entries(SOURCE.inputSHA256))assert.equal(sha(read(p)),h,p)
 const cache=json(SOURCE.fixture).u7d8e,full=json(SOURCE.sourceFile),proof=read('docs/hanja-u7d8e-start-geometry-proof-2026-10-21/README.md').toString(),hold=json('docs/hanja-source-native-hold-u7d8e-startcaps-terminal-2026-10-21/hold.json'),prior=json('docs/hanja-renderer-native-review-u7d8e-source-clip-growing-starts-2026-10-21/review.json')
 assert.equal(sha(JSON.stringify(cache.strokes)),SOURCE.geometrySHA256);assert.deepEqual(Object.keys(full).sort(),SOURCE.actualFull5Keys.slice().sort());assert.equal(SOURCE.identity.sourceProofFileSha256,SOURCE.sourceSHA256);assert.equal(cache.strokes.length,13);assert.equal(cache.strokes.flat().length,15)
 const C=context(cache.strokes)!;assert(C);assert.equal(policy({...C},0,0),null)
 const previous=read('docs/hanja-renderer-source-clip-growing-starts-u7d8e-experiment-2026-10-21/render.mjs').toString(),specs=JSON.parse(previous.match(/const SPECS=(\[.*\]);/)![1])
 let guards=0,targets=0
 for(const pen of[1,2,12]){
  const P=policy(C,pen-1,0)!;assert(P);targets++;assert.deepEqual(P.segment,cache.strokes[pen-1][0]);assert.equal(policy(C,pen-1,1),null)
  const spec=specs.find((s:any)=>s.pen===pen&&s.mask===1);assert(spec);assert.equal(sha(JSON.stringify(P.segment)),spec.maskSHA256);assert.equal(P.segment.revealPath,spec.path);assert.equal(P.segment.weight,spec.weight);assert.equal(P.segment.revealWidth,spec.width)
  assert(hold.nativeObservations.starts.some((s:any)=>s.pen===pen&&s.mask===1&&s.result==='finite-cap FAIL'));assert(prior.observations.fiveGrowingTargets.keys.includes(pen+'m1'))
  if(pen===12){assert.equal(P.certificate.kind,'MLQ-first-straight-prefix');assert.equal(P.certificate.firstLine,'513/40');assert.equal(P.certificate.firstLineNumeric,12.825);assert(proof.includes('| 12m1 | MLQ-first-H | 513/40 |'));assert.equal(P.certificate.notLaterCornerProof,true)}
  else{assert.equal(P.certificate.kind,'fixed-Q-initial');assert.deepEqual(spec.T,[1,2]);assert.deepEqual(spec.K,[1,100]);assert.equal(P.certificate.T,'1/2');assert.equal(P.certificate.K,'1/100');for(const k of['halfSpeedSquaredLower','chordSquaredMinus49','curvatureMargin','cosLowerMinus7K','cross','cosLower'])assert(proof.includes(P.certificate[k] as string));assert.equal(P.certificate.storedOwnProof,true)}
  for(const p of[1e-6,.95]){
   const T=tree(P,p),out=commit(P,P.segment,p,T.id,T.nodes);assert.equal(out.status,'visible');const F=out.frame!;assert.deepEqual(T.reads,['L','q','L']);assert.equal(F.L,T.L);assert.equal(F.d,p*T.L);assert.equal(F.rho,Math.min(7,p*T.L));assert.equal(T.guide.attrs['stroke-dasharray'],p+' 2');assert.equal(T.startCap.attrs.r,String(F.rho));assert.equal(T.endCap.attrs.r,String(F.rho));assert.equal(T.startCap.attrs.cx,String(F.q0[0]));assert.equal(T.startCap.attrs.cy,String(F.q0[1]));assert.equal(T.endCap.attrs.cx,String(F.point.x));assert.equal(T.endCap.attrs.cy,String(F.point.y));assert.equal(T.ink.attrs['data-growing-distance'],String(F.d));assert.equal(T.writes.at(-1)!.key,'visibility');assert.equal(T.writes.at(-1)!.value,'visible');assert.equal(T.writes.at(-1)!.id,T.ink.id);out.cleanup();assert.equal(T.ink.attrs.visibility,'hidden');assert.equal(T.guide.attrs['stroke-dasharray'],'0 2');assert.equal(T.startCap.attrs.r,'0');assert.equal(T.endCap.attrs.r,'0');assert.equal(T.ink.attrs.d,P.segment.outline)
  }
  const E=tree(P,0);assert.equal(commit(P,P.segment,0,E.id,E.nodes).status,'empty');assert.equal(E.reads.length,0);assert.equal(E.ink.attrs.visibility,'hidden');E.setProgress(1);assert.equal(commit(P,P.segment,1,E.id,E.nodes).status,'complete');assert.equal(E.reads.length,0);assert.equal(E.ink.attrs.visibility,'hidden','full-round complete path is a separate component branch');E.setProgress(1e-6);assert.equal(commit(P,P.segment,1e-6,E.id,E.nodes).status,'visible')
  const p=.2
  for(const mutate of[(t:any)=>t.measurement.attrs.d+=' ',(t:any)=>t.measurement.attrs.pathLength='1',(t:any)=>t.target.attrs['data-stroke-reveal-progress']='.3',(t:any)=>t.measurement.ownerDocument={},(t:any)=>t.measurement.isConnected=false,(t:any)=>t.defs.attrs.transform='translate(1)',(t:any)=>t.svg.cssTransform='scale(2)',(t:any)=>t.target.css={rotate:'1deg'},(t:any)=>t.view.document={},(t:any)=>t.guide.attrs['stroke-linecap']='round',(t:any)=>t.guide.attrs['stroke-width']='15',(t:any)=>t.ink.attrs.d+=' ',(t:any)=>t.startCap.attrs.fill='black',(t:any)=>t.startCap.parentElement=t.defs]){
   const bad=tree(P,p);mutate(bad);assert.equal(commit(P,P.segment,p,bad.id,bad.nodes).status,'hidden');assert.equal(bad.ink.attrs.visibility,'hidden');assert.equal(bad.startCap.attrs.r,'0');assert.equal(bad.endCap.attrs.r,'0');guards++
  }
  for(const stage of['L','q']){const bad=tree(P,p);bad.onRead(s=>{if(s===stage)bad.target.attrs['data-stroke-reveal-progress']='.3'});assert.equal(commit(P,P.segment,p,bad.id,bad.nodes).status,'hidden');guards++}
  const changing=tree(P,p);let n=0;changing.measurement.getTotalLength=()=>++n===1?changing.L:changing.L+1;assert.equal(commit(P,P.segment,p,changing.id,changing.nodes).status,'hidden');guards++
  const nan=tree(P,p);nan.measurement.getPointAtLength=()=>({x:NaN,y:0});assert.equal(commit(P,P.segment,p,nan.id,nan.nodes).status,'hidden');guards++
  const late=tree(P,p);late.onWrite((node,k)=>{if(node===late.ink&&k==='data-growing-distance')late.target.attrs['data-stroke-reveal-progress']='.3'});assert.equal(commit(P,P.segment,p,late.id,late.nodes).status,'hidden');guards++
  const alias=tree(P,p);assert.equal(commit(P,P.segment,p,alias.id,{...alias.nodes,endCap:alias.startCap}).status,'hidden');guards++
  for(const badPolicy of[{...P},{...P,certificate:{}}]){const bad=tree(P,p);assert.equal(commit(badPolicy as any,P.segment,p,bad.id,bad.nodes).status,'hidden');assert.equal(bad.reads.length,0);guards++}
  const badSegment=clone(P.segment);badSegment.weight++;const bad=tree(P,p);assert.equal(commit(P,badSegment,p,bad.id,bad.nodes).status,'hidden');assert.equal(bad.reads.length,0);guards++
  const narrow=tree(P,p);narrow.measurement.getTotalLength=()=>pen===12?12.825:7;assert.throws(()=>measure(P,P.segment,p,narrow.measurement));guards++
 }
 const badWhole=clone(cache.strokes);badWhole[10][0].weight++;assert.equal(context(badWhole),null);assert.equal(SOURCE.nativeApproval,false);assert.equal(SOURCE.mathGenerationRuns,0);assert.equal(SOURCE.sourcePartition,false);assert.equal(SOURCE.priorROOTObservationsHistoricalOnly,true)
 console.log(JSON.stringify({glyph:'綎',targets,guardCases:guards,storedOwnMathOnly:true,originalFiniteCapHOLDPreserved:true,oldSourceCorrectionHistorical:true,oldMathLoopsRepeated:0,SSR:0,currentActualNative:false,sourceProjection:0,engine:0,sharedEdits:0}))
})
