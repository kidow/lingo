import assert from 'node:assert/strict'
import {test} from 'node:test'
import fs from 'node:fs'
import vm from 'node:vm'
import {createHash} from 'node:crypto'
import ts from '../../node_modules/typescript/lib/typescript.js'
const root=new URL('../../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root),'utf8'),sha=s=>createHash('sha256').update(s).digest('hex')
const replacements=[{"before":"const value=path.getPointAtLength(d);ensure([value.x,value.y].every(Number.isFinite)&&value.x>=start.x&&value.x<=end.x&&exact(),'Invalid same-frame 繘1m2 point')","after":"const value=path.getPointAtLength(d);ensure([value.x,value.y].every(Number.isFinite)&&exact(),'Invalid same-frame 繘1m2 point')"},{"before":"threshold=cut+(maxX-cut)*(value.x-start.x)/(end.x-start.x)","after":"threshold=cut+(maxX-cut)*Math.max(0,Math.min(1,(value.x-start.x)/(end.x-start.x)))"}],oldSHA="6bdef03310f07099d471322b6381cf600b3a8623535ab3bb13b1dd230f533780",newSHA="9a6254b6da0f3335b4c777f051d11e95da9a023b89cc3b5f8128b651c553e237"
let baseline=read('lib/hanja-stroke-source-foot-u7e58.ts')
if(sha(baseline)===newSHA)for(const r of replacements)baseline=baseline.replace(r.after,r.before)
assert.equal(sha(baseline),oldSHA)
let proposed=baseline;for(const r of replacements){assert.equal(proposed.split(r.before).length-1,1);proposed=proposed.replace(r.before,r.after)}assert.equal(sha(proposed),newSHA)
const setupSource=read('lib/hanja-stroke-source-foot-u7e58.test.ts'),setupAST=ts.createSourceFile('setup.ts',setupSource,ts.ScriptTarget.Latest,true),setup=setupAST.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='setup').getText(setupAST),setupJS=ts.transpileModule(setup,{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText
const fixture=JSON.parse(read('docs/hanja-source-independent-qq-two-left-up-u7e58-source-experiment-2026-10-19/fixtures.json')).u7e58.strokes
function world(source){
 const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022},reportDiagnostics:true});assert.equal(compiled.diagnostics.length,0)
 const ctx={exports:{},console};vm.createContext(ctx);vm.runInContext(compiled.outputText,ctx)
 vm.runInContext('var fixture=JSON.parse('+JSON.stringify(JSON.stringify(fixture))+');var context=exports.reviewedU7e58FootContext(fixture);var policies=[exports.reviewedU7e58FootPolicy(context,0,1),exports.reviewedU7e58FootPolicy(context,1,1)];'+setupJS,ctx)
 return(index,mode)=>{
  ctx.index=index;ctx.mode=mode
  return vm.runInContext(`(()=>{
   const s=setup(index),f=FEET[index],share=Number(f.phaseShare[0])/Number(f.phaseShare[1]),p=mode==='before'?share-1e-10:mode==='exact'?share:mode==='upper'?1-1e-10:share+1e-10;
   const values=s.policy.segment.revealPath.match(/-?\\d+(?:\\.\\d+)?/g).map(Number),L=27.747241973876953,start={x:Math.fround(values[0]),y:Math.fround(values[1])},end={x:Math.fround(values[4]),y:Math.fround(values[5])},under=index===1?6.979999542236328:Math.fround(start.x-2**-20);
   s.nodes.measurement.getTotalLength=()=>L;
   s.nodes.measurement.getPointAtLength=d=>d===0?start:d===L?end:mode==='nan'?{x:NaN,y:start.y}:mode==='upper'?{x:end.x+2**-16,y:end.y}:mode==='interior'?{x:(start.x+end.x)/2,y:(start.y+end.y)/2}:{x:under,y:start.y};
   s.g.setAttribute('data-stroke-reveal-progress',String(p));
   try{const frame=exports.measureReviewedU7e58FootFrame(s.policy,p,s.nodes.measurement),ok=exports.commitReviewedU7e58FootMask(s.nodes,frame);return {ok,frame:JSON.parse(JSON.stringify(frame)),phase:s.nodes.ink.getAttribute('data-u7e58-foot-phase'),visible:s.nodes.ink.getAttribute('visibility'),foot:s.nodes.foot.getAttribute('visibility'),body:s.nodes.body.getAttribute('visibility'),rawQ:s.nodes.ink.getAttribute('data-growing-end-x'),rectWidth:s.nodes.rect.getAttribute('width'),cut:Number(f.cutX[0])/Number(f.cutX[1]),max:s.policy.segment.bounds[2]}}catch(e){return{threw:String(e.message)}}
  })()`,ctx)
 }
}
test('繘 new UA-domain regression: observed sub-start float32 and endpoint domain saturation',()=>{
 const old=world(baseline),next=world(proposed)
 const fail=old(1,'under');assert.match(fail.threw,/Invalid same-frame/)
 for(const index of[0,1])for(const mode of['under','upper','interior']){
  const result=next(index,mode);assert.equal(result.threw,undefined);assert.equal(result.ok,true);assert.equal(result.phase,'body');assert.equal(result.visible,'visible');assert.equal(result.foot,'visible');assert.equal(result.body,'visible')
  assert(result.frame.threshold>=result.cut&&result.frame.threshold<=result.max)
  if(mode==='under'){assert.equal(result.frame.threshold,result.cut);if(index===1)assert.equal(Number(result.rawQ),6.979999542236328)}
  if(mode==='upper')assert.equal(result.frame.threshold,result.max)
 }
 for(const index of[0,1])for(const mode of['before','exact']){const a=old(index,mode),b=next(index,mode);assert.equal(JSON.stringify(a),JSON.stringify(b))}
 for(const index of[0,1])assert.match(next(index,'nan').threw,/Invalid same-frame/)
 console.log(JSON.stringify({observedBaselineFailureReproduced:true,newCases:6,unchangedBoundaryCases:4,nonfiniteNegatives:2,toleranceAdded:0,sourceGeometryChanged:false,nativeApproval:false}))
})
