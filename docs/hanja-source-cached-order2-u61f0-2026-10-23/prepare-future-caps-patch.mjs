// Prepare a future exact u61f0 integration patch; stdout only, no shared writes or server.
import fs from 'node:fs'
import crypto from 'node:crypto'
import {createRequire} from 'node:module'
const require=createRequire(import.meta.url),ts=require('typescript')
const sha=s=>crypto.createHash('sha256').update(s).digest('hex')
const component='components/hanja/stroke-outlines.tsx',helper='scripts/hanja-actual-component-review.mjs'
const componentBase=fs.readFileSync(component,'utf8'),helperBase=fs.readFileSync(helper,'utf8')
if(sha(componentBase)!=='6d07a255d3df824df4eb8521ee39a4d0bb1faaf8d037f9f7ce3981707d67ff55'||sha(helperBase)!=='771c4e673dd993608f505c1b31105cdc813fb9f78d3e225b9e3afd17d4082154')throw Error('Final shared89 baseline required; never rebase silently')
const edits={};const results={}
function prepare(path,base,changes){let s=base;let out='*** Update File: '+path+'\n';for(const [old,next]of changes){if(s.split(old).length!==2)throw Error('Non-unique own patch anchor '+path+': '+old.slice(0,90));s=s.replace(old,next);out+='@@\n'+old.split('\n').map(x=>'-'+x).join('\n')+'\n'+next.split('\n').map(x=>'+'+x).join('\n')+'\n'}edits[path]=out;results[path]=s}
const at=componentBase.indexOf('function U8fc5CapsOutline('),end=componentBase.indexOf('\nfunction ',at+10)
if(at<0||end<0)throw Error('Existing exact caps component missing')
const cloned=componentBase.slice(at,end).replaceAll('U8fc5','U61f0').replaceAll('u8fc5','u61f0')
const originalFirstLine=componentBase.slice(at,componentBase.indexOf('\n',at))
const originalImport=componentBase.split('\n')[0]
prepare(component,componentBase,[
 [originalImport, "import { reviewedU61f0Context, reviewedU61f0Policy, commitReviewedU61f0Caps, type ReviewedU61f0Policy } from '@/lib/hanja-stroke-start-caps-u61f0'\n"+originalImport],
 ['  const u8fc5Context = reviewedU8fc5Context(strokes)','  const u61f0Context = reviewedU61f0Context(strokes)\n  const u8fc5Context = reviewedU8fc5Context(strokes)'],
 ['        const u8fc5Policy = reviewedU8fc5Policy(u8fc5Context, stroke, index)',"        const u61f0Policy = reviewedU61f0Policy(u61f0Context, stroke, index)\n        if (u61f0Policy) return <U61f0CapsOutline key={index} policy={u61f0Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={id+'-'+stroke+'-'+index} />\n        const u8fc5Policy = reviewedU8fc5Policy(u8fc5Context, stroke, index)"],
 [originalFirstLine,cloned+'\n'+originalFirstLine]
])
const wrapper=`function u61f0GrowingFixedFixture(config,value){
 assert.equal(config.kind,'growing-u61f0-caps');
 const strokes=plainU61f0Order2FixedFixture({...config,kind:'plain-outline'},value),pairs=[[1,1],[2,1],[4,1],[5,2],[6,1],[7,1],[8,1],[9,1],[10,1],[14,1],[15,1],[16,1],[18,1]];
 assert.deepEqual(config.targets.map(t=>[t.pen,t.mask]),pairs);
 for(const t of config.targets){assert.equal(t.id,'u61f0-'+t.pen+'-'+t.mask);assert.equal(t.kind,'growing-u61f0-caps');assert.deepEqual(t.segment,strokes[t.pen-1][t.mask-1]);assert.deepEqual(t.q0,t.segment.revealPath.match(/-?\\d+(?:\\.\\d+)?/g).slice(0,2).map(Number));}
 return strokes;
}
`
const setup=`function setupU61f0(){const controls=document.querySelector('#controls');if(controls.dataset.u61f0Setup==='true')return;controls.dataset.u61f0Setup='true';for(const t of C.targets){for(const p of[0,1e-6,.01,.03,.1,.95,.9999,.99999999,1])button(t.id+' local '+p,()=>{T=t;local(p);});for(const delta of[-1e-10,0,1e-10])button(t.id+' rho7 local '+delta,()=>u51d7Rho(t,delta));button(t.id+' full-round residual',()=>u7e58Coverage(t));}for(const item of C.pairProgress)for(const delta of[-1e-10,0,1e-10])button('pen'+item.pen+' source before mask'+item.nextMask+' '+delta,()=>{pen=item.pen;show(item.boundary+delta);});button('현재획 ordinary full-round residual',()=>u7e58Coverage());}
`
const routeLine=helperBase.split('\n').find(s=>s.startsWith('const fixture=JSON.parse(read(C.fixture)),strokes='))
const stateLine=helperBase.split('\n').find(s=>s.includes("return u51d7CapsState(host);")&&!s.includes('function '))
const nsLine=helperBase.split('\n').find(s=>s.startsWith(" const ns=t.kind==="))
const rhoLine=helperBase.split('\n').find(s=>s.startsWith('function u51d7Rho('))
const frameLine=helperBase.split('\n').find(s=>s.startsWith("if(C.kind===")&&s.includes('function frameReport()'))
const mapperLine=helperBase.split('\n').find(s=>s.includes("if((C.kind==='growing-u7e58-caps'")&&s.includes('Exact 綎 local source dependency'))
const fixtureRouteLine=helperBase.split('\n').find(s=>s.includes("routes.set('/fixture.json'"))
const admissionLine=helperBase.split('\n').find(s=>s.startsWith("assert.equal(C.schema,'hanja-actual-component-profile/v1');assert(["))
prepare(helper,helperBase,[
 [admissionLine,admissionLine.replace("assert(['growing-u7e58-caps'","assert(['growing-u61f0-caps','growing-u7e58-caps'")],
 ['function plainU61f0Order2FixedFixture(config,value){',wrapper+'\nfunction plainU61f0Order2FixedFixture(config,value){'],
 [routeLine,routeLine.replace("strokes=C.kind===","strokes=C.kind==='growing-u61f0-caps'?u61f0GrowingFixedFixture(C,fixture):C.kind===")],
 [stateLine,stateLine.replace("if(C.kind===","if(C.kind==='growing-u61f0-caps'||C.kind===")],
 [nsLine,nsLine.replace('const ns=t.kind===',"const ns=t.kind==='growing-u61f0-caps'?'u61f0':t.kind===")],
 [rhoLine,rhoLine.replace("(t.kind===","(t.kind==='growing-u61f0-caps'?'u61f0':t.kind===")],
 ['function Probe(){useEffect(()=>{ready=true;setup();report();},[]);return null;}',setup+"\nfunction Probe(){useEffect(()=>{ready=true;setup();if(C.kind==='growing-u61f0-caps')setupU61f0();report();},[]);return null;}"],
 [frameLine,frameLine.replace("if(C.kind===","if(C.kind==='growing-u61f0-caps'||C.kind===")],
 [mapperLine,mapperLine.replace("if((C.kind===","if((C.kind==='growing-u61f0-caps'||C.kind===")],
 [fixtureRouteLine,fixtureRouteLine.replace("...((C.kind==='growing-u7e58-caps'","...((C.kind==='growing-u61f0-caps'||C.kind==='growing-u7e58-caps'")]
])
const sourcefile=ts.createSourceFile(component,results[component],ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX)
if(sourcefile.parseDiagnostics.length)throw Error('Future TSX parser diagnostics')
const helperfile=ts.createSourceFile(helper,results[helper],ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)
if(helperfile.parseDiagnostics.length)throw Error('Future helper parser diagnostics')
const patch='*** Begin Patch\n'+Object.values(edits).join('')+'*** End Patch\n'
const profile=JSON.parse(fs.readFileSync('docs/hanja-actual-component-profiles-2026-10-22/u61f0-1.json','utf8'))
const fixed=JSON.parse(fs.readFileSync(profile.fixture,'utf8'))['u61f0-order2'].strokes
const pairs=[[1,1],[2,1],[4,1],[5,2],[6,1],[7,1],[8,1],[9,1],[10,1],[14,1],[15,1],[16,1],[18,1]]
profile.kind='growing-u61f0-caps'
profile.targets=pairs.map(([pen,mask])=>{const segment=fixed[pen-1][mask-1];return{pen,mask,id:'u61f0-'+pen+'-'+mask,kind:'growing-u61f0-caps',q0:segment.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number),segment}})
profile.target=profile.targets[0]
profile.pairProgress=fixed.flatMap((masks,i)=>{const total=masks.reduce((n,m)=>n+m.weight,0);let done=0;return masks.slice(0,-1).map((m,j)=>{done+=m.weight;return{pen:i+1,nextMask:j+2,boundary:done/total}})})
profile.SSRPens=Array.from({length:18},(_,i)=>i+1)
profile.adapterSHA256=sha(results[helper]);profile.inputSHA256[helper]=sha(results[helper]);profile.inputSHA256[component]=sha(results[component])
const p89=JSON.parse(fs.readFileSync('docs/hanja-actual-component-profiles-2026-10-22/u785c-1.json','utf8'))
for(const[p,h]of Object.entries(p89.inputSHA256))if(p.startsWith('lib/'))profile.inputSHA256[p]=h
for(const p of['lib/hanja-stroke-start-caps-u61f0.ts','docs/hanja-source-cached-order2-u61f0-2026-10-23/mq-initial-certificates.json'])profile.inputSHA256[p]=sha(fs.readFileSync(p))
profile.sharedVersion=90;profile.sharedWindowPending=true;profile.profileFinalized=false;profile.executionEnabled=false
profile.expectedResourceClosureModules=p89.expectedResourceClosureModules+1
profile.pending='Rebase after final shared89 snapshot, then exact serialized wire/relative mapper closure validation before native.'
profile.isolatedActualComponentBrowserVerified=false;profile.nativeApproval=false;profile.runtimeApplied=false
profile.initialRiskPlan={targets:13,firstGate:'13 independent local epsilon/.03 plus original full-round residual; expand only after pass',MLQQ7LaterJoinG1:false,MLQ18OriginalLeftTailPreserved:true,oldNativeInitialApprovalInherited:false}
console.log(JSON.stringify({schema:'hanja-own-future-caps-patch/v1',baseline:{[component]:sha(componentBase),[helper]:sha(helperBase)},future:{[component]:sha(results[component]),[helper]:sha(results[helper])},patch,profile,source:results,counts:{targets:13,sourcePens:18,sourceMasks:21,sourcePolygons:46},parserDiagnostics:0,sharedWrites:0,SSR:0,native:false}))
