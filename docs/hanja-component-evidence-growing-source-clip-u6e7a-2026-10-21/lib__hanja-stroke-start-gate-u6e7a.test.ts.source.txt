import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import ts from 'typescript'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU6e7aContext,reviewedU6e7aPolicy,measureReviewedU6e7aFrame,commitReviewedU6e7aCaps,commitReviewedU6e7aHV,REVIEWED_U6E7A_HV_PARTS,REVIEWED_U6E7A_SOURCE} from './hanja-stroke-start-gate-u6e7a.ts'
// UA 호출은 모두 mock이다. 실제 component/SSR/browser/native 승인 검사가 아니다.
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-watergap-hv-u6e7a-source-experiment-2026-10-21/fixtures.json',import.meta.url),'utf8'))
const strokes=fixture.u6e7a.strokes as HanjaOutlineStrokes,targets=[[0,0],[1,0],[2,0],[2,1],[6,0]] as const
const context=reviewedU6e7aContext(strokes),clone=()=>JSON.parse(JSON.stringify(strokes)) as HanjaOutlineStrokes
function selected(i:number){const[p,m]=targets[i],policy=reviewedU6e7aPolicy(context,p,m);assert(policy);return policy}
function fake(i:number){
 const policy=selected(i),segment=policy.segment,id='u6e7a-test-'+i,L=100,events:string[]=[]
 const doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view
 let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg
 const group=node('g'),target=node('g',{'data-stroke-start-gate':policy.id,'data-u6e7a-progress':'.5','data-u6e7a-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u6e7a-measurement':'true',id:id+'-u6e7a-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u6e7a-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u6e7a-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u6e7a-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const hclip=node('clipPath',{'data-growing-owner':id,id:id+'-u6e7a-h-clip',clipPathUnits:'userSpaceOnUse'}),bclip=node('clipPath',{'data-growing-owner':id,id:id+'-u6e7a-b-clip',clipPathUnits:'userSpaceOnUse'});hclip.parentElement=defs;bclip.parentElement=defs
 const hrect=node('rect',{'data-growing-owner':id,x:'56',y:'10',height:'6.5',width:'0'}),brect=node('rect',{'data-growing-owner':id,x:'80.7',y:'13.5',width:'6',height:'0'});hrect.parentElement=hclip;brect.parentElement=bclip
 const partial=node('g',{'data-growing-owner':id,visibility:'hidden'}),hink=node('path',{'data-growing-owner':id,d:REVIEWED_U6E7A_HV_PARTS.H+' '+REVIEWED_U6E7A_HV_PARTS.J,'clip-path':'url(#'+id+'-u6e7a-h-clip)'}),bink=node('path',{'data-growing-owner':id,d:REVIEWED_U6E7A_HV_PARTS.B,'clip-path':'url(#'+id+'-u6e7a-b-clip)'});partial.parentElement=target;hink.parentElement=partial;bink.parentElement=partial
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 const nodes={measurement,guide,startCap,endCap,ink},hvNodes={measurement,hclip,bclip,hrect,brect,ink:partial,hink,bink}
 return{policy,segment,id,L,q0,doc,view,node,svg,owner,group,target,defs,measurement,mask,guide,startCap,endCap,ink,partial,hclip,bclip,hrect,brect,hink,bink,completed,nodes,hvNodes,events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(fn:()=>void)=>{lengthHook=fn},onPoint:(fn:(d:number)=>{x:number;y:number})=>{pointHook=fn}}
}
function dispatch(x:ReturnType<typeof fake>,p:number,s=x.segment){return x.policy.kind==='growing-u6e7a-caps'?commitReviewedU6e7aCaps(x.policy,s,p,x.id,x.nodes as any):commitReviewedU6e7aHV(x.policy,s,p,x.id,x.hvNodes as any)}
function commit(x:ReturnType<typeof fake>,p:number,s=x.segment){x.target.attrs['data-u6e7a-progress']=String(p);return dispatch(x,p,s)}

test('湺 full source identity, private frozen five policies and own certificates',()=>{
 assert(context);assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),REVIEWED_U6E7A_SOURCE.geometrySHA256)
 assert.equal(REVIEWED_U6E7A_SOURCE.full5SHA256,'ccf22653a5c6c89fc3f1a186e8757ee07250ae36813dce4e07c52fc6ae48f2f9')
 assert.equal(REVIEWED_U6E7A_SOURCE.actualComponentApproval,false);assert.equal(REVIEWED_U6E7A_SOURCE.runtimeApplied,false)
 const expected=[['1/2','1/20'],['1/2','1/20'],['1/2','1/12'],['1/3','1/11']]
 for(let i=0;i<5;i++){const p=selected(i);assert(Object.isFrozen(p)&&Object.isFrozen(p.segment)&&Object.isFrozen(p.segment.bounds));assert.equal(reviewedU6e7aPolicy({...context!},...targets[i]),null);assert.throws(()=>{(p.segment.bounds as number[])[0]++});if(p.kind==='growing-u6e7a-caps'){assert.deepEqual([p.certificate.T,p.certificate.K],expected[i]);assert(Object.isFrozen(p.certificate.storedBounds));assert.equal(p.certificate.notPreviousMaskConnectivityProof,true)}}
 let count=0;for(let p=0;p<12;p++)for(let m=0;m<strokes[p].length;m++)if(reviewedU6e7aPolicy(context,p,m))count++;assert.equal(count,5)
})
test('湺 actual material field changes and sparse/inherited/nonenumerable payloads reject',()=>{
 for(let i=0;i<5;i++)for(const key of['outline','revealPath','revealWidth','direction','weight','bounds'] as const){const x=clone(),[p,m]=targets[i],s=x[p][m] as any;const prior=JSON.stringify(s);if(key==='bounds')s.bounds[0]+=.01;else if(typeof s[key]==='number')s[key]+=.01;else s[key]+=' ';assert.notEqual(JSON.stringify(s),prior);assert.equal(reviewedU6e7aContext(x),null);const f=fake(i);assert.equal(commit(f,.5,s).status,'hidden');assert.deepEqual(f.counts(),[0,0])}
 for(const level of['whole','pen','bounds']){const x=clone(),a=level==='whole'?x:level==='pen'?x[0]:x[0][0].bounds;delete(a as any)[0];assert.equal(reviewedU6e7aContext(x),null);const proto=Object.create(Array.prototype);proto[0]=level==='whole'?strokes[0]:level==='pen'?strokes[0][0]:strokes[0][0].bounds[0];Object.setPrototypeOf(a,proto);assert.equal(reviewedU6e7aContext(x),null)}
 for(const inherited of[true,false]){const x=clone(),s=x[2][1] as any,v=s.weight;delete s.weight;if(inherited)Object.setPrototypeOf(s,{weight:v});else Object.defineProperty(s,'weight',{value:v,enumerable:false});s.extra=v;assert.equal(reviewedU6e7aContext(x),null)}
})
test('湺 four MQ same-frame distance/radius/caps and canonical cleanup',()=>{
 for(let i=0;i<4;i++){const x=fake(i),r=commit(x,.03);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,3);assert.equal(r.frame.rho,3);assert.equal(x.ink.getAttribute('data-growing-distance'),'3');assert.equal(x.ink.getAttribute('data-growing-radius'),'3');assert.equal(x.ink.getAttribute('data-growing-end-x'),String(r.frame.point.x));assert.equal(x.startCap.getAttribute('r'),'3');assert.equal(x.endCap.getAttribute('r'),'3');assert(!Object.keys(x.ink.attrs).some(k=>k.includes('canstance')));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null);assert.equal(x.startCap.getAttribute('r'),'0');assert.equal(x.endCap.getAttribute('r'),'0')}
})
test('湺7 original source two phases, rounded UA point and partial cleanup isolated from complete P',()=>{
 for(const q of[{x:69.88,y:13.5},{x:83.73999786376953,y:13.500001907348633},{x:83.73999786376953,y:40}]){const x=fake(4);x.onPoint(()=>q);const r=commit(x,.5);assert.equal(r.status,'visible');assert(r.frame&&'phase'in r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(x.partial.getAttribute('data-source-clip-distance'),'50');if(q.y===13.5){assert.equal(r.frame.phase,'H');assert.equal(x.brect.getAttribute('height'),'0')}else{assert.equal(r.frame.phase,'V');assert.equal(x.hrect.getAttribute('width'),String(89.2-56))}assert.equal(x.events.at(-1),'g:visibility=visible');const completeBefore=JSON.stringify(x.completed.attrs);r.cleanup();assert.equal(JSON.stringify(x.completed.attrs),completeBefore);assert.equal(x.partial.getAttribute('visibility'),'hidden');assert.equal(x.hrect.getAttribute('width'),'0');assert.equal(x.brect.getAttribute('height'),'0');for(const k of['progress','length','distance','end-x','end-y','phase','alpha','h-h','h-v'])assert.equal(x.partial.getAttribute('data-source-clip-'+k),null)}
})
test('湺 p0/p1 have no UA read, invalid frames hide/reset and complete original-P remains separate',()=>{
 for(let i=0;i<5;i++){for(const p of[0,1]){const x=fake(i),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible');assert.equal(x.completed.getAttribute('clip-path'),null);assert.equal(x.completed.getAttribute('mask'),null)}for(const p of[NaN,Infinity,-.1,1.1]){const x=fake(i);assert.equal(commit(x,p).status,'hidden');assert.deepEqual(x.counts(),[0,0])}}
})
test('湺 owner/document/transforms/frame tampering before, between and after UA fail closed',()=>{
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u6e7a-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false}]
 for(let i=0;i<5;i++)for(const mutate of mutations){for(const when of['before','length','point']){const x=fake(i);if(when==='before'){x.target.attrs['data-u6e7a-progress']='0.5';mutate(x)}else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.notEqual((i===4?x.partial:x.ink).getAttribute('visibility'),'visible')}}
 for(let i=0;i<5;i++){for(const L of[NaN,Infinity,-1,0,7]){const x=fake(i);x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0])}const x=fake(i);x.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(x,.5).status,'hidden')}
})
test('湺 post-write mutation and wrong Q/HV DOM fields reject without stale frame ink',()=>{
 for(let i=0;i<5;i++){const x=fake(i),n=i===4?x.hrect:x.guide;n.writeHook=(k)=>{if(k===(i===4?'width':'stroke-dasharray')&&x.counts()[1])x.target.attrs['data-u6e7a-progress']='.25'};assert.equal(commit(x,.5).status,'hidden');assert.equal((i===4?x.partial:x.ink).getAttribute('visibility'),'hidden')}
 for(const key of['d','stroke-width','stroke-linecap','stroke-linejoin','pathLength']){const x=fake(0);x.guide.attrs[key]+='x';assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[0,0])}
 for(const which of['hink','bink','hrect','brect','hclip','bclip'] as const){const x=fake(4);x[which].attrs['data-growing-owner']='wrong';assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[0,0])}
})
test('湺 stored mask fingerprints preserved independently of future component integration',()=>{
 const hashes=["4e9920c85e2f23d90321d86891a93b62ad0991831540253b333aa53a8afb09ca","fff8024b411e3899ae9a592f85ede33c15f64adbc996d5850dc06b462541fbee","9aad0d4ea4da1b98c089bcfb21e44dbe366221502d00682980c6e4bf79bbe7a7","aefa96b7c578bb177bbba1c2abbcb2c70da1b09548284f95a8c90cf71c282f5a","1f7c593b97516e4e19525ac968f9cbb8132163beff3ab101b32cc80ce190b185"];for(let i=0;i<5;i++)assert.equal(createHash('sha256').update(JSON.stringify(selected(i).segment)).digest('hex'),hashes[i])
 assert.equal(selected(4).segment.outline,REVIEWED_U6E7A_HV_PARTS.H+' '+REVIEWED_U6E7A_HV_PARTS.B+' '+REVIEWED_U6E7A_HV_PARTS.J)
 const x=fake(0);x.target.attrs['data-u6e7a-progress']='0';const frame=measureReviewedU6e7aFrame(x.policy,x.segment,0,x.measurement as any);assert.deepEqual(frame.q0,x.q0);assert.equal(frame.rho,0)
})

// 새 TSX 분기만 RAM transpile한다. layoutEffect/UA 실행이나 실제 browser 승인 검사가 아니다.
const u6e7aAddedImport="import { reviewedU6e7aContext, reviewedU6e7aPolicy, commitReviewedU6e7aCaps, commitReviewedU6e7aHV, REVIEWED_U6E7A_HV_PARTS, type ReviewedU6e7aGrowingPolicy, type ReviewedU6e7aHVPolicy } from '@/lib/hanja-stroke-start-gate-u6e7a'\n",u6e7aAddedContext="  const u6e7aContext = reviewedU6e7aContext(strokes)\n",u6e7aAddedBranch="        const u6e7aPolicy = reviewedU6e7aPolicy(u6e7aContext, stroke, index)\n        if (u6e7aPolicy?.kind === 'growing-u6e7a-caps') return <U6e7aCapsOutline key={index} policy={u6e7aPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />\n        if (u6e7aPolicy?.kind === 'original-HJ-B-u6e7a') return <U6e7aHVOutline key={index} policy={u6e7aPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />\n"
let u6e7aComponents:Promise<any>|undefined
async function actualU6e7aComponents(){
 if(u6e7aComponents)return u6e7aComponents
 u6e7aComponents=(async()=>{
  const current=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8')
  for(const token of[u6e7aAddedImport,u6e7aAddedContext,u6e7aAddedBranch])assert.equal(current.split(token).length,2)
  const start=current.indexOf('/** 湺 원4MQ만'),end=current.indexOf('/** 簜 water9m1',start);assert(start>0&&end>start)
  const prior=(current.slice(0,start)+current.slice(end)).replace(u6e7aAddedImport,'').replace(u6e7aAddedContext,'').replace(u6e7aAddedBranch,'')
  assert.equal(createHash('sha256').update(prior).digest('hex'),'af3a9e6bea7a495903b6d5e92fef3bea85c09c0f6fe09e63d0901a8b4e45859a')
  const timingSource=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8').split('\n'),timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>{const line=timingSource.find(l=>l.startsWith(prefix));assert(line);return line}).join('\n')).toString('base64')
  async function load(input:string,extra:string){
   const marker='const [elapsed, setElapsed] = useState(0)';assert(input.includes(marker))
   const prepared=input.replace(marker,'const [elapsed, setElapsed] = useState(Number((globalThis as typeof globalThis & {__u6e7aTestElapsed?:number}).__u6e7aTestElapsed??0))')+extra
   let js=ts.transpileModule(prepared,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
   js=js.replace(/(['"])@\/lib\/([a-z0-9-]+)\1/g,(_all,_quote,name)=>JSON.stringify(name==='hanja-strokes'?timingURL:new URL('./'+name+'.ts',import.meta.url).href))
   for(const name of['react/jsx-runtime','react'])js=js.replaceAll("'"+name+"'",JSON.stringify(import.meta.resolve(name))).replaceAll('"'+name+'"',JSON.stringify(import.meta.resolve(name)))
   assert(!js.includes('@/lib/'));return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
  }
  const next=await load(current,'\nexport {U6e7aCapsOutline,U6e7aHVOutline}\n'),previous=await load(prior,'')
  return{...next,PriorStrokeOutlines:previous.StrokeOutlines,timing:await import(timingURL)}
 })();return u6e7aComponents
}
function u6e7aGroup(html:string,key:string,value:string){const match=[...html.matchAll(/<g\b[^>]*>/g)].find(m=>m[0].includes(key+'="'+value+'"'));assert(match,'missing group '+key+'='+value);let depth=0;const start=match.index!;for(const token of html.slice(start).matchAll(/<g\b[^>]*>|<\/g>/g)){depth+=token[0].startsWith('</')?-1:1;if(depth===0)return html.slice(start,start+token.index!+token[0].length)}throw Error('unclosed target group')}
function u6e7aElementTag(html:string,tag:string,field:string,value:string){return[...html.matchAll(new RegExp('<'+tag+'\\b[^>]*>','g'))].map(m=>m[0]).find(s=>s.includes(field+'="'+value+'"'))}
function u6e7aSSR(component:any,props:any){return renderToStaticMarkup(createElement('svg',null,createElement(component,props)))}
test('湺 actual component five child SSR partial/zero/complete contracts',async()=>{
 const c=await actualU6e7aComponents();let count=0
 for(let i=0;i<5;i++){const policy=selected(i),child=i===4?c.U6e7aHVOutline:c.U6e7aCapsOutline;for(const p of[0,1e-6,.5,.99999999,1,NaN]){const html=u6e7aSSR(child,{policy,segment:policy.segment,progress:p,clipId:'u6e7a-ssr-'+i}),g=u6e7aGroup(html,'data-stroke-start-gate',policy.id),measurement=u6e7aElementTag(g,'path','data-u6e7a-measurement','true');assert(measurement);assert(!measurement.includes('pathLength='));assert(measurement.includes('d="'+policy.segment.revealPath+'"'));assert(g.includes('data-u6e7a-progress="'+String(p)+'"'));
  if(p===1){if(i===4){const full=u6e7aElementTag(g,'path','data-original-p-complete','true');assert(full);assert(!full.includes('clip-path=')&&!full.includes('mask=')&&!full.includes('visibility='));assert(full.includes('d="'+policy.segment.outline+'"'))}else{const full=u6e7aElementTag(g,'path','data-growing-full-round','true');assert(full);assert(full.includes('mask="url(#u6e7a-ssr-'+i+')"'));assert(g.includes('stroke-linecap="round"'));assert(!full.includes('visibility='))}}
  else if(p>0&&p<1){if(i===4){assert(g.includes('<g data-growing-owner="u6e7a-ssr-'+i+'" visibility="hidden">'));assert(g.includes('d="'+REVIEWED_U6E7A_HV_PARTS.H+' '+REVIEWED_U6E7A_HV_PARTS.J+'"'));assert(g.includes('d="'+REVIEWED_U6E7A_HV_PARTS.B+'"'))}else{const partial=[...g.matchAll(/<path\b[^>]*>/g)].map(m=>m[0]).find(s=>s.includes('d="'+policy.segment.outline+'"'));assert(partial);assert(partial.includes('visibility="hidden"'));assert(partial.includes('mask="url(#u6e7a-ssr-'+i+'-u6e7a-growing)"'));assert(g.includes('stroke-linecap="butt"')&&g.includes('stroke-linejoin="miter"'))}}
  else{assert(!g.includes('data-original-p-complete="true"')&&!g.includes('data-growing-full-round="true"'));assert(!g.includes('d="'+policy.segment.outline+'"'));assert(!g.includes('<g data-growing-owner='))}
  count++}}assert.equal(count,30)
})
test('湺 actual component clock routing and exact whole/prefix completion',async()=>{
 const c=await actualU6e7aComponents(),globals=globalThis as any
 try{
  for(let i=0;i<5;i++){const [pen,mask]=targets[i],segments=strokes[pen],sum=segments.reduce((s,m)=>s+m.weight,0),before=segments.slice(0,mask).reduce((s,m)=>s+m.weight,0),penProgress=(before+.5*segments[mask].weight)/sum;globals.__u6e7aTestElapsed=pen*(c.timing.STROKE_DURATION+c.timing.STROKE_GAP)+penProgress*c.timing.STROKE_DURATION;const html=u6e7aSSR(c.StrokeOutlines,{strokes,clock:{current:[]},phase:'playing',count:pen,manual:false}),g=u6e7aGroup(html,'data-stroke-start-gate',selected(i).id),p=Number(/data-stroke-reveal-progress="([^"]+)"/.exec(g)![1]);assert(Math.abs(p-.5)<1e-12);assert(g.includes('visibility="hidden"'))}
  for(const phase of['idle','done']){const html=u6e7aSSR(c.StrokeOutlines,{strokes,clock:{current:[]},phase,count:12,manual:false});assert.equal((html.match(/data-growing-full-round="true"/g)||[]).length,4);assert.equal((html.match(/data-original-p-complete="true"/g)||[]).length,1);for(let i=0;i<5;i++)assert(u6e7aGroup(html,'data-stroke-start-gate',selected(i).id).includes('data-stroke-reveal-progress="1"'))}
  for(const count of[0,3,7]){const html=u6e7aSSR(c.StrokeOutlines,{strokes,clock:{current:[]},phase:'paused',count,manual:true});for(let i=0;i<5;i++){const [pen]=targets[i],g=u6e7aGroup(html,'data-stroke-start-gate',selected(i).id);assert(g.includes('data-stroke-reveal-progress="'+(pen<count?1:0)+'"'));if(pen>=count)assert(!g.includes('data-growing-full-round="true"')&&!g.includes('data-original-p-complete="true"'))}}
 }finally{delete globals.__u6e7aTestElapsed}
})
test('湺 actual component old children inverse byte proof and eight ordinary rows parity72',async()=>{
 const c=await actualU6e7aComponents(),globals=globalThis as any,ordinary=[3,4,5,7,8,9,10,11];let compared=0
 try{for(const pen of ordinary)for(const p of[0,.125,.25,.375,.5,.625,.75,.875,1]){globals.__u6e7aTestElapsed=pen*(c.timing.STROKE_DURATION+c.timing.STROKE_GAP)+p*c.timing.STROKE_DURATION;const props={strokes,clock:{current:[]},phase:'playing',count:pen,manual:false},next=u6e7aSSR(c.StrokeOutlines,props),prior=u6e7aSSR(c.PriorStrokeOutlines,props);assert.equal(u6e7aGroup(next,'data-outline-stroke',String(pen+1)),u6e7aGroup(prior,'data-outline-stroke',String(pen+1)));compared++}assert.equal(compared,72)}finally{delete globals.__u6e7aTestElapsed}
})
