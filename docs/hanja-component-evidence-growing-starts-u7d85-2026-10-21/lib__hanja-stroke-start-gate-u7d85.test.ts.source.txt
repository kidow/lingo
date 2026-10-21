import assert from'node:assert/strict'
import{test}from'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{createElement}from'react'
import{renderToStaticMarkup}from'react-dom/server'
import ts from'typescript'
import type{HanjaOutlineStrokes}from'./hanja-stroke-outline'
import{reviewedU7d85Context,reviewedU7d85Policy,measureReviewedU7d85Frame,commitReviewedU7d85Caps,type ReviewedU7d85Nodes,REVIEWED_U7D85_SOURCE}from'./hanja-stroke-start-gate-u7d85.ts'
// L/endpoint는 mock이다. 실제 UA·hydration/native/APP/runtime 승인이 아니다.
const fixturePath='../docs/hanja-source-independent-qq-hv-hq-u7d85-source-experiment-2026-10-21/fixtures.json'
const strokes=JSON.parse(readFileSync(new URL(fixturePath,import.meta.url),'utf8')).u7d85.strokes as HanjaOutlineStrokes
const targets=[[0,0],[0,1],[1,0],[1,1],[6,0],[10,0],[11,0]]as const,mockLengths=targets.map(()=>100)
const context=reviewedU7d85Context(strokes)
const clone=()=>JSON.parse(JSON.stringify(strokes))as HanjaOutlineStrokes
function u7d85PolicyAt(i:number){const[p,m]=targets[i],policy=reviewedU7d85Policy(context,p,m);assert(policy);return policy}
function fakeU7d85(i:number,id='u7d85-'+i){
  const policy=u7d85PolicyAt(i),segment=policy.segment,q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number),L=mockLengths[i],events:string[]=[]
  const document={defaultView:null as unknown},view={document,getComputedStyle:(n:Element)=>{const x=n as unknown as {cssTransform:string;cssTranslate:string};return{transform:x.cssTransform,getPropertyValue:(key:string)=>key==='translate'?x.cssTranslate:'none'}}};document.defaultView=view
  let owner:SVGSVGElement
  const node=(name:string,attrs:Record<string,string>)=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:document,parentElement:null as unknown,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},getAttribute(key:string){return this.attrs[key]??null},setAttribute(key:string,value:string){this.attrs[key]=value;events.push(name+':'+key+'='+value)},removeAttribute(key:string){delete this.attrs[key]}})
  const svg=node('svg',{});owner=svg as unknown as SVGSVGElement
  const group=node('g',{}),target=node('g',{'data-stroke-start-gate':policy.id}),defs=node('defs',{}),mask=node('mask',{id:id+'-u7d85-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'})
  group.parentElement=svg;target.parentElement=group;defs.parentElement=target;mask.parentElement=defs
  let pointHook:((d:number)=>{x:number;y:number})|null=null,lengthHook:(()=>void)|null=null,length=L
  let reads=0,pointReads=0
  const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u7d85-measurement':'true',id:id+'-u7d85-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('measure:length');lengthHook?.();return length},getPointAtLength(d:number){pointReads++;events.push('measure:point');return pointHook?pointHook(d):i>=4?{x:q0[0]+d,y:q0[1]}:(()=>{const n=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number),t=d/L;return{x:(1-t)**2*n[0]+2*(1-t)*t*n[2]+t*t*n[4],y:(1-t)**2*n[1]+2*(1-t)*t*n[3]+t*t*n[5]}})()}})
  const guide=Object.assign(node('path',{'data-growing-owner':id,id:id+'-u7d85-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),{getTotalLength(){throw Error('dash is not measurement guide')},getPointAtLength(){throw Error('dash is not measurement guide')}})
  const startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('ink',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u7d85-growing)',visibility:'hidden'})
  measurement.parentElement=defs;guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
  const nodes={measurement,guide,startCap,endCap,ink} as unknown as ReviewedU7d85Nodes
  return{policy,segment,q0,L,id,owner,svg,document,view,group,target,defs,mask,measurement,guide,startCap,endCap,ink,nodes,events,counts:()=>({reads,pointReads}),pointHook:(fn:typeof pointHook)=>{pointHook=fn},lengthHook:(fn:typeof lengthHook)=>{lengthHook=fn},setLength:(n:number)=>{length=n}}
}

function commit(x:ReturnType<typeof fakeU7d85>,p:number){return commitReviewedU7d85Caps(x.policy,x.segment,p,x.id,x.nodes)}
let materialNegatives=0,uaNegatives=0
test('綅 seven private policies use four own MQ and three exact straight-prefix certificates',()=>{
 assert(context);assert.equal(strokes.length,13);assert.equal(strokes.flat().length,15)
 const lambda=['3368201/25600','28783225/294436','11194961/25600','5479081/25600'],lines=['5751/200','104247/2500','3118500000000001/100000000000000']
 for(let i=0;i<targets.length;i++){const p=u7d85PolicyAt(i);assert.equal(p.id,'u7d85-'+(targets[i][0]+1)+'-'+(targets[i][1]+1));assert.deepEqual(p.segment,strokes[targets[i][0]][targets[i][1]]);assert(Object.isFrozen(p)&&Object.isFrozen(p.segment)&&Object.isFrozen(p.segment.bounds)&&Object.isFrozen(p.certificate))
  if(p.certificate.syntax==='Q'){assert(i<4);assert.equal(p.certificate.parameterBound,.5);assert.equal(p.certificate.curvatureBound,i===1?1/20:1/100);assert.equal(p.certificate.bounds.halfSpeedSquaredLower,lambda[i]);assert.equal(p.certificate.notFullSweepProof,true)}
  else{assert(i>=4);assert.equal(p.certificate.syntax,i===4?'MLL-first-straight-prefix':'MLQ-first-straight-prefix');assert.equal(p.certificate.firstLineRational,lines[i-4]);assert.equal(p.certificate.curvatureBound,0);assert.equal(p.certificate.initialCorners,0);assert.equal(p.certificate.noQuadraticCertificate,true);assert(p.certificate.firstLine>7)}
  assert.throws(()=>{(p.segment as{revealWidth:number}).revealWidth=10});assert.throws(()=>{(p.segment.bounds as number[])[0]++});assert(reviewedU7d85Context(strokes))
 }
 assert.equal(reviewedU7d85Policy(context,2,0),null);assert.equal(reviewedU7d85Policy({id:'u7d85-seven-starts'},0,0),null)
})
test('綅 strict whole fields reject changed geometry and sparse/inherited/accessor alternatives',()=>{
 for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)for(const key of Object.keys(strokes[p][m])){const x=clone(),s=x[p][m]as unknown as Record<string,unknown>;if(Array.isArray(s[key]))(s[key]as number[])[0]+=.01;else if(typeof s[key]==='number')s[key]=(s[key]as number)+.01;else s[key]+=' ';assert.notDeepEqual(x,strokes);assert.equal(reviewedU7d85Context(x),null);materialNegatives++}
 for(const change of[(x:HanjaOutlineStrokes)=>{delete x[0]},x=>{delete x[0][0]},x=>{delete x[0][0].bounds[0]},x=>{Object.setPrototypeOf(x[0][0],{extra:true})},x=>{Object.defineProperty(x[0][0],'weight',{enumerable:false})},x=>{Object.defineProperty(x[0][0],'weight',{get(){throw Error('getter must not run')},enumerable:true})}]as((x:HanjaOutlineStrokes)=>void)[]){const x=clone();change(x);assert.equal(reviewedU7d85Context(x),null);materialNegatives++}
})
test('綅 seven mock frames read L and endpoint once and commit visibility last with complete cleanup',()=>{
 for(let i=0;i<targets.length;i++){const x=fakeU7d85(i),v=commit(x,.03);assert.equal(v.status,'visible');assert(v.frame);assert.deepEqual(x.counts(),{reads:1,pointReads:1});assert.equal(v.frame.L,100);assert.equal(v.frame.d,3);assert.equal(v.frame.rho,3)
 for(const[k,n]of Object.entries({'data-growing-progress':.03,'data-growing-length':100,'data-growing-distance':3,'data-growing-radius':3,'data-growing-end-x':v.frame.point.x,'data-growing-end-y':v.frame.point.y}))assert.equal(x.ink.getAttribute(k),String(n))
 assert.equal(x.events.at(-1),'ink:visibility=visible');v.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null);assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(x.startCap.getAttribute('r'),'0');assert.equal(x.endCap.getAttribute('r'),'0')
 }
})
test('綅 exact owner parent document attr/CSS guards fail closed before between and after UA reads',()=>{
 for(let i=0;i<targets.length;i++){
  const bad:((x:ReturnType<typeof fakeU7d85>)=>void)[]=[x=>{x.measurement.isConnected=false},x=>{x.measurement.ownerSVGElement={}as SVGSVGElement},x=>{x.measurement.attrs.d+=' '},x=>{x.measurement.attrs.pathLength='1'},x=>{x.measurement.parentElement=x.mask},x=>{x.svg.attrs.transform='translate(1)'},x=>{x.group.cssTranslate='1px'},x=>{x.lengthHook(()=>{x.ink.attrs.d+=' '})},x=>{x.lengthHook(()=>{x.measurement.ownerDocument={}as typeof x.document})},x=>{x.pointHook(()=>{x.group.cssTransform='matrix(1,0,0,1,1,0)';return{x:1,y:1}})},x=>{x.pointHook(()=>({x:NaN,y:1}))},x=>{x.setLength(Infinity)},x=>{x.setLength(-1)},x=>{x.setLength(i<4?7:(x.policy.certificate as{firstLine:number}).firstLine)},x=>{const original=x.ink.setAttribute.bind(x.ink);x.ink.setAttribute=(k,v)=>{original(k,v);if(k==='data-growing-end-y')x.ink.attrs.d+=' '}}]
  for(const change of bad){const x=fakeU7d85(i);change(x);assert.equal(commit(x,.03).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden');uaNegatives++}
  const x=fakeU7d85(i);for(const p of[NaN,Infinity,-.1,1.1]){assert.equal(commit(x,p).status,'hidden');uaNegatives++}assert.throws(()=>measureReviewedU7d85Frame(x.policy,x.segment,NaN,x.nodes.measurement))
 }
})
test('綅 forged policy and altered source reject while p0/p1 use no UA path reads',()=>{
 for(let i=0;i<targets.length;i++){const x=fakeU7d85(i),copy=JSON.parse(JSON.stringify(x.segment));assert.equal(commitReviewedU7d85Caps(x.policy,copy,.03,x.id,x.nodes).status,'visible');copy.weight++;assert.equal(commitReviewedU7d85Caps(x.policy,copy,.03,x.id,x.nodes).status,'hidden');assert.equal(commitReviewedU7d85Caps({...x.policy},x.segment,.03,x.id,x.nodes).status,'hidden');const z=fakeU7d85(i);assert.equal(commit(z,0).status,'empty');assert.equal(commit(z,1).status,'complete');assert.deepEqual(z.counts(),{reads:0,pointReads:0})}
})

const IMPORT_LINE="import { reviewedU7d85Context, reviewedU7d85Policy, commitReviewedU7d85Caps, type ReviewedU7d85Policy } from '@/lib/hanja-stroke-start-gate-u7d85'\n",CONTEXT_LINE="  const u7d85Context = reviewedU7d85Context(strokes)\n",BRANCH_LINES="        const u7d85Policy = reviewedU7d85Policy(u7d85Context, stroke, index)\n        if (u7d85Policy) return <U7d85CapsOutline key={index} policy={u7d85Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />\n",CHILD_SOURCE="function U7d85CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU7d85Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {\n  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)\n  useLayoutEffect(()=>{\n    const committed=commitReviewedU7d85Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})\n    return committed.cleanup\n  },[policy,segment,progress,clipId])\n  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1\n  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy=\"growing-u7d85-caps\" data-stroke-reveal-progress={valid?progress:'invalid'}>\n    <defs>\n      <path ref={measurement} id={clipId+'-u7d85-measure'} data-growing-owner={clipId} data-u7d85-measurement=\"true\" d={segment.revealPath} fill=\"none\" stroke=\"none\" visibility=\"hidden\" />\n      <mask id={clipId} maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"100\" height=\"100\">\n        <path d={segment.revealPath} fill=\"none\" stroke=\"white\" strokeWidth={segment.revealWidth} strokeLinecap=\"round\" strokeLinejoin=\"miter\" pathLength=\"1\" strokeDasharray=\"1 2\" strokeDashoffset={0} />\n      </mask>\n      <mask id={clipId+'-u7d85-growing'} maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"100\" height=\"100\">\n        <path ref={guide} id={clipId+'-u7d85-guide'} data-growing-owner={clipId} d={segment.revealPath} fill=\"none\" stroke=\"white\" strokeWidth={segment.revealWidth} strokeLinecap=\"butt\" strokeLinejoin=\"miter\" pathLength=\"1\" strokeDasharray=\"0 2\" strokeDashoffset={0} />\n        <circle ref={startCap} data-growing-owner={clipId} cx=\"0\" cy=\"0\" r=\"0\" fill=\"white\" />\n        <circle ref={endCap} data-growing-owner={clipId} cx=\"0\" cy=\"0\" r=\"0\" fill=\"white\" />\n      </mask>\n    </defs>\n    {valid&&progress===1&&<path key=\"u7d85-full-round-ink\" data-growing-full-round=\"true\" d={segment.outline} mask={'url(#'+clipId+')'} />}\n    {valid&&progress>0&&progress<1&&<path key=\"u7d85-growing-ink\" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u7d85-growing)'} visibility=\"hidden\" />}\n  </g>\n}\n\n",ORIGINAL_COMPONENT_SHA="93fcb0df41768a9b742a51b9b5f3a775050e872f78ec252de2afe9b762c1e7b5"
function priorComponent(source:string){const restored=source.replace(IMPORT_LINE,'').replace(CONTEXT_LINE,'').replace(BRANCH_LINES,'').replace(CHILD_SOURCE,'');assert.notEqual(restored,source);assert.equal(createHash('sha256').update(restored).digest('hex'),ORIGINAL_COMPONENT_SHA);return restored}

let componentPromise:Promise<Record<string,any>>|undefined
async function actualU7d85Component(){
 if(componentPromise)return componentPromise
 componentPromise=(async()=>{
 const source=readFileSync(new URL('../components/hanja/stroke-outlines.tsx',import.meta.url),'utf8'),prior=priorComponent(source),timing=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8').split('\n')
 const timingURL='data:text/javascript;base64,'+Buffer.from(['const STROKE_PLAYBACK_SPEED =','export const STROKE_DURATION =','export const STROKE_GAP ='].map(prefix=>{const line=timing.find(l=>l.startsWith(prefix));assert(line);return line}).join('\n')).toString('base64')
 async function load(input:string,extra:string){
  const marker='const [elapsed, setElapsed] = useState(0)';assert(input.includes(marker))
  const prepared=input.replace(marker,'const [elapsed, setElapsed] = useState(Number((globalThis as typeof globalThis & {__u7d85TestElapsed?:number}).__u7d85TestElapsed??0))')+extra
  let js=ts.transpileModule(prepared,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
  js=js.replace(/(['"])@\/lib\/([a-z0-9-]+)\1/g,(_all,_quote,name)=>JSON.stringify(name==='hanja-strokes'?timingURL:new URL('./'+name+'.ts',import.meta.url).href))
  for(const name of['react/jsx-runtime','react'])js=js.replaceAll("'"+name+"'",JSON.stringify(import.meta.resolve(name))).replaceAll('"'+name+'"',JSON.stringify(import.meta.resolve(name)))
  assert(!js.includes('@/lib/'));return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
 }
 const current=await load(source,'\nexport {U7d85CapsOutline}\n'),old=await load(prior,'')
 return{...current,PriorStrokeOutlines:old.StrokeOutlines,timing:await import(timingURL)}
 })();return componentPromise
}

test('綅 actual child SSR keeps seven p0 empty partial hidden and p1 always full-round masked',async()=>{
 const{U7d85CapsOutline,StrokeOutlines}=await actualU7d85Component()
 for(let i=0;i<targets.length;i++){const policy=u7d85PolicyAt(i),render=(p:number)=>renderToStaticMarkup(createElement('svg',null,createElement(U7d85CapsOutline,{policy,segment:policy.segment,progress:p,clipId:'check-u7d85-'+i}))),z=render(0),mid=render(.03),full=render(1);assert(z.includes('data-u7d85-measurement="true"'));assert(!z.includes(policy.segment.outline));assert(!z.includes('data-growing-full-round'));assert(mid.includes('visibility="hidden"'));assert(!mid.includes('data-growing-full-round'));assert(full.includes('data-growing-full-round="true"'));assert(full.includes('mask="url(#check-u7d85-'+i+')"'));assert(full.includes('stroke-dasharray="1 2"'));assert(full.includes('stroke-linecap="round"'))}
 const whole=renderToStaticMarkup(createElement('svg',null,createElement(StrokeOutlines,{strokes,clock:{current:[]},phase:'idle',count:13,manual:true})));assert.equal((whole.match(/data-growing-full-round="true"/g)||[]).length,7)
})
test('綅 inverse restores prior component bytes and eight ordinary pens preserve seventy-two samples',async()=>{
 const{StrokeOutlines,PriorStrokeOutlines,timing}=await actualU7d85Component();let n=0
 for(let pen=1;pen<=13;pen++){if([1,2,7,11,12].includes(pen))continue;for(const p of[0,.125,.25,.375,.5,.625,.75,.875,1]){(globalThis as typeof globalThis&{__u7d85TestElapsed?:number}).__u7d85TestElapsed=(pen-1)*(timing.STROKE_DURATION+timing.STROKE_GAP)+p*timing.STROKE_DURATION
 const props={strokes,clock:{current:[]},phase:'playing',count:13,manual:false},cur=renderToStaticMarkup(createElement(StrokeOutlines,props)),old=renderToStaticMarkup(createElement(PriorStrokeOutlines,props)),part=(s:string)=>{const m=s.match(new RegExp('<g data-outline-stroke="'+pen+'">([\\s\\S]*?)</g>'));assert(m);return m[1]};assert.equal(part(cur),part(old));n++}}
 delete(globalThis as typeof globalThis&{__u7d85TestElapsed?:number}).__u7d85TestElapsed;assert.equal(n,72)
})
test('綅 fixed cache geometry full5 and source finite PASS pointers remain exact without a compiler',()=>{
 const h=(s:string|Buffer)=>createHash('sha256').update(s).digest('hex'),bytes=readFileSync(new URL(fixturePath,import.meta.url)),f=JSON.parse(bytes.toString()).u7d85
 assert.equal(h(bytes),REVIEWED_U7D85_SOURCE.sourceFixtureSHA256);assert.equal(h(JSON.stringify(f.strokes)),REVIEWED_U7D85_SOURCE.geometrySHA256);assert.equal(strokes.flat().reduce((n,s)=>n+(s.outline.match(/\bM/g)||[]).length,0),35)
 assert.equal(h(readFileSync(new URL('../docs/hanja-goal-glyphwiki-batch950-2026-10-13/engine-proof.json',import.meta.url))),REVIEWED_U7D85_SOURCE.full5SHA256)
 assert.equal(h(readFileSync(new URL('../docs/hanja-source-native-pass-u7d85-growing-starts-2026-10-21/README.md',import.meta.url))),REVIEWED_U7D85_SOURCE.sourceFinitePassREADME)
 assert.equal(h(readFileSync(new URL('../docs/hanja-source-native-pass-u7d85-growing-starts-2026-10-21/review.json',import.meta.url))),REVIEWED_U7D85_SOURCE.sourceFinitePassReview)
 console.log(JSON.stringify({newMaterialNegatives:materialNegatives,newUAMocksRejected:uaNegatives,sourceGeometry:0,sourceCompiler:0,engine:0,SSROnly:true,native:false,runtime:false}))
})
