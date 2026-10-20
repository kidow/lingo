import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import ts from 'typescript'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedCanContext,reviewedCanPolicy,measureReviewedCanCapsFrame,commitReviewedCanCaps,type ReviewedCanNodes} from './hanja-stroke-start-gate-can.ts'
const strokes=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-qq-u6faf-source-experiment-2026-10-20/fixtures.json',import.meta.url),'utf8')).u6faf.strokes as HanjaOutlineStrokes
const targets=[[2,0],[2,1]] as const
const nativeLengths=[30.532485961914062,45.09553146362305]
const context=reviewedCanContext(strokes)
function canPolicyAt(i:number){const[p,m]=targets[i],policy=reviewedCanPolicy(context,p,m);assert(policy);return policy}
const clone=()=>JSON.parse(JSON.stringify(strokes)) as HanjaOutlineStrokes
function fakeCan(i:number,id='can-'+i){
  const policy=canPolicyAt(i),segment=policy.segment,q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number),L=nativeLengths[i],events:string[]=[]
  const document={defaultView:null as unknown},view={document,getComputedStyle:(n:Element)=>{const x=n as unknown as {cssTransform:string;cssTranslate:string};return{transform:x.cssTransform,getPropertyValue:(key:string)=>key==='translate'?x.cssTranslate:'none'}}};document.defaultView=view
  let owner:SVGSVGElement
  const node=(name:string,attrs:Record<string,string>)=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:document,parentElement:null as unknown,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},getAttribute(key:string){return this.attrs[key]??null},setAttribute(key:string,value:string){this.attrs[key]=value;events.push(name+':'+key+'='+value)},removeAttribute(key:string){delete this.attrs[key]}})
  const svg=node('svg',{});owner=svg as unknown as SVGSVGElement
  const group=node('g',{}),target=node('g',{'data-stroke-start-gate':policy.id}),defs=node('defs',{}),mask=node('mask',{id:id+'-can-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'})
  group.parentElement=svg;target.parentElement=group;defs.parentElement=target;mask.parentElement=defs
  let pointHook:((d:number)=>{x:number;y:number})|null=null,lengthHook:(()=>void)|null=null,length=L
  let reads=0,pointReads=0
  const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-can-measurement':'true',id:id+'-can-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('measure:length');lengthHook?.();return length},getPointAtLength(d:number){pointReads++;events.push('measure:point');return pointHook?pointHook(d):{x:q0[0]+d/L,y:q0[1]+d/L}}})
  const guide=Object.assign(node('path',{'data-growing-owner':id,id:id+'-can-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),{getTotalLength(){throw Error('dash is not measurement guide')},getPointAtLength(){throw Error('dash is not measurement guide')}})
  const startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('ink',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-can-growing)',visibility:'hidden'})
  measurement.parentElement=defs;guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
  const nodes={measurement,guide,startCap,endCap,ink} as unknown as ReviewedCanNodes
  return{policy,segment,q0,L,id,owner,svg,document,view,group,target,defs,mask,measurement,guide,startCap,endCap,ink,nodes,events,counts:()=>({reads,pointReads}),pointHook:(fn:typeof pointHook)=>{pointHook=fn},lengthHook:(fn:typeof lengthHook)=>{lengthHook=fn},setLength:(n:number)=>{length=n}}
}

test('澯 fixed whole two own certificates and strict target fields',()=>{
 assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),'734fc080df851f3f7f681eb160e339dd7c11067f4a6da9e73b1cda23dd6d58c6')
 assert(context);assert.equal(reviewedCanPolicy({id:'u6faf-two-q'},0,0),null)
 let targetCount=0
 for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++){
  const policy=reviewedCanPolicy(context,p,m),i=targets.findIndex(([x,y])=>x===p&&y===m)
  assert.equal(!!policy,i>=0)
  const extra=clone();Object.assign(extra[p][m],{extra:true});assert.equal(reviewedCanContext(extra),null)
  for(const key of Object.keys(strokes[p][m])){const changed=clone(),s=changed[p][m]as unknown as Record<string,unknown>;s[key]=key==='bounds'?[0,0,1,1]:typeof s[key]==='number'?Number(s[key])+1:String(s[key])+' ';assert.equal(reviewedCanContext(changed),null)}
  if(!policy)continue;targetCount++
  assert(Object.isFrozen(policy));assert(Object.isFrozen(policy.segment));assert(Object.isFrozen(policy.segment.bounds));assert(Object.isFrozen(policy.certificate));assert.equal(policy.certificate.initialArcMax,7);assert.equal(policy.certificate.notRasterProof,true)
  assert.throws(()=>{policy.segment.weight+=1});assert.throws(()=>{(policy.segment.bounds as number[])[0]+=1})
  for(const local of[.000001,.03,.5,.95,.9999]){
   const f=fakeCan(i),actual=measureReviewedCanCapsFrame(policy,policy.segment,local,f.nodes.measurement),point=actual.point
   assert.equal(actual.d,local*nativeLengths[i]);assert.equal(actual.rho,Math.min(7,actual.d));assert.deepEqual(actual.q0,f.q0);assert.deepEqual(actual.point,point);assert.equal(actual.progress,local);assert.deepEqual(f.counts(),{reads:1,pointReads:1})
  }
 }
 assert.equal(targetCount,2)
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate-di.ts',import.meta.url))).digest('hex'),'53c2bd788f47d4c183ae826e52c767bb628e7e1c828cb59dec25f139106bfde6')
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate-di.test.ts',import.meta.url))).digest('hex'),'ff43c4ce6d608439b84e9dab200fd4c48a004580a617b82019179829243fe160')
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate.ts',import.meta.url))).digest('hex'),'1a734d87d44093198cda60bafff96d963b1e62510acb5f4e1fa4e3f3a60d1704')
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate.test.ts',import.meta.url))).digest('hex'),'0f0ea878d6a2c10f7104bfa92440bf8d7e4e2f3bb64efd78d40a44c76ad132c8')
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate-si.ts',import.meta.url))).digest('hex'),'57806d5be50d813dfbfbcb21ffc2056aa968a2f900cf4da72ba649582eecce73')
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate-si.test.ts',import.meta.url))).digest('hex'),'f939e0d4113e3cce88fba3c6f61be47fa4e6f1543236c31ddee360bea112b515')
})
test('澯 enumerable source fields reject inherited and nonenumerable extra-key swaps',()=>{
 let cases=0
 for(const mode of['inherited','nonenumerable']as const){
  const x=clone(),segment=x[2][0],expectedKeys=Object.keys(segment).length,weight=segment.weight
  if(mode==='inherited'){delete (segment as Partial<typeof segment>).weight;Object.setPrototypeOf(segment,{weight})}else Object.defineProperty(segment,'weight',{value:weight,enumerable:false,writable:true,configurable:true})
  Object.assign(segment,{extra:true});assert.equal(Object.keys(segment).length,expectedKeys);assert.equal(segment.weight,weight)
  assert.equal(reviewedCanContext(x),null)
  const f=fakeCan(0);assert.equal(commitReviewedCanCaps(f.policy,segment,.03,f.id,f.nodes).status,'hidden');assert.deepEqual(f.counts(),{reads:0,pointReads:0});cases++
 }
 assert.equal(cases,2)
})
test('澯 sparse arrays and inherited hole fillers reject at every fixed index',()=>{
 let contextRejected=0,publicRejected=0
 for(let p=0;p<strokes.length;p++){
  for(const inherited of[false,true]){const x=clone(),held=x[p];delete x[p];if(inherited)Object.setPrototypeOf(x,Object.assign(Object.create(Array.prototype),{[p]:held}));assert.equal(reviewedCanContext(x),null);contextRejected++}
  for(let m=0;m<strokes[p].length;m++){
   for(const inherited of[false,true]){const x=clone(),held=x[p][m];delete x[p][m];if(inherited)Object.setPrototypeOf(x[p],Object.assign(Object.create(Array.prototype),{[m]:held}));assert.equal(reviewedCanContext(x),null);contextRejected++}
   for(let b=0;b<4;b++)for(const inherited of[false,true]){const x=clone(),bounds=x[p][m].bounds as number[],held=bounds[b];delete bounds[b];if(inherited)Object.setPrototypeOf(bounds,Object.assign(Object.create(Array.prototype),{[b]:held}));assert.equal(reviewedCanContext(x),null);contextRejected++}
  }
 }
 for(let i=0;i<targets.length;i++)for(let b=0;b<4;b++)for(const inherited of[false,true]){
  const [p,m]=targets[i],s=clone()[p][m],bounds=s.bounds as number[],held=bounds[b];delete bounds[b];if(inherited)Object.setPrototypeOf(bounds,Object.assign(Object.create(Array.prototype),{[b]:held}));const f=fakeCan(i);assert.equal(commitReviewedCanCaps(f.policy,s,.03,f.id,f.nodes).status,'hidden');assert.deepEqual(f.counts(),{reads:0,pointReads:0});publicRejected++
 }
 assert.equal(contextRejected,202);assert.equal(publicRejected,16)
})
test('澯 same-frame two UA paths and coordinate tampering fail closed',()=>{
 let rejected=0
 for(let i=0;i<targets.length;i++){
  const f=fakeCan(i),ok=commitReviewedCanCaps(f.policy,f.segment,.03,f.id,f.nodes)
  assert.equal(ok.status,'visible');assert(ok.frame);assert.equal(f.events.at(-1),'ink:visibility=visible');assert.deepEqual(f.counts(),{reads:1,pointReads:1});assert.equal(f.startCap.attrs.r,String(ok.frame.rho));ok.cleanup();assert.equal(f.ink.attrs.visibility,'hidden')
  for(const p of[0,1]){const z=fakeCan(i),r=commitReviewedCanCaps(z.policy,z.segment,p,z.id,z.nodes);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(z.counts(),{reads:0,pointReads:0})}
  const mutations:Array<(x:ReturnType<typeof fakeCan>)=>void>=[x=>{x.measurement.attrs.pathLength='1'},x=>{x.guide.attrs.pathLength='2'},x=>{x.guide.attrs.d+=' '},x=>{x.measurement.attrs.d+=' '},x=>{x.guide.attrs['stroke-width']='13'},x=>{x.guide.attrs['stroke-linecap']='round'},x=>{x.ink.attrs.mask='url(#wrong)'},x=>{x.mask.attrs.maskUnits='objectBoundingBox'},x=>{x.setLength(NaN)},x=>{x.setLength(6)},x=>{x.pointHook(()=>({x:NaN,y:0}))}]
  for(const name of['measurement','guide','startCap','endCap','ink','mask','defs','target','group','svg']as const)mutations.push(x=>{x[name].attrs.transform='translate(10 0)'},x=>{x[name].cssTransform='matrix(1,0,0,1,10,0)'},x=>{x[name].cssTranslate='10px'},x=>{x[name].ownerDocument={}as typeof x.document},x=>{x[name].parentElement={}})
  for(const phase of['before','length','point']as const)for(const[index,mutate]of mutations.entries()){
   if(phase==='point'&&index>=8&&index<=10)continue // Changing a future mock length/hook does not invalidate the already-read frame.
   const x=fakeCan(i);if(phase==='before')mutate(x);if(phase==='length')x.lengthHook(()=>mutate(x));if(phase==='point')x.pointHook(d=>{mutate(x);return{x:x.q0[0]+d/x.L,y:x.q0[1]+d/x.L}})
   const result=commitReviewedCanCaps(x.policy,x.segment,.03,x.id,x.nodes);assert.equal(result.status,'hidden');assert.equal(x.ink.attrs.visibility,'hidden');assert.equal(x.startCap.attrs.r,'0');assert.equal(x.endCap.attrs.r,'0');assert.equal(x.guide.attrs['stroke-dasharray'],'0 2');rejected++
  }
  for(const p of[NaN,Infinity,-1,1.01]){const x=fakeCan(i);assert.equal(commitReviewedCanCaps(x.policy,x.segment,p,x.id,x.nodes).status,'hidden');assert.deepEqual(x.counts(),{reads:0,pointReads:0})}
  const forged=fakeCan(i);assert.equal(commitReviewedCanCaps({...forged.policy},forged.segment,.03,forged.id,forged.nodes).status,'hidden')
 }
 assert.equal(rejected,360)
})
async function actualCanComponent(){
 const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),timing=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8').split('\n')
 const timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>{const line=timing.find(l=>l.startsWith(prefix));assert(line);return line}).join('\n')).toString('base64')
 let js=ts.transpileModule(source+'\nexport {CanCapsOutline}\n',{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
 for(const[from,to]of[['@/lib/hanja-strokes',timingURL],['@/lib/hanja-stroke-outline',new URL('./hanja-stroke-outline.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate-can',new URL('./hanja-stroke-start-gate-can.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate-di',new URL('./hanja-stroke-start-gate-di.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate-si',new URL('./hanja-stroke-start-gate-si.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate',new URL('./hanja-stroke-start-gate.ts',import.meta.url).href],['react/jsx-runtime',import.meta.resolve('react/jsx-runtime')],['react',import.meta.resolve('react')]])js=js.replaceAll("'"+from+"'",JSON.stringify(to)).replaceAll('"'+from+'"',JSON.stringify(to))
 return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
}
test('澯 actual component SSR hidden partials and exact full-round whole prefixes',async()=>{
 const{CanCapsOutline,StrokeOutlines}=await actualCanComponent()
 for(let i=0;i<targets.length;i++){
  const policy=canPolicyAt(i),render=(progress:number)=>renderToStaticMarkup(createElement('svg',null,createElement(CanCapsOutline,{policy,segment:policy.segment,progress,clipId:'can-ssr-'+i})))
  const zero=render(0);assert(!zero.includes('d="'+policy.segment.outline+'"'));assert(zero.includes('data-can-measurement="true"'))
  for(const p of[.000001,.5,.99999999]){const partial=render(p);assert(partial.includes('visibility="hidden"'));assert(partial.includes('d="'+policy.segment.outline+'" mask="url(#can-ssr-'+i+'-can-growing)"'));assert(!partial.includes('data-growing-full-round'))}
  const full=render(1);assert(full.includes('data-growing-full-round="true"'));assert(full.includes('d="'+policy.segment.outline+'" mask="url(#can-ssr-'+i+')"'));assert(full.includes('stroke-linecap="round"'));assert(full.includes('stroke-linejoin="miter"'))
 }
 for(let i=0;i<2;i++){const c=canPolicyAt(i).certificate;assert.equal(c.syntax,'Q');assert.equal(c.parameterBound,1/3);assert.equal(c.curvatureBound,1/11);assert.equal(c.notPolygonConnectivityProof,true);assert.equal(c.notFullSweepProof,true);assert.equal(c.bounds.tUpper,'1/3');assert.equal(c.bounds.curvatureUpper,'1/11')}
 const whole=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'idle',manual:null,count:16})))
 assert.equal((whole.match(/data-stroke-reveal-policy="growing-can-caps"/g)||[]).length,2);assert.equal((whole.match(/data-growing-full-round="true"/g)||[]).length,2)
 const component=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),oldChildren=component.slice(component.indexOf('/** 疷만'))
 assert.equal(createHash('sha256').update(oldChildren).digest('hex'),'8ac08e372ebcd927b2ab2f1b933b5aefa11bcf1ed5ae5a10b1bf1edd451d0169')
 assert(component.includes('Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN'))
})
test('澯 public JSON segment accepts exact fields and rejects forged segments',()=>{
 for(let i=0;i<targets.length;i++){
  const [p,m]=targets[i],x=fakeCan(i),publicSegment=strokes[p][m]
  assert.notEqual(publicSegment,x.policy.segment)
  const result=commitReviewedCanCaps(x.policy,publicSegment,.03,x.id,x.nodes)
  assert.equal(result.status,'visible');assert.deepEqual(x.counts(),{reads:1,pointReads:1});result.cleanup()
  for(const key of Object.keys(publicSegment)){
   const s=JSON.parse(JSON.stringify(publicSegment)) as typeof publicSegment,record=s as unknown as Record<string,unknown>
   record[key]=key==='bounds'?[0,0,1,1]:typeof record[key]==='number'?Number(record[key])+1:String(record[key])+' '
   const y=fakeCan(i);assert.equal(commitReviewedCanCaps(y.policy,s,.03,y.id,y.nodes).status,'hidden');assert.deepEqual(y.counts(),{reads:0,pointReads:0})
  }
 }
})
