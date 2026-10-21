import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import ts from 'typescript'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU8a29Context,reviewedU8a29Policy,measureReviewedU8a29Frame,commitReviewedU8a29Caps,REVIEWED_U8A29_SOURCE} from './hanja-stroke-start-gate-u8a29.ts'
// UA API는 mock이며 실제 browser/제품 UI 승인이 아니다. 저장된 고유 곡률 산술을 재계산하지 않는다.
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-hv-vh-u8a29-source-experiment-2026-10-21/fixtures.json',import.meta.url),'utf8'))
const strokes=fixture.u8a29.strokes as HanjaOutlineStrokes,targets=[[7,0],[8,0]] as const
const context=reviewedU8a29Context(strokes),clone=()=>JSON.parse(JSON.stringify(strokes)) as HanjaOutlineStrokes
function selected(i:number){const[p,m]=targets[i],policy=reviewedU8a29Policy(context,p,m);assert(policy);return policy}
function fake(i:number){
 const policy=selected(i),segment=policy.segment,id='u8a29-test-'+i,L=100,events:string[]=[]
 const doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view
 let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg
 const group=node('g'),target=node('g',{'data-stroke-start-gate':policy.id,'data-u8a29-progress':'.5','data-u8a29-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u8a29-measurement':'true',id:id+'-u8a29-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u8a29-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u8a29-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u8a29-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 const nodes={measurement,guide,startCap,endCap,ink}
 return{policy,segment,id,L,q0,doc,view,node,svg,owner,group,target,defs,measurement,mask,guide,startCap,endCap,ink,completed,nodes,events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(fn:()=>void)=>{lengthHook=fn},onPoint:(fn:(d:number)=>{x:number;y:number})=>{pointHook=fn}}
}
function dispatch(x:ReturnType<typeof fake>,p:number,s=x.segment){return commitReviewedU8a29Caps(x.policy,s,p,x.id,x.nodes as any)}
function commit(x:ReturnType<typeof fake>,p:number,s=x.segment){x.target.attrs['data-u8a29-progress']=String(p);return dispatch(x,p,s)}


test('訩 exact source and two private frozen stored MQ certificates',()=>{
 assert(context);assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),REVIEWED_U8A29_SOURCE.geometrySHA256)
 assert.equal(REVIEWED_U8A29_SOURCE.full5SHA256,'b56d6a71c7835c50f2dba80ea1f66a9b61d076ec166128476da75d4cc5cef8d1');assert.equal(REVIEWED_U8A29_SOURCE.actualComponentApproval,false);assert.equal(REVIEWED_U8A29_SOURCE.runtimeApplied,false)
 let n=0;for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)if(reviewedU8a29Policy(context,p,m))n++;assert.equal(n,2)
 for(let i=0;i<2;i++){const p=selected(i);assert(Object.isFrozen(p)&&Object.isFrozen(p.segment)&&Object.isFrozen(p.segment.bounds)&&Object.isFrozen(p.certificate.storedBounds));assert.deepEqual([p.certificate.T,p.certificate.K],['1/2','1/100']);assert.equal(p.certificate.notPreviousMaskConnectivityProof,true);assert.equal(reviewedU8a29Policy({...context!},...targets[i]),null);assert.throws(()=>{(p.segment.bounds as number[])[0]++})}
})
test('訩 all material fields and JSON structure fail closed',()=>{
 const failedTail=globalThis.process?.env.LINGO_U8A29_FAILED_FIELDS_TAIL==='1';let changed=failedTail?56:0;if(!failedTail)for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)for(const key of Object.keys(strokes[p][m])){const x=clone(),s=x[p][m] as any;const before=JSON.stringify(s);if(key==='bounds')s.bounds[0]+=.01;else if(typeof s[key]==='number')s[key]+=.01;else s[key]+=' ';assert.notEqual(JSON.stringify(s),before);assert.equal(reviewedU8a29Context(x),null);changed++}assert.equal(changed,56)
 for(const level of['whole','pen','bounds']){const x=clone(),a=level==='whole'?x:level==='pen'?x[7]:x[7][0].bounds;delete(a as any)[0];assert.equal(reviewedU8a29Context(x),null);const proto=Object.create(Array.prototype);proto[0]=level==='whole'?strokes[0]:level==='pen'?strokes[7][0]:strokes[7][0].bounds[0];Object.setPrototypeOf(a,proto);assert.equal(reviewedU8a29Context(x),null)}
 for(const inherited of[true,false]){const x=clone(),s=x[7][0] as any,v=s.weight;delete s.weight;if(inherited)Object.setPrototypeOf(s,{weight:v});else Object.defineProperty(s,'weight',{value:v,enumerable:false});s.extra=v;assert.equal(reviewedU8a29Context(x),null)}
 for(const key of['extra',Symbol('extra')]){const x=clone();Object.defineProperty(x[8][0],key,{value:1,enumerable:false});assert.equal(reviewedU8a29Context(x),null)}
 let accessorReads=0;const a=clone();Object.defineProperty(a[7][0],'weight',{get(){accessorReads++;return strokes[7][0].weight},enumerable:true});assert.equal(reviewedU8a29Context(a),null);assert.equal(accessorReads,0)
 for(let i=0;i<2;i++){const x=fake(i),s={...x.segment,weight:x.segment.weight+.01};assert.equal(commit(x,.5,s).status,'hidden');assert.deepEqual(x.counts(),[0,0])}
})
test('訩 canonical distance six attributes and caps commit atomically then clean',()=>{
 for(let i=0;i<2;i++){const x=fake(i),r=commit(x,.03);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,3);assert.equal(r.frame.rho,3);assert.equal(x.ink.getAttribute('data-growing-distance'),'3');assert.equal(x.ink.getAttribute('data-growing-radius'),'3');assert.equal(x.ink.getAttribute('data-growing-end-x'),String(r.frame.point.x));assert.equal(x.startCap.getAttribute('cx'),String(x.q0[0]));assert.equal(x.startCap.getAttribute('cy'),String(x.q0[1]));assert.equal(x.endCap.getAttribute('cx'),String(r.frame.point.x));assert.equal(x.startCap.getAttribute('r'),'3');assert.equal(x.endCap.getAttribute('r'),'3');assert(!Object.keys(x.ink.attrs).some(k=>k.includes('canstance')));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null);assert.equal(x.startCap.getAttribute('r'),'0');assert.equal(x.endCap.getAttribute('r'),'0')}
})
test('訩 empty and complete never measure; invalid progress and private impostors hide',()=>{
 for(let i=0;i<2;i++){for(const p of[0,1]){const x=fake(i),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}for(const p of[NaN,Infinity,-.1,1.1]){const x=fake(i);assert.equal(commit(x,p).status,'hidden');assert.deepEqual(x.counts(),[0,0])}const x=fake(i);x.target.attrs['data-u8a29-progress']='0.5';assert.equal(commitReviewedU8a29Caps({...x.policy},x.segment,.5,x.id,x.nodes as any).status,'hidden');assert.deepEqual(x.counts(),[0,0])}
})
test('訩 coordinate parent owner transform frame mutations reject before between after reads',()=>{
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u8a29-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(let i=0;i<2;i++)for(const mutate of mutations)for(const when of['before','length','point']){const x=fake(i);if(when==='before'){x.target.attrs['data-u8a29-progress']='0.5';mutate(x)}else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden')}
 for(let i=0;i<2;i++){for(const L of[NaN,Infinity,-1,0,7]){const x=fake(i);x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0])}const x=fake(i);x.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(x,.5).status,'hidden');const y=fake(i);y.guide.writeHook=k=>{if(k==='stroke-dasharray'&&y.counts()[1])y.target.attrs['data-u8a29-progress']='.25'};assert.equal(commit(y,.5).status,'hidden')}
})
const u8a29AddedImport="import { reviewedU8a29Context, reviewedU8a29Policy, commitReviewedU8a29Caps, type ReviewedU8a29Policy } from '@/lib/hanja-stroke-start-gate-u8a29'\n"
const u8a29AddedContext="  const u8a29Context = reviewedU8a29Context(strokes)\n"
const u8a29AddedBranch="        const u8a29Policy = reviewedU8a29Policy(u8a29Context, stroke, index)\n        if (u8a29Policy) return <U8a29CapsOutline key={index} policy={u8a29Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />\n"
const u8a29AddedChild="function U8a29CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU8a29Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {\n  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)\n  useLayoutEffect(()=>{\n    const committed=commitReviewedU8a29Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})\n    return committed.cleanup\n  },[policy,segment,progress,clipId])\n  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1\n  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy=\"growing-u8a29-caps\" data-u8a29-progress={String(progress)} data-u8a29-clip={clipId} data-stroke-reveal-progress={valid?progress:'invalid'}>\n    <defs>\n      <path ref={measurement} id={clipId+'-u8a29-measure'} data-growing-owner={clipId} data-u8a29-measurement=\"true\" d={segment.revealPath} fill=\"none\" stroke=\"none\" visibility=\"hidden\" />\n      <mask id={clipId} maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"100\" height=\"100\">\n        <path d={segment.revealPath} fill=\"none\" stroke=\"white\" strokeWidth={segment.revealWidth} strokeLinecap=\"round\" strokeLinejoin=\"miter\" pathLength=\"1\" strokeDasharray=\"1 2\" strokeDashoffset={0} />\n      </mask>\n      <mask id={clipId+'-u8a29-growing'} maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"100\" height=\"100\">\n        <path ref={guide} id={clipId+'-u8a29-guide'} data-growing-owner={clipId} d={segment.revealPath} fill=\"none\" stroke=\"white\" strokeWidth={segment.revealWidth} strokeLinecap=\"butt\" strokeLinejoin=\"miter\" pathLength=\"1\" strokeDasharray=\"0 2\" strokeDashoffset={0} />\n        <circle ref={startCap} data-growing-owner={clipId} cx=\"0\" cy=\"0\" r=\"0\" fill=\"white\" />\n        <circle ref={endCap} data-growing-owner={clipId} cx=\"0\" cy=\"0\" r=\"0\" fill=\"white\" />\n      </mask>\n    </defs>\n    {valid&&progress===1&&<path key=\"u8a29-full-round-ink\" data-growing-full-round=\"true\" d={segment.outline} mask={'url(#'+clipId+')'} />}\n    {valid&&progress>0&&progress<1&&<path key=\"u8a29-growing-ink\" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u8a29-growing)'} visibility=\"hidden\" />}\n  </g>\n}\n"
let u8a29Components:Promise<any>|undefined
async function actualU8a29Components(){
 if(u8a29Components)return u8a29Components
 u8a29Components=(async()=>{
  const current=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8')
  for(const token of[u8a29AddedImport,u8a29AddedContext,u8a29AddedBranch,u8a29AddedChild])assert.equal(current.split(token).length,2)
  const prior=current.replace(u8a29AddedImport,'').replace(u8a29AddedContext,'').replace(u8a29AddedBranch,'').replace(u8a29AddedChild,'')
  assert.equal(createHash('sha256').update(prior).digest('hex'),'2a15c7489c8bcde9c607faf7f48af611359dfb6625fc5eeaedcaaa5cc4a4a3c9')
  const timingSource=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8').split('\n'),timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>{const line=timingSource.find(l=>l.startsWith(prefix));assert(line);return line}).join('\n')).toString('base64')
  async function load(input:string,extra:string){
   const marker='const [elapsed, setElapsed] = useState(0)';assert(input.includes(marker))
   const prepared=input.replace(marker,'const [elapsed, setElapsed] = useState(Number((globalThis as typeof globalThis & {__u8a29TestElapsed?:number}).__u8a29TestElapsed??0))')+extra
   let js=ts.transpileModule(prepared,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
   js=js.replace(/(['"])@\/lib\/([a-z0-9-]+)\1/g,(_all,_quote,name)=>JSON.stringify(name==='hanja-strokes'?timingURL:new URL('./'+name+'.ts',import.meta.url).href))
   for(const name of['react/jsx-runtime','react'])js=js.replaceAll("'"+name+"'",JSON.stringify(import.meta.resolve(name))).replaceAll('"'+name+'"',JSON.stringify(import.meta.resolve(name)))
   assert(!js.includes('@/lib/'));return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
  }
  const next=await load(current,'\nexport {U8a29CapsOutline}\n'),previous=await load(prior,'')
  return{...next,PriorStrokeOutlines:previous.StrokeOutlines,timing:await import(timingURL)}
 })();return u8a29Components
}
function u8a29Group(html:string,key:string,value:string){const match=[...html.matchAll(/<g\b[^>]*>/g)].find(m=>m[0].includes(key+'="'+value+'"'));assert(match,'missing group '+key+'='+value);let depth=0;const start=match.index!;for(const token of html.slice(start).matchAll(/<g\b[^>]*>|<\/g>/g)){depth+=token[0].startsWith('</')?-1:1;if(depth===0)return html.slice(start,start+token.index!+token[0].length)}throw Error('unclosed target group')}
function u8a29ElementTag(html:string,tag:string,field:string,value:string){return[...html.matchAll(new RegExp('<'+tag+'\\b[^>]*>','g'))].map(m=>m[0]).find(s=>s.includes(field+'="'+value+'"'))}
function u8a29SSR(component:any,props:any){return renderToStaticMarkup(createElement('svg',null,createElement(component,props)))}

test('訩 actual child SVG SSR empty partial and original fullround contracts',async()=>{
 const c=await actualU8a29Components();let count=0
 for(let i=0;i<2;i++){const policy=selected(i);for(const p of[0,1e-6,.5,.99999999,1,NaN]){const html=u8a29SSR(c.U8a29CapsOutline,{policy,segment:policy.segment,progress:p,clipId:'u8a29-ssr-'+i}),g=u8a29Group(html,'data-stroke-start-gate',policy.id),measurement=u8a29ElementTag(g,'path','data-u8a29-measurement','true');assert(measurement);assert(!measurement.includes('pathLength='));assert(measurement.includes('d="'+policy.segment.revealPath+'"'));assert(g.includes('data-u8a29-progress="'+String(p)+'"'));
 if(p===1){const full=u8a29ElementTag(g,'path','data-growing-full-round','true');assert(full);assert(full.includes('mask="url(#u8a29-ssr-'+i+')"'));assert(g.includes('stroke-linecap="round"'));assert(!full.includes('visibility='))}
 else if(p>0&&p<1){const partial=[...g.matchAll(/<path\b[^>]*>/g)].map(m=>m[0]).find(s=>s.includes('d="'+policy.segment.outline+'"'));assert(partial);assert(partial.includes('visibility="hidden"'));assert(partial.includes('mask="url(#u8a29-ssr-'+i+'-u8a29-growing)"'));assert(g.includes('stroke-linecap="butt"')&&g.includes('stroke-linejoin="miter"'))}
 else{assert(!g.includes('data-growing-full-round="true"'));assert(!g.includes('d="'+policy.segment.outline+'"'))}count++}}assert.equal(count,12)
})
test('訩 actual clock source weights and whole prefix exact completion',async()=>{
 const c=await actualU8a29Components(),globals=globalThis as any
 try{for(let i=0;i<2;i++){const[pen,mask]=targets[i],segments=strokes[pen],sum=segments.reduce((s,m)=>s+m.weight,0),before=segments.slice(0,mask).reduce((s,m)=>s+m.weight,0),penProgress=(before+.5*segments[mask].weight)/sum;globals.__u8a29TestElapsed=pen*(c.timing.STROKE_DURATION+c.timing.STROKE_GAP)+penProgress*c.timing.STROKE_DURATION;const html=u8a29SSR(c.StrokeOutlines,{strokes,clock:{current:[]},phase:'playing',count:pen,manual:false}),g=u8a29Group(html,'data-stroke-start-gate',selected(i).id);assert(Math.abs(Number(/data-stroke-reveal-progress="([^"]+)"/.exec(g)![1])-.5)<1e-12);assert(g.includes('visibility="hidden"'))}
 for(const phase of['idle','done']){const html=u8a29SSR(c.StrokeOutlines,{strokes,clock:{current:[]},phase,count:11,manual:false});assert.equal((html.match(/data-growing-full-round="true"/g)||[]).length,2);for(let i=0;i<2;i++)assert(u8a29Group(html,'data-stroke-start-gate',selected(i).id).includes('data-stroke-reveal-progress="1"'))}
 for(const count of[0,8,9,11]){const html=u8a29SSR(c.StrokeOutlines,{strokes,clock:{current:[]},phase:'paused',count,manual:true});for(let i=0;i<2;i++){const[pen]=targets[i],g=u8a29Group(html,'data-stroke-start-gate',selected(i).id);assert(g.includes('data-stroke-reveal-progress="'+(pen<count?1:0)+'"'));if(pen>=count)assert(!g.includes('data-growing-full-round="true"'))}}
 }finally{delete globals.__u8a29TestElapsed}
})
test('訩 existing children inverse bytes and nine ordinary rows parity81',async()=>{
 const c=await actualU8a29Components(),globals=globalThis as any,ordinary=[0,1,2,3,4,5,6,9,10];let compared=0
 try{for(const pen of ordinary)for(const p of[0,.125,.25,.375,.5,.625,.75,.875,1]){globals.__u8a29TestElapsed=pen*(c.timing.STROKE_DURATION+c.timing.STROKE_GAP)+p*c.timing.STROKE_DURATION;const props={strokes,clock:{current:[]},phase:'playing',count:pen,manual:false},next=u8a29SSR(c.StrokeOutlines,props),prior=u8a29SSR(c.PriorStrokeOutlines,props);assert.equal(u8a29Group(next,'data-outline-stroke',String(pen+1)),u8a29Group(prior,'data-outline-stroke',String(pen+1)));compared++}assert.equal(compared,81)}finally{delete globals.__u8a29TestElapsed}
})
