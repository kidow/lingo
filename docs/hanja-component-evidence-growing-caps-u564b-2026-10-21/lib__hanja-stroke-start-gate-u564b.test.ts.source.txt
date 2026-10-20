import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import ts from 'typescript'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU564bContext,reviewedU564bPolicy,measureReviewedU564bCapsFrame,commitReviewedU564bCaps,type ReviewedU564bNodes} from './hanja-stroke-start-gate-u564b.ts'
// All DOM lengths below are mock inputs, not browser/native evidence.
const strokes=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-hq-left-reorder-u564b-source-experiment-2026-10-21/fixtures.json',import.meta.url),'utf8'))['u564b'].strokes as HanjaOutlineStrokes
const targets=[[8,1]] as const
const mockLengths=[100]
const context=reviewedU564bContext(strokes)
function u564bPolicyAt(i:number){const[p,m]=targets[i],policy=reviewedU564bPolicy(context,p,m);assert(policy);return policy}
const clone=()=>JSON.parse(JSON.stringify(strokes)) as HanjaOutlineStrokes
function fakeU564b(i:number,id='u564b-'+i){
  const policy=u564bPolicyAt(i),segment=policy.segment,q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number),L=mockLengths[i],events:string[]=[]
  const document={defaultView:null as unknown},view={document,getComputedStyle:(n:Element)=>{const x=n as unknown as {cssTransform:string;cssTranslate:string};return{transform:x.cssTransform,getPropertyValue:(key:string)=>key==='translate'?x.cssTranslate:'none'}}};document.defaultView=view
  let owner:SVGSVGElement
  const node=(name:string,attrs:Record<string,string>)=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:document,parentElement:null as unknown,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},getAttribute(key:string){return this.attrs[key]??null},setAttribute(key:string,value:string){this.attrs[key]=value;events.push(name+':'+key+'='+value)},removeAttribute(key:string){delete this.attrs[key]}})
  const svg=node('svg',{});owner=svg as unknown as SVGSVGElement
  const group=node('g',{}),target=node('g',{'data-stroke-start-gate':policy.id}),defs=node('defs',{}),mask=node('mask',{id:id+'-u564b-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'})
  group.parentElement=svg;target.parentElement=group;defs.parentElement=target;mask.parentElement=defs
  let pointHook:((d:number)=>{x:number;y:number})|null=null,lengthHook:(()=>void)|null=null,length=L
  let reads=0,pointReads=0
  const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u564b-measurement':'true',id:id+'-u564b-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('measure:length');lengthHook?.();return length},getPointAtLength(d:number){pointReads++;events.push('measure:point');return pointHook?pointHook(d):{x:q0[0]+d/L,y:q0[1]+d/L}}})
  const guide=Object.assign(node('path',{'data-growing-owner':id,id:id+'-u564b-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),{getTotalLength(){throw Error('dash is not measurement guide')},getPointAtLength(){throw Error('dash is not measurement guide')}})
  const startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('ink',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u564b-growing)',visibility:'hidden'})
  measurement.parentElement=defs;guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
  const nodes={measurement,guide,startCap,endCap,ink} as unknown as ReviewedU564bNodes
  return{policy,segment,q0,L,id,owner,svg,document,view,group,target,defs,mask,measurement,guide,startCap,endCap,ink,nodes,events,counts:()=>({reads,pointReads}),pointHook:(fn:typeof pointHook)=>{pointHook=fn},lengthHook:(fn:typeof lengthHook)=>{lengthHook=fn},setLength:(n:number)=>{length=n}}
}

test('噋 fixed whole own Q9 certificate and strict target fields',()=>{
 assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),'4a57bb3f1bde763a5d97f895413748f2d1e05a528650e000e365c515c0ddd2e6')
 assert(context);assert.equal(reviewedU564bPolicy({id:'u564b-q9'},0,0),null)
 let targetCount=0
 for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++){
  const policy=reviewedU564bPolicy(context,p,m),i=targets.findIndex(([x,y])=>x===p&&y===m)
  assert.equal(!!policy,i>=0)
  const extra=clone();Object.assign(extra[p][m],{extra:true});assert.equal(reviewedU564bContext(extra),null)
  for(const key of Object.keys(strokes[p][m])){const changed=clone(),s=changed[p][m]as unknown as Record<string,unknown>;s[key]=key==='bounds'?[0,0,1,1]:typeof s[key]==='number'?Number(s[key])+1:String(s[key])+' ';assert.notDeepEqual(changed,strokes);assert.equal(reviewedU564bContext(changed),null)}
  if(!policy)continue;targetCount++
  assert(Object.isFrozen(policy));assert(Object.isFrozen(policy.segment));assert(Object.isFrozen(policy.segment.bounds));assert(Object.isFrozen(policy.certificate));assert.equal(policy.certificate.initialArcMax,7);assert.equal(policy.certificate.notRasterProof,true)
  assert.throws(()=>{policy.segment.weight+=1});assert.throws(()=>{(policy.segment.bounds as number[])[0]+=1})
  for(const local of[.000001,.03,.5,.95,.9999]){
   const f=fakeU564b(i),actual=measureReviewedU564bCapsFrame(policy,policy.segment,local,f.nodes.measurement),point=actual.point
   assert.equal(actual.d,local*mockLengths[i]);assert.equal(actual.rho,Math.min(7,actual.d));assert.deepEqual(actual.q0,f.q0);assert.deepEqual(actual.point,point);assert.equal(actual.progress,local);assert.deepEqual(f.counts(),{reads:1,pointReads:1})
  }
 }
 assert.equal(targetCount,1)

})
test('噋 distance metadata matches same-frame caps and clears on cleanup',()=>{
 for(let i=0;i<targets.length;i++){
  const f=fakeU564b(i),result=commitReviewedU564bCaps(f.policy,f.segment,.03,f.id,f.nodes)
  assert.equal(result.status,'visible');assert(result.frame);const frame=result.frame
  assert.equal(f.ink.getAttribute('data-growing-distance'),String(frame.d));assert.equal(frame.d,frame.progress*frame.L)
  assert.equal(f.ink.getAttribute('data-growing-radius'),String(Math.min(7,frame.d)))
  assert.equal(f.startCap.getAttribute('r'),String(frame.rho));assert.equal(f.endCap.getAttribute('r'),String(frame.rho))
  assert.equal(f.ink.getAttribute('data-growing-end-x'),String(frame.point.x));assert.equal(f.ink.getAttribute('data-growing-end-y'),String(frame.point.y))
  assert.equal(f.endCap.getAttribute('cx'),f.ink.getAttribute('data-growing-end-x'));assert.equal(f.endCap.getAttribute('cy'),f.ink.getAttribute('data-growing-end-y'))
  assert.equal(f.ink.getAttribute('data-growing-canstance'),null);assert.deepEqual(f.counts(),{reads:1,pointReads:1})
  result.cleanup();assert.equal(f.ink.getAttribute('visibility'),'hidden');assert.equal(f.guide.getAttribute('stroke-dasharray'),'0 2')
  for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])assert.equal(f.ink.getAttribute(key),null)
  assert.equal(f.startCap.getAttribute('r'),'0');assert.equal(f.endCap.getAttribute('r'),'0')
 }
})
test('噋 enumerable source fields reject inherited and nonenumerable extra-key swaps',()=>{
 let cases=0
 for(const mode of['inherited','nonenumerable']as const){
  const x=clone(),segment=x[8][1],expectedKeys=Object.keys(segment).length,weight=segment.weight
  if(mode==='inherited'){delete (segment as Partial<typeof segment>).weight;Object.setPrototypeOf(segment,{weight})}else Object.defineProperty(segment,'weight',{value:weight,enumerable:false,writable:true,configurable:true})
  Object.assign(segment,{extra:true});assert.equal(Object.keys(segment).length,expectedKeys);assert.equal(segment.weight,weight)
  assert.equal(reviewedU564bContext(x),null)
  const f=fakeU564b(0);assert.equal(commitReviewedU564bCaps(f.policy,segment,.03,f.id,f.nodes).status,'hidden');assert.deepEqual(f.counts(),{reads:0,pointReads:0});cases++
 }
 assert.equal(cases,2)
})
test('噋 sparse arrays and inherited hole fillers reject at every fixed index',()=>{
 let contextRejected=0,publicRejected=0
 for(let p=0;p<strokes.length;p++){
  for(const inherited of[false,true]){const x=clone(),held=x[p];delete x[p];if(inherited)Object.setPrototypeOf(x,Object.assign(Object.create(Array.prototype),{[p]:held}));assert.equal(reviewedU564bContext(x),null);contextRejected++}
  for(let m=0;m<strokes[p].length;m++){
   for(const inherited of[false,true]){const x=clone(),held=x[p][m];delete x[p][m];if(inherited)Object.setPrototypeOf(x[p],Object.assign(Object.create(Array.prototype),{[m]:held}));assert.equal(reviewedU564bContext(x),null);contextRejected++}
   for(let b=0;b<4;b++)for(const inherited of[false,true]){const x=clone(),bounds=x[p][m].bounds as number[],held=bounds[b];delete bounds[b];if(inherited)Object.setPrototypeOf(bounds,Object.assign(Object.create(Array.prototype),{[b]:held}));assert.equal(reviewedU564bContext(x),null);contextRejected++}
  }
 }
 for(let i=0;i<targets.length;i++)for(let b=0;b<4;b++)for(const inherited of[false,true]){
  const [p,m]=targets[i],s=clone()[p][m],bounds=s.bounds as number[],held=bounds[b];delete bounds[b];if(inherited)Object.setPrototypeOf(bounds,Object.assign(Object.create(Array.prototype),{[b]:held}));const f=fakeU564b(i);assert.equal(commitReviewedU564bCaps(f.policy,s,.03,f.id,f.nodes).status,'hidden');assert.deepEqual(f.counts(),{reads:0,pointReads:0});publicRejected++
 }
 assert.equal(contextRejected,200);assert.equal(publicRejected,8)
})
test('噋 same-frame source UA path and coordinate tampering fail closed',()=>{
 let rejected=0
 for(let i=0;i<targets.length;i++){
  const f=fakeU564b(i),ok=commitReviewedU564bCaps(f.policy,f.segment,.03,f.id,f.nodes)
  assert.equal(ok.status,'visible');assert(ok.frame);assert.equal(f.events.at(-1),'ink:visibility=visible');assert.deepEqual(f.counts(),{reads:1,pointReads:1});assert.equal(f.startCap.attrs.r,String(ok.frame.rho));ok.cleanup();assert.equal(f.ink.attrs.visibility,'hidden')
  for(const p of[0,1]){const z=fakeU564b(i),r=commitReviewedU564bCaps(z.policy,z.segment,p,z.id,z.nodes);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(z.counts(),{reads:0,pointReads:0})}
  const mutations:Array<(x:ReturnType<typeof fakeU564b>)=>void>=[x=>{x.measurement.attrs.pathLength='1'},x=>{x.guide.attrs.pathLength='2'},x=>{x.guide.attrs.d+=' '},x=>{x.measurement.attrs.d+=' '},x=>{x.guide.attrs['stroke-width']='13'},x=>{x.guide.attrs['stroke-linecap']='round'},x=>{x.ink.attrs.mask='url(#wrong)'},x=>{x.mask.attrs.maskUnits='objectBoundingBox'},x=>{x.setLength(NaN)},x=>{x.setLength(6)},x=>{x.pointHook(()=>({x:NaN,y:0}))}]
  for(const name of['measurement','guide','startCap','endCap','ink','mask','defs','target','group','svg']as const)mutations.push(x=>{x[name].attrs.transform='translate(10 0)'},x=>{x[name].cssTransform='matrix(1,0,0,1,10,0)'},x=>{x[name].cssTranslate='10px'},x=>{x[name].ownerDocument={}as typeof x.document},x=>{x[name].parentElement={}})
  for(const phase of['before','length','point']as const)for(const[index,mutate]of mutations.entries()){
   if(phase==='point'&&index>=8&&index<=10)continue // Changing a future mock length/hook does not invalidate the already-read frame.
   const x=fakeU564b(i);if(phase==='before')mutate(x);if(phase==='length')x.lengthHook(()=>mutate(x));if(phase==='point')x.pointHook(d=>{mutate(x);return{x:x.q0[0]+d/x.L,y:x.q0[1]+d/x.L}})
   const result=commitReviewedU564bCaps(x.policy,x.segment,.03,x.id,x.nodes);assert.equal(result.status,'hidden');assert.equal(x.ink.attrs.visibility,'hidden');assert.equal(x.startCap.attrs.r,'0');assert.equal(x.endCap.attrs.r,'0');assert.equal(x.guide.attrs['stroke-dasharray'],'0 2');rejected++
  }
  for(const p of[NaN,Infinity,-1,1.01]){const x=fakeU564b(i);assert.equal(commitReviewedU564bCaps(x.policy,x.segment,p,x.id,x.nodes).status,'hidden');assert.deepEqual(x.counts(),{reads:0,pointReads:0})}
  const forged=fakeU564b(i);assert.equal(commitReviewedU564bCaps({...forged.policy},forged.segment,.03,forged.id,forged.nodes).status,'hidden')
 }
 assert.equal(rejected,180)
})
const previousComponentSHA='55c2a2379402200a1e1571e471b10095beed1d2f3f6d618c09e80796d2f76af7'
function priorComponent(source:string){
 const addImport="import { reviewedU564bContext, reviewedU564bPolicy, commitReviewedU564bCaps, type ReviewedU564bPolicy } from '@/lib/hanja-stroke-start-gate-u564b'\n",addContext="  const u564bContext = reviewedU564bContext(strokes)\n",addBranch="        const u564bPolicy = reviewedU564bPolicy(u564bContext, stroke, index)\n        if (u564bPolicy) return <U564bCapsOutline key={index} policy={u564bPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />\n"
 for(const token of[addImport,addContext,addBranch])assert.equal(source.split(token).length,2)
 const start=source.indexOf('/** 噋 HQ9 원9m2만'),end=source.indexOf('/** 梲 HQ6 원6m2만',start)
 assert(start>0&&end>start)
 const old=(source.slice(0,start)+source.slice(end)).replace(addImport,'').replace(addContext,'').replace(addBranch,'')
 assert.equal(createHash('sha256').update(old).digest('hex'),previousComponentSHA)
 return old
}
let componentPromise:Promise<any>|undefined
async function actualU564bComponent(){
 if(componentPromise)return componentPromise
 componentPromise=(async()=>{
 const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),prior=priorComponent(source),timing=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8').split('\n')
 const timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>{const line=timing.find(l=>l.startsWith(prefix));assert(line);return line}).join('\n')).toString('base64')
 async function load(input:string,extra:string){
  const marker='const [elapsed, setElapsed] = useState(0)';assert(input.includes(marker))
  const prepared=input.replace(marker,'const [elapsed, setElapsed] = useState(Number((globalThis as typeof globalThis & {__u564bTestElapsed?:number}).__u564bTestElapsed??0))')+extra
  let js=ts.transpileModule(prepared,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
  js=js.replace(/(['"])@\/lib\/([a-z0-9-]+)\1/g,(_all,_quote,name)=>JSON.stringify(name==='hanja-strokes'?timingURL:new URL('./'+name+'.ts',import.meta.url).href))
  for(const name of['react/jsx-runtime','react'])js=js.replaceAll("'"+name+"'",JSON.stringify(import.meta.resolve(name))).replaceAll('"'+name+'"',JSON.stringify(import.meta.resolve(name)))
  assert(!js.includes('@/lib/'));return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
 }
 const current=await load(source,'\nexport {U564bCapsOutline}\n'),old=await load(prior,'')
 return{...current,PriorStrokeOutlines:old.StrokeOutlines,timing:await import(timingURL)}
 })();return componentPromise
}
test('噋 actual component SSR hidden partials and exact full-round whole prefixes',async()=>{
 const{U564bCapsOutline,StrokeOutlines}=await actualU564bComponent()
 for(let i=0;i<targets.length;i++){
  const policy=u564bPolicyAt(i),render=(progress:number)=>renderToStaticMarkup(createElement('svg',null,createElement(U564bCapsOutline,{policy,segment:policy.segment,progress,clipId:'u564b-ssr-'+i})))
  const zero=render(0);assert(!zero.includes('d="'+policy.segment.outline+'"'));assert(zero.includes('data-u564b-measurement="true"'))
  for(const p of[.000001,.5,.99999999]){const partial=render(p);assert(partial.includes('visibility="hidden"'));assert(partial.includes('d="'+policy.segment.outline+'" mask="url(#u564b-ssr-'+i+'-u564b-growing)"'));assert(!partial.includes('data-growing-full-round'))}
  const full=render(1);assert(full.includes('data-growing-full-round="true"'));assert(full.includes('d="'+policy.segment.outline+'" mask="url(#u564b-ssr-'+i+')"'));assert(full.includes('stroke-linecap="round"'));assert(full.includes('stroke-linejoin="miter"'))
 }
 for(let i=0;i<targets.length;i++){const c=u564bPolicyAt(i).certificate;assert.equal(c.syntax,'Q');assert.equal(c.parameterBound,1/2);assert.equal(c.curvatureBound,1/50);assert.equal(c.notPolygonConnectivityProof,true);assert.equal(c.notFullSweepProof,true);assert.equal(c.bounds.tUpper,'1/2');assert.equal(c.bounds.curvatureUpper,'1/50')}
 delete (globalThis as typeof globalThis & {__u564bTestElapsed?:number}).__u564bTestElapsed
 const whole=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'idle',manual:null,count:15})))
 assert.equal((whole.match(/data-stroke-reveal-policy="growing-u564b-caps"/g)||[]).length,1);assert.equal((whole.match(/data-growing-full-round="true"/g)||[]).length,1)
 const component=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8');priorComponent(component)
 assert(component.includes('Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN'))
 const prefix=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'paused',manual:true,count:10})))
 assert.equal((prefix.match(/data-growing-full-round="true"/g)||[]).length,1)
 const before=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'paused',manual:true,count:8})))
 assert.equal((before.match(/data-growing-full-round="true"/g)||[]).length,0)

})
test('噋 public JSON segment accepts exact fields and rejects forged segments',()=>{
 for(let i=0;i<targets.length;i++){
  const [p,m]=targets[i],x=fakeU564b(i),publicSegment=strokes[p][m]
  assert.notEqual(publicSegment,x.policy.segment)
  const result=commitReviewedU564bCaps(x.policy,publicSegment,.03,x.id,x.nodes)
  assert.equal(result.status,'visible');assert.deepEqual(x.counts(),{reads:1,pointReads:1});result.cleanup()
  for(const key of Object.keys(publicSegment)){
   const s=JSON.parse(JSON.stringify(publicSegment)) as typeof publicSegment,record=s as unknown as Record<string,unknown>
   record[key]=key==='bounds'?[0,0,1,1]:typeof record[key]==='number'?Number(record[key])+1:String(record[key])+' '
   const y=fakeU564b(i);assert.equal(commitReviewedU564bCaps(y.policy,s,.03,y.id,y.nodes).status,'hidden');assert.deepEqual(y.counts(),{reads:0,pointReads:0})
  }
 }
})

test('噋 own Q9 certificate with strict actual full5 and selected body3 identity5',()=>{
 const f=readFileSync(new URL('../docs/hanja-source-independent-hq-left-reorder-u564b-source-experiment-2026-10-21/fixtures.json',import.meta.url)),full=readFileSync(new URL('../docs/hanja-goal-glyphwiki-batch970-2026-10-13/engine-proof.json',import.meta.url)),body=readFileSync(new URL('../docs/hanja-goal-glyphwiki-batch970-2026-10-13/engine-whole-u564b.json',import.meta.url));assert.equal(createHash('sha256').update(f).digest('hex'),"96579c520dd960183397e5165badcf3d05a038dabf36b46faa024fa8ccc5fcb5");assert.equal(createHash('sha256').update(full).digest('hex'),"1fc94a42491373532b26a978d70943bd9e23e3d4d882e0eedfb143587ec22110");assert.equal(createHash('sha256').update(body).digest('hex'),"9e468c43ae57c61254b5ce92073ccf53e8d86c1c6c0ab254853a7059aa1c2410");const p=JSON.parse(full.toString()),b=JSON.parse(body.toString());assert.deepEqual(Object.keys(p).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(Object.keys(b).sort(),['defaults','groups','trace']);for(const k of['defaults','groups','trace'])assert.deepEqual(p[k],b[k]);const cfg=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-hq-left-reorder-u564b-source-experiment-2026-10-21/config.json',import.meta.url),'utf8')).targets.u564b;assert.deepEqual(cfg.identity,{"sourceRoot":"u564b","sourceProofFile":"engine-whole-u564b.json","sourceProofFileSha256":"9e468c43ae57c61254b5ce92073ccf53e8d86c1c6c0ab254853a7059aa1c2410","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"1fc94a42491373532b26a978d70943bd9e23e3d4d882e0eedfb143587ec22110"});assert.equal(Object.keys(cfg.identity).length,5);const c=u564bPolicyAt(0).certificate;assert.equal(c.parameterBound,1/2);assert.equal(c.curvatureBound,1/50);assert.equal(c.bounds.tUpper,'1/2');assert.equal(c.bounds.curvatureUpper,'1/50');assert.equal(c.bounds.rKUpper,'7/50');assert.equal(c.bounds.cosLower,'4951/5000');assert.equal(c.notPolygonConnectivityProof,true);assert.equal(c.notFullSweepProof,true);
})
function currentStroke(markup:string,pen:number){
 const token='<g data-outline-stroke="'+pen+'">',start=markup.indexOf(token);assert(start>=0)
 const tags=/<\/?g\b[^>]*>/g;tags.lastIndex=start;let depth=0,match
 while((match=tags.exec(markup))){depth+=match[0].startsWith('</')?-1:1;if(depth===0)return markup.slice(start,tags.lastIndex)}
 throw Error('missing exact stroke closing group')
}
test('噋 actual component ordinary14 strokes preserve prior subtree output at nine local samples',async()=>{
 const{StrokeOutlines,PriorStrokeOutlines,timing}=await actualU564bComponent(),state=globalThis as typeof globalThis & {__u564bTestElapsed?:number}
 let pairs=0
 try{for(let pen=1;pen<=15;pen++){if(pen===9)continue;for(const p of[0,.125,.25,.375,.5,.625,.75,.875,1]){
  state.__u564bTestElapsed=(pen-1)*(timing.STROKE_DURATION+timing.STROKE_GAP)+p*timing.STROKE_DURATION
  const props={strokes,clock:{current:[]},phase:'playing' as const,manual:false,count:0},next=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,props))),old=renderToStaticMarkup(createElement('svg',null,createElement(PriorStrokeOutlines,props)))
  assert.equal(currentStroke(next,pen),currentStroke(old,pen),'ordinary pen '+pen+' p '+p);pairs++
 }}}finally{delete state.__u564bTestElapsed}
 assert.equal(pairs,126)
})
