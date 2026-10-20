import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import ts from 'typescript'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU6f57Context,reviewedU6f57Policy,measureReviewedU6f57CapsFrame,commitReviewedU6f57Caps,type ReviewedU6f57Nodes} from './hanja-stroke-start-gate-u6f57.ts'
// All DOM lengths below are mock inputs, not browser/native evidence.
const strokes=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-qq-order-u6f57-k-source-experiment-2026-10-21/fixtures.json',import.meta.url),'utf8'))['u6f57-k'].strokes as HanjaOutlineStrokes
const targets=[[2,0],[2,1]] as const
const mockLengths=[100,120]
const context=reviewedU6f57Context(strokes)
function u6f57PolicyAt(i:number){const[p,m]=targets[i],policy=reviewedU6f57Policy(context,p,m);assert(policy);return policy}
const clone=()=>JSON.parse(JSON.stringify(strokes)) as HanjaOutlineStrokes
function fakeU6f57(i:number,id='u6f57-'+i){
  const policy=u6f57PolicyAt(i),segment=policy.segment,q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number),L=mockLengths[i],events:string[]=[]
  const document={defaultView:null as unknown},view={document,getComputedStyle:(n:Element)=>{const x=n as unknown as {cssTransform:string;cssTranslate:string};return{transform:x.cssTransform,getPropertyValue:(key:string)=>key==='translate'?x.cssTranslate:'none'}}};document.defaultView=view
  let owner:SVGSVGElement
  const node=(name:string,attrs:Record<string,string>)=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:document,parentElement:null as unknown,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},getAttribute(key:string){return this.attrs[key]??null},setAttribute(key:string,value:string){this.attrs[key]=value;events.push(name+':'+key+'='+value)},removeAttribute(key:string){delete this.attrs[key]}})
  const svg=node('svg',{});owner=svg as unknown as SVGSVGElement
  const group=node('g',{}),target=node('g',{'data-stroke-start-gate':policy.id}),defs=node('defs',{}),mask=node('mask',{id:id+'-u6f57-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'})
  group.parentElement=svg;target.parentElement=group;defs.parentElement=target;mask.parentElement=defs
  let pointHook:((d:number)=>{x:number;y:number})|null=null,lengthHook:(()=>void)|null=null,length=L
  let reads=0,pointReads=0
  const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u6f57-measurement':'true',id:id+'-u6f57-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('measure:length');lengthHook?.();return length},getPointAtLength(d:number){pointReads++;events.push('measure:point');return pointHook?pointHook(d):{x:q0[0]+d/L,y:q0[1]+d/L}}})
  const guide=Object.assign(node('path',{'data-growing-owner':id,id:id+'-u6f57-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),{getTotalLength(){throw Error('dash is not measurement guide')},getPointAtLength(){throw Error('dash is not measurement guide')}})
  const startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('ink',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u6f57-growing)',visibility:'hidden'})
  measurement.parentElement=defs;guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
  const nodes={measurement,guide,startCap,endCap,ink} as unknown as ReviewedU6f57Nodes
  return{policy,segment,q0,L,id,owner,svg,document,view,group,target,defs,mask,measurement,guide,startCap,endCap,ink,nodes,events,counts:()=>({reads,pointReads}),pointHook:(fn:typeof pointHook)=>{pointHook=fn},lengthHook:(fn:typeof lengthHook)=>{lengthHook=fn},setLength:(n:number)=>{length=n}}
}

test('潗 fixed whole two own certificates and strict target fields',()=>{
 assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),'e190251094e331ce8476292f886be4368fdb87f7dd82d41c0c3c601fed8fe770')
 assert(context);assert.equal(reviewedU6f57Policy({id:'u6f57-k-two-q'},0,0),null)
 let targetCount=0
 for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++){
  const policy=reviewedU6f57Policy(context,p,m),i=targets.findIndex(([x,y])=>x===p&&y===m)
  assert.equal(!!policy,i>=0)
  const extra=clone();Object.assign(extra[p][m],{extra:true});assert.equal(reviewedU6f57Context(extra),null)
  for(const key of Object.keys(strokes[p][m])){const changed=clone(),s=changed[p][m]as unknown as Record<string,unknown>;s[key]=key==='bounds'?[0,0,1,1]:typeof s[key]==='number'?Number(s[key])+1:String(s[key])+' ';assert.notDeepEqual(changed,strokes);assert.equal(reviewedU6f57Context(changed),null)}
  if(!policy)continue;targetCount++
  assert(Object.isFrozen(policy));assert(Object.isFrozen(policy.segment));assert(Object.isFrozen(policy.segment.bounds));assert(Object.isFrozen(policy.certificate));assert.equal(policy.certificate.initialArcMax,7);assert.equal(policy.certificate.notRasterProof,true)
  assert.throws(()=>{policy.segment.weight+=1});assert.throws(()=>{(policy.segment.bounds as number[])[0]+=1})
  for(const local of[.000001,.03,.5,.95,.9999]){
   const f=fakeU6f57(i),actual=measureReviewedU6f57CapsFrame(policy,policy.segment,local,f.nodes.measurement),point=actual.point
   assert.equal(actual.d,local*mockLengths[i]);assert.equal(actual.rho,Math.min(7,actual.d));assert.deepEqual(actual.q0,f.q0);assert.deepEqual(actual.point,point);assert.equal(actual.progress,local);assert.deepEqual(f.counts(),{reads:1,pointReads:1})
  }
 }
 assert.equal(targetCount,2)

})
test('潗 distance metadata matches same-frame caps and clears on cleanup',()=>{
 for(let i=0;i<targets.length;i++){
  const f=fakeU6f57(i),result=commitReviewedU6f57Caps(f.policy,f.segment,.03,f.id,f.nodes)
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
test('潗 enumerable source fields reject inherited and nonenumerable extra-key swaps',()=>{
 let cases=0
 for(const mode of['inherited','nonenumerable']as const){
  const x=clone(),segment=x[2][0],expectedKeys=Object.keys(segment).length,weight=segment.weight
  if(mode==='inherited'){delete (segment as Partial<typeof segment>).weight;Object.setPrototypeOf(segment,{weight})}else Object.defineProperty(segment,'weight',{value:weight,enumerable:false,writable:true,configurable:true})
  Object.assign(segment,{extra:true});assert.equal(Object.keys(segment).length,expectedKeys);assert.equal(segment.weight,weight)
  assert.equal(reviewedU6f57Context(x),null)
  const f=fakeU6f57(0);assert.equal(commitReviewedU6f57Caps(f.policy,segment,.03,f.id,f.nodes).status,'hidden');assert.deepEqual(f.counts(),{reads:0,pointReads:0});cases++
 }
 assert.equal(cases,2)
})
test('潗 sparse arrays and inherited hole fillers reject at every fixed index',()=>{
 let contextRejected=0,publicRejected=0
 for(let p=0;p<strokes.length;p++){
  for(const inherited of[false,true]){const x=clone(),held=x[p];delete x[p];if(inherited)Object.setPrototypeOf(x,Object.assign(Object.create(Array.prototype),{[p]:held}));assert.equal(reviewedU6f57Context(x),null);contextRejected++}
  for(let m=0;m<strokes[p].length;m++){
   for(const inherited of[false,true]){const x=clone(),held=x[p][m];delete x[p][m];if(inherited)Object.setPrototypeOf(x[p],Object.assign(Object.create(Array.prototype),{[m]:held}));assert.equal(reviewedU6f57Context(x),null);contextRejected++}
   for(let b=0;b<4;b++)for(const inherited of[false,true]){const x=clone(),bounds=x[p][m].bounds as number[],held=bounds[b];delete bounds[b];if(inherited)Object.setPrototypeOf(bounds,Object.assign(Object.create(Array.prototype),{[b]:held}));assert.equal(reviewedU6f57Context(x),null);contextRejected++}
  }
 }
 for(let i=0;i<targets.length;i++)for(let b=0;b<4;b++)for(const inherited of[false,true]){
  const [p,m]=targets[i],s=clone()[p][m],bounds=s.bounds as number[],held=bounds[b];delete bounds[b];if(inherited)Object.setPrototypeOf(bounds,Object.assign(Object.create(Array.prototype),{[b]:held}));const f=fakeU6f57(i);assert.equal(commitReviewedU6f57Caps(f.policy,s,.03,f.id,f.nodes).status,'hidden');assert.deepEqual(f.counts(),{reads:0,pointReads:0});publicRejected++
 }
 assert.equal(contextRejected,190);assert.equal(publicRejected,16)
})
test('潗 same-frame two UA paths and coordinate tampering fail closed',()=>{
 let rejected=0
 for(let i=0;i<targets.length;i++){
  const f=fakeU6f57(i),ok=commitReviewedU6f57Caps(f.policy,f.segment,.03,f.id,f.nodes)
  assert.equal(ok.status,'visible');assert(ok.frame);assert.equal(f.events.at(-1),'ink:visibility=visible');assert.deepEqual(f.counts(),{reads:1,pointReads:1});assert.equal(f.startCap.attrs.r,String(ok.frame.rho));ok.cleanup();assert.equal(f.ink.attrs.visibility,'hidden')
  for(const p of[0,1]){const z=fakeU6f57(i),r=commitReviewedU6f57Caps(z.policy,z.segment,p,z.id,z.nodes);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(z.counts(),{reads:0,pointReads:0})}
  const mutations:Array<(x:ReturnType<typeof fakeU6f57>)=>void>=[x=>{x.measurement.attrs.pathLength='1'},x=>{x.guide.attrs.pathLength='2'},x=>{x.guide.attrs.d+=' '},x=>{x.measurement.attrs.d+=' '},x=>{x.guide.attrs['stroke-width']='13'},x=>{x.guide.attrs['stroke-linecap']='round'},x=>{x.ink.attrs.mask='url(#wrong)'},x=>{x.mask.attrs.maskUnits='objectBoundingBox'},x=>{x.setLength(NaN)},x=>{x.setLength(6)},x=>{x.pointHook(()=>({x:NaN,y:0}))}]
  for(const name of['measurement','guide','startCap','endCap','ink','mask','defs','target','group','svg']as const)mutations.push(x=>{x[name].attrs.transform='translate(10 0)'},x=>{x[name].cssTransform='matrix(1,0,0,1,10,0)'},x=>{x[name].cssTranslate='10px'},x=>{x[name].ownerDocument={}as typeof x.document},x=>{x[name].parentElement={}})
  for(const phase of['before','length','point']as const)for(const[index,mutate]of mutations.entries()){
   if(phase==='point'&&index>=8&&index<=10)continue // Changing a future mock length/hook does not invalidate the already-read frame.
   const x=fakeU6f57(i);if(phase==='before')mutate(x);if(phase==='length')x.lengthHook(()=>mutate(x));if(phase==='point')x.pointHook(d=>{mutate(x);return{x:x.q0[0]+d/x.L,y:x.q0[1]+d/x.L}})
   const result=commitReviewedU6f57Caps(x.policy,x.segment,.03,x.id,x.nodes);assert.equal(result.status,'hidden');assert.equal(x.ink.attrs.visibility,'hidden');assert.equal(x.startCap.attrs.r,'0');assert.equal(x.endCap.attrs.r,'0');assert.equal(x.guide.attrs['stroke-dasharray'],'0 2');rejected++
  }
  for(const p of[NaN,Infinity,-1,1.01]){const x=fakeU6f57(i);assert.equal(commitReviewedU6f57Caps(x.policy,x.segment,p,x.id,x.nodes).status,'hidden');assert.deepEqual(x.counts(),{reads:0,pointReads:0})}
  const forged=fakeU6f57(i);assert.equal(commitReviewedU6f57Caps({...forged.policy},forged.segment,.03,forged.id,forged.nodes).status,'hidden')
 }
 assert.equal(rejected,360)
})
const previousComponentSHA='931ed46affc81ba3c852862a1174872d03e653207958cda58daf37411a5163f8'
function priorComponent(source:string){
 const addImport="import { reviewedU6f57Context, reviewedU6f57Policy, commitReviewedU6f57Caps, type ReviewedU6f57Policy } from '@/lib/hanja-stroke-start-gate-u6f57'\n",addContext="  const u6f57Context = reviewedU6f57Context(strokes)\n",addBranch="        const u6f57Policy = reviewedU6f57Policy(u6f57Context, stroke, index)\n        if (u6f57Policy) return <U6f57CapsOutline key={index} policy={u6f57Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />\n"
 for(const token of[addImport,addContext,addBranch])assert.equal(source.split(token).length,2)
 const start=source.indexOf('/** 潗 K의 원3m1/3m2만'),end=source.indexOf('/** u7d3d',start)
 assert(start>0&&end>start)
 const old=(source.slice(0,start)+source.slice(end)).replace(addImport,'').replace(addContext,'').replace(addBranch,'')
 assert.equal(createHash('sha256').update(old).digest('hex'),previousComponentSHA)
 return old
}
let componentPromise:Promise<any>|undefined
async function actualU6f57Component(){
 if(componentPromise)return componentPromise
 componentPromise=(async()=>{
 const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),prior=priorComponent(source),timing=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8').split('\n')
 const timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>{const line=timing.find(l=>l.startsWith(prefix));assert(line);return line}).join('\n')).toString('base64')
 async function load(input:string,extra:string){
  const marker='const [elapsed, setElapsed] = useState(0)';assert(input.includes(marker))
  const prepared=input.replace(marker,'const [elapsed, setElapsed] = useState(Number((globalThis as typeof globalThis & {__u6f57TestElapsed?:number}).__u6f57TestElapsed??0))')+extra
  let js=ts.transpileModule(prepared,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
  js=js.replace(/(['"])@\/lib\/([a-z0-9-]+)\1/g,(_all,_quote,name)=>JSON.stringify(name==='hanja-strokes'?timingURL:new URL('./'+name+'.ts',import.meta.url).href))
  for(const name of['react/jsx-runtime','react'])js=js.replaceAll("'"+name+"'",JSON.stringify(import.meta.resolve(name))).replaceAll('"'+name+'"',JSON.stringify(import.meta.resolve(name)))
  assert(!js.includes('@/lib/'));return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
 }
 const current=await load(source,'\nexport {U6f57CapsOutline}\n'),old=await load(prior,'')
 return{...current,PriorStrokeOutlines:old.StrokeOutlines,timing:await import(timingURL)}
 })();return componentPromise
}
test('潗 actual component SSR hidden partials and exact full-round whole prefixes',async()=>{
 const{U6f57CapsOutline,StrokeOutlines}=await actualU6f57Component()
 for(let i=0;i<targets.length;i++){
  const policy=u6f57PolicyAt(i),render=(progress:number)=>renderToStaticMarkup(createElement('svg',null,createElement(U6f57CapsOutline,{policy,segment:policy.segment,progress,clipId:'u6f57-ssr-'+i})))
  const zero=render(0);assert(!zero.includes('d="'+policy.segment.outline+'"'));assert(zero.includes('data-u6f57-measurement="true"'))
  for(const p of[.000001,.5,.99999999]){const partial=render(p);assert(partial.includes('visibility="hidden"'));assert(partial.includes('d="'+policy.segment.outline+'" mask="url(#u6f57-ssr-'+i+'-u6f57-growing)"'));assert(!partial.includes('data-growing-full-round'))}
  const full=render(1);assert(full.includes('data-growing-full-round="true"'));assert(full.includes('d="'+policy.segment.outline+'" mask="url(#u6f57-ssr-'+i+')"'));assert(full.includes('stroke-linecap="round"'));assert(full.includes('stroke-linejoin="miter"'))
 }
 for(let i=0;i<2;i++){const c=u6f57PolicyAt(i).certificate;assert.equal(c.syntax,'Q');assert.equal(c.parameterBound,1/3);assert.equal(c.curvatureBound,1/11);assert.equal(c.notPolygonConnectivityProof,true);assert.equal(c.notFullSweepProof,true);assert.equal(c.bounds.tUpper,'1/3');assert.equal(c.bounds.curvatureUpper,'1/11')}
 delete (globalThis as typeof globalThis & {__u6f57TestElapsed?:number}).__u6f57TestElapsed
 const whole=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'idle',manual:null,count:15})))
 assert.equal((whole.match(/data-stroke-reveal-policy="growing-u6f57-caps"/g)||[]).length,2);assert.equal((whole.match(/data-growing-full-round="true"/g)||[]).length,2)
 const component=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8');priorComponent(component)
 assert(component.includes('Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN'))
 const prefix=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'paused',manual:true,count:4})))
 assert.equal((prefix.match(/data-growing-full-round="true"/g)||[]).length,2)
 const before=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'paused',manual:true,count:2})))
 assert.equal((before.match(/data-growing-full-round="true"/g)||[]).length,0)

})
test('潗 public JSON segment accepts exact fields and rejects forged segments',()=>{
 for(let i=0;i<targets.length;i++){
  const [p,m]=targets[i],x=fakeU6f57(i),publicSegment=strokes[p][m]
  assert.notEqual(publicSegment,x.policy.segment)
  const result=commitReviewedU6f57Caps(x.policy,publicSegment,.03,x.id,x.nodes)
  assert.equal(result.status,'visible');assert.deepEqual(x.counts(),{reads:1,pointReads:1});result.cleanup()
  for(const key of Object.keys(publicSegment)){
   const s=JSON.parse(JSON.stringify(publicSegment)) as typeof publicSegment,record=s as unknown as Record<string,unknown>
   record[key]=key==='bounds'?[0,0,1,1]:typeof record[key]==='number'?Number(record[key])+1:String(record[key])+' '
   const y=fakeU6f57(i);assert.equal(commitReviewedU6f57Caps(y.policy,s,.03,y.id,y.nodes).status,'hidden');assert.deepEqual(y.counts(),{reads:0,pointReads:0})
  }
 }
})

test('潗 two source Q certificates pin their own rational bounds and full5 provenance',()=>{
 const fixture=readFileSync(new URL('../docs/hanja-source-independent-qq-order-u6f57-k-source-experiment-2026-10-21/fixtures.json',import.meta.url))
 assert.equal(createHash('sha256').update(fixture).digest('hex'),'0a62c42ef6615497523b158d097f07ab013ada5f738489a9a5fc910bd401ed08')
 const proof=readFileSync(new URL('../docs/hanja-goal-glyphwiki-batch902-2026-10-13/engine-whole-u6f57-k.json',import.meta.url))
 assert.equal(createHash('sha256').update(proof).digest('hex'),'46ff9dcaec256a3008598e231d34a48dc270f21b03444fcea1d131ca31741c9a')
 assert.deepEqual(Object.keys(JSON.parse(proof.toString())).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 const values=[{minimumT:'51190/204951',halfSpeedSquaredLower:'22743361/136634',chordSquared:'849257/11250',cross:'14307/50'},{minimumT:'0/1',halfSpeedSquaredLower:'23944/625',chordSquared:'12113309/202500',cross:'209/5'}]
 for(let i=0;i<2;i++){const c=u6f57PolicyAt(i).certificate;assert.equal(c.parameterBound,1/3);assert.equal(c.curvatureBound,1/11);assert.equal(c.notPolygonConnectivityProof,true);for(const[k,v]of Object.entries(values[i]))assert.equal(c.bounds[k],v);assert.equal(c.bounds.rKUpper,'7/11');assert.equal(c.bounds.cosLower,'193/242')}
})
function currentStroke(markup:string,pen:number){
 const token='<g data-outline-stroke="'+pen+'">',start=markup.indexOf(token);assert(start>=0)
 const tags=/<\/?g\b[^>]*>/g;tags.lastIndex=start;let depth=0,match
 while((match=tags.exec(markup))){depth+=match[0].startsWith('</')?-1:1;if(depth===0)return markup.slice(start,tags.lastIndex)}
 throw Error('missing exact stroke closing group')
}
test('潗 actual component ordinary14 strokes preserve prior subtree output at nine local samples',async()=>{
 const{StrokeOutlines,PriorStrokeOutlines,timing}=await actualU6f57Component(),state=globalThis as typeof globalThis & {__u6f57TestElapsed?:number}
 let pairs=0
 try{for(let pen=1;pen<=15;pen++){if(pen===3)continue;for(const p of[0,.125,.25,.375,.5,.625,.75,.875,1]){
  state.__u6f57TestElapsed=(pen-1)*(timing.STROKE_DURATION+timing.STROKE_GAP)+p*timing.STROKE_DURATION
  const props={strokes,clock:{current:[]},phase:'playing' as const,manual:false,count:0},next=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,props))),old=renderToStaticMarkup(createElement('svg',null,createElement(PriorStrokeOutlines,props)))
  assert.equal(currentStroke(next,pen),currentStroke(old,pen),'ordinary pen '+pen+' p '+p);pairs++
 }}}finally{delete state.__u6f57TestElapsed}
 assert.equal(pairs,126)
})
