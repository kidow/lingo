import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import ts from 'typescript'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU7037Context,reviewedU7037Policy,measureReviewedU7037CapsFrame,commitReviewedU7037Caps,type ReviewedU7037Nodes} from './hanja-stroke-start-gate-u7037.ts'
const strokes=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-qq-left-u7037-k-source-experiment-2026-10-20/fixtures.json',import.meta.url),'utf8'))['u7037-k'].strokes as HanjaOutlineStrokes
const targets=[[2,0],[2,1],[3,0],[6,0],[10,0]] as const
const mockLengths=[50,60,80,80,100] // synthetic contracts only; not independent UA measurements
const context=reviewedU7037Context(strokes)
function u7037PolicyAt(i:number){const[p,m]=targets[i],policy=reviewedU7037Policy(context,p,m);assert(policy);return policy}
const clone=()=>JSON.parse(JSON.stringify(strokes)) as HanjaOutlineStrokes
function fakeU7037(i:number,id='can-'+i){
  const policy=u7037PolicyAt(i),segment=policy.segment,q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number),L=mockLengths[i],events:string[]=[]
  const document={defaultView:null as unknown},view={document,getComputedStyle:(n:Element)=>{const x=n as unknown as {cssTransform:string;cssTranslate:string};return{transform:x.cssTransform,getPropertyValue:(key:string)=>key==='translate'?x.cssTranslate:'none'}}};document.defaultView=view
  let owner:SVGSVGElement
  const node=(name:string,attrs:Record<string,string>)=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:document,parentElement:null as unknown,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},getAttribute(key:string){return this.attrs[key]??null},setAttribute(key:string,value:string){this.attrs[key]=value;events.push(name+':'+key+'='+value)},removeAttribute(key:string){delete this.attrs[key]}})
  const svg=node('svg',{});owner=svg as unknown as SVGSVGElement
  const group=node('g',{}),target=node('g',{'data-stroke-start-gate':policy.id}),defs=node('defs',{}),mask=node('mask',{id:id+'-u7037-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'})
  group.parentElement=svg;target.parentElement=group;defs.parentElement=target;mask.parentElement=defs
  let pointHook:((d:number)=>{x:number;y:number})|null=null,lengthHook:(()=>void)|null=null,length=L
  let reads=0,pointReads=0
  const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u7037-measurement':'true',id:id+'-u7037-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('measure:length');lengthHook?.();return length},getPointAtLength(d:number){pointReads++;events.push('measure:point');return pointHook?pointHook(d):{x:q0[0]+d/L,y:q0[1]+d/L}}})
  const guide=Object.assign(node('path',{'data-growing-owner':id,id:id+'-u7037-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),{getTotalLength(){throw Error('dash is not measurement guide')},getPointAtLength(){throw Error('dash is not measurement guide')}})
  const startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('ink',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u7037-growing)',visibility:'hidden'})
  measurement.parentElement=defs;guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
  const nodes={measurement,guide,startCap,endCap,ink} as unknown as ReviewedU7037Nodes
  return{policy,segment,q0,L,id,owner,svg,document,view,group,target,defs,mask,measurement,guide,startCap,endCap,ink,nodes,events,counts:()=>({reads,pointReads}),pointHook:(fn:typeof pointHook)=>{pointHook=fn},lengthHook:(fn:typeof lengthHook)=>{lengthHook=fn},setLength:(n:number)=>{length=n}}
}

test('瀷 fixed whole five own certificates and strict target fields',()=>{
 assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),'80680f89c1bda592efb2514e8932457eb85109ab70bfe1cf8f8adcaf0e54a281')
 assert(context);assert.equal(reviewedU7037Policy({id:'u7037-k-five-targets'},0,0),null)
 let targetCount=0
 for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++){
  const policy=reviewedU7037Policy(context,p,m),i=targets.findIndex(([x,y])=>x===p&&y===m)
  assert.equal(!!policy,i>=0)
  const extra=clone();Object.assign(extra[p][m],{extra:true});assert.equal(reviewedU7037Context(extra),null)
  for(const key of Object.keys(strokes[p][m])){const changed=clone(),s=changed[p][m]as unknown as Record<string,unknown>;s[key]=key==='bounds'?[0,0,1,1]:typeof s[key]==='number'?Number(s[key])+1:String(s[key])+' ';assert.equal(reviewedU7037Context(changed),null)}
  if(!policy)continue;targetCount++
  assert(Object.isFrozen(policy));assert(Object.isFrozen(policy.segment));assert(Object.isFrozen(policy.segment.bounds));assert(Object.isFrozen(policy.certificate));assert.equal(policy.certificate.initialArcMax,7);assert.equal(policy.certificate.notRasterProof,true)
  assert.throws(()=>{policy.segment.weight+=1});assert.throws(()=>{(policy.segment.bounds as number[])[0]+=1})
  for(const local of[.000001,.03,.5,.95,.9999]){
   const f=fakeU7037(i),actual=measureReviewedU7037CapsFrame(policy,policy.segment,local,f.nodes.measurement),point=actual.point
   assert.equal(actual.d,local*mockLengths[i]);assert.equal(actual.rho,Math.min(7,actual.d));assert.deepEqual(actual.q0,f.q0);assert.deepEqual(actual.point,point);assert.equal(actual.progress,local);assert.deepEqual(f.counts(),{reads:1,pointReads:1})
  }
 }
 assert.equal(targetCount,5)
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate-di.ts',import.meta.url))).digest('hex'),'53c2bd788f47d4c183ae826e52c767bb628e7e1c828cb59dec25f139106bfde6')
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate-di.test.ts',import.meta.url))).digest('hex'),'ff43c4ce6d608439b84e9dab200fd4c48a004580a617b82019179829243fe160')
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate.ts',import.meta.url))).digest('hex'),'1a734d87d44093198cda60bafff96d963b1e62510acb5f4e1fa4e3f3a60d1704')
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate.test.ts',import.meta.url))).digest('hex'),'0f0ea878d6a2c10f7104bfa92440bf8d7e4e2f3bb64efd78d40a44c76ad132c8')
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate-si.ts',import.meta.url))).digest('hex'),'57806d5be50d813dfbfbcb21ffc2056aa968a2f900cf4da72ba649582eecce73')
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate-si.test.ts',import.meta.url))).digest('hex'),'f939e0d4113e3cce88fba3c6f61be47fa4e6f1543236c31ddee360bea112b515')
})
test('瀷 distance metadata matches same-frame caps and clears on cleanup',()=>{
 for(let i=0;i<targets.length;i++){
  const f=fakeU7037(i),result=commitReviewedU7037Caps(f.policy,f.segment,.03,f.id,f.nodes)
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
test('瀷 enumerable source fields reject inherited and nonenumerable extra-key swaps',()=>{
 let cases=0
 for(const mode of['inherited','nonenumerable']as const){
  const x=clone(),segment=x[0][0],expectedKeys=Object.keys(segment).length,weight=segment.weight
  if(mode==='inherited'){delete (segment as Partial<typeof segment>).weight;Object.setPrototypeOf(segment,{weight})}else Object.defineProperty(segment,'weight',{value:weight,enumerable:false,writable:true,configurable:true})
  Object.assign(segment,{extra:true});assert.equal(Object.keys(segment).length,expectedKeys);assert.equal(segment.weight,weight)
  assert.equal(reviewedU7037Context(x),null)
  const f=fakeU7037(0);assert.equal(commitReviewedU7037Caps(f.policy,segment,.03,f.id,f.nodes).status,'hidden');assert.deepEqual(f.counts(),{reads:0,pointReads:0});cases++
 }
 assert.equal(cases,2)
})
test('瀷 sparse arrays and inherited hole fillers reject at every fixed index',()=>{
 let contextRejected=0,publicRejected=0
 for(let p=0;p<strokes.length;p++){
  for(const inherited of[false,true]){const x=clone(),held=x[p];delete x[p];if(inherited)Object.setPrototypeOf(x,Object.assign(Object.create(Array.prototype),{[p]:held}));assert.equal(reviewedU7037Context(x),null);contextRejected++}
  for(let m=0;m<strokes[p].length;m++){
   for(const inherited of[false,true]){const x=clone(),held=x[p][m];delete x[p][m];if(inherited)Object.setPrototypeOf(x[p],Object.assign(Object.create(Array.prototype),{[m]:held}));assert.equal(reviewedU7037Context(x),null);contextRejected++}
   for(let b=0;b<4;b++)for(const inherited of[false,true]){const x=clone(),bounds=x[p][m].bounds as number[],held=bounds[b];delete bounds[b];if(inherited)Object.setPrototypeOf(bounds,Object.assign(Object.create(Array.prototype),{[b]:held}));assert.equal(reviewedU7037Context(x),null);contextRejected++}
  }
 }
 for(let i=0;i<targets.length;i++)for(let b=0;b<4;b++)for(const inherited of[false,true]){
  const [p,m]=targets[i],s=clone()[p][m],bounds=s.bounds as number[],held=bounds[b];delete bounds[b];if(inherited)Object.setPrototypeOf(bounds,Object.assign(Object.create(Array.prototype),{[b]:held}));const f=fakeU7037(i);assert.equal(commitReviewedU7037Caps(f.policy,s,.03,f.id,f.nodes).status,'hidden');assert.deepEqual(f.counts(),{reads:0,pointReads:0});publicRejected++
 }
 assert.equal(contextRejected,2*strokes.length+10*strokes.flat().length);assert.equal(publicRejected,targets.length*4*2)
})
test('瀷 same-frame five synthetic UA paths and coordinate tampering fail closed',()=>{
 let rejected=0
 for(let i=0;i<targets.length;i++){
  const f=fakeU7037(i),ok=commitReviewedU7037Caps(f.policy,f.segment,.03,f.id,f.nodes)
  assert.equal(ok.status,'visible');assert(ok.frame);assert.equal(f.events.at(-1),'ink:visibility=visible');assert.deepEqual(f.counts(),{reads:1,pointReads:1});assert.equal(f.startCap.attrs.r,String(ok.frame.rho));ok.cleanup();assert.equal(f.ink.attrs.visibility,'hidden')
  for(const p of[0,1]){const z=fakeU7037(i),r=commitReviewedU7037Caps(z.policy,z.segment,p,z.id,z.nodes);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(z.counts(),{reads:0,pointReads:0})}
  const mutations:Array<(x:ReturnType<typeof fakeU7037>)=>void>=[x=>{x.measurement.attrs.pathLength='1'},x=>{x.guide.attrs.pathLength='2'},x=>{x.guide.attrs.d+=' '},x=>{x.measurement.attrs.d+=' '},x=>{x.guide.attrs['stroke-width']='13'},x=>{x.guide.attrs['stroke-linecap']='round'},x=>{x.ink.attrs.mask='url(#wrong)'},x=>{x.mask.attrs.maskUnits='objectBoundingBox'},x=>{x.setLength(NaN)},x=>{x.setLength(6)},x=>{x.pointHook(()=>({x:NaN,y:0}))}]
  for(const name of['measurement','guide','startCap','endCap','ink','mask','defs','target','group','svg']as const)mutations.push(x=>{x[name].attrs.transform='translate(10 0)'},x=>{x[name].cssTransform='matrix(1,0,0,1,10,0)'},x=>{x[name].cssTranslate='10px'},x=>{x[name].ownerDocument={}as typeof x.document},x=>{x[name].parentElement={}})
  for(const phase of['before','length','point']as const)for(const[index,mutate]of mutations.entries()){
   if(phase==='point'&&index>=8&&index<=10)continue // Changing a future mock length/hook does not invalidate the already-read frame.
   const x=fakeU7037(i);if(phase==='before')mutate(x);if(phase==='length')x.lengthHook(()=>mutate(x));if(phase==='point')x.pointHook(d=>{mutate(x);return{x:x.q0[0]+d/x.L,y:x.q0[1]+d/x.L}})
   const result=commitReviewedU7037Caps(x.policy,x.segment,.03,x.id,x.nodes);assert.equal(result.status,'hidden');assert.equal(x.ink.attrs.visibility,'hidden');assert.equal(x.startCap.attrs.r,'0');assert.equal(x.endCap.attrs.r,'0');assert.equal(x.guide.attrs['stroke-dasharray'],'0 2');rejected++
  }
  for(const p of[NaN,Infinity,-1,1.01]){const x=fakeU7037(i);assert.equal(commitReviewedU7037Caps(x.policy,x.segment,p,x.id,x.nodes).status,'hidden');assert.deepEqual(x.counts(),{reads:0,pointReads:0})}
  const forged=fakeU7037(i);assert.equal(commitReviewedU7037Caps({...forged.policy},forged.segment,.03,forged.id,forged.nodes).status,'hidden')
 }
 assert.equal(rejected,targets.length*180)
})
async function actualU7037Component(){
 const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),timing=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8').split('\n')
 const timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>{const line=timing.find(l=>l.startsWith(prefix));assert(line);return line}).join('\n')).toString('base64')
 let js=ts.transpileModule(source+'\nexport {U7037CapsOutline}\n',{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
 for(const[from,to]of[['@/lib/hanja-strokes',timingURL],['@/lib/hanja-stroke-outline',new URL('./hanja-stroke-outline.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate-u7037',new URL('./hanja-stroke-start-gate-u7037.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate-u6303',new URL('./hanja-stroke-start-gate-u6303.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate-u7277',new URL('./hanja-stroke-start-gate-u7277.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate-can',new URL('./hanja-stroke-start-gate-can.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate-di',new URL('./hanja-stroke-start-gate-di.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate-si',new URL('./hanja-stroke-start-gate-si.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate',new URL('./hanja-stroke-start-gate.ts',import.meta.url).href],['react/jsx-runtime',import.meta.resolve('react/jsx-runtime')],['react',import.meta.resolve('react')]])js=js.replaceAll("'"+from+"'",JSON.stringify(to)).replaceAll('"'+from+'"',JSON.stringify(to))
 return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
}
test('瀷 own initial certificates and five-target same-frame parity',()=>{
 const ks=[1/11,1/10,0,0,0],syntax=['Q','Q','MLLQ','MLLQ','MLL'],lines=[0,0,26.52,26.91,42.12]
 for(let i=0;i<targets.length;i++){
  const p=u7037PolicyAt(i),cert=p.certificate;assert.equal(cert.syntax,syntax[i]);assert.equal(cert.curvatureBound,ks[i]);assert.equal(cert.notFullSweepProof,true)
  if(i>=2){assert.equal(cert.firstL,lines[i]);assert.equal(cert.bounds.curvatureUpper,'0/1')}else assert.equal(cert.parameterBound,1/3)
  for(const local of[.000001,.001,.125,.25,.5,.625,.75,.95,.9999]){
   const f=fakeU7037(i),r=commitReviewedU7037Caps(p,p.segment,local,f.id,f.nodes);assert.equal(r.status,'visible');assert(r.frame);assert.equal(r.frame.d,local*f.L);assert.equal(r.frame.rho,Math.min(7,local*f.L));assert.deepEqual(f.counts(),{reads:1,pointReads:1});assert.equal(f.ink.attrs['data-growing-distance'],String(r.frame.d));r.cleanup();assert.equal(f.ink.getAttribute('data-growing-distance'),null)
  }
 }
})
test('瀷 actual child SSR p0 empty partial hidden and p1 always masked',async()=>{
 const{U7037CapsOutline,StrokeOutlines}=await actualU7037Component()
 for(let i=0;i<targets.length;i++){
  const policy=u7037PolicyAt(i),render=(progress:number)=>renderToStaticMarkup(createElement('svg',null,createElement(U7037CapsOutline,{policy,segment:policy.segment,progress,clipId:'u7037-ssr-'+i})))
  const zero=render(0);assert(!zero.includes('d="'+policy.segment.outline+'"'));assert(zero.includes('data-u7037-measurement="true"'))
  for(const p of[.000001,.5,.99999999]){const partial=render(p);assert(partial.includes('visibility="hidden"'));assert(partial.includes('d="'+policy.segment.outline+'" mask="url(#u7037-ssr-'+i+'-u7037-growing)"'));assert(!partial.includes('data-growing-full-round'))}
  const full=render(1);assert(full.includes('data-growing-full-round="true"'));assert(full.includes('d="'+policy.segment.outline+'" mask="url(#u7037-ssr-'+i+')"'));assert(full.includes('stroke-linecap="round"'));assert(full.includes('stroke-linejoin="miter"'))
 }
 const whole=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'idle',manual:null,count:20})))
 assert.equal((whole.match(/data-stroke-reveal-policy="growing-u7037-caps"/g)||[]).length,5);assert.equal((whole.match(/data-growing-full-round="true"/g)||[]).length,5)
})
test('瀷 integration preserves all preexisting component bytes and policy files',()=>{
 const s=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),child="/** u7037 瀷의 정확한 두 Q와 세 첫직선만 별도 원 path로 측정한다. */\nfunction U7037CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU7037Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {\n  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)\n  useLayoutEffect(()=>{\n    const committed=commitReviewedU7037Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})\n    return committed.cleanup\n  },[policy,segment,progress,clipId])\n  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1\n  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy=\"growing-u7037-caps\" data-stroke-reveal-progress={valid?progress:'invalid'}>\n    <defs>\n      <path ref={measurement} id={clipId+'-u7037-measure'} data-growing-owner={clipId} data-u7037-measurement=\"true\" d={segment.revealPath} fill=\"none\" stroke=\"none\" visibility=\"hidden\" />\n      <mask id={clipId} maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"100\" height=\"100\">\n        <path d={segment.revealPath} fill=\"none\" stroke=\"white\" strokeWidth={segment.revealWidth} strokeLinecap=\"round\" strokeLinejoin=\"miter\" pathLength=\"1\" strokeDasharray=\"1 2\" strokeDashoffset={0} />\n      </mask>\n      <mask id={clipId+'-u7037-growing'} maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"100\" height=\"100\">\n        <path ref={guide} id={clipId+'-u7037-guide'} data-growing-owner={clipId} d={segment.revealPath} fill=\"none\" stroke=\"white\" strokeWidth={segment.revealWidth} strokeLinecap=\"butt\" strokeLinejoin=\"miter\" pathLength=\"1\" strokeDasharray=\"0 2\" strokeDashoffset={0} />\n        <circle ref={startCap} data-growing-owner={clipId} cx=\"0\" cy=\"0\" r=\"0\" fill=\"white\" />\n        <circle ref={endCap} data-growing-owner={clipId} cx=\"0\" cy=\"0\" r=\"0\" fill=\"white\" />\n      </mask>\n    </defs>\n    {valid&&progress===1&&<path key=\"u7037-full-round-ink\" data-growing-full-round=\"true\" d={segment.outline} mask={'url(#'+clipId+')'} />}\n    {valid&&progress>0&&progress<1&&<path key=\"u7037-growing-ink\" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u7037-growing)'} visibility=\"hidden\" />}\n  </g>\n}\n",imp="import { reviewedU7037Context, reviewedU7037Policy, commitReviewedU7037Caps, type ReviewedU7037Policy } from '@/lib/hanja-stroke-start-gate-u7037'\n",ctx="  const u7037Context = reviewedU7037Context(strokes)\n",branch="        const u7037Policy = reviewedU7037Policy(u7037Context, stroke, index)\n        if (u7037Policy) return <U7037CapsOutline key={index} policy={u7037Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />\n"
 assert(s.includes(child));const restored=s.replace(child,'').replace(imp,'').replace(ctx,'').replace(branch,'');assert.equal(createHash('sha256').update(restored).digest('hex'),'2f0009c6a37ac9c6f9f8f63ddff904bd3949907d6a97bd42a9aaa3d453ddcd1d')
 const pins={"lib/hanja-stroke-start-gate.ts":"1a734d87d44093198cda60bafff96d963b1e62510acb5f4e1fa4e3f3a60d1704","lib/hanja-stroke-start-gate.test.ts":"0f0ea878d6a2c10f7104bfa92440bf8d7e4e2f3bb64efd78d40a44c76ad132c8","lib/hanja-stroke-start-gate-si.ts":"57806d5be50d813dfbfbcb21ffc2056aa968a2f900cf4da72ba649582eecce73","lib/hanja-stroke-start-gate-si.test.ts":"f939e0d4113e3cce88fba3c6f61be47fa4e6f1543236c31ddee360bea112b515","lib/hanja-stroke-start-gate-di.ts":"53c2bd788f47d4c183ae826e52c767bb628e7e1c828cb59dec25f139106bfde6","lib/hanja-stroke-start-gate-di.test.ts":"ff43c4ce6d608439b84e9dab200fd4c48a004580a617b82019179829243fe160","lib/hanja-stroke-start-gate-can.ts":"472be0fadeb11edc77d89fb3645a809f9a9f062387af99fcda335616d8ad60f7","lib/hanja-stroke-start-gate-can.test.ts":"97f12ba390197e4ef5178eed70ef1662b508879656a26690c2bc25d62d504572","lib/hanja-stroke-start-gate-u7277.ts":"43757c391fc54957e04ae8f7116aa57dce06c8dc49f700b62ca2a4bd6046946b","lib/hanja-stroke-start-gate-u7277.test.ts":"fc30aeb5a2fbbce1170f8c57ce9918e3a04f3a8e1d685717abc70f63240cced1","lib/hanja-stroke-start-gate-u6303.ts":"9774d49905f6d8f98c18d8e585296769065916f40de9a84e09254ea4b73c7ef8","lib/hanja-stroke-start-gate-u6303.test.ts":"53f23c6ca557be839353a971ba250678c1ccc08b40c61efc6a6bb19cb678e756"};for(const[p,h]of Object.entries(pins))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),h)
})
