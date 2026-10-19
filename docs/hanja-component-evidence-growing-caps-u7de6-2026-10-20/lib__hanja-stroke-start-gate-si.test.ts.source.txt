import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import ts from 'typescript'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedSiContext,reviewedSiPolicy,measureReviewedSiCapsFrame,commitReviewedSiCaps,type ReviewedSiNodes} from './hanja-stroke-start-gate-si.ts'
import {remainingQState,growingCapsState} from '../docs/hanja-renderer-growing-caps-order9-u7de6-twelve-targets-experiment-2026-10-20/render.mjs'
const strokes=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-order9-u7de6-source-experiment-2026-10-20/fixtures.json',import.meta.url),'utf8')).u7de6.strokes as HanjaOutlineStrokes
const targets=[[0,0],[0,1],[1,0],[1,1],[2,0],[4,0],[5,0],[7,0],[11,0],[12,0],[13,0],[14,0]] as const
const nativeLengths=[23.266868591308594,20.629228591918945,42.50424575805664,30.83692169189453,21.052942276000977,28.27726936340332,22.013219833374023,70.5625,24.747604370117188,49.74114608764648,20.627988815307617,24.61147117614746]
const context=reviewedSiContext(strokes)
function siPolicyAt(i:number){const[p,m]=targets[i],policy=reviewedSiPolicy(context,p,m);assert(policy);return policy}
const clone=()=>JSON.parse(JSON.stringify(strokes)) as HanjaOutlineStrokes
function fakeSi(i:number,id='si-'+i){
  const policy=siPolicyAt(i),segment=policy.segment,q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number),L=nativeLengths[i],events:string[]=[]
  const document={defaultView:null as unknown},view={document,getComputedStyle:(n:Element)=>{const x=n as unknown as {cssTransform:string;cssTranslate:string};return{transform:x.cssTransform,getPropertyValue:(key:string)=>key==='translate'?x.cssTranslate:'none'}}};document.defaultView=view
  let owner:SVGSVGElement
  const node=(name:string,attrs:Record<string,string>)=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:document,parentElement:null as unknown,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},getAttribute(key:string){return this.attrs[key]??null},setAttribute(key:string,value:string){this.attrs[key]=value;events.push(name+':'+key+'='+value)},removeAttribute(key:string){delete this.attrs[key]}})
  const svg=node('svg',{});owner=svg as unknown as SVGSVGElement
  const group=node('g',{}),target=node('g',{'data-stroke-start-gate':policy.id}),defs=node('defs',{}),mask=node('mask',{id:id+'-si-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'})
  group.parentElement=svg;target.parentElement=group;defs.parentElement=target;mask.parentElement=defs
  let pointHook:((d:number)=>{x:number;y:number})|null=null,lengthHook:(()=>void)|null=null,length=L
  let reads=0,pointReads=0
  const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-si-measurement':'true',id:id+'-si-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('measure:length');lengthHook?.();return length},getPointAtLength(d:number){pointReads++;events.push('measure:point');return pointHook?pointHook(d):{x:q0[0]+d/L,y:q0[1]+d/L}}})
  const guide=Object.assign(node('path',{'data-growing-owner':id,id:id+'-si-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),{getTotalLength(){throw Error('dash is not measurement guide')},getPointAtLength(){throw Error('dash is not measurement guide')}})
  const startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('ink',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-si-growing)',visibility:'hidden'})
  measurement.parentElement=defs;guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
  const nodes={measurement,guide,startCap,endCap,ink} as unknown as ReviewedSiNodes
  return{policy,segment,q0,L,id,owner,svg,document,view,group,target,defs,mask,measurement,guide,startCap,endCap,ink,nodes,events,counts:()=>({reads,pointReads}),pointHook:(fn:typeof pointHook)=>{pointHook=fn},lengthHook:(fn:typeof lengthHook)=>{lengthHook=fn},setLength:(n:number)=>{length=n}}
}

test('緦 fixed whole twelve own certificates and strict target fields',()=>{
 assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),'3be1dfd27da843c9e8f7220440bd779a643d97b7b2df66bf5e2599b384e86d79')
 assert(context);assert.equal(reviewedSiPolicy({id:'u7de6-order9'},0,0),null)
 let targetCount=0
 for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++){
  const policy=reviewedSiPolicy(context,p,m),i=targets.findIndex(([x,y])=>x===p&&y===m)
  assert.equal(!!policy,i>=0)
  const extra=clone();Object.assign(extra[p][m],{extra:true});assert.equal(reviewedSiContext(extra),null)
  for(const key of Object.keys(strokes[p][m])){const changed=clone(),s=changed[p][m]as unknown as Record<string,unknown>;s[key]=key==='bounds'?[0,0,1,1]:typeof s[key]==='number'?Number(s[key])+1:String(s[key])+' ';assert.equal(reviewedSiContext(changed),null)}
  if(!policy)continue;targetCount++
  assert(Object.isFrozen(policy));assert(Object.isFrozen(policy.segment));assert(Object.isFrozen(policy.segment.bounds));assert(Object.isFrozen(policy.certificate));assert.equal(policy.certificate.initialArcMax,7);assert.equal(policy.certificate.notRasterProof,true)
  assert.throws(()=>{policy.segment.weight+=1});assert.throws(()=>{(policy.segment.bounds as number[])[0]+=1})
  for(const local of[.000001,.03,.5,.95,.9999]){
   const f=fakeSi(i),actual=measureReviewedSiCapsFrame(policy,policy.segment,local,f.nodes.measurement),point=actual.point
   const expected=p===7||p===12?growingCapsState(policy.segment,local,nativeLengths[i],point):remainingQState(policy.segment,local,nativeLengths[i],point)
   assert.equal(actual.d,expected.d);assert.equal(actual.rho,expected.rho);assert.deepEqual(actual.q0,expected.q0);assert.deepEqual(actual.point,expected.point);assert.equal(actual.progress,local);assert.deepEqual(f.counts(),{reads:1,pointReads:1})
  }
 }
 assert.equal(targetCount,12)
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate.ts',import.meta.url))).digest('hex'),'1a734d87d44093198cda60bafff96d963b1e62510acb5f4e1fa4e3f3a60d1704')
 assert.equal(createHash('sha256').update(readFileSync(new URL('./hanja-stroke-start-gate.test.ts',import.meta.url))).digest('hex'),'0f0ea878d6a2c10f7104bfa92440bf8d7e4e2f3bb64efd78d40a44c76ad132c8')
})
test('緦 same-frame twelve UA paths and coordinate tampering fail closed',()=>{
 let rejected=0
 for(let i=0;i<targets.length;i++){
  const f=fakeSi(i),ok=commitReviewedSiCaps(f.policy,f.segment,.03,f.id,f.nodes)
  assert.equal(ok.status,'visible');assert(ok.frame);assert.equal(f.events.at(-1),'ink:visibility=visible');assert.deepEqual(f.counts(),{reads:1,pointReads:1});assert.equal(f.startCap.attrs.r,String(ok.frame.rho));ok.cleanup();assert.equal(f.ink.attrs.visibility,'hidden')
  for(const p of[0,1]){const z=fakeSi(i),r=commitReviewedSiCaps(z.policy,z.segment,p,z.id,z.nodes);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(z.counts(),{reads:0,pointReads:0})}
  const mutations:Array<(x:ReturnType<typeof fakeSi>)=>void>=[x=>{x.measurement.attrs.pathLength='1'},x=>{x.guide.attrs.pathLength='2'},x=>{x.guide.attrs.d+=' '},x=>{x.measurement.attrs.d+=' '},x=>{x.guide.attrs['stroke-width']='13'},x=>{x.guide.attrs['stroke-linecap']='round'},x=>{x.ink.attrs.mask='url(#wrong)'},x=>{x.mask.attrs.maskUnits='objectBoundingBox'},x=>{x.setLength(NaN)},x=>{x.setLength(6)},x=>{x.pointHook(()=>({x:NaN,y:0}))}]
  for(const name of['measurement','guide','startCap','endCap','ink','mask','defs','target','group','svg']as const)mutations.push(x=>{x[name].attrs.transform='translate(10 0)'},x=>{x[name].cssTransform='matrix(1,0,0,1,10,0)'},x=>{x[name].cssTranslate='10px'},x=>{x[name].ownerDocument={}as typeof x.document},x=>{x[name].parentElement={}})
  for(const phase of['before','length','point']as const)for(const[index,mutate]of mutations.entries()){
   if(phase==='point'&&index>=8&&index<=10)continue // Changing a future mock length/hook does not invalidate the already-read frame.
   const x=fakeSi(i);if(phase==='before')mutate(x);if(phase==='length')x.lengthHook(()=>mutate(x));if(phase==='point')x.pointHook(d=>{mutate(x);return{x:x.q0[0]+d/x.L,y:x.q0[1]+d/x.L}})
   const result=commitReviewedSiCaps(x.policy,x.segment,.03,x.id,x.nodes);assert.equal(result.status,'hidden');assert.equal(x.ink.attrs.visibility,'hidden');assert.equal(x.startCap.attrs.r,'0');assert.equal(x.endCap.attrs.r,'0');assert.equal(x.guide.attrs['stroke-dasharray'],'0 2');rejected++
  }
  for(const p of[NaN,Infinity,-1,1.01]){const x=fakeSi(i);assert.equal(commitReviewedSiCaps(x.policy,x.segment,p,x.id,x.nodes).status,'hidden');assert.deepEqual(x.counts(),{reads:0,pointReads:0})}
  const forged=fakeSi(i);assert.equal(commitReviewedSiCaps({...forged.policy},forged.segment,.03,forged.id,forged.nodes).status,'hidden')
 }
 assert.equal(rejected,2160)
})
async function actualSiComponent(){
 const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),timing=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8').split('\n')
 const timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>{const line=timing.find(l=>l.startsWith(prefix));assert(line);return line}).join('\n')).toString('base64')
 let js=ts.transpileModule(source+'\nexport {SiCapsOutline}\n',{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
 for(const[from,to]of[['@/lib/hanja-strokes',timingURL],['@/lib/hanja-stroke-outline',new URL('./hanja-stroke-outline.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate-si',new URL('./hanja-stroke-start-gate-si.ts',import.meta.url).href],['@/lib/hanja-stroke-start-gate',new URL('./hanja-stroke-start-gate.ts',import.meta.url).href],['react/jsx-runtime',import.meta.resolve('react/jsx-runtime')],['react',import.meta.resolve('react')]])js=js.replaceAll("'"+from+"'",JSON.stringify(to)).replaceAll('"'+from+'"',JSON.stringify(to))
 return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
}
test('緦 actual component SSR hidden partials and exact full-round whole prefixes',async()=>{
 const{SiCapsOutline,StrokeOutlines}=await actualSiComponent()
 for(let i=0;i<targets.length;i++){
  const policy=siPolicyAt(i),render=(progress:number)=>renderToStaticMarkup(createElement('svg',null,createElement(SiCapsOutline,{policy,segment:policy.segment,progress,clipId:'si-ssr-'+i})))
  const zero=render(0);assert(!zero.includes('d="'+policy.segment.outline+'"'));assert(zero.includes('data-si-measurement="true"'))
  for(const p of[.000001,.5,.99999999]){const partial=render(p);assert(partial.includes('visibility="hidden"'));assert(partial.includes('d="'+policy.segment.outline+'" mask="url(#si-ssr-'+i+'-si-growing)"'));assert(!partial.includes('data-growing-full-round'))}
  const full=render(1);assert(full.includes('data-growing-full-round="true"'));assert(full.includes('d="'+policy.segment.outline+'" mask="url(#si-ssr-'+i+')"'));assert(full.includes('stroke-linecap="round"'));assert(full.includes('stroke-linejoin="miter"'))
 }
 const whole=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'idle',manual:null,count:15})))
 assert.equal((whole.match(/data-stroke-reveal-policy="growing-si-caps"/g)||[]).length,12);assert.equal((whole.match(/data-growing-full-round="true"/g)||[]).length,12)
 const component=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),oldChildren=component.slice(component.indexOf('/** Mounted even'),component.indexOf('/** Mounted even')+9556)
 assert.equal(createHash('sha256').update(oldChildren.trimEnd()).digest('hex'),'f7866df32963acb0443109008e502c1137cf6350316871770472819f3d3b289c')
 assert(component.includes('Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN'))
})
test('緦 public JSON segment failed-tail accepts exact fields instead of private reference',()=>{
 for(let i=0;i<targets.length;i++){
  const [p,m]=targets[i],x=fakeSi(i),publicSegment=strokes[p][m]
  assert.notEqual(publicSegment,x.policy.segment)
  const result=commitReviewedSiCaps(x.policy,publicSegment,.03,x.id,x.nodes)
  assert.equal(result.status,'visible');assert.deepEqual(x.counts(),{reads:1,pointReads:1});result.cleanup()
  for(const key of Object.keys(publicSegment)){
   const s=JSON.parse(JSON.stringify(publicSegment)) as typeof publicSegment,record=s as unknown as Record<string,unknown>
   record[key]=key==='bounds'?[0,0,1,1]:typeof record[key]==='number'?Number(record[key])+1:String(record[key])+' '
   const y=fakeSi(i);assert.equal(commitReviewedSiCaps(y.policy,s,.03,y.id,y.nodes).status,'hidden');assert.deepEqual(y.counts(),{reads:0,pointReads:0})
  }
 }
})
