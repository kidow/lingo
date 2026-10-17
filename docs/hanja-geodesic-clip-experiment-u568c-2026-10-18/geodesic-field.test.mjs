import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {runInNewContext} from 'node:vm'
import {buildGeodesicField,rasterMask,maskCoverage,UnreachableDomainError} from './geodesic-field.mjs'
const rect=(x,y,r,b)=>[{x,y},{x:r,y},{x:r,y:b},{x,y:b}]
const uDomain=[rect(1,1,2,8),rect(1,7,8,8),rect(7,1,8,8)]
test('U-corridor respects the obstacle: distance18, not straight-line6; p0 empty and p1 same threshold',()=>{
 const seed=[rect(1,1,2,2)],before=JSON.stringify({domain:uDomain,seed}),f=buildGeodesicField({domain:uDomain,seed,size:9,viewBox:[0,0,9,9]})
 assert.equal(f.distance[1*9+7],18);assert.equal(f.diagnostics.domainCells,19);assert.equal(f.diagnostics.reachedCells,19)
 assert.equal(maskCoverage(f,0).visibleCells,0);assert.equal(maskCoverage(f,1).visibleCells,19)
 assert.equal(rasterMask(f,.9999)[1*9+7],0);assert.equal(rasterMask(f,1)[1*9+7],255)
 const a=rasterMask(f,.4),b=rasterMask(f,.6);assert(a.every((v,i)=>v<=b[i]));assert.equal(JSON.stringify({domain:uDomain,seed}),before)
})
test('unseeded disconnected island is rejected, never filled at100%',()=>{
 assert.throws(()=>buildGeodesicField({domain:[rect(0,0,2,2),rect(5,0,7,2)],seed:[rect(0,0,2,2)],size:8,viewBox:[0,0,8,8]}),e=>e instanceof UnreachableDomainError&&e.diagnostics.components===2&&e.diagnostics.unreachableCells===4)
})
test('same-row subcell slit blocks adjacency even though both neighboring centres are inside',()=>{
 assert.throws(()=>buildGeodesicField({domain:[rect(0,0,1.9,4),rect(2.1,0,4,4)],seed:[rect(0,0,1,4)],size:4,viewBox:[0,0,4,4]}),e=>e instanceof UnreachableDomainError&&e.diagnostics.components===2&&e.diagnostics.unreachableCells===8&&e.diagnostics.blockedAdjacencies>=4)
})
test('point-only diagonal contact is conservatively rejected instead of inventing a bridge',()=>{
 assert.throws(()=>buildGeodesicField({domain:[rect(0,0,1,1),rect(1,1,2,2)],seed:[rect(0,0,1,1)],size:4,viewBox:[0,0,4,4]}),e=>e instanceof UnreachableDomainError&&e.diagnostics.unreachableCells===1&&e.diagnostics.vectorComponents===1)
})
test('a partially covered seed cell is not stamped into new visible area',()=>{
 assert.throws(()=>buildGeodesicField({domain:[rect(0,0,4,4)],seed:[rect(.1,.1,.9,.9)],size:4,viewBox:[0,0,4,4]}),e=>e instanceof UnreachableDomainError&&e.diagnostics.seedCells===0)
})
test('thin real bridge can disappear at coarse resolution; refinement may recover it',()=>{
 const domain=[rect(0,3,2,5),rect(2,4.01,6,4.24),rect(6,3,8,5)],seed=[rect(0,3,2,5)]
 assert.throws(()=>buildGeodesicField({domain,seed,size:16,viewBox:[0,0,8,8]}),UnreachableDomainError)
 const fine=buildGeodesicField({domain,seed,size:128,viewBox:[0,0,8,8]});assert.equal(fine.diagnostics.unreachableCells,0);assert.equal(fine.diagnostics.components,1)
})
test('unsampled independent vector island is detected even when raster sees only one component',()=>{
 const tiny=rect(5.1,5.1,5.2,5.2)
 assert.throws(()=>buildGeodesicField({domain:[rect(0,0,2,2),tiny],seed:[rect(0,0,2,2)],size:8,viewBox:[0,0,8,8]}),e=>e instanceof UnreachableDomainError&&e.diagnostics.components===1&&e.diagnostics.vectorComponents===2&&e.diagnostics.unrepresentedVectorComponents.includes(2))
 assert.throws(()=>buildGeodesicField({domain:[tiny],seed:[rect(0,0,2,2)],size:8,viewBox:[0,0,8,8]}),e=>e instanceof UnreachableDomainError&&e.diagnostics.domainCells===0&&e.diagnostics.unrepresentedVectorComponents.length===1)
})
test('contained tiny polygon belongs to the represented union component, not a false extra island',()=>{
 const f=buildGeodesicField({domain:[rect(0,0,2,2),rect(.1,.1,.2,.2)],seed:[rect(0,0,2,2)],size:8,viewBox:[0,0,8,8]})
 assert.equal(f.diagnostics.vectorComponents,1);assert.deepEqual(f.diagnostics.vectorComponentDetails[0].polygons,[0,1]);assert.equal(f.diagnostics.vectorComponentDetails[0].hasExactSampleWitness,true);assert.equal(f.diagnostics.unrepresentedVectorComponents.length,0)
})
test('unsupported self-intersection, degeneracy and non-decimal precision are rejected without repair',()=>{
 const seed=[rect(0,0,4,4)]
 assert.throws(()=>buildGeodesicField({domain:[[{x:0,y:0},{x:3,y:3},{x:0,y:3},{x:2,y:0}]],seed,size:8,viewBox:[0,0,4,4]}),/Self-intersecting/)
 assert.throws(()=>buildGeodesicField({domain:[[{x:0,y:0},{x:1,y:1},{x:2,y:2}]],seed,size:8,viewBox:[0,0,4,4]}),/Degenerate/)
 assert.throws(()=>buildGeodesicField({domain:[rect(1e-13,0,2,2)],seed,size:8,viewBox:[0,0,4,4]}),/non-exponent decimals/)
})
test('fixed public861 at200/400: report success or strict refusal, never vector/native approval',()=>{
 const config=JSON.parse(readFileSync(new URL('./config.json',import.meta.url)));const root=new URL('../../',import.meta.url)
 for(const[f,h]of Object.entries({...config.immutablePins,...config.experimentFilePins})){const bytes=readFileSync(new URL(f,root));assert.equal(createHash('sha256').update(bytes).digest('hex'),h,f)}
 const proof=JSON.parse(readFileSync(new URL(config.wholeProofFile,root))),normalize=polys=>polys.map(p=>p.map(v=>({x:v.x/2,y:v.y/2,off:v.off}))),domain=normalize(proof.groups[14].polygons),seed=normalize(proof.groups[13].polygons),before=JSON.stringify(proof)
 for(const size of[200,400]){try{const f=buildGeodesicField({domain,seed,size});assert.equal(f.diagnostics.unreachableCells,0);assert.equal(maskCoverage(f,0).visibleCells,0);assert.equal(maskCoverage(f,1).visibleCells,f.diagnostics.domainCells);console.log('ACTUAL_PUBLIC_861 '+JSON.stringify({size,result:'sampled-cells reached',...f.diagnostics,at99_99:maskCoverage(f,.9999),at100:maskCoverage(f,1),vectorCoverageProven:false,nativeApproved:false}))}catch(e){assert(e instanceof UnreachableDomainError);assert(e.diagnostics.unreachableCells>0||e.diagnostics.seedCells===0);console.log('ACTUAL_PUBLIC_861 '+JSON.stringify({size,result:'rejected',...e.diagnostics,vectorCoverageProven:false,nativeApproved:false}))}}
 assert.equal(JSON.stringify(proof),before)
})

test('exact BigInt convex seed gate accepts cancellation-prone rectangle and rejects a concave notch',()=>{
 const box=[999999,999999,.001,.001],domain=[rect(999999,999999,999999.001,999999.001)]
 const f=buildGeodesicField({domain,seed:domain,size:4,viewBox:box});assert.equal(f.diagnostics.reachedCells,16)
 const notch=[{x:0,y:0},{x:4,y:0},{x:4,y:4},{x:2,y:3},{x:0,y:4}]
 assert.throws(()=>buildGeodesicField({domain:[rect(0,0,4,4)],seed:[notch],size:8,viewBox:[0,0,4,4]}),/exact-convex/)
})
test('real helper input and pinned renderer drive viewer buttons through intermediate and terminal progress without stale coverage',async()=>{
 const root=new URL('../../',import.meta.url),helper=new URL('./serve.py',import.meta.url)
 const python=[
  'import ast,hashlib,importlib.util,json,sys',
  'from pathlib import Path',
  'sys.dont_write_bytecode=True',
  'p=Path(sys.argv[1]);ast.parse(p.read_text())',
  's=importlib.util.spec_from_file_location("isolated_geo_input",p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)',
  'h=m.sha(m.HERE/"config.json");cfg,proof,analysis=m.source_guard(h)',
  'try:m.source_guard("0"*64)',
  'except AssertionError as e:assert "startup config pin changed" in str(e)',
  'else:raise AssertionError("Changed startup config was accepted")',
  'print(json.dumps(m.input_data(cfg,proof,analysis)))'
 ].join('\n')
 const input=JSON.parse(execFileSync('rtk',['proxy','python3','-B','-c',python,fileURLToPath(helper)],{encoding:'utf8',cwd:fileURLToPath(root)}))
 const expectedBounds=[Math.min(...input.domain.flat().map(v=>v.x)),Math.min(...input.domain.flat().map(v=>v.y)),Math.max(...input.domain.flat().map(v=>v.x)),Math.max(...input.domain.flat().map(v=>v.y))]
 assert.deepEqual(input.Qmask.bounds,expectedBounds)
 const cfg=JSON.parse(readFileSync(new URL('./config.json',import.meta.url))),legacy=readFileSync(new URL(cfg.legacyRendererFile,root),'utf8')
 const {renderProgressive}=await import('data:text/javascript;base64,'+Buffer.from(legacy.slice(legacy.indexOf('export function renderProgressive('))).toString('base64'))
 const boundary=input.Vmask.weight/(input.Vmask.weight+input.Qmask.weight)
 const broken={...input.Qmask};delete broken.bounds
 assert.throws(()=>renderProgressive([[input.Vmask,broken]],1,boundary+(1-boundary)*.5),TypeError)
 const elements=Object.fromEntries(['identity','progress','percent','legacy','experiment','coverage','diagnostics','resolution','play'].map(id=>[id,{value:id==='resolution'?'200':'',textContent:'',innerHTML:''}]))
 const buttons=[0,.5,.95,.9999,1].map(p=>({dataset:{p:String(p)}})),boundaryButtons=[-1,0,1].map(p=>({dataset:{boundary:String(p)}}))
 let imageWrites=0
 const canvas={getContext:()=>({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData:()=>imageWrites++}),toDataURL:()=> 'data:image/png;base64,TEST_ONLY'}
 const document={getElementById:id=>elements[id],createElement:tag=>{assert.equal(tag,'canvas');return canvas},querySelectorAll:selector=>selector==='[data-p]'?buttons:boundaryButtons}
 const code=readFileSync(new URL('./viewer.js',import.meta.url),'utf8').replace(/^import .*\n/gm,'')
 await runInNewContext('(async()=>{'+code+'\n})()',{document,fetch:async()=>({ok:true,json:async()=>input}),buildGeodesicField,rasterMask,maskCoverage,renderProgressive,performance,cancelAnimationFrame:()=>{},requestAnimationFrame:()=>{throw Error('Replay not part of this test')}})
 const actual=[]
 for(const button of buttons){button.onclick();const c=JSON.parse(elements.coverage.textContent);assert.equal(c.progress,Number(button.dataset.p));assert.equal(c.vectorCoverageProven,false);assert.match(elements.experiment.innerHTML,/distance-mask/);assert.match(elements.legacy.innerHTML,/<svg/);actual.push({progress:c.progress,visibleCells:c.visibleCells,domainCells:c.domainCells})}
 assert.equal(actual[0].visibleCells,0);assert(actual[1].visibleCells>0);assert.equal(actual.at(-1).visibleCells,actual.at(-1).domainCells);assert.equal(imageWrites,buttons.length+1)
 console.log('ACTUAL_VIEWER_FLOW '+JSON.stringify({progressCoverage:actual,initialNativeAttempt:'FAILED missing Qmask.bounds',mockDOM:true,nativeVisualApproval:false,HTTP:0,sourceCompile:0,engine:0,configHashMismatchRejected:true}))
})

test('external SVG namespace adapter preserves inline geometry and is valid standalone XML',()=>{
 const helper=new URL('./serve.py',import.meta.url)
 const python=[
  'import ast,importlib.util,json,sys,xml.etree.ElementTree as ET',
  'from pathlib import Path',
  'sys.dont_write_bytecode=True',
  'p=Path(sys.argv[1]);ast.parse(p.read_text())',
  's=importlib.util.spec_from_file_location("isolated_geo_xml",p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)',
  'cfg,proof,analysis=m.source_guard(m.sha(m.HERE/"config.json"))',
  `inline='<svg viewBox="0 0 1024 1024"><g transform="translate(0 0)"><defs><clipPath id="test"><path d="M0 0L1 1"/></clipPath></defs><path d="M0 0L1 1" clip-path="url(#test)"/></g></svg>'`,
  'output=m.external_svg(inline);root=ET.fromstring(output)',
  'assert root.tag=="{http://www.w3.org/2000/svg}svg"',
  'assert all(e.tag.startswith("{http://www.w3.org/2000/svg}") for e in root.iter())',
  `assert output.replace(' xmlns="http://www.w3.org/2000/svg"',"",1)==inline`,
  'assert m.external_svg(output)==output',
  'print(json.dumps({"namespace":root.tag,"geometryUnchanged":True,"idempotent":True,"immutablePins":len(cfg["immutablePins"]),"HTTP":0,"server":0,"sourceCompile":0,"engine":0,"nativeImageRetest":False}))'
 ].join('\n')
 const result=JSON.parse(execFileSync('rtk',['proxy','python3','-B','-c',python,fileURLToPath(helper)],{encoding:'utf8'}))
 assert.equal(result.geometryUnchanged,true);assert.equal(result.immutablePins,29);assert.equal(result.nativeImageRetest,false)
 console.log('ACTUAL_EXTERNAL_SVG_XML '+JSON.stringify(result))
})
