import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import ts from 'typescript'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU4fd3Context,reviewedU4fd3Policy,measureReviewedU4fd3Frame,commitReviewedU4fd3Caps,REVIEWED_U4FD3_SOURCE} from './hanja-stroke-start-gate-u4fd3.ts'
// UA API는 mock이며 실제 browser/제품 UI 승인이 아니다. 저장된 고유 곡률 산술을 재계산하지 않는다.
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-qq3-u4fd3-source-experiment-2026-10-21/fixtures.json',import.meta.url),'utf8'))
const strokes=fixture.u4fd3.strokes as HanjaOutlineStrokes,targets=[[0,0],[3,0],[3,1],[4,0],[4,1],[5,0],[5,1]] as const
const context=reviewedU4fd3Context(strokes),clone=()=>JSON.parse(JSON.stringify(strokes)) as HanjaOutlineStrokes
function selected(i:number){const[p,m]=targets[i],policy=reviewedU4fd3Policy(context,p,m);assert(policy);return policy}
function fake(i:number){
 const policy=selected(i),segment=policy.segment,id='u4fd3-test-'+i,L=100,events:string[]=[]
 const doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view
 let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg
 const group=node('g'),target=node('g',{'data-stroke-start-gate':policy.id,'data-u4fd3-progress':'.5','data-u4fd3-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u4fd3-measurement':'true',id:id+'-u4fd3-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u4fd3-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u4fd3-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u4fd3-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 const nodes={measurement,guide,startCap,endCap,ink}
 return{policy,segment,id,L,q0,doc,view,node,svg,owner,group,target,defs,measurement,mask,guide,startCap,endCap,ink,completed,nodes,events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(fn:()=>void)=>{lengthHook=fn},onPoint:(fn:(d:number)=>{x:number;y:number})=>{pointHook=fn}}
}
function dispatch(x:ReturnType<typeof fake>,p:number,s=x.segment){return commitReviewedU4fd3Caps(x.policy,s,p,x.id,x.nodes as any)}
function commit(x:ReturnType<typeof fake>,p:number,s=x.segment){x.target.attrs['data-u4fd3-progress']=String(p);return dispatch(x,p,s)}


test('俓 exact source and seven private frozen stored MQ certificates',()=>{
 assert(context);assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),REVIEWED_U4FD3_SOURCE.geometrySHA256)
 assert.equal(REVIEWED_U4FD3_SOURCE.full5SHA256,'655ccee1ebef3e043e7e2b3d1fdf4f6a8fd299cd2e84fb6c0650d158b1bfb936');assert.equal(REVIEWED_U4FD3_SOURCE.actualComponentApproval,false);assert.equal(REVIEWED_U4FD3_SOURCE.runtimeApplied,false)
 let n=0;for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)if(reviewedU4fd3Policy(context,p,m))n++;assert.equal(n,7)
 for(let i=0;i<targets.length;i++){const p=selected(i);assert(Object.isFrozen(p)&&Object.isFrozen(p.segment)&&Object.isFrozen(p.segment.bounds)&&Object.isFrozen(p.certificate.storedBounds));assert.deepEqual([p.certificate.T,p.certificate.K],[["1/4","1/100"],["1/2","1/40"],["1/2","1/25"],["1/2","1/40"],["1/2","1/25"],["1/2","1/40"],["1/2","1/25"]][i]);assert.equal(p.certificate.notPreviousMaskConnectivityProof,true);assert.equal(reviewedU4fd3Policy({...context!},...targets[i]),null);assert.throws(()=>{(p.segment.bounds as number[])[0]++})}
})
test('俓 all material fields and JSON structure fail closed',()=>{
 let changed=0;for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)for(const key of Object.keys(strokes[p][m])){const x=clone(),s=x[p][m] as any;const before=JSON.stringify(s);if(key==='bounds')s.bounds[0]+=.01;else if(typeof s[key]==='number')s[key]+=.01;else s[key]+=' ';assert.notEqual(JSON.stringify(s),before);assert.equal(reviewedU4fd3Context(x),null);changed++}assert.equal(changed,62)
 for(const level of['whole','pen','bounds']){const x=clone(),a=level==='whole'?x:level==='pen'?x[0]:x[0][0].bounds;delete(a as any)[0];assert.equal(reviewedU4fd3Context(x),null);const proto=Object.create(Array.prototype);proto[0]=level==='whole'?strokes[0]:level==='pen'?strokes[0][0]:strokes[0][0].bounds[0];Object.setPrototypeOf(a,proto);assert.equal(reviewedU4fd3Context(x),null)}
 for(const inherited of[true,false]){const x=clone(),s=x[0][0] as any,v=s.weight;delete s.weight;if(inherited)Object.setPrototypeOf(s,{weight:v});else Object.defineProperty(s,'weight',{value:v,enumerable:false});s.extra=v;assert.equal(reviewedU4fd3Context(x),null)}
 for(const key of['extra',Symbol('extra')]){const x=clone();Object.defineProperty(x[0][0],key,{value:1,enumerable:false});assert.equal(reviewedU4fd3Context(x),null)}
 let accessorReads=0;const a=clone();Object.defineProperty(a[0][0],'weight',{get(){accessorReads++;return strokes[0][0].weight},enumerable:true});assert.equal(reviewedU4fd3Context(a),null);assert.equal(accessorReads,0)
 for(let i=0;i<targets.length;i++){const x=fake(i),s={...x.segment,weight:x.segment.weight+.01};assert.equal(commit(x,.5,s).status,'hidden');assert.deepEqual(x.counts(),[0,0])}
})
test('俓 canonical distance six attributes and caps commit atomically then clean',()=>{
 for(let i=0;i<targets.length;i++){const x=fake(i),r=commit(x,.03);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,3);assert.equal(r.frame.rho,3);assert.equal(x.ink.getAttribute('data-growing-distance'),'3');assert.equal(x.ink.getAttribute('data-growing-radius'),'3');assert.equal(x.ink.getAttribute('data-growing-end-x'),String(r.frame.point.x));assert.equal(x.startCap.getAttribute('cx'),String(x.q0[0]));assert.equal(x.startCap.getAttribute('cy'),String(x.q0[1]));assert.equal(x.endCap.getAttribute('cx'),String(r.frame.point.x));assert.equal(x.startCap.getAttribute('r'),'3');assert.equal(x.endCap.getAttribute('r'),'3');assert(!Object.keys(x.ink.attrs).some(k=>k.includes('canstance')));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null);assert.equal(x.startCap.getAttribute('r'),'0');assert.equal(x.endCap.getAttribute('r'),'0')}
})
test('俓 empty and complete never measure; invalid progress and private impostors hide',()=>{
 for(let i=0;i<targets.length;i++){for(const p of[0,1]){const x=fake(i),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}for(const p of[NaN,Infinity,-.1,1.1]){const x=fake(i);assert.equal(commit(x,p).status,'hidden');assert.deepEqual(x.counts(),[0,0])}const x=fake(i);x.target.attrs['data-u4fd3-progress']='0.5';assert.equal(commitReviewedU4fd3Caps({...x.policy},x.segment,.5,x.id,x.nodes as any).status,'hidden');assert.deepEqual(x.counts(),[0,0])}
})
test('俓 coordinate parent owner transform frame mutations reject before between after reads',()=>{
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u4fd3-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(let i=0;i<targets.length;i++)for(const mutate of mutations)for(const when of['before','length','point']){const x=fake(i);if(when==='before'){x.target.attrs['data-u4fd3-progress']='0.5';mutate(x)}else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden')}
 for(let i=0;i<targets.length;i++){for(const L of[NaN,Infinity,-1,0,7]){const x=fake(i);x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0])}const x=fake(i);x.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(x,.5).status,'hidden');const y=fake(i);y.guide.writeHook=k=>{if(k==='stroke-dasharray'&&y.counts()[1])y.target.attrs['data-u4fd3-progress']='.25'};assert.equal(commit(y,.5).status,'hidden')}
})
const u4fd3AddedImport="import { reviewedU4fd3Context, reviewedU4fd3Policy, commitReviewedU4fd3Caps, type ReviewedU4fd3Policy } from '@/lib/hanja-stroke-start-gate-u4fd3'\n"
const u4fd3AddedContext="  const u4fd3Context = reviewedU4fd3Context(strokes)\n"
const u4fd3AddedBranch="        const u4fd3Policy = reviewedU4fd3Policy(u4fd3Context, stroke, index)\n        if (u4fd3Policy) return <U4fd3CapsOutline key={index} policy={u4fd3Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />\n"
const u4fd3AddedChild="function U4fd3CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU4fd3Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {\n  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)\n  useLayoutEffect(()=>{\n    const committed=commitReviewedU4fd3Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})\n    return committed.cleanup\n  },[policy,segment,progress,clipId])\n  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1\n  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy=\"growing-u4fd3-caps\" data-u4fd3-progress={String(progress)} data-u4fd3-clip={clipId} data-stroke-reveal-progress={valid?progress:'invalid'}>\n    <defs>\n      <path ref={measurement} id={clipId+'-u4fd3-measure'} data-growing-owner={clipId} data-u4fd3-measurement=\"true\" d={segment.revealPath} fill=\"none\" stroke=\"none\" visibility=\"hidden\" />\n      <mask id={clipId} maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"100\" height=\"100\">\n        <path d={segment.revealPath} fill=\"none\" stroke=\"white\" strokeWidth={segment.revealWidth} strokeLinecap=\"round\" strokeLinejoin=\"miter\" pathLength=\"1\" strokeDasharray=\"1 2\" strokeDashoffset={0} />\n      </mask>\n      <mask id={clipId+'-u4fd3-growing'} maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"100\" height=\"100\">\n        <path ref={guide} id={clipId+'-u4fd3-guide'} data-growing-owner={clipId} d={segment.revealPath} fill=\"none\" stroke=\"white\" strokeWidth={segment.revealWidth} strokeLinecap=\"butt\" strokeLinejoin=\"miter\" pathLength=\"1\" strokeDasharray=\"0 2\" strokeDashoffset={0} />\n        <circle ref={startCap} data-growing-owner={clipId} cx=\"0\" cy=\"0\" r=\"0\" fill=\"white\" />\n        <circle ref={endCap} data-growing-owner={clipId} cx=\"0\" cy=\"0\" r=\"0\" fill=\"white\" />\n      </mask>\n    </defs>\n    {valid&&progress===1&&<path key=\"u4fd3-full-round-ink\" data-growing-full-round=\"true\" d={segment.outline} mask={'url(#'+clipId+')'} />}\n    {valid&&progress>0&&progress<1&&<path key=\"u4fd3-growing-ink\" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u4fd3-growing)'} visibility=\"hidden\" />}\n  </g>\n}\n"
let u4fd3Components:Promise<any>|undefined
async function actualU4fd3Components(){
 if(u4fd3Components)return u4fd3Components
 u4fd3Components=(async()=>{
  const current=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8')
  for(const token of[u4fd3AddedImport,u4fd3AddedContext,u4fd3AddedBranch,u4fd3AddedChild])assert.equal(current.split(token).length,2)
  const prior=current.replace(u4fd3AddedImport,'').replace(u4fd3AddedContext,'').replace(u4fd3AddedBranch,'').replace(u4fd3AddedChild,'')
  assert.equal(createHash('sha256').update(prior).digest('hex'),'e149a6c35233e3c6464007b15a0fec707746394601afd54eb17c2066cd05358f')
  const timingSource=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8').split('\n'),timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>{const line=timingSource.find(l=>l.startsWith(prefix));assert(line);return line}).join('\n')).toString('base64')
  async function load(input:string,extra:string){
   const marker='const [elapsed, setElapsed] = useState(0)';assert(input.includes(marker))
   const prepared=input.replace(marker,'const [elapsed, setElapsed] = useState(Number((globalThis as typeof globalThis & {__u4fd3TestElapsed?:number}).__u4fd3TestElapsed??0))')+extra
   let js=ts.transpileModule(prepared,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
   js=js.replace(/(['"])@\/lib\/([a-z0-9-]+)\1/g,(_all,_quote,name)=>JSON.stringify(name==='hanja-strokes'?timingURL:new URL('./'+name+'.ts',import.meta.url).href))
   for(const name of['react/jsx-runtime','react'])js=js.replaceAll("'"+name+"'",JSON.stringify(import.meta.resolve(name))).replaceAll('"'+name+'"',JSON.stringify(import.meta.resolve(name)))
   assert(!js.includes('@/lib/'));return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
  }
  const next=await load(current,'\nexport {U4fd3CapsOutline}\n'),previous=await load(prior,'')
  return{...next,PriorStrokeOutlines:previous.StrokeOutlines,timing:await import(timingURL)}
 })();return u4fd3Components
}
function u4fd3Group(html:string,key:string,value:string){const match=[...html.matchAll(/<g\b[^>]*>/g)].find(m=>m[0].includes(key+'="'+value+'"'));assert(match,'missing group '+key+'='+value);let depth=0;const start=match.index!;for(const token of html.slice(start).matchAll(/<g\b[^>]*>|<\/g>/g)){depth+=token[0].startsWith('</')?-1:1;if(depth===0)return html.slice(start,start+token.index!+token[0].length)}throw Error('unclosed target group')}
function u4fd3ElementTag(html:string,tag:string,field:string,value:string){return[...html.matchAll(new RegExp('<'+tag+'\\b[^>]*>','g'))].map(m=>m[0]).find(s=>s.includes(field+'="'+value+'"'))}
function u4fd3SSR(component:any,props:any){return renderToStaticMarkup(createElement('svg',null,createElement(component,props)))}

test('俓 actual child SVG SSR empty partial and original fullround contracts',async()=>{
 const c=await actualU4fd3Components();let count=0
 for(let i=0;i<targets.length;i++){const policy=selected(i);for(const p of[0,1e-6,.5,.99999999,1,NaN]){const html=u4fd3SSR(c.U4fd3CapsOutline,{policy,segment:policy.segment,progress:p,clipId:'u4fd3-ssr-'+i}),g=u4fd3Group(html,'data-stroke-start-gate',policy.id),measurement=u4fd3ElementTag(g,'path','data-u4fd3-measurement','true');assert(measurement);assert(!measurement.includes('pathLength='));assert(measurement.includes('d="'+policy.segment.revealPath+'"'));assert(g.includes('data-u4fd3-progress="'+String(p)+'"'));
 if(p===1){const full=u4fd3ElementTag(g,'path','data-growing-full-round','true');assert(full);assert(full.includes('mask="url(#u4fd3-ssr-'+i+')"'));assert(g.includes('stroke-linecap="round"'));assert(!full.includes('visibility='))}
 else if(p>0&&p<1){const partial=[...g.matchAll(/<path\b[^>]*>/g)].map(m=>m[0]).find(s=>s.includes('d="'+policy.segment.outline+'"'));assert(partial);assert(partial.includes('visibility="hidden"'));assert(partial.includes('mask="url(#u4fd3-ssr-'+i+'-u4fd3-growing)"'));assert(g.includes('stroke-linecap="butt"')&&g.includes('stroke-linejoin="miter"'))}
 else{assert(!g.includes('data-growing-full-round="true"'));assert(!g.includes('d="'+policy.segment.outline+'"'))}count++}}assert.equal(count,42)
})
test('俓 actual clock source weights and whole prefix exact completion',async()=>{
 const c=await actualU4fd3Components(),globals=globalThis as any
 try{for(let i=0;i<targets.length;i++){const[pen,mask]=targets[i],segments=strokes[pen],sum=segments.reduce((s,m)=>s+m.weight,0),before=segments.slice(0,mask).reduce((s,m)=>s+m.weight,0),penProgress=(before+.5*segments[mask].weight)/sum;globals.__u4fd3TestElapsed=pen*(c.timing.STROKE_DURATION+c.timing.STROKE_GAP)+penProgress*c.timing.STROKE_DURATION;const html=u4fd3SSR(c.StrokeOutlines,{strokes,clock:{current:[]},phase:'playing',count:pen,manual:false}),g=u4fd3Group(html,'data-stroke-start-gate',selected(i).id);assert(Math.abs(Number(/data-stroke-reveal-progress="([^"]+)"/.exec(g)![1])-.5)<1e-12);assert(g.includes('visibility="hidden"'))}
 for(const phase of['idle','done']){const html=u4fd3SSR(c.StrokeOutlines,{strokes,clock:{current:[]},phase,count:9,manual:false});assert.equal((html.match(/data-growing-full-round="true"/g)||[]).length,7);for(let i=0;i<targets.length;i++)assert(u4fd3Group(html,'data-stroke-start-gate',selected(i).id).includes('data-stroke-reveal-progress="1"'))}
 for(const count of[0,1,4,6,9]){const html=u4fd3SSR(c.StrokeOutlines,{strokes,clock:{current:[]},phase:'paused',count,manual:true});for(let i=0;i<targets.length;i++){const[pen]=targets[i],g=u4fd3Group(html,'data-stroke-start-gate',selected(i).id);assert(g.includes('data-stroke-reveal-progress="'+(pen<count?1:0)+'"'));if(pen>=count)assert(!g.includes('data-growing-full-round="true"'))}}
 }finally{delete globals.__u4fd3TestElapsed}
})
test('俓 existing children inverse bytes and five ordinary rows parity45',async()=>{
 const c=await actualU4fd3Components(),globals=globalThis as any,ordinary=[1,2,6,7,8];let compared=0
 try{for(const pen of ordinary)for(const p of[0,.125,.25,.375,.5,.625,.75,.875,1]){globals.__u4fd3TestElapsed=pen*(c.timing.STROKE_DURATION+c.timing.STROKE_GAP)+p*c.timing.STROKE_DURATION;const props={strokes,clock:{current:[]},phase:'playing',count:pen,manual:false},next=u4fd3SSR(c.StrokeOutlines,props),prior=u4fd3SSR(c.PriorStrokeOutlines,props);assert.equal(u4fd3Group(next,'data-outline-stroke',String(pen+1)),u4fd3Group(prior,'data-outline-stroke',String(pen+1)));compared++}assert.equal(compared,45)}finally{delete globals.__u4fd3TestElapsed}
})
