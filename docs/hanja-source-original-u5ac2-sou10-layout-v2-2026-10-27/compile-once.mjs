import assert from 'node:assert/strict'
import {readFileSync,existsSync} from 'node:fs'
import {createHash} from 'node:crypto'
const repo=new URL('../../',import.meta.url),read=p=>readFileSync(new URL(p,repo)),json=p=>JSON.parse(read(p)),sha=v=>createHash('sha256').update(v).digest('hex');
assert(!existsSync(new URL('docs/hanja-source-original-u5ac2-sou10-layout-v2-2026-10-27/fixtures-draft.json',repo)),'One compilation already preserved; do not rerun');
const fullPath='docs/hanja-component-capture-u5ac2-sou10-layout-v2-2026-10-27/engine-whole-lingo-u5ac2-sou10-layout-v2.json',fullSHA='2123ee9467437ca644eb162bc29d66b1839cfe73bfa46e2d2cbcd9c56368b2ca',nativePath='docs/hanja-source-raw-compare-u5ac2-sou10-layout-v2-individual-2026-10-27/native-static-review.json',nativeSHA='b014dae3216e0556c619e7b7403a314b20efa80742506c7176f41234fc9f62e3';
assert.equal(sha(read(fullPath)),fullSHA);assert.equal(sha(read(nativePath)),nativeSHA);const original=json(fullPath),native=json(nativePath);assert.equal(native.approval.static13SourceMembership,true);assert.equal(native.approval.sourceDirection,false);assert.equal(native.nativeApproval,false);assert.equal(native.cleanup.SIGTERMExit0,true);
const sourceGroups=native.staticSourceGroupsOneBased.map(g=>g.map(n=>n-1));assert.deepEqual(sourceGroups,[[0,1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13,14],[15]]);assert.deepEqual(sourceGroups.flat(),Array.from({length:16},(_,i)=>i));
const compilerPath='docs/hanja-goal-glyphwiki-batch1039-2026-10-13/boundary-source-candidate.mjs',compiler=read(compilerPath).toString(),functionBody=compiler.slice(compiler.indexOf('function originalPrimitiveMask(call){'),compiler.indexOf('export function compileProgressive'));assert.equal(sha(compiler),'02431a4c44f47fe4326cd3f60e7d276cfcdcec27b16f9576fda0a79e9f9b2cbb');assert.equal(sha(functionBody),'108f4a3a422b3d1039020ef5618956829cbcbab38b31b3cc778e94c98c4ef10b');const ownSource=readFileSync(import.meta.filename).toString(),ownFunction=ownSource.slice(ownSource.indexOf('\nfunction originalPrimitiveMask(call){')+1,ownSource.indexOf('\n// END EXACT ORIGINAL PRIMITIVE MASK')+1);assert.equal(ownFunction,functionBody);
function originalPrimitiveMask(call){
  const consumedPolygons=new Set()
  const segment = (polygons, direction, weight) => {
    for (const polygon of polygons) { assert(!consumedPolygons.has(polygon), 'An original polygon cannot be emitted twice'); consumedPolygons.add(polygon) }
    const points = polygons.flat()
    assert(points.length > 0 && points.every(value => value.off === 0))
    assert(weight > 0)
    const xs = points.map(value => value.x / 2), ys = points.map(value => value.y / 2)
    const normalized = polygons.map(polygon => {
      const area = polygon.reduce((sum, value, index) => { const next = polygon[(index + 1) % polygon.length]; return sum + value.x * next.y - next.x * value.y }, 0)
      assert(area !== 0)
      return area < 0 ? [polygon[0], ...polygon.slice(1).reverse()] : polygon
    })
    return {
      outline: normalized.map(polygon => polygon.map((value, index) => `${index ? 'L' : 'M'}${value.x / 2} ${value.y / 2}`).join(' ') + ' Z').join(' '),
      bounds: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)],
      direction,
      weight: Math.round(weight * 1e6) / 1e6,
    }
  }

  const args=call.args
  if(call.kind==='cdDrawCurve')return {...segment(call.polygons,'curve',Math.hypot(args[4]-args[0],args[5]-args[1])/2),revealPath:`M${args[0]/2} ${args[1]/2} Q${args[2]/2} ${args[3]/2} ${args[4]/2} ${args[5]/2}`,revealWidth:14}
  assert.equal(call.kind,'cdDrawLine')
  const piece=segment(call.polygons,args[0]===args[2]?(args[3]>args[1]?'down':'up'):args[1]===args[3]?(args[2]>args[0]?'right':'left'):'curve',Math.hypot(args[2]-args[0],args[3]-args[1])/2)
  return piece.direction==='curve'?{...piece,revealPath:`M${args[0]/2} ${args[1]/2} L${args[2]/2} ${args[3]/2}`,revealWidth:14}:piece
}

// END EXACT ORIGINAL PRIMITIVE MASK
let primitiveCalls=0;const strokes=sourceGroups.map(group=>group.flatMap(raw=>original.trace[raw].map(call=>{primitiveCalls++;return originalPrimitiveMask(call)})));assert.equal(primitiveCalls,16);assert.equal(strokes.length,13);
const identity={root:'lingo-u5ac2-sou10-layout-v2',file:'engine-whole-lingo-u5ac2-sou10-layout-v2.json',fileSHA256:fullSHA},fullProof={...original,sourceRoot:identity.root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256};assert.equal(Object.keys(fullProof).length,8);
const compiledSHA256=sha(JSON.stringify(strokes)),maskTransitionBoundaries=strokes.flatMap((masks,i)=>masks.slice(1).map((m,j)=>({pen:i+1,nextMask:j+2,boundary:masks.slice(0,j+1).reduce((n,p)=>n+p.weight,0)/masks.reduce((n,p)=>n+p.weight,0)})));
const directionPath='docs/hanja-official-media-compare-u5ac2-2026-10-27/native-clock-review.json',direction=json(directionPath);assert.equal(direction.counts.originalTimedPaths,13);assert.equal(direction.counts.totalScenes,39);
const pinPaths=[fullPath,nativePath,'docs/hanja-source-raw-compare-u5ac2-sou10-layout-v2-whole-2026-10-27/native-whole-review.json','docs/hanja-component-capture-u5ac2-sou10-layout-v2-2026-10-27/capture.json','docs/hanja-component-capture-u5ac2-sou10-layout-v2-2026-10-27/capture-once.mjs','docs/hanja-component-recipe-u5ac2-sou10-layout-v2-2026-10-27/recipe.json','docs/hanja-component-recipe-u5ac2-sou10-layout-v2-2026-10-27/readiness.json','docs/hanja-component-recipe-u5ac2-sou10-layout-v2-2026-10-27/verify-readiness.mjs','docs/hanja-source-raw-compare-u5ac2-sou10-layout-v2-individual-2026-10-27/membership-proposal.json',compilerPath,directionPath];const inputSHA256=Object.fromEntries(pinPaths.map(p=>[p,sha(read(p))]));inputSHA256['docs/hanja-source-original-u5ac2-sou10-layout-v2-2026-10-27/compile-once.mjs']=sha(readFileSync(import.meta.filename));
const fixture={fullProof,identity,strokes,sourceGroups,compiledSHA256,inputSHA256,restoration:{compilerPath,compilerSHA256:sha(compiler),function:'originalPrimitiveMask',functionSHA256:sha(functionBody),compileHelperPath:'docs/hanja-source-original-u5ac2-sou10-layout-v2-2026-10-27/compile-once.mjs',compileHelperSHA256:sha(readFileSync(import.meta.filename)),existingFunctionInvokedWithoutModuleEvaluation:true,compilerBatchPasses:1,primitiveCalls,preCompilerFailures:[{host:'Node REPL string codegen disabled',primitiveCalls:0,engine:0,resolution:'Byte-exact original function copied as native ESM declaration; no string evaluation'},{host:'Own function guard matched a quoted marker',primitiveCalls:0,engine:0,resolution:'Newline-anchored declaration extraction statically proved byte-exact before first compiler calls'}],engine:0,newGeometry:false,coordinateTransform:'Original P and guide /2; existing negative-winding normalization and weight round to1e-6 only',allOriginalPExactlyOnce:true,logicalCount:13,rawCount:16,maskCount:16,polygonCount:27},provenance:{locallyAuthoredRoot:true,locallyAuthoredLayout:true,mixedParts:true,originalPublicRootClaim:false,originalWhole:false,originalLayoutPreserved:false,rootVersion:'local-layout-v2',recipePath:'docs/hanja-component-recipe-u5ac2-sou10-layout-v2-2026-10-27/recipe.json',recipeSHA256:inputSHA256['docs/hanja-component-recipe-u5ac2-sou10-layout-v2-2026-10-27/recipe.json'],newRightParent:[61,0,198,200],femaleParent:[5,0,165,200],sourcePrimitivePOrQOrWidthOrFlagsEdited:false,publicFilledPIsFreshCapture:true},membership:{nativeStaticEvidence:nativePath,nativeStaticSHA256:nativeSHA,staticRegionCorrespondenceObserved:true,staticSourceGroupsApproved:true,candidateGroupsAreNativeStaticGroups:true,compoundConnectionProofApproved:false,sourceOrderOriginalClockEquivalent:false,scope:'Completed static13/publisher regions only; raw1+2/9+10/14+15 temporal contact and forward playback pending.'},catalogStrokes:12,playbackStrokes:13,catalogChangeApproved:false,officialExam13AuthorityEstablished:false,directionEvidence:{path:directionPath,SHA256:inputSHA256[directionPath],publisherStrokes:13,publisherScenes:39,publisherSVG_SHA256:direction.media.svg.sha256,macroDirections:direction.macroDirections,publisherMacroConfirmed:true,candidateFilledDirectionApprovalTransferred:false,sourceOriginalClockEquivalenceApproved:false},maskTransitionBoundaries,baselinePlan:{kind:'plain-outline',logicalPens:13,raw:16,masks:16,P:27,maskCounts:strokes.map(s=>s.length),initialPens:Array.from({length:13},(_,i)=>i+1),initialProgress:[0,1e-6],initialScenes:26,transitionBeforeAtAfterOffsets:[-1e-10,0,1e-10],transitionScenes:9,totalFinitePlanned:35,newStartPolicyAdopted:false,nativeScenes:0},previewOnly:true,draft:true,registered:false,temporalGroupingApproved:false,directionApproved:false,sourceClockApproved:false,contactGeometryApproved:false,animationApproved:false,nativeApproval:false,runtimeApplied:false};
export const publicFixture={u5ac2:fixture};
console.log(JSON.stringify({fixture:publicFixture,compilation:{compilerBatchPasses:1,primitiveCalls,logical:13,raw:16,masks:16,P:27,compiledSHA256,full8SHA256:sha(JSON.stringify(fullProof)),maskCounts:strokes.map(s=>s.length),maskTransitionBoundaries,engine:0}}));
