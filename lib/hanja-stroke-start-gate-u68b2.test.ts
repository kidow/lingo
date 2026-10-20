import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import ts from 'typescript'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU68b2Context,reviewedU68b2Policy,measureReviewedU68b2CapsFrame,commitReviewedU68b2Caps,type ReviewedU68b2Nodes} from './hanja-stroke-start-gate-u68b2.ts'
// All DOM lengths below are mock inputs, not browser/native evidence.
const strokes=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-hq-up-u68b2-source-experiment-2026-10-21/fixtures.json',import.meta.url),'utf8'))['u68b2'].strokes as HanjaOutlineStrokes
const targets=[[5,1]] as const
const mockLengths=[100]
const context=reviewedU68b2Context(strokes)
function u68b2PolicyAt(i:number){const[p,m]=targets[i],policy=reviewedU68b2Policy(context,p,m);assert(policy);return policy}
const clone=()=>JSON.parse(JSON.stringify(strokes)) as HanjaOutlineStrokes
function fakeU68b2(i:number,id='u68b2-'+i){
  const policy=u68b2PolicyAt(i),segment=policy.segment,q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number),L=mockLengths[i],events:string[]=[]
  const document={defaultView:null as unknown},view={document,getComputedStyle:(n:Element)=>{const x=n as unknown as {cssTransform:string;cssTranslate:string};return{transform:x.cssTransform,getPropertyValue:(key:string)=>key==='translate'?x.cssTranslate:'none'}}};document.defaultView=view
  let owner:SVGSVGElement
  const node=(name:string,attrs:Record<string,string>)=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:document,parentElement:null as unknown,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},getAttribute(key:string){return this.attrs[key]??null},setAttribute(key:string,value:string){this.attrs[key]=value;events.push(name+':'+key+'='+value)},removeAttribute(key:string){delete this.attrs[key]}})
  const svg=node('svg',{});owner=svg as unknown as SVGSVGElement
  const group=node('g',{}),target=node('g',{'data-stroke-start-gate':policy.id}),defs=node('defs',{}),mask=node('mask',{id:id+'-u68b2-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'})
  group.parentElement=svg;target.parentElement=group;defs.parentElement=target;mask.parentElement=defs
  let pointHook:((d:number)=>{x:number;y:number})|null=null,lengthHook:(()=>void)|null=null,length=L
  let reads=0,pointReads=0
  const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u68b2-measurement':'true',id:id+'-u68b2-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('measure:length');lengthHook?.();return length},getPointAtLength(d:number){pointReads++;events.push('measure:point');return pointHook?pointHook(d):{x:q0[0]+d/L,y:q0[1]+d/L}}})
  const guide=Object.assign(node('path',{'data-growing-owner':id,id:id+'-u68b2-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),{getTotalLength(){throw Error('dash is not measurement guide')},getPointAtLength(){throw Error('dash is not measurement guide')}})
  const startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('ink',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u68b2-growing)',visibility:'hidden'})
  measurement.parentElement=defs;guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
  const nodes={measurement,guide,startCap,endCap,ink} as unknown as ReviewedU68b2Nodes
  return{policy,segment,q0,L,id,owner,svg,document,view,group,target,defs,mask,measurement,guide,startCap,endCap,ink,nodes,events,counts:()=>({reads,pointReads}),pointHook:(fn:typeof pointHook)=>{pointHook=fn},lengthHook:(fn:typeof lengthHook)=>{lengthHook=fn},setLength:(n:number)=>{length=n}}
}

test('梲 fixed whole own Q6 certificate and strict target fields',()=>{
 assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),'093cedfda645fab3b5f9eddd1e343516ca5286065030b7bc31563ae150cd73c3')
 assert(context);assert.equal(reviewedU68b2Policy({id:'u68b2-hq6'},0,0),null)
 let targetCount=0
 for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++){
  const policy=reviewedU68b2Policy(context,p,m),i=targets.findIndex(([x,y])=>x===p&&y===m)
  assert.equal(!!policy,i>=0)
  const extra=clone();Object.assign(extra[p][m],{extra:true});assert.equal(reviewedU68b2Context(extra),null)
  for(const key of Object.keys(strokes[p][m])){const changed=clone(),s=changed[p][m]as unknown as Record<string,unknown>;s[key]=key==='bounds'?[0,0,1,1]:typeof s[key]==='number'?Number(s[key])+1:String(s[key])+' ';assert.notDeepEqual(changed,strokes);assert.equal(reviewedU68b2Context(changed),null)}
  if(!policy)continue;targetCount++
  assert(Object.isFrozen(policy));assert(Object.isFrozen(policy.segment));assert(Object.isFrozen(policy.segment.bounds));assert(Object.isFrozen(policy.certificate));assert.equal(policy.certificate.initialArcMax,7);assert.equal(policy.certificate.notRasterProof,true)
  assert.throws(()=>{policy.segment.weight+=1});assert.throws(()=>{(policy.segment.bounds as number[])[0]+=1})
  for(const local of[.000001,.03,.5,.95,.9999]){
   const f=fakeU68b2(i),actual=measureReviewedU68b2CapsFrame(policy,policy.segment,local,f.nodes.measurement),point=actual.point
   assert.equal(actual.d,local*mockLengths[i]);assert.equal(actual.rho,Math.min(7,actual.d));assert.deepEqual(actual.q0,f.q0);assert.deepEqual(actual.point,point);assert.equal(actual.progress,local);assert.deepEqual(f.counts(),{reads:1,pointReads:1})
  }
 }
 assert.equal(targetCount,1)

})
test('梲 distance metadata matches same-frame caps and clears on cleanup',()=>{
 for(let i=0;i<targets.length;i++){
  const f=fakeU68b2(i),result=commitReviewedU68b2Caps(f.policy,f.segment,.03,f.id,f.nodes)
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
test('梲 enumerable source fields reject inherited and nonenumerable extra-key swaps',()=>{
 let cases=0
 for(const mode of['inherited','nonenumerable']as const){
  const x=clone(),segment=x[5][1],expectedKeys=Object.keys(segment).length,weight=segment.weight
  if(mode==='inherited'){delete (segment as Partial<typeof segment>).weight;Object.setPrototypeOf(segment,{weight})}else Object.defineProperty(segment,'weight',{value:weight,enumerable:false,writable:true,configurable:true})
  Object.assign(segment,{extra:true});assert.equal(Object.keys(segment).length,expectedKeys);assert.equal(segment.weight,weight)
  assert.equal(reviewedU68b2Context(x),null)
  const f=fakeU68b2(0);assert.equal(commitReviewedU68b2Caps(f.policy,segment,.03,f.id,f.nodes).status,'hidden');assert.deepEqual(f.counts(),{reads:0,pointReads:0});cases++
 }
 assert.equal(cases,2)
})
test('梲 sparse arrays and inherited hole fillers reject at every fixed index',()=>{
 let contextRejected=0,publicRejected=0
 for(let p=0;p<strokes.length;p++){
  for(const inherited of[false,true]){const x=clone(),held=x[p];delete x[p];if(inherited)Object.setPrototypeOf(x,Object.assign(Object.create(Array.prototype),{[p]:held}));assert.equal(reviewedU68b2Context(x),null);contextRejected++}
  for(let m=0;m<strokes[p].length;m++){
   for(const inherited of[false,true]){const x=clone(),held=x[p][m];delete x[p][m];if(inherited)Object.setPrototypeOf(x[p],Object.assign(Object.create(Array.prototype),{[m]:held}));assert.equal(reviewedU68b2Context(x),null);contextRejected++}
   for(let b=0;b<4;b++)for(const inherited of[false,true]){const x=clone(),bounds=x[p][m].bounds as number[],held=bounds[b];delete bounds[b];if(inherited)Object.setPrototypeOf(bounds,Object.assign(Object.create(Array.prototype),{[b]:held}));assert.equal(reviewedU68b2Context(x),null);contextRejected++}
  }
 }
 for(let i=0;i<targets.length;i++)for(let b=0;b<4;b++)for(const inherited of[false,true]){
  const [p,m]=targets[i],s=clone()[p][m],bounds=s.bounds as number[],held=bounds[b];delete bounds[b];if(inherited)Object.setPrototypeOf(bounds,Object.assign(Object.create(Array.prototype),{[b]:held}));const f=fakeU68b2(i);assert.equal(commitReviewedU68b2Caps(f.policy,s,.03,f.id,f.nodes).status,'hidden');assert.deepEqual(f.counts(),{reads:0,pointReads:0});publicRejected++
 }
 assert.equal(contextRejected,152);assert.equal(publicRejected,8)
})
test('梲 same-frame source UA path and coordinate tampering fail closed',()=>{
 let rejected=0
 for(let i=0;i<targets.length;i++){
  const f=fakeU68b2(i),ok=commitReviewedU68b2Caps(f.policy,f.segment,.03,f.id,f.nodes)
  assert.equal(ok.status,'visible');assert(ok.frame);assert.equal(f.events.at(-1),'ink:visibility=visible');assert.deepEqual(f.counts(),{reads:1,pointReads:1});assert.equal(f.startCap.attrs.r,String(ok.frame.rho));ok.cleanup();assert.equal(f.ink.attrs.visibility,'hidden')
  for(const p of[0,1]){const z=fakeU68b2(i),r=commitReviewedU68b2Caps(z.policy,z.segment,p,z.id,z.nodes);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(z.counts(),{reads:0,pointReads:0})}
  const mutations:Array<(x:ReturnType<typeof fakeU68b2>)=>void>=[x=>{x.measurement.attrs.pathLength='1'},x=>{x.guide.attrs.pathLength='2'},x=>{x.guide.attrs.d+=' '},x=>{x.measurement.attrs.d+=' '},x=>{x.guide.attrs['stroke-width']='13'},x=>{x.guide.attrs['stroke-linecap']='round'},x=>{x.ink.attrs.mask='url(#wrong)'},x=>{x.mask.attrs.maskUnits='objectBoundingBox'},x=>{x.setLength(NaN)},x=>{x.setLength(6)},x=>{x.pointHook(()=>({x:NaN,y:0}))}]
  for(const name of['measurement','guide','startCap','endCap','ink','mask','defs','target','group','svg']as const)mutations.push(x=>{x[name].attrs.transform='translate(10 0)'},x=>{x[name].cssTransform='matrix(1,0,0,1,10,0)'},x=>{x[name].cssTranslate='10px'},x=>{x[name].ownerDocument={}as typeof x.document},x=>{x[name].parentElement={}})
  for(const phase of['before','length','point']as const)for(const[index,mutate]of mutations.entries()){
   if(phase==='point'&&index>=8&&index<=10)continue // Changing a future mock length/hook does not invalidate the already-read frame.
   const x=fakeU68b2(i);if(phase==='before')mutate(x);if(phase==='length')x.lengthHook(()=>mutate(x));if(phase==='point')x.pointHook(d=>{mutate(x);return{x:x.q0[0]+d/x.L,y:x.q0[1]+d/x.L}})
   const result=commitReviewedU68b2Caps(x.policy,x.segment,.03,x.id,x.nodes);assert.equal(result.status,'hidden');assert.equal(x.ink.attrs.visibility,'hidden');assert.equal(x.startCap.attrs.r,'0');assert.equal(x.endCap.attrs.r,'0');assert.equal(x.guide.attrs['stroke-dasharray'],'0 2');rejected++
  }
  for(const p of[NaN,Infinity,-1,1.01]){const x=fakeU68b2(i);assert.equal(commitReviewedU68b2Caps(x.policy,x.segment,p,x.id,x.nodes).status,'hidden');assert.deepEqual(x.counts(),{reads:0,pointReads:0})}
  const forged=fakeU68b2(i);assert.equal(commitReviewedU68b2Caps({...forged.policy},forged.segment,.03,forged.id,forged.nodes).status,'hidden')
 }
 assert.equal(rejected,180)
})
const previousComponentSHA='affbb7b5d118357728e0fdca81615dbe6650b85232f4a0ceec49e8c61b963483'
function priorComponent(source:string){
 const addImport="import { reviewedU68b2Context, reviewedU68b2Policy, commitReviewedU68b2Caps, type ReviewedU68b2Policy } from '@/lib/hanja-stroke-start-gate-u68b2'\n",addContext="  const u68b2Context = reviewedU68b2Context(strokes)\n",addBranch="        const u68b2Policy = reviewedU68b2Policy(u68b2Context, stroke, index)\n        if (u68b2Policy) return <U68b2CapsOutline key={index} policy={u68b2Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />\n"
 for(const token of[addImport,addContext,addBranch])assert.equal(source.split(token).length,2)
 const start=source.indexOf('/** 梲 HQ6 원6m2만'),end=source.indexOf('/** 潗 K의 원3m1/3m2만',start)
 assert(start>0&&end>start)
 const old=(source.slice(0,start)+source.slice(end)).replace(addImport,'').replace(addContext,'').replace(addBranch,'')
 assert.equal(createHash('sha256').update(old).digest('hex'),previousComponentSHA)
 return old
}
let componentPromise:Promise<any>|undefined
async function actualU68b2Component(){
 if(componentPromise)return componentPromise
 componentPromise=(async()=>{
 const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),prior=priorComponent(source),timing=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8').split('\n')
 const timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>{const line=timing.find(l=>l.startsWith(prefix));assert(line);return line}).join('\n')).toString('base64')
 async function load(input:string,extra:string){
  const marker='const [elapsed, setElapsed] = useState(0)';assert(input.includes(marker))
  const prepared=input.replace(marker,'const [elapsed, setElapsed] = useState(Number((globalThis as typeof globalThis & {__u68b2TestElapsed?:number}).__u68b2TestElapsed??0))')+extra
  let js=ts.transpileModule(prepared,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
  js=js.replace(/(['"])@\/lib\/([a-z0-9-]+)\1/g,(_all,_quote,name)=>JSON.stringify(name==='hanja-strokes'?timingURL:new URL('./'+name+'.ts',import.meta.url).href))
  for(const name of['react/jsx-runtime','react'])js=js.replaceAll("'"+name+"'",JSON.stringify(import.meta.resolve(name))).replaceAll('"'+name+'"',JSON.stringify(import.meta.resolve(name)))
  assert(!js.includes('@/lib/'));return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
 }
 const current=await load(source,'\nexport {U68b2CapsOutline}\n'),old=await load(prior,'')
 return{...current,PriorStrokeOutlines:old.StrokeOutlines,timing:await import(timingURL)}
 })();return componentPromise
}
test('梲 actual component SSR hidden partials and exact full-round whole prefixes',async()=>{
 const{U68b2CapsOutline,StrokeOutlines}=await actualU68b2Component()
 for(let i=0;i<targets.length;i++){
  const policy=u68b2PolicyAt(i),render=(progress:number)=>renderToStaticMarkup(createElement('svg',null,createElement(U68b2CapsOutline,{policy,segment:policy.segment,progress,clipId:'u68b2-ssr-'+i})))
  const zero=render(0);assert(!zero.includes('d="'+policy.segment.outline+'"'));assert(zero.includes('data-u68b2-measurement="true"'))
  for(const p of[.000001,.5,.99999999]){const partial=render(p);assert(partial.includes('visibility="hidden"'));assert(partial.includes('d="'+policy.segment.outline+'" mask="url(#u68b2-ssr-'+i+'-u68b2-growing)"'));assert(!partial.includes('data-growing-full-round'))}
  const full=render(1);assert(full.includes('data-growing-full-round="true"'));assert(full.includes('d="'+policy.segment.outline+'" mask="url(#u68b2-ssr-'+i+')"'));assert(full.includes('stroke-linecap="round"'));assert(full.includes('stroke-linejoin="miter"'))
 }
 for(let i=0;i<targets.length;i++){const c=u68b2PolicyAt(i).certificate;assert.equal(c.syntax,'Q');assert.equal(c.parameterBound,1/3);assert.equal(c.curvatureBound,1/40);assert.equal(c.notPolygonConnectivityProof,true);assert.equal(c.notFullSweepProof,true);assert.equal(c.bounds.tUpper,'1/3');assert.equal(c.bounds.curvatureUpper,'1/40')}
 delete (globalThis as typeof globalThis & {__u68b2TestElapsed?:number}).__u68b2TestElapsed
 const whole=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'idle',manual:null,count:11})))
 assert.equal((whole.match(/data-stroke-reveal-policy="growing-u68b2-caps"/g)||[]).length,1);assert.equal((whole.match(/data-growing-full-round="true"/g)||[]).length,1)
 const component=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8');priorComponent(component)
 assert(component.includes('Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN'))
 const prefix=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'paused',manual:true,count:7})))
 assert.equal((prefix.match(/data-growing-full-round="true"/g)||[]).length,1)
 const before=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'paused',manual:true,count:5})))
 assert.equal((before.match(/data-growing-full-round="true"/g)||[]).length,0)

})
test('梲 public JSON segment accepts exact fields and rejects forged segments',()=>{
 for(let i=0;i<targets.length;i++){
  const [p,m]=targets[i],x=fakeU68b2(i),publicSegment=strokes[p][m]
  assert.notEqual(publicSegment,x.policy.segment)
  const result=commitReviewedU68b2Caps(x.policy,publicSegment,.03,x.id,x.nodes)
  assert.equal(result.status,'visible');assert.deepEqual(x.counts(),{reads:1,pointReads:1});result.cleanup()
  for(const key of Object.keys(publicSegment)){
   const s=JSON.parse(JSON.stringify(publicSegment)) as typeof publicSegment,record=s as unknown as Record<string,unknown>
   record[key]=key==='bounds'?[0,0,1,1]:typeof record[key]==='number'?Number(record[key])+1:String(record[key])+' '
   const y=fakeU68b2(i);assert.equal(commitReviewedU68b2Caps(y.policy,s,.03,y.id,y.nodes).status,'hidden');assert.deepEqual(y.counts(),{reads:0,pointReads:0})
  }
 }
})

test('梲 own Q6 certificate and actual full5 cache binding',()=>{
 const f=readFileSync(new URL('../docs/hanja-source-independent-hq-up-u68b2-source-experiment-2026-10-21/fixtures.json',import.meta.url)),p=readFileSync(new URL('../docs/hanja-goal-glyphwiki-batch961-2026-10-13/engine-whole-u68b2.json',import.meta.url));assert.equal(createHash('sha256').update(f).digest('hex'),"5ca5cc98d232c31293bb6c037cae7253f35cff866078cb430299381a4acbf233");assert.equal(createHash('sha256').update(p).digest('hex'),"34661db3c3df9d28426acc3cc502792efa792f83cb4e908013b13170f54c51bc");assert.deepEqual(Object.keys(JSON.parse(p.toString())).sort(),['defaults','engineHashes','engineRevision','groups','trace']);const c=u68b2PolicyAt(0).certificate;assert.equal(c.curvatureBound,1/40);for(const[k,v]of Object.entries({tUpper:'1/3',minimumT:'27303/141124',halfSpeedSquaredLower:'6205081/35281',chordSquared:'15832489/202500',cross:'-2491/25',curvatureUpper:'1/40',rKUpper:'7/40',cosLower:'3151/3200'}))assert.equal(c.bounds[k],v);
})
function currentStroke(markup:string,pen:number){
 const token='<g data-outline-stroke="'+pen+'">',start=markup.indexOf(token);assert(start>=0)
 const tags=/<\/?g\b[^>]*>/g;tags.lastIndex=start;let depth=0,match
 while((match=tags.exec(markup))){depth+=match[0].startsWith('</')?-1:1;if(depth===0)return markup.slice(start,tags.lastIndex)}
 throw Error('missing exact stroke closing group')
}
test('梲 actual component ordinary10 strokes preserve prior subtree output at nine local samples',async()=>{
 const{StrokeOutlines,PriorStrokeOutlines,timing}=await actualU68b2Component(),state=globalThis as typeof globalThis & {__u68b2TestElapsed?:number}
 let pairs=0
 try{for(let pen=1;pen<=11;pen++){if(pen===6)continue;for(const p of[0,.125,.25,.375,.5,.625,.75,.875,1]){
  state.__u68b2TestElapsed=(pen-1)*(timing.STROKE_DURATION+timing.STROKE_GAP)+p*timing.STROKE_DURATION
  const props={strokes,clock:{current:[]},phase:'playing' as const,manual:false,count:0},next=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,props))),old=renderToStaticMarkup(createElement('svg',null,createElement(PriorStrokeOutlines,props)))
  assert.equal(currentStroke(next,pen),currentStroke(old,pen),'ordinary pen '+pen+' p '+p);pairs++
 }}}finally{delete state.__u68b2TestElapsed}
 assert.equal(pairs,90)
})
